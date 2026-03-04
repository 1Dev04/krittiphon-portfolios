export type Lang = "en" | "th";

export interface ProjectItem {
  title: string | Record<Lang, string>;
  year: string;
  desc: string | Record<Lang, string>;
  img: string;
  link: string;
  youtube: string;
  github: string;
}