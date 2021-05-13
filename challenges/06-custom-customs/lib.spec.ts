import {
  countAllQuestions,
  countQuestionsEveryoneYes,
  countUniqueQuestionsInGroup,
  processInputIntoGroups,
} from "./lib";

const testInput = "abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb";
const groupedInput = [
  ["abc"],
  ["a", "b", "c"],
  ["ab", "ac"],
  ["a", "a", "a", "a"],
  ["b"],
];
describe("processInputIntoGroups", () => {
  it("should turn input string into array of string arrays", () => {
    expect(processInputIntoGroups(testInput)).toEqual(groupedInput);
  });
});

describe("countUniqueQuestionsInGroup", () => {
  const onePersonAllUnique = ["abc"];
  const onePersonOneRepeated = ["aaaa"];
  const fourPeopleThreeRepeated = ["ab", "ab", "ac", "ac"];

  it("should return number of unique yes questions", () => {
    expect(countUniqueQuestionsInGroup(onePersonAllUnique)).toEqual(3);
  });
  it("should not count repeated yes questions", () => {
    expect(countUniqueQuestionsInGroup(onePersonOneRepeated)).toEqual(1);
  });
  it("should tally number of unique yes questions from multiple people", () => {
    expect(countUniqueQuestionsInGroup(fourPeopleThreeRepeated)).toEqual(3);
  });
});
describe("countQuestionsEveryoneYes", () => {
  it("should return 0 if nobody answered yes to the same question", () => {
    expect(countQuestionsEveryoneYes(["a", "b", "c"])).toEqual(0);
  });
  it("should return count of all questions if only one person answered", () => {
    expect(countQuestionsEveryoneYes(["abc"])).toEqual(3);
  });
  it("should return count of all questions that multiple people answered yes to", () => {
    expect(countQuestionsEveryoneYes(["ab", "ac"])).toEqual(1);
  });
});

describe("countAllQuestions", () => {
  const countMethod = jest.fn();
  countMethod.mockReturnValue(1);
  it("should return aggregated number of unique questions based on countMethod", () => {
    expect(countAllQuestions(groupedInput, countMethod)).toEqual(5);
  });
  it("should return correct number", () => {
    expect(countAllQuestions(groupedInput, countQuestionsEveryoneYes)).toEqual(
      6,
    );
  });
});
