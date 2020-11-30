export type KeyMap<T> = {
  [K in keyof T]?: T[K];
};
