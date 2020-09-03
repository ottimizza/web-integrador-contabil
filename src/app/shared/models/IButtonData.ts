import { HexColor } from '@shared/components/action-buttons/action-buttons.component';

export type ColorData = 'primary'
                      | 'secondary'
                      | 'success'
                      | 'danger'
                      | 'warning'
                      | 'info'
                      | 'light'
                      | 'link'
                      | 'dark'
                      | 'link'
                      | HexColor;

export class IconData {

  constructor(
    public type: 'default' | 'solid' | 'regular' | 'light' | 'duotone',
    public color: ColorData | 'default',
    public name: string
  ) {}

  public static default(icon: string) {
    return new IconData('duotone', 'default', icon);
  }
}

export interface IButtonData {
  icon: IconData;
  label: string;
  color?: ColorData;
  selector?: string;
}
