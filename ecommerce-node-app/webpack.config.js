module.exports = {
    module: {
        rules: [{
            test: /\.ejs$/,
            enforce: 'pre',
            use: ['source-map-loader']
        }]
    },
    ignoreWarnings: [/Failed to parse source map/]
}