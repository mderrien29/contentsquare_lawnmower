import { Tuple } from "../interfaces";
import { vectorToCardinalDirection } from "./cardinal-directions";

export class Mower {
  public position: Tuple<number>;
  private direction: Tuple<number>;

  constructor(
    originalPosition: Tuple<number> = [0, 0],
    originalDirection: Tuple<number> = [0, 1]
  ) {
    this.position = originalPosition;
    this.direction = originalDirection;
  }

  public moveForward(): Tuple<number> {
    return this.move(1);
  }

  public moveBackward(): Tuple<number> {
    return this.move(-1);
  }

  public turnLeft(): this {
    return this.turn([-1, 1]);
  }

  public turnRight(): this {
    return this.turn([1, -1]);
  }

  public toString(): string {
    return `${this.position[0]} ${this.position[1]} ${vectorToCardinalDirection(
      this.direction
    )}`;
  }

  private move(distance: number): Tuple<number> {
    this.position[0] += distance * this.direction[0];
    this.position[1] += distance * this.direction[1];
    return this.position;
  }

  private turn(vector: Tuple<number>): this {
    this.direction = [
      this.direction[1] * vector[0],
      this.direction[0] * vector[1],
    ];
    return this;
  }
}
