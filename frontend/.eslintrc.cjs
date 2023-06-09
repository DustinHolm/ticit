module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        jest: true,
        node: true,
    },
    ignorePatterns: [".eslintrc.cjs", "*.config.js"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
        "plugin:jest-dom/recommended",
        "plugin:testing-library/dom",
        "plugin:svelte/recommended",
        "plugin:svelte/prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        extraFileExtensions: [".svelte"],
        project: ["./tsconfig.json"],
        sourceType: "module",
        tsconfigRootDir: __dirname,
    },
    plugins: ["@typescript-eslint", "jest", "jest-dom", "testing-library"],
    overrides: [
        {
            files: ["*.svelte"],
            parser: "svelte-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
            },
        },
    ],
    rules: {
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
