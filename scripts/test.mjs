import { pkg } from './base.mjs';

if (process.env.ENV === 'DEBUG') {
    if (pkg.scripts && pkg.scripts['test:debug']) {
        await $`cross-env NODE_ENV=test npm test:debug`;
    } else {
        await $`cross-env NODE_ENV=test \
        node --inspect-brk ../../node_modules/.bin/jest \
        --runInBand -c ../../jest.config.js --passWithNoTests`.pipe(
            process.stdout
        );
    }
} else {
    if (pkg.scripts && pkg.scripts.test) {
        await $`cross-env NODE_ENV=test npm t`;
    } else {
        await $`cross-env NODE_ENV=test jest -c ../../jest.config.js --passWithNoTests`.pipe(
            process.stdout
        );
    }
}
