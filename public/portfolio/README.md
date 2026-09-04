# Portfolio case studies

The Portfolio chapter is organized by category (Hospitality & Clubs, Solar &
Renewable Energy, Education, Professional Services), not by fabricated
project names. Each category starts with an empty `caseStudies` array in
`src/lib/content.ts` (`portfolio` export).

To add a real, approved case study, push an entry onto the relevant
category's `caseStudies` array:

```ts
caseStudies: [
  {
    title: "Client or project name",
    summary: "One sentence on what was delivered.",
    servicesProvided: "Website Management | SEO",
    image: "/portfolio/example-slug.png", // optional
  },
],
```

Drop any referenced screenshot/photo into this folder. `Card06Portfolio`
automatically switches from the "Case studies coming soon" badge to listing
real entries once a category's array is non-empty — no other code changes
needed.
