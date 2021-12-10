import { OutputOptions, RollupOptions } from 'rollup';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// const { nodeResolve } = require('@rollup/plugin-node-resolve');
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(path.resolve(process.cwd(), 'package.json'));

const inputFile = path.resolve(process.cwd(), 'src/index.ts');

const outputConfig = [
    [pkg.browser, 'umd'],
    [pkg.module, 'es'],
    [pkg.main, 'cjs']
].map(confs => createOutputConfig(confs[0], confs[1]));

const rollupConfig: RollupOptions = {
    output: outputConfig,
    input: inputFile,
    plugins: [
        nodeResolve({
            mainFields: ['module', 'browser', 'main']
        }),
        commonjs({
            include: 'node_modules/**',
            ignore: [],
            sourceMap: false
        }),
        typescript(),
        terser()
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
            file: path.resolve(process.cwd(), file),
            format,
            sourcemap: true,
            name: pkg.library,
            exports: 'named'
        },
        cfg || {}
    );
}
