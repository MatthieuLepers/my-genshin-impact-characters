import ArtefactSubStatData from '@renderer/core/datas/ArtefactSubStat.json';

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
