import 'zx/globals';
import path from 'path';

process.env.FORCE_COLOR = 3;

const cwd = process.cwd();
const pkg = require(path.resolve(cwd, 'package.json'));

await $`typedoc ./src --out docs --name ${pkg.name}`.pipe(process.stdout)

