export interface PasswordPolicy {
  x: number;
  y: number;
  char: string;
  password: string;
}

export const parseSinglePasswordPolicyString = (
  passwordPolicyString: string,
): PasswordPolicy => {
  const [policy, password] = passwordPolicyString.split(": ");
  const [limits, char] = policy.split(" ");
  const [x, y] = limits.split("-");

  return {
    x: Number(x),
    y: Number(y),
    char,
    password,
  };
};
export const parseMultiplePasswordPolicyStrings = (
  passwordPolicyStrings: string[],
): PasswordPolicy[] => {
  return passwordPolicyStrings.map((item) =>
    parseSinglePasswordPolicyString(item),
  );
};

export const countValidPasswords = (
  passwordPolicyItems: PasswordPolicy[],
  isValid: (passwordPolicy: PasswordPolicy) => boolean,
): number => {
  return passwordPolicyItems.reduce((count, item) => {
    if (isValid(item)) return count + 1;
    else return count;
  }, 0);
};

export const validatePasswordByCharacterLimit = (
  passwordPolicyItem: PasswordPolicy,
): boolean => {
  const { x: min, y: max, password, char } = passwordPolicyItem;
  let count = 0;
  password.split("").forEach((c) => {
    if (c === char) count++;
  });
  return count >= min && count <= max;
};

export const validatePasswordByCharacterPosition = (
  passwordPolicyItem: PasswordPolicy,
): boolean => {
  const { x, y, password, char } = passwordPolicyItem;
  const position1 = x - 1;
  const position2 = y - 1;
  if (position1 < 0 || position1 < 0)
    throw new Error("Invalid positions passed");
  const isInFirstPositionOnly =
    password[position1] === char && password[position2] !== char;
  const isInSecondPositionOnly =
    password[position1] !== char && password[position2] === char;

  return isInFirstPositionOnly || isInSecondPositionOnly;
};
