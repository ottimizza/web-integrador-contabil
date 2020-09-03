import { IButtonData } from '@shared/models/IButtonData';

export class ColumnDefinition<T> {
  id: string;
  header: string;
  key?: string;
  transform: (value: T) => string;
  data?: any;

  public static default(property: string, header: string): ColumnDefinition<any> {
    return this.activeDefault(property, header, val => val);
  }

  public static activeDefault(property: string, header: string, transform: (val: any) => string): ColumnDefinition<any> {
    return {
      header,
      id: property,
      key: property,
      transform
    };
  }

  public static actionIconColumn<T>(
    colName: string,
    header: string,
    buttons: IButtonData[],
    onClick: (buttonSelector: string, el: T) => void
  ): ColumnDefinition<T> {
    return {
      header,
      id: colName,
      transform: () => '',
      data: {
        type: 'icon',
        buttons,
        clicked: onClick
      }
    };
  }
}
