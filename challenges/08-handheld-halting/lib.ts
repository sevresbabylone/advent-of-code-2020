export class Bootcode {
  operation: string;
  signedNumber: number;
  constructor(operation: string, signedNumber: number) {
    this.operation = operation;
    this.signedNumber = Number(signedNumber);
  }
}

export const splitInput = (input: string): string[] => {
  return input.split("\n").filter(Boolean);
};

export const makeBootcodeArray = (lineItems: string[]): Bootcode[] => {
  return lineItems.map((lineItem) => {
    const [operation, signedNumber] = lineItem.split(" ");
    return new Bootcode(operation, Number(signedNumber));
  });
};

export const operations = {
  nop: (accumulator: number, index: number, value: number) => ({
    accumulator,
    index: index + 1,
  }),
  jmp: (accumulator: number, index: number, value: number) => ({
    accumulator,
    index: index + value,
  }),
  acc: (accumulator: number, index: number, value: number) => ({
    accumulator: accumulator + value,
    index: index + 1,
  }),
};

export const runBootcode = (
  bootcodes: Bootcode[],
): { accumulator: number; currentIndex: number; terminated: boolean } => {
  const visitedIndexes = new Set<number>();
  let accumulator = 0;
  let currentIndex = 0;
  let terminated = false;
  while (true) {
    if (currentIndex >= bootcodes.length) {
      terminated = true;
      break;
    }
    const currentCode = bootcodes[currentIndex];
    if (visitedIndexes.has(currentIndex)) break;
    visitedIndexes.add(currentIndex);
    let result = operations[currentCode.operation](
      accumulator,
      currentIndex,
      currentCode.signedNumber,
    );
    accumulator = result.accumulator;
    currentIndex = result.index;
  }
  return { accumulator, currentIndex, terminated };
};

export const getTerminatingAccumulator = (bootcodes: Bootcode[]): number => {
  let accumulator = 0;
  for (let i = 0; i < bootcodes.length; i++) {
    const { operation, signedNumber } = bootcodes[i];
    if (operation === "acc") continue;
    if (operation === "nop" || operation == "jmp") {
      const modifiedCodes = [...bootcodes];
      const switchOperation = operation === "nop" ? "jmp" : "nop";
      modifiedCodes[i] = new Bootcode(switchOperation, signedNumber);
      const result = runBootcode(modifiedCodes);
      if (result.terminated) accumulator = result.accumulator;
    }
  }
  return accumulator;
};
