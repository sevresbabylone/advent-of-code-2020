import readInput from "../../utils/readInput";
import {
  runTillStable,
  toGrid,
  changeState,
  changeStateHighThreshold,
  countVectorNeighbours,
} from "./lib";

const input = readInput();
const seatLayout = input.split("\n");
const seatingGrid = toGrid(seatLayout);
console.log(runTillStable(seatingGrid, changeStateHighThreshold));
