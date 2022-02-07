import 'zx/globals';

process.env.FORCE_COLOR = 3;

export async function runLint(argv = '') {
    await $`eslint ${argv} scripts/**/*.mjs`;

    await $`lerna exec --scope=@shortcuts/angular-root -- eslint  ${argv} projects/**/*.ts`;
    // eslint-disable-next-line max-len
    await $`lerna exec --ignore @shortcuts/angular-root --ignore @shortcuts/example-* -- eslint  ${argv} {src,__test__}/**/*.ts`;
}
