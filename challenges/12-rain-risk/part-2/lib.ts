import { atan } from "mathjs";

export const degreesToRadian = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const radiansToDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
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
export interface Vector {
  x: number;
  y: number;
}
export const lineToInstruction = (line: string): Instruction => {
  const value = Number(line.replace(/[A-Za-z]/, ""));
  const action = line.replace(/[0-9]+/, "");
  return {
    action,
    value,
  };
};
export const processInput = (input: string): Instruction[] =>
  input.split("\n").filter(Boolean).map(lineToInstruction);

const addVectors = (v1: Vector, v2: Vector) => {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
};
const multiplyVectorByScale = (v: Vector, scale: number) => {
  return { x: v.x * scale, y: v.y * scale };
};

export class Ship {
  currentPosition: Vector;
  waypointPosition: Vector;
  constructor(startingPosition: Vector, waypointPosition: Vector) {
    this.currentPosition = startingPosition;
    this.waypointPosition = waypointPosition;
  }
  moveWaypoint(action: ACTIONS, value: number) {
    this.waypointPosition = addVectors(
      this.waypointPosition,
      multiplyVectorByScale(DIRECTIONS[action], value),
    );
  }
  getAngleAroundShip(): number {
    // directly above, or directly below
    if (this.waypointPosition.x === 0) {
      if (this.waypointPosition.y > 0) return 90;
      else return 270;
    }
    if (this.waypointPosition.y === 0) {
      if (this.waypointPosition.x > 0) return 0;
      else return 180;
    }
    let angleInRadians = atan(
      Math.abs(this.waypointPosition.y) / Math.abs(this.waypointPosition.x),
    );
    let angleInDegrees = radiansToDegrees(angleInRadians);
    // quadrant 2
    if (this.waypointPosition.x < 0 && this.waypointPosition.y >= 0) {
      angleInDegrees = 180 - angleInDegrees;
    }
    // quadrant 3
    if (this.waypointPosition.x < 0 && this.waypointPosition.y <= 0) {
      angleInDegrees += 180;
    }
    // quadrant 4
    if (this.waypointPosition.x > 0 && this.waypointPosition.y <= 0) {
      angleInDegrees = 360 - angleInDegrees;
    }

    return angleInDegrees;
  }
  rotateWaypoint(
    action: ACTIONS.AntiClockwise | ACTIONS.Clockwise,
    value: number,
  ) {
    const radius = Math.sqrt(
      Math.pow(this.waypointPosition.x, 2) +
        Math.pow(this.waypointPosition.y, 2),
    );

    let newAngle: number;

    if (action === ACTIONS.Clockwise) {
      newAngle = this.getAngleAroundShip() - value;
    } else {
      newAngle = this.getAngleAroundShip() + value;
    }
    newAngle = (360 + newAngle) % 360;
    newAngle = degreesToRadian(newAngle);
    this.waypointPosition = {
      x: Math.round(radius * Math.cos(newAngle)),
      y: Math.round(radius * Math.sin(newAngle)),
    };
  }
  forward(value: number) {
    this.currentPosition = {
      x: this.currentPosition.x + this.waypointPosition.x * value,
      y: this.currentPosition.y + this.waypointPosition.y * value,
    };
  }
  processInstruction(instruction: Instruction) {
    const { action, value } = instruction;
    if (action === ACTIONS.Forward) {
      this.forward(value);
    } else if (
      action === ACTIONS.Clockwise ||
      action === ACTIONS.AntiClockwise
    ) {
      this.rotateWaypoint(action, value);
    } else {
      this.moveWaypoint(action, value);
    }
  }
  sail(instructions: Instruction[]) {
    instructions.forEach((instruction) => {
      this.processInstruction(instruction);
    });
  }
  calculateRectilinearDistance() {
    return Math.abs(this.currentPosition.x) + Math.abs(this.currentPosition.y);
  }
  resetWayPoint(waypointPosition: Vector) {
    this.waypointPosition = waypointPosition;
  }
}
