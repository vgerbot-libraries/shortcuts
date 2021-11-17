import 'zx/globals';
import path from 'path';

const cwd = process.cwd();
const pkg = require(path.resolve(cwd, 'package.json'));

await $`typedoc ./src --out docs --name ${pkg.name}`.pipe(process.stdout)

