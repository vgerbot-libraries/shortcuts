import rollupConfig from './rollup.config';

delete rollupConfig.input;
rollupConfig.output = {
    sourcemap: true
};

export default rollupConfig;
