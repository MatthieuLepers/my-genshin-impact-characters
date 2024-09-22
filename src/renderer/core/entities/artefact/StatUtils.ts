import ArtefactSubStatData from '@renderer/core/datas/ArtefactSubStat.json';

// export const generatePermutations = (input: Array<number>, length: number): Array<Array<number>> => {
//   // Sort the input to ensure consistency and to handle duplicates correctly.
//   input.sort((a, b) => a - b);

//   // Use reduce to iteratively build permutations while ensuring non-decreasing order.
//   return Array(length)
//     .fill(input)
//     .reduce((acc, curr) => acc.flatMap((perm: Array<number>) => curr
//       .filter((el: number) => el >= (perm[perm.length - 1] || el)) // Ensure non-decreasing order
//       .map((el: number) => [...perm, el])), [[]]);
// };

export const getMin = (statName: string): number => parseFloat(Object.keys(ArtefactSubStatData[statName].permutations)[0]);

export const getRollsFromValue = (statName: string, statValue: number): Array<number> => ArtefactSubStatData[statName]
  .permutations[statValue.toFixed(+statName.endsWith('%'))][0]
  .map((roll: number) => ArtefactSubStatData[statName].rolls[roll])
;

export const getRollType = (statName: string, rollValue: number) => {
  const [a, b, c, d] = ArtefactSubStatData[statName].rolls;
  return (a === rollValue && 'common')
    || (b === rollValue && 'uncommon')
    || (c === rollValue && 'rare')
    || (d === rollValue && 'epic')
  ;
};

export const getRealValue = ({ name, value }) => getRollsFromValue(name, value)
  .reduce((acc, val) => acc + val, 0)
;

export const round = (statName: string, statValue: number) => (statName.endsWith('%')
  ? Math.round(statValue * 10) / 10
  : Math.round(statValue))
;
