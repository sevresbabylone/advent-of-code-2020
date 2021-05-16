export const getAllSums = (numbers: number[]): Set<number> => {
  const sums: Set<number> = new Set();
  numbers.forEach((a, index) => {
    numbers.slice(index).forEach((b) => {
      sums.add(a + b);
    });
  });
  return sums;
};

export const findInvalid = (
  numbers: number[],
  preambleLength: number,
): number => {
  const invalid = numbers.slice(preambleLength + 1).find((number, index) => {
    const set = getAllSums(numbers.slice(index, preambleLength + index + 1));
    return !set.has(number);
  });
  if (invalid === undefined) throw new Error("Invalid value does not exist");
  return invalid;
};

export const findContiguousSlice = (
  numbers: number[],
  targetNum: number,
): number[] => {
  let sum = 0;
  let start = 0;
  let end = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (sum < targetNum) {
      sum = sum + numbers[i];
      end = i;
    }
    while (sum > targetNum) {
      sum = sum - numbers[start];
      start++;
    }
    if (sum === targetNum) {
      break;
    }
  }
  return numbers.slice(start, end + 1);
};

export const sumOfMaxAndMin = (numbers: number[]): number => {
  const smallest = Math.min(...numbers);
  const largest = Math.max(...numbers);
  return smallest + largest;
};
