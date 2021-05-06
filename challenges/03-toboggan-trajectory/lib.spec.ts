import { Terrain, multiplyArrayOfNumbers } from "./lib";

const terrainString =
  "..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#";

const testDirectionVectors = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

describe("Class: Terrain", () => {
  const terrain = new Terrain(terrainString);
  describe("move", () => {
    it("should return new position based on currentPosition and directionVector", () => {
      expect(
        terrain.move({ right: 0, down: 0 }, { right: 3, down: 1 }),
      ).toEqual({ right: 3, down: 1 });
    });
    it("should loop back to start of right axis if moved past the initial pattern", () => {
      expect(
        terrain.move({ right: 0, down: 0 }, { right: 11, down: 1 }),
      ).toEqual({ right: 0, down: 1 });
      expect(
        terrain.move({ right: 5, down: 0 }, { right: 11, down: 1 }),
      ).toEqual({ right: 5, down: 1 });
    });
  });
  describe("hasTree", () => {
    it("should return true when position contains tree", () => {
      expect(terrain.hasTree({ right: 2, down: 0 })).toEqual(true);
    });
    it("should return false when position contains no tree", () => {
      expect(terrain.hasTree({ right: 0, down: 0 })).toEqual(false);
    });
  });
  describe("getNoOfTreesInPathFromOrigin", () => {
    it("should return correct number of trees in path", () => {
      expect(
        terrain.getNoOfTreesInPathFromOrigin({ right: 3, down: 1 }),
      ).toEqual(7);
    });
  });
  describe("getAllTreeCounts", () => {
    expect(terrain.getAllTreeCounts(testDirectionVectors)).toEqual([
      2,
      7,
      3,
      4,
      2,
    ]);
  });
});

describe("multiplyArrayOfNumbers", () => {
  it("should return product of all numbers in array", () => {
    expect(multiplyArrayOfNumbers([1, 3, 5])).toEqual(15);
  });
});
