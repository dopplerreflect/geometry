import { radialPoint } from "./radialPoint";
import type { Line } from "./types";

export const chordMatrix = (angles: number[], radii: number[]): Line[] => {
  const lineAngleMatrixSet: Set<string> = new Set();

  angles.forEach((_, a) => {
    [...Array(angles.length - 3).keys()].forEach(b => {
      lineAngleMatrixSet.add(
        JSON.stringify([a, (a + b + 2) % angles.length].sort()),
      );
    });
  });

  const lineAngleMatrix = [...lineAngleMatrixSet].map(e => JSON.parse(e));

  return radii
    .map(radius =>
      lineAngleMatrix.map(
        (e, i) =>
          [
            radialPoint(angles[e[0]], radius),
            radialPoint(angles[e[1]], radius),
          ] as Line,
      ),
    )
    .flat();
};
