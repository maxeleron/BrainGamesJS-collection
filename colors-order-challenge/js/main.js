"use strict";
const DEFAULT_CUSTOM_WIDTH = 256;
const DEFAULT_CUSTOM_HEIGHT = 112;
const MIN_CUSTOM_SIZE = 48;

function customDimensionOrDefault(value, fallback) {
  const dimension = Number(value);
  return Number.isFinite(dimension) && dimension >= MIN_CUSTOM_SIZE ? dimension : fallback;
}

/* Settings
==================*/
class Settings {
  constructor() {
    //if settings don`t ever saved, give settings to a user
    if (!localStorage["settingsObject"]) {
      this.restoreDefaults();
    }
    //if there are local settings implement them to current game
    else {
      const { tilesAmount, tileSize = "medium", tileDisplay, customWidth, customHeight, showGameRules } = JSON.parse(
        localStorage.getItem("settingsObject")
      );
      this.tilesAmount = tilesAmount;
      this.tileSize = tileSize;
      this.tileDisplay = tileDisplay || "horizontal";
      this.customWidth = customDimensionOrDefault(customWidth, DEFAULT_CUSTOM_WIDTH);
      this.customHeight = customDimensionOrDefault(customHeight, DEFAULT_CUSTOM_HEIGHT);
      this.showGameRules = showGameRules;
    }
  }
  save() {
    localStorage.setItem("settingsObject", JSON.stringify(this));
  }
  restoreDefaults() {
    this.tilesAmount = 8;
    this.tileSize = "medium";
    this.tileDisplay = "horizontal";
    this.customWidth = DEFAULT_CUSTOM_WIDTH;
    this.customHeight = DEFAULT_CUSTOM_HEIGHT;
    this.showGameRules = true;
    this.save();
  }
}

//Local Settings Object
let settingsObject = new Settings();

// Theme (shared across collection)
if (window.BGJSTheme) {
  window.BGJSTheme.initTheme();
}

//Getting settings ui elements
const settingsBtn = document.getElementById("settingsGear");
const settingsWindow = document.getElementById("settingsWindow");
const closeSettingsWindow = document.getElementById("closeSettingsWindow");
const gameRulesEl = document.getElementById("gameRules");

function isSettingsOpen() {
  var d = settingsWindow.style.display;
  return d === "block" || d === "flex";
}

function openSettings() {
  syncSettingsForm();
  settingsWindow.style.display = "flex";
  document.body.classList.add("modal-open");
}

function closeSettings() {
  settingsWindow.style.display = "none";
  document.body.classList.remove("modal-open");
}

settingsBtn.addEventListener("click", () => {
  if (isSettingsOpen()) closeSettings();
  else openSettings();
});

closeSettingsWindow.addEventListener("click", () => {
  closeSettings();
});

//Settings ui elements
const tilesAmountInput = document.getElementById("tilesAmount");
const tilesSizeInputs = document.querySelectorAll('input[name="tileSize"]');
const tilesDisplayInputs = document.querySelectorAll('input[name="tileDisplay"]');
const gameRulesToggle = document.getElementById("gameRulesToggle");
const saveSettingsBtn = document.getElementById("saveLocalSettings");
const restoreSettingsBtn = document.getElementById("restoreSettings");
const editCustomSizeBtn = document.getElementById("editCustomSizeBtn");
const customSizeEditor = document.getElementById("customSizeEditor");
const customTilePreview = document.getElementById("customTilePreview");
const saveCustomSizeBtn = document.getElementById("saveCustomSizeBtn");
const cancelCustomSizeBtn = document.getElementById("cancelCustomSizeBtn");
const customSizeInput = document.querySelector('input[name="tileSize"][value="custom"]');
let initialCustomSize = null;
let customEditorCloseTimeout;
let customEditorClosing = false;

function readCustomPreviewSize() {
  const style = getComputedStyle(customTilePreview);
  return { width: Math.round(parseFloat(style.width)), height: Math.round(parseFloat(style.height)) };
}

function closeCustomSizeEditor() {
  clearTimeout(customEditorCloseTimeout);
  customSizeEditor.style.display = "none";
  customSizeEditor.classList.remove("anim-success", "anim-error");
  editCustomSizeBtn.setAttribute("aria-expanded", "false");
  saveCustomSizeBtn.disabled = true;
  cancelCustomSizeBtn.disabled = false;
  initialCustomSize = null;
  customEditorClosing = false;
}

function finishCustomSizeEdit(animation) {
  customEditorClosing = true;
  saveCustomSizeBtn.disabled = true;
  cancelCustomSizeBtn.disabled = true;
  customTilePreview.style.resize = "none";
  customSizeEditor.classList.add(animation);
  customEditorCloseTimeout = setTimeout(closeCustomSizeEditor, 500);
}

editCustomSizeBtn.addEventListener("click", () => {
  closeCustomSizeEditor();
  customTilePreview.style.background = COLORS_ARR[Math.floor(Math.random() * COLORS_ARR.length)];
  customTilePreview.style.width = settingsObject.customWidth + "px";
  customTilePreview.style.height = settingsObject.customHeight + "px";
  customTilePreview.style.resize = "both";
  customSizeEditor.style.display = "flex";
  editCustomSizeBtn.setAttribute("aria-expanded", "true");
  initialCustomSize = {
    ...readCustomPreviewSize(),
    styleWidth: customTilePreview.style.width,
    styleHeight: customTilePreview.style.height,
  };
});

