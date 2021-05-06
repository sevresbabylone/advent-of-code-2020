import readInput from "../../utils/readInput";
import { Terrain } from "./lib";

const terrainString =
  "..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#";

const terrain = new Terrain(terrainString);
terrain.print();
