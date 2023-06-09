import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import clear from "rollup-plugin-delete";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import svelte from "rollup-plugin-svelte";
import { swc } from "rollup-plugin-swc3";
import svelteConfig from "./svelte.config.js";

const isDev = process.env.NODE_ENV === "development";

export default {
    input: "src/main.ts",
    output: {
        name: "Ticit",
        file: "target/ticit.js",
        format: "iife",
    },
    watch: {
        include: ["src/**"],
        clearScreen: false,
    },
    plugins: [
        clear({ targets: "target/*", runOnce: true }),
        commonjs(),
        copy({
            targets: [
                { src: "assets", dest: "target" },
                { src: "public/*.html", dest: "target" },
            ],
        }),
        css({ output: "style.css" }),
        nodeResolve({ browser: true }),
        replace({
            preventAssignment: true,
            values: {
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            },
        }),
        svelte(svelteConfig),
        swc({ minify: !isDev }),
        isDev && serve({ contentBase: "target", port: "3000" }),
        isDev && livereload({ watch: "target", delay: 200, verbose: true }),
    ],
};
