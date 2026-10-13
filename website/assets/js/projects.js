/*
 * Portfolio data.
 *
 * To add a project, copy one entry and adjust it. Fields:
 *   title       - card heading
 *   summary     - one or two sentences shown on the card
 *   features    - optional bullet points (shown on the Projects page only)
 *   status      - short label, e.g. "In progress", "Active", "Stable"
 *   stable      - true shows a green status dot, false an amber one
 *   featured    - true shows the project on the home page (max. 3 are shown)
 *   categories  - used by the filters on the Projects page
 *   tags        - technology badges
 *   links       - any of: docs, repo, demo (full URLs)
 *   art         - built-in illustration: "robot", "container", "can", "chip"
 *   image       - optional path to a photo (e.g. "assets/img/projects/foo.jpg");
 *                 when set it replaces the illustration
 */
window.SFS_PROJECTS = [
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
    featured: true,
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
    featured: true,
    categories: ["RTOS", "Tooling"],
    tags: ["Zephyr", "Cortex-M3", "Docker", "west", "CMake", "CI/CD"],
    links: {
      repo: "https://github.com/AntonVynohradov/Zephyr-SmartFusion2-workspace",
    },
    art: "container",
  },
  {
    title: "ISO-TP-C",
    summary:
      "C implementation of the ISO 15765-2 (ISO-TP) CAN transport protocol, being refactored into a production-grade, platform-agnostic library for embedded targets.",
    features: [
      "Segmentation and reassembly of payloads up to 4095 bytes",
      "Full-duplex single and multi-frame transfers",
      "Platform-agnostic design via dependency injection",
      "Roadmap: full unit-test coverage and MISRA C:2012 compliance",
    ],
    status: "Refactoring",
    stable: false,
    featured: true,
    categories: ["Automotive", "Libraries"],
    tags: ["C", "CAN", "ISO 15765-2", "CMake", "MISRA C"],
    links: {
      docs: "https://antonvynohradov.github.io/isotp-c/",
      repo: "https://github.com/AntonVynohradov/isotp-c",
    },
    art: "can",
  },
  {
    title: "DXL2-C",
    summary:
      "Portable C11 library implementing the ROBOTIS DYNAMIXEL Protocol 2.0 wire format for embedded targets — heap-free, transport-agnostic and built with MISRA C:2012 in mind.",
    features: [
      "CRC-16, byte stuffing and an incremental parser that recovers from line noise",
      "Bounded packet encoder and transport-independent link layer via callbacks",
      "GoogleTest unit tests, pytest integration tests and a Python reference codec",
      "Cppcheck MISRA addon, CodeQL and DXL2 Studio GUI for simulation and debugging",
    ],
    status: "In progress",
    stable: false,
    featured: false,
    categories: ["Robotics", "Libraries"],
    tags: ["C", "DYNAMIXEL", "MISRA C", "CMake", "GoogleTest", "Python"],
    links: {
      docs: "https://antonvynohradov.github.io/DXL2-C/",
      repo: "https://github.com/AntonVynohradov/DXL2-C",
    },
    art: "chip",
  },
];
