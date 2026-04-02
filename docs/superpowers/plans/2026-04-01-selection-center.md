---
draft: true
---

# Selection Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `专题 > 选型中心` entry in the site header and ship `selection-center` as an independent content module with its own home page and detail pages.

**Architecture:** Use a second Docusaurus docs content plugin mounted at `/selection-center`. Keep the first version lightweight: one landing page component plus a few MDX detail pages and an isolated sidebar.

**Tech Stack:** Docusaurus 3, React 18, MDX, CSS Modules

---

### Task 1: Register the independent module

**Files:**
- Modify: `docusaurus.config.js`
- Create: `selectionCenterSidebar.js`

- [ ] Add a new docs plugin instance with:
  - `id: 'selection-center'`
  - `path: 'selection-center'`
  - `routeBasePath: 'selection-center'`
  - `sidebarPath: require.resolve('./selectionCenterSidebar.js')`
- [ ] Add a new navbar dropdown labeled `专题`
- [ ] Put `选型中心` under that dropdown and point it to `/selection-center`
- [ ] Create an isolated sidebar definition for the new module

### Task 2: Build the landing page shell

**Files:**
- Create: `selection-center/index.mdx`
- Create: `src/components/SelectionCenter/Landing/index.tsx`
- Create: `src/components/SelectionCenter/Landing/styles.module.css`

- [ ] Create the root page for `/selection-center`
- [ ] Render a custom landing component from MDX
- [ ] Show module overview, featured topics, and navigation links to detail pages
- [ ] Keep the component self-contained and style-scoped

### Task 3: Seed initial topic pages

**Files:**
- Create: `selection-center/application-delivery-platform.mdx`
- Create: `selection-center/private-delivery-solution.mdx`
- Create: `selection-center/platform-selection-checklist.mdx`

- [ ] Add at least three initial detail pages
- [ ] Keep content concise but structurally complete
- [ ] Cross-link them from the landing page and sidebar

### Task 4: Validate the site build

**Files:**
- Verify: `docusaurus.config.js`
- Verify: `selection-center/`
- Verify: `src/components/SelectionCenter/Landing/`

- [ ] Run `npm run build`
- [ ] Fix any config, MDX, or route issues revealed by the build
- [ ] Confirm the new module compiles as part of the site
