import fs from "fs";
import { promisify } from "util";

import { Tuple, SimulationConfig, MowerConfig } from "./interfaces";
import { cardinalDirectionsToVector } from "./utils";

const readFile = promisify(fs.readFile);

// TODO could be config option
const fileEncoding = "utf-8";
const eol = "\n";

// TODO could be adapter pattern ?
export const getSimulationConfig = async (
  filepath: string
): Promise<SimulationConfig> => {
  try {
    const lines = await readLines(filepath);
    return {
      dimensions: parseDimensions(lines[0]),
      mowers: parseMowerConfigs(lines),
    };
  } catch (e) {
    throw new Error(`Failed to read config due to error: "${e}"`);
  }
};

const readLines = async (filepath: string): Promise<string[]> => {
  const fileData = await readFile(filepath, fileEncoding);
  return fileData.split(eol);
};

const parseDimensions = (line: string): Tuple<number> => {
  const splittedLine = line.split(" ");
  return [parseInt(splittedLine[0]), parseInt(splittedLine[1])];
};

const parseMowerConfigs = (lines: string[]): MowerConfig[] => {
  const mowers = [];

  for (let i = 1; i < lines.length - 1; i += 2) {
    try {
      mowers.push(parseMowerConfig([lines[i], lines[i + 1]]));
    } catch (e) {}
  }

  return mowers;
};

const parseMowerConfig = (lines: Tuple<string>): MowerConfig => {
  const splittedFirstLine = lines[0].split(" ");
  const position: Tuple<number> = [
    parseInt(splittedFirstLine[0]),
    parseInt(splittedFirstLine[1]),
  ];

  const direction = cardinalDirectionsToVector(splittedFirstLine[2]);
  if (!direction) {
    throw new Error(`Invalid direction ${direction}`);
  }

  return {
    position,
    direction,
    instructions: lines[1],
  };
};
