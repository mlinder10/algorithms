import {
  rangeInput,
  selectionOption,
  bubbleOption,
  mergeOption,
  currentOption,
  SORTS,
} from "./constants.js";
import { setDelay, setCurrentSort } from "./script.js";

function handleRangeChange() {
  rangeInput.addEventListener("input", (e) => {
    setDelay(100 - e.target.value);
  });
}

function handleOptionChange() {
  selectionOption.addEventListener("click", (e) => {
    currentOption.innerHTML = "Selection Sort";
    setCurrentSort(SORTS.SELECTION);
  });
  bubbleOption.addEventListener("click", (e) => {
    currentOption.innerHTML = "Bubble Sort";
    setCurrentSort(SORTS.BUBBLE);
  });
  mergeOption.addEventListener("click", (e) => {
    currentOption.innerHTML = "Merge Sort";
    setCurrentSort(SORTS.MERGE);
  });
}

handleRangeChange();
handleOptionChange();
