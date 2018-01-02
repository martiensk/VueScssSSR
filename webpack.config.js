const path = require('path');
const webpack = require('webpack')
const vue = require('vue');
const vuex = require('vuex');
const entries = require('./entries.webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: entries.javascript,
    output: {
        filename: 'js/[chunkhash].js',
        path: path.resolve(__dirname, 'build'),
    },
    devtool: 'source-map',
    devServer: {
        //contentBase: 'images/',
        //publicPath: '/',
        compress: true,
        port: 8080,
        index: 'views/index.html',
        overlay: true
        //hot: true
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|vue)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: true,
                    fix: true
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader?presets[]=env'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    }
                }
            },
            {
                test: /\.scss$/,
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                enforce: 'post',
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',

                        options: {
                            sourceMap: true
                        }
                    }
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash].[ext]',
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: 'global',
            minChunks: Infinity
        }),
        new StyleLintPlugin({
            'fix': false
        }),
        new ExtractTextPlugin({
            publicPath: 'css/',
            filename: '[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            title: 'Test',
            filename: 'views/index.html',
            template: './views/index.html'
        }),
        new CleanWebpackPlugin(['build']),
    ]
};