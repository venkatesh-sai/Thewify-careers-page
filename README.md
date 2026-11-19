# TheWiFy Careers

A responsive React + Vite careers-page starter for TheWiFy, styled around the current site's dark navy / electric blue / cyan visual language.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`.

## Project structure

- `index.html` — app entry document and SEO metadata
- `src/main.jsx` — React entry point
- `src/App.jsx` — careers page sections, navigation, roles and application form UI
- `src/styles.css` — responsive design system, animations, transitions and reduced-motion support
- `public/js/interactions.js` — lightweight progressive-enhancement hook

## Before publishing

1. Confirm the current vacancies, titles, locations and experience requirements with your hiring team. The roles in this starter are editable sample content based on publicly surfaced TheWiFy role descriptions; the page itself flags them for verification.
2. Connect the application form's `submit` handler in `src/App.jsx` to your ATS, API endpoint or hiring inbox. It currently demonstrates validation and a confirmation state only; it does not upload CV files or transmit applicant data.
3. Add your approved careers/privacy notice and any benefits or employment policies that apply to each location.
4. Replace social/contact links if your preferred recruitment channels differ.

## Stack

React, Vite, plain CSS, Lucide React icons. No animation library is required; transitions and reveal effects use CSS and IntersectionObserver.
