"use strict";

class GameTile {
  constructor(Id, Color, Size, Format) {
    this.node = document.createElement("div");
    this.id = Id;
    //Setting bg of tile to selected color
    this.node.style.background = Color;
    //Each tile will get class gameTile for styling
    this.node.classList.add("gameTile");
    //In dependence of settings size & format are custom
    this.node.classList.add(Size + "Tile");
    this.node.classList.add(Format + "Tile");
  }
}

class GameTilesArr {
  constructor(ElementsAmount, ElementSize, ElementFormat) {
    let colorsArr = COLORS_ARR;
    for (let i = 0; i < ElementsAmount; i++) {
      /* splicing the colorsArr we return deleted element (which is colors` code),
      which is random due to Math.random(), 
      as I tested splice do Math.floor() automaticly on getting first argument */
      const randColor = colorsArr.splice(Math.random() * colorsArr.length, 1);

      this[i] = new GameTile(i, randColor, ElementSize, ElementFormat);
      this[i].node.id = i;
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
