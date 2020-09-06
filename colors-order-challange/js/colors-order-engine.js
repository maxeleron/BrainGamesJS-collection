"use strict";

class GameTile {
  constructor(Id, Color, Size) {
    this.node = document.createElement("div");
    this.id = Id;

    this.node.style.background = COLORS_ARR[Color];
    this.node.classList.add(Size + "Tile");
  }
}

class GameTilesArr {
  constructor(ElementsAmount, ElementSize) {
    //let dublicateProtectionArr = [];
    let currentColorsArr = COLORS_ARR;
    for (let i = 0; i < ElementsAmount; i++) {
      const randomColor = Math.floor(Math.random() * currentColorsArr.length);
      this[i] = new GameTile(i, randomColor, ElementSize);
      this[i].node.id = i;
      this[i].id = i;

      //removing selected color from temp array to avoid dublicates
      currentColorsArr.splice(randomColor, 1);
    }
    this.length = ElementsAmount;
  }
  display(displayField) {
    this.each((that) => {
      displayField.append(that.node);
    });
  }
  shuffle() {
    for (let i = this.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
  }
  enableSortable(sortField) {
    Sortable.create(sortField, {
      handle: ".sortable",
      animation: 120,
    });
    this.each((that) => {
      that.node.classList.add("sortable");
    });
  }
  disableSortable() {
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

/*Colors array */
const COLORS_ARR = [
  "#FFFF33" /*Light yellow*/,
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
  "#0000CC" /*Blue */,
  "#0033FF",
  "#0099FF",
  "#00CCFF",
  "#339999",
  "#66FFFF" /*Ocean blue */,
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
