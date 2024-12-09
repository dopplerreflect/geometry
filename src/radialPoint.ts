import type { GeometryOptions, Point } from "./types";

export function radialPoint(
  angle: number,
  radius: number,
  options?: GeometryOptions,
): Point {
  let center = options?.center || [0, 0];
  let rotate = options?.rotate || 0;
  return [
    Number(
      (
        center[0] +
        radius * Math.cos((angle + rotate) * (Math.PI / 180))
      ).toFixed(5),
    ),
    Number(
      (
        center[1] +
        radius * Math.sin((angle + rotate) * (Math.PI / 180))
      ).toFixed(5),
    ),
  ];
}

export function radialPointString(
  angle: number,
  radius: number,
  options?: GeometryOptions,
  px: "" | "px" = "",
): string {
  let point: Point = radialPoint(angle, radius, options);
  return `${point[0]}${px} ${point[1]}${px}`;
}
