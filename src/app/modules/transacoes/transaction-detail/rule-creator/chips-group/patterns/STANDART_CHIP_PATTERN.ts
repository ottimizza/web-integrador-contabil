import { IChipGroupPattern } from './IChipGroupPattern';

export const STANDART_CHIP_PATTERN: IChipGroupPattern = {
  separators: [' ', '.', ',', '_', '-'],
  starting: '',
  ending: '',
  treatment: (chip: string) => {
    const isNotAWord = [
      '-',
      'ou',
      'e',
      'de',
      'do',
      'da',
      'das',
      'dos',
      'no',
      'na',
      'nos',
      'nas',
      'a',
      'à',
      'o',
      'é',
      'as',
      'os',
      'em',
      'que',
      'ao',
      'às'
    ].includes(chip);
    if (isNotAWord) {
      return null;
    }
    return chip;
  }
};
