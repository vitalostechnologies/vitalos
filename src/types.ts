export type Page =
  | "home"
  | "solutions"
  | "about"
  | "history"
  | "technology"
  | "team"
  | "careers"
  | "culture"
  | "specialty"
  | "resources"
  | "blog"
  | "research"
  | "case-studies"
  | "contact";

export type CTA = {
  label: string;
  onClick: () => void;
};
