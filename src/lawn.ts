import { Tuple } from "./interfaces";
import { Mower } from "./mower";

export class Lawn {
  constructor(private readonly dimensions: Tuple<number>) {}

  public simulate(mower: Mower, instructions: string): Mower {
    for (const instruction of instructions) {
      this.applyInstruction(mower, instruction);
    }

    return mower;
  }

  private applyInstruction(mower: Mower, instruction: string): Mower {
    switch (instruction) {
      case "L":
        mower.turnLeft();
        break;
      case "R":
        mower.turnRight();
        break;
      case "F":
        mower = this.moveMowerUnlessOutOfBounds(mower);
        break;
    }

    return mower;
  }

  private moveMowerUnlessOutOfBounds(mower: Mower): Mower {
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
