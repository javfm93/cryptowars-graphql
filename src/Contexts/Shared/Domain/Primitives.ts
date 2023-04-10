type Methods<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type MethodsAndProperties<T> = { [key in keyof T]: T[key] };

type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;

type NativePrimitives = number | string | Date | boolean;

type ValueObjectValue<T> = {
  [key in keyof T]: T[key] extends { value: unknown }
    ? Pick<T[key], 'value'>['value']
    : T[key] extends Array<{ value: unknown }>
    ? Pick<T[key][number], 'value'>['value'][]
    : T[key] extends Array<Object>
    ? Primitives<T[key][number]>[]
    : T[key] extends Object
    ? Primitives<T[key]>
    : T[key];
};

type EntityCollection<T extends { currentItems: Array<unknown> }> = ValueObjectValue<
  Pick<T, 'currentItems'>
>['currentItems'];

export type Primitives<T> = T extends NativePrimitives
  ? T
  : T extends { currentItems: Array<unknown> }
  ? EntityCollection<T>
  : ValueObjectValue<Properties<T>>;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export interface Class<T> extends Function {
  new (...args: any[]): T;
}

export interface AbstractClass<T> extends Function {
  prototype: T;
}

export function assertNeverHappen(value: never) {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}
