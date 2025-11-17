# P29 Implementation Playbook Platform

A comprehensive web application designed to guide organizations through their Provision 29 implementation journey. Built with React, TypeScript, and Tailwind CSS, this platform provides structured guidance, templates, and resources for regulatory compliance.

## 🚀 Features

- **24-Month Implementation Roadmap**: Visual timeline with 4 distinct phases
- **Template Library**: 15+ ready-to-use templates for all implementation stages
- **Role-Specific Guides**: Tailored guidance for 6 key stakeholder roles
- **Readiness Assessment**: 5-domain evaluation with 30 questions and scoring
- **Resources Hub**: Articles, case studies, and video content
- **FAQ & Glossary**: Comprehensive reference materials
- **Progress Tracking**: Monitor implementation progress with gamification
- **Global Search**: Fast content discovery with keyboard shortcuts (Cmd/Ctrl+K)
- **Vendor Customization**: White-label branding via URL parameters

## 📋 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **Charts**: Recharts
- **PDF Generation**: jsPDF

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── assessment/     # Assessment components
│   ├── roadmap/        # Roadmap visualization
│   ├── templates/      # Template library
│   ├── roles/          # Role guides
│   ├── common/         # Shared components
│   └── ...
├── contexts/           # React Context providers
├── data/               # Static JSON data
├── hooks/              # Custom React hooks
├── pages/              # Route components
├── types/              # TypeScript types
└── utils/              # Helper functions
```

## 🗄️ Data Structure

All content is stored in JSON files under `src/data/`. Access via the data loader:

```typescript
import { P29Data } from "@/data";

const phases = P29Data.phases.getAll();
const templates = P29Data.templates.getByPhase(1);
```

## 🎨 Design System

- Defined in `src/index.css` and `tailwind.config.ts`
- HSL color system with semantic tokens
- Responsive typography and spacing utilities
- Consistent phase colors and role colors

## 🔍 Key Features

### Global Search
- Accessible via `Cmd/Ctrl + K`
- Searches templates, FAQs, glossary, articles, pages
- Recent searches stored in localStorage

### Progress Tracking
- Assessment completion
- Template downloads
- Task completion
- Engagement streaks
- All stored in localStorage

### Vendor Customization
```
https://p29playbook.com/?vendor=readinow
```
Customize logos, colors, messaging via `vendorConfig.json`

## 📱 Responsive Design

Mobile-first design with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1023px
- Desktop: 1024px+

## ♿ Accessibility

- WCAG AA compliant
- Keyboard navigation
- ARIA labels
- 48px minimum touch targets
- Screen reader friendly

## 🚢 Deployment

Deploy to any static hosting:
- Vercel (recommended)
- Netlify
- Cloudflare Pages
- GitHub Pages

## 📝 Contributing

For questions or support, contact the development team.

## 📄 License

Proprietary - All rights reserved

---

Built with ❤️ for Provision 29 compliance teams
