/** @typedef {import("webpack").Compiler} Compiler */
/** @typedef {import("webpack").Compilation} Compilation */
/** @typedef {import("webpack").sources.Source} Source */

const { RawSource } = require('webpack').sources;

class FileListPlugin {
    constructor(options = {}) {
        this.filename = options.filename || 'filelist.md';
    }

    /**
     * @param {Compiler} compiler
     */
    apply(compiler) {
        compiler.hooks.compilation.tap('FileListPlugin', (compilation) => {
            // 使用 processAssets 钩子的 PROCESS_ASSETS_STAGE_SUMMARIZE 阶段
            compilation.hooks.processAssets.tapPromise(
                {
                    name: 'FileListPlugin',
                    stage: compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
                },
                async (assets) => {
                    // 删除之前的资源（如果存在）
                    if (compilation.getAsset(this.filename)) {
                        compilation.deleteAsset(this.filename);
                    }

                    const filelist = Object.keys(assets)
                        .map(filename => `- ${filename}`)
                        .join('\n');

                    // 添加新的资源
                    compilation.emitAsset(
                        this.filename,
                        new RawSource(`# 文件列表\n${filelist}`)
                    );
                }
            );
        });
    }
}

module.exports = FileListPlugin;