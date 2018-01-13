const path = require('path');
const webpack = require('webpack')
const vue = require('vue');
const vuex = require('vuex');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/* const WorkboxPlugin = require('workbox-webpack-plugin'); */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const criticalCSS = new ExtractTextPlugin({
    filename: 'css/critical.css',
    allChunks: true
});
const mainCSS = new ExtractTextPlugin({
    filename: 'css/[contenthash].css',
    allChunks: true
});

/**
 * @param {string} env The node environment as a string.
 * @returns {object} A webpack configuration based on the supplied environment string.
 */
module.exports = (env, ssr = false) => {
    return {
        entry: ['core-js/fn/promise', 'vue', 'vuex', './scripts/entry.client.js'],
        output: {
            filename: env === 'development' ? 'js/[name].js' : 'js/[chunkhash].js',
            path: env === 'development' ? path.resolve(__dirname, 'build') : path.resolve(__dirname, 'dist')
        },
        module: {
            rules: getRules(env)
        },
        resolve: {
            extensions: ['.js', '.vue', '.scss']
        },
        plugins: getPlugins(env, ssr)
    }
};

const getRules = (env) => {
    let rules = [
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
                sourceMap: env === 'development' ? true : false
            }
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
        }
    ];

    let devRules = [
        {
            enforce: 'post',
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
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
        }
    ]

    let prodRules = [
        {
            enforce: 'post',
            test: /critical.scss/,
            loader: criticalCSS.extract({
                use: [
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            })
        },
        {
            enforce: 'post',
            test: /main.scss/,
            loader: mainCSS.extract({
                use: [
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            })
        }
    ]

    return env === 'development' ? rules.concat(devRules) : rules.concat(prodRules);
}

function getPlugins(env, ssr) {
    let pluginPack = [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        }),
        new StyleLintPlugin({
            'fix': env === 'development' ? false : true
        }),
        new HtmlWebpackPlugin({
            title: 'Coming Soon',
            filename: 'views/index.html',
            template: './views/index.html',
            inject: false,
            minify: {
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            }
        })
    ]

    if (env === 'development') {
        pluginPack.push(new CleanWebpackPlugin(['build']));
    } else {
        ssr && pluginPack.push(new CleanWebpackPlugin(['dist']));
        pluginPack.push(new UglifyJsPlugin({
            uglifyOptions: {
                ie8: false,
                output: {
                    comments: false
                }
            }
        }));
        pluginPack.push(criticalCSS);
        pluginPack.push(mainCSS);
        pluginPack.push(new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }));
        pluginPack.push(new StyleExtHtmlWebpackPlugin('css/critical.css'));
        !ssr && pluginPack.push(new BundleAnalyzerPlugin());
    }

    return pluginPack;
}