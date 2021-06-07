import { lineToInstruction } from "../part-1/lib";
import { ACTIONS, Ship } from "./lib";
describe("Class - Ship", () => {
  describe("moveWaypoint", () => {
    const testShip = new Ship({ x: 0, y: 0 }, { x: 0, y: 0 });
    it("updates waypoint when North instruction is processed", () => {
      testShip.moveWaypoint(ACTIONS.North, 60);
      expect(testShip.waypointPosition).toEqual({ x: 0, y: 60 });
    });
    it("updates waypoint when East instruction is processed", () => {
      testShip.moveWaypoint(ACTIONS.East, 60);
      expect(testShip.waypointPosition).toEqual({ x: 60, y: 0 });
    });
    it("updates waypoint when South instruction is processed", () => {
      testShip.moveWaypoint(ACTIONS.South, 60);
      expect(testShip.waypointPosition).toEqual({ x: 0, y: -60 });
    });
    it("updates waypoint when West instruction is processed", () => {
      testShip.moveWaypoint(ACTIONS.West, 60);
      expect(testShip.waypointPosition).toEqual({ x: -60, y: 0 });
    });
    afterEach(() => {
      testShip.resetWayPoint({ x: 0, y: 0 });
    });
  });
  describe("getAngleAroundShip", () => {
    it("returns 90 degrees when waypoint is directly above the ship", () => {
      const directlyAbove = new Ship({ x: 0, y: 0 }, { x: 0, y: 14 });
      expect(directlyAbove.getAngleAroundShip()).toEqual(90);
    });
    it("returns 270 degrees when waypoint is directly below the ship", () => {
      const directlyBelow = new Ship({ x: 0, y: 0 }, { x: 0, y: -14 });
      expect(directlyBelow.getAngleAroundShip()).toEqual(270);
    });
    it("returns an angle between 0 and 90 when waypoint is in first quadrant", () => {
      const firstQuadrant = new Ship({ x: 0, y: 0 }, { x: 14, y: 14 });
      expect(firstQuadrant.getAngleAroundShip()).toEqual(45);
    });
    it("returns an angle > 90 and <= 180 when waypoint is in second quadrant", () => {
      const secondQuandrant = new Ship({ x: 0, y: 0 }, { x: -14, y: 14 });
      expect(secondQuandrant.getAngleAroundShip()).toEqual(135);
    });
    it("returns an angle >= 180 and < 270 when waypoint is in third quadrant", () => {
      const thirdQuandrant = new Ship({ x: 0, y: 0 }, { x: -14, y: -14 });
      expect(thirdQuandrant.getAngleAroundShip()).toEqual(225);
    });
    it("returns an angle > 270 and < 360 when waypoint is in fourth quadrant", () => {
      const fourthQuandrant = new Ship({ x: 0, y: 0 }, { x: 14, y: -14 });
      expect(fourthQuandrant.getAngleAroundShip()).toEqual(315);
    });
  });

  describe("rotateWaypoint", () => {
    const test = new Ship({ x: 0, y: 0 }, { x: 5, y: 5 });
    it("updates waypoint with new value after rotating by value 90 deg clockwise", () => {
      test.rotateWaypoint(ACTIONS.Clockwise, 90);
      expect(test.waypointPosition).toEqual({ x: 5, y: -5 });
    });
    it("updates waypoint with new value after rotating by value 180 deg clockwise", () => {
      test.rotateWaypoint(ACTIONS.Clockwise, 180);
      expect(test.waypointPosition).toEqual({ x: -5, y: -5 });
    });
    it("updates waypoint with new value after rotating by value 270 deg clockwise", () => {
      test.rotateWaypoint(ACTIONS.Clockwise, 270);
      expect(test.waypointPosition).toEqual({ x: -5, y: 5 });
    });
    it("updates waypoint with new value after rotating by value 90 deg anticlockwise", () => {
      test.rotateWaypoint(ACTIONS.AntiClockwise, 90);
      expect(test.waypointPosition).toEqual({ x: -5, y: 5 });
    });
    it("updates waypoint with new value after rotating by value 180 deg anticlockwise", () => {
      test.rotateWaypoint(ACTIONS.AntiClockwise, 180);
      expect(test.waypointPosition).toEqual({ x: -5, y: -5 });
    });
    it("updates waypoint with new value after rotating by value 270 deg anticlockwise", () => {
      test.rotateWaypoint(ACTIONS.AntiClockwise, 270);
      expect(test.waypointPosition).toEqual({ x: 5, y: -5 });
    });

    afterEach(() => {
      test.resetWayPoint({ x: 5, y: 5 });
    });
  });

  describe("forward", () => {
    const testShip = new Ship({ x: 0, y: 0 }, { x: 10, y: 1 });
    testShip.forward(10);
    expect(testShip.currentPosition).toEqual({ x: 100, y: 10 });
  });
  describe("sail", () => {
    const testShip = new Ship({ x: 0, y: 0 }, { x: 10, y: 1 });
    const instructions = ["F10", "N3", "F7", "R90", "F11"].map((line) =>
      lineToInstruction(line),
    );
    it("updates currentPosition and waypointPosition based on instructions passed", () => {
      testShip.sail(instructions);
      expect(testShip.waypointPosition).toEqual({ x: 4, y: -10 });
      expect(testShip.currentPosition).toEqual({ x: 214, y: -72 });
      expect(testShip.calculateRectilinearDistance()).toEqual(286);
    });
  });
});
