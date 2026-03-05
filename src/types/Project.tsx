export type Lang = "en" | "th";

export interface ProjectItem {
  head: (string | Record<Lang, string>)[];
  title: string | Record<Lang, string>;
  year: string | Record<Lang, string>;
  desc: (string | Record<Lang, string>)[];
  img: string;
  link: string;
  youtube: string;
  github: string;
}