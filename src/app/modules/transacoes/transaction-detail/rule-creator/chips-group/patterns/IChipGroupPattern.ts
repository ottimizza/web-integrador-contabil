export interface IChipGroupParcialPattern {

  starting: string;
  ending: string;
  intersect?(lastChip: string, nextChip: string): string;
  treatment(chip: string): string | null;

}

export interface IChipGroupPattern {

  separators: string[];
  starting: string;
  ending: string;
  intersect?(lastChip: string, nextChip: string): string;
  treatment?(chip: string): string | null;
  sort?(chips: string[]): string[];

}
