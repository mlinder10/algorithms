export const sortBtn = document.querySelector("#sort");
export const shuffleBtn = document.querySelector("#shuffle");

export const rangeInput = document.querySelector("input");
export const currentOption = document.querySelector(".current-option");
export const selectionOption = document.querySelector("#selection-option");
export const bubbleOption = document.querySelector("#bubble-option");
export const mergeOption = document.querySelector("#merge-option");
export const quickOption = document.querySelector("#quick-option");

export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

export const CANVAS_WIDTH =
  window.innerWidth < 600 ? window.innerWidth : window.innerWidth * 0.8;
export const CANVAS_HEIGHT = 600;

export const ITEM_WIDTH = 20;
export const ITEM_COUNT = Math.floor(CANVAS_WIDTH / (ITEM_WIDTH + 1));
export const MAX_VALUE = Math.floor(CANVAS_HEIGHT * (4 / 6));
export const MIN_VALUE = Math.floor(CANVAS_HEIGHT * (1 / 6));

export class SORTS {
  static BUBBLE = "bubble";
  static SELECTION = "selection";
  static MERGE = "merge";
}
