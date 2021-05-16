// Map<number, number[]> represent that these paths exist: 0 -> 1, 0 -> 3
// {
//   0: [1, 3]
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

class Graph {
  adjacencyList: Map<number, number[]>;
  adaptorList: number[];
  constructor(adaptors: number[]) {
    this.adaptorList = adaptors;
    this.adjacencyList = createAdjacencyList(adaptors);
  }

  getAllPathsBFS(source: number, destination: number): number[][] {
    let initialPath = [source];
    let pathsQueue: number[][] = [];
    pathsQueue.push(initialPath);
    const possiblePaths: number[][] = [];
    while (pathsQueue.length > 0) {
      const currentPath = pathsQueue.shift();
      if (currentPath === undefined) throw new Error("pathQueue is empty");
      const lastAdapatorInPath = currentPath[currentPath.length - 1];

      if (lastAdapatorInPath === destination) {
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
}

export default Graph;
