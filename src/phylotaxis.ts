import { radialPoint } from "./radialPoint";
import { PHI } from "./constants";
import type { GeometryOptions, Point } from "./types";

const phi = PHI - 1;

export const phylotaxis = (
  count: number,
  radius: number,
  radialPointOptions?: GeometryOptions,
): Point[] =>
  [...Array(count).keys()].map(k => {
    const r = (radius / count) * k;
    return radialPoint((360 - 360 * phi) * k, r, radialPointOptions);
  });
