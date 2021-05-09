import readInput from "../../utils/readInput";
import {
  countAllQuestions,
  countQuestionsEveryoneYes,
  countUniqueQuestionsInGroup,
  processInputIntoGroups,
} from "./lib";

const input = readInput();
const groups = processInputIntoGroups(input);

console.log(countAllQuestions(groups, countQuestionsEveryoneYes));
