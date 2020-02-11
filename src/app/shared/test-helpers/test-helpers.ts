interface TestObjModel {
  name: string;
}

export class TestHelper {
  static ipsum(size?: number) {
    // tslint:disable-next-line: max-line-length
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet blandit dolor. Duis ac cursus massa, ac malesuada lorem. Nunc posuere erat ullamcorper erat tempor dictum sit amet a diam. Mauris rutrum tempor metus. Maecenas ultricies facilisis lectus. Fusce facilisis dolor ex, quis blandit risus posuere sit amet. In hac habitasse platea dictumst. Vivamus sed tempus diam, eu elementum arcu. Duis lorem sem, rhoncus sed mauris nec, commodo aliquet orci. Curabitur mollis vulputate dui, non lacinia justo pellentesque nec. Fusce dictum dolor at dui vulputate, quis ultricies turpis consectetur. Morbi finibus lectus ac tincidunt hendrerit. Etiam ac nibh eget leo fringilla maximus.';
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

  static obj(...args: string[]) {
    return {
      name: args[0] ? args[0] : this.ipsum(20)
    };
  }

}
