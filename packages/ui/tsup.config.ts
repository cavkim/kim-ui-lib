import { defineConfig } from "tsup";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: ["src/index.ts", "src/styles.d.ts", "src/styles/globals.css"],
  format: ["cjs", "esm"], // Both CommonJS and ESM
  dts: true, // generate TypeScript .d.ts files
  sourcemap: true, // generate source maps for debugging
  clean: true, // clean dist/ before each build
  external: ["react", "react-dom"], // don't bundle React — it's a peerDep
  splitting: false, // disable splitting to avoid DTS build issues
  minify: false, // don't minify — consumers will do that
  shims: false, // no shims needed for ESM
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      ".css": "copy",
    };
  },
  async onSuccess() {
    // Compile CSS with PostCSS after tsup builds
    const cssPath = join(__dirname, "src/styles/globals.css");
    const distCssPath = join(__dirname, "dist/styles/globals.css");

    try {
      const css = await fs.readFile(cssPath, "utf8");
      const result = await postcss([tailwindcss, autoprefixer]).process(css, {
        from: cssPath,
        to: distCssPath,
      });

      await fs.mkdir(dirname(distCssPath), { recursive: true });
      await fs.writeFile(distCssPath, result.css);
      console.log("✓ CSS compiled with Tailwind");
    } catch (error) {
      console.error("PostCSS compilation failed:", error);
    }
  },
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".js" : ".mjs",
      dts: ".d.ts",
    };
  },
});
