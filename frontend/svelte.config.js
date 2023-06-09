import autoPreprocess from "svelte-preprocess";

export default {
    emitCss: true,
    include: "src/**/*.svelte",
    preprocess: autoPreprocess(),
};
