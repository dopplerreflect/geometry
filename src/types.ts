export type Point = {
  x: number;
  y: number;
};

export type Line = [Point, Point];

export type Circle = Point & {
  r: number;
};

export type GeometryOptions = {
  center?: Point;
  rotate?: number;
};
