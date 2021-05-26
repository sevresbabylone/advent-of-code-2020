export const degreesToRadian = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const processInput = (input: string): Instruction[] =>
  input.split("\n").filter(Boolean).map(lineToInstruction);

export interface Vector {
  x: number;
  y: number;
}

const addVectors = (v1: Vector, v2: Vector) => {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
};
const multiplyVectorByScale = (v: Vector, scale: number) => {
  return { x: v.x * scale, y: v.y * scale };
};

export enum ACTIONS {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
  Forward = "F",
  AntiClockwise = "L",
  Clockwise = "R",
}
export const DIRECTIONS = {
  N: { x: 0, y: 1 },
  S: { x: 0, y: -1 },
  E: { x: 1, y: 0 },
  W: { x: -1, y: 0 },
};

export interface Instruction {
  action: any;
  value: number;
}

export const getNewDirection = (
  direction: ACTIONS.AntiClockwise | ACTIONS.Clockwise,
  currentAngle: number,
  rotation: number,
): number => {
  let newAngle: number;
  if (direction === ACTIONS.Clockwise) newAngle = currentAngle - rotation;
  else newAngle = currentAngle + rotation;
  newAngle = (360 + newAngle) % 360;
  return newAngle;
};

export const lineToInstruction = (line: string): Instruction => {
  const value = Number(line.replace(/[A-Za-z]/, ""));
  const action = line.replace(/[0-9]+/, "");
  return {
    action,
    value,
  };
};

export class Ship {
  public origin = { x: 0, y: 0 };
  public currentPosition = { x: 0, y: 0 };
  public currentAngleInDeg = 0;
  reset() {
    this.currentAngleInDeg = 0;
    this.currentPosition = { x: 0, y: 0 };
  }
  move(instruction: Instruction) {
    const { action, value } = instruction;
    switch (action) {
      case ACTIONS.Clockwise:
      case ACTIONS.AntiClockwise:
        this.currentAngleInDeg = getNewDirection(
          action,
          this.currentAngleInDeg,
          value,
        );
        break;
      case ACTIONS.Forward:
        const currentAngleInRadians = degreesToRadian(this.currentAngleInDeg);
        this.currentPosition = addVectors(this.currentPosition, {
          x: value * Math.round(Math.cos(currentAngleInRadians)),
          y: value * Math.round(Math.sin(currentAngleInRadians)),
        });
        break;
      default:
        this.currentPosition = addVectors(
          this.currentPosition,
          multiplyVectorByScale(DIRECTIONS[action], value),
        );
    }
  }
  sail(instructions: Instruction[]) {
    instructions.forEach((instruction) => {
      this.move(instruction);
    });
  }
  calculateRectilinearDistance() {
    return Math.abs(this.currentPosition.x) + Math.abs(this.currentPosition.y);
  }
}
