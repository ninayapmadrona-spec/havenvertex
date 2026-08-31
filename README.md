# Haven Vertex Studio

Official website of Haven Vertex Studio — a virtual operations studio for founders. Connect. Automate. Elevate.

A single-page site with a dark, purple/violet brand palette and scrollytelling
animation: scroll-triggered reveals throughout, and a pinned four-step
"How We Work" timeline that advances (Connect → Design → Automate → Elevate)
as the visitor scrolls.

## Structure

```
index.html            Markup for the whole page
assets/css/styles.css  Styling, tokens, animations
assets/js/main.js      Nav behavior, scroll reveal, pinned-timeline logic
assets/img/            Logo mark + full lockup
```

## Running locally

No build step — it's static HTML/CSS/JS. Serve the folder with any static
server, e.g.:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080`.
