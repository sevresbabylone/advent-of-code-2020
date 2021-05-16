import readInput, { processInput } from "../../utils/readInput";
import {
  addDeviceAndOutletJoltages,
  countJoltageDifferences,
  Graph,
  sortDescending,
} from "./lib";

const input = readInput();
let joltages = processInput(input);
joltages = addDeviceAndOutletJoltages(joltages);

joltages = sortDescending(joltages);
const differences = countJoltageDifferences(joltages);
console.log(differences);

const joltageGraph = new Graph(joltages);
const outletVoltage = Math.max(...joltages);
const allCombinations = joltageGraph.getAllPathsBFS(0, outletVoltage);
console.log(allCombinations.length);
