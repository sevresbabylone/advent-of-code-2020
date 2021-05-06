export const getDoubleExpenseReport = (
  numList: number[],
  sum: number,
): number => {
  const [num1, num2] = findPairAddendsOfSum(numList, sum);
  return num1 * num2;
};

export const getNumToOccurencesMap = (
  numList: number[],
): Map<number, number> => {
  const numMap = new Map();
  numList.forEach((num: number) => {
    if (numMap.has(num)) {
      numMap.set(num, numMap.get(num) + 1);
    } else numMap.set(num, 1);
  });
  return numMap;
};

export const findPairAddendsOfSum = (numList: number[], sum: number) => {
  const numMap = getNumToOccurencesMap(numList);
  const num1 = numList.find((num: number) => {
    const difference = sum - num;
    const addendsAreEqualButNotSameIndex =
      difference === num && Number(numMap.get(difference)) > 1;
    const addendsAreDifferent = difference !== num && numMap.has(difference);

    return addendsAreEqualButNotSameIndex || addendsAreDifferent;
  });
  if (num1 === undefined) throw new Error("Pair does not exist");
  return [num1, sum - num1];
};

export const findTripletAddendsOfSum = (numList: number[], sum: number) => {
  for (let i = 0; i < numList.length; i++) {
    for (let j = 0; j < numList.length; j++) {
      if (i === j) continue;
      if (numList[i] + numList[j] >= sum) continue;
      for (let k = 0; k < numList.length; k++) {
        if (i === k || j === k) continue;
        if (numList[i] + numList[j] + numList[k] === sum) {
          return [numList[i], numList[j], numList[k]];
        }
      }
    }
  }
  throw new Error("Triplet does not exist");
};

export const getTripleExpenseReport = (
  numList: number[],
  sum: number,
): number => {
  const triplet = findTripletAddendsOfSum(numList, sum);
  return triplet.reduce((product, num) => {
    return product * num;
  }, 1);
};
