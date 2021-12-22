import { pkg, cwd } from './base.mjs';

console.info('cd', cwd);

if (pkg.scripts && pkg.scripts.build) {
    await $`cross-env NODE_ENV=production npm run build`;
} else {
    await $`cross-env NODE_ENV=production rollup -c ../../rollup.config.js`;
}
