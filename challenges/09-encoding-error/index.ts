import readInput, { processInput } from "../../utils/readInput";
import { findContiguousSlice, findInvalid, sumOfMaxAndMin } from "./lib";

const input = readInput();
const numbers = processInput(input);

const targetNum = findInvalid(numbers, 25);
const contiguousSlice = findContiguousSlice(numbers, targetNum);
const answer = sumOfMaxAndMin(contiguousSlice);
console.log({ answer });
