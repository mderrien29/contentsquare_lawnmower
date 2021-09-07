export type Tuple<T> = [T, T];

export interface SimulationConfig {
  dimensions: Tuple<number>;
  mowers: MowerConfig[];
}

export interface MowerConfig {
  position: Tuple<number>;
  direction: Tuple<number>;
  instructions: string;
}

export enum Command {
  Left = "L",
  Right = "R",
  Forward = "F",
}
