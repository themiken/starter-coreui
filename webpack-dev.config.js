var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

var path = require('path');
var paths = {
    root: 'src/main/resources',
    appSrc: 'src/main/resources/assets/app',
    app: 'build/resources/main/assets/app',
    appDistPath: 'build/resources/main/assets/dist',
    scssSrc: 'src/main/resources/assets/scss/style.scss'
};

module.exports = {
    entry: {
        app: path.join(__dirname, paths.appSrc),
        style: path.join(__dirname, paths.scssSrc),
    },
    resolve: {
        root: [
            path.join(__dirname, paths.root)
        ],
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, paths.appDistPath),
        filename: "[name]-bundle.js"
    },
    plugins: [
        new ExtractTextPlugin("app-[name].css"),
        new LiveReloadPlugin({"appendScriptTag":true})
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ["babel-loader?cacheDirectory=true"],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader:  ExtractTextPlugin.extract(
                    "style",
                    "css!sass")
            },
            { test: /\.css$/, loader: "css-loader" },
            { test: /\.png$/, loader: "url-loader?limit=100000" }
        ]
    },
    watch : true
};
