import {
  bubbleSort,
  selectionSort,
  mergeSort,
  quicksort,
  shuffle,
  draw,
  setup,
} from "./algorithms.js";
import {
  canvas,
  sortBtn,
  shuffleBtn,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  SORTS,
} from "./constants.js";

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

export var CANCEL = false;
export var DELAY = 50;
var CURRENT_SORT = SORTS.SELECTION;
export const setCurrentSort = (sort) => (CURRENT_SORT = sort);
export const setCancel = (cancel) => (CANCEL = cancel);
export const setDelay = (delay) => (DELAY = delay);

function main() {
  let items = setup();
  draw(items);

  sortBtn.addEventListener("click", () => {
    
    switch (CURRENT_SORT) {
      case SORTS.SELECTION:
        selectionSort(items);
        break;
      case SORTS.BUBBLE:
        bubbleSort(items);
        break;
      case SORTS.MERGE:
        mergeSort(items);
        break;
      case SORTS.QUICK:
        quicksort(items);;
        break;
    }
  });
  shuffleBtn.addEventListener("click", () => shuffle(items));
}

main();
