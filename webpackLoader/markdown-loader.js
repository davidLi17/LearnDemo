// markdown-loader.js
/**
 * @module marked
 * @description A library for parsing Markdown text into HTML.
 * @requires marked
 * @see {@link https://marked.js.org/}
 * @example
 * const marked = require('marked');
 * const html = marked('# Hello World');
 * // Returns: <h1>Hello World</h1>
 */
const { marked } = require('marked'); // 使用解构赋值获取 marked 函数

module.exports = function (source) {
    console.log("webpackLoader/markdown-loader.js source::", source); // 输出源代码
    const callback = this.async(); // 获取异步回调函数
    setTimeout(() => {
        const html = marked(source);
        callback(null, `module.exports = ${JSON.stringify(html)};`); // 第一个参数是错误，第二个是结果
    }, 1000);
};