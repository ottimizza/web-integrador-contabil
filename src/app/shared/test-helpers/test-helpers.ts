export class TestHelper {

  static ipsum(size?: number) {
    // tslint:disable-next-line: max-line-length
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non metus bibendum, faucibus odio sed, dictum magna. Fusce feugiat commodo porttitor. Curabitur a mi id purus mattis accumsan. Proin ornare urna ultrices diam sagittis, eu condimentum ipsum aliquam. Suspendisse non turpis eu ante congue laoreet. Nunc pellentesque porta magna non congue. Mauris non luctus quam, vel elementum tellus. Sed cursus arcu ac eleifend vestibulum. Pellentesque sagittis non quam id dictum. Fusce ut tortor diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur justo quis quam ultrices euismod. Suspendisse et faucibus justo. Pellentesque eget ullamcorper quam, sit amet ultrices.';
    if (size) {
      if (size > text.length) {
        return text;
      } else {
        return text.slice(0, size);
      }
    } else {
      return text;
    }
  }
}
