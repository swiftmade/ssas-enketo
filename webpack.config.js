const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')

const inProduction = process.env.NODE_ENV === 'production'

const getFilename = (name, extension) => {
    if (inProduction) {
        return name + '.' + extension
    }
    return name + '.dev.' + extension
}

const webpackConfig = {
    entry: {
        polyfill: 'babel-polyfill',
        'survey': path.join(__dirname, 'src/js', 'survey'),
        'submissions': path.join(__dirname, 'src/js', 'submissions'),
    },
    output: {
        path: path.join(__dirname, 'www/build/js'),
        filename: getFilename('[name]', 'js'),
        libraryTarget: 'umd',
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            excludeAssets: /submissions/,
            filename: getFilename('../../survey', 'html'),
            template: __dirname + '/src/html/survey.html',
        }),
        new HtmlWebpackPlugin({
            hash: true,
            excludeAssets: /survey/,
            filename: getFilename('../../submissions', 'html'),
            template: __dirname + '/src/html/submissions.html',
        }),
        new HtmlWebpackExcludeAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: getFilename('../css/[name]', 'css'),
            chunkFilename: getFilename('../css/[name]', 'css'),
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
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
        minimize: inProduction,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    mangle: false,
                },
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}


if (inProduction) {
    webpackConfig.optimization.runtimeChunk = 'single'
    webpackConfig.optimization.splitChunks = {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all'
         }
       }
    }
}

module.exports = webpackConfig