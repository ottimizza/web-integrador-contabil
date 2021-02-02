import { KeyMap } from '@shared/models/KeyMap';

export function fromJson<T>(Clazz: any, ...params: any[]) {
  return (json: KeyMap<T>) => {
    const instance: T = new Clazz(...params);
    for (const key of Object.keys(json)) {
      instance[key] = json[key];
    }
    return instance;
  };
}
