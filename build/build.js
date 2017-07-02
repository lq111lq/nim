require('shelljs/global');

var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.config.js');
//baseWebpackConfig.output.publicPath = 'http://dc.trs.org.cn/scripts/screenindex/dist/';

var webpackConfig = merge(baseWebpackConfig, {
    devtool: '#eval-source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ]
//  plugins: [
//      new webpack.DefinePlugin({
//          'process.env': {
//              NODE_ENV: '"production"'
//          }
//      }),
//      new webpack.optimize.UglifyJsPlugin({
//          compress: {
//              warnings: false
//          }
//      })
//  ]
});

delete webpackConfig.devtool;

var assetsPath = path.resolve(__dirname, '../dist/');

rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', path.resolve(__dirname, '../static/'), assetsPath);
//cp('-R', path.resolve(__dirname, '../html/'), assetsPath);

webpack(webpackConfig, function(err, stats) {
    if(err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
});