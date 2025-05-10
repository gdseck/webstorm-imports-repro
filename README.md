# WebStorm Imports Reproduction Repository

This repository demonstrates an issue with WebStorm 2025.1 where it imports from source files instead of using the export paths defined in package.json.

## Issue Description

When using WebStorm's auto-import feature in a monorepo setup, it generates import paths that point directly to the source files instead of using the paths defined in the package.json's "exports" field.

### Expected Behavior

When importing a function from a package that has defined export paths in its package.json, WebStorm should generate an import statement that uses those export paths.

For example, if utils-ts package has the following exports field:

```json
"exports": {
  "./core": {
    "types": "./dist/core.d.ts",
    "default": "./dist/core.js"
  }
}
```

Then importing a function from utils-ts should generate:

```typescript
import { isString } from '@my-company/utils-ts/core';
```

### Actual Behavior

WebStorm 2025.1 generates import statements that point directly to the source files:

```typescript
import { isString } from '@my-company/utils-ts/lib/core.js';
```

This bypasses the export paths defined in package.json and can cause issues in production builds.

## Project Structure

This monorepo is structured to mimic a real-world project:

- `apps/web`: A simple Vue application that imports from the packages
- `packages/config-typescript`: TypeScript configuration
- `packages/config-biome`: Biome configuration
- `packages/utils-ts`: TypeScript utilities
- `packages/ui-vue`: Vue components

## How to Reproduce

1. Clone this repository
2. Install dependencies: `pnpm install`
3. Build the packages: `pnpm build`
4. Open the project in WebStorm 2025.1
5. Open `apps/web/src/App.vue`
6. Delete one of the import statements (e.g., `import { chunk } from '@my-company/utils-ts/array'`)
7. Start typing the function name (e.g., `chunk`) and use WebStorm's auto-import feature
8. Observe that WebStorm generates an import from the source file path instead of using the export path

## Steps to Verify the Issue

1. Open `apps/web/src/App.vue` in WebStorm
2. Delete the following import line:
   ```typescript
   import { chunk } from '@my-company/utils-ts/array'
   ```
3. Place your cursor where the import was and start typing `chunk`
4. When WebStorm suggests the import, accept it
5. Observe that WebStorm generates:
   ```typescript
   import { chunk } from '@my-company/utils-ts/lib/array.js'
   ```
   instead of:
   ```typescript
   import { chunk } from '@my-company/utils-ts/array'
   ```

## Technical Details

This project uses:
- TypeScript with various module resolution strategies
- ES Modules with `"type": "module"` in package.json
- Package.json "exports" field to define public API
- Separate source (lib/) and output (dist/) directories
- pnpm for package management
- esbuild for building the utils-ts package (mimicking the build system from bright-energy-frontend-v2)
- unplugin-isolated-decl for generating TypeScript declaration files

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development server
pnpm dev
```

### Project Structure Details

- `packages/utils-ts`: Contains utility functions with proper exports configuration
- `packages/ui-vue`: Contains Vue components that import from utils-ts
- `apps/web`: A Vue application that imports from both packages

This structure is designed to closely mimic the structure of a real-world monorepo project while being minimal enough to clearly demonstrate the WebStorm import issue.
