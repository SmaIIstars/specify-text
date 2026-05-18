import { describe, it, expect, vi } from 'vitest';
import { createCatalog } from '../catalog';
import { resolve, resolveWithFallback } from '../resolve';
import type { Segment } from '@specify-text/parser';

const segments: Segment[] = [
  { text: 'Hello', type: 'italics', typeVal: 'true' },
  { text: 'World', type: 'strong', typeVal: 'false' },
  { text: 'Unknown', type: 'missing', typeVal: 'x' },
  { text: 'Plain text' },
];

describe('createCatalog', () => {
  it('creates an empty catalog by default', () => {
    const catalog = createCatalog();
    expect(catalog.get('italics')).toBeUndefined();
  });

  it('creates a catalog with defaults', () => {
    const italics = () => 'italics';
    const catalog = createCatalog({ italics });
    expect(catalog.get('italics')).toBe(italics);
    expect(catalog.get('strong')).toBeUndefined();
  });
});

describe('resolve', () => {
  it('matches segments to resolvers', () => {
    const italics = () => 'italics';
    const catalog = createCatalog({ italics });

    const result = resolve(segments, catalog);

    expect(result[0].resolver).toBe(italics);
    expect(result[1].resolver).toBeNull();
    expect(result[2].resolver).toBeNull();
    expect(result[3].resolver).toBeNull();
  });

  it('returns null resolver for segments without type', () => {
    const catalog = createCatalog();
    const result = resolve([{ text: 'plain' }], catalog);

    expect(result[0].resolver).toBeNull();
  });

  it('preserves text and props in resolved segments', () => {
    const italics = () => 'italics';
    const catalog = createCatalog({ italics });
    const result = resolve(segments, catalog);

    expect(result[0].text).toBe('Hello');
    expect(result[0].props).toEqual({ text: 'Hello', type: 'italics', typeVal: 'true' });
  });

  it('returns empty array for empty input', () => {
    const catalog = createCatalog();
    expect(resolve([], catalog)).toEqual([]);
  });
});

describe('resolveWithFallback', () => {
  it('handles errors gracefully', () => {
    const onError = vi.fn();
    const catalog = createCatalog();
    const result = resolveWithFallback(segments, catalog, onError);

    expect(onError).not.toHaveBeenCalled();
    expect(result).toHaveLength(4);
  });

  it('returns null resolver for missing types', () => {
    const catalog = createCatalog();
    const result = resolveWithFallback(segments, catalog);

    for (const r of result) {
      expect(r.resolver).toBeNull();
    }
  });
});
