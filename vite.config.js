import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

// Keep source photos in Git; publish only the optimized image library.
function optimizedPublicAssets() {
  let projectRoot;
  let outputDirectory;
  return {
    name: "optimized-public-assets",
    apply: "build",
    configResolved(config) {
      projectRoot = config.root;
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      await mkdir(outputDirectory, { recursive: true });
      await cp(resolve(projectRoot, "public"), outputDirectory, {
        recursive: true,
        filter: (source) =>
          source !== resolve(projectRoot, "public/images/goc"),
      });
    },
  };
}
export default defineConfig({
  plugins: [react(), tailwindcss(), optimizedPublicAssets()],
  build: { copyPublicDir: false },
});
