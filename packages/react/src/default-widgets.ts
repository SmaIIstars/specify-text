import { ComponentResolver } from "@specify-text/core";
import Italics from "./components/italics";
import Strong from "./components/strong";

export const DEFAULT_BASE_WIDGETS: Record<string, ComponentResolver> = {
  italics: Italics as ComponentResolver,
  strong: Strong as ComponentResolver,
};
