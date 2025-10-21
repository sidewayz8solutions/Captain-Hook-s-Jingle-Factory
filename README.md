# Captain Hook's Jingle Factory - Setup Instructions

## Image Assets Required

You need to add the following images to the `/public` folder:

1. **chook.PNG** - The Captain Hook mascot image (shown in your screenshots)
   - This is the main pirate captain character
   - Should be a transparent PNG
   - Place in: `/public/chook.PNG`

2. **hook.png** - The golden hook decoration images
   - These are the floating hook elements
   - Should be golden/brass colored hooks
   - Place in: `/public/hook.png`

## How to Run the Website

1. **Open the website:**
   - Simply double-click on `index.html` to open in your browser
   - Or use a local server like Live Server in VS Code

2. **Add your images:**
   - Place your Captain Hook mascot image as `chook.PNG` in the public folder
   - Place your hook decoration image as `hook.png` in the public folder

## Features Implemented

✅ **Modern Louisiana/Mardi Gras Theme**

- Purple (#7B2CBF), Gold (#FFD700), and Green (#10B981) color scheme
- Gradient effects throughout

✅ **Pirate-Themed Typography**

- Pirata One font for headings
- Cinzel for subheadings
- Crimson Text for body text

✅ **Interactive Elements**

- Floating animated hooks in hero section
- Animated soundwave visualizers in Mardi Gras colors
- Smooth scroll navigation
- Mobile responsive menu
- Back to top button
- Scroll animations on all sections
- Hover effects on all interactive elements

✅ **Sections**

- Hero with Captain Hook mascot and floating hooks
- Services (3 cards with icons)
- Treasure Gallery (audio players with soundwaves)
- About section with stats
- Contact form with "Message in a Bottle" theme
- Footer with newsletter signup

✅ **Advanced Features**

- Loading overlay with anchor animation
- Parallax scrolling effects
- Particle background animation
- Gradient text effects
- Glassmorphism effects
- Custom scrollbar
- Easter egg (Konami code)

## Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS 3.4+** - Latest utility-first CSS framework
- **Custom CSS** - Advanced animations and effects
- **Vanilla JavaScript** - Smooth interactions
- **Google Fonts** - Custom typography

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Customization

You can customize colors by editing the Tailwind config in the HTML file or the CSS variables in `styles.css`.

## Support

For any issues or questions about the website, refer to the `CLAUDE.md` file for the complete development documentation.

## GitHub Pages Deployment (Backup Solution)

Since Vercel may experience downtime, you can deploy your website using GitHub Pages:

1. Ensure all your files are committed and pushed to your GitHub repository:
   ```bash
   git add .
   git commit -m "Update website files"
   git push origin main
   ```

2. Go to your GitHub repository settings:
   - Visit: https://github.com/sidewayz8solutions/Captain-Hook-s-Jingle-Factory/settings

3. Scroll down to the "Pages" section and configure:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

4. Click "Save" to enable GitHub Pages

5. Your website will be available at:
   https://sidewayz8solutions.github.io/Captain-Hook-s-Jingle-Factory/

6. The custom domain (captainhooksjinglefactory.com) should automatically work
   since you already have the CNAME file in your repository.

## Local Development

To run the website locally for testing:

```bash
npm run dev
```

Then open your browser to http://localhost:3000

---

⚓ **Built with passion, precision, and a touch of pirate magic!**
