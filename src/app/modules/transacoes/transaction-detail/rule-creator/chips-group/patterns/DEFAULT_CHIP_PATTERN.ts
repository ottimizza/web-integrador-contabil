import { IChipGroupPattern } from './IChipGroupPattern';

export const DEFAULT_CHIP_PATTERN: IChipGroupPattern = {
  separators: [' ', '.', ',', '_', '-', '(', ')', '/'],
  starting: '',
  ending: '',
  treatment: (chip: string) => chip
};
