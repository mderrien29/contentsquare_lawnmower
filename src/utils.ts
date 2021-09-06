import { Tuple } from "./interfaces";

export const cardinalDirectionsMapping: any = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
};

export const cardinalDirectionsToVector = (
  cardinalDirection: string
): Tuple<number> => {
  return cardinalDirectionsMapping[cardinalDirection];
};

export const vectorToCardinalDirection = (
  vector: Tuple<number>
): string | undefined => {
  return Object.keys(cardinalDirectionsMapping).find((cardinalDirection) =>
    compareTuples(vector, cardinalDirectionsMapping[cardinalDirection])
  );
};

const compareTuples = <T>(tupleA: Tuple<T>, tupleB: Tuple<T>): boolean => {
  return tupleA[0] === tupleB[0] && tupleA[1] === tupleB[1];
};
