export type Point = {
  x: number;
  y: number;
};
export type Line = [Point, Point];
export type Circle = {
  x: number;
  y: number;
  r: number;
};

export type GeometryOptions = {
  center?: Point;
  rotate?: number;
};
