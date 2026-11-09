"""Render the SmartManipulator-X (BCN3D Moveo) arm from its URDF meshes.

Usage (Python 3 with numpy and Pillow):
    python tools/render_arm.py <sfs-smartmanipulator-x-robot>/ros2_ws/src/smartmanipulator_x/smartmanipulator_x_description/meshes/visual out/
then convert out/arm_*.png to website/assets/img/robot/arm-*.webp. The pose, camera
and colours are set near the top of this file.

Software z-buffer rasterizer (numpy only). Renders once into id/shade/depth
buffers, then colours several variants (neutral, mechanics highlighted,
motors highlighted, dimmed) and writes transparent PNGs plus the projected
pixel positions of the joints for overlays.
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

MESH = Path(sys.argv[1])
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

W, H, SS = 1100, 1000, 2  # final size, supersampling


def load(name):
    d = (MESH / name).read_bytes()
    n = int.from_bytes(d[80:84], "little")
    a = np.frombuffer(d[84:84 + n * 50], dtype=np.dtype([("n", "<f4", 3), ("v", "<f4", (3, 3)), ("a", "<u2")]))
    return a["v"].astype(np.float64)


def rot(axis, q):
    axis = np.asarray(axis, float)
    axis = axis / np.linalg.norm(axis)
    x, y, z = axis
    c, s, C = np.cos(q), np.sin(q), 1 - np.cos(q)
    R = np.array([[c + x*x*C, x*y*C - z*s, x*z*C + y*s],
                  [y*x*C + z*s, c + y*y*C, y*z*C - x*s],
                  [z*x*C - y*s, z*y*C + x*s, c + z*z*C]])
    T = np.eye(4)
    T[:3, :3] = R
    return T


def tr(xyz):
    T = np.eye(4)
    T[:3, 3] = xyz
    return T


# Pose (rad)
q = dict(j1=0.0, j2=0.55, j3=0.95, j4=0.0, j5=0.55, g=0.45)

# Kinematic chain from the URDF: (link, parent, origin, axis, angle)
chain = [
    ("base_link", None, (0, 0, 0), None, 0),
    ("link1", "base_link", (0, 0, 0), (0, 0, 1), q["j1"]),
    ("link2", "link1", (0, 0, 0.23164), (0, 1, 0), q["j2"]),
    ("link3", "link2", (0, 0, 0.22112), (0, 1, 0), q["j3"]),
    ("link4", "link3", (0, 0, 0.09609), (0, 0, 1), q["j4"]),
    ("link5", "link4", (0, 0, 0.12691), (0, 1, 0), q["j5"]),
    ("servo_gear", "link5", (0.00047, -0.014, 0.065), (-1, 0, 0), q["g"]),
    ("idler_gear", "link5", (0.00043, 0.014, 0.065), (-1, 0, 0), -q["g"]),
    ("pivot_right", "link5", (0.00054, -0.007, 0.085), (-1, 0, 0), q["g"]),
    ("pivot_left", "link5", (0.00055, 0.00701, 0.085), (-1, 0, 0), -q["g"]),
    ("finger_right", "servo_gear", (-0.00004, -0.04, -0.00056), (-1, 0, 0), -q["g"]),
    ("finger_left", "idler_gear", (-0.00003, 0.04, 0), (-1, 0, 0), q["g"]),
]
T = {}
for name, parent, org, axis, ang in chain:
    P = T[parent] if parent else np.eye(4)
    M = P @ tr(org)
    if axis is not None:
        M = M @ rot(axis, ang)
    T[name] = M

# Mesh list: (file, link, material) material 0 = printed, 1 = hardware
parts = []
for name, *_ in chain:
    for mat, suffix in ((0, "printed"), (1, "hardware")):
        f = MESH / f"{name.replace('_link', '')}_{suffix}.stl"
        if name == "base_link":
            f = MESH / f"base_{suffix}.stl"
        if f.exists():
            parts.append((f.name, name, mat))

tris, mats = [], []
for fname, link, mat in parts:
    v = load(fname)
    M = T[link]
    v = v @ M[:3, :3].T + M[:3, 3]
    tris.append(v)
    mats.append(np.full(len(v), mat, np.int8))
tris = np.concatenate(tris)
mats = np.concatenate(mats)
print("triangles", len(tris))

# Camera: orthographic, azimuth / elevation
az, el = np.radians(-28), np.radians(16)
fwd = np.array([np.sin(az) * np.cos(el), -np.cos(az) * np.cos(el), np.sin(el)])  # from target towards camera
right = np.cross([0, 0, 1], fwd)
right /= np.linalg.norm(right)
up = np.cross(fwd, right)
Rv = np.stack([right, up, fwd])  # world -> view


def project(p):
    return p @ Rv.T


V = project(tris.reshape(-1, 3)).reshape(-1, 3, 3)
lo, hi = V.reshape(-1, 3).min(0), V.reshape(-1, 3).max(0)
pad = 0.06
scale = min((W * SS) * (1 - 2 * pad) / (hi[0] - lo[0]), (H * SS) * (1 - 2 * pad) / (hi[1] - lo[1]))
cx = (lo[0] + hi[0]) / 2
cy = (lo[1] + hi[1]) / 2


def to_px(v):
    x = (v[..., 0] - cx) * scale + W * SS / 2
    y = H * SS / 2 - (v[..., 1] - cy) * scale
    return x, y, v[..., 2]


X, Y, Z = to_px(V)

# Normals and shading (two-sided Lambert, key + fill + rim)
n = np.cross(tris[:, 1] - tris[:, 0], tris[:, 2] - tris[:, 0])
n /= np.linalg.norm(n, axis=1, keepdims=True) + 1e-12
nv = n @ Rv.T
nv[nv[:, 2] < 0] *= -1  # face the camera
key = np.array([-0.45, 0.6, 0.66]); key /= np.linalg.norm(key)
fill = np.array([0.7, -0.1, 0.7]); fill /= np.linalg.norm(fill)
shade = 0.22 + 0.68 * np.clip(nv @ key, 0, 1) + 0.18 * np.clip(nv @ fill, 0, 1)
rim = np.clip(1 - nv[:, 2], 0, 1) ** 3 * 0.35
shade = np.clip(shade, 0, 1.2)

zbuf = np.full((H * SS, W * SS), -np.inf)
sbuf = np.zeros((H * SS, W * SS))
rbuf = np.zeros((H * SS, W * SS))
mbuf = np.full((H * SS, W * SS), -1, np.int8)

for i in range(len(tris)):
    x, y, z = X[i], Y[i], Z[i]
    x0, x1 = int(max(np.floor(x.min()), 0)), int(min(np.ceil(x.max()), W * SS - 1))
    y0, y1 = int(max(np.floor(y.min()), 0)), int(min(np.ceil(y.max()), H * SS - 1))
    if x1 < x0 or y1 < y0:
        continue
    px, py = np.meshgrid(np.arange(x0, x1 + 1) + 0.5, np.arange(y0, y1 + 1) + 0.5)
    d = (y[1] - y[2]) * (x[0] - x[2]) + (x[2] - x[1]) * (y[0] - y[2])
    if abs(d) < 1e-9:
        continue
    a = ((y[1] - y[2]) * (px - x[2]) + (x[2] - x[1]) * (py - y[2])) / d
    b = ((y[2] - y[0]) * (px - x[2]) + (x[0] - x[2]) * (py - y[2])) / d
    c = 1 - a - b
    inside = (a >= -1e-6) & (b >= -1e-6) & (c >= -1e-6)
    if not inside.any():
        continue
    zz = a * z[0] + b * z[1] + c * z[2]
    sub = zbuf[y0:y1 + 1, x0:x1 + 1]
    upd = inside & (zz > sub)
    sub[upd] = zz[upd]
    sbuf[y0:y1 + 1, x0:x1 + 1][upd] = shade[i]
    rbuf[y0:y1 + 1, x0:x1 + 1][upd] = rim[i]
    mbuf[y0:y1 + 1, x0:x1 + 1][upd] = mats[i]

np.savez_compressed(OUT / "buffers.npz", s=sbuf, r=rbuf, m=mbuf, z=zbuf)


def hexrgb(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float) / 255


variants = {
    "neutral": ("#a9b8cf", "#2b3752"),
    "mechanics": ("#4f9dff", "#2b3752"),
    "motors": ("#7d8ca6", "#2f8cff"),
    "dim": ("#45546e", "#1b2338"),
}
rimcol = hexrgb("#7fb6ff")
for vname, (cp, ch) in variants.items():
    img = np.zeros((H * SS, W * SS, 4))
    for m, col in ((0, hexrgb(cp)), (1, hexrgb(ch))):
        mask = mbuf == m
        s = sbuf[mask][:, None]
        base = col * s * (0.95 if m == 0 else 1.25)
        img[mask, :3] = np.clip(base + rbuf[mask][:, None] * rimcol * (0.6 if vname != "dim" else 0.2), 0, 1)
        img[mask, 3] = 1
    im = Image.fromarray((img * 255).astype(np.uint8), "RGBA").resize((W, H), Image.LANCZOS)
    im.save(OUT / f"arm_{vname}.png", optimize=True)

# Joint pixel positions for overlays (final resolution)
pts = {
    "base_motor": T["link1"] @ np.array([0, 0, 0.06, 1]),
    "shoulder": T["link2"] @ np.array([0, 0, 0, 1]),
    "elbow": T["link3"] @ np.array([0, 0, 0, 1]),
    "forearm_roll": T["link4"] @ np.array([0, 0, 0.03, 1]),
    "wrist": T["link5"] @ np.array([0, 0, 0, 1]),
    "gripper": T["link5"] @ np.array([0, 0, 0.065, 1]),
    "base_center": np.array([0, 0, 0, 1.0]),
}
res = {}
for k, p in pts.items():
    x, y, _ = to_px(project(p[:3]))
    res[k] = [round(float(x) / SS, 1), round(float(y) / SS, 1)]
res["size"] = [W, H]
(OUT / "joints.json").write_text(json.dumps(res, indent=1))
print(json.dumps(res))
