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

describe("runTillStable", () => {
  it("returns total count of occupied seats when seating layout stabilises", () => {
    expect(runTillStable(TEST_SEATING_GRID, changeState)).toEqual(37);
    expect(runTillStable(TEST_SEATING_GRID, changeStateHighThreshold)).toEqual(
      26,
    );
  });
});

describe("isOutOfBounds", () => {
  const TEST_LAYOUT = ["0123456", "0123456", "0123456"];
  const TEST_GRID = toGrid(TEST_LAYOUT);
  const maxRowIndex = TEST_GRID.length - 1;
  const maxColumnIndex = TEST_GRID[0].length - 1;
  it("should return true if rowIndex is out of bounds", () => {
    expect(isOutOfBounds(TEST_GRID, -5, 0)).toEqual(true);
    expect(isOutOfBounds(TEST_GRID, maxRowIndex + 5, 0)).toEqual(true);
  });
  it("should return false if rowIndex is within bounds", () => {
    expect(isOutOfBounds(TEST_GRID, 0, 0)).toEqual(false);
  });
  it("should return true if columnIndex is out of bounds", () => {
    expect(isOutOfBounds(TEST_GRID, 0, -5)).toEqual(true);
    expect(isOutOfBounds(TEST_GRID, 0, maxColumnIndex + 5)).toEqual(true);
  });
  it("should return false if columnIndex is within bounds", () => {
    expect(isOutOfBounds(TEST_GRID, 0, 0)).toEqual(false);
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
    it("returns 1 even if there are multiple occupied seats in the same direction", () => {
      expect(countVectorNeighbours(JUST_ONE_GRID, 1, 1)).toEqual(1);
    });
    it("returns 0 if there are no occupied seats", () => {
      expect(countVectorNeighbours(ZERO_GRID, 3, 3)).toEqual(0);
    });
  });
});
