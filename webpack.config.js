const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        'survey': path.join(__dirname, 'src/js', 'enketo.webform.js')
    },
    output: {
        path: path.join(__dirname, 'www/build/js'),
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../../survey.html',
            template: __dirname + '/src/html/survey.html',
        }),
    ],
    module: {
        rules: [
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
                        outputPath: '../fonts/'
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
    }
}