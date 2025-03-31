# Rainbond English Homepage Design Document

## Overview
This document outlines the design and structure of the English version of the Rainbond homepage. The page will reuse the header from the Chinese version while implementing a new content structure optimized for English-speaking users.

## Page Structure

### 1. Hero Section
**Location**: Top of the page
**Purpose**: Immediate value proposition and call-to-action
**Key Elements**:
- Main headline: "Build Enterprise Applications Like Mobile Apps"
- Subheadline: "Rainbond = Heroku-like Experience + Native Kubernetes Support + Enterprise-grade Private Deployment"
- Brief description of Rainbond's core value proposition
- Two CTA buttons:
  - "Get Started" (primary)
  - "Documentation" (secondary)

**Component Interface**:
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaButtons: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
}
```

**Styling Details**:
- Title: text-3xl md:text-5xl lg:text-6xl font-bold
- Subtitle: text-lg text-primary font-medium
- Description: text-lg text-gray-600 max-w-2xl
- Button padding: px-6 py-3
- Button border radius: rounded-lg
- Hover effects: transform scale-105 transition-all duration-200

### 2. Core Capabilities Section
**Location**: Below Hero Section
**Purpose**: Highlight key features and benefits
**Structure**:
- Section title: "Core Capabilities"
- Grid layout with 4 feature cards:
  1. Install Enterprise Software Like Mobile Apps
  2. Containerization Without Dockerfile and YAML
  3. Full Application Lifecycle Management
  4. Microservice Modular Assembly

**Component Interface**:
```typescript
interface FeatureCard {
  icon: string; // SVG icon name
  title: string;
  description: string;
}

interface CoreCapabilitiesProps {
  title: string;
  features: FeatureCard[];
}
```

**Styling Details**:
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Card padding: p-6
- Card hover: shadow-lg transform -translate-y-1
- Icon size: w-12 h-12
- Title: text-xl font-semibold
- Description: text-gray-600

### 3. Why Rainbond Section
**Location**: Below Core Capabilities
**Purpose**: Address user pain points and platform differentiation
**Structure**:
- Section title: "Why Rainbond?"
- Tabbed interface with two perspectives:
  1. Developer Perspective
  2. Ops/Platform Admin Perspective

**Component Interface**:
```typescript
interface TabContent {
  title: string;
  painPoints: string[];
  benefits: string[];
}

interface WhyRainbondProps {
  title: string;
  tabs: {
    developer: TabContent;
    ops: TabContent;
  };
  comparison: {
    platformType: string;
    products: string[];
    differentiation: string[];
  }[];
}
```

**Styling Details**:
- Tab padding: px-4 py-2
- Active tab: border-b-2 border-primary
- Content padding: p-6
- List spacing: space-y-4
- Check icon: w-5 h-5 text-primary

### 4. Target Users Section
**Location**: Below Why Rainbond
**Purpose**: Identify and address specific user personas
**Structure**:
- Section title: "Who Is It Designed For?"
- Two-column layout with user personas

**Component Interface**:
```typescript
interface UserPersona {
  title: string;
  icon: string;
  needs: string[];
  useCases: string[];
}

interface TargetUsersProps {
  title: string;
  personas: UserPersona[];
}
```

**Styling Details**:
- Grid: grid-cols-1 md:grid-cols-2 gap-8
- Card padding: p-6
- Icon size: w-16 h-16
- List spacing: space-y-3
- Hover effect: shadow-md

### 5. Getting Started Section
**Location**: Below Target Users
**Purpose**: Guide users to quick installation
**Structure**:
- Section title: "Getting Started"
- Two cards:
  1. Minimum Requirements
  2. Installation Command

**Component Interface**:
```typescript
interface Requirement {
  label: string;
  value: string;
}

interface GettingStartedProps {
  title: string;
  requirements: Requirement[];
  installCommand: string;
  accessUrl: string;
}
```

**Styling Details**:
- Command box: bg-gray-900 text-white p-4 rounded-lg
- Code font: font-mono
- Card padding: p-6
- Button margin: mt-4

### 6. Footer Section
**Location**: Bottom of the page
**Purpose**: Provide additional resources and links
**Structure**:
- Copyright information
- Quick links
- Social media links

**Component Interface**:
```typescript
interface FooterProps {
  copyright: string;
  links: {
    text: string;
    url: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
}
```

**Styling Details**:
- Container padding: py-8
- Link spacing: space-x-6
- Icon size: w-6 h-6
- Hover effect: text-primary

## Technical Implementation Notes

### Component Structure
```
src/components/HomePageEn/
├── Hero/
│   ├── index.tsx
│   └── styles.module.scss
├── CoreCapabilities/
│   ├── index.tsx
│   ├── FeatureCard.tsx
│   └── styles.module.scss
├── WhyRainbond/
│   ├── index.tsx
│   ├── TabPanel.tsx
│   └── styles.module.scss
├── TargetUsers/
│   ├── index.tsx
│   ├── UserCard.tsx
│   └── styles.module.scss
├── GettingStarted/
│   ├── index.tsx
│   └── styles.module.scss
└── Footer/
    ├── index.tsx
    └── styles.module.scss
```

### Styling Guidelines
- Use Tailwind CSS for styling
- Maintain consistent color scheme:
  - Primary: #338BFF
  - Primary Light: #E6F0FF
  - Primary Dark: #1A5DC7
  - Text Primary: #333333
  - Text Secondary: #666666
  - Background Light: #F0F7FF

### Typography Scale
- h1: 3rem (48px)
- h2: 2.25rem (36px)
- h3: 1.875rem (30px)
- h4: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- Container max-width: 1280px
- Section padding:
  - Mobile: px-4
  - Desktop: px-8

### Animation Guidelines
- Transition duration: 200ms
- Hover scale: 1.05
- Fade in: opacity 0 to 1
- Slide up: translateY -20px to 0
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

### Performance Considerations
- Lazy load images and heavy components
- Optimize SVG icons
- Minimize CSS bundle size
- Implement proper caching strategies
- Use React.memo for pure components
- Implement proper code splitting

## Content Guidelines

### Writing Style
- Clear and concise language
- Technical but accessible
- Focus on benefits over features
- Use active voice
- Maintain consistent terminology

### SEO Considerations
- Proper heading hierarchy
- Meta descriptions
- Alt text for images
- Semantic HTML structure
- Mobile optimization
- Open Graph tags
- Twitter cards

## Next Steps
1. Create individual components for each section
2. Implement responsive layouts
3. Add animations and transitions
4. Conduct accessibility testing
5. Perform cross-browser testing
6. Optimize performance
7. Add analytics tracking
8. Set up i18n for content management
9. Implement A/B testing framework
