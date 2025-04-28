import type { Point } from "./types";

export function pointToString(point: Point): string {
  return `${point.x} ${point.y}`;
}

export function arrayMap(count: number, fn: (n: number) => number): number[] {
  return [...Array(count).keys()].map(n => fn(n));
}
