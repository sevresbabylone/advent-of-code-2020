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

export const countNeighbours = (
  grid: string[][],
  rowIndex: number,
  columnIndex: number,
): number => {
  let occupied = 0;
  directions.forEach((direction) => {
    const [y, x] = direction;
    const adjRowIndex = rowIndex + y;
    const adjColumnIndex = columnIndex + x;
    if (
      adjColumnIndex < 0 ||
      adjColumnIndex > grid[0].length - 1 ||
      adjRowIndex < 0 ||
      adjRowIndex > grid.length - 1
    )
      return;
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

export const changeState = (grid: string[][]): string[][] => {
  return grid.map((row, rowIndex) => {
    return row.map((char, columnIndex) => {
      const noOfNeighbours = countNeighbours(grid, rowIndex, columnIndex);
      if (char === STATES.Occupied && noOfNeighbours >= 4) return STATES.Empty;
      if (char === STATES.Empty && noOfNeighbours === 0) return STATES.Occupied;
      return char;
    });
  });
};

export const countTotalOccupied = (grid: string[][]): number => {
  let totalOccupied = 0;
  grid.forEach((row) => {
    row.forEach((char) => {
      if (char === STATES.Occupied) totalOccupied++;
    });
  });
  return totalOccupied;
};

export const runTillStable = (grid: string[][]): number => {
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
