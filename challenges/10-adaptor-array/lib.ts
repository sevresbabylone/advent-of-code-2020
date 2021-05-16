const OUTLET_JOLTAGE = 0;
const DEFAULT_DEVICE_JOLTAGE_DIFFERENCE = 3;

export const sortDescending = (numbers: number[]): number[] => {
  let sorted = [...numbers];
  sorted.sort((a, b) => b - a);
  return sorted;
};

export const addDeviceAndOutletJoltages = (joltages: number[]): number[] => {
  const deviceJoltage =
    Math.max(...joltages) + DEFAULT_DEVICE_JOLTAGE_DIFFERENCE;
  return [...joltages, deviceJoltage, OUTLET_JOLTAGE];
};

export const countJoltageDifferences = (
  joltages: number[],
): Map<number, number> => {
  const differences = new Map();
  for (let i = 0; i < joltages.length - 1; i++) {
    let diff = joltages[i] - joltages[i + 1];
    if (!differences.has(diff)) {
      differences.set(diff, 1);
    } else {
      differences.set(diff, differences.get(diff) + 1);
    }
  }
  return differences;
};
// Row 0: [0, 1, 0, 1] signify that these paths exist: 0 -> 1, 0 -> 3
export const createAdjacencyMatrix = (adaptors: number[]): number[][] => {
  const adjMatrix: number[][] = adaptors.map(() => adaptors.map(() => 0));
  for (let destination = 0; destination < adaptors.length; destination++) {
    for (let source = 0; source < adaptors.length; source++) {
      const joltageDifference = adaptors[destination] - adaptors[source];
      if (joltageDifference > 0 && joltageDifference <= 3) {
        adjMatrix[source][destination] = 1;
      }
    }
  }
  return adjMatrix;
};
// Format
// {
//   0: [1, 3]
//   1: [4, 3]
//   3: [4]
// }
export const createAdjacencyList = (
  adaptors: number[],
): Map<number, number[]> => {
  const adjacencyList = new Map();
  adaptors.forEach((source) => {
    const adjacentAdaptors: number[] = [];
    adaptors.forEach((destination) => {
      const joltageDifference = destination - source;
      if (joltageDifference > 0 && joltageDifference <= 3) {
        adjacentAdaptors.push(destination);
      }
    });
    adjacencyList.set(source, adjacentAdaptors);
  });
  return adjacencyList;
};

export const Graph = class {
  adjacencyList: Map<number, number[]>;
  adaptorList: number[];
  constructor(joltages: number[]) {
    this.adaptorList = joltages;
    this.adjacencyList = createAdjacencyList(joltages);
  }

  getAllPathsBFS(
    sourceJoltage: number,
    destinationJoltage: number,
  ): number[][] {
    let initialPath = [sourceJoltage];
    let pathsQueue: number[][] = [];
    pathsQueue.push(initialPath);
    const possiblePaths: number[][] = [];
    while (pathsQueue.length > 0) {
      const currentPath = pathsQueue.shift();
      if (currentPath === undefined) throw new Error("pathQueue is empty");
      const lastAdapatorInPath = currentPath[currentPath.length - 1];

      if (lastAdapatorInPath === destinationJoltage) {
        possiblePaths.push(currentPath);
        continue;
      }

      const adjacentAdaptors = this.adjacencyList.get(lastAdapatorInPath);
      if (adjacentAdaptors === undefined)
        throw new Error("this.adjacencyList was not initialised properly");
      if (adjacentAdaptors.length === 0) {
        continue;
      }
      adjacentAdaptors.forEach((adj) => {
        const newPath = [...currentPath, adj];
        pathsQueue.push(newPath);
      });
    }
    return possiblePaths;
  }
};
