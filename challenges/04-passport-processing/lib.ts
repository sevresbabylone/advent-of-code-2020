import { type } from "os";

const FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
export const ALLOWED_EYE_COLORS = [
  "amb",
  "blu",
  "brn",
  "gry",
  "grn",
  "hzl",
  "oth",
];
const OPTIONAL_FIELDS = ["cid"];

export interface Passport {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid?: string;
}

export const processInput = (input: string): string[] => {
  const data = input.toString().split("\n");
  const passportStrings: string[][] = [];
  let lastPosition = 0;
  data.forEach((item: string, index: number) => {
    if (item === "") {
      passportStrings.push(data.slice(lastPosition, index));

      lastPosition = index + 1;
    }
  });
  if (passportStrings.length === 0) return data;
  return passportStrings.map((passportString) => {
    return passportString.join(" ");
  });
};

export const parsePassport = (passportString: string): Partial<Passport> => {
  const passport: Partial<Passport> = {};
  passportString.split(" ").forEach((item) => {
    const line = item.split(":");
    passport[line[0]] = line[1];
  });
  return passport;
};

export const countValidPassports = (
  passports: Partial<Passport>[],
  isValid: (passport: Partial<Passport>) => boolean,
): number => {
  return passports.reduce((count, passport) => {
    if (isValid(passport)) return count + 1;
    return count;
  }, 0);
};

export const isBirthYearValid = (passport: Partial<Passport>): boolean => {
  const birthYear = Number(passport.byr);
  if (birthYear < 1920 || birthYear > 2002 || isNaN(birthYear)) return false;
  return true;
};

export const isExpirationYearValid = (passport: Partial<Passport>): boolean => {
  const expirationYear = Number(passport.eyr);
  if (expirationYear < 2020 || expirationYear > 2030 || isNaN(expirationYear))
    return false;
  return true;
};

export const isIssueYearValid = (passport: Partial<Passport>): boolean => {
  const issueYear = Number(passport.iyr);
  if (issueYear < 2010 || issueYear > 2020 || isNaN(issueYear)) return false;
  return true;
};

export const isHeightValid = (passport: Partial<Passport>): boolean => {
  if (passport.hgt === undefined) return false;
  const isInInches = passport.hgt.match(/^\d+in$/);
  const isInCentimetres = passport.hgt.match(/^\d+cm$/);
  const value = Number(passport.hgt.slice(0, -2));
  if (isNaN(value)) return false;
  if (isInCentimetres) {
    return value >= 150 && value <= 193;
  }
  if (isInInches) {
    return value >= 59 && value <= 76;
  }
  return false;
};

export const isHairColorValid = (passport: Partial<Passport>): boolean => {
  if (passport.hcl === undefined) return false;
  return !!passport.hcl.match(/^#([0-9a-f]{6}$)/);
};

export const isEyeColorValid = (passport: Partial<Passport>): boolean => {
  if (passport.ecl === undefined) return false;
  return ALLOWED_EYE_COLORS.includes(passport.ecl);
};

export const isPassportIDValid = (passport: Partial<Passport>): boolean => {
  if (passport.pid === undefined) return false;
  return !!passport.pid.match(/^\d{9}$/);
};

export const checkPassportHasAllFields = (
  passport: Partial<Passport>,
): boolean => {
  for (const field of FIELDS) {
    if (OPTIONAL_FIELDS.includes(field)) continue;
    if (!passport[field]) return false;
  }
  return true;
};

export const checkPassportValidStrict = (
  passport: Partial<Passport>,
): boolean => {
  if (!checkPassportHasAllFields(passport)) return false;
  return (
    isBirthYearValid(passport) &&
    isIssueYearValid(passport) &&
    isExpirationYearValid(passport) &&
    isHeightValid(passport) &&
    isHairColorValid(passport) &&
    isEyeColorValid(passport) &&
    isPassportIDValid(passport)
  );
};
