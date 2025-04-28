import type { Circle, Line, Point } from "./types";

export function findCircleIntersections(circles: Circle[]): Point[] {
  const intersections: Point[] = [];

  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      const c1 = circles[i];
      const c2 = circles[j];

      const d = Math.sqrt((c2.x - c1.x) ** 2 + (c2.y - c1.y) ** 2);

      // Check if circles are too far apart or one is contained within the other
      if (d > c1.r + c2.r || d < Math.abs(c1.r - c2.r)) {
        continue; // No intersection
      }

      const a = (c1.r ** 2 - c2.r ** 2 + d ** 2) / (2 * d);
      const h = Math.sqrt(c1.r ** 2 - a ** 2);

      const x0 = c1.x + (a * (c2.x - c1.x)) / d;
      const y0 = c1.y + (a * (c2.y - c1.y)) / d;

      const intersection1: Point = {
        x: x0 + (h * (c2.y - c1.y)) / d,
        y: y0 - (h * (c2.x - c1.x)) / d,
      };

      const intersection2: Point = {
        x: x0 - (h * (c2.y - c1.y)) / d,
        y: y0 + (h * (c2.x - c1.x)) / d,
      };

      intersections.push(intersection1, intersection2);
    }
  }

  return intersections;
}

export function findLineIntersections(lines: Line[]): Point[] {
  const intersections: Point[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const intersection = lineIntersection(lines[i], lines[j]);
      if (intersection) {
        const key = `${round(intersection.x)},${round(intersection.y)}`;
        if (!seen.has(key)) {
          intersections.push(intersection);
          seen.add(key);
        }
      }
    }
  }

  return intersections;
}

function round(value: number): number {
  return Number(value.toFixed(9)); // Reduced precision to avoid duplicates
}

export function lineIntersection(
  line1: Line,
  line2: Line,
  avoidNulls: boolean = false,
): Point | null {
  const [p1, p2] = line1;
  const [p3, p4] = line2;

  const denominator =
    (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);

  if (Math.abs(denominator) < 1e-9 && !avoidNulls) {
    return null; // Lines are parallel or coincident
  }

  const t =
    ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) /
    denominator;
  const u =
    -((p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x)) /
    denominator;

  if ((t >= 0 && t <= 1 && u >= 0 && u <= 1) || avoidNulls) {
    const x = p1.x + t * (p2.x - p1.x);
    const y = p1.y + t * (p2.y - p1.y);
    return { x, y };
  }

  return null; // Lines don't intersect within the segments
}
