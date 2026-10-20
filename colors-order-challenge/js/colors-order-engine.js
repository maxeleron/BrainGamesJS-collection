"use strict";

class GameTile {
  constructor(Id, Color, Size, CustomSize = { width: 256, height: 112 }) {
    this.node = document.createElement("div");
    this.id = Id;
    // Setting bg of tile to selected color
    this.node.style.background = Color;
    // Each tile will get class gameTile for styling
    this.node.classList.add("gameTile");
    // Size controls both tile height and width.
    if (Size === "custom") {
      this.node.style.width = CustomSize.width + "px";
      this.node.style.height = CustomSize.height + "px";
    } else {
      this.node.classList.add(Size + "Tile");
    }
  }
}

class GameTilesArr {
  constructor(ElementsAmount, ElementSize, CustomSize) {
    // Clone so the shared COLORS_ARR is never mutated
    const colorsArr = COLORS_ARR.slice();
    const amount = Number(ElementsAmount);

    for (let i = 0; i < amount; i++) {
      // splice returns an array of deleted items — take the color string
      const randColor = colorsArr.splice(
        Math.floor(Math.random() * colorsArr.length),
        1
      )[0];

      this[i] = new GameTile(i, randColor, ElementSize, CustomSize);
      this[i].node.id = String(i);
    }
    this.length = amount;
    this.sortable = null;
  }

  display(displayField) {
    this.each((that) => {
      displayField.append(that.node);
    });
  }

  shuffle() {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
  }

  enableSortable(sortField) {
    // Destroy any previous instance before creating a new one
    this.disableSortable();

    this.sortable = Sortable.create(sortField, {
      animation: 120,
    });

    this.each((that) => {
      that.node.classList.add("sortable");
    });
  }

  disableSortable() {
    if (this.sortable) {
      this.sortable.destroy();
      this.sortable = null;
    }
    this.each((that) => {
      that.node.classList.remove("sortable");
    });
  }

  each(func) {
    for (let i = 0; i < this.length; i++) {
      func(this[i]);
    }
  }
}

/* Colors array — never mutate this; always clone before use */
const COLORS_ARR = [
  "#FFFF33" /* Light yellow */,
  "#CC9900",
  "#CC6600",
  "#CC6633",
  "#FF0000",
  "#FF6666",
  "#993333",
  "#CC3366",
  "#FF0099",
  "#CC6699",
  "#FF33FF",
  "#CC33CC",
  "#9900CC",
  "#9933FF",
  "#6633CC",
  "#6633FF",
  "#6666CC",
  "#3300CC",
  "#0000CC" /* Blue */,
  "#0033FF",
  "#0099FF",
  "#00CCFF",
  "#339999",
  "#66FFFF" /* Ocean blue */,
  "#00FFCC",
  "#00CC99",
  "#33CC66",
  "#00FF66",
  "#66CC66",
  "#00FF00",
  "#339900",
  "#66CC00",
  "#99CC00",
  "#CCFF33",
  "#999900",
  "#999999",
];
