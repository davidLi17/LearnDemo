const { validate } = require('schema-utils'); // 引入 schema-utils 库中的 validate 函数，用于验证选项

// 定义选项的验证模式
const schema = {
    type: 'object', // 指定验证模式为对象
    properties: { // 定义对象属性
        search: { // search 属性
            type: 'string' // 指定 search 属性的类型为字符串
        },
        replace: { // replace 属性
            type: 'string' // 指定 replace 属性的类型为字符串
        }
    },
    additionalProperties: false // 不允许有额外的属性
};

/**
 * @type {import("webpack").LoaderDefinitionFunction} // 使用 JSDoc 注释指定函数类型为 Webpack 的 Loader 定义函数
 */
module.exports = function (source) { // 导出一个函数，接收源代码作为参数
    // 在 Webpack 5 中直接使用 this.getOptions() 获取 loader 的配置选项
    const options = this.getOptions();

    // 使用 validate 函数验证 options 是否符合定义的 schema
    validate(schema, options, {
        name: 'Replace Loader' // 指定验证器的名称
    });

    // 使用正则表达式执行替换操作，将 source 中所有匹配 options.search 的部分替换为 options.replace
    return source.replace(new RegExp(options.search, 'g'), options.replace);
};