/**
 * Track by id.
 * @param _index Index.
 * @param element Element.
 */
export function trackById<T extends { id: number | string; }>(
  _index: number,
  element: T,
): T['id'] {
  return element.id;
}
