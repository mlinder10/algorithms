import {
  canvas,
  ctx,
  ITEM_COUNT,
  MAX_VALUE,
  MIN_VALUE,
  ITEM_WIDTH,
} from "./constants.js";
import { CANCEL, DELAY, setCancel } from "./script.js";

export function setup() {
  let items = [];
  for (let i = 0; i < ITEM_COUNT; i++) {
    const value = Math.floor(Math.random() * MAX_VALUE) + MIN_VALUE;
    items.push(new Item(value));
  }
  return items;
}

export function draw(items) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    ctx.fillStyle = item.color;
    ctx.fillRect(
      i * ITEM_WIDTH + i,
      canvas.height - item.value,
      ITEM_WIDTH,
      item.value
    );
  }
}

export function swap(items, i, j) {
  const temp = items[i];
  items[i] = items[j];
  items[j] = temp;
}

export function cancel(items) {
  for (let item of items) {
    item.color = "#000";
  }
  draw(items);
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shuffle(items) {
  setCancel(true);
  for (let item of items) {
    item.color = "#000";
  }
  for (let i = 0; i < items.length; i++) {
    const randomIndex = Math.floor(Math.random() * items.length);
    swap(items, i, randomIndex);
  }
  draw(items);
}

export async function bubbleSort(items) {
  for (let i = 0; i < items.length - 1; i++) {
    for (let j = 0; j < items.length - i - 1; j++) {
      if (CANCEL) {
        setCancel(false);
        cancel(items);
        return;
      }
      await delay(DELAY);
      items[j].color = "#ff0";
      if (items[j].value > items[j + 1].value) {
        swap(items, j, j + 1);
      }
      draw(items);
      items[j].color = "#000";
    }
    items[items.length - i - 1].color = "#0f0";
  }
  items[0].color = "#0f0";
  draw(items);
}

export async function selectionSort(items) {
  for (let i = 0; i < items.length - 1; i++) {
    items[i].color = "#f00";
    let min = i;
    for (let j = i; j < items.length; j++) {
      if (CANCEL) {
        setCancel(false);
        cancel(items);
        return;
      }
      await delay(DELAY);
      if (j !== i) items[j].color = "#ff0";
      draw(items);
      if (items[j].value < items[min].value) {
        if (min !== i) items[min].color = "#000";
        min = j;
        items[min].color = "#0f0";
      } else if (j !== i) {
        items[j].color = "#000";
      }
    }
    items[min].color = "#000";
    swap(items, i, min);
    items[min].color = "#000";
    items[i].color = "#0f0";
  }
  items[items.length - 1].color = "#0f0";
  draw(items);
}

export async function mergeSort(items) {
  if (items.length <= 1) {
    return items;
  }

  async function merge(leftStart, leftEnd, rightEnd) {
    let leftPtr = leftStart;
    let rightPtr = leftEnd + 1;

    while (leftPtr <= leftEnd && rightPtr <= rightEnd) {
      await delay(DELAY);
      draw(items);
      if (items[leftPtr].value <= items[rightPtr].value) {
        leftPtr++;
      } else {
        const temp = items[rightPtr];

        // Shift elements to the right by one position
        for (let i = rightPtr - 1; i >= leftPtr; i--) {
          items[i + 1] = items[i];
        }

        items[leftPtr] = temp;

        // Update pointers and ranges
        leftPtr++;
        rightPtr++;
        leftEnd++;
      }
    }
  }

  async function mergeSortHelper(start, end) {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      await mergeSortHelper(start, mid);
      await mergeSortHelper(mid + 1, end);
      await merge(start, mid, end);
    }
  }

  mergeSortHelper(0, items.length - 1);
  draw(items);
}

export class Item {
  constructor(value) {
    this.value = value;
    this.color = "#000";
  }
}
