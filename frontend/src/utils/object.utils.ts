function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

function objectValues<T extends object>(obj: T) {
  return Object.values(obj) as T[keyof T][];
}

function removeUndefined<T extends object>(obj: T) {
  const res = { ...obj };
  objectKeys(res).forEach((key) => res[key] === undefined && delete res[key]);
  return res;
}

function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const res = { ...obj };
  keys.forEach((key) => delete res[key]);
  return res as Omit<T, K>;
}

export { objectEntries, objectKeys, objectValues, removeUndefined, omit };
