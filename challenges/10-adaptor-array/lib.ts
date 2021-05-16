import path = require("path");

const OUTLET_JOLTAGE = 0;
const DEFAULT_DEVICE_JOLTAGE_DIFFERENCE = 3;

export const sortDescending = (numbers: number[]): number[] => {
  let sorted = [...numbers];
  sorted.sort((a, b) => b - a);
  return sorted;
};
export const sortAscending = (numbers: number[]): number[] => {
  let sorted = [...numbers];
  sorted.sort((a, b) => a - b);
  return sorted;
};

export const addDeviceAndOutlet = (adaptors: number[]): number[] => {
  const deviceJoltage =
    Math.max(...adaptors) + DEFAULT_DEVICE_JOLTAGE_DIFFERENCE;
  return [...adaptors, deviceJoltage, OUTLET_JOLTAGE];
};

export const countJoltageDifferences = (
  adaptors: number[],
): Map<number, number> => {
  const sortedAdaptors = sortDescending(adaptors);
  const differences = new Map();
  for (let i = 0; i < sortedAdaptors.length - 1; i++) {
    let diff = sortedAdaptors[i] - sortedAdaptors[i + 1];
    if (!differences.has(diff)) {
      differences.set(diff, 1);
    } else {
      differences.set(diff, differences.get(diff) + 1);
    }
  }
  return differences;
};

export const countAdaptorCombinations = (adaptors: number[]) => {
  const count = { 0: 1 };
  sortAscending(adaptors).forEach((adaptor) => {
    [1, 2, 3].forEach((difference) => {
      let nextAdaptor = adaptor + difference;
      if (adaptors.includes(nextAdaptor)) {
        if (count[nextAdaptor] === undefined)
          count[nextAdaptor] = count[adaptor];
        else count[nextAdaptor] += count[adaptor];
      }
    });
  });
  return count[Math.max(...adaptors)];
};
