import type { Line, Point } from "./types";

export function midpoint(l: Line): Point {
  return {
    x: (l[0].x + l[1].x) * 0.5,
    y: (l[0].y + l[1].y) * 0.5,
  };
}
