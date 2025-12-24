# Magnet Web

The Magnet agency website built with Next.js, Tailwind CSS, and modern web technologies.

## Overview

This repository contains the Magnet website, a Next.js application that serves as both our agency's public-facing website and a unified workspace for creating, managing, and delivering digital marketing solutions.

## Architecture

### Project Structure

```
magnet-web/
├── website/          # Next.js application
│   ├── src/
│   │   ├── app/      # Next.js App Router pages
│   │   ├── components/ # React components
│   │   └── data/      # Static data files
│   └── public/       # Static assets
├── STRATEGY.md       # Agency strategy and vision
└── LICENSE.md        # Tailwind Plus license
```

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS v4
- **Components**: Tailwind Plus Elements
- **Styling**: Tailwind CSS with custom theme
- **TypeScript**: Full type safety
- **3D Graphics**: Three.js, React Three Fiber

### Future Integrations

- **Sanity CMS**: For blog content and editorial management
- **Vercel Postgres**: For project-level knowledge and structured data
- **Content Strategy**: All content, keywords, and strategy documents will live in the codebase

## Quick Start

### Prerequisites

- Node.js 20+ 
- npm, yarn, or pnpm

### Installation

1. Navigate to the website directory:
```bash
cd website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Development

### Code Style

- TypeScript for type safety
- Prettier for code formatting
- ESLint for code quality
- Tailwind CSS for styling

### Project Philosophy

This project follows a unified approach where all aspects of website creation—from copywriting and keyword research to design and development—happen within the codebase using Cursor and modern development tools. This eliminates context fragmentation and creates a single source of truth for all project knowledge.

## License

This project uses components from Tailwind Plus. See [LICENSE.md](./LICENSE.md) for details.
