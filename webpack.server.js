const conf = require('./webpack.shared');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

let base = conf('production');

base.entry = './scripts/entry.server.js';
base.output.filename = 'js/[name].js';

const fin = Object.assign(base, {
    target: 'node',
    output: {
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: '/\.css$/'
    }),
    plugins: [
        VueSSRServerPlugin()
    ]
});

module.exports = fin;