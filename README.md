# SystemFromScratch® Website

Official corporate website repository for SystemFromScratch®.

## About

SystemFromScratch® is a premium engineering consultancy specializing in:

- Embedded firmware
- Hardware bring-up and integration (hardware design with partner engineers)
- Cybersecurity engineering
- MISRA compliance
- CRA readiness
- Certification-focused product development

## Website

🌐 https://systemfromscratch.com

## Purpose

This repository contains source files, documentation, branding assets, and deployment configuration for the official SystemFromScratch® web presence.

## Technology Stack

- Static HTML / CSS / vanilla JavaScript (no build step)
- GitHub Pages (deployed from `website/` to the `gh-pages` branch by GitHub Actions)
- Served at https://systemfromscratch.com (custom domain set by `cname:` in the deploy workflow)

## Structure

```
website/
├── index.html              Home page (hero, problems, the seven layers / services, CRA, released libraries, selected work, about, contact)
├── robot.html              SmartManipulator-X case study (layers, signal path, architectures, Doppelstep, evidence)
├── projects.html           Full portfolio with category filters
├── articles.html           Full list of articles
└── assets/
    ├── css/
    │   ├── style.css       Site-wide styles and tokens
    │   └── pages.css       Home page layers and robot case study
    ├── img/
    │   └── robot/          Arm renders (from the BCN3D Moveo CAD), RViz2 and Doppelstep images
    └── js/
        ├── projects.js     Portfolio and article data — edit this to add projects or articles
        ├── main.js         Navigation and project rendering
        └── layers.js       Layer explorer and architecture switch (index.html, robot.html)
```

## Adding a project

Add an entry to `website/assets/js/projects.js`; it appears on the **Projects** page.
The home page no longer renders project cards from this file: its library and
selected-work cards are written in `index.html`, so `featured` and `homeSection`
are kept only for a future home page section. `highlights` adds up to three
measured numbers to the card, and `links` accepts `docs`, `manual`, `article`, `repo` and
`demo`. Optionally set `image` to a photo path to replace the built-in illustration.

## Adding an article

Add an entry to `window.SFS_ARTICLES` in the same file. Articles appear on the
**Articles** page, newest first in the order of the list. To feature one on the home
page, add a card to the **Selected work** section of `index.html`.

## Home page layers and robot case study

The seven layers on `index.html` and `robot.html` are plain HTML: each layer is a
`.layer-tab` button plus a `.layer-panel`, and `layers.js` only switches between them
(without JavaScript every panel is shown). On `robot.html` a panel's `data-img` picks
the arm render and `data-parts` highlights the joints (`motor`), the controller
(`ctrl`) or the ROS 2 PC (`pc`).

The arm renders in `assets/img/robot/arm-*.webp` are made from the robot description
meshes of [SmartManipulator-X](https://github.com/SystemFromScratch/sfs-smartmanipulator-x-robot)
(generated from the BCN3D Moveo CAD, MIT licence) with `tools/render_arm.py`.

## Local preview

In VS Code: **Terminal → Run Build Task** (`Ctrl+Shift+B`) runs **Website: preview**, which
starts a local server and opens http://localhost:8000 in the browser. Stop it with the trash
icon in the terminal panel. Only Python 3 is needed (standard library, no virtualenv).

Without VS Code:

```
python -m http.server -d website 8000
```

## Legal Notice

SystemFromScratch® is a registered trademark.

All website content, branding, and materials are protected under applicable intellectual property laws.

## License

All Rights Reserved.

Unauthorized copying, reproduction, or commercial use is prohibited.

## Contact

📩 avynohradov@systemfromscratch.com