# Landing page hero photo

The Welcome chapter's hero visual is a real business-handshake photograph,
per the Landing Page V1 brief:

- Professional business handshake (already clasped, not reaching)
- Female hand from the left, client hand from the right
- Modern business attire, realistic skin tones
- Luxury commercial photography style — bright premium office,
  floor-to-ceiling windows, soft lavender atmosphere, natural light,
  blurred city skyline in the background
- Explicitly **not** fantasy/energy/mystical styling

Drop the licensed photo in as:

```
public/hero/handshake.jpg
```

`HandshakeVisual` (`src/components/ui/HandshakeVisual.tsx`) picks it up
automatically and layers the glow/particle "connection point" animation on
top of it. Until that file exists, the component renders nothing at all —
no placeholder box, icon, or "coming soon" text. Visitors just see the
LuxuryLight background behind it, same as the rest of the page.

I (Claude) can't generate or source this photo myself — no image-generation
or stock-photo tool is available in this environment. This needs to be a
licensed photo you supply (stock library, commissioned shoot, or an
AI image tool you run yourself).
