export type ValuesType<T extends readonly any[] | ArrayLike<any> | Record<any, any>> =
  T extends readonly any[]
    ? T[number]
    : T extends ArrayLike<any>
      ? T[number]
      : T extends object
        ? T[keyof T]
        : never;
