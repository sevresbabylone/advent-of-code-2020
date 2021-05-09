import { getBinaryPartition } from "./lib";

describe("getBinaryPartition", () => {
  const allFront = "FFFFFFF";
  const allBack = "BBBBBBB";
  const alternate = "FBFBFBF";
  it("returns correct row number based on boardingCode provided", () => {
    expect(getBinaryPartition("FBFBBFFRLR", 127, 0)).toEqual(44);
    expect(getBinaryPartition(allFront, 127, 0)).toEqual(0);
    expect(getBinaryPartition(allBack, 127, 0)).toEqual(127);
    expect(getBinaryPartition(alternate, 127, 0)).toEqual(42);
  });
});
