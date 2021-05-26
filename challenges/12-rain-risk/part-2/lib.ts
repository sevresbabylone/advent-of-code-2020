import { atan } from "mathjs";

export const degreesToRadian = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const radiansToDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
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

export const lineToInstruction = (line: string): Instruction => {
  const value = Number(line.replace(/[A-Za-z]/, ""));
  const action = line.replace(/[0-9]+/, "");
  return {
    action,
    value,
  };
};

export class Ship {
  waypoint: Vector;
  currentPosition: Vector;
  constructor(currentPosition: Vector = { x: 0, y: 0 }, waypoint: Vector) {
    this.waypoint = waypoint;
    this.currentPosition = currentPosition;
  }
  reset() {
    this.currentPosition = { x: 0, y: 0 };
    this.waypoint = { x: 0, y: 0 };
  }
  getAngleAroundShip(): number {
    const opposite = this.waypoint.y - this.currentPosition.y;
    const adjacent = this.waypoint.x - this.currentPosition.x;
    let angleInRadians = atan(opposite / adjacent);
    let angleInDegrees = radiansToDegrees(angleInRadians);
    if ((adjacent < 0 && opposite < 0) || (adjacent < 0 && opposite > 0))
      angleInDegrees += 180;
    if (adjacent > 0 && opposite < 0) angleInDegrees += 360;

    return angleInDegrees;
  }
  getDistanceOfWaypointFromShip(): number {
    return Math.sqrt(
      Math.pow(this.waypoint.x - this.currentPosition.x, 2) +
        Math.pow(this.waypoint.y - this.currentPosition.y, 2),
    );
  }
  rotateWaypoint(
    action: ACTIONS.AntiClockwise | ACTIONS.Clockwise,
    value: number,
  ) {
    const radius = this.getDistanceOfWaypointFromShip();
    let newAngle: number;
    if (action === ACTIONS.Clockwise) {
      newAngle = this.getAngleAroundShip() - value;
    } else {
      newAngle = this.getAngleAroundShip() + value;
    }
    newAngle = (360 + newAngle) % 360;
    newAngle = degreesToRadian(newAngle);
    this.waypoint = {
      x: Math.round(this.currentPosition.x + radius * Math.cos(newAngle)),
      y: Math.round(this.currentPosition.y + radius * Math.sin(newAngle)),
    };
  }

  moveWaypoint(action: ACTIONS, value: number) {
    this.waypoint = addVectors(
      this.waypoint,
      multiplyVectorByScale(DIRECTIONS[action], value),
    );
  }
  forward(value: number) {
    const relative = {
      x: this.waypoint.x - this.currentPosition.x,
      y: this.waypoint.y - this.currentPosition.y,
    };
    this.currentPosition = {
      x: this.currentPosition.x + relative.x * value,
      y: this.currentPosition.y + relative.y * value,
    };
    this.waypoint = {
      x: this.currentPosition.x + relative.x,
      y: this.currentPosition.y + relative.y,
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
}
