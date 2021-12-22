import { package as pkg } from './base.mjs';

if (pkg.scripts && pkg.scripts.test) {
    await $`cross-env NODE_ENV=test npm t`;
} else {
    await $`cross-env NODE_ENV=test jest -c ../../jest.config.js`.pipe(
        process.stdout
    );
}
