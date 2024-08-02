import { Recommendation } from "@/types";

export type ChatFormState =
  | {
      errors?: {
        message?: string;
      };
      result?: Recommendation;
    }
  | undefined;
