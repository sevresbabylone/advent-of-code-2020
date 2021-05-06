export interface Vector {
  right: number;
  down: number;
}
export class Terrain {
  width: number;
  height: number;
  grid: string[][];
  static origin = { right: 0, down: 0 };
  constructor(terrainString: string) {
    const horizontalLines = terrainString.split("\n");
    this.width = horizontalLines[0].length;
    this.height = horizontalLines.length;
    this.grid = horizontalLines.map((line) => {
      return line.split("");
    });
  }
  move(currentPosition: Vector, direction: Vector): Vector {
    const right = (currentPosition.right + direction.right) % this.width;
    const down = currentPosition.down + direction.down;
    return { right, down };
  }
  hasTree(position: Vector): boolean {
    return this.grid[position.down][position.right] === "#";
  }
  print() {
    console.log(this.grid);
  }
  getNoOfTreesInPathFromOrigin(directionVector: Vector): number {
    let count = 0;
    let currentPosition = { right: 0, down: 0 };
    while (currentPosition.down < this.height - 1) {
      currentPosition = this.move(currentPosition, { right: 3, down: 1 });
      console.log({ currentPosition });
      if (this.hasTree(currentPosition)) count++;
    }
    return count;
  }
}
