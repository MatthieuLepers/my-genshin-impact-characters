export const rollsData = [
  [0], [1], [2], [3],
  [0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [3, 3],
  [0, 0, 0], [0, 0, 1], [0, 0, 2], [0, 0, 3], [0, 1, 3], [0, 2, 3], [0, 3, 3], [1, 3, 3], [2, 3, 3], [3, 3, 3],
  [0, 0, 0, 3], [0, 0, 1, 3], [0, 0, 2, 3], [0, 0, 3, 3], [0, 1, 3, 3], [0, 2, 3, 3], [0, 3, 3, 3], [1, 3, 3, 3], [2, 3, 3, 3], [3, 3, 3, 3],
  [0, 0, 0, 3, 3], [0, 0, 1, 3, 3], [0, 0, 2, 3, 3], [0, 0, 3, 3, 3], [0, 1, 3, 3, 3], [0, 2, 3, 3, 3], [0, 3, 3, 3, 3], [1, 3, 3, 3, 3], [2, 3, 3, 3, 3], [3, 3, 3, 3, 3],
  [0, 0, 0, 3, 3, 3], [0, 0, 1, 3, 3, 3], [0, 0, 2, 3, 3, 3], [0, 0, 3, 3, 3, 3], [0, 1, 3, 3, 3, 3], [0, 2, 3, 3, 3, 3], [0, 3, 3, 3, 3, 3], [1, 3, 3, 3, 3, 3], [2, 3, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3],
];

export const rolls = (baseStat: number): Array<number> => rollsData.reduce((ac, column) => [
  ...ac,
  column.reduce((a, i) => a + baseStat * (1 - ((3 - i) / 10)), 0),
], []);

export const getRollsFromValue = (baseStat: number, value: number): Array<number> => {
  const index = rolls(baseStat).findIndex((mark) => Math.round(mark * 10) / 10 === Math.round(value * 10) / 10);
  return rollsData[index].map((i) => baseStat * (1 - (3 - i) / 10));
};

export const getMinMax = (baseStat: number): [number, number] => {
  const result = rolls(baseStat);

  return [result[0], result[result.length - 1]];
};
