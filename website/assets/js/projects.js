/*
 * Portfolio data.
 *
 * To add a project, copy one entry and adjust it. Fields:
 *   title       - card heading
 *   summary     - one or two sentences shown on the card
 *   features    - optional bullet points (shown on the Projects page only)
 *   status      - short label, e.g. "In progress", "Active", "v1.0.0 · Stable"
 *   stable      - true shows a green status dot, false an amber one
 *   featured    - true shows the project on the home page (max. 3 are shown)
 *   categories  - used by the filters on the Projects page
 *   highlights  - optional measured numbers, up to three { value, label } pairs
 *   tags        - technology badges
 *   links       - any of: docs, manual, release, article, repo, demo (full URLs)
 *   art         - built-in illustration: "robot", "container", "can", "chip", "bus"
 *   image       - optional path to a photo (e.g. "assets/img/projects/foo.jpg");
 *                 when set it replaces the illustration
 */
window.SFS_PROJECTS = [
  {
    title: "Baton-C",
    summary:
      "Deterministic master/slave messaging for several MCUs on one shared UART line (single-wire half duplex or RS-485): no collisions, a bounded cycle, exactly-once in-order events.",
    features: [
      "Token passing: one transmitter at a time, worst-case cycle computed from the configuration",
      "Exactly-once, in-order events and latest-value states; CRC-16, retries, every loss reported",
      "Bus simulation with line noise and dead nodes on 100 seeds under ASan/UBSan",
      "Zephyr module, bare-metal and host examples; Baton Inspector GUI and Python test API",
    ],
    status: "v1.0.0 · Stable",
    stable: true,
    featured: true,
    categories: ["Libraries", "RTOS"],
    highlights: [
      { value: "1.7 KB", label: "RAM per node" },
      { value: "280 B", label: "worst-case stack" },
      { value: "0", label: "MISRA violations" },
    ],
    tags: ["C11", "UART", "RS-485", "Zephyr", "MISRA C:2012", "Apache-2.0"],
    links: {
      docs: "https://antonvynohradov.github.io/Baton-C/",
      manual: "https://antonvynohradov.github.io/Baton-C/downloads/Baton-C_User_Manual.pdf",
      article: "https://systemfromscratch-articles.github.io/Baton-C-One-wire-many-MCUs-no-lost-messages/",
      repo: "https://github.com/AntonVynohradov/Baton-C",
    },
    art: "bus",
  },
  {
    title: "ISOTP-C",
    summary:
      "ISO 15765-2 (ISO-TP) transport protocol for classical CAN: messages up to 4095 bytes — or longer with 32-bit lengths — for UDS diagnostics, OBD and CAN bootloaders.",
    features: [
      "Version 2: rewritten with a layered codec + link API; time is an argument, no clock or platform calls",
      "82 unit tests at 100 % line and branch coverage, 62 integration tests against a Python twin",
      "Cppcheck MISRA C:2012 gate in CI with 0 violations and a documented deviation register",
      "Examples for bare metal, Linux SocketCAN and Zephyr",
    ],
    status: "v2.0.1 · Stable",
    stable: true,
    featured: true,
    categories: ["Libraries", "Automotive"],
    highlights: [
      { value: "1.8 KB", label: "code size" },
      { value: "120 B", label: "worst-case stack" },
      { value: "144", label: "automated tests" },
    ],
    tags: ["C11", "CAN", "ISO 15765-2", "UDS", "MISRA C:2012", "MIT"],
    links: {
      docs: "https://antonvynohradov.github.io/isotp-c/",
      manual: "https://antonvynohradov.github.io/isotp-c/downloads/ISOTP-C_User_Manual.pdf",
      repo: "https://github.com/AntonVynohradov/isotp-c",
    },
    art: "can",
  },
  {
    title: "DXL2-C",
    summary:
      "ROBOTIS DYNAMIXEL Protocol 2.0 wire format in portable C — for building your own DYNAMIXEL-compatible actuators or controlling servos from any MCU, without a heap or an RTOS.",
    features: [
      "CRC-16, byte stuffing and an incremental parser that resynchronises after line noise",
      "Every instruction and status error code of the specification; ROBOTIS packets as regression vectors",
      "100 % line and branch coverage, C/Python cross-check, 0 Cppcheck MISRA C:2012 violations",
      "DXL2 Studio GUI for simulation and serial-port debugging; bare-metal, Zephyr and PC examples",
    ],
    status: "v1.0.0 · Stable",
    stable: true,
    featured: true,
    categories: ["Libraries", "Robotics"],
    highlights: [
      { value: "100 %", label: "branch coverage" },
      { value: "0", label: "MISRA violations" },
      { value: "0 B", label: "heap" },
    ],
    tags: ["C11", "DYNAMIXEL", "Robotics", "Zephyr", "MISRA C:2012", "Apache-2.0"],
    links: {
      docs: "https://antonvynohradov.github.io/DXL2-C/",
      manual: "https://antonvynohradov.github.io/DXL2-C/downloads/DXL2-C_User_Manual.pdf",
      repo: "https://github.com/AntonVynohradov/DXL2-C",
    },
    art: "chip",
  },
  {
    title: "SmartManipulator-X",
    summary:
      "6+1 axis robotic arm: BCN3D Moveo mechanics driven by a SmartFusion2 controller that emulates DYNAMIXEL servos, so the ROBOTIS OpenMANIPULATOR-X ROS 2 stack controls it unchanged.",
    features: [
      "Zephyr RTOS firmware on Microchip SmartFusion2 M2S010 (Cortex-M3 + FPGA)",
      "DYNAMIXEL Protocol 2.0 emulation of six stepper axes and a servo gripper",
      "ROS 2 Jazzy, ros2_control and MoveIt 2 on a Dockerised Robot PC",
      "TMC5160 stepper drivers, Python diagnostics and conformance checks",
    ],
    status: "In progress",
    stable: false,
    featured: false,
    categories: ["Robotics", "RTOS", "FPGA"],
    tags: ["Zephyr", "SmartFusion2", "ROS 2", "DYNAMIXEL", "C", "Python", "Docker"],
    links: {
      docs: "https://antonvynohradov.github.io/SmartManipulator-X-Robot-PC/",
      repo: "https://github.com/AntonVynohradov/SmartManipulator-X-Robot-PC",
    },
    art: "robot",
  },
  {
    title: "Zephyr SmartFusion2 Workspace",
    summary:
      "Reproducible, Docker-based Zephyr RTOS build environment for the Microchip SmartFusion2 M2S010 (ARM Cortex-M3), ready for VS Code Dev Containers and CI/CD.",
    features: [
      "Pinned Zephyr SDK and west versions for bit-exact rebuilds",
      "VS Code Dev Container with build, pristine-build and debug tasks",
      "Persistent host-side ccache for fast incremental builds",
      "CI-ready pipeline producing ELF, HEX and BIN artefacts",
    ],
    status: "Active",
    stable: true,
    featured: false,
    categories: ["RTOS", "Tooling"],
    tags: ["Zephyr", "Cortex-M3", "Docker", "west", "CMake", "CI/CD"],
    links: {
      repo: "https://github.com/AntonVynohradov/Zephyr-SmartFusion2-workspace",
    },
    art: "container",
  },
];

