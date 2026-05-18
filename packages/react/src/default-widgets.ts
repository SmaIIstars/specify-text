import { ComponentResolver } from "@specify-text/core";
import Italic from "./italic";
import Strong from "./strong";

export const DEFAULT_BASE_WIDGETS: Record<string, ComponentResolver> = {
  italic: Italic as ComponentResolver,
  strong: Strong as ComponentResolver,
};
