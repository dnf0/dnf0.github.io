# Design Specification: *lings Project Pages Integration

- **Date**: 2026-08-28
- **Topic**: *lings Project Pages (Spanglings, Kubelings, Terralings, Raylings)
- **Status**: Approved

## 1. Context & Motivation

The portfolio website (`dnf0.github.io`) showcases technical projects, blog articles, and engineering case studies. To highlight the suite of terminal-driven, interactive learning tools created by Daniel Fisher (`*lings`), we need to add dedicated project case studies to the portfolio.

The `*lings` suite comprises four developer-grade CLI/TUI educational tools:
1. **Spanglings** — Interactive CLI/TUI & LSP for learning intermediate-to-advanced Spanish (Rust / Ratatui).
2. **Kubelings** — Hands-on CLI learning environment for Kubernetes (Python / Typer / Pyodide WASM playground).
3. **Terralings** — Terminal learning environment for Terraform and OpenTofu (Go / Bubble Tea).
4. **Raylings** — Hands-on CLI learning environment for Python Ray & distributed AI (Python / Textual / KinD KubeRay).

## 2. Architecture & File Layout

The site is built with Next.js App Router, using MDX content files parsed via `content/projects/*.mdx` and dynamically routed under `/projects/[slug]`.

### New Files to Create

```
content/projects/
├── spanglings.mdx
├── kubelings.mdx
├── terralings.mdx
└── raylings.mdx
```

Existing pages and components (e.g. `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx`, and `src/components/FilterablePostList.tsx`) automatically discover and render any `.mdx` files located in `content/projects/`.

## 3. Detailed Page Specifications

### 3.1 Spanglings (`content/projects/spanglings.mdx`)

- **Frontmatter**:
  - `title`: `"Spanglings"`
  - `date`: `"2026-08-26"`
  - `description`: `"Developer-grade CLI & interactive TUI for mastering Spanish grammar, verb mechanics, and nuanced syntactic architecture inspired by Rustlings."`
  - `tags`: `["rust", "tui", "ratatui", "lsp", "language-learning", "lings", "cli"]`
- **Key Sections**:
  - **Overview**: Elevator pitch on treating natural language acquisition like compiler construction ("Active Debugging over Passive Flashcards").
  - **Pedagogical Philosophy**: Rustc-style diagnostic compiler errors (`error[E0301]`), 81-concept ontological Directed Acyclic Graph (DAG) computing learning frontiers, and SuperMemo-2 (SM-2) spaced repetition review.
  - **Core Capabilities**:
    - Full-screen dual-pane Ratatui TUI with real-time verb conjugation lookup and cheat sheet modals.
    - Sub-20ms headless file watcher (`spanglings watch`).
    - Standard Language Server Protocol (`spanglings lsp`) with hover diagnostics and inline completions for VS Code, Neovim, and Helix.
  - **Curriculum Scope**: 60 tracks across 339 exercises spanning CEFR levels A1 through C1 mastery.
  - **Links**:
    - GitHub: `https://github.com/dnf0/spanglings`
    - Documentation: `https://dnf0.github.io/spanglings/`
    - Syllabus: `https://dnf0.github.io/spanglings/syllabus/`
    - Companion `*lings` ecosystem cross-links.

### 3.2 Kubelings (`content/projects/kubelings.mdx`)

- **Frontmatter**:
  - `title`: `"Kubelings"`
  - `date`: `"2026-08-26"`
  - `description`: `"An interactive, hands-on CLI learning environment for mastering Kubernetes from scratch through guided, test-driven exercises."`
  - `tags`: `["kubernetes", "devops", "python", "cli", "tui", "lings", "wasm"]`
- **Key Sections**:
  - **Overview**: Active debugging of Kubernetes manifests, multi-container sidecars, RBAC security, and custom operators.
  - **Pedagogical Philosophy**: Fast-feedback loop (<30ms) moving engineers away from cryptic Helm errors into structured, test-driven YAML and Python operator development.
  - **Core Capabilities**:
    - Dual execution modes: Offline schema & behavior validator vs live KinD/minikube cluster reconciliation in ephemeral namespaces.
    - Full-screen interactive TUI dashboard (`kubelings tui`).
    - WebAssembly Browser Playground: 100% client-side execution via Pyodide and Monaco Editor.
    - Official VS Code and Cursor companion extension with activity bar tree views and on-save diagnostics.
    - Topology tree visualizer (`kubelings tree`) and manifest linter (`kubelings lint`).
  - **Curriculum Scope**: 26 chapters covering 114 exercises from pods, services, and ingress to Kyverno, Cilium eBPF, KubeRay, and GPU dynamic resource allocation.
  - **Links**:
    - GitHub: `https://github.com/dnf0/kubelings`
    - In-Browser Playground: `https://dnf0.github.io/kubelings/playground/`
    - Companion `*lings` ecosystem cross-links.

