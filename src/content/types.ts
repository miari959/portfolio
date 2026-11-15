export type ExternalLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  setting: string;
  period: string;
  stack: string[];
  links: ExternalLink[];
};