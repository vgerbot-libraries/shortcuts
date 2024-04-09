import { OutputOptions, RollupOptions } from 'rollup';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// const { nodeResolve } = require('@rollup/plugin-node-resolve');
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(path.resolve(process.cwd(), 'package.json'));

const inputFile = path.resolve(process.cwd(), 'src/index.ts');

const rollupConfig = [
    [pkg.browser, 'umd'],
    [
        pkg.unpkg,
        'umd',
        {
            plugins: [terser()]
        } as OutputOptions,
        {
            external: []
        }
    ],
    [
        pkg.module,
        'esm',
        {
            preferConst: true
        }
    ],
    [pkg.main, 'cjs']
]
    .filter(([type]) => !!type)
    .map(confs => {
        const output = createOutputConfig(confs[0], confs[1], confs[2]);
        const baseConfig = {
            external: /node_modules/,
            input: inputFile,
            output,
            plugins: [
                nodeResolve({
                    extensions: ['ts', 'tsx', 'js'],
                    mainFields: ['module', 'browser', 'main']
                }),
                commonjs({
                    include: 'node_modules/**',
                    sourceMap: false
                }),
                typescript()
            ]
        };
        return Object.assign(baseConfig, confs[3] || {}) as RollupOptions;
    });

export default rollupConfig;

function createOutputConfig(
    file: string,
    format: string,
    cfg: OutputOptions = {}
): OutputOptions {
    const year = new Date().getFullYear();
    return Object.assign(
        {
            banner: `// ${pkg.name} v${pkg.version} Copyright (c) ${year} ${pkg.author}`,
            exports: 'named',
            file: path.resolve(process.cwd(), file),
            format,
            name: pkg.library,
            sourcemap: true
        },
        cfg || {}
    );
}
