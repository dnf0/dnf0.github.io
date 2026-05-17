# CV Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the CV served on the portfolio website by copying the newly generated CV files into the public directory.

**Architecture:** Use basic shell file copy operations to replace the placeholder assets in `public/cv` with the source files from the external `personal` directory.

**Tech Stack:** Shell commands.

---

### Task 1: Copy and Rename CV Files

**Files:**
- Create/Modify: `public/cv/fisher-cv.pdf`
- Create/Modify: `public/cv/fisher-cv.tex`

- [ ] **Step 1: Copy the PDF file**

Run: `cp ../personal/applications/generic-website-cv/cv-twocolumn.pdf public/cv/fisher-cv.pdf`
Expected: File is copied without errors.

- [ ] **Step 2: Copy the LaTeX source file**

Run: `cp ../personal/applications/generic-website-cv/cv-twocolumn.tex public/cv/fisher-cv.tex`
Expected: File is copied without errors.

- [ ] **Step 3: Verify the files exist**

Run: `ls -la public/cv/fisher-cv.*`
Expected: Output showing both `.pdf` and `.tex` files present in the directory.

- [ ] **Step 4: Commit**

```bash
git add public/cv/fisher-cv.pdf public/cv/fisher-cv.tex
git commit -m "feat: update cv to cv-twocolumn version"
```