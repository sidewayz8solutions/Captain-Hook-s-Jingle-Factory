# Captain Hook's Jingle Factory - Development Plan

## Project Overview
Building a modern, Louisiana/Mardi Gras themed website for Captain Hook's Jingle Factory - a pirate-themed jingle production company.

## Tech Stack
- **HTML5**: Semantic markup
- **Tailwind CSS**: Latest version (3.4+) with utility-first styling
- **Modern CSS**: Custom animations, gradients, and effects
- **Vanilla JavaScript**: For interactions and animations
- **Google Fonts**: Pirata One, Cinzel, Crimson Text

## Design Requirements
### Color Palette
- **Primary**: Mardi Gras colors
  - Purple: #7B2CBF, #4C1D95
  - Gold: #FFD700, #F59E0B
  - Green: #10B981
- **Background**: Dark gradient (gray-900 to purple-900)

### Typography
- **Headings**: Pirata One (pirate theme)
- **Subheadings**: Cinzel (elegant serif)
- **Body**: Crimson Text (readable serif)

## Site Structure

### 1. Navigation
- Fixed top navigation with scroll effects
- Logo with anchor icon
- Desktop menu with hover effects
- Mobile hamburger menu
- Gradient underline animations

### 2. Hero Section
- Captain Hook mascot (centered)
- Floating gold hooks (animated)
- Gradient text effects
- Particle background effects
- Two CTA buttons with hover animations
- Fade-in animations on load

### 3. Services Section
- Three service cards:
  - Lightning Fast Creation
  - Premium Production
  - Global Reach
- Gradient borders and hover effects
- Icons and feature lists

### 4. Treasure Gallery (Audio Section)
- Audio players with soundwave visualizations
- Mardi Gras colored soundwaves
- Play buttons with gradient effects
- Play count statistics

### 5. About Section
- Legend story
- Stats grid (4 metrics)
- Achievement cards
- Gradient backgrounds

### 6. Contact Section
- Contact form with styled inputs
- Contact information cards
- Free consultation CTA
- Message in a bottle theme

### 7. Footer
- Company info with logo
- Quick navigation links
- Services list
- Newsletter signup
- Social media links
- Mardi Gras decorative elements

### 8. Interactive Elements
- Back to top button
- Scroll animations
- Hover effects on all interactive elements
- Smooth transitions

## Implementation Steps

### Step 1: HTML Structure
- Set up semantic HTML5 structure
- Add all sections in order
- Include proper meta tags and viewport settings

### Step 2: Tailwind CSS Setup
- Link to latest Tailwind CDN
- Configure custom colors via CSS variables
- Set up responsive breakpoints

### Step 3: Custom CSS
- Add Google Fonts
- Create custom animations (float, swing, shimmer, wave)
- Style gradients and effects
- Implement particle effects

### Step 4: Hero Section
- Add Captain Hook image
- Implement floating hooks animation
- Create gradient backgrounds
- Add fade-in animations

### Step 5: Components
- Build service cards
- Create audio players with soundwaves
- Style contact form
- Implement mobile menu

### Step 6: JavaScript Functionality
- Scroll effects for navigation
- Mobile menu toggle
- Smooth scroll to sections
- Back to top functionality
- Intersection Observer for animations

### Step 7: Optimization
- Ensure responsive design
- Test all interactions
- Optimize animations for performance
- Verify accessibility

## Key Features
- **Responsive Design**: Mobile-first approach
- **Accessibility**: High contrast, semantic HTML
- **Performance**: Optimized animations, lazy loading
- **Modern Effects**: Gradients, glassmorphism, particles
- **Louisiana Theme**: Mardi Gras colors throughout

## File Structure
```
captainhooks-jingle-factory/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS and animations
├── script.js           # JavaScript interactions
├── CLAUDE.md          # This development plan
└── public/            # Images and assets
    ├── chook.PNG      # Captain Hook mascot
    └── hook.png       # Hook decorations
```

## Development Notes
- Using CDN for Tailwind CSS (no build process needed)
- All animations use CSS for performance
- JavaScript is minimal and progressive enhancement
- Mobile-first responsive design approach
- Focus on visual impact with smooth interactions
