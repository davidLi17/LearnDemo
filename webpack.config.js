const dotenv = require('dotenv');
const path = require('path');

// 根据命令行参数加载对应的环境变量文件
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.join(__dirname, envFile) });

/** @typedef {import("webpack").Configuration} WebpackConfig */
/** @typedef {import("webpack-dev-server").Configuration} DevServerConfig */

//Plugins
const FileListPlugin = require("./webpackPlugin/file-list-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const RemoveConsolePlugin = require("./webpackPlugin/RemoveConsolePlugin");
const LogPlugin = require("./webpackPlugin/LogPlugin");

// Loaders
const myReplaceLoader = path.resolve(__dirname, './webpackLoader/my-replace-loader.js')
const myUppercaseLoader = path.resolve(__dirname, './webpackLoader/my-uppercase-loader.js')
const markdownLoader = path.resolve(__dirname, './webpackLoader/markdown-loader.js')
/**
 * @type {WebpackConfig & { devServer: DevServerConfig }}
 */
const config = {
    mode: process.env.NODE_ENV,
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[contenthash].js', // 修改这里，使用 contenthash 确保文件名唯一
        clean: true // 构建前清理 dist 目录
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    "babel-loader",
                    markdownLoader,
                ]
            },
            {
                test: /\.txt$/,
                use: [
                    {
                        loader: myUppercaseLoader,
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: myReplaceLoader,
                        options: {
                            search: 'var',
                            replace: 'let'
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ]
            }
        ],
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
        name: 'webpack-cache',
        version: "1.1",
        maxAge: 1000 * 60 * 60// 1小时
    },
    plugins: [
        new ProgressBarPlugin({
            format: `  构建中 [:bar] ${chalk.green.bold(':percent')} (:elapsed 秒)`,
            complete: chalk.green.bold('■'),
            incomplete: chalk.white.bold('□'),
            width: 50
        }),
        new LogPlugin(),
        new RemoveConsolePlugin({
            include: ['log', "info"]
        }),
        new FileListPlugin({
            filename: `filelist.md` // 使用时间戳确保文件名唯一
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: process.env.PORT || '8088',
        historyApiFallback: true,
        open: true
    },
    optimization: {
        usedExports: true,
        minimize: process.env.MINIMIZE === 'true',
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: { // 第三方库单独打包
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    filename: 'vendor.[contenthash].js' // 为第三方库指定不同的文件名
                }
            }
        }
    },
    // devtool: process.env.NODE_ENV === 'development'
    //     ? 'source-map'  // 开发环境使用 source-map
    //     : false,        // 生产环境不生成 source map
};

module.exports = config;