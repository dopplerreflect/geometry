import type { Circle, GeometryOptions, Line, Point } from "./types";
import { anglesArray } from "./anglesArray";
import { radialPoint, radialPointString } from "./radialPoint";
import { phi } from "./constants";

import { pointToString } from "./utils";
import { lineIntersection } from "./intersection";

type Polygon = Point[];

export function findCentroid(polygon: Polygon): Point {
  return polygon.reduce(
    (acc, point) => {
      acc.x += point.x;
      acc.y += point.y;
      return acc;
    },
    { x: 0, y: 0 },
  );
}

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

export function polygonPointString(polygon: Polygon): string {
  return polygon.map(p => `${p.x} ${p.y}`).join(" ");
}

export function shrinkPolygon(polygon: Polygon, percentage: number): Polygon {
  const centroid = findCentroid(polygon);
  centroid.x /= polygon.length;
  centroid.y /= polygon.length;

  const shrinkFactor = 1 - percentage / 100;

  return polygon.map(point => ({
    x: centroid.x + (point.x - centroid.x) * shrinkFactor,
    y: centroid.y + (point.y - centroid.y) * shrinkFactor,
  }));
}

export function starPoints(
  circle: Circle,
  rotateToOrigin: boolean = true,
): string {
  const rotate = rotateToOrigin
    ? (Math.atan2(circle.y, circle.x) * (180 / Math.PI)) % 72
    : undefined;
  const angles = anglesArray(10, rotate);
  const r = circle.r,
    r2 = circle.r * phi ** 2;
  return angles
    .map((a, i) =>
      radialPointString(a, i % 2 === 0 ? r : r2, {
        center: { ...circle },
      }),
    )
    .join(" ");
}

export function polygonFromIntersectionOfLines(
  lineIndices: number[],
  lineArray: Line[],
): string {
  const result = [];
  for (let i = 0; i < lineIndices.length - 1; i++) {
    let input = [lineArray[lineIndices[i]], lineArray[lineIndices[i + 1]]];
    let point = lineIntersection(input[0], input[1], true);
    console.log(point);
    if (point) {
      result.push(pointToString(point));
    }
  }
  return result.join(" ");
}
