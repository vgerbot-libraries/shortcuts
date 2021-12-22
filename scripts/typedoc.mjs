import { pkg } from './base.mjs';

await $`typedoc ./src --out docs --name ${pkg.name}`.pipe(process.stdout);
