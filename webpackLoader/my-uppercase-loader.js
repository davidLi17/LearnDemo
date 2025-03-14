// 一个简单的loader，把所有文本转成大写
module.exports = function (source) {
    console.warn("webpackLoader/my-uppercase-loader.js source::", source);
    // source是输入的文件内容
    const transformedSource = source.toUpperCase(); // 返回转换后的内容
    console.warn("Transformed source::", transformedSource);
    // 将转换后的内容包装成 JavaScript 模块
    return `module.exports = ${JSON.stringify(transformedSource)}`;
};