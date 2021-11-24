import path from 'path';

export default {
    transform: {
        '\\.tsx?$': ['rollup-jest', {
            configFile: path.resolve(__dirname, '../rollup.config.test.js')
        }]
    },
    testEnvironment: 'node',// dom
    testMatch: ['**/__tests__/**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'js'],
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
    coverageDirectory: './report/coverage',
    coverageReporters: ['cobertura', 'html', 'text-summary'],
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