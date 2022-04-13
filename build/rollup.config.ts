import { OutputOptions, RollupOptions } from 'rollup';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// const { nodeResolve } = require('@rollup/plugin-node-resolve');
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(path.resolve(process.cwd(), 'package.json'));

const inputFile = path.resolve(process.cwd(), 'src/index.ts');

const outputConfig = [
    [pkg.browser, 'umd'],
    [pkg.module, 'es'],
    [pkg.main, 'cjs']
]
    .filter(([type]) => !!type)
    .map(confs => createOutputConfig(confs[0], confs[1]));

const rollupConfig: RollupOptions = {
    external: /node_modules|@shortcuts/,
    input: inputFile,
    output: outputConfig,
    plugins: [
        nodeResolve({
            mainFields: ['module', 'browser', 'main']
        }),
        commonjs({
            ignore: [],
            include: 'node_modules/**',
            sourceMap: false
        }),
        typescript()
    ]
};

export default rollupConfig;

function createOutputConfig(
    file: string,
    format: string,
    cfg: OutputOptions = {}
): OutputOptions {
    return Object.assign(
        {
            exports: 'named',
            file: path.resolve(process.cwd(), file),
            format,
            name: pkg.library,
            sourcemap: true
        },
        cfg || {}
    );
}
