# *lings Project Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author and integrate dedicated project case studies for Spanglings, Kubelings, Terralings, and Raylings into the portfolio site.

**Architecture:** Next.js static site generator parsing MDX files from `content/projects/` into dynamic routes `/projects/[slug]` with interactive tag filtering on `/projects`.

**Tech Stack:** Next.js 15, React 19, TypeScript, MDX, Tailwind CSS, gray-matter.

---

### Task 1: Create Spanglings Project MDX

**Files:**
- Create: `content/projects/spanglings.mdx`

- [ ] **Step 1: Create the Spanglings MDX content file**

Write the complete MDX file with frontmatter metadata, overview, pedagogical compiler model, key CLI/TUI features, and verified links:

```markdown
---
title: "Spanglings"
date: "2026-08-26"
description: "Developer-grade CLI & interactive TUI for mastering Spanish grammar, verb mechanics, and nuanced syntactic architecture inspired by Rustlings."
tags: ["rust", "tui", "ratatui", "lsp", "language-learning", "lings", "cli"]
---

**Spanglings** is a developer-grade CLI and interactive terminal learning environment designed for mastering intermediate-to-advanced Spanish (CEFR A1 through C1). Inspired by the hands-on pedagogy of [Rustlings](https://github.com/rust-lang/rustlings) and [Raylings](https://github.com/dnf0/raylings), it treats natural language acquisition like compiler construction: *Spanglings builds the syntax compiler; real-world usage supplies the data.*

### Pedagogical Philosophy: The Syntax Compiler Model

Most language platforms rely on gamified flashcards and repetitive multiple-choice matching that fail to build generative mental models. Natural languages are structural systems with strict morphological transformations, scope rules, and pragmatic contracts.

Spanglings approaches Spanish through a compiler-driven architecture:

1. **Active Debugging with Zero Busywork**: Every exercise starts in an incomplete or broken state. Modify code in your editor; the watcher validates submissions on save in < 20ms with zero manual comment-deletion.
2. **Rustc-Style Grammar Diagnostics**: When you make an error (such as using indicative where subjunctive is mandated), Spanglings produces compiler-grade diagnostics (`error[E0301]: Subjunctive Mood Required`), pinpointing the exact offending token, underlying grammar concept, and contrast notes.
3. **81-Concept Ontological Knowledge Graph (DAG)**: All 339 exercises are mapped onto an 81-concept Directed Acyclic Graph that dynamically computes your learning frontier and concept decay rates.
4. **SM-2 Spaced Repetition**: Integrates SuperMemo-2 active recall scheduling to prioritize conceptual weak spots.
5. **Dual-Interface Synergy**: Seamlessly alternate between a full-screen Ratatui TUI and a headless watcher + native Language Server Protocol engine (`spanglings lsp`).

### Core Features & Terminal Workflow

- **Interactive Full-Screen TUI (`spanglings` / `spanglings tui`)**: Dual-pane editor interface, live fuzzy search (`/`), progressive hint tiers (`Ctrl+H`), real-time verb conjugation lookups (`Ctrl+K`), and CEFR placement tests (`[p]`).
- **Sub-20ms File Watcher (`spanglings watch`)**: Continuous background watcher with single-key controls (`n`, `p`, `r`, `h`, `c`, `q`).
- **Language Server Protocol (`spanglings lsp`)**: Native LSP server providing hover explanations, grammar diagnostics, and completions in VS Code, Cursor, Neovim, and Helix.
- **In-Terminal Grammar Explainers (`spanglings explain`)**: Instant cheat sheets for 24 core topics and error codes (`spanglings explain E0301`).

### Curriculum Matrix (60 Tracks · 339 Exercises)

- **A1 — Survival & Foundations** (Tracks 00–02, 18 exercises): Baseline irregulars, *ser vs estar*, present tense paradigms.
- **A2 — Daily Routine & Aspect** (Tracks 03–11, 54 exercises): Preterite vs imperfect aspectual shifts, stem-changers, direct/indirect pronouns.
- **B1 — The Independent Threshold** (Tracks 12–27, 96 exercises): Subjunctive triggers (WEIRDO), *por vs para*, clitic stacking (*se lo*), accidental *se*.
- **B2 — Professional & Technical Fluency** (Tracks 28–41, 84 exercises): Software engineering collocations, business correspondence, hypothetical *si* clauses, passive *se*.
- **C1 — Pragmatics & Advanced Discourse** (Tracks 42–59, 87 exercises): Epistemic conjecture, clitic doubling, personal *a*, gerund restrictions, and archaic/legal subjunctives.

### Links & Resources

- [GitHub Repository](https://github.com/dnf0/spanglings)
- [Documentation Site](https://dnf0.github.io/spanglings/)
- [Curriculum Syllabus](https://dnf0.github.io/spanglings/syllabus/)

---

### The *lings Ecosystem

Explore companion interactive learning environments in the `*lings` suite:
- [Kubelings](/projects/kubelings) — Hands-on interactive CLI learning environment for Kubernetes.
- [Terralings](/projects/terralings) — Master Terraform and OpenTofu through interactive IaC exercises.
- [Raylings](/projects/raylings) — Learn distributed AI and Ray Core actors through hands-on Python exercises.
```

