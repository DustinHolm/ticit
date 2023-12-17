import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";
import { mergeConfig } from "vite";

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: "jsdom",
            globals: true,
            include: ["./tests/**/*.test.ts"],
            restoreMocks: true,
            setupFiles: "./tests/test-setup.ts",
        },
    }),
);
