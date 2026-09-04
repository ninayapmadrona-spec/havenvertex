// Single source of truth for all site copy and structured content.
// Keep components presentational — data lives here so chapters stay easy to edit.

export type Chapter = {
  id: string;
  index: string; // "01".."07"
  label: string; // short nav label shown on the side rail
};

export const chapters: Chapter[] = [
  { id: "welcome", index: "01", label: "Welcome" },
  { id: "meet-nina", index: "02", label: "Meet Nina" },
  { id: "services", index: "03", label: "Services" },
  { id: "experience", index: "04", label: "Experience" },
  { id: "portfolio", index: "05", label: "Portfolio" },
  { id: "stories", index: "06", label: "Success Stories" },
  { id: "contact", index: "07", label: "Let's Build Together" },
];

export const brand = {
  name: "Haven Vertex",
  tagline: "People | Systems | Possibilities",
  footerLine: "A Brighter Tomorrow Together.",
  calendlyUrl: "https://calendly.com/haven-vertex/discovery-call",
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

export const experienceStats = [
  { value: "12+", label: "Years Experience" },
  { value: "100+", label: "Websites & Marketing Projects" },
  { value: "4+", label: "Years With Australian Businesses" },
  { value: "100%", label: "Commitment To Your Success" },
];

export const industries = [
  { name: "Hospitality & Restaurants", coord: { x: "18%", y: "58%" } },
  { name: "Solar & Renewable Energy", coord: { x: "50%", y: "72%" } },
  { name: "Clubs & Community", coord: { x: "82%", y: "40%" } },
  { name: "Coaching & Professional Services", coord: { x: "68%", y: "24%" } },
  { name: "Education", coord: { x: "34%", y: "30%" } },
];

export const portfolio = [
  {
    tag: "Restaurant & Hospitality",
    title: "Good Food Brings People Together",
    services: "Website Management | Content Support",
    theme: "from-[#3a0f52] to-[#22142f]",
  },
  {
    tag: "Solar & Energy",
    title: "Clean Energy, Brighter Tomorrow",
    services: "Website Updates | SEO | Content",
    theme: "from-[#1f2a1f] to-[#173318]",
  },
  {
    tag: "Clubs & Community",
    title: "More Than a Game",
    services: "Website Management | Digital Support",
    theme: "from-[#0f2a3a] to-[#12222f]",
  },
  {
    tag: "Education & Coaching",
    title: "Learning, Refined",
    services: "Website Management | Systems & Automation",
    theme: "from-[#3a1f0f] to-[#2f2012]",
  },
];

export const testimonials = [
  {
    quote:
      "Haven Vertex took our scattered admin and turned it into a system that just works. Our website finally reflects how good the business actually is.",
    name: "Hospitality Owner",
    location: "Melbourne, VIC",
    rating: 5,
  },
  {
    quote:
      "More than a virtual assistant — a genuine partner in how we operate day to day. Response times are excellent and nothing falls through the cracks.",
    name: "Clubs & Community Manager",
    location: "Brisbane, QLD",
    rating: 5,
  },
  {
    quote:
      "Our search visibility and enquiries both lifted within the first quarter. Haven Vertex handles the details so we can focus on the work.",
    name: "Renewable Energy Director",
    location: "Perth, WA",
    rating: 5,
  },
];

export const trustSignals = [
  { value: "5.0", label: "Average Client Rating" },
  { value: "10+", label: "Long-Term Partnerships" },
  { value: "100%", label: "Project Completion Rate" },
];
