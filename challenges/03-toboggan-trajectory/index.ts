import readInput from "../../utils/readInput";
import { Terrain, multiplyArrayOfNumbers } from "./lib";

const input = readInput();
const terrain = new Terrain(input);
const directionVectors = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const treeCounts = terrain.getAllTreeCounts(directionVectors);
console.log(multiplyArrayOfNumbers(treeCounts));
