// Single source of truth for all site copy and structured content.
// Keep components presentational — data lives here so chapters stay easy to edit.

export type Chapter = {
  id: string;
  index: string; // "01".."08"
  label: string; // short nav label shown on the side rail
};

export const chapters: Chapter[] = [
  { id: "welcome", index: "01", label: "Welcome" },
  { id: "meet-nina", index: "02", label: "Meet Nina" },
  { id: "services", index: "03", label: "Services" },
  { id: "experience", index: "04", label: "Experience" },
  { id: "clients", index: "05", label: "Clients" },
  { id: "portfolio", index: "06", label: "Portfolio" },
  { id: "stories", index: "07", label: "Success Stories" },
  { id: "contact", index: "08", label: "Let's Build Together" },
];

export const brand = {
  name: "Haven Vertex",
  tagline: "People | Systems | Possibilities",
  footerLine: "A Brighter Tomorrow Together.",
  calendlyUrl: "https://calendly.com/haven-vertex/discovery-call",
  contactEmail: "hello@havenvertex.com",
};

export const services = [
  {
    icon: "laptop",
    title: "Website Management",
    copy: "Keep your website updated, secure and performing at its best.",
  },
  {
    icon: "search",
    title: "SEO & Visibility",
    copy: "Be found. Be relevant. Be ahead of your competitors.",
  },
  {
    icon: "gallery",
    title: "Content Support",
    copy: "Content that connects and converts.",
  },
  {
    icon: "heart",
    title: "Virtual Assistance",
    copy: "Reliable support for your daily operations.",
  },
  {
    icon: "gears",
    title: "Systems & Automation",
    copy: "Simpler processes for a more productive business.",
  },
  {
    icon: "chart",
    title: "Digital Operations",
    copy: "Everything working together for sustainable growth.",
  },
];

// The three real, verified figures behind Haven Vertex — reused everywhere a
// stat appears (Experience, Meet Nina, Success Stories) so the numbers never
// drift out of sync.
export const keyStats = {
  yearsExperience: "12+",
  projectsSupported: "100+",
  clientReach: "Australian & International",
};

export const experienceStats = [
  { value: keyStats.yearsExperience, label: "Years Experience" },
  { value: keyStats.projectsSupported, label: "Projects Supported" },
];

export const experienceFocusAreas = [
  "Website Management",
  "SEO",
  "Content Support",
  "Digital Operations",
];

// Portfolio categories Haven Vertex works across — used by both the
// Experience diagram and the Portfolio chapter so the two stay consistent.
export const portfolioCategories = [
  {
    slug: "hospitality-clubs",
    name: "Hospitality & Clubs",
    description: "Websites and digital support for clubs, restaurants and hospitality venues.",
    coord: { x: "18%", y: "58%" },
  },
  {
    slug: "solar-renewable-energy",
    name: "Solar & Renewable Energy",
    description: "SEO and content for solar and renewable energy providers.",
    coord: { x: "50%", y: "78%" },
  },
  {
    slug: "education",
    name: "Education",
    description: "Website management and systems for education and training providers.",
    coord: { x: "82%", y: "40%" },
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    description: "Digital operations and content support for professional service firms.",
    coord: { x: "60%", y: "22%" },
  },
];

// Portfolio is deliberately structured around categories rather than
// fabricated project names — each entry's `caseStudies` array starts empty
// and is meant to be filled in with real, approved client work as it
// becomes available. See public/portfolio/README.md.
export const portfolio = portfolioCategories.map((category) => ({
  ...category,
  caseStudies: [] as Array<{
    title: string;
    summary: string;
    servicesProvided: string;
    image?: string;
  }>,
}));

// Real, named clients Haven Vertex has worked with. Logo files are optional —
// see ClientLogo / public/clients/README.md — the site falls back to a clean
// typographic wordmark until real logo assets are supplied.
export const clients = [
  { name: "Bexley RSL", slug: "bexley-rsl" },
  { name: "Manly Leagues", slug: "manly-leagues" },
  { name: "The Chatswood", slug: "the-chatswood" },
  { name: "ILG", slug: "ilg" },
  { name: "Satellite Solar", slug: "satellite-solar" },
  { name: "TT New Energy", slug: "tt-new-energy" },
  { name: "Learning Made Simple", slug: "learning-made-simple" },
];

// Success Stories is intentionally content-empty rather than fabricated.
// videoTestimonials / writtenTestimonials start blank and are meant to be
// populated with real client media as it's collected — see the card itself
// for how empty state is presented.
export const videoTestimonials: Array<{
  clientName: string;
  role: string;
  videoUrl: string;
  posterImage?: string;
}> = [];

export const writtenTestimonials: Array<{
  quote: string;
  name: string;
  company: string;
}> = [];

export const trustSignals = [
  { value: keyStats.yearsExperience, label: "Years Experience" },
  { value: keyStats.projectsSupported, label: "Projects Supported" },
  { value: keyStats.clientReach, label: "Client Reach" },
];
