import { Segment } from "@specify-text/parser";

export type ComponentResolver<T = any> = (props: Segment & T) => unknown;

export type Catalog = Map<string, ComponentResolver>;

export interface ResolvedSegment {
  text: string;
  resolver: ComponentResolver | null;
  props: Segment;
}
