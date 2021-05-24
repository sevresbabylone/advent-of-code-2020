import { getNewDirection, lineToInstruction, ACTIONS, Ship } from "./lib";

describe("getNewDirection", () => {
  it("returns the positive angle value, in degrees, of sum of currentAngle and angle of rotation", () => {
    expect(getNewDirection(ACTIONS.AntiClockwise, 0, 40)).toEqual(320);
    expect(getNewDirection(ACTIONS.Clockwise, 0, 60)).toEqual(60);
  });
});
describe("lineToInstruction", () => {
  it("converts a line to Instruction", () => {
    expect(lineToInstruction("R40")).toEqual({
      action: "R",
      value: 40,
    });
  });
});

describe("Class - Ship", () => {
  const testShip = new Ship();
  describe("Ship - move", () => {
    it("updates currentAngle when AntiClockwise instruction is processed", () => {
      testShip.move(lineToInstruction("R40"));
      expect(testShip.currentAngleInDeg).toEqual(320);
    });
    it("updates currentAngle when Clockwise instruction is processed", () => {
      testShip.move(lineToInstruction("L80"));
      expect(testShip.currentAngleInDeg).toEqual(80);
    });
    it("updates currentPosition when North instruction is processed", () => {
      testShip.move(lineToInstruction("N5"));
      expect(testShip.currentPosition).toEqual({ x: 0, y: 5 });
    });
    it("updates currentPosition when South instruction is processed", () => {
      testShip.move(lineToInstruction("S5"));
      expect(testShip.currentPosition).toEqual({ x: 0, y: -5 });
    });
    it("updates currentPosition when East instruction is processed", () => {
      testShip.move(lineToInstruction("E4"));
      expect(testShip.currentPosition).toEqual({ x: 4, y: 0 });
    });
    it("updates currentPosition when West instruction is processed", () => {
      testShip.move(lineToInstruction("W10"));
      expect(testShip.currentPosition).toEqual({ x: -10, y: 0 });
    });
    it("updates currentPosition when Forward instruction is processed", () => {
      testShip.move(lineToInstruction("F10"));
      expect(testShip.currentPosition).toEqual({ x: 10, y: 0 });
    });
    afterEach(() => {
      testShip.reset();
    });
  });
  describe("Ship - sail", () => {
    const instructions = ["F10", "N3", "F7", "R90", "F11"].map((line) =>
      lineToInstruction(line),
    );
    it("updates currentPosition based on instructions passed", () => {
      testShip.sail(instructions);
      expect(testShip.currentPosition).toEqual({ x: 17, y: -8 });
    });
  });
  describe("calculateRectilinearDistance", () => {
    it("calculate rectilinear distance from origin", () => {
      expect(testShip.calculateRectilinearDistance()).toEqual(25);
    });
  });
});
