const bubbleBtn = document.querySelector("#bubble");
const selectionBtn = document.querySelector("#selection");
const shuffleBtn = document.querySelector("#shuffle");
const rangeInput = document.querySelector("input");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = window.innerWidth < 600 ? window.innerWidth : window.innerWidth * 0.8;
const CANVAS_HEIGHT = 600;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let items = [];

class Item {
  static width = 20;

  constructor(index, value) {
    this.index = index;
    this.value = value;
    this.pos = this.index * Item.width;
    this.color = "#000";
  }
}

const ITEM_COUNT = Math.floor(canvas.width / (Item.width + 1));
const MAX_VALUE = Math.floor(CANVAS_HEIGHT * (5 / 6));
var DELAY = 50;

var CANCEL = false;

function setup() {
  for (let i = 0; i < ITEM_COUNT; i++) {
    const value = Math.floor(Math.random() * MAX_VALUE);
    items.push(new Item(i, value));
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ITEM_COUNT; i++) {
    const item = items[i];
    ctx.fillStyle = item.color;
    ctx.fillRect(
      item.pos + i,
      canvas.height - item.value,
      Item.width,
      item.value
    );
  }
}

function swap(i, j) {
  const temp = items[i].value;
  items[i].value = items[j].value;
  items[j].value = temp;
}

function cancel() {
  for (let item of items) {
    item.color = "#000";
  }
  draw();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shuffle() {
  CANCEL = true;
  for (let i = 0; i < ITEM_COUNT; i++) {
    const randomIndex = Math.floor(Math.random() * ITEM_COUNT);
    swap(i, randomIndex);
  }
  draw();
}

async function bubbleSort() {
  for (let i = 0; i < ITEM_COUNT - 1; i++) {
    for (let j = 0; j < ITEM_COUNT - i - 1; j++) {
      if (CANCEL) {
        CANCEL = false;
        cancel();
        return;
      }
      await delay(DELAY);
      items[j].color = "#0f0";
      if (items[j].value > items[j + 1].value) {
        swap(j, j + 1);
      }
      draw();
      items[j].color = "#000";
    }
  }
  draw();
}

async function selectionSort() {
  for (let i = 0; i < ITEM_COUNT - 1; i++) {
    items[i].color = "#f00";
    let min = i;
    for (let j = i; j < ITEM_COUNT; j++) {
      if (CANCEL) {
        CANCEL = false;
        cancel();
        return;
      }
      await delay(DELAY);
      if (j !== i) items[j].color = "#ff0";
      draw();
      if (items[j].value < items[min].value) {
        if (min !== i) items[min].color = "#000";
        min = j;
        items[min].color = "#0f0";
      } else if (j !== i) {
        items[j].color = "#000";
      }
    }
    items[min].color = "#000";
    swap(i, min);
    items[i].color = "#000";
  }
  draw();
}

function main() {
  setup();
  draw();

  bubbleBtn.addEventListener("click", bubbleSort);
  selectionBtn.addEventListener("click", selectionSort);
  shuffleBtn.addEventListener("click", shuffle);

  rangeInput.addEventListener("input", (e) => {
    DELAY = 100 - e.target.value;
  });
}

main();
