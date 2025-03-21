/** @typedef {import("webpack").Compiler} Compiler */
/** @typedef {import("webpack").Compilation} Compilation */
/** @typedef {import("webpack").sources.Source} Source */

const { RawSource } = require('webpack').sources;

class LogPlugin {
    constructor(options = {}) {
        this.options = options || {};
    }

    /**
     * @param {Compiler} compiler
     */
    apply(compiler) {
        // 记录开始时间
        let startTime;

        // 监听构建开始钩子
        compiler.hooks.compile.tap('LogPlugin', () => {
            startTime = Date.now();
            console.log('\n[LogPlugin] 开始构建...');
        });

        // 监听构建完成钩子
        compiler.hooks.done.tap('LogPlugin', (stats) => {
            const endTime = Date.now();
            const buildTime = (endTime - startTime) / 1000; // 单位：秒
            const assets = stats.compilation.assets; // 获取输出资源

            console.log(`\n[LogPlugin] 构建完成，耗时 ${buildTime}s`);
            Object.keys(assets).forEach((assetName) => {
                const size = (assets[assetName].size() / 1024).toFixed(2); // 单位：KB
                console.log(`[LogPlugin] ${assetName}  size:${size} KB`);
            });
        });
    }
}

module.exports = LogPlugin;