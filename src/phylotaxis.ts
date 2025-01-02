import { radialPoint } from "./radialPoint";
import { PHI } from "./constants";
import type { GeometryOptions, Point } from "./types";

const phi = PHI - 1;
const PhyloAngle = 360 - 360 * phi;

export const phylotaxis = (
  count: number,
  radius: number,
  radialPointOptions?: GeometryOptions,
): Point[] => {
  const pitch = radius / count;
  return [...Array(count).keys()].map(k => {
    const r = pitch * k;
    return radialPoint(PhyloAngle * k, r, radialPointOptions);
  });
};

export const phylotaxis2 = (
  count: number,
  radius: number,
  radialPointOptions?: GeometryOptions,
): Point[] => {
  const pitch = radius / count;
  const result: Point[] = [];
  for (let i = 0; i < count; i++) {
    const r = pitch * i;
    result.push(radialPoint(PhyloAngle * i, r, radialPointOptions));
  }
  return result;
};
