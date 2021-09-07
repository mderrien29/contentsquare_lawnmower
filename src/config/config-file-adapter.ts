import fs from "fs";
import { promisify } from "util";
const readFile = promisify(fs.readFile);

import { Tuple, SimulationConfig, MowerConfig } from "../interfaces";
import { cardinalDirectionsToVector } from "../lib/cardinal-directions";

// TODO could be config option
const fileEncoding = "utf-8";
const eol = "\n";

export class ConfigFileAdapter implements SimulationConfig {
  private lines: string[] = [];

  constructor() {}

  public async loadConfigFile(filepath: string): Promise<this> {
    const fileData = await readFile(filepath, fileEncoding);
    this.lines = fileData.split(eol);
    return this;
  }

  public get dimensions(): Tuple<number> {
    const splittedFirstLine = this.lines[0].split(" ");
    const width = parseInt(splittedFirstLine[0]);
    const height = parseInt(splittedFirstLine[1]);

    return [width, height];
  }

  public get mowers(): MowerConfig[] {
    const mowers = [];

    for (let i = 1; i < this.lines.length - 1; i += 2) {
      mowers.push(this.parseMowerConfig(this.lines[i], this.lines[i + 1]));
    }

    return mowers;
  }

  private parseMowerConfig(firstLine: string, secondLine: string): MowerConfig {
    const splittedFirstLine = firstLine.split(" ");

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
      instructions: secondLine,
    };
  }
}
