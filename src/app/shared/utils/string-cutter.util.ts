export class StringCutterUtils {

  public static cut(text: string, charAmount: number): string {
    if (text.length > charAmount) {
      return text.slice(0, charAmount - 3) + '...';
    } else {
      return text;
    }
  }

}
