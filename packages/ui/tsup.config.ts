import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Both CommonJS and ESM
  dts: true, // generate TypeScript .d.ts files
  sourcemap: true, // generate source maps for debugging
  clean: true, // clean dist/ before each build
  external: ["react", "react-dom"], // don't bundle React — it's a peerDep
  splitting: false, // disable splitting to avoid DTS build issues
  minify: false, // don't minify — consumers will do that
  shims: false, // no shims needed for ESM
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".js" : ".mjs",
      dts: ".d.ts",
    };
  },
});
