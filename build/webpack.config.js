var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    entry: {
        index: ['./examples/index.js'],
        vendor: ['three','element-ui']
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: ''
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                // vue-loader options go here
            }
        }, {
            test: /\.(png|jpg|svg)$/,
            loader: 'url?limit=8192',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /\.(eot|svg|gif|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file?limit=8192',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /\.css$/,
            loader: 'style/useable!css'
        }, {
            test: /\.less$/,
            loader: "style/useable!css!less"
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src')
        }
    },
    plugins: [new HtmlWebpackPlugin({
        chunks: ['vendor', 'common', 'index'],
        filename: 'index.html',
        template: 'examples/index.html'
    })]
}

//var examples = ['test'];
//examples.forEach(function(name) {
//  config.entry[name] = ['./examples/' + name + '/index.js'];
//  config.plugins.push(new HtmlWebpackPlugin({
//      chunks: ['vender', 'common', name],
//      filename: name + '.html',
//      template: 'examples/' + name + '/index.html'
//  }));
//})

module.exports = config;