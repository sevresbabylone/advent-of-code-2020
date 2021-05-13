import { runBootcode, Bootcode, makeBootcodeArray } from "./lib";

const testBootcodes = [
  "nop +0",
  "acc +1",
  "jmp +4",
  "acc +3",
  "jmp -3",
  "acc -99",
  "acc +1",
  "jmp -4",
  "acc +6",
];
const testBootcodesArray = makeBootcodeArray(testBootcodes);

describe("makeBootcodeArray", () => {
  it("processes input into array of Bootcode objects", () => {
    expect(makeBootcodeArray(["nop +0"])[0]).toBeInstanceOf(Bootcode);
  });
});

describe("runBootcode", () => {
  it("returns correct value of accumulator before start of second loop", () => {
    expect(runBootcode(testBootcodesArray).accumulator).toEqual(5);
  });
});
