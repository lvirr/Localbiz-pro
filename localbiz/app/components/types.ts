export type Template = "modern" | "bold" | "minimal" | "gradient" | "dark";

export interface CardData {
  businessName: string;
  ownerName: string;
  role: string;
  phone: string;
  email: string;
  website: string;
  tagline: string;
  template: Template;
  primaryColor: string;
  accentColor: string;
  logoText: string;
}
