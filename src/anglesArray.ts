export const anglesArray = (count: number, rotate = -90): number[] =>
  [...Array(count).keys()].map(i => (360 / count) * i + rotate);
