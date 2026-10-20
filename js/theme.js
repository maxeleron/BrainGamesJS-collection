/**
 * BrainGamesJS — shared theme controller
 * Persists light/dark preference under localStorage key `bgjs_theme`.
 * Apply on <html data-theme="light|dark">. Default: light.
 */
(function (global) {
  "use strict";

  var THEME_KEY = "bgjs_theme";
  var DEFAULT_THEME = "light";

  function normalizeTheme(value) {
    return value === "dark" ? "dark" : "light";
  }

  function getStoredTheme() {
    try {
      return normalizeTheme(localStorage.getItem(THEME_KEY) || DEFAULT_THEME);
    } catch (e) {
      return DEFAULT_THEME;
    }
  }

  function applyTheme(theme) {
    var t = normalizeTheme(theme);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch (e) {
      /* private mode / blocked storage */
    }
    syncThemeControls(t);
    return t;
  }

  function syncThemeControls(theme) {
    var t = normalizeTheme(theme || getStoredTheme());
    var toggleButton = document.getElementById("themeToggleBtn");
    if (toggleButton) {
      toggleButton.setAttribute("aria-pressed", String(t === "dark"));
      toggleButton.setAttribute("title", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    var radios = document.querySelectorAll('input[name="bgjs_theme"]');
    for (var i = 0; i < radios.length; i++) {
      radios[i].checked = radios[i].value === t;
      var label = radios[i].closest("label");
      if (label) {
        if (radios[i].checked) label.classList.add("is-active");
        else label.classList.remove("is-active");
      }
    }
  }

  function onThemeControlChange(event) {
    var target = event.target;
    if (!target || target.name !== "bgjs_theme") return;
    applyTheme(target.value);
  }

  function onThemeToggleClick() {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  }

  /**
   * Wire available theme controls and apply saved theme.
   * Safe to call after DOM is ready.
   */
  function initTheme() {
    applyTheme(getStoredTheme());

    var toggleButton = document.getElementById("themeToggleBtn");
    if (toggleButton) {
      toggleButton.addEventListener("click", onThemeToggleClick);
    }

    // Other games still use radio controls; Colors Order has no change listener.
    if (document.querySelectorAll('input[name="bgjs_theme"]').length) {
      document.addEventListener("change", onThemeControlChange);
    }
  }

  // Early apply if script runs after DOM exists; FOUC prevented by head snippet
  if (document.documentElement) {
    document.documentElement.setAttribute("data-theme", getStoredTheme());
  }

  global.BGJSTheme = {
    THEME_KEY: THEME_KEY,
    DEFAULT_THEME: DEFAULT_THEME,
    getStoredTheme: getStoredTheme,
    applyTheme: applyTheme,
    syncThemeControls: syncThemeControls,
    initTheme: initTheme,
  };
})(typeof window !== "undefined" ? window : this);
