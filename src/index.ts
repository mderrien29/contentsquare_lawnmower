import { Lawn } from "./lawn";
import { Mower } from "./mower";
import { getSimulationConfig } from "./config";
import { SimulationConfig } from "./interfaces";

const runSimulations = (config: SimulationConfig): void => {
  console.dir(config, { depth: null });

  const lawn = new Lawn(config.dimensions);

  config.mowers.forEach((mowerConfig) => {
    const mower = lawn.simulate(
      new Mower(mowerConfig.position, mowerConfig.direction),
      mowerConfig.instructions
    );

    console.log(mower.toTxt());
  });
};

getSimulationConfig("./src/input.txt").then((config) => runSimulations(config));
