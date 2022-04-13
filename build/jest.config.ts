import path from 'path';

const packageName = path.basename(process.cwd());
const basedir = `<rootDir>/packages/${packageName}`;

export default {
    collectCoverage: true,
    collectCoverageFrom: [
        `${basedir}/src/**/*.ts`,
        '!<rootDir>/packages/core/src/common/{browser,createEvent,addKeyboardEventListener}.ts',
        '!<rootDir>/packages/core/src/foundation/KeyboardConstructorOptions.ts'
    ],
    coverageDirectory: `${basedir}/report/coverage/`,
    coveragePathIgnorePatterns: ['/__test__/', '/node_modules/'],
    coverageProvider: 'v8',
    coverageReporters: ['json', 'html', 'text-summary'],
    moduleFileExtensions: ['ts', 'js'],
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                outputPath: './report/test-report.html',
                pageTitle: 'Test Report'
            }
        ]
    ],
    testEnvironment: 'jsdom',
    testMatch: [`${basedir}/__test__/**/*.spec.ts`],
    transform: {
        '\\.tsx?$': [
            'rollup-jest',
            {
                configFile: path.resolve(__dirname, '../rollup.config.test.js')
            }
        ]
    },
};
