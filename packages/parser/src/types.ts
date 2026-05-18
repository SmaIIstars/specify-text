export interface Segment {
  text: string;
  type?: string;
  typeVal?: string;
}

export interface ParseOptions {
  regex?: RegExp;
  parse?: (text: string) => Segment[];
}
