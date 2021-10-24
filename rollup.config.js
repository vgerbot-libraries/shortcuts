const pkg = require('./package.json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');


const outputConfig = [
    [pkg.browser, 'umd'],
    [pkg.module, 'es'],
    [pkg.main, 'cjs']
].map(confs => createOutputConfig(...confs));

const rollupConfig = {
    output: outputConfig,
    plugins: [
        nodeResolve({
            mainFields: ['main', 'browser', 'jsnext']
        }),
        commonjs({
            include: 'node_modules/**',
            ignore: [],
            sourcemap: false
        }),
        typescript(),
        terser()
    ]
};

if(process.env.NODE_ENV !== 'test') {
    rollupConfig.input = 'src/index.ts';
}

module.exports = rollupConfig;

function createOutputConfig(file, format, cfg = {}) {
    return Object.assign(
        {
            file,
            format,
            sourcemap: true,
            name: pkg.library,
            exports: 'named'
        },
        cfg || {}
    );
}