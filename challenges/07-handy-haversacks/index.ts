import readInput from "../../utils/readInput";
import {
  countBagsContainingTargetColor,
  countAllInnerBags,
  createColorMap,
  processStringInput,
} from "./lib";
processStringInput;
const batchFile = readInput();
const lineItems = processStringInput(batchFile);
const colorToEdgesMap = createColorMap(lineItems);
console.log(countBagsContainingTargetColor("shiny gold", colorToEdgesMap));
console.log(countAllInnerBags("shiny gold", colorToEdgesMap));
