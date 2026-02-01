# Run Swift Studio v3 (RSS_v2.3)

## Overview
Run Swift Studio v3 is a high-performance portfolio website with blog and news sections, built with Astro v5, TypeScript, and React 19. The site features multilingual support and content collections for dynamic content management.

## Features
- 🚀 **High Performance**: Static Site Generation (SSG) with Astro's island architecture
- 🌍 **Multilingual Support**: Russian, English, and German localization
- 📝 **Content Collections**: Blog and news sections with Markdown content
- 🎨 **Modern Styling**: Tailwind CSS v4 with custom theme system
- 🌙 **Dark/Light Theme**: Automatic theme detection with manual override
- 📱 **Responsive Design**: Mobile-first approach with adaptive layouts

## Tech Stack
- **Framework**: [Astro v5](https://astro.build/)
- **Languages**: TypeScript, React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
RSS_v2.3/
├── src/
│   ├── components/          # Reusable components
│   │   ├── interactive/     # Interactive React components
│   │   ├── landing/         # Landing page components
│   │   └── sections/        # Section components
│   ├── content/            # Content collections (blog, news)
│   ├── data/               # Static data
│   ├── i18n/               # Translation dictionaries
│   ├── layouts/            # Page layouts
│   ├── pages/[lang]/       # Localized routes
│   └── styles/             # Global styles
├── public/                 # Static assets
└── source/                 # Legacy versions and auxiliary files
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd RSS_v2.3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:4321`.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production site
- `npm run preview` - Preview the production build locally
- `npm run astro` - Run Astro CLI commands

## Internationalization (i18n)

The site supports three languages:
- Russian (default)
- English
- German

Routes are structured as `/[lang]/` where lang can be `ru`, `en`, or `de`.

## Content Collections

The site uses Astro's content collections for managing blog posts and news:

### Blog Posts
Schema includes:
- `title` (string)
- `description` (string)
- `pubDate` (date)
- `image` (string, optional)
- `tags` (array of strings)
- `author` (string, optional)
- `readTime` (string, optional)

### News Articles
Schema includes:
- `title` (string)
- `description` (string)
- `pubDate` (date)
- `image` (string, optional)
- `tags` (array of strings)
- `source` (string, optional)
- `category` (string, optional)

## Styling

The project uses Tailwind CSS v4 with a custom theme system defined in `src/styles/global.css`. The theme includes:

- **Color System**: OKLCH colors for both dark and light themes
- **Typography**: Inter (sans-serif) and JetBrains Mono (monospace) fonts
- **Border Radius**: Custom radius sizes (sm, md, lg, xl)
- **Animations**: Fade-in and slide-up animations

## Components Architecture

### Astro Components
- Used for static content and layouts
- Files with `.astro` extension

### React Components
- Used only for complex interactivity
- Files with `.jsx` or `.tsx` extension
- Implemented with Astro's island architecture (`client:*` directives)

### Island Architecture
- `client:visible` directive for heavy components
- `client:only="react"` for components requiring full hydration
- Minimizes main thread work

## Deployment

The site is configured for static site generation and can be deployed to platforms like Netlify, Vercel, or GitHub Pages.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.