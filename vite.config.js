import { globSync } from "glob";
import path, { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

const componentEntries = Object.fromEntries(
  globSync("src/components/*/index.js").map(filename => [
    // Transform e.g. src/components/LuckyButton/index.js -> components/LuckyButton
    `components/${path.basename(path.dirname(filename))}`,
    fileURLToPath(new URL(filename, import.meta.url))
  ])
);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*", "lib/**/*"],
      exclude: ["src/**/*.stories.*", "src/**/*.test.*"]
    })
  ],
  build: {
    lib: {
      entry: {
        index: "lib/index.js",
        ...componentEntries,
      },
      formats: ["es"]
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    },
    sourcemap: true,
    minify: false
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    }
  },
  test: {
    environment: "jsdom",
    mockReset: true
  }
});
