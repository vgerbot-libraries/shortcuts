import 'zx/globals';

process.env.FORCE_COLOR = 3;

export async function runLint(argv = '') {
    await $`eslint ${argv} --fix scripts/**/*.mjs`;

    await $`lerna exec --scope=@shortcuts/angular-root -- eslint  ${argv} projects/**/*.ts`;

    await $`lerna exec --ignore @shortcuts/angular-root -- eslint  ${argv} {src,__test__}/**/*.ts`;
}
