# WebStorm Import Path Resolution Issue Report

## Issue Summary

In WebStorm 2025.1.1, there are two significant regressions compared to WebStorm 2024.2.5:

1. WebStorm incorrectly generates import paths that point directly to source files instead of using the export paths
   defined in package.json's "exports" field in a monorepo setup.
2. Syntax highlighting is broken for correctly imported modules (using the paths defined in "exports"), but works for
   incorrectly imported modules (direct source file paths).

These issues makes it so I always need to manually correct the import paths in my codebase, which is a significant
regression from the previous version of WebStorm.

## Environment

- **WebStorm Version**: 2025.1.1 (issue present), 2024.2.5 (working somewhat correctly)
- **Project Type**: Monorepo with multiple packages
- **Module System**: ES Modules (ESM)
- **TypeScript Version**: 5.5.4
- **Node.js Version**: 18.19.0
- **Package Manager**: pnpm 10.4.1

## Detailed Description

### Issue 1: Incorrect Import Path Generation

In our monorepo setup, we use the "exports" field in package.json to define the public API for our packages.

In WebStorm 2024.2.5, auto-import allowed us to choose the paths defined in the "exports" field. However, in WebStorm
2025.1.1, it generates import paths that point directly to the source files.

#### Example

In our utils-ts package, we have the following exports field in package.json:

```json
{
  "exports": {
    "./core": {
      "types": "./dist/core.d.ts",
      "default": "./dist/core.js"
    }
  }
}
```

**Expected Behavior (WebStorm 2024.2.5):**
When importing a function from utils-ts, it gives us a choice between the import defined in the package.json "exports"
field and webstorm generates:

```typescript
import {isString} from '@my-company/utils-ts/core';
```

**Actual Behavior (WebStorm 2025.1.1):**
WebStorm generates:

```typescript
import {isString} from '@my-company/utils-ts/lib/core.js';
```

### Issue 2: Broken Syntax Highlighting

When using the correct import path (as defined in the "exports" field), WebStorm 2025.1.1 fails to provide proper syntax
highlighting for the imported symbols. However, when using the incorrect direct source file path, syntax highlighting
works correctly.

**Example:**

- With correct import: `import { isString } from '@my-company/utils-ts/core';`
    - `isString` appears as plain text without syntax highlighting
    - No code completion or navigation features work for this symbol

- With incorrect import: `import { isString } from '@my-company/utils-ts/lib/core.js';`
    - `isString` is properly highlighted as a function
    - Code completion and navigation features work correctly

## Steps to Reproduce

### For Import Path Issue:

1. Clone the reproduction repository: [webstorm-imports-repro-2]
2. Open it in WebStorm 2025.1.1
3. Install dependencies: `pnpm install`
4. Build the packages: `pnpm build`
5. Open `packages/ui-vue/lib/components/Button/Button.vue`
6. Delete the import statement: `import { isString } from '@my-company/utils-ts/string'`
7. Delete the use of `isString` in the script
8. Start typing `isString` and use WebStorm's auto-import feature
9. Observe that WebStorm generates: `import { isString } from '@my-company/utils-ts/lib/string.js'`

### For Syntax Highlighting Issue:

1. Follow steps 1-4 above
2. Open `packages/ui-vue/lib/components/Button/Button.vue`
3. Compare these two import statements:
   ```typescript
   // Correct import path (from exports field) - no syntax highlighting
   import { isString } from '@my-company/utils-ts/string'
   
   // Incorrect direct path - proper syntax highlighting
   import { isString } from '@my-company/utils-ts/lib/string.js'
   ```
4. Observe that the `isString` function has proper syntax highlighting only in the second case

## Impact

These issues have several negative impacts on our development workflow:

1. **Broken builds**: When building for production, direct imports may not be resolved correctly
2. **Maintenance burden**: Developers need to manually correct import paths
3. **Reduced productivity**: The lack of syntax highlighting for correct imports makes development more difficult

## Technical Details

Our monorepo setup uses:

- TypeScript with `"module": "nodenext"` and `"moduleResolution": "nodenext"`
- ES Modules with `"type": "module"` in package.json
- Package.json "exports" field to define public API
- Separate source (lib/) and output (dist/) directories
- pnpm for package management
- esbuild for building the utils-ts package
- vite for building the ui-vue package

## Comparison Between Versions

This issue is a regression in WebStorm 2025.1.1. In WebStorm 2024.2.5:

1. Auto-import correctly uses the paths defined in the "exports" field
2. Syntax highlighting works correctly for imports using the paths defined in the "exports" field

We have verified this by testing the same codebase in both versions of WebStorm.

## Additional Notes

We've created a minimal reproduction repository to demonstrate these
issues: [webstorm-imports-repro-2](https://github.com/gdseck/webstorm-imports-repro)

Thank you for your attention to these issues. We appreciate any assistance in resolving them.