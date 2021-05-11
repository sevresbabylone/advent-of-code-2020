import readInput from "../../utils/readInput";
import {
  processLineItem,
  processLineItems,
  createColorToEdgesMap,
  countBagsContainingTargetColor,
  countAllInnerBags,
} from "./lib";

const batchFile = readInput();
const colorToEdgesMap = processLineItems(batchFile);
console.log(countBagsContainingTargetColor("shiny gold", colorToEdgesMap));
console.log(countAllInnerBags("shiny gold", colorToEdgesMap));
