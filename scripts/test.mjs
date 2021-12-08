import 'zx/globals';

process.env.FORCE_COLOR = 3;
console.log(`cd ${process.cwd()}`);
await $`cross-env NODE_ENV=test jest -c ../../jest.config.js`.pipe(process.stdout)
