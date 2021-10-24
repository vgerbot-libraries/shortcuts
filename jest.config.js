module.exports = {
    transform: {
        '\\.[jt]sx?': ['rollup-jest', {
            configFile: './rollup.config.js',
            output: {
                sourceMap: true
            }
        }]
    },
    testEnvironment: 'node',// dom
    testMatch: ['**/__tests__/**/*.spec.ts'],
    collectCoverage: true,
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