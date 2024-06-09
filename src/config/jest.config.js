const config = {
    rootDir: '../__tests__/tests',
    collectCoverage: true,
    coverageDirectory: '../coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/',
        'app.js',
    ],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90
        }
    }
}
module.exports = config