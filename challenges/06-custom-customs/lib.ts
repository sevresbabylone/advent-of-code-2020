export const processInputIntoGroups = (input: string): string[][] => {
  const data = input.toString().split("\n\n");
  return data.map((lineItem) => {
    return lineItem.split("\n").filter(Boolean);
  });
};
export const getQuestionYesCountMap = (
  group: string[],
): Map<string, number> => {
  const questionMap = new Map();
  group.forEach((person) => {
    person.split("").forEach((question) => {
      if (questionMap.has(question))
        questionMap.set(question, questionMap.get(question) + 1);
      else questionMap.set(question, 1);
    });
  });
  return questionMap;
};
export const countUniqueQuestionsInGroup = (group: string[]): number => {
  const questionMap = getQuestionYesCountMap(group);
  return questionMap.size;
};

export const countQuestionsEveryoneYes = (group: string[]): number => {
  const totalPeopleInGroup = group.length;
  const questionMap = getQuestionYesCountMap(group);
  let count = 0;
  questionMap.forEach((yesCount: number) => {
    if (yesCount === totalPeopleInGroup) count++;
  });
  return count;
};

export const countAllQuestions = (
  groups: string[][],
  countMethod: (group: string[]) => number,
): number => {
  return groups.reduce((count: number, group: string[]) => {
    return count + countMethod(group);
  }, 0);
};
