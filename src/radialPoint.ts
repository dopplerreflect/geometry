import type { GeometryOptions, Point } from "./types";
import { Decimal } from "decimal.js";
export function radialPoint(
  angle: number,
  radius: number,
  options?: GeometryOptions,
): Point {
  let center = options?.center ?? { x: 0, y: 0 };
  let rotate = options?.rotate ?? 0;
  let a = new Decimal(angle);
  let r = new Decimal(radius);
  let cx = new Decimal(center.x);
  let cy = new Decimal(center.y);

  return {
    x: cx
      .plus(
        r.times(
          Decimal.cos(a.plus(rotate).times(new Decimal(Math.PI).div(180))),
        ),
      )
      .toNumber(),
    y: cy
      .plus(
        r.times(
          Decimal.sin(a.plus(rotate).times(new Decimal(Math.PI).div(180))),
        ),
      )
      .toNumber(),
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
