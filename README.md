# Eventora — Responsive Event Management Website

A polished event discovery and registration prototype built with **React, Vite, Three.js, React Three Fiber, Drei, HTML5 and CSS3**.

## Features

- Responsive landing page with custom visual design and animated Three.js hero scene.
- Featured event spotlight and event cards with images, dates, venues, categories and prices.
- Search events by title, category, venue or description.
- Category filters and show-all interaction.
- Event detail modal with schedule, date, venue and registration call-to-action.
- Registration form with JavaScript validation for name, email, Indian mobile number and event selection.
- Success confirmation and unique registration reference stored in browser Local Storage.
- Dark/light mode preference persisted in Local Storage.
- Keyboard Escape support for dialogs and accessible labels on interactive controls.
- Mobile, tablet and desktop layouts; reduced-motion preference support.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

1. Extract the ZIP.
2. Open a terminal in the extracted `event-management-prototype` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in the `dist/` folder.

## Deploy

### Vercel
1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.

### Netlify
1. Import the GitHub repository in Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### GitHub Pages
For GitHub Pages, configure Vite's `base` option to match the repository path in `vite.config.js`, then build and publish the `dist` folder (or use a GitHub Actions Pages workflow).

## Git and GitHub submission

```bash
git init
git add .
git commit -m "Build Eventora event management prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## Project structure

```text
event-management-prototype/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## Prototype notes

- Event content is sample data in `src/App.jsx`; update the `events` array to customize the listings.
- Registration records are saved in the browser under the Local Storage key `eventora_registrations`.
- Theme preference is saved under `eventora_theme`.
- This is a front-end prototype: registrations are stored locally in the visitor's browser. A production ticketing service would require a backend/API, database, authentication and payment integration.
- Event photos are loaded from Unsplash, and Google Fonts are loaded online, so those assets require an internet connection.

## Technology

React 18 · Vite · Three.js · React Three Fiber · Drei · Lucide React · CSS3
