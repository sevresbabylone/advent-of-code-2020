import Graph, { createAdjacencyList } from "./Graph";
import {
  addDeviceAndOutlet,
  countAdaptorCombinations,
  countJoltageDifferences,
  sortDescending,
} from "./lib";

const simple = [0, 1, 3, 7, 4];
const small = addDeviceAndOutlet([16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4]);
const large = addDeviceAndOutlet([
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
]);

describe("sortDescending", () => {
  it("sorts numbers in descending order", () => {
    expect(sortDescending([3, 4, 5, 2, 1])).toEqual([5, 4, 3, 2, 1]);
  });
});

describe("addDeviceAndOutlet", () => {
  it("adds 0 (outlet) and device (max + 3) to array", () => {
    expect(addDeviceAndOutlet([2])).toEqual([2, 5, 0]);
  });
});

describe("countJoltageDifferences", () => {
  it("returns a map of joltage difference vs number of occurences", () => {
    const differences = countJoltageDifferences(large);
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
  const simpleGraph = new Graph(simple);
  const smallGraph = new Graph(small);
  const largeGraph = new Graph(large);
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

describe("countAdaptorCombinations", () => {
  it("returns correct count of possible paths", () => {
    expect(countAdaptorCombinations(simple)).toEqual(3);
    expect(countAdaptorCombinations(small)).toEqual(8);
    expect(countAdaptorCombinations(large)).toEqual(19208);
  });
});
