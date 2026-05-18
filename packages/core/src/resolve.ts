import { Segment } from '@specify-text/parser';
import { Catalog, ResolvedSegment } from './types';

export function resolve(
  segments: Segment[],
  catalog: Catalog
): ResolvedSegment[] {
  return segments.map((segment) => {
    if (!segment.type) {
      return { text: segment.text, resolver: null, props: segment };
    }
    const resolver = catalog.get(segment.type) ?? null;
    return { text: segment.text, resolver, props: segment };
  });
}

export function resolveWithFallback(
  segments: Segment[],
  catalog: Catalog,
  onError?: (error: Error, segment: Segment) => void
): ResolvedSegment[] {
  return segments.map((segment) => {
    try {
      if (!segment.type) {
        return { text: segment.text, resolver: null, props: segment };
      }
      const resolver = catalog.get(segment.type) ?? null;
      return { text: segment.text, resolver, props: segment };
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      onError?.(error, segment);
      return { text: segment.text, resolver: null, props: segment };
    }
  });
}
