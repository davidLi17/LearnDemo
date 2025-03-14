/** @typedef {import("webpack").Configuration} WebpackConfig */
/** @typedef {import("webpack-dev-server").Configuration} DevServerConfig */

const FileListPlugin = require("./webpackPlugin/file-list-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const ConsoleLogOnBuildWebpackPlugin = require("./webpackPlugin/ConsoleLogOnBuildWebpackPlugin");
/**
 * @type {WebpackConfig & { devServer: DevServerConfig }}
 */
const config = {
    mode: "production",
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: [
                    {
                        loader: path.join(__dirname, './webpackLoader/my-uppercase-loader.js')
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: path.resolve('./webpackLoader/my-replace-loader.js'),
                        options: {
                            search: 'console.log',
                            replace: 'alert'
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
        new FileListPlugin({
            filename: `filelist.md` // 使用时间戳确保文件名唯一
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new ConsoleLogOnBuildWebpackPlugin({
            include: ['log', 'error']
        }),
        new HtmlWebpackPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: '8088',
        historyApiFallback: true,
        open: true
    },
    optimization: {
        // usedExports: true,// 标记未使用的导出
        // minimize: true, // 删除未使用的代码
        // minimizer: [
        //     new TerserPlugin(),
        //     new CssMinimizerPlugin()
        // ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: { // 第三方库单独打包
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};

module.exports = config;