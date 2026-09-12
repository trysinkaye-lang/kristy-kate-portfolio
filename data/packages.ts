export const currencyMeta = {
  PHP: { label: "Philippine Peso" },
  USD: { label: "US Dollar" },
  EUR: { label: "Euro" },
  GBP: { label: "British Pound" },
  CAD: { label: "Canadian Dollar" },
  AUD: { label: "Australian Dollar" },
  SGD: { label: "Singapore Dollar" },
  JPY: { label: "Japanese Yen" },
  NZD: { label: "New Zealand Dollar" },
  CHF: { label: "Swiss Franc" },
  INR: { label: "Indian Rupee" },
  KRW: { label: "South Korean Won" },
  MYR: { label: "Malaysian Ringgit" },
  THB: { label: "Thai Baht" },
} as const;

export type CurrencyCode = keyof typeof currencyMeta;

export type PackageDefinition = {
  name: string;
  priceMin: number;
  priceMax?: number;
  description: string;
  note?: string;
  features: string[];
};

export const packages: PackageDefinition[] = [
  {
    name: "Basic",
    priceMin: 15000,
    description: "A focused website for individuals, professionals, and small brands that need a clear, credible online presence.",
    features: [
      "Up to 5 pages",
      "Responsive desktop, tablet and mobile design",
      "Home, About, Expertise / Services and Contact",
      "Project, product or publication showcase",
      "Basic contact form",
      "Essential SEO setup",
      "Basic performance optimization",
      "Deployment setup",
      "1 revision round",
    ],
  },
  {
    name: "Professional",
    priceMin: 25000,
    note: "Most flexible starting point",
    description: "For established professionals, authors, consultants and brands that need stronger presentation, richer content and polished interaction.",
    features: [
      "Up to 7–8 pages",
      "Fully custom responsive design",
      "Expanded project, product or publication showcase",
      "Up to 5 books / featured works",
      "Smooth animations and interactions",
      "Contact form and social integrations",
      "Google Analytics setup",
      "SEO basics and image optimization",
      "Deployment and launch support",
      "2 revision rounds",
    ],
  },
  {
    name: "Premium",
    priceMin: 35000,
    priceMax: 40000,
    description: "A fully custom experience for clients who need richer content, advanced interaction, individual content pages and easier long-term management.",
    features: [
      "Full custom website design and development",
      "Advanced animations and micro-interactions",
      "Individual book, project or content pages",
      "CMS / content management setup",
      "Advanced SEO configuration",
      "Analytics and Search Console setup",
      "Premium UI/UX refinement",
      "Advanced performance optimization",
      "Extended launch support",
      "3 revision rounds",
    ],
  },
];

export function isCurrencyCode(value: string): value is CurrencyCode {
  return Object.hasOwn(currencyMeta, value);
}
