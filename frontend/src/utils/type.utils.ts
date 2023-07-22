type Merge<T1, T2> = Omit<T1, keyof T2> & T2;
type ValueOf<T> = T[keyof T];

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;

type Push<T extends any[], V> = [...T, V];

type Tuplify<
  T,
  L = LastOf<T>,
  N = [T] extends [never] ? true : false
> = true extends N ? [] : Push<Tuplify<Exclude<T, L>>, L>;

type NonNullableFields<T> = { [K in keyof T]: NonNullable<T[K]> };

type JsonPrimitive = string | number | boolean | null | undefined;

type JsonArray = readonly JsonValue[];

type JsonObject = {
  [key: string]: JsonPrimitive | JsonObject | JsonArray;
};

// JSONで指定可能な型のみの型
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

type Diff<T, U> = Omit<T, keyof U & keyof T>;
type FilteredKeyOf<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

type IndexType = string | number;

export type {
  Merge,
  ValueOf,
  Tuplify,
  NonNullableFields,
  JsonValue,
  Diff,
  FilteredKeyOf,
  IndexType,
};
