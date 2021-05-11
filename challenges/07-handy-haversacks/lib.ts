export interface Edge {
  color: string;
  amount: number;
}

export const processLineItems = (input: string): Map<string, Edge[]> => {
  return createColorToEdgesMap(input.split("\n").filter(Boolean));
};

export const createColorToEdgesMap = (
  lineItems: string[],
): Map<string, Edge[]> => {
  const colorToEdgesMap = new Map();
  lineItems.forEach((lineItem) => {
    const [color, edges] = processLineItem(lineItem);
    colorToEdgesMap.set(color, edges);
  });
  return colorToEdgesMap;
};

export const addLineItemsToMap = (
  lineItems: string[],
  colorToEdgesMap: Map<string, Edge[]>,
): void => {
  lineItems.forEach((lineItem) => {
    const [color, edges] = processLineItem(lineItem);
    colorToEdgesMap.set(color, edges);
  });
};

export const processLineItem = (lineItem: string): [string, Edge[]] => {
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

export const canContainTargetBag = (
  outermostBagColor: string,
  targetBagColor: string,
  colorToEdgesMap: Map<string, Edge[]>,
): boolean => {
  const adjacentColors = colorToEdgesMap.get(outermostBagColor);
  if (adjacentColors === undefined) return false;
  if (adjacentColors.find(({ color }) => color === targetBagColor)) return true;

  for (const adjacent of adjacentColors) {
    if (canContainTargetBag(adjacent.color, targetBagColor, colorToEdgesMap))
      return true;
  }
  return false;
};

export const countBagsContainingTargetColor = (
  targetBagColor: string,
  colorToEdgesMap: Map<string, Edge[]>,
): number => {
  let count = 0;
  colorToEdgesMap.forEach((v, color) => {
    if (canContainTargetBag(color, targetBagColor, colorToEdgesMap)) count++;
  });
  return count;
};

export const countAllInnerBags = (
  outermostBagColor: string,
  colorToEdgesMap: Map<string, Edge[]>,
): number => {
  const countInside = (currentOutermostBagColor: string) => {
    const edges = colorToEdgesMap.get(currentOutermostBagColor);
    if (edges === undefined) return 1;
    return edges.reduce((acc, edge) => {
      const { amount, color } = edge;
      return acc + amount * countInside(color);
    }, 1);
  };
  return countInside(outermostBagColor) - 1;
};
