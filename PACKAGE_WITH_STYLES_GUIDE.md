# Creating a Package with CSS/Styles Export

This guide documents the steps to properly export styles from a UI component package so consumers can import them without errors.

## Problem

When you try to import `@cavkim/ui/styles` in a test app, you get:

- `Cannot find module or type declarations for side-effect import of '@cavkim/ui/styles'`
- `.../styles is not exported under the conditions ["style", "development", "import"]`

## Solution: 4 Key Steps

### 1. Update `package.json` Exports

Add a `./styles` export with proper conditions:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "require": "./dist/index.js",
    "import": "./dist/index.mjs"
  },
  "./styles": {
    "types": "./dist/styles.d.ts",
    "import": "./dist/styles/globals.css",
    "require": "./dist/styles/globals.css",
    "style": "./dist/styles/globals.css"
  }
}
```

**Key Points:**

- Must include `"types"`, `"import"`, `"require"`, and `"style"` conditions
- Paths point to `./dist/styles/` (not just `./dist/`)
- This allows both `import '@cavkim/ui/styles'` and bundlers to find the CSS

### 2. Create TypeScript Declaration File

Create `packages/ui/src/styles.d.ts`:

```typescript
declare module "@cavkim/ui/styles" {
  export {};
}
```

This tells TypeScript the module exists and is valid to import.

### 3. Update `tsup.config.ts`

Include the styles declaration in entries:

```typescript
export default defineConfig({
  entry: ["src/index.ts", "src/styles.d.ts", "src/styles/globals.css"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  splitting: false,
  minify: false,
  shims: false,
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".js" : ".mjs",
      dts: ".d.ts",
    };
  },
});
```

**Key Points:**

- Include `"src/styles.d.ts"` in the entry array
- This generates `dist/styles.d.ts` and `dist/styles/globals.css` after build

### 4. Build & Publish

```powershell
npm run build    # Builds to dist/ with proper structure
npm publish      # Publishes to npm registry
```

## How Consumers Use It

In their React app (e.g., `apps/web/src/app/layout.tsx`):

```typescript
import '@cavkim/ui/styles'  // Import styles
import { HeaderBasic } from '@cavkim/ui'  // Import components

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

## Important Reminders

✅ **DO:**

- Include all four conditions in `./styles` export: `types`, `import`, `require`, `style`
- Use `./dist/styles/` paths (NOT `./dist/`)
- Create `src/styles.d.ts` for TypeScript support
- Add all three entries to `tsup.config.ts`
- Bump version before publishing (e.g., 0.1.3 → 0.1.4)

❌ **DON'T:**

- Export styles with only `"style"` condition—bundlers need more
- Use `./dist/globals.css` paths directly (creates path issues)
- Skip the `.d.ts` declaration file (breaks TypeScript)
- Forget to rebuild after config changes

## Troubleshooting

| Error                                  | Solution                                                      |
| -------------------------------------- | ------------------------------------------------------------- |
| Cannot find module '@cavkim/ui/styles' | Missing `styles.d.ts` file or not in tsup entries             |
| Not exported under conditions [...]    | Missing `import`/`require` conditions in package.json exports |
| CSS not loading                        | Verify `dist/styles/` folder exists after build               |
| Still not working                      | Try `npm run clean && npm run build` then republish           |

## File Structure After Build

```
dist/
├── index.d.ts
├── index.js
├── index.mjs
├── styles.d.ts          ← TypeScript declaration
└── styles/
    └── globals.css      ← Actual CSS file
```
