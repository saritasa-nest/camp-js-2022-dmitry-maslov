/** Local storage service. */
export namespace LocalStorageService {

  /**
   * Save data in local storage.
   * @param key Key.
   * @param data Data.
   */
  export function save<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Get item.
   * @param key Key.
   */
  export function get<T = unknown>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item);
  }

  /**
   * Remove item from local storage.
   * @param key Key.
   */
  export function remove(key: string): void {
    localStorage.removeItem(key);
  }
}
