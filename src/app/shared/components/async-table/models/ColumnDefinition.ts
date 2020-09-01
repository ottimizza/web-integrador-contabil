export class ColumnDefinition<T> {
  id: string;
  header: string;
  key?: string;
  transform: (value: T) => string;

  public static default(property: string, header: string): ColumnDefinition<any> {
    return {
      header,
      id: property,
      key: property,
      transform: (val) => val
    };
  }
}
