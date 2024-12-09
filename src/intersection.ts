import type { Line, Point } from "./types";

export const intersection = (line1: Line, line2: Line): Point => {
  const [[x1, y1], [x2, y2]] = line1;
  const [[x3, y3], [x4, y4]] = line2;
  const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  let x = Number(
    (
      ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
      d
    ).toFixed(1),
  );

  let y = Number(
    (
      ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
      d
    ).toFixed(2),
  );

  // if (x === -0) x = 0;
  // if (y === -0) y = 0;

  return [x, y];
};
