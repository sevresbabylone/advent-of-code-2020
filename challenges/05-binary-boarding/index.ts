import readInput from "../../utils/readInput";
import { findSeatGap, getAllSeatIDs, getBinaryPartition } from "./lib";
const input = readInput();
const boardingCodeList = input.split("\n").filter(Boolean);
const seatIDList = getAllSeatIDs(boardingCodeList);
console.log(findSeatGap(seatIDList));
