const conf = require('./webpack.shared');

let dev = Object.assign(conf('development'), {
    devtool: 'source-map',
    devServer: {
        contentBase: 'build/',
        compress: true,
        port: 8080,
        index: 'views/index.html',
        overlay: true
    }
});


module.exports = dev;