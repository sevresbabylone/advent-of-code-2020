import { lineToInstruction } from "../part-1/lib";
import { ACTIONS, Ship } from "./lib";
describe("Class - Ship", () => {
  describe("getAngleAroundShip", () => {
    it("returns angle between waypoint and polar axis y = currentPosition.y", () => {
      const firstQuadrant = new Ship({ x: 0, y: 0 }, { x: 14, y: 14 });
      expect(firstQuadrant.getAngleAroundShip()).toEqual(45);
      const secondQuandrant = new Ship({ x: 0, y: 0 }, { x: -14, y: 14 });
      expect(secondQuandrant.getAngleAroundShip()).toEqual(135);
      const thirdQuandrant = new Ship({ x: 0, y: 0 }, { x: -14, y: -14 });
      expect(thirdQuandrant.getAngleAroundShip()).toEqual(225);
      const fourthQuandrant = new Ship({ x: 0, y: 0 }, { x: 14, y: -14 });
      expect(fourthQuandrant.getAngleAroundShip()).toEqual(315);
    });
  });
  describe("getDistanceOfWaypointFromShip", () => {
    it("returns the distance between waypoint and currentPosition", () => {
      const test = new Ship({ x: 1, y: 1 }, { x: 4, y: 5 });
      expect(test.getDistanceOfWaypointFromShip()).toEqual(5);
    });
  });
  describe("rotateWaypoint", () => {
    it("updates waypoint with new value after rotating by value clockwise", () => {
      const test = new Ship({ x: 170, y: 38 }, { x: 180, y: 42 });
      test.rotateWaypoint(ACTIONS.Clockwise, 90);
      expect(test.waypoint).toEqual({
        x: 174,
        y: 28,
      });
    });
    it("updates waypoint with new value after rotating by value anti-clockwise", () => {
      const test = new Ship({ x: 0, y: 0 }, { x: 15, y: 15 });
      test.rotateWaypoint(ACTIONS.AntiClockwise, 90);
      expect(test.waypoint).toEqual({
        x: -15,
        y: 15,
      });
    });
  });
  describe("moveWaypoint", () => {
    const testShip = new Ship({ x: 0, y: 0 }, { x: 0, y: 0 });
    it("updates waypoint when North instruction is processed", () => {
      testShip.moveWaypoint(ACTIONS.North, 60);
      expect(testShip.waypoint).toEqual({ x: 0, y: 60 });
    });
    it("updates waypoint when East instruction is processed", () => {
      testShip.moveWaypoint(ACTIONS.East, 60);
      expect(testShip.waypoint).toEqual({ x: 60, y: 0 });
    });
    it("updates waypoint when South instruction is processed", () => {
      testShip.moveWaypoint(ACTIONS.South, 60);
      expect(testShip.waypoint).toEqual({ x: 0, y: -60 });
    });
    it("updates waypoint when West instruction is processed", () => {
      testShip.moveWaypoint(ACTIONS.West, 60);
      expect(testShip.waypoint).toEqual({ x: -60, y: 0 });
    });
    afterEach(() => {
      testShip.reset();
    });
  });
  // F10 moves the ship to the waypoint 10 times (a total of 100 units east and 10 units north),
  //  leaving the ship at east 100, north 10. The waypoint stays 10 units east and 1 unit north of the ship.
  describe("forward", () => {
    const testShip = new Ship({ x: 0, y: 0 }, { x: 10, y: 1 });
    testShip.forward(10);
    expect(testShip.currentPosition).toEqual({ x: 100, y: 10 });
    expect(testShip.waypoint).toEqual({ x: 110, y: 11 });
  });
  describe("sail", () => {
    const testShip = new Ship({ x: 0, y: 0 }, { x: 10, y: 1 });
    const instructions = ["F10", "N3", "F7", "R90", "F11"].map((line) =>
      lineToInstruction(line),
    );
    it("updates currentPosition based on instructions passed", () => {
      testShip.sail(instructions);
      expect(testShip.currentPosition).toEqual({ x: 214, y: -72 });
      expect(testShip.calculateRectilinearDistance()).toEqual(286);
    });
  });
});
