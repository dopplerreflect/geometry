import { calculateDistance } from "./calculateDistance";
import type { Point, Circle } from "./types";

export const findNearest = (
  target: Point,
  points: Point[] | Circle[],
): Point | Circle => {
  return points.reduce((nearest, current) => {
    const distanceToNearest = calculateDistance(target, nearest);
    const distanceToCurrent = calculateDistance(target, current);
    return distanceToCurrent < distanceToNearest ? current : nearest;
  });
};
