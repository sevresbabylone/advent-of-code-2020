import readInput from "../../utils/readInput";
import { getDoubleExpenseReport, getTripleExpenseReport } from "./lib";

const input = readInput();
const numList = input.split("\n").filter(Boolean).map(Number);
const sum = 2020;
const doubleExpense = getDoubleExpenseReport(numList, sum);
const tripleExpense = getTripleExpenseReport(numList, sum);
console.log({ doubleExpense, tripleExpense });
