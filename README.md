# Deeplink Creators Website

A high-performance, production-ready website for Deeplink Creators digital marketing agency, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Blazing Fast Performance**: Optimized for <1.5s load times
- **Mobile-First Design**: Responsive across all devices
- **SEO Optimized**: Built-in SEO components and local business targeting
- **Neuro-Marketing Focus**: Psychology-driven content strategy
- **Lead Filtering**: Smart contact form to qualify high-value clients
- **Analytics Ready**: Google Analytics 4 and Meta Pixel integration
- **Professional Design**: Modern, conversion-focused UI/UX

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (Recommended)

## Project Structure
deeplink-creators/
├── public/ # Static assets
├── src/
│ ├── app/ # Next.js app router pages
│ ├── components/ # Reusable React components
│ ├── lib/ # Utilities and constants
│ └── styles/ # Custom styles and animations
└── configuration files

text

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd deeplink-creators
Install dependencies:

bash
npm install
# or
yarn install
# or
pnpm install
Run development server:

bash
npm run dev
# or
yarn dev
# or
pnpm dev
Open http://localhost:3000 in your browser.

Building for Production
bash
npm run build
# or
yarn build
# or
pnpm build
Start production server:

bash
npm start
# or
yarn start
# or
pnpm start
Environment Variables
Create a .env.local file in the root directory:

env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_FB_PIXEL_ID=your-facebook-pixel-id
Key Pages
Homepage (/) - Main sales letter and service overview

Services (/services/*) - Individual service landing pages

Results (/results) - Case studies and proven outcomes

About (/about) - Neuro-marketing methodology and team

Contact (/contact) - Smart lead filtering form

Strategic Features
1. Local SEO Focus
Greater Noida specific keywords

Local business schema markup

Location-specific service pages

2. Lead Qualification
Budget-based filtering in contact form

Challenge-based qualification

Industry-specific targeting

3. Performance Optimization
Image optimization

Code splitting

Minimal dependencies

Optimized fonts and assets

4. Analytics & Tracking
Google Analytics 4

Meta Pixel

Conversion tracking

Event tracking

Deployment
Deploy to Vercel (Recommended)
Install Vercel CLI:

bash
npm i -g vercel
Deploy:

bash
vercel
Or connect your GitHub repository to Vercel for automatic deployments.

Other Platforms
The project can also be deployed to:

Netlify

AWS Amplify

DigitalOcean App Platform

Any platform that supports Next.js

Customization
Update Business Information
Edit src/lib/constants.ts for:

Company details

Contact information

Service offerings

Social media links

Update Content
Each page component can be modified in src/app/[page] directory.

Update Styling
Modify tailwind.config.js for theme customization and src/app/globals.css for global styles.

License
Proprietary - All rights reserved by Deeplink Creators (A Unit of Mayalok Venture)

text

## Installation Instructions:

1. **Create the project folder structure:**
```bash
mkdir -p deeplink-creators/{public/images/client-logos,src/{app/{services/{seo-greater-noida,performance-marketing,branding},results,about,contact},components,lib,styles}}
Initialize the project:

bash
cd deeplink-creators
npm init -y
Install all dependencies:

bash
npm install next@14 react@18 react-dom@18 framer-motion@10.16.4 react-icons@4.12.0 lucide-react@0.309.0 tailwindcss@3.3.0 autoprefixer@10.0.0 postcss@8.0.0 @types/node@20 @types/react@18 @types/react-dom@18 typescript@5
Create all the files listed above with their respective content.

Add placeholder images:

Create simple logo in public/images/logo.svg

Add hero background image in public/images/hero-bg.jpg

Add case study images in public/images/case-study-1.jpg

Run the development server:

bash
npm run dev
The website will now be fully functional with all strategic elements:

Mayalok Venture mention in header

ROI-focused CTAs

Local SEO targeting Greater Noida

Neuro-marketing positioning

Smart lead filtering

Mobile-first responsive design

Performance optimized for <1.5s load times