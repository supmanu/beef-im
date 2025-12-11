# 🚀 Nerd with Nart: Financial Strategy Platform

This repository contains the production code for the Nerd with Nart financial platform, focusing on long-term wealth strategies and risk management. This application has been fully migrated to a Static Site Generation (SSG) architecture for maximum speed and SEO performance.

### 🌟 Key Architectural Features

* **Blazing Speed:** Utilizes Next.js 16 Static Export to deliver near-instant page loads.
* **Teal Protocol:** A custom, fully responsive design system implemented via Tailwind CSS v3.
* **Context-Aware Search:** Implements the "Pancake Strategy" (AST Flattening) for reliable, fuzzy search results across all content (English/Thai).
* **Dynamic Static Generation:** Articles are pre-rendered at build time by fetching data from Hygraph.

## 🛠️ Tech Stack

| Category | Technology | Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Static Site Generation (SSG) |
| **Styling** | Tailwind CSS v3.4 | Teal Protocol Design System |
| **Headless CMS** | Hygraph | Primary data source for articles |
| **Search Engine** | Fuse.js | High-performance, fuzzy search |
| **Deployment** | Cloudflare Pages | Global Edge Caching |

---

## 💻 Run Locally

To get the application running on your local machine, ensure you have the required environment variables set for fetching content from Hygraph.

### Prerequisites

* Node.js (v18 or higher recommended)
* npm

### 1. Environment Setup

Create a file named **`.env.local`** in the root directory and add your primary Hygraph API endpoint:

```

# This is required for fetching data during local development and production build

NEXT\_PUBLIC\_HYGRAPH\_ENDPOINT="[Your Hygraph GraphQL Endpoint URL]"

````

### 2. Installation & Development

Follow these steps in your terminal:

```bash
# 1. Install project dependencies
npm install

# 2. Run the Next.js development server (Turbopack)
npm run dev
# The application will be available at http://localhost:3000
````

### 3\. Build & Static Export

To create the production-ready static files (the output deployed to Cloudflare):

```bash
# Generates the optimized static HTML files
npm run build 

# Output is generated into the 'out/' directory.
```

## ☁️ Deployment Guide (Cloudflare Pages)

This project is configured for seamless deployment to Cloudflare Pages using the standard **Static Export** method.

| Setting | Value |
| :--- | :--- |
| **Root Directory** | `/` |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `out` |

```
