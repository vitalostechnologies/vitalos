export type Page =
  | "home"
  | "solutions"
  | "about"
  | "history"
  | "technology"
  | "careers"
  | "careers-success"
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
