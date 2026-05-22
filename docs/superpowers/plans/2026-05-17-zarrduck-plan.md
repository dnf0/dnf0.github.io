# Zarrduck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new project showcase page for the `zarrduck` extension to the `/projects` portfolio section.

**Architecture:** Create an MDX file containing the required frontmatter and content within the NextJS `content/projects/` directory, which will be dynamically routed and rendered by the existing site structure.

**Tech Stack:** NextJS, MDX, Markdown.

---

### Task 1: Create the Project Content Directory and MDX File

**Files:**
- Create: `content/projects/zarrduck.mdx`

- [ ] **Step 1: Create the projects content directory (if it doesn't exist)**

Run: `mkdir -p content/projects`
Expected: Directory is created without errors.

- [ ] **Step 2: Write the new project MDX file**

Create the file `content/projects/zarrduck.mdx` with the following exact content:

```mdx
---
title: "Zarrduck"
date: "2026-05-17"
description: "A Rust-based DuckDB extension providing native support for the GeoZarr OGC standard."
tags: ["rust", "duckdb", "geospatial", "zarr"]
---

The `zarrduck` project is a Rust-based DuckDB extension designed to provide native support for GeoZarr, an OGC standard for cloud-native geospatial multidimensional arrays. It enables users to query and analyze GeoZarr datasets directly within DuckDB, leveraging its high-performance analytical capabilities.

### Links

- [GitHub Repository](https://github.com/dnf0/zarrduck)
- [README Documentation](https://github.com/dnf0/zarrduck#readme)
```

- [ ] **Step 3: Verify the application builds successfully to validate the new content**

Run: `npm run build`
Expected: The build process completes successfully without MDX parsing errors, indicating the frontmatter and content are valid.

- [ ] **Step 4: Commit**

```bash
git add content/projects/zarrduck.mdx
git commit -m "feat: add zarrduck project portfolio page"
```