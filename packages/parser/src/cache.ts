export class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const lruKey = this.cache.keys().next().value as K;
      this.cache.delete(lruKey);
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

const MAX_SIZE = 200;
const parseCache = new LRUCache<string, unknown>(MAX_SIZE);

export function getCacheKey(text: string, regex?: RegExp): string {
  return regex ? `${text}::${regex.source}` : text;
}

export function getCache<T>(key: string): T | undefined {
  return parseCache.get(key) as T | undefined;
}

export function setCache(key: string, value: unknown): void {
  parseCache.put(key, value);
}

export function clearCache(): void {
  parseCache.clear();
}
