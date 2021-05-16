import {
  addDeviceAndOutletJoltages,
  countJoltageDifferences,
  createAdjacencyList,
  createAdjacencyMatrix,
  Graph,
  sortDescending,
} from "./lib";

const largeJoltages = [
  28,
  33,
  18,
  42,
  31,
  14,
  46,
  20,
  48,
  47,
  24,
  23,
  49,
  45,
  19,
  38,
  39,
  11,
  1,
  32,
  25,
  35,
  8,
  17,
  7,
  9,
  4,
  2,
  34,
  10,
  3,
];
describe("sortDescending", () => {
  it("sorts numbers in ascending order", () => {
    expect(sortDescending([3, 4, 5, 2, 1])).toEqual([5, 4, 3, 2, 1]);
  });
});

describe("addDeviceAndOutletJoltages", () => {
  it("adds correct device and outlet joltages to array of numbers", () => {
    expect(addDeviceAndOutletJoltages([2])).toEqual([2, 5, 0]);
  });
});

describe("countJoltageDifferences", () => {
  const testLarge = addDeviceAndOutletJoltages(largeJoltages);
  it("returns a map of joltage difference vs number of occurences", () => {
    const differences = countJoltageDifferences(
      testLarge.sort((a, b) => b - a),
    );
    expect(differences.get(1)).toEqual(22);
    expect(differences.get(3)).toEqual(10);
  });
});

describe("createAdjacencyList", () => {
  it("creates adjacency list correctly", () => {
    const adjList = createAdjacencyList([0, 1, 3, 7, 4]);
    expect(adjList.get(0)).toEqual(expect.arrayContaining([1, 3]));
    expect(adjList.get(1)).toEqual(expect.arrayContaining([3, 4]));
  });
});

describe("Class: Graph", () => {
  const simpleJoltages = [0, 1, 3, 7, 4];
  const simpleGraph = new Graph(simpleJoltages);

  const smallJoltages = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
  const smallGraph = new Graph(addDeviceAndOutletJoltages(smallJoltages));

  const largeGraph = new Graph(addDeviceAndOutletJoltages(largeJoltages));
  describe("getAllPathsBFS", () => {
    it("should return correct list of possible paths", () => {
      expect(simpleGraph.getAllPathsBFS(0, 7)).toEqual(
        expect.arrayContaining([
          [0, 1, 4, 7],
          [0, 3, 4, 7],
          [0, 1, 3, 4, 7],
        ]),
      );
      expect(smallGraph.getAllPathsBFS(0, 22).length).toEqual(8);
      expect(largeGraph.getAllPathsBFS(0, 52).length).toEqual(19208);
    });
  });
});
