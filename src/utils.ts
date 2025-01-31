import type { Point } from "./types";

export function pointToString(point: Point): string {
  return `${point.x} ${point.y}`;
}
