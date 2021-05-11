export interface AdjacentBag {
  color: string;
  amount: number;
}

export const processStringInput = (input: string): string[] => {
  return input.split("\n").filter(Boolean);
};

export const processLineItem = (lineItem: string): [string, AdjacentBag[]] => {
  const bags = lineItem.split(" bags contain ");
  const color = bags[0];
  if (!lineItem.match(/\d/)) return [color, []];
  const containingBags = bags[1].split(", ");
  const edges = containingBags.map((bag) => {
    const amount = Number(bag.replace(/[A-Za-z\s.]*$/, ""));
    const color = bag
      .replace(/^[0-9*\s/]/, "")
      .replace(/\sbags?.?/, "")
      .trim();
    return {
      color: color,
      amount: amount,
    };
  });
  return [color, edges];
};

export const createColorMap = (
  lineItems: string[],
): Map<string, AdjacentBag[]> => {
  const colorMap = new Map();
  lineItems.forEach((lineItem) => {
    const [color, edges] = processLineItem(lineItem);
    colorMap.set(color, edges);
  });
  return colorMap;
};

export const canContainTargetBag = (
  outermostBagColor: string,
  targetBagColor: string,
  colorMap: Map<string, AdjacentBag[]>,
): boolean => {
  const adjacentBags = colorMap.get(outermostBagColor);
  if (adjacentBags === undefined) return false;
  if (adjacentBags.find(({ color }) => color === targetBagColor)) return true;

  for (const adjacentBag of adjacentBags) {
    if (canContainTargetBag(adjacentBag.color, targetBagColor, colorMap))
      return true;
  }
  return false;
};

export const countBagsContainingTargetColor = (
  targetBagColor: string,
  colorMap: Map<string, AdjacentBag[]>,
): number => {
  let count = 0;
  colorMap.forEach((v, color) => {
    if (canContainTargetBag(color, targetBagColor, colorMap)) count++;
  });
  return count;
};

export const countAllInnerBags = (
  outermostBagColor: string,
  colorMap: Map<string, AdjacentBag[]>,
): number => {
  const countInside = (currentOutermostBagColor: string) => {
    const outmostAdjacentBags = colorMap.get(currentOutermostBagColor);
    if (outmostAdjacentBags === undefined) return 1;
    return outmostAdjacentBags.reduce((acc, outmostAdjacentBag) => {
      const { amount, color } = outmostAdjacentBag;
      return acc + amount * countInside(color);
    }, 1);
  };
  return countInside(outermostBagColor) - 1;
};
