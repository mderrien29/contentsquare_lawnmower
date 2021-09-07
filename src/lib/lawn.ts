import { SimulationConfig, Tuple, Command } from "../interfaces";
import { Mower } from "./mower";

export class Lawn {
  constructor(private readonly dimensions: Tuple<number>) {}

  public static runSimulation(config: SimulationConfig): void {
    const lawn = new Lawn(config.dimensions);

    config.mowers.forEach((mowerConfig) => {
      const mower = lawn.simulateMower(
        new Mower(mowerConfig.position, mowerConfig.direction),
        mowerConfig.instructions
      );

      console.log(mower.toString());
    });
  }

  private simulateMower(mower: Mower, instructions: string): Mower {
    for (const instruction of instructions) {
      this.applyInstruction(mower, instruction);
    }

    return mower;
  }

  private applyInstruction(mower: Mower, instruction: string): Mower {
    switch (instruction) {
      case Command.Left:
        mower.turnLeft();
        break;
      case Command.Right:
        mower.turnRight();
        break;
      case Command.Forward:
        mower = this.moveMowerForwardUnlessOutOfBounds(mower);
        break;
    }

    return mower;
  }

  private moveMowerForwardUnlessOutOfBounds(mower: Mower): Mower {
    mower.moveForward();
    if (!this.isMowerOnLawn(mower)) {
      mower.moveBackward();
    }

    return mower;
  }

  private isMowerOnLawn(mower: Mower): boolean {
    return (
      mower.position[0] >= 0 &&
      mower.position[0] <= this.dimensions[0] &&
      mower.position[1] >= 0 &&
      mower.position[1] <= this.dimensions[1]
    );
  }
}
