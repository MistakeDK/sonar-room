import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  clearScreen: false,
  resolve: {
    alias: [
      {
        find: "@sonar-room/ui/styles.css",
        replacement: fileURLToPath(
          new URL("../../libs/ui/src/styles.css", import.meta.url),
        ),
      },
      {
        find: "@sonar-room/ui",
        replacement: fileURLToPath(
          new URL("../../libs/ui/src/index.ts", import.meta.url),
        ),
      },
      {
        find: "@sonar-room/features/app-shell",
        replacement: fileURLToPath(
          new URL(
            "../../libs/features/app-shell/src/index.ts",
            import.meta.url,
          ),
        ),
      },
      {
        find: "@sonar-room/features/music",
        replacement: fileURLToPath(
          new URL("../../libs/features/music/src/index.ts", import.meta.url),
        ),
      },
      {
        find: "@sonar-room/features/playback",
        replacement: fileURLToPath(
          new URL("../../libs/features/playback/src/index.ts", import.meta.url),
        ),
      },      {
        find: "@sonar-room/features/provider-management",
        replacement: fileURLToPath(
          new URL(
            "../../libs/features/provider-management/src/index.ts",
            import.meta.url,
          ),
        ),
      },
    ],
  },
  server: {
    host: "127.0.0.1",
    port: 1420,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: process.env.TAURI_PLATFORM === "windows" ? "chrome105" : "safari13",
    minify: !process.env.TAURI_DEBUG,
    sourcemap: Boolean(process.env.TAURI_DEBUG),
    outDir: "dist",
  },
});
