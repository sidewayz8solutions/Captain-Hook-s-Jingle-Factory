# Captain Hook's Jingle Factory — AI Coding Agent Instructions

## Project Overview
This is a static, Mardi Gras-themed website for a pirate jingle company. It uses semantic HTML5, Tailwind CSS (via CDN), custom CSS, and vanilla JavaScript. All assets are in the `public/` folder. No build tools or frameworks are used.

## Key Files & Structure
- `index.html`: Main entry point, includes all sections in order.
- `styles.css`: Custom CSS, gradients, animations, and overrides for Tailwind.
- `script.js` / `script_fixed.js`: JavaScript for navigation, scroll, and interactive effects.
- `public/`: Contains mascot (`chook.PNG`) and hook images (`hook.png`).
- `CLAUDE.md`: Full development plan and design requirements.

## Essential Patterns & Conventions
- **Tailwind via CDN**: No config file; custom colors via CSS variables in `styles.css`.
- **Fonts**: Use Google Fonts (Pirata One, Cinzel, Crimson Text) as specified in HTML/CSS.
- **Section Order**: Navigation, Hero, Services, Treasure Gallery, About, Contact, Footer.
- **Animations**: CSS-based for performance; JavaScript only for progressive enhancement (scroll, menu, back-to-top).
- **Responsive Design**: Mobile-first, test with browser tools.
- **Accessibility**: Use semantic HTML, high contrast, and ARIA where needed.

## Developer Workflow
- **Run Locally**: Open `index.html` directly or use a local server (e.g., VS Code Live Server).
- **Add Images**: Place `chook.PNG` and `hook.png` in `public/`.
- **Edit Styles**: Change colors in CSS variables in `styles.css`.
- **Debugging**: Use browser dev tools; no build or test scripts.

## Integration Points
- No external APIs or backend; all logic is client-side.
- All dependencies are loaded via CDN (see HTML head).

## Examples
- To add a new section, follow semantic HTML5 and Tailwind utility patterns as in existing sections.
- For new animations, prefer CSS keyframes in `styles.css`.
- For new images, add to `public/` and reference with relative paths.

## References
- See `CLAUDE.md` for design rationale and implementation steps.
- See `README.md` for setup and asset requirements.

---
For questions or unclear conventions, review `CLAUDE.md` or ask for clarification.
