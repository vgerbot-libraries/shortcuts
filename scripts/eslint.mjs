import 'zx/globals';

process.env.FORCE_COLOR = 3;

export async function runLint(argv = '') {
    await $`eslint ${argv} --fix scripts/**/*.mjs`;

    await $`lerna exec -- eslint  ${argv} {src,__test__}/**/*.ts`;
}
