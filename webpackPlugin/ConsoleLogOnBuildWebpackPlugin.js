/** @typedef {import("webpack").Compiler} WebpackCompiler */
/** @typedef {import("webpack").Compilation} WebpackCompilation */

const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    constructor(options = {}) {
        this.options = {
            include: ["log"],
            ...options,
        }
    }
    /**
     * @param {WebpackCompiler} compiler
     */
    apply(compiler) {
        compiler.hooks.compilation.tap("RemoveConsolePlugin", (compilation) => {
            console.log('webpack 构建正在启动！');
            compilation.hooks.optimizeAssets.tap("RemoveConsolePlugin", (chunks) => {
                for (const chunk of chunks) {
                    // 遍历所有的文件
                    for (const file of chunk.files) {
                        // 获取文件内容
                        const asset = compilation.assets[file];
                        const sourceCode = asset.source();

                        // 移除 console.log
                        const modifiedCode = this.removeConsole(sourceCode);

                        // 更新文件内容
                        compilation.assets[file] = {
                            source: () => modifiedCode,
                            size: () => modifiedCode.length
                        };
                    }
                }
            });
        });
    }
    removeConsole(source) {
        const pattern = this.options.include
            .map(type => `console.${type}\\s*\\([^;]*\\);?`)
            .join('|');
        const regex = new RegExp(pattern, 'g');
        return source.replace(regex, '');
    }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;