- [ ] **Step 2: Verify MDX parsing**

Run: `npm run build`
Expected: Next.js builds `/projects/spanglings` without error.

- [ ] **Step 3: Commit**

```bash
git add content/projects/spanglings.mdx
git commit -m "feat(projects): add Spanglings project case study"
```

---

### Task 2: Create Kubelings Project MDX

**Files:**
- Create: `content/projects/kubelings.mdx`

- [ ] **Step 1: Create the Kubelings MDX content file**

Write the complete MDX file with frontmatter metadata, overview, architecture, in-browser playground details, and verified links:

```markdown
---
title: "Kubelings"
date: "2026-08-26"
description: "An interactive, hands-on CLI learning environment for mastering Kubernetes from scratch through guided, test-driven exercises."
tags: ["kubernetes", "devops", "python", "cli", "tui", "lings", "wasm"]
---

**Kubelings** is an interactive, test-driven terminal learning environment for mastering Kubernetes from the ground up. Inspired by [Rustlings](https://github.com/rust-lang/rustlings) and [Ziglings](https://codeberg.org/ziglings/exercises), Kubelings guides engineers through fixing broken YAML manifests, constructing multi-container sidecars, writing RBAC rules, authoring custom Python Kubernetes operators, and troubleshooting cluster incidents.

### Pedagogical Philosophy

Learning Kubernetes from static documentation or copy-pasted Helm charts is difficult because feedback loops are slow and failure messages are cryptic. Kubelings solves this through guided, test-driven micro-learning:

1. **Active Debugging & Iteration**: Every exercise starts in a broken or incomplete state with clear `# TODO:` prompts. You inspect the failure and edit the code until it passes verification.
2. **Sub-30ms Hotkey Watcher**: File changes are evaluated instantly. Single-key shortcuts (`n`, `p`, `h`, `r`, `q`) keep you in a continuous flow state.
3. **Dual-Mode Execution (Offline & Live Cluster)**:
   - *Offline Mode*: Zero cluster setup required. In-memory schema and behavioral validation.
   - *Live Cluster Mode*: Connects to `kind`, `minikube`, or remote clusters with ephemeral test namespaces.
4. **Progressive Hints**: Multi-tiered conceptual hints (`kubelings hint`) guide you without spoiling solutions.

### Core Features & Developer Tooling

- **Interactive Terminal Dashboard (`kubelings tui`)**: Split-pane interface for browsing chapters, previewing code, and evaluating manifests.
- **⚡ In-Browser Playground**: 100% client-side WebAssembly environment powered by Pyodide and the Monaco Editor — no installation or cloud required.
- **Resource Topology Visualizer (`kubelings tree`)**: Renders hierarchical ASCII trees of Kubernetes workloads, services, endpoints, volumes, and network policies.
- **Universal Manifest Linter (`kubelings lint`)**: Audits manifests against security standards, reliability probes, and schema best practices.
- **VS Code & Cursor Extension**: Dedicated Activity Bar curriculum explorer, live status bar progress, on-save schema diagnostics, and side-by-side reference solution diffing.

