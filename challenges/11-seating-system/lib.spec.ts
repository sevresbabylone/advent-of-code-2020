import { count } from "console";
import {
  areStatesEqual,
  changeState,
  countNeighbours,
  countTotalOccupied,
  runTillStable,
  toGrid,
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

const FIRST_TICK_GRID = toGrid(FIRST_TICK_LAYOUT);
const TEST_SEATING_GRID = toGrid(TEST_SEAT_LAYOUT);
const TEST_OCCUPIED_GRID = toGrid(TEST_SEAT_LAYOUT_OCCUPIED);

describe("countNeighbours", () => {
  it("returns correct number of occupied adjacent seats", () => {
    expect(countNeighbours(TEST_OCCUPIED_GRID, 1, 1)).toEqual(2);
  });
});

describe("areStatesEqual", () => {
  it("returns true if both grids are equal", () => {
    expect(areStatesEqual(TEST_OCCUPIED_GRID, [...TEST_OCCUPIED_GRID])).toEqual(
      true,
    );
  });
  it("returns false if both grids are not equal", () => {
    expect(areStatesEqual(TEST_OCCUPIED_GRID, TEST_SEATING_GRID)).toEqual(
      false,
    );
  });
});

describe("countTotalOccupied", () => {
  expect(countTotalOccupied(TEST_OCCUPIED_GRID)).toEqual(2);
  expect(countTotalOccupied(TEST_SEATING_GRID)).toEqual(0);
});

describe("changeState", () => {
  it("modifies the state of the seating layout correctly", () => {
    expect(changeState(TEST_SEATING_GRID)).toEqual(FIRST_TICK_GRID);
  });
});

describe("runTillStable", () => {
  it("returns total count of occupied seats when seating layout stabilises", () => {
    expect(runTillStable(TEST_SEATING_GRID)).toEqual(37);
  });
});
