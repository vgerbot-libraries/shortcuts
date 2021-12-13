import 'zx/globals';
import coverage from 'istanbul-lib-coverage';
import { createContext } from 'istanbul-lib-report';
import { create } from 'istanbul-reports';
import { createSourceMapStore } from 'istanbul-lib-source-maps';

const packages = fs.readdirSync(path.resolve(process.cwd(), 'packages'));

const coverageJSONFiles = packages.map(it =>
    path.resolve(
        __dirname,
        '../packages',
        it,
        'report/coverage/coverage-final.json'
    )
);

const store = createSourceMapStore({
    baseDir: path.resolve(process.cwd(), 'coverage')
});

const coverageMap = coverage.createCoverageMap();

for (const cfile of coverageJSONFiles) {
    const exists = await fs.pathExists(cfile);
    if (!exists) {
        continue;
    }
    const content = await fs.readJSON(cfile);
    coverageMap.merge(content);
}

const transformedCoverageMap = await store.transformCoverage(coverageMap);

const context = createContext({
    dir: path.resolve(process.cwd(), 'coverage'),
    coverageMap: transformedCoverageMap
});

const tree = context.getTree('pkg');

const cobertura_report = create('cobertura', {
    skipEmpty: false,
    skipFull: false
});

tree.visit(cobertura_report, context);

const html_report = create('html', {
    skipEmpty: false,
    skipFull: false
});

tree.visit(html_report, context);