### 3.3 Terralings (`content/projects/terralings.mdx`)

- **Frontmatter**:
  - `title`: `"Terralings"`
  - `date`: `"2026-08-26"`
  - `description`: `"An interactive terminal learning tool for mastering Terraform and OpenTofu through hands-on infrastructure-as-code exercises."`
  - `tags`: `["terraform", "opentofu", "go", "iac", "tui", "lings", "devops"]`
- **Key Sections**:
  - **Overview**: High-speed, Go-powered interactive runner for mastering HCL expressions, state refactoring, `.tftest.hcl` testing, and architectural governance.
  - **Pedagogical Philosophy**: Sub-30ms hotkey watcher loop without artificial magic comments or cloud credentials required.
  - **Core Capabilities**:
    - Dual Engine Compatibility: Auto-detects and runs natively against OpenTofu (>= 1.6) and Terraform (>= 1.5).
    - Bubble Tea & Lip Gloss full-screen TUI (`terralings tui`).
    - Embedded Language Server (`terralings lsp`) for real-time hover hints and code actions.
    - Official VS Code companion extension.
    - Comprehensive governance & OpenTofu encryption exercises (state encryption at rest, root module encapsulation, ADR-0005 policy encapsulation).
  - **Curriculum Scope**: 13 chapters spanning 56 exercises embedded directly in the standalone Go binary.
  - **Links**:
    - GitHub: `https://github.com/dnf0/terralings`
    - Documentation: `https://dnf0.github.io/terralings/`
    - Onboarding Guide: `https://dnf0.github.io/terralings/onboarding-guide/`
    - Companion `*lings` ecosystem cross-links.

### 3.4 Raylings (`content/projects/raylings.mdx`)

- **Frontmatter**:
  - `title`: `"Raylings"`
  - `date`: `"2026-08-27"`
  - `description`: `"An interactive, hands-on CLI learning environment for mastering Python Ray, distributed actors, and scalable AI clusters."`
  - `tags`: `["python", "ray", "distributed-systems", "ai", "tui", "lings", "kubernetes"]`
- **Key Sections**:
  - **Overview**: Hands-on distributed computing curriculum in Python, demystifying Ray futures, stateful actors, Plasma zero-copy memory, and PyTorch DDP pipelines.
  - **Pedagogical Philosophy**: Sub-50ms execution loop leveraging a warm background Ray cluster daemon to give developers immediate feedback on distributed code.
  - **Core Capabilities**:
    - Full-Screen Split-Pane TUI (`raylings tui`) with live curriculum navigation and hint reveals.
    - Cluster Health & Telemetry Inspector (`raylings top` / `raylings metrics`) monitoring Plasma object store memory, spill rates, CPU/GPU saturation, and active actor tables.
    - Multi-Node Kubernetes & KubeRay testing: Ephemeral 3-node KinD cluster harness and automated E2E test suites.
    - First-class VS Code extension with activity bar exercise tree and status bar progress.
  - **Curriculum Scope**: 14 chapters comprising 66 exercises covering Ray Core, Actor pools, Plasma memory, Ray Data ETL, distributed parameter servers, Ray Train PyTorch DDP, Ray Serve DAGs, and KubeRay.
  - **Links**:
    - GitHub: `https://github.com/dnf0/raylings`
    - Documentation: `https://dnf0.github.io/raylings/`
    - Syllabus: `https://dnf0.github.io/raylings/syllabus/`
    - Companion `*lings` ecosystem cross-links.

## 4. Quality & Verification Strategy

1. **Static Build Validation**:
   - Run `npm run build` to ensure Next.js parses all frontmatter, compiles MDX, and generates static export pages (`out/projects/spanglings.html`, etc.) with zero warnings/errors.
2. **Tag Discovery**:
   - Verify that tags (`lings`, `tui`, `cli`, `rust`, `python`, `go`, `kubernetes`, `terraform`, `ray`, etc.) are correctly aggregated by `getAllTags("projects")` and filterable on `/projects?tag=...`.
3. **Link Integrity**:
   - Ensure all markdown links to GitHub repositories, documentation pages, and companion projects are valid.
