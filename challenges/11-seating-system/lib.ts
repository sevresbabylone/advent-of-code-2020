export enum STATES {
  Floor = ".",
  Occupied = "#",
  Empty = "L",
}
export const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const toGrid = (seatLayout: string[]): string[][] => {
  return seatLayout.map((row) => Array.from(row));
};

export const countAdjNeighbours = (
  grid: string[][],
  rowIndex: number,
  columnIndex: number,
): number => {
  let occupied = 0;
  directions.forEach((direction) => {
    const [y, x] = direction;
    const adjRowIndex = rowIndex + y;
    const adjColumnIndex = columnIndex + x;
    if (isOutOfBounds(grid, adjRowIndex, adjColumnIndex)) return;
    if (grid[adjRowIndex][adjColumnIndex] === STATES.Occupied) occupied++;
  });
  return occupied;
};

export const areStatesEqual = (
  beforeGrid: string[][],
  afterGrid: string[][],
): boolean => {
  if (JSON.stringify(beforeGrid) === JSON.stringify(afterGrid)) return true;
  return false;
};

export const changeState = (grid: string[][]): string[][] =>
  grid.map((row, rowIndex) =>
    row.map((char, columnIndex) => {
      const noOfNeighbours = countAdjNeighbours(grid, rowIndex, columnIndex);
      if (char === STATES.Occupied && noOfNeighbours >= 4) return STATES.Empty;
      if (char === STATES.Empty && noOfNeighbours === 0) return STATES.Occupied;
      return char;
    }),
  );

export const countTotalOccupied = (grid: string[][]): number => {
  let totalOccupied = 0;
  grid.forEach((row) => {
    row.forEach((char) => {
      if (char === STATES.Occupied) totalOccupied++;
    });
  });
  return totalOccupied;
};

export const runTillStable = (
  grid: string[][],
  changeState: (grid: string[][]) => string[][],
): number => {
  let isStable = false;
  let currentState = [...grid];
  let nextState: string[][] = [];
  while (!isStable) {
    nextState = changeState(currentState);
    isStable = areStatesEqual(currentState, nextState);
    currentState = nextState;
  }

  return countTotalOccupied(currentState);
};

export const isOutOfBounds = (
  grid: string[][],
  rowIndex: number,
  columnIndex: number,
): boolean => {
  return (
    columnIndex < 0 ||
    columnIndex > grid[0].length - 1 ||
    rowIndex < 0 ||
    rowIndex > grid.length - 1
  );
};

export const countVectorNeighbours = (
  grid: string[][],
  rowIndex: number,
  columnIndex: number,
): number => {
  let occupied = 0;
  directions.forEach((direction) => {
    let [y, x] = direction;
    let adjRowIndex = y + rowIndex;
    let adjColumnIndex = x + columnIndex;
    while (!isOutOfBounds(grid, adjRowIndex, adjColumnIndex)) {
      const currentNeighbourToCheck = grid[adjRowIndex][adjColumnIndex];
      if (currentNeighbourToCheck === STATES.Empty) break;
      if (currentNeighbourToCheck === STATES.Occupied) {
        occupied += 1;
        break;
      }
      adjRowIndex += y;
      adjColumnIndex += x;
    }
  });
  return occupied;
};

export const changeStateHighThreshold = (grid: string[][]): string[][] =>
  grid.map((row, rowIndex) =>
    row.map((char, columnIndex) => {
      const noOfNeighbours = countVectorNeighbours(grid, rowIndex, columnIndex);
      if (char === STATES.Occupied && noOfNeighbours >= 5) return STATES.Empty;
      if (char === STATES.Empty && noOfNeighbours === 0) return STATES.Occupied;
      return char;
    }),
  );
