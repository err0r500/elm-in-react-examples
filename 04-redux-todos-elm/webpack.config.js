const path = require('path')

const PATHS = {
    build: path.join(__dirname, '..', 'public'),
    src: path.join(__dirname, 'src', 'index.js')
};

module.exports = {
    entry: [PATHS.src],
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                loader: 'elm-webpack-loader?verbose=true&warn=true'
            }
        ],
        noParse: /\.elm$/
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.elm']
    },
    devServer: {
        contentBase: PATHS.build
    }
};
