# Run Swift Studio v3 (RSS_v2.3)

## Overview
Run Swift Studio v3 is a high-performance portfolio website with blog and news sections, built with Astro v5, TypeScript, and React 19. The site features multilingual support and content collections for dynamic content management. Includes a specialized WB Audit tool for analyzing Wildberries products.

## Features
- 🚀 **High Performance**: Static Site Generation (SSG) with Astro's island architecture
- 🌍 **Multilingual Support**: Russian, English, and German localization
- 📝 **Content Collections**: Blog and news sections with Markdown content
- 🎨 **Modern Styling**: Tailwind CSS v4 with custom theme system
- 🌙 **Dark/Light Theme**: Automatic theme detection with manual override
- 📱 **Responsive Design**: Mobile-first approach with adaptive layouts
- 🔍 **WB Audit Tool**: Specialized tool for analyzing Wildberries products with n8n integration
- 🧩 **Modular Architecture**: Clean separation of Astro and React components

## Tech Stack
- **Framework**: [Astro v5](https://astro.build/)
- **Languages**: TypeScript, React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Integration**: n8n workflow automation platform

## Project Structure

```
RSS_v2.3/
├── src/
│   ├── components/          # Reusable components
│   │   ├── interactive/     # Interactive React components
│   │   ├── landing/         # Landing page components
│   │   ├── sections/        # Section components
│   │   └── wb-audit/        # WB Audit tool components
│   ├── content/            # Content collections (blog, news)
│   ├── data/               # Static data
│   ├── i18n/               # Translation dictionaries
│   ├── layouts/            # Page layouts
│   ├── pages/[lang]/       # Localized routes
│   │   └── tools/          # Specialized tools
│   │       └── wb-audit.astro # WB Audit tool page
│   ├── config/             # Configuration files
│   │   └── api.ts          # API configuration
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

## WB Audit Tool

The project includes a specialized tool for auditing Wildberries products:

### Features:
- 6-module analysis system (Marketing Analysis, Autonomous Agents, etc.)
- Integration with n8n workflow automation
- Real-time terminal-style progress tracking
- Product data extraction and analysis
- Downloadable reports and strategic recommendations

### Endpoints:
- Parse: `/webhook/wb/parse` (Workflow A)
- Trigger: `/webhook/wb/full-audit` (Workflow B)
- Status: `/webhook/wb-status` (Workflow F)

### Location:
- Page: `src/pages/[lang]/tools/wb-audit.astro`
- Component: `src/components/wb-audit/WBAuditWidget.tsx`
- Navigation: "Кейсы" link in the header

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

## AI Agency Core (_core_remote)

### Overview
The `_core_remote` directory contains the backend infrastructure for the AI Agency Operating System - a sophisticated autonomous agent framework built with CrewAI and FastAPI. This system handles the core business logic for AI-powered auditing, analysis, and reporting.

### Tech Stack
- **Core Framework**: CrewAI for multi-agent systems
- **API Layer**: FastAPI for REST endpoints
- **Containerization**: Docker & docker-compose
- **PDF Generation**: WeasyPrint with Jinja2 templates
- **Data Processing**: PyYAML, JSON, Pandas
- **Security**: Service token authentication
- **LLM Support**: OpenAI GPT, Google Gemini, Groq, DeepSeek, xAI Grok

### Key Components

#### Core Architecture
- **[`main.py`](src/main.py:1)**: Central engine orchestrating agent workflows, including pipeline execution, financial calculations, and post-processing
- **[`api.py`](src/api.py:1)**: FastAPI application handling HTTP requests, background tasks, and webhook callbacks
- **[`state_manager.py`](src/state_manager.py:1)**: Project state management with locking mechanisms and passport data storage
- **[`agent_factory.py`](src/agent_factory.py:1)**: LLM factory with fallback mechanisms and agent configuration loader
- **[`pdf_engine.py`](src/pdf_engine.py:1)**: PDF generation from Markdown with licensing tiers and watermarks

#### Tools
- **[`wb_scraper.py`](src/core/tools/wb_scraper.py:1)**: Wildberries product data scraper with API integration and mock data fallback
- **[`review_scraper.py`](src/core/tools/review_scraper.py:1)**: Google Maps/TripAdvisor review scraper with mock data functionality
- **[`asset_manager.py`](src/core/tools/asset_manager.py:1)**: Asset management for project files and resources

#### Agent Roster
- **[`wb_analyst.yaml`](src/roster/wb_analyst.yaml:1)**: Senior Wildberries Data Auditor for mechanical fact extraction
- **[`wb_writer.yaml`](src/roster/wb_writer.yaml:1)**: Technical Report Compiler for PDF formatting
- **[`wb_scraper_agent.yaml`](src/roster/wb_scraper_agent.yaml:1)**: Wildberries Data Collector for product information
- **Multiple specialized agents**: Including builder_devops, cfo_guardian, closer_shark, diagnostic_prime, and others

#### Workflow Flows
- **WB Audit Flow**: Product analysis and reporting workflow
- **Enterprise OS Flow**: Multi-stage business analysis (discovery, strategy, architecture, commercial, handover)
- **Review Detective Flow**: Review analysis and sentiment investigation

#### Configuration
- **`.env.example`**: Template for environment variables and API keys
- **[`requirements.txt`](requirements.txt:1)**: Dependencies for AI core, API layer, legacy UI, and PDF engine
- **[`Dockerfile`](Dockerfile:1)**: Container setup with system dependencies for PDF generation
- **[`docker-compose.yml`](docker-compose.yml:1)**: Multi-service orchestration for AI core

### Features
- **Autonomous Pipelines**: Multi-stage business analysis with automatic progression
- **LLM Orchestration**: Flexible agent configuration with model fallbacks
- **Real-time Status Tracking**: Progress monitoring with phase indicators
- **Financial Calculations**: ROI metrics and payback period calculations
- **Multi-tier Licensing**: Guest, starter, business, and premium license levels
- **Secure Authentication**: Service token-based access control
- **Asynchronous Processing**: Background task execution with resource limiting
- **Mock Data Fallback**: Resilient operation when external APIs are unavailable

### API Endpoints
- **Health Check**: `/health` for system status verification
- **WB Parse**: `/api/v1/wb-audit/parse` for synchronous product data retrieval
- **WB Full Audit**: `/api/v1/wb-audit/full` for asynchronous audit processing
- **Status Check**: `/api/v1/wb-audit/status/{project_id}` for audit progress tracking
- **PDF Generation**: `/api/v1/wb-audit/generate-pdf` for report compilation

### File Structure
```
_core_remote/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── func.md
├── mapfiles.md
├── project_analysis.md
├── requirements.txt
├── test_stealth.py
├── src/
│   ├── api.py
│   ├── app.py
│   ├── main.py
│   ├── roster_loader.py
│   ├── __init__.py
│   ├── assets/
│   │   ├── logo.png
│   │   ├── templates/
│   │   │   ├── report_template.html
│   │   │   └── style.css
│   ├── config/
│   │   ├── intake_questions.json
│   │   ├── products.yaml
│   ├── core/
│   │   ├── agent_factory.py
│   │   ├── auto_teaser.py
│   │   ├── calculator.py
│   │   ├── pdf_engine.py
│   │   ├── security.py
│   │   ├── state_manager.py
│   │   ├── translator.py
│   │   └── tools/
│   │       ├── asset_manager.py
│   │       ├── review_scraper.py
│   │       ├── wb_scraper.py
│   │       └── wb_analyzer/
│   │           └── wb_scraper.py
│   ├── flows/
│   │   ├── enterprise_os/
│   │   │   ├── broker_agent.py
│   │   │   ├── stage_6_handover.py
│   │   │   └── stage_1_5_questionnaire/
│   │   │   └── stage_1_discovery/
│   │   │   └── stage_2_intel/
│   │   │   └── stage_3_strategy/
│   │   │   └── stage_4_architecture/
│   │   │   └── stage_5_commercial/
│   │   ├── review_detective/
│   │   │   └── teaser/
│   │   └── wb_audit/
│   └── roster/
│       ├── builder_devops.yaml
│       ├── cfo_guardian.yaml
│       ├── closer_shark.yaml
│       ├── diagnostic_prime.yaml
│       ├── wb_analyst.yaml
│       ├── wb_writer.yaml
│       └── [many more agent configurations]
```

This backend system works in conjunction with the frontend Astro application to provide a complete AI-powered auditing and analysis platform.