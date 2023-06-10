import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.svelte"],
    framework: "@storybook/svelte-vite",
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-a11y",
        "@storybook/addon-console",
        "@storybook/addon-storysource",
        "@storybook/addon-svelte-csf",
    ],
    docs: {
        autodocs: true,
    },
};

export default config;