### Curriculum Matrix (26 Chapters · 114 Exercises)

- **01–06 Workloads & Networking**: Pods, multi-container sidecars, Deployments, StatefulSets, ConfigMaps, PV/PVC storage, ClusterIP/NodePort/LoadBalancer services, Ingress.
- **07–10 Scheduling & Reliability**: Node affinity, taints/tolerations, topology spread, RBAC, NetworkPolicies, liveness/readiness/startup probes.
- **11–18 Advanced Kubernetes**: HPA v2 autoscaling, Custom Resource Definitions (CRDs) & Python operators, incident troubleshooting, GitOps/ArgoCD, Cilium eBPF, Kyverno/Gatekeeper policy-as-code, multi-tenancy vcluster, mutating/validating webhooks.
- **19–26 Enterprise & AI Infrastructure**: Helm v3, Kustomize overlays, Gateway API, Crossplane infrastructure-as-data, Tetragon eBPF security, KubeRay distributed clusters, Kueue/Volcano batch scheduling, and GPU Dynamic Resource Allocation (DRA).

### Links & Resources

- [GitHub Repository](https://github.com/dnf0/kubelings)
- [⚡ Try in Browser (Playground)](https://dnf0.github.io/kubelings/playground/)

---

### The *lings Ecosystem

Explore companion interactive learning environments in the `*lings` suite:
- [Terralings](/projects/terralings) — Master Terraform and OpenTofu through interactive IaC exercises.
- [Spanglings](/projects/spanglings) — Developer-grade CLI & TUI for learning Spanish (B1–C1).
- [Raylings](/projects/raylings) — Learn distributed AI and Ray Core actors through hands-on Python exercises.
```

- [ ] **Step 2: Verify MDX parsing**

Run: `npm run build`
Expected: Next.js builds `/projects/kubelings` without error.

- [ ] **Step 3: Commit**

```bash
git add content/projects/kubelings.mdx
git commit -m "feat(projects): add Kubelings project case study"
```

---

### Task 3: Create Terralings Project MDX

**Files:**
- Create: `content/projects/terralings.mdx`

- [ ] **Step 1: Create the Terralings MDX content file**

Write the complete MDX file with frontmatter metadata, overview, Go engine architecture, OpenTofu features, and verified links:

```markdown
---
title: "Terralings"
date: "2026-08-26"
description: "An interactive terminal learning tool for mastering Terraform and OpenTofu through hands-on infrastructure-as-code exercises."
tags: ["terraform", "opentofu", "go", "iac", "tui", "lings", "devops"]
---

**Terralings** is an ultra-fast, interactive terminal learning tool for mastering Terraform and OpenTofu from scratch. Inspired by [Rustlings](https://github.com/rust-lang/rustlings), [Spanglings](https://github.com/dnf0/spanglings), and [Raylings](https://github.com/dnf0/raylings), it guides engineers through fixing broken configurations, writing declarative Infrastructure as Code (IaC), mastering HCL functions, refactoring state with `moved` blocks, authoring `.tftest.hcl` tests, and configuring OpenTofu state encryption.

### Pedagogical Philosophy

Terralings is built on five core educational pillars:

1. **Active Debugging over Passive Reading**: Each exercise presents realistic broken or incomplete HCL code with clear `# TODO:` instructions. You learn by diagnosing plan discrepancies and fixing syntax errors.
2. **Sub-30ms Hotkey Watcher Loop**: Powered by an ultra-fast Go file watcher (`fsnotify`), Terralings re-evaluates configurations immediately upon saving.
3. **Dual Engine Support**: Auto-detects and runs natively against both **OpenTofu** (`tofu` ≥ 1.6.0) and **Terraform** (`terraform` ≥ 1.5.0).
4. **Progressive Hinting**: Multi-level contextual hints provide conceptual nudges before revealing syntax patterns.
5. **Zero Cloud Credentials Required**: Completely self-contained offline validation without requiring AWS, GCP, or Azure credentials.

### Architecture & Capabilities

- **High-Performance Go Binary**: The entire 56-exercise curriculum is embedded directly into a standalone binary with zero runtime dependencies.
- **Bubble Tea & Lip Gloss TUI (`terralings tui`)**: Full-screen split-pane terminal dashboard featuring live curriculum trees, syntax diagnostics, and hint drawers.
- **Embedded Language Server (`terralings lsp`)**: Standards-compliant JSON-RPC 2.0 LSP daemon providing real-time diagnostics, hover documentation, and hint code actions in VS Code, Neovim, and Helix.
- **Pre-flight Health Diagnostics (`terralings doctor`)**: Validates local OpenTofu/Terraform binaries, provider plugin caches, and progress store integrity.
- **Official VS Code Companion Extension**: Activity bar curriculum explorer, on-save HCL evaluation, and 5-step guided walkthroughs.

### Curriculum Matrix (13 Chapters · 56 Exercises)

- **01–04 Foundations**: Primitives, variables, structural types, outputs, locals, ternary conditionals, splat expressions, string/collection functions, filesystem operations.
- **05–07 Meta-Arguments & Modularity**: `count`, `for_each`, lifecycle rules (`create_before_destroy`, `prevent_destroy`), dynamic blocks, local/archive data sources, preconditions and postconditions.
- **08–10 Advanced IaC**: Child module boundaries, provider aliasing, declarative state refactoring (`moved` blocks, `import` blocks), native testing framework (`.tftest.hcl`, mock providers).
- **11–13 Governance & OpenTofu**: Tagging factory patterns, OpenTofu state encryption at rest, early variable evaluation, root module encapsulation, and ADR-0005 policy encapsulation.

### Links & Resources

- [GitHub Repository](https://github.com/dnf0/terralings)
- [Documentation Site](https://dnf0.github.io/terralings/)
- [Onboarding & Learner's Guide](https://dnf0.github.io/terralings/onboarding-guide/)

---

### The *lings Ecosystem

Explore companion interactive learning environments in the `*lings` suite:
- [Kubelings](/projects/kubelings) — Hands-on interactive CLI learning environment for Kubernetes.
- [Spanglings](/projects/spanglings) — Developer-grade CLI & TUI for learning Spanish (B1–C1).
- [Raylings](/projects/raylings) — Learn distributed AI and Ray Core actors through hands-on Python exercises.
```

- [ ] **Step 2: Verify MDX parsing**

Run: `npm run build`
Expected: Next.js builds `/projects/terralings` without error.

- [ ] **Step 3: Commit**

```bash
git add content/projects/terralings.mdx
git commit -m "feat(projects): add Terralings project case study"
```

---

### Task 4: Create Raylings Project MDX

**Files:**
- Create: `content/projects/raylings.mdx`

- [ ] **Step 1: Create the Raylings MDX content file**

Write the complete MDX file with frontmatter metadata, overview, distributed systems architecture, KubeRay testing, and verified links:

```markdown
---
title: "Raylings"
date: "2026-08-27"
description: "An interactive, hands-on CLI learning environment for mastering Python Ray, distributed actors, and scalable AI clusters."
tags: ["python", "ray", "distributed-systems", "ai", "tui", "lings", "kubernetes"]
---

**Raylings** is an interactive, hands-on CLI learning environment for mastering Python Ray from scratch. Inspired by the pedagogy of [Rustlings](https://github.com/rust-lang/rustlings) and [Ziglings](https://github.com/ziglings/exercises), Raylings guides engineers through progressively challenging distributed computing exercises: futures, stateful actors, Plasma zero-copy memory, dynamic placement groups, and lineage-based fault tolerance.

### Pedagogical Philosophy

Ray is a unified framework for scaling AI and Python applications from single laptops to massive multi-node clusters. Mastering Ray's mental models requires hands-on practice.

Raylings provides:
- **Sub-50ms Execution Loop**: A background daemon re-uses a warm local Ray cluster session for rapid turnaround.
- **Active Distributed Debugging**: Fix broken distributed tasks, resolve actor bottlenecks, eliminate object store memory leaks, and configure multi-node placement groups.
- **Layered Progressive Hints**: Conceptual hints guide your mental model before revealing concrete Ray API calls.

### Core Features & Terminal Workflow

- **Split-Pane Terminal UI (`raylings tui`)**: Browse chapters, preview syntax-highlighted code with line numbers, trigger instant runs (`[r]`), reveal hints (`[h]`), and toggle telemetry overlays (`[t]`).
- **Cluster Health & Telemetry Inspector (`raylings top` / `raylings metrics`)**: Real-time dashboard monitoring Plasma object store memory, disk spill rates, CPU/GPU saturation, and active actor tables.
- **Preflight Diagnostics (`raylings doctor`) & Guided Tour (`raylings tour`)**: 5-step interactive onboarding tour and environment health checks.
- **Multi-Node Kubernetes & KubeRay Harness**: Ephemeral 3-node KinD cluster harness (`scripts/kuberay/`) for testing Ray clusters, remote client execution, and DDP training on real Kubernetes topologies.
- **VS Code Extension**: Activity Bar exercise explorer, status bar progress, and on-save auto-evaluation.

### Curriculum Matrix (14 Chapters · 66 Exercises)

- **01–03 Core Foundations**: `ray.init()`, `@ray.remote` tasks, `ObjectRef` futures, parallel pipelines, `ray.wait()`, stateful actor classes, Plasma zero-copy memory, and disk spilling.
- **04–07 Scheduling & Patterns**: Placement groups (`STRICT_SPREAD`, `STRICT_PACK`), gang scheduling, lineage reconstruction & fault tolerance, cluster architecture simulation, and nested `ray.get()` antipattern elimination.
- **08–10 Data & Training**: Ray Datasets, `map_batches`, streaming backpressure, distributed parameter servers, ring all-reduce communication, and Ray Train PyTorch DDP (`TorchTrainer`).
- **11–14 Production Scaling**: Ray Tune distributed HPO, Ray Serve multi-model DAGs, execution timelines (`ray timeline`), Prometheus observability, and KubeRay CRDs on Kubernetes.

### Links & Resources

- [GitHub Repository](https://github.com/dnf0/raylings)
- [Documentation Site](https://dnf0.github.io/raylings/)
- [Curriculum Syllabus](https://dnf0.github.io/raylings/syllabus/)

---

### The *lings Ecosystem

Explore companion interactive learning environments in the `*lings` suite:
- [Kubelings](/projects/kubelings) — Hands-on interactive CLI learning environment for Kubernetes.
- [Terralings](/projects/terralings) — Master Terraform and OpenTofu through interactive IaC exercises.
- [Spanglings](/projects/spanglings) — Developer-grade CLI & TUI for learning Spanish (B1–C1).
```

- [ ] **Step 2: Verify MDX parsing**

Run: `npm run build`
Expected: Next.js builds `/projects/raylings` without error.

- [ ] **Step 3: Commit**

```bash
git add content/projects/raylings.mdx
git commit -m "feat(projects): add Raylings project case study"
```

---

### Task 5: Static Build Verification & Tag Validation

**Files:**
- Test: Build output across all projects and tags

- [ ] **Step 1: Run full production static build**

Run: `npm run build`
Expected: Static build completes with code 0 and outputs all 5 project pages (`/projects/eider`, `/projects/spanglings`, `/projects/kubelings`, `/projects/terralings`, `/projects/raylings`).

- [ ] **Step 2: Commit any remaining changes and verify branch state**

```bash
git status
```
Expected: Working tree clean on `feat/lings-projects`.
