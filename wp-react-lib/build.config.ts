import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    entries: [
        // default
        "./src/index",
        // mkdist builder transpiles file-to-file keeping original sources structure
        {
            builder: "mkdist",
            input: "./src",
            outDir: "./dist/esm",
            format: "esm",
        },
        {
            builder: "mkdist",
            input: "./src",
            outDir: "./dist/cjs",
            format: "cjs",
        }
    ],
    declaration: true,
})