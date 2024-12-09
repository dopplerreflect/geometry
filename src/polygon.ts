import type { GeometryOptions, Point } from "./types";
import { anglesArray } from "./anglesArray";
import { radialPoint } from "./radialPoint";

type Polygon = Point[];

export function polygon(
  count: number,
  radius: number,
  options?: GeometryOptions,
): Polygon {
  return anglesArray(count).map(angle => radialPoint(angle, radius, options));
}

export function polygonPath(
  count: number,
  radius: number,
  options?: GeometryOptions,
): string {
  return (
    polygon(count, radius, options)
      .map((point: Point, i: number) => {
        return `${i === 0 ? "M" : " "}${point.x} ${point.y}`;
      })
      .join("") + "Z"
  );
}
