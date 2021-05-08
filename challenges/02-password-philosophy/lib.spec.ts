import {
  validatePasswordByCharacterLimit,
  countValidPasswords,
  parseSinglePasswordPolicyString,
  parseMultiplePasswordPolicyStrings,
  validatePasswordByCharacterPosition,
} from "./lib";

const validPasswordPolicy = {
  x: 1,
  y: 3,
  char: "a",
  password: "abcde",
};

describe("parseSinglePasswordPolicyString", () => {
  it("should parse valid string into a passwordPolicy object", () => {
    expect(parseSinglePasswordPolicyString("1-3 a: abcde")).toEqual(
      validPasswordPolicy,
    );
  });
});

describe("parseMultiplePasswordPolicyStrings", () => {
  it("should parse array of valid strings into array of passwordPolicy objects", () => {
    expect(
      parseMultiplePasswordPolicyStrings(["1-3 a: abcde", "2-4 b: bbxbb"]),
    ).toEqual([
      { x: 1, y: 3, char: "a", password: "abcde" },
      { x: 2, y: 4, char: "b", password: "bbxbb" },
    ]);
  });
});

describe("validatePasswordByCharacterLimit", () => {
  it("should return true if password contains valid number of occurences of character", () => {
    expect(
      validatePasswordByCharacterLimit({
        x: 1,
        y: 3,
        char: "a",
        password: "abcde",
      }),
    ).toEqual(true);
  });
  it("should return false if password has less than minimum occurences of character", () => {
    expect(
      validatePasswordByCharacterLimit({
        x: 5,
        y: 10,
        char: "a",
        password: "abcde",
      }),
    ).toEqual(false);
  });
  it("should return false if password has more than maximum occurences of character", () => {
    expect(
      validatePasswordByCharacterLimit({
        x: 2,
        y: 3,
        char: "a",
        password: "aaaaa",
      }),
    ).toEqual(false);
  });
});

describe("countValidPasswords", () => {
  it("should return correct number of valid passwords in array based on validation method", () => {
    const mockedIsValid = jest.fn();
    mockedIsValid.mockReturnValueOnce(true).mockReturnValue(false);
    expect(
      countValidPasswords(
        [
          validPasswordPolicy,
          validPasswordPolicy,
          validPasswordPolicy,
          validPasswordPolicy,
        ],
        mockedIsValid,
      ),
    ).toEqual(1);
  });
});

describe("validatePasswordByCharacterPosition", () => {
  it("should return true if character is in first position and not in second position", () => {
    expect(
      validatePasswordByCharacterPosition({
        x: 1,
        y: 3,
        char: "h",
        password: "hyyyy",
      }),
    ).toEqual(true);
  });
  it("should return true if character is not in first position but is in second position", () => {
    expect(
      validatePasswordByCharacterPosition({
        x: 1,
        y: 3,
        char: "h",
        password: "yyhyy",
      }),
    ).toEqual(true);
  });
  it("should return false if character is not present in either position", () => {
    expect(
      validatePasswordByCharacterPosition({
        x: 1,
        y: 3,
        char: "h",
        password: "yyyyh",
      }),
    ).toEqual(false);
  });
  it("should return false if character is present in both positions", () => {
    expect(
      validatePasswordByCharacterPosition({
        x: 1,
        y: 3,
        char: "h",
        password: "hyhyy",
      }),
    ).toEqual(false);
  });
});
