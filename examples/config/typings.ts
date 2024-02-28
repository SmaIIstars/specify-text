import { SpecifyTextCustomType } from "../components/specify-text";

export type ExampleConfig = {
  title: string;
  text: string;
  configs: SpecifyTextCustomType[];
  buildIn?: boolean;
};
