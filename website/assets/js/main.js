(function () {
  "use strict";

  /* ---------- Icons & illustrations ---------- */

  var ICONS = {
    docs:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2Z"/><path d="M8 7h6M8 11h6"/></svg>',
    repo:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    manual:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z"/><path d="M14 3v5h5M12 11v6M9 14l3 3 3-3"/></svg>',
    article:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
    demo:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  };
  ICONS.read = ICONS.article;

  var LINK_LABELS = {
    docs: "Documentation",
    manual: "PDF manual",
    article: "Article",
    read: "Read the article",
    repo: "Source code",
    demo: "Live demo",
  };

  var ART = {
    robot:
      '<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M40 108h70"/><rect x="58" y="92" width="34" height="16" rx="3"/><circle cx="75" cy="86" r="7"/><path d="M75 79 96 42"/><circle cx="98" cy="38" r="7"/><path d="M104 36 146 30"/><circle cx="150" cy="30" r="6"/><path d="M156 30h10M166 30l8-8M166 30l8 8"/><path d="M20 108h8M122 108h8" opacity=".5"/></svg>',
    container:
      '<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="40" y="20" width="120" height="80" rx="8"/><path d="M40 38h120"/><circle cx="52" cy="29" r="2.5" fill="currentColor"/><circle cx="62" cy="29" r="2.5" fill="currentColor"/><circle cx="72" cy="29" r="2.5" fill="currentColor"/><path d="m58 58 14 10-14 10M82 80h26"/><path d="M128 54h16M128 66h16M128 78h16" opacity=".55"/></svg>',
    can:
      '<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 46h22v-16h18v16h14v-16h26v16h10v-16h18v16h14v-16h18v16h32"/><path d="M14 74h22v16h18v-16h14v16h26v-16h10v16h18v-16h14v16h18v-16h32" opacity=".55"/><path d="M14 104h172" opacity=".3" stroke-dasharray="4 6"/></svg>',
    chip:
      '<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="68" y="28" width="64" height="64" rx="6"/><rect x="84" y="44" width="32" height="32" rx="3"/><path d="M80 28V16M100 28V16M120 28V16M80 104V92M100 104V92M120 104V92M68 40H56M68 60H56M68 80H56M144 40h-12M144 60h-12M144 80h-12"/></svg>',
    bus:
      '<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 86h168"/><rect x="22" y="30" width="36" height="28" rx="4"/><rect x="82" y="30" width="36" height="28" rx="4"/><rect x="142" y="30" width="36" height="28" rx="4"/><path d="M40 58v28M100 58v28M160 58v28"/><circle cx="100" cy="86" r="5" fill="currentColor"/><path d="M58 20q21-12 42 0M118 20q21-12 42 0" opacity=".55"/><path d="m94 18 6 2-2 6M154 18l6 2-2 6" opacity=".55"/></svg>',
    stepper:
      '<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="20" y="28" width="64" height="64" rx="6"/><circle cx="52" cy="60" r="20"/><circle cx="52" cy="60" r="5" fill="currentColor"/><path d="M84 60h14"/><path d="M110 60q11-30 22 0t22 0 22 0"/><path d="M110 60q11 30 22 0t22 0 22 0" opacity=".55"/><path d="M110 98h66" opacity=".3" stroke-dasharray="4 6"/></svg>',
  };

  var CODE_ART = {
    robot: "ping id=1 -> status OK\nwrite goal_position[1] = 2048\nread present_position -> 2047\nwrite goal_position[2] = 1536\ntorque_enable = 1\nros2 control list_controllers\n  arm_controller   active\n  gripper_ctrl     active",
    container: "$ west init -l app\n$ west update\n$ west build -b m2s010_mkr_kit app\n[142/142] Linking C executable zephyr.elf\nMemory region   Used Size\n  FLASH:         48 KB\n  SRAM:          12 KB\n$ ccache -s",
    can: "7E0  [8]  10 14 2E F1 90 57 30 4C\n7E8  [8]  30 00 00 00 00 00 00 00\n7E0  [8]  21 33 32 33 34 35 36 37\n7E0  [8]  22 38 39 41 42 43 44 45\n7E8  [8]  03 6E F1 90 AA AA AA AA\nisotp: rx complete, 20 bytes",
    chip: "FF FF FD 00 01 03 00 01 19 4E\nFF FF FD 00 01 07 00 55 00 06 04 26 65 5D\nping id=1 -> model 1030, fw 38\nFF FF FD 00 01 09 00 03 74 00 00 08 00 00 ..\nwrite goal_position -> status OK",
    stepper: "move_to(3200)  1/16 microstep\nfast loop 20 kHz  slow loop 1 kHz\nia_ref = +1.414 A  ia = +1.409 A\nib_ref = -0.000 A  ib = +0.003 A\nvbus = 24.0 V  state = RUN\nposition = 3200  -> target reached",
    bus: "POLL  01 -> 11  seq=3\nDATA  11 -> 12  [evt 0x21] seq=7\nACK   12 -> 11  seq=7\nRESP  11 -> 01  ok\nPOLL  01 -> 12  seq=4\nRESP  12 -> 01  ok\nPOLL  01 -> 11  seq=4",
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderMedia(project) {
    var art = project.art && ART[project.art] ? project.art : "chip";
    var inner;
    if (project.image) {
      inner = '<img src="' + escapeHtml(project.image) + '" alt="" loading="lazy">';
    } else {
      inner =
        '<div class="code-art" aria-hidden="true">' + escapeHtml(CODE_ART[art] || "") + "</div>" +
        '<div class="art" aria-hidden="true">' + ART[art] + "</div>";
    }
    var status = project.status
      ? '<span class="project-status' + (project.stable ? " is-stable" : "") + '">' +
        escapeHtml(project.status) + "</span>"
      : "";
    return '<div class="project-media">' + inner + status + "</div>";
  }

  function renderLinks(links) {
    return Object.keys(links || {})
      .map(function (key) {
        return '<a href="' + escapeHtml(links[key]) + '" target="_blank" rel="noopener">' +
          (ICONS[key] || ICONS.demo) + (LINK_LABELS[key] || key) + "</a>";
      })
      .join("");
  }

  function renderMetrics(items, className) {
    if (!items || !items.length) return "";
    return (
      '<dl class="' + className + '">' +
      items.slice(0, 3).map(function (m) {
        return "<div><dt>" + escapeHtml(m.value) + "</dt><dd>" + escapeHtml(m.label) + "</dd></div>";
      }).join("") +
      "</dl>"
    );
  }

  function renderArticle(article) {
    var tags = (article.tags || [])
      .map(function (t) { return '<li class="tag">' + escapeHtml(t) + "</li>"; })
      .join("");
    var media = article.image
      ? '<a class="article-media" href="' + escapeHtml((article.links || {}).read || "#") +
        '" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true"><img src="' +
        escapeHtml(article.image) + '" alt="" loading="lazy"></a>'
      : "";

    return (
      '<article class="card article-card reveal">' +
      media +
      '<div class="article-body">' +
      (article.date ? '<span class="article-date">' + escapeHtml(article.date) + "</span>" : "") +
      "<h3>" + escapeHtml(article.title) + "</h3>" +
      "<p>" + escapeHtml(article.summary) + "</p>" +
      renderMetrics(article.results, "article-results") +
      (tags ? '<ul class="project-tags">' + tags + "</ul>" : "") +
      '<div class="project-links">' + renderLinks(article.links) + "</div>" +
      "</div></article>"
    );
  }

  function renderCard(project, detailed) {
    var tags = (project.tags || [])
      .map(function (t) { return '<li class="tag">' + escapeHtml(t) + "</li>"; })
      .join("");

    var features = detailed && project.features && project.features.length
      ? '<ul class="project-features">' +
        project.features.map(function (f) { return "<li>" + escapeHtml(f) + "</li>"; }).join("") +
        "</ul>"
      : "";

    var links = renderLinks(project.links);

    return (
      '<article class="card project-card reveal">' +
      renderMedia(project) +
      '<div class="project-body">' +
      "<h3>" + escapeHtml(project.title) + "</h3>" +
      "<p>" + escapeHtml(project.summary) + "</p>" +
      renderMetrics(project.highlights, "project-metrics") +
      features +
      (tags ? '<ul class="project-tags">' + tags + "</ul>" : "") +
      (links ? '<div class="project-links">' + links + "</div>" : "") +
      "</div></article>"
    );
  }

  /* ---------- Projects rendering ---------- */

  function initProjects() {
    var projects = window.SFS_PROJECTS || [];

    var articlesEl = document.querySelector("[data-articles]");
    if (articlesEl) {
      var articles = window.SFS_ARTICLES || [];
      if (articlesEl.getAttribute("data-articles") === "latest") articles = articles.slice(0, 3);
      articlesEl.innerHTML = articles.map(renderArticle).join("");
    }

    var featuredEl = document.querySelector('[data-projects="featured"]');
    if (featuredEl) {
      featuredEl.innerHTML = projects
        .filter(function (p) { return p.featured; })
        .slice(0, 3)
        .map(function (p) { return renderCard(p, false); })
        .join("");
    }

    var allEl = document.querySelector('[data-projects="all"]');
    if (!allEl) return;

    var filtersEl = document.querySelector("[data-project-filters]");
    var categories = [];
    projects.forEach(function (p) {
      (p.categories || []).forEach(function (c) {
        if (categories.indexOf(c) === -1) categories.push(c);
      });
    });

    function draw(category) {
      var list = category === "All"
        ? projects
        : projects.filter(function (p) { return (p.categories || []).indexOf(category) !== -1; });
      allEl.innerHTML = list.length
        ? list.map(function (p) { return renderCard(p, true); }).join("")
        : '<p class="empty-note">No projects in this category yet.</p>';
      observeReveal(allEl.querySelectorAll(".reveal"));
    }

    if (filtersEl && categories.length > 1) {
      filtersEl.innerHTML = ["All"].concat(categories)
        .map(function (c, i) {
          return '<button type="button" class="filter' + (i === 0 ? " is-active" : "") +
            '" data-category="' + escapeHtml(c) + '">' + escapeHtml(c) + "</button>";
        })
        .join("");
      filtersEl.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter");
        if (!btn) return;
        filtersEl.querySelectorAll(".filter").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        draw(btn.getAttribute("data-category"));
      });
    }

    draw("All");
  }

  /* ---------- Navigation ---------- */

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    links.forEach(function (a) {
      var section = document.querySelector(a.getAttribute("href"));
      if (section) map[section.id] = a;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) { a.classList.remove("active"); });
          var link = map[entry.target.id];
          if (link) link.classList.add("active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(map).forEach(function (id) {
      observer.observe(document.getElementById(id));
    });
  }

  /* ---------- Reveal on scroll ---------- */

  var revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px" }
      )
    : null;

  function observeReveal(nodes) {
    Array.prototype.forEach.call(nodes, function (el) {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add("is-visible");
    });
  }

  /* ---------- Init ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initProjects();
    initScrollSpy();
    observeReveal(document.querySelectorAll(".reveal"));
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });
})();
