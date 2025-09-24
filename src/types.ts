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
  | "blog-post"
  | "research"
  | "case-studies"
  | "investors"
  | "contact"
  | "demo";

export type CTA = {
  label: string;
  onClick: () => void;
};
