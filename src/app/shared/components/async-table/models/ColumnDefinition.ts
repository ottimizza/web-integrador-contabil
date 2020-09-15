import { IButtonData, ColorData, IconData } from '@shared/models/IButtonData';

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

  public static defaultWithoutProperty(id: string, header: string, transform: (val: any) => string): ColumnDefinition<any> {
    return {
      header,
      id,
      transform
    };
  }

  public static reactiveIconColumn<T>(id: string, header: string, content: (el: T) => IconData & { tooltip: string }): ColumnDefinition<T> {
    return {
      header,
      id,
      transform: () => '',
      data: {
        type: 'reactive-icon',
        getIcon: content,
      }
    };
  }

  public static singleIconColumn<T>(
    icon: IconData,
    header: string,
    color: ColorData,
    label = '',
    onClick: (buttonSelector: string, el: T) => void = () => {}
  ) {
    return this.actionIconColumn<T>(icon.name, header, [{ icon, label, color }], onClick);
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
