import type { Lang } from "../types/Project";

export const getTranslatedText = (
  text: string | Record<Lang, string>,
  lang: Lang
): string => {
  return typeof text === "string" ? text : text[lang];
};