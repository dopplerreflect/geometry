import type { GeometryOptions, Point } from "./types";

export function radialPoint(
  angle: number,
  radius: number,
  options?: GeometryOptions,
): Point {
  let center = options?.center || { x: 0, y: 0 };
  let rotate = options?.rotate || 0;
  return {
    x: Number(
      (
        center.x +
        radius * Math.cos((angle + rotate) * (Math.PI / 180))
      ).toFixed(5),
    ),
    y: Number(
      (
        center.y +
        radius * Math.sin((angle + rotate) * (Math.PI / 180))
      ).toFixed(5),
    ),
  };
}

export function radialPointString(
  angle: number,
  radius: number,
  options?: GeometryOptions,
  px: "" | "px" = "",
): string {
  let point: Point = radialPoint(angle, radius, options);
  return `${point.x}${px} ${point.y}${px}`;
}
