import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored from the Inyange design system. Kept as close to upstream as possible; local fixes
    // are marked "Site patch" and must be re-applied if the file is re-synced.
    "lib/inyange/bundle.js",
    // Vendored from mapcn (shadcn registry), kept as upstream.
    "components/ui/map.tsx",
  ]),
]);

export default eslintConfig;
