import { ComponentResolver } from "@specify-text/core";
import { Italics, Strong } from "@specify-text/react-widgets-base";

export const DEFAULT_BASE_WIDGETS: Record<string, ComponentResolver> = {
  italics: Italics as ComponentResolver,
  strong: Strong as ComponentResolver,
};
