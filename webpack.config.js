const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const inProduction = process.env.NODE_ENV === 'production'

const getFilename = (name, extension) => {
    if (inProduction) {
        return name + '.' + extension
    }
    return name + '.dev.' + extension
}

const webpackConfig = {
    entry: {
        'survey': path.join(__dirname, 'src/js', 'enketo.webform.js')
    },
    output: {
        path: path.join(__dirname, 'www/build/js'),
        filename: getFilename('[name]', 'js'),
        libraryTarget: 'umd',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: getFilename('../../survey', 'html'),
            template: __dirname + '/src/html/survey.html',
        }),
    ],
    resolve: {
        mainFields: ['browser', 'main', 'module']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../../fonts/'
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: '../images/'
                    }
                }]
            }
        ]
    },
    optimization: {
        minimize: inProduction
    }
}

module.exports = webpackConfig