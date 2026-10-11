# SystemFromScratch® Website

Official corporate website repository for SystemFromScratch®.

## About

SystemFromScratch® is a premium engineering consultancy specializing in:

- Embedded firmware
- Hardware/software integration
- Cybersecurity engineering
- MISRA compliance
- CRA readiness
- Certification-focused product development

## Website

🌐 http://SystemFromScratch.com

## Purpose

This repository contains source files, documentation, branding assets, and deployment configuration for the official SystemFromScratch® web presence.

## Technology Stack

- Static HTML / CSS / vanilla JavaScript (no build step)
- GitHub Pages (deployed from `website/` to the `gh-pages` branch by GitHub Actions)
- Custom domain

## Structure

```
website/
├── index.html              Home page (hero, services, expertise, projects, about, contact)
├── projects.html           Full portfolio with category filters
├── CNAME
└── assets/
    ├── css/style.css
    ├── img/                Logos, favicon (add project photos under img/projects/)
    └── js/
        ├── projects.js     Portfolio data — edit this to add projects
        └── main.js         Navigation and project rendering
```

## Adding a project

Add an entry to `website/assets/js/projects.js`. Set `featured: true` to show it on the
home page (the first three featured entries are shown). Optionally set `image` to a photo
path to replace the built-in illustration.

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