const path = require('path');
const webpack = require('webpack')
const vue = require('vue');
const vuex = require('vuex');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * @param {string} env The node environment as a string.
 * @returns {object} A webpack configuration based on the supplied environment string.
 */
module.exports = (env) => {
    return { 
        entry: ['core-js/fn/promise', 'vue', 'vuex', './scripts/entry.js'],
        output: {
            filename: env === 'development' ? 'js/script.js' : 'js/[chunkhash].js',
            path: env === 'development' ? path.resolve(__dirname, 'build') : path.resolve(__dirname, 'dist')
        },
        module: {
            rules: getRules(env)
        },
        resolve: {
            extensions: ['.js', '.vue', '.scss']
        },
        plugins: getPlugins(env)
    }
};

const getRules = (env) => {
    let rules = [{
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
            sourceMap: env === 'development' ? true : false
        }
    },
    {
        enforce: 'post',
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
            use: [{
                loader: 'css-loader',
                options: {
                    sourceMap: env === 'development' ? true : false
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: env === 'development' ? true : false
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
                name: env === 'development' ? '[name].[ext]' : '[hash].[ext]',
                outputPath: 'images/',
                publicPath: '/'
            }
        }]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: env === 'development' ? '[name].[ext]' : '[hash].[ext]',
                outputPath: 'fonts/',
                publicPath: '/'
            }
        }]
    },
    {
        test: /\.html$/,
        use: [{
            loader: 'html-loader',
            options: {
                minimize: env === 'development' ? false : true
            }
        }],
    }];

    return rules;
}

function getPlugins(env){
    let pluginPack = [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        }),
        new StyleLintPlugin({
            'fix': env === 'development' ? false : true
        }),
        new ExtractTextPlugin({
            filename: env === 'development' ? 'css/style.css' : 'css/[contenthash].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'Test',
            filename: 'views/index.html',
            template: './views/index.html'
        })
    ]

    if(env === 'development') {
        pluginPack.push(new CleanWebpackPlugin(['build']));
    } else {
        pluginPack.push(new CleanWebpackPlugin(['dist']));
        pluginPack.push(new UglifyJsPlugin({
            uglifyOptions: {
                ie8: false,
                output: {
                    comments: false
                }
            }
        }));
        pluginPack.push(new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }));
    }

    return pluginPack;
}