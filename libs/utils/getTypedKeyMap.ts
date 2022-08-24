/**
 * Returns a typed array of the object's keys.
 * @param object Object.
 */
export function getTypedKeyMap<T extends object>(object: T): (keyof typeof object)[] {
  return Object.keys(object) as (keyof typeof object)[];
}
