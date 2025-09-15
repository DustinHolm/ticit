import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.svelte"],
    addons: ["@storybook/addon-svelte-csf"],
    framework: {
        name: "@storybook/svelte-vite",
        options: {},
    },
};
export default config;
