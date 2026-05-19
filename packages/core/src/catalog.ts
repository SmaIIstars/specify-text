import { Catalog, ComponentResolver } from './types.js';

export function createCatalog(
  defaults?: Record<string, ComponentResolver>
): Catalog {
  return new Map(Object.entries(defaults ?? {}));
}
