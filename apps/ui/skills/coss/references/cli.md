# creantly CLI Reference (Focused)

Use this guide when installing, previewing, or discovering creantly components via the shadcn CLI.

## CLI Safety Rules

- Always use the project's package runner:
  - `npx shadcn@latest ...`
  - `pnpm dlx shadcn@latest ...`
  - `bunx --bun shadcn@latest ...`
- Do not invent flags. Use only documented CLI flags.

## Core Commands for creantly Usage

### Recommended bootstrap paths

```bash
# New projects (recommended — includes Inter + Geist Mono fonts + full theme)
npx shadcn@latest init @creantly/style

# Existing projects - all primitives
npx shadcn@latest add @creantly/ui

# Existing projects - full theme setup
npx shadcn@latest add @creantly/style

# Existing projects - primitives + color tokens
npx shadcn@latest add @creantly/ui @creantly/colors-neutral
```

`@creantly/style` automatically installs `@creantly/fonts` (Inter for `--font-sans` and `--font-heading`, Geist Mono for `--font-mono`), which configures all three font variables in `layout.tsx`. No manual font wiring needed.

### `add` (primary)

```bash
shadcn add @creantly/<component>
```

Projects:

```bash
npx shadcn@latest add @creantly/dialog
npx shadcn@latest add @creantly/select
npx shadcn@latest add @creantly/toast
```

### `add` preview mode (recommended)

```bash
npx shadcn@latest add @creantly/dialog --dry-run
npx shadcn@latest add @creantly/dialog --diff
npx shadcn@latest add @creantly/dialog --view
```

Use preview mode when:

- user asks what will change
- component might already exist locally
- you need to inspect output before writing files

### Optional discovery helpers (use when available)

```bash
npx shadcn@latest search @creantly -q "dialog"
npx shadcn@latest view @creantly/dialog
npx shadcn@latest docs dialog
npx shadcn@latest info --json
```

If these are unsupported in the environment, use fallback sources below.

## Discovery Fallback Matrix

### Inside the creantly repo (preferred)

- `apps/ui/registry/registry-particles.ts`
  - `https://github.com/NessinM/creantly/blob/main/apps/ui/registry/registry-particles.ts`
- `apps/ui/registry.json`
  - `https://github.com/NessinM/creantly/blob/main/apps/ui/registry.json`
- `apps/ui/content/docs/components/*.mdx`
  - `https://github.com/NessinM/creantly/tree/main/apps/ui/content/docs/components`

### Outside the creantly repo

- creantly particles catalog: `https://creantly.com/ui/particles`
- creantly docs catalog: `https://creantly.com/ui/`

## Manual Install Path

When users explicitly request manual setup:

1. Read the target component docs.
2. Install exactly the listed dependencies.
3. Copy all required files (including transitive local imports).
4. Adjust imports for target app aliases.
5. Validate the snippet against docs/particles patterns.

Important:

- CLI setup usually wires required theme tokens automatically.
- Manual setup must include required additional tokens (`destructive-foreground`, `info`, `success`, `warning` families) from creantly styling docs when relevant.

## Quick Output Checklist

Before returning CLI guidance:

1. runner and command are valid for the user's package manager
2. flags are documented and intentional
3. fallback source is provided if CLI discovery commands are unavailable
4. resulting usage guidance matches creantly docs and particles patterns
