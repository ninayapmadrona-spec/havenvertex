# Client logos

Drop real client logo files here, named to match each client's `slug` in
`src/lib/content.ts` (`clients` array):

```
public/clients/bexley-rsl.png
public/clients/manly-leagues.png
public/clients/the-chatswood.png
public/clients/ilg.png
public/clients/satellite-solar.png
public/clients/tt-new-energy.png
public/clients/learning-made-simple.png
```

`ClientLogo` (`src/components/ui/ClientLogo.tsx`) picks each one up
automatically — no code changes needed. Until a given client's file exists,
that tile falls back to a clean typographic wordmark of their name, so the
grid never shows a broken image.

**Important:** only add a client's logo here with their permission to
display it — these are real, named businesses, and using another company's
mark implies their endorsement.

Recommended format: PNG with a transparent background, roughly 400×160px
(landscape), consistent visual weight across all logos so the grayscale grid
reads evenly.
