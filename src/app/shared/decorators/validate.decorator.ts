export interface ValidateOptions {
  type?: 'bigint' | 'boolean' | 'function' | 'number' | 'string' | 'object' | 'symbol' | 'undefined';
  instance?: any;
  notEmpty?: boolean;
}

export function PropertyValidator(options: ValidateOptions = { notEmpty: true }) {
  return (target: any, propertyKey: string | symbol) => {

    const prop = target[propertyKey];
    let validate = true;

    if (options.type !== undefined && typeof prop !== options.type) {
      validate = false;
    }
    if (options.notEmpty !== undefined && !!prop) {
      validate = false;
    }
    if (options.instance !== undefined && !(prop instanceof options.instance)) {
      validate = false;
    }

    if (validate) {
      return prop;
    } else {
      console.error(`The property ${String(propertyKey)} is not allowed, validations: `, options);
    }

  };
}
