import { IChipGroupPattern } from './IChipGroupPattern';

export const DATE_CHIP_PATTERN: IChipGroupPattern = {
  separators: ['-'],
  starting: '',
  ending: '',
  treatment: (chip: string) => {
    if (chip !== '-') {
      return chip;
    }
    return null;
  },
  intersect: () => '/',
  sort: (chips: string[]) => {
    if (chips.length !== 3) {
      return chips;
    }
    return [
      chips[2],
      chips[1],
      chips[0]
    ];
  }
};
