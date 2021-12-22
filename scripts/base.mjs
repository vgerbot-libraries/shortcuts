import 'zx/globals';

process.env.FORCE_COLOR = 3;

const packageFile = path.resolve(process.cwd(), 'package.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const pkg = require(packageFile);

export const cwd = process.cwd();
