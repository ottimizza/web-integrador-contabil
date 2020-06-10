import { IChipGroupPattern } from './IChipGroupPattern';

export const VALUE_CHIP_PATTERN: IChipGroupPattern = {
  separators: [],
  starting: 'R$',
  ending: '',
  treatment: (chip: string) => {
    chip = (+chip).toFixed(2);
    return chip.replace(/\./g, ',');
  }
};
