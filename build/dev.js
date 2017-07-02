var express = require("express");
var webpack = require("webpack");
var merge = require('webpack-merge');
var baseWebpackConfig = require("./webpack.config");

Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name].push('./build/dev-client');
});

var webpackConfig = merge(baseWebpackConfig, {
    devtool: '#eval-source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling 
        // new webpack.optimize.OccurrenceOrderPlugin(), 
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
});

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/dev',
    stats: {
        colors: true
    }
})
var hotMiddleware = require("webpack-hot-middleware")(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);

app.use('/dev/static', express.static('./static'));

app.listen(3000, function() {
    console.log("Dev on port 3000!");
});