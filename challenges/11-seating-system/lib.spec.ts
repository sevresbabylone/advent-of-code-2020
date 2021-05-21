import {
  FIRST_TICK_GRID,
  FOURTH_TICK_GRID,
  TEST_OCCUPIED_GRID,
  TEST_SEATING_GRID,
  THIRD_TICK_GRID,
} from "./fixtures";

import {
  areStatesEqual,
  changeState,
  countAdjNeighbours,
  countVectorNeighbours,
  countTotalOccupied,
  runTillStable,
  toGrid,
  isOutOfBounds,
  changeStateHighThreshold,
} from "./lib";

describe("countAdjNeighbours", () => {
  it("returns correct number of occupied adjacent seats", () => {
    expect(countAdjNeighbours(TEST_OCCUPIED_GRID, 1, 1)).toEqual(2);
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
describe("changeStateHighThreshold", () => {
  it("modifies the state of the seating layout correctly", () => {
    expect(changeStateHighThreshold(THIRD_TICK_GRID)).toEqual(FOURTH_TICK_GRID);
  });
});

describe("runTillStable", () => {
  it("returns total count of occupied seats when seating layout stabilises", () => {
    expect(runTillStable(TEST_SEATING_GRID, changeState)).toEqual(37);
    expect(runTillStable(TEST_SEATING_GRID, changeStateHighThreshold)).toEqual(
      26,
    );
  });
});

describe("isOutOfBounds", () => {
  const BOUNDARY_LAYOUT = ["0123456", "0123456", "0123456"];
  const BOUNDARY_GRID = toGrid(BOUNDARY_LAYOUT);
  const maxRowIndex = BOUNDARY_GRID.length - 1;
  const maxColumnIndex = BOUNDARY_GRID[0].length - 1;

  it("should return true if rowIndex is out of bounds", () => {
    expect(isOutOfBounds(BOUNDARY_GRID, -5, 0)).toEqual(true);
    expect(isOutOfBounds(BOUNDARY_GRID, maxRowIndex + 5, 0)).toEqual(true);
  });
  it("should return false if rowIndex is within bounds", () => {
    expect(isOutOfBounds(BOUNDARY_GRID, 0, 0)).toEqual(false);
  });
  it("should return true if columnIndex is out of bounds", () => {
    expect(isOutOfBounds(BOUNDARY_GRID, 0, -5)).toEqual(true);
    expect(isOutOfBounds(BOUNDARY_GRID, 0, maxColumnIndex + 5)).toEqual(true);
  });
  it("should return false if columnIndex is within bounds", () => {
    expect(isOutOfBounds(BOUNDARY_GRID, 0, 0)).toEqual(false);
  });
});

describe("countVectorNeighbours", () => {
  const ALL_EIGHT_GRID = toGrid([
    ".......#.",
    "...#.....",
    ".#.......",
    ".........",
    "..#L....#",
    "....#....",
    ".........",
    "#........",
    "...#.....",
  ]);
  const JUST_ONE_GRID = toGrid([
    ".............",
    ".L.L.#.#.#.#.",
    ".............",
  ]);
  const ZERO_GRID = toGrid([
    ".##.##.",
    "#.#.#.#",
    "##...##",
    "...L...",
    "##...##",
    "#.#.#.#",
    ".##.##.",
  ]);
  describe("it returns count of how many out of 8 directions contain at least one seat", () => {
    it("returns 8 if all directions contain at least 1 seat", () => {
      expect(countVectorNeighbours(ALL_EIGHT_GRID, 4, 3)).toEqual(8);
    });
    it("returns 0 if first seat in a direction is empty, even if there are occupied seats in same direction", () => {
      expect(countVectorNeighbours(JUST_ONE_GRID, 1, 1)).toEqual(0);
    });
    it("returns 0 if there are no occupied seats in any direction", () => {
      expect(countVectorNeighbours(ZERO_GRID, 3, 3)).toEqual(0);
    });
  });
});
