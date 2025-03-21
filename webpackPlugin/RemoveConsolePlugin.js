/** @typedef {import("webpack").Compiler} WebpackCompiler */ // 定义一个类型别名 WebpackCompiler，用于导入 webpack 的 Compiler 类型
/** @typedef {import("webpack").Compilation} WebpackCompilation */ // 定义一个类型别名 WebpackCompilation，用于导入 webpack 的 Compilation 类型
/** @typedef {import("webpack").sources} WebpackSources */ // 定义一个类型别名 WebpackSources，用于导入 webpack 的 sources 类型

const pluginName = 'RemoveConsolePlugin'; // 插件名称
class RemoveConsolePlugin {
    constructor(options = {}) {
        this.options = {
            include: ["log"], // 默认包含的 console 方法
            ...options, // 使用展开运算符合并用户传入的选项
        };
    }

    /**
     * @param {WebpackCompiler} compiler - webpack 的编译器实例
     */
    apply(compiler) {
        const logger = compiler.getInfrastructureLogger(pluginName);
        // 注册 compilation 钩子
        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            // 注册 processAssets 钩子
            compilation.hooks.processAssets.tap(
                {
                    name: pluginName, // 插件名称
                    stage: compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE, // 指定处理资产的阶段，优化大小阶段
                },
                (assets) => {
                    logger.error("webpackPlugin/RemoveConsolePlugin.js assets::", assets);
                    logger.error("webpackPlugin/RemoveConsolePlugin.js 当前删除console的options::", this.options);
                    // 动态从 compilation 中导入 RawSource 类
                    const { RawSource } = compiler.webpack.sources;

                    // 遍历所有资源文件
                    Object.keys(assets).forEach((filename) => {
                        if (filename.endsWith('.js')) { // 只处理以 .js 结尾的文件
                            const asset = assets[filename]; // 获取当前资源文件
                            const sourceCode = asset.source(); // 获取原始源代码

                            // 修改源代码，移除 console 语句
                            const modifiedCode = this.removeConsole(sourceCode);

                            // 使用新的 RawSource 实例替换原始资源文件
                            compilation.assets[filename] = new RawSource(modifiedCode);
                        }
                    });
                }
            );
        });
    }

    /**
     * 从源代码中移除 console 语句
     * @param {string} source - 原始源代码
     * @returns {string} - 修改后的源代码
     */
    removeConsole(source) {
        // 根据 include 选项生成正则表达式模式
        const pattern = this.options.include
            .map((type) => `console\\.${type}\\s*\\([^;]*\\);?`) // 生成匹配 console 方法的正则表达式
            .join('|'); // 使用 | 连接多个模式
        const regex = new RegExp(pattern, 'g'); // 创建全局正则表达式
        return source.replace(regex, ''); // 使用正则表达式替换掉所有匹配的 console 语句
    }
}

module.exports = RemoveConsolePlugin; // 导出 RemoveConsolePlugin 类