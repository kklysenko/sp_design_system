const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entry = require('./entry.js'); //файл с точками входа

module.exports = {
    mode: "development", //режим сборки
    entry: entry, //объект с точками входа
    output: {
        path: path.join(__dirname, 'dist'), //общий путь для выходных файлов
        filename: "bundle.js" //в этом параметре мы индивидуально добавляем необходимую директорию перед именем файлов
    },
    watch: true, //Слежение за изменениями
    watchOptions: {
        ignored: /node_modules/, //исключения в слежении
        poll: 1000 //интервал обновления
    },
    devtool: "source-map", //Инструменты разработчика
    resolve: {
        alias: { //краткие имена путей для импортов
						styles: path.resolve(__dirname, 'src/scss'),
						fonts: path.resolve(__dirname, 'src/fonts'),
        },
        modules: ['node_modules', 'src'], //папки доступные для сканирования
    },
    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader']
    },
    module: { //Загрузчики
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']

            },
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']

            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false,
                        removeComments: false,
                        collapseWhitespace: false,
                        attrs: ['img:src']
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'url',
                    options: {
                        limit: 10000,
                        publicPath: '',
                        name: 'fonts/[name].[ext]'
                    }
                }
            },
             // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'example.html',
            template: './example.html'
        }),
    ],
    optimization: { //настройки оптимизации и минификации
        flagIncludedChunks: true,
        minimize: false,
        namedModules: true,
        namedChunks: true,
        mergeDuplicateChunks: true,
        removeEmptyChunks: true,
        removeAvailableModules: true,
        splitChunks: {
            name: 'index',
            chunks: 'all',
            minChunks: 2
        },
        noEmitOnErrors: true,
        concatenateModules: true
    },
    externals: [{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],

};
