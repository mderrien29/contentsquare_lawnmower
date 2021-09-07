import { Lawn } from "./lib/lawn";
import { ConfigFileAdapter } from "./config/config-file-adapter";

const filepath = process.argv[2];
if (!filepath) {
  console.error("Please provide a filepath argument");
  process.exit(1);
}

new ConfigFileAdapter()
  .loadConfigFile(filepath)
  .then((config) => Lawn.runSimulation(config))
  .catch(console.error);
