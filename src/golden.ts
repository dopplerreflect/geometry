import { anglesArray } from "./anglesArray";
import { phi } from "./constants";
import { radialPoint } from "./radialPoint";
import type { Circle } from "./types";

export const goldenRadii = (outerRadius: number, count: number): number[] =>
  [...Array(count).keys()].map(i => outerRadius * phi ** i);

export const goldenCircles = (radii: number[], angles: number[]): Circle[] => {
  return [
    ...radii.map(r => ({ r, ...{ x: 0, y: 0 } })),
    ...angles
      .map(a =>
        radii.map(r => ({
          r,
          ...radialPoint(a, radii[0]),
        })),
      )
      .flat(),
  ];
};
