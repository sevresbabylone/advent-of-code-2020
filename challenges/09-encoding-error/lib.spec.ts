import {
  getAllSums,
  findInvalid,
  findContiguousSlice,
  sumOfMaxAndMin,
} from "./lib";

const testArray = [
  35,
  20,
  15,
  25,
  47,
  40,
  62,
  55,
  65,
  95,
  102,
  117,
  150,
  182,
  127,
  219,
  299,
  277,
  309,
  576,
];

describe("getAllSums", () => {
  it("takes an array and returns a Set with sums of all combinations of 2 different numbers", () => {
    expect(Array.from(getAllSums([35, 20, 15, 25, 47]))).toEqual(
      expect.arrayContaining([55, 50, 60, 82, 35, 45, 67, 40, 62, 72]),
    );
  });
});

describe("findInvalid", () => {
  it("returns number in array that is not sum of two unique preceding (5) numbers", () => {
    expect(findInvalid(testArray, 5)).toEqual(127);
  });
});

describe("findContiguousSlice", () => {
  it("returns first and last indexes of contiguous numbers in array that add up to targetNum", () => {
    expect(findContiguousSlice(testArray, 127)).toEqual([15, 25, 47, 40]);
  });
});

describe("sumOfMaxAndMin", () => {
  it("returns sum of smallest and largest numbers in array", () => {
    expect(sumOfMaxAndMin([1, 2, 3, 4, 5, 6, 7])).toEqual(8);
  });
});
