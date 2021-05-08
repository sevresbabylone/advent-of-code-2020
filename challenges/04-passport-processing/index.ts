import readInput from "../../utils/readInput";
import {
  processInput,
  parsePassport,
  isEyeColorValid,
  countValidPassports,
  checkPassportValidStrict,
} from "./lib";

const batchFile = readInput();
const lineItems = processInput(batchFile);
const passports = lineItems.map(parsePassport);
const count = countValidPassports(passports, checkPassportValidStrict);
console.log({ count });
