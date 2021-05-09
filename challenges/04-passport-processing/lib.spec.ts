import {
  countValidPassports,
  processInput,
  Passport,
  isBirthYearValid,
  isExpirationYearValid,
  isIssueYearValid,
  isHairColorValid,
  isEyeColorValid,
  ALLOWED_EYE_COLORS,
  isPassportIDValid,
  isHeightValid,
} from "./lib";

const testInput =
  "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017 cid:147 hgt:183cm\niyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884";

describe("processInput", () => {
  it("should take a batch file input and return array of correctly formatted strings", () => {
    const lineItems = processInput(testInput);
    expect(lineItems).toEqual([
      "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd",
      "byr:1937 iyr:2017 cid:147 hgt:183cm",
      "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884",
    ]);
  });
});

describe("countValidPassports", () => {
  it("should return correct number of valid passports based on validation method passed", () => {
    const passports = [{}, {}, {}, {}];
    const mockedIsValid = jest.fn();
    mockedIsValid.mockReturnValueOnce(true).mockReturnValue(false);
    expect(countValidPassports(passports, mockedIsValid)).toEqual(1);
  });
});

describe("BYR: isBirthYearValid", () => {
  const tooYoungBirthYearPassport: Partial<Passport> = { byr: "2020" };
  const tooOldBirthYearPassport: Partial<Passport> = { byr: "1919" };
  const validBirthYearPassport: Partial<Passport> = { byr: "1921" };
  const corruptedBirthYearPassport: Partial<Passport> = { byr: "123456abc" };
  it("should return false if Birth Year is greater than 2002", () => {
    expect(isBirthYearValid(tooYoungBirthYearPassport)).toEqual(false);
  });
  it("should return false if Birth Year is less than 1920", () => {
    expect(isBirthYearValid(tooOldBirthYearPassport)).toEqual(false);
  });
  it("should return true if Birth Year is between 1920 and 2002", () => {
    expect(isBirthYearValid(validBirthYearPassport)).toEqual(true);
  });
  it("should return false if Birth year has invalid characters", () => {
    expect(isBirthYearValid(corruptedBirthYearPassport)).toEqual(false);
  });
});
describe("IYR: isIssueYearValid", () => {
  const expiredIssueYearPassport: Partial<Passport> = { iyr: "2009" };
  const tooFarInTheFuturePassport: Partial<Passport> = { iyr: "2030" };
  const validIssueYearPassport: Partial<Passport> = { iyr: "2015" };
  const corruptedIssueYearPassport: Partial<Passport> = { iyr: "123456abc" };
  it("should return false if Issue Year is less than 2010", () => {
    expect(isIssueYearValid(expiredIssueYearPassport)).toEqual(false);
  });
  it("should return false if Issue Year is greater than 2020", () => {
    expect(isIssueYearValid(tooFarInTheFuturePassport)).toEqual(false);
  });
  it("should return true if Issue Year is between 2010 and 2020", () => {
    expect(isIssueYearValid(validIssueYearPassport)).toEqual(true);
  });
  it("should return false if Issue year has invalid characters", () => {
    expect(isIssueYearValid(corruptedIssueYearPassport)).toEqual(false);
  });
});
describe("EYR: isExpirationYearValid", () => {
  const expiredPassport: Partial<Passport> = { eyr: "2010" };
  const tooFarInTheFuturePassport: Partial<Passport> = { eyr: "2031" };
  const validExpirationYearPassport: Partial<Passport> = { eyr: "2022" };
  const corruptedExpirationYearPassport: Partial<Passport> = {
    eyr: "123456abc",
  };
  it("should return false if Expiration Year is less than 2020", () => {
    expect(isExpirationYearValid(expiredPassport)).toEqual(false);
  });
  it("should return false if Expiration Year is greater than 2030", () => {
    expect(isExpirationYearValid(tooFarInTheFuturePassport)).toEqual(false);
  });
  it("should return true if Expiration Year is between 2020 and 2030", () => {
    expect(isExpirationYearValid(validExpirationYearPassport)).toEqual(true);
  });
  it("should return false if Issue year has invalid characters", () => {
    expect(isExpirationYearValid(corruptedExpirationYearPassport)).toEqual(
      false,
    );
  });
});

