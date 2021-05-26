import readInput from "../../../utils/readInput";
import { processInput, Ship } from "./lib";
const input = readInput();
const instructions = processInput(input);
const partOneShip = new Ship();
partOneShip.sail(instructions);
console.log(partOneShip.calculateRectilinearDistance());
