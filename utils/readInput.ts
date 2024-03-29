import { readFileSync } from "fs";
import { sep } from "path";
import * as getCallerFile from "get-caller-file";

const readInput = () => {
  const file = getCallerFile()
    .split(sep)
    .slice(0, -1)
    .concat("input.txt")
    .join(sep);

  return readFileSync(file).toString();
};

export default readInput;

function isDefined<T>(arg: T | undefined): arg is T {
  return typeof arg !== undefined;
}
export const processInput = (input: string): number[] => {
  return input.split("\n").filter(Boolean).map(Number);
};
