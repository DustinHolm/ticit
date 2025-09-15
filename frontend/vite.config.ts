import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";

export default defineConfig({
    root: ".",
    plugins: [
        svelte({
            configFile: "./svelte.config.js",
            emitCss: true,
            include: "**/*.svelte",
        }),
        svelteTesting(),
    ],
    build: {
        outDir: "target",
    },
    server: {
        port: 3000,
    },
});
