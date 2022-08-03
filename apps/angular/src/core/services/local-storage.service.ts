import { Injectable } from '@angular/core';

/**
 * Local storage service.
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Save data to storage.
   * @param key Key.
   * @param data Data for save.
   */
  // eslint-disable-next-line require-await
  public async save<T>(key: string, data: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Get item from storage by key.
   * @param key Key.
   */
  // eslint-disable-next-line require-await
  public async get<T = unknown>(key: string): Promise<T | null> {
    const rawData = localStorage.getItem(key);
    if (rawData == null) {
      return null;
    }
    return JSON.parse(rawData) as T;
  }

  /**
   * Removed data from storage.
   * @param key Key.
   */
  // eslint-disable-next-line require-await
  public async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
