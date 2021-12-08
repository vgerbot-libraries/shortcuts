import path from 'path';

const packageName = path.basename(process.cwd());
const basedir = `<rootDir>/packages/${packageName}`;

export default {
    transform: {
        '\\.tsx?$': [
            'rollup-jest',
            {
                configFile: path.resolve(__dirname, '../rollup.config.test.js')
            }
        ]
    },
    testEnvironment: 'jsdom',
    testMatch: [`${basedir}/__tests__/**/*.spec.ts`],
    moduleFileExtensions: ['ts', 'js'],
    collectCoverage: true,
    collectCoverageFrom: [`${basedir}/src/**/*.ts`],
    coveragePathIgnorePatterns: ['/__test__/', '/node_modules/'],
    coverageProvider: 'v8',
    coverageDirectory: `${basedir}/report/coverage/`,
    coverageReporters: ['json', 'html', 'text-summary'],
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'Test Report',
                outputPath: './report/test-report.html'
            }
        ]
    ]
};
