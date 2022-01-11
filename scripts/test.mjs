import { pkg } from './base.mjs';

if (pkg.scripts && pkg.scripts.test) {
    await $`cross-env NODE_ENV=test npm t`;
} else {
    await $`cross-env NODE_ENV=test jest -c ../../jest.config.js --passWithNoTests`.pipe(
        process.stdout
    );
}
