/**
 * MyExamplePlugin - 一个用于演示Webpack插件开发的示例插件类
 * @class
 * @classdesc 这个插件展示了如何监听webpack编译过程中的各种钩子，并进行相应的处理
 * 
 * @param {Object} [options={}] - 插件配置选项
 * @param {string} [options.anyOption] - 任何可选的配置参数
 * 
 * @property {Object} options - 存储插件配置选项
 * 
 * @example
 * // 使用示例
 * const plugin = new MyExamplePlugin({
 *   // 配置选项
 * });
 * 
 * @method apply
 * @param {import('webpack').Compiler} compiler - Webpack 编译器实例
 * @description 插件的主要入口方法，webpack会调用插件实例的apply方法给插件实例传入compiler对象
 * 
 * @listens compiler.hooks.compilation - 监听编译创建事件
 * @listens compilation.hooks.optimize - 监听资源优化事件
 * @listens compiler.hooks.emit - 监听资源输出事件
 * 
 * @throws {Error} 可能在处理过程中抛出错误
 * 
 * @since 1.0.0
 * @author davidLi317
 * @version 1.0.0
 */
class MyExamplePlugin {
    constructor(options) {
        this.options = options || {};
    }

    apply(compiler) {
        // 监听compilation钩子
        compiler.hooks.compilation.tap('MyExamplePlugin', (compilation) => {
            console.log('The compiler is starting a new compilation...');

            // 监听compilation的optimize钩子
            compilation.hooks.optimize.tap('MyExamplePlugin', () => {
                console.log('The compilation is optimizing assets...');
            });
        });

        // 监听emit钩子
        compiler.hooks.emit.tapAsync('MyExamplePlugin', (compilation, callback) => {
            console.log('The compilation is going to emit files...');

            // 简单修改输出资源
            compilation.assets['example.txt'] = {
                source: () => 'This is an example file created by MyExamplePlugin',
                size: () => 47
            };

            callback();
        });
    }
}

module.exports = MyExamplePlugin;