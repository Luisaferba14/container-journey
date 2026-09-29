# BOX 917 — One Container. Forty-Seven Days. One Global System.

A desktop-first, scroll-driven interactive documentary tracing fictional container **KEDU 240917 4** carrying 12,000 pairs of running shoes across 47 days and 15,870 km: from a factory in Bình Dương, Vietnam to a distribution centre in Saint-Quentin-Fallavier near Lyon, France.

## Features
- **Persistent Telemetry & Map:** Real-time MapLibre GL WebGL vector map showing the global trade corridor, waypoints, chokepoints (Malacca, Suez, Bab el-Mandeb), and local terminals (CMIT, Eurofos).
- **Dual Plan vs Actual Day Scrubber:** 44 days planned vs 47 days actual, decomposed into +0.5d documents, +1.5d weather/berth, and +1.0d customs/rail rebooking.
- **Evidence Ledger & Standardized Badges:** Every content object is labelled as *Verified fact*, *Fictional*, *Assumption*, or *Illustrative calculation*.
- **Interactive Mini-Experiences:**
  - 2.5D Container Passport with openable doors and SOLAS VGM breakdown.
  - Document Wallet with 13 shipping instruments and "Spot the Mismatch" audit tool.
  - Actor Constellation with 4 responsibility lenses (Physical Custody, Legal, Information, Cost).
  - Vertical animated Cost Stack (€6,850) & "What delay costs" analysis.
  - Sustainability Lens with EEA modal intensity comparison & Fos-to-Lyon modal shift toggle.
  - Playable 6-station Port Terminal loop.
  - MV *Portalis* Bay-Row-Tier vessel stowage selector.
- **Audio Ambience:** Pure Web Audio API synthesizers for ship engine rumble, twist-lock clanks, and scanner beeps (muted by default).

## Local Development

```bash
# Install dependencies
bun install   # or npm install

# Start development server
bun run dev   # or npm run dev

# Build production bundle
bun run build # or npm run build
```

## Free Deployment on GitHub Pages

This project is pre-configured with automated GitHub Actions deployment.

1. Create a new repository on [GitHub](https://github.com/new).
2. Push this project to GitHub:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages**
   - Under **Build and deployment** → **Source**, select **GitHub Actions**
4. The deployment will trigger automatically and your interactive documentary will be live at:
   `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`
