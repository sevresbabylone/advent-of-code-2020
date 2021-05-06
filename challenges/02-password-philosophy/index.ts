import readInput from "../../utils/readInput";
import {
  countValidPasswords,
  parseMultiplePasswordPolicyStrings,
  validatePasswordByCharacterLimit,
  validatePasswordByCharacterPosition,
} from "./lib";

const input = readInput();
const passwordList = input.split("\n").filter(Boolean);
const passwordPolicyItems = parseMultiplePasswordPolicyStrings(passwordList);
const validCharacterLimitCount = countValidPasswords(
  passwordPolicyItems,
  validatePasswordByCharacterLimit,
);
const validCharacterPositionsCount = countValidPasswords(
  passwordPolicyItems,
  validatePasswordByCharacterPosition,
);
console.log({ validCharacterLimitCount, validCharacterPositionsCount });
