import {
  findPairAddendsOfSum,
  findTripletAddendsOfSum,
  getDoubleExpenseReport,
  getTripleExpenseReport,
} from "./lib";

const numList = [1721, 979, 366, 299, 675, 1456];
const sum = 2020;

describe("findPairAddendsOfSum", () => {
  it("should find two entries in the list that equate to sum", () => {
    const pair = findPairAddendsOfSum(numList, sum);
    expect(pair).toEqual(expect.arrayContaining([1721, 299]));
  });
  it("should not count the same entry twice", () => {
    expect(() => findPairAddendsOfSum([1010, 979, 366, 299], sum)).toThrowError(
      "Pair does not exist",
    );
  });
});

describe("getDoubleExpenseReport", () => {
  it("should return product of two entries in list that add up to sum", () => {
    const expenseReport = getDoubleExpenseReport(numList, sum);
    expect(expenseReport).toEqual(514579);
  });
});

describe("findTripletAddendsOfSum", () => {
  it("should find three entries in the list that add up to sum", () => {
    const triplet = findTripletAddendsOfSum(numList, sum);
    expect(triplet).toEqual(expect.arrayContaining([979, 366, 675]));
  });
  it("should not count the same entry more than once", () => {
    expect(() =>
      findTripletAddendsOfSum([673, 673, 100, 299], 2019),
    ).toThrowError("Triplet does not exist");
  });
});
describe("getTripleExpenseReport", () => {
  it("should return product of three entries in list that add up to sum", () => {
    const expenseReport = getTripleExpenseReport(numList, sum);
    expect(expenseReport).toEqual(241861950);
  });
});