/*
 * Technical articles. Fields:
 *   title, summary, date ("Month YYYY"), image (full URL or path),
 *   results  - up to three { value, label } pairs quoted from the article
 *   tags, links (read, repo)
 */
window.SFS_ARTICLES = [
  {
    title: "One wire, many MCUs, no lost messages: Baton-C as a Zephyr module",
    summary:
      "How a deterministic single-wire UART bus written in MISRA C became a Zephyr module: devicetree binding, interrupt glue and a three-node bus tested on native_sim under five line-noise patterns. Every number is reproducible from the repository.",
    date: "October 2026",
    image:
      "https://systemfromscratch-articles.github.io/Baton-C-One-wire-many-MCUs-no-lost-messages/assets/images/social-card.png",
    results: [
      { value: "40 / 40", label: "test cases passed across five noise patterns" },
      { value: "200 / 200", label: "events delivered with 1 corrupted byte in 150" },
      { value: "≈ 6 KB", label: "of library code on Cortex-M3 (-Os); the integration replaces ~200 lines of hand-written UART ISR code" },
    ],
    tags: ["Zephyr", "UART", "MISRA C", "native_sim", "SmartFusion2"],
    links: {
      read: "https://systemfromscratch-articles.github.io/Baton-C-One-wire-many-MCUs-no-lost-messages/",
      repo: "https://github.com/SystemFromScratch-Articles/Baton-C-One-wire-many-MCUs-no-lost-messages",
    },
  },
];
