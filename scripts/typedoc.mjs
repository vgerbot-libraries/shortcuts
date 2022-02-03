import { pkg } from './base.mjs';

if (pkg.scripts && pkg.scripts.gendoc) {
    await $`cross-env NODE_ENV=production npm run gendoc`;
} else {
    await $`typedoc ./src --out docs --name ${pkg.name}`.pipe(process.stdout);
}
