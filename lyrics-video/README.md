# Ebbanja Ly'Omukwano — Lyrics Video Project

## Deliverable

A dynamic, text-free mood video synced to the full 7:59 audio track.

- **Watch/download:** https://share.descript.com/view/JwcllyLbYYr
- 1920x1080, 30fps, ~479.2s (matches the source audio)
- No on-screen lyric text (removed per request) — visuals only, synced to the song's emotional arc

## Visual approach

Ten mood-matched, continuously-animated color/light sections (not stills) crossfaded together:

| Section | Time | Mood |
|---|---|---|
| Intro + Verse 1 | 0:00–1:04 | Dark navy/charcoal — somber, hospital-ward feel |
| Pre-Chorus + Chorus 1 | 1:04–1:36 | Warm gold burst — uplifting |
| Verse 2 | 1:36–2:15 | Cooler reflective tone with warm accents |
| Pre-Chorus 2 | 2:15–2:23 | Building transition, dark to warm |
| Bridge (a cappella) | 2:23–2:40 | Intimate amber candlelight flicker |
| Final Chorus | 2:40–3:10 | Bright joyful spiral, key-lift energy |
| Extended outro / vamp | 3:10–7:59 | Sustained warm gold/rose light, varied slowly across three sub-sections to avoid monotony over the long instrumental/ad-lib outro |

Vocal section timings were anchored against Descript's auto-transcription of the actual sung vocals (word-level timestamps matched the real lyrics closely for the first ~2:48; the remaining ~5 minutes is an extended instrumental/choir vamp typical of a live gospel outro).

## Why generated visuals instead of stock photos/video

Two production paths were attempted first and both hit hard blocks:

1. **Descript AI agent** (would have sourced real stock photo/video b-roll — hospital, choir, worship — with camera-style Ken Burns motion and precise AI-driven placement): ran out of the account's AI credit allowance partway through the first pass (mid stock-media import, before any captions were added). A retry with a smaller scope also failed immediately — the account was fully out of credits. Upgrade link (if picking this path back up later): the checkout URL returned by Descript's `publish`/`prompt_project_agent` tools is user-specific and time-limited, so re-run the request to get a fresh one.
2. **Downloading free stock footage directly** (e.g. Pexels) to composite locally with ffmpeg: blocked by this environment's network egress policy (only a small allowlist of hosts, e.g. package registries, is reachable; general stock-media sites returned 403 at the proxy).

Given both real-photography routes were unavailable, the video was built entirely locally with `ffmpeg` (no network, no AI credits): animated gradient/light compositions (`gradients` + `blend` + `noise` + `eq` + `vignette` filters) per section, `xfade`-crossfaded together, then upscaled and muxed with the original audio.

## Notes for revisiting this project

- The Descript project (audio + 15 imported-but-unused stock clips from the first attempt + the final delivered video) is at `https://web.descript.com/5445d014-2327-48e9-9947-b7aa068746f5`.
- If Descript AI credits are topped up later, the 15 already-imported stock clips (hospital corridor, worship hands raised, gospel choir, candle flame, handshake, etc.) can be reused via `prompt_project_agent` to rebuild with real photography instead of generated gradients.
- Local build pipeline: a Python script generates the 10 animated segments via `ffmpeg lavfi` sources, crossfades them, and muxes the result with the source audio. Key gotcha: ffmpeg's `eq` filter shifts hue toward magenta/purple on the `gradients` filter's default RGB output unless the stream is explicitly forced to an RGB pixel format (`format=gbrp`) immediately before `eq`.
