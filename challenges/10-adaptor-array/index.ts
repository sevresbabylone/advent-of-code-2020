import readInput, { processInput } from "../../utils/readInput";
import {
  addDeviceAndOutlet,
  countAdaptorCombinations,
  countJoltageDifferences,
  sortDescending,
} from "./lib";

const input = readInput();
let adaptors = processInput(input);
adaptors = addDeviceAndOutlet(adaptors);

adaptors = sortDescending(adaptors);
const differences = countJoltageDifferences(adaptors);
console.log(differences);

const simple = [0, 1, 3, 7, 4];

const count = countAdaptorCombinations(simple);
console.log(count);
