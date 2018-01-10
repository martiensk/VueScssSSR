const conf = require('./webpack.shared');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

let base = conf('production', true);

const fin = Object.assign(base, {
    entry: './scripts/entry.server.js',
    target: 'node',
    output: {
        filename: 'js/ssr.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: '/\.css$/'
    }),
    plugins: [
        new VueSSRServerPlugin()
    ]
});

module.exports = fin;