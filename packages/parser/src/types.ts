export interface Segment {
  text: string;
  type?: string;
  typeVal?: string;
}

export interface DeepSegment extends Segment {
  children?: (DeepSegment | string)[];
}

export interface ParseOptions {
  regex?: RegExp;
  parse?: (text: string) => Segment[];
}
