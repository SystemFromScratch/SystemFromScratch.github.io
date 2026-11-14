/*
 * Layer explorer and architecture switch for the home page and robot.html.
 *
 * Markup contract (all content lives in the HTML; this file only switches it):
 *   [data-explorer]            tablist wrapper
 *     .layer-tab[data-layer]   one tab per layer (button, role="tab")
 *     .layer-panel[data-layer] one panel per layer; optional data-img, data-parts
 *   .layer-stack g[data-layer] layers of the stacked illustration (highlighted)
 *   .arm-frame                 robot render; gets data-parts and data-arch
 *   [data-arm-img]             <img> swapped to the panel's data-img
 *   [data-layer-name]          text set to the selected layer's name
 *   .path-step[data-layer]     signal path steps highlighted for the layer
 *   [data-arch-switch]         .arch-tab[data-arch] + .arch-panel[data-arch]
 *   .arm-frame, .arch-figure, .arch-table, [data-arch-name] follow the selected architecture
 *
 * Without JavaScript every panel stays visible.
 */
(function () {
  "use strict";

  function each(nodes, fn) {
    Array.prototype.forEach.call(nodes, fn);
  }

  function initTabs(root, tabSelector, onSelect) {
    var tabs = root.querySelectorAll(tabSelector);
    if (!tabs.length) return;

    function select(tab, focus) {
      each(tabs, function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.setAttribute("tabindex", on ? "0" : "-1");
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
      onSelect(tab);
    }

    each(tabs, function (tab, i) {
      tab.addEventListener("click", function () {
        select(tab, false);
      });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          e.preventDefault();
          select(next, true);
        }
      });
    });

    var initial = root.querySelector(tabSelector + '[aria-selected="true"]') || tabs[0];
    select(initial, false);
  }

  function showLayer(tab) {
    var id = tab.getAttribute("data-layer");
    var panel = document.getElementById(tab.getAttribute("aria-controls"));

    each(document.querySelectorAll(".layer-stack g[data-layer]"), function (g) {
      g.classList.toggle("is-on", g.getAttribute("data-layer") === id);
    });

    each(document.querySelectorAll(".path-step[data-layer]"), function (step) {
      step.classList.toggle("is-on", step.getAttribute("data-layer") === id);
    });

    each(document.querySelectorAll("[data-layer-name]"), function (el) {
      el.textContent = tab.getAttribute("data-name") || "";
    });

    if (!panel) return;
    var frame = document.querySelector(".arm-frame");
    if (frame) frame.setAttribute("data-parts", panel.getAttribute("data-parts") || "");

    var img = document.querySelector("[data-arm-img]");
    var src = panel.getAttribute("data-img");
    if (img && src && img.getAttribute("src") !== src) {
      img.setAttribute("src", src);
      img.setAttribute("alt", "SmartManipulator-X arm, " + (tab.getAttribute("data-name") || "") + " highlighted");
    }
  }

  function showArch(tab) {
    var id = tab.getAttribute("data-arch");
    each(document.querySelectorAll(".arm-frame, .arch-table, .arch-figure"), function (el) {
      el.setAttribute("data-arch", id);
    });
    each(document.querySelectorAll("[data-arch-name]"), function (el) {
      el.textContent = tab.getAttribute("data-short") || "";
    });
  }

  function preloadArmImages() {
    each(document.querySelectorAll(".layer-panel[data-img]"), function (p) {
      var img = new Image();
      img.src = p.getAttribute("data-img");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    each(document.querySelectorAll("[data-explorer]"), function (root) {
      initTabs(root, ".layer-tab", showLayer);
    });
    each(document.querySelectorAll("[data-arch-switch]"), function (root) {
      initTabs(root, ".arch-tab", showArch);
    });
    if (document.querySelector("[data-arm-img]")) {
      if ("requestIdleCallback" in window) window.requestIdleCallback(preloadArmImages);
      else window.setTimeout(preloadArmImages, 1500);
    }
  });
})();
