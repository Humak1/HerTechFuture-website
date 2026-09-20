import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// `FlatCompat` lets us use Next's shareable config (written in the older
// "extends" format) from a modern flat config file.
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  // `core-web-vitals` adds accessibility and performance rules on top of the
  // base Next rules -- e.g. it will warn if an <img> is missing alt text.
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "node_modules/**", "out/**"],
  },
];

export default eslintConfig;
