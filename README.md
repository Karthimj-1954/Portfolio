# KJ NEXUS — Karthik Mohan J Developer Portfolio

A production-quality developer portfolio website built for **Karthik Mohan J (KJ NEXUS)**, featuring the premium black-and-orange visual redesign (`#050505` and `#FF5A1F`), an interactive cursor-tracking 3D character hero with canvas rendering, modular architecture, unified MetricFit flagship ecosystem (formerly KAFitHub), and verified engineering experience.

---

## 🚀 Live Profiles & Quick Links
- **GitHub Profile**: [https://github.com/Karthimj-1954](https://github.com/Karthimj-1954)
- **LinkedIn Profile**: [https://www.linkedin.com/in/karthikmohanj1954/](https://www.linkedin.com/in/karthikmohanj1954/)
- **Contact Email**: `karthikmohanj@gmail.com`
- **Resume Assets**: [resume.pdf](resume.pdf) / [resume.html](resume.html)
- **Local Preview**: Open `index.html` directly in any modern browser or run `python -m http.server 5050`

---

## 🎨 Design System & Visual Tokens
- **Primary Background**: `#050505` (Deep Black)
- **Secondary Background**: `#0B0B0B`
- **Card Surfaces**: `#111111`
- **Elevated Surfaces**: `#171717`
- **Primary Highlight**: `#FF5A1F` (Vivid Neon Orange)
- **Secondary Highlight**: `#FF7A24`
- **Typography**: Inter (modern geometric sans-serif) & JetBrains Mono (monospace)
- **HUD Micro-Annotations**: Coordinate tags (`LAT 8.5241° N`), glowing circular character ring, and floating code snippets
- **Responsiveness**: Fully responsive across Desktop, Tablet, and Mobile with zero horizontal overflow

---

## 🎭 Cursor-Tracking 3D Character Hero Architecture
The hero section features a canvas-rendered cursor-tracking character based on directional frame extraction:
1. **Asset Pipeline**:
   - `public/character.png`: High-resolution frontal 3D character portrait.
   - `public/frames/center.webp`: Neutral center pose for direct eye contact.
   - `scripts/extract-character-frames.py`: Repeatable Python/OpenCV script that opens `public/character.mp4`, inspects video metadata (FPS, dimensions, frame count), and extracts directional WebP frames into `public/frames/` with `manifest.json`.
2. **Canvas Rendering Logic (`app.js`)**:
   - Preloads directional WebP frames and neutral pose.
   - Uses `requestAnimationFrame` with high-DPI `devicePixelRatio` scaling.
   - Calculates pointer angle via `Math.atan2(dy, dx)` relative to container center.
   - Applies shortest-path angular interpolation `lerpAngle` and time-based delta damping (~0.26 response factor).
   - Configurable center dead zone (~14% screen radius): when cursor is near the face, direct eye contact with `center.webp` is engaged.
   - Renders exactly one fully opaque frame per frame without alpha-blend ghosting or CSS 3D skewing.
   - Automatic fallback: when directional frames are awaiting video generation, dynamically reacts with subtle eye-level depth and ambient rim lighting.
   - Graceful tab visibility handling (stops RAF loop when tab is hidden).

### Extracting Directional Frames from Video
When a continuous 360° head-turn video is generated (sequence: Center → Up → Upper-right → Right → Lower-right → Down → Lower-left → Left → Upper-left → Center):
```bash
# Place the video at public/character.mp4 and run:
python scripts/extract-character-frames.py --video public/character.mp4 --output public/frames --target-frames 64
```

---

## 📂 File Architecture
```
Portfolio/
├── index.html                      # Redesigned semantic black-and-orange portfolio
├── styles.css                      # Production CSS tokens, animations, responsive grid
├── data.js                         # Centralized verified data (bio, services, skills, projects)
├── app.js                          # Typing effect, CursorTrackingCharacter, filters, modal
├── resume.html                     # Printable, downloadable resume page
├── resume.pdf                      # Verified downloadable resume PDF
├── Karthik_Mohan_J_Resume.pdf      # Verified resume asset
├── public/
│   ├── character.png               # High-res 3D character portrait
│   ├── character_neutral.webp      # Optimized neutral WebP portrait
│   └── frames/
│       ├── center.webp             # Direct eye-contact neutral frame
│       └── manifest.json           # Frame metadata manifest
├── scripts/
│   └── extract-character-frames.py # OpenCV directional frame extraction tool
└── README.md                       # Project documentation
```

---

## ✨ Sections Implemented
1. **Sticky Header (`KJ NEXUS`)**: Active scroll-spy, desktop nav, "Let's Talk" CTA, and responsive mobile drawer.
2. **Hero Section**: Eyebrow `< hello, I'm />`, uppercase split name typography (`KARTHIK MOHAN J`), dynamic typing role, "View My Work" / "Download CV" buttons, verified social links, and 3D character stage with glowing orange ring and metrics.
3. **About Me**: "Design. Code. Solve. Repeat." with 4 compact cards: *Pixel Perfect*, *Clean Code*, *Fast Performance*, *User Focused*.
4. **Services**: 4 desktop service cards: *UI/UX Implementation*, *Frontend Development*, *Full-Stack Applications*, *API Integration & Performance*.
5. **My Tech Stack**: Modern icon strip plus 4 categorized technical capabilities.
6. **Featured Projects Showcase**:
   - **MetricFit (formerly KAFitHub)**: Flagship full-stack fitness management ecosystem (Next.js 16 Web Portal, Expo SDK 57 React Native Mobile App, Express.js 5 REST API, MongoDB Atlas, Cloudinary) with comprehensive 3-layer architecture modal and implemented membership pricing engine.
   - **Sports Finder Hub**: Location-aware player discovery with React Leaflet & Firebase (Live on Vercel).
   - **CNC Machine Anomaly Detection (IIoT)**: MTConnect 94,476 sensor record predictive maintenance with Gradient Boosting & Random Forest.
   - **KasaSync**, **Note-Flow**, **Smart RGB Temperature Monitor**, **Gully Cricket ScoreBoard**.
7. **Professional Experience**: Verified roles at Hexvault (Frontend Developer Intern & Team Lead) and Unified Mentor.
8. **Academics**: B.Tech in Electrical and Computer Engineering at Mar Baselios College of Engineering and Technology (KTU), 2022–2026.
9. **Contact Section**: Accessible contact form with client validation, feedback states, mailto launcher, and verified contact cards (copyable email, location, GitHub, LinkedIn).
10. **Custom Cursor**: Trailing orange ring and center dot with hover expansion (disabled on touch/reduced-motion).
