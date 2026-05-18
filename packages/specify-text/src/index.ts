// Compatibility layer: re-export everything from @specify-text/react + builtin widgets

// Main component (default export preserved)
import { SpecifyText } from '@specify-text/react';
export default SpecifyText;

// All react package exports
export type { SpecifyTextProps } from '@specify-text/react';
export { DEFAULT_BASE_WIDGETS, BlankLine, ParagraphGroup, Italic, Strong } from '@specify-text/react';
export type { BlankLineProps, ParagraphGroupProps, ItalicProps, StrongProps } from '@specify-text/react';

// Builtin widgets
export {
  ColorfulText,
  LinkText,
  VariableText,
  ConditionalText,
} from '@specify-text/react-widgets-builtin';
export type {
  ColorfulTextProps,
  LinkTextProps,
  VariableTextProps,
  ConditionalTextProps,
} from '@specify-text/react-widgets-builtin';
