/**
 * Centralized storage utility for localStorage and sessionStorage operations
 * Provides type-safe methods for managing application data
 */

import { STORAGE_KEYS } from '@/constants';
import { logger } from './logger';

type StorageLocation = 'local' | 'session';

class StorageManager {
  private getStorage(location: StorageLocation): Storage {
    return location === 'local' ? localStorage : sessionStorage;
  }

  private handleError(operation: string, key: string, error: unknown): void {
    logger.error(`Storage ${operation} failed for key: ${key}`, error);
  }

  /**
   * Get item from storage
   */
  get<T>(key: string, location: StorageLocation = 'local'): T | null {
    try {
      const storage = this.getStorage(location);
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      this.handleError('get', key, error);
      return null;
    }
  }

  /**
   * Set item in storage
   */
  set<T>(key: string, value: T, location: StorageLocation = 'local'): boolean {
    try {
      const storage = this.getStorage(location);
      storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      this.handleError('set', key, error);
      return false;
    }
  }

  /**
   * Remove item from storage
   */
  remove(key: string, location: StorageLocation = 'local'): boolean {
    try {
      const storage = this.getStorage(location);
      storage.removeItem(key);
      return true;
    } catch (error) {
      this.handleError('remove', key, error);
      return false;
    }
  }

  /**
   * Clear all items from storage
   */
  clear(location: StorageLocation = 'local'): boolean {
    try {
      const storage = this.getStorage(location);
      storage.clear();
      return true;
    } catch (error) {
      this.handleError('clear', 'all', error);
      return false;
    }
  }

  /**
   * Check if key exists in storage
   */
  has(key: string, location: StorageLocation = 'local'): boolean {
    try {
      const storage = this.getStorage(location);
      return storage.getItem(key) !== null;
    } catch (error) {
      this.handleError('has', key, error);
      return false;
    }
  }
}

// Specific methods for common storage operations
export const storage = new StorageManager();

// Auth-related storage helpers
export const authStorage = {
  getAccessToken: () => storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN),
  setAccessToken: (token: string) => storage.set(STORAGE_KEYS.ACCESS_TOKEN, token),
  removeAccessToken: () => storage.remove(STORAGE_KEYS.ACCESS_TOKEN),

  getRefreshToken: () => storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN),
  setRefreshToken: (token: string) => storage.set(STORAGE_KEYS.REFRESH_TOKEN, token),
  removeRefreshToken: () => storage.remove(STORAGE_KEYS.REFRESH_TOKEN),

  getUser: () => storage.get(STORAGE_KEYS.USER),
  setUser: (user: unknown) => storage.set(STORAGE_KEYS.USER, user),
  removeUser: () => storage.remove(STORAGE_KEYS.USER),

  clearAuth: () => {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.USER);
  },
};

// Language storage helpers
export const languageStorage = {
  getLanguage: () => storage.get<string>(STORAGE_KEYS.LANGUAGE),
  setLanguage: (lang: string) => storage.set(STORAGE_KEYS.LANGUAGE, lang),
};
