import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
    root: ".",
    plugins: [
        svelte({
            configFile: "./svelte.config.js",
            emitCss: true,
            include: "**/*.svelte",
        }),
    ],
    build: {
        outDir: "target",
    },
    server: {
        port: 3000,
    },
    test: {
        environment: "jsdom",
        globals: true,
        include: ["./tests/**/*.test.ts"],
        restoreMocks: true,
        setupFiles: "./tests/test-setup.ts",
    },
});
