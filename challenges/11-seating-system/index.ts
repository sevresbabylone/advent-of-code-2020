import readInput from "../../utils/readInput";
import { runTillStable, toGrid } from "./lib";

const input = readInput();
const seatLayout = input.split("\n");
const seatingGrid = toGrid(seatLayout);
console.log(runTillStable(seatingGrid));