const customSizeObserver = new ResizeObserver(() => {
  if (!initialCustomSize || customEditorClosing || customSizeEditor.style.display === "none") return;
  const size = readCustomPreviewSize();
  // Layout constraints can resize the preview without the user editing it.
  if (customTilePreview.style.width === initialCustomSize.styleWidth &&
      customTilePreview.style.height === initialCustomSize.styleHeight) {
    initialCustomSize.width = size.width;
    initialCustomSize.height = size.height;
  }
  saveCustomSizeBtn.disabled = size.width < MIN_CUSTOM_SIZE || size.height < MIN_CUSTOM_SIZE ||
    (size.width === initialCustomSize.width && size.height === initialCustomSize.height);
});
customSizeObserver.observe(customTilePreview);

saveCustomSizeBtn.addEventListener("click", () => {
  if (saveCustomSizeBtn.disabled || customEditorClosing) return;
  const size = readCustomPreviewSize();
  settingsObject.customWidth = size.width;
  settingsObject.customHeight = size.height;
  settingsObject.save();
  customSizeInput.checked = true;
  customSizeInput.dispatchEvent(new Event("change", { bubbles: true }));
  finishCustomSizeEdit("anim-success");
});

cancelCustomSizeBtn.addEventListener("click", () => {
  if (!customEditorClosing) finishCustomSizeEdit("anim-error");
});

function syncSettingsForm() {
  tilesAmountInput.value = settingsObject.tilesAmount;
  tilesSizeInputs.forEach((input) => {
    input.checked = input.value === settingsObject.tileSize;
  });
  tilesDisplayInputs.forEach((input) => {
    input.checked = input.value === settingsObject.tileDisplay;
  });
  gameRulesToggle.checked = settingsObject.showGameRules;
}

function applyRulesVisibility() {
  if (!gameRulesEl) return;
  gameRulesEl.style.display = settingsObject.showGameRules ? "" : "none";
}

// Setting ui elements up to date with settingsObject
syncSettingsForm();
applyRulesVisibility();

tilesAmountInput.addEventListener("input", () => {
  const tilesAmount = Number(tilesAmountInput.value);
  if (!tilesAmountInput.checkValidity() || !Number.isInteger(tilesAmount) || tilesAmount < 2) return;

  settingsObject.tilesAmount = tilesAmount;
  settingsObject.save();
});

tilesAmountInput.addEventListener("wheel", (event) => {
  if (event.deltaY === 0 || event.ctrlKey) return;
  event.preventDefault();

  const min = Number(tilesAmountInput.min || 2);
  const max = Number(tilesAmountInput.max || 36);
  const currentValue = Number.isInteger(tilesAmountInput.valueAsNumber)
    ? tilesAmountInput.valueAsNumber
    : Number(settingsObject.tilesAmount);
  const step = event.deltaY < 0 ? 1 : -1;
  const nextValue = Math.min(max, Math.max(min, currentValue + step));
  if (tilesAmountInput.valueAsNumber === nextValue) return;

  tilesAmountInput.value = nextValue;
  tilesAmountInput.dispatchEvent(new Event("input", { bubbles: true }));
}, { passive: false });

tilesSizeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    settingsObject.tileSize = input.value;
    settingsObject.save();
  });
});

tilesDisplayInputs.forEach((input) => {
  input.addEventListener("change", () => {
    settingsObject.tileDisplay = input.value;
    settingsObject.save();
  });
});

document.querySelectorAll("#quickSettings .segmented-control").forEach((group) => {
  group.addEventListener("wheel", (event) => {
    if (event.deltaY === 0 || event.ctrlKey) return;
    event.preventDefault();

    const inputs = Array.from(group.querySelectorAll('input[type="radio"]'));
    if (!inputs.length) return;
    const currentIndex = inputs.findIndex((input) => input.checked);
    const step = event.deltaY < 0 ? -1 : 1;
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + step + inputs.length) % inputs.length;

    inputs[nextIndex].checked = true;
    inputs[nextIndex].dispatchEvent(new Event("change", { bubbles: true }));
  }, { passive: false });
});

gameRulesToggle.addEventListener("change", () => {
  saveSettingsBtn.style.display = "block";
});

saveSettingsBtn.addEventListener("click", () => {
  settingsObject.showGameRules = gameRulesToggle.checked;

  settingsObject.save();
  applyRulesVisibility();
  saveSettingsBtn.style.display = "none";
});

if (restoreSettingsBtn) {
  restoreSettingsBtn.addEventListener("click", () => {
    settingsObject.restoreDefaults();
    closeCustomSizeEditor();
    syncSettingsForm();
    applyRulesVisibility();
    saveSettingsBtn.style.display = "none";
  });
}
/*==============
end:Settings*/

// Footer visibility
const toggleFooterBtn = document.getElementById("toggleFooterBtn");

toggleFooterBtn.addEventListener("click", () => {
  const collapsed = document.body.classList.toggle("footer-collapsed");
  toggleFooterBtn.setAttribute("aria-expanded", String(!collapsed));
  toggleFooterBtn.title = collapsed ? "Expand footer" : "Collapse footer";
});

//Global key events
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.keyCode == 27) closeSettings(); //Esc
  if (event.key === "Enter" || event.keyCode == 13) {
    if (event.target && event.target.closest("#themeToggleBtn, #changeSettingsBtn, #toggleFooterBtn, #customSizeEditor, .segmented-control")) return;
    const playBtn = document.getElementById("playBtn");
    if (playBtn && !isSettingsOpen()) playBtn.click();
  }
});
