import readInput from "../../utils/readInput";
import {
  processInput,
  parsePassport,
  countValidPassports,
  checkPassportValidStrict,
} from "./lib";

const batchFile = readInput();
const lineItems = processInput(batchFile);
const passports = lineItems.map(parsePassport);
