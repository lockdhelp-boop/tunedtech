# Work screenshots

`index.html` references these three files by exact name. Drop them here and the
work section renders — no code change needed.

| File | App |
|------|-----|
| `Lockdhomescreen.png`    | LOCKD home screen |
| `Purescanhomescreen.png` | Pure Scan home screen |
| `cleanhomepeptrack.png`  | PepTrack home screen |

Requirements:

- **Transparent background.** These are device-framed renders; the CSS applies a
  `drop-shadow` that follows the PNG's alpha to lift the phone off the page. On a
  white or opaque background you get a white rectangle on a near-black page.
- Any aspect ratio works. The device is capped at `26rem` tall and left-aligned
  with the copy beneath it (see `.case-media` in `styles.css`).
- Full device resolution, PNG. Don't downscale first.

Held back for later, not currently referenced:

- Pure Scan camera/scan shot (angled frame — doesn't sit in a straight grid row)
- PepTrack onboarding screen (raw screenshot, no device frame — mixing framed and
  unframed in one row reads as inconsistent)
