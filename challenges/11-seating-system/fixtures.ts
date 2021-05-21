import { toGrid } from "./lib";

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
const TEST_SEAT_LAYOUT_OCCUPIED = [
  "L.LL.LL.LL",
  "#L#LLLL.LL",
  "L.L.L..L..",
  "LLLL.LL.LL",
  "L.LL.LL.LL",
  "L.LLLLL.LL",
  "..L.L.....",
  "LLLLLLLLLL",
  "L.LLLLLL.L",
  "L.LLLLL.LL",
];
const FIRST_TICK_LAYOUT = [
  "#.##.##.##",
  "#######.##",
  "#.#.#..#..",
  "####.##.##",
  "#.##.##.##",
  "#.#####.##",
  "..#.#.....",
  "##########",
  "#.######.#",
  "#.#####.##",
];

const THIRD_TICK_LAYOUT = [
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
const FOURTH_TICK_LAYOUT = [
  "#.L#.##.L#",
  "#L#####.LL",
  "L.#.#..#..",
  "##L#.##.##",
  "#.##.#L.##",
  "#.#####.#L",
  "..#.#.....",
  "LLL####LL#",
  "#.L#####.L",
  "#.L####.L#",
];

export const FIRST_TICK_GRID = toGrid(FIRST_TICK_LAYOUT);
export const TEST_SEATING_GRID = toGrid(TEST_SEAT_LAYOUT);
export const TEST_OCCUPIED_GRID = toGrid(TEST_SEAT_LAYOUT_OCCUPIED);
export const THIRD_TICK_GRID = toGrid(THIRD_TICK_LAYOUT);
export const FOURTH_TICK_GRID = toGrid(FOURTH_TICK_LAYOUT);
