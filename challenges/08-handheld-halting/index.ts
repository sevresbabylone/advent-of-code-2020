import readInput from "../../utils/readInput";
import {
  makeBootcodeArray,
  splitInput,
  runBootcode,
  getTerminatingAccumulator,
  Bootcode,
} from "./lib";

const data = readInput();
const lineItems = splitInput(data);
const BootcodeArray = makeBootcodeArray(lineItems);

console.log(runBootcode(BootcodeArray));
console.log(getTerminatingAccumulator(BootcodeArray));
