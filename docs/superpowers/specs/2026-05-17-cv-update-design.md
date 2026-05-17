# CV Update - Design Spec

## Overview
Update the CV served on the portfolio website (`/cv` route) by replacing the placeholder assets in the `public/cv` directory with the generated `cv-twocolumn` versions provided in the external `personal` directory. 

## Strategy
We will use a "Copy and Rename" approach. The `src/app/cv/page.tsx` component is currently configured to render and offer downloads for `fisher-cv.pdf` and `fisher-cv.tex`. We will leave the React component untouched and simply supply the target assets.

## Implementation Steps
1. Copy the PDF file:
   - Source: `../personal/applications/generic-website-cv/cv-twocolumn.pdf`
   - Destination: `public/cv/fisher-cv.pdf`
2. Copy the LaTeX source file:
   - Source: `../personal/applications/generic-website-cv/cv-twocolumn.tex`
   - Destination: `public/cv/fisher-cv.tex`
3. Verify that the files were correctly placed in the `public/cv/` directory.