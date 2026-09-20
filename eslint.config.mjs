import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * ESLint flat config.
 *
 * `eslint-config-next` ships native flat configs, so they are imported and
 * spread directly. An earlier version of this file routed them through
 * `@eslint/eslintrc`'s FlatCompat layer, which crashed with "Converting
 * circular structure to JSON" -- the compatibility shim cannot serialise the
 * modern config's plugin graph. If you see that error anywhere, it is almost
 * always a flat config being pushed through the legacy adapter.
 *
 * - core-web-vitals: Next.js, React and React Hooks rules, with the ones that
 *   affect Core Web Vitals raised from warnings to errors.
 * - typescript: typescript-eslint's recommended rules on top.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Build output and generated files -- nothing here is ours to lint.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
