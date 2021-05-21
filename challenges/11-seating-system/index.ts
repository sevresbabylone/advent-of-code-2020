import readInput from "../../utils/readInput";
import {
  runTillStable,
  toGrid,
  changeState,
  changeStateHighThreshold,
  countVectorNeighbours,
} from "./lib";

const TEST_SEAT_LAYOUT = [
  "L.LL.LL.LL",
  "LLLLLLL.LL",
  "L.L.L..L..",
  "LLLL.LL.LL",
  "L.LL.LL.LL",
  "L.LLLLL.LL",
  "..L.L.....",
  "LLLLLLLLLL",
  "L.LLLLLL.L",
  "L.LLLLL.LL",
];

const SECOND_TICK = [
  "#.LL.LL.L#",
  "#LLLLLL.LL",
  "L.L.L..L..",
  "LLLL.LL.LL",
  "L.LL.LL.LL",
  "L.LLLLL.LL",
  "..L.L.....",
  "LLLLLLLLL#",
  "#.LLLLLL.L",
  "#.LLLLL.L#",
];
const SECOND_TICK_GRID = toGrid(SECOND_TICK);
const TEST_SEATING_GRID = toGrid(TEST_SEAT_LAYOUT);

const input = readInput();
const seatLayout = input.split("\n");
const seatingGrid = toGrid(seatLayout);
// console.log(runTillStable(TEST_SEATING_GRID, changeStateHighThreshold));

console.log(countVectorNeighbours(SECOND_TICK_GRID, 0, 3));