describe("HGT: isHeightValid", () => {
  const validHeightInCentimetres: Partial<Passport> = { hgt: "180cm" };
  const tooTallHeightInCentimetres: Partial<Passport> = { hgt: "220cm" };
  const tooShortHeightInCentimetres: Partial<Passport> = { hgt: "110cm" };
  const validHeightInInches: Partial<Passport> = { hgt: "66in" };
  const tooTallHeightInInches: Partial<Passport> = { hgt: "88in" };
  const tooShortHeightInInches: Partial<Passport> = { hgt: "33in" };
  const invalidUnitHeight: Partial<Passport> = { hgt: "6ft" };
  it("should return true if height in centimetres is valid", () => {
    expect(isHeightValid(validHeightInCentimetres)).toEqual(true);
  });
  it("should return false if height in centimetres is too tall", () => {
    expect(isHeightValid(tooTallHeightInCentimetres)).toEqual(false);
  });
  it("should return false if height in centimetres is too short", () => {
    expect(isHeightValid(tooShortHeightInCentimetres)).toEqual(false);
  });
  it("should return true if height in inches is valid", () => {
    expect(isHeightValid(validHeightInInches)).toEqual(true);
  });
  it("should return false if height in inches is too tall", () => {
    expect(isHeightValid(tooTallHeightInInches)).toEqual(false);
  });
  it("should return false if height in inches is too short", () => {
    expect(isHeightValid(tooShortHeightInInches)).toEqual(false);
  });
  it("should return false if height is in invalid unit", () => {
    expect(isHeightValid(invalidUnitHeight)).toEqual(false);
  });
});

describe("HCL: isHairColorValid", () => {
  const validHairColor: Partial<Passport> = { hcl: "#123abc" };
  const noHexHairColor: Partial<Passport> = { hcl: "123456" };
  const tooShortHairColor: Partial<Passport> = { hcl: "abc" };
  const weirdCharactersHairColor: Partial<Passport> = { hcl: "#$$$$$$" };
  const wrongLettersHairColor: Partial<Passport> = { hcl: "#zzz123" };
  it("should return true if Hair Color is valid", () => {
    expect(isHairColorValid(validHairColor)).toEqual(true);
  });
  it("should return false if Hair Color does not start with #", () => {
    expect(isHairColorValid(noHexHairColor)).toEqual(false);
  });
  it("should return false if Hair Color is less than 6 characters", () => {
    expect(isHairColorValid(tooShortHairColor)).toEqual(false);
  });
  it("should return false if Hair Color has disallowed characters", () => {
    expect(isHairColorValid(weirdCharactersHairColor)).toEqual(false);
  });
  it("should return false if Hair Color has disallowed letters", () => {
    expect(isHairColorValid(wrongLettersHairColor)).toEqual(false);
  });
});

describe("ECL: isEyeColorValid", () => {
  const validEyeColors = ALLOWED_EYE_COLORS.map(
    (eyeColor: string): Partial<Passport> => ({
      ecl: eyeColor,
    }),
  );
  const invalidEyeColor = { eyr: "art" };
  it("should return true if eye color is an allowed eye color", () => {
    validEyeColors.forEach((validEyeColor: Partial<Passport>) => {
      expect(isEyeColorValid(validEyeColor)).toEqual(true);
    });
  });
  it("should return false is eye color is not an allowed eye color", () => {
    expect(isEyeColorValid(invalidEyeColor)).toEqual(false);
  });
});

describe("PID: isPassportIDValid", () => {
  const validPassportID: Partial<Passport> = { pid: "000000012" };
  const withLettersPassportID: Partial<Passport> = { pid: "timothee0" };
  const weirdCharactersPassportID: Partial<Passport> = { pid: "!@#$%^&*(" };
  const tooShortPassportID: Partial<Passport> = { pid: "1234" };
  const tooLongPassportID: Partial<Passport> = { pid: "12345678910" };

  it("should return true if Passport ID is valid", () => {
    expect(isPassportIDValid(validPassportID)).toEqual(true);
  });
  it("should return false if Passport ID contains letters", () => {
    expect(isPassportIDValid(withLettersPassportID)).toEqual(false);
  });
  it("should return false if Passport ID contains non digit characters", () => {
    expect(isPassportIDValid(weirdCharactersPassportID)).toEqual(false);
  });
  it("should return false if Passport ID is less than  9 digits", () => {
    expect(isPassportIDValid(tooShortPassportID)).toEqual(false);
  });
  it("should return false if Passport ID is more than 9 digits", () => {
    expect(isPassportIDValid(tooLongPassportID)).toEqual(false);
  });
});

describe("checkPassportHasAllFields", () => {});

describe("checkPassportValidStrict", () => {});
