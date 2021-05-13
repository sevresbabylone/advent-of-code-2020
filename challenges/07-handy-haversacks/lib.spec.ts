import {
  canContainTargetBag,
  getNumOfRequiredBags,
  countBagsContainingTargetColor,
  createColorMap,
  processLineItem,
} from "./lib";

const testMap = createColorMap([
  "bright white bags contain 1 shiny gold bag.",
  "drab magenta bags contain no other bags.",
  "bright lavender bags contain 4 light gold bags, 1 bright ma]genta bag.",
  "light gold bags contain 5 shiny gold bags.",
]);

describe("processLineItem", () => {
  it("should process line item into correct format", () => {
    const [color, edges] = processLineItem(
      "muted coral bags contain 1 bright magenta bag, 1 dim aqua bag.",
    );
    expect(color).toEqual("muted coral");
    expect(edges).toEqual(
      expect.arrayContaining([
        { amount: 1, color: "bright magenta" },
        { amount: 1, color: "dim aqua" },
      ]),
    );
  });
  it("should contain no edges if input states that it can contain no other bags", () => {
    const [color, edges] = processLineItem(
      "dull violet bags contain no other bags",
    );
    expect(color).toEqual("dull violet");
    expect(edges).toEqual([]);
  });
});

describe("canContainTargetBag", () => {
  it("should return true if outermostBag can contain targetBag", () => {
    expect(canContainTargetBag("bright white", "shiny gold", testMap)).toEqual(
      true,
    );
    expect(
      canContainTargetBag("bright lavender", "shiny gold", testMap),
    ).toEqual(true);
  });
  it("should return false if outermostBagColor cannot contain targetBagColor", () => {
    expect(canContainTargetBag("shiny black", "shiny gold", testMap)).toEqual(
      false,
    );
    expect(canContainTargetBag("drab magenta", "shiny gold", testMap)).toEqual(
      false,
    );
  });
});

describe("countBagsContainingTargetColor", () => {
  it("should return correct number of bag colors that can eventually contain target bag color", () => {
    expect(countBagsContainingTargetColor("shiny gold", testMap)).toEqual(3);
  });
});

describe("getNumOfRequiredBags", () => {
  const testMap2 = createColorMap([
    "shiny gold bags contain 2 dark red bags.",
    "dark red bags contain 2 dark orange bags.",
    "dark orange bags contain 2 dark yellow bags.",
    "dark yellow bags contain 2 dark green bags.",
    "dark green bags contain 2 dark blue bags.",
    "dark blue bags contain 2 dark violet bags.",
    "dark violet bags contain no other bags.",
  ]);

  it("should return 0 if outermostBag contains no bags", () => {
    expect(getNumOfRequiredBags("drab magenta", testMap2)).toEqual(0);
  });
  it("should return correct number of innerBags", () => {
    expect(getNumOfRequiredBags("shiny gold", testMap2)).toEqual(126);
  });
});
