import { ComponentResolver } from "@specify-text/core";
import Italics from "./italics";
import Strong from "./strong";

export const DEFAULT_BASE_WIDGETS: Record<string, ComponentResolver> = {
  italics: Italics as ComponentResolver,
  strong: Strong as ComponentResolver,
};
