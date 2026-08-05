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
      if (!item) return null;
      // Try to parse as JSON, if it fails return as string
      try {
        return JSON.parse(item);
      } catch {
        return item as T;
      }
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
      console.log('[Storage.set] Setting:', { key, location, value });
      // Only JSON.stringify if value is not a string (strings are stored as-is)
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      storage.setItem(key, serializedValue);
      console.log('[Storage.set] Set successful, verifying:', storage.getItem(key));
      return true;
    } catch (error) {
      console.error('[Storage.set] Error:', error);
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
  getAccessToken: () => storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN, 'local') || storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN, 'session'),
  setAccessToken: (token: string, location: 'local' | 'session' = 'local') => storage.set(STORAGE_KEYS.ACCESS_TOKEN, token, location),
  removeAccessToken: () => {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN, 'local');
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN, 'session');
  },

  getRefreshToken: () => storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN, 'local') || storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN, 'session'),
  setRefreshToken: (token: string, location: 'local' | 'session' = 'local') => storage.set(STORAGE_KEYS.REFRESH_TOKEN, token, location),
  removeRefreshToken: () => {
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN, 'local');
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN, 'session');
  },

  getUser: () => storage.get(STORAGE_KEYS.USER, 'local') || storage.get(STORAGE_KEYS.USER, 'session'),
  setUser: (user: unknown, location: 'local' | 'session' = 'local') => storage.set(STORAGE_KEYS.USER, user, location),
  removeUser: () => {
    storage.remove(STORAGE_KEYS.USER, 'local');
    storage.remove(STORAGE_KEYS.USER, 'session');
  },

  clearAuth: () => {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN, 'local');
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN, 'session');
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN, 'local');
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN, 'session');
    storage.remove(STORAGE_KEYS.USER, 'local');
    storage.remove(STORAGE_KEYS.USER, 'session');
  },
};

// Language storage helpers
export const languageStorage = {
  getLanguage: () => storage.get<string>(STORAGE_KEYS.LANGUAGE),
  setLanguage: (lang: string) => storage.set(STORAGE_KEYS.LANGUAGE, lang),
};
