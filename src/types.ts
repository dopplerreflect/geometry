export type Point = [number, number];
export type Line = [Point, Point];
export type Circle = {
  cx: number;
  cy: number;
  r: number;
};

export type GeometryOptions = {
  center?: Point;
  rotate?: number;
};
