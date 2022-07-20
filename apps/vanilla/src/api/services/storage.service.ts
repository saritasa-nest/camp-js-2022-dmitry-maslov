export namespace StorageService {

  /**
   * Set item to local storage.
   * @param key Key.
   * @param data Data for save.
   */
  export function set<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Get value by key.
   * @param key Key.
   */
  export function get<T = unknown>(key: string): T | null {
    const rawData = localStorage.getItem(key);
    if (rawData === null) {
      return null;
    }
    return JSON.parse(rawData) as T;
  }

  /**
   * Remove data from storage by key.
   * @param key Key.
   */
  export function remove(key: string): void {
    localStorage.removeItem(key);
  }
}
