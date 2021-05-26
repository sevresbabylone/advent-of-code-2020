import readInput from "../../../utils/readInput";
import { processInput, Ship } from "./lib";

const input = readInput();
const instructions = processInput(input);
const partTwoShip = new Ship({ x: 0, y: 0 }, { x: 10, y: 1 });
partTwoShip.sail(instructions);
console.log(partTwoShip.calculateRectilinearDistance());
