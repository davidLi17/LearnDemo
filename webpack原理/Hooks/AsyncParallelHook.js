const { AsyncParallelHook } = require('tapable');

const asyncParallelHook = new AsyncParallelHook(['url']);

// 注册异步监听函数（用 async）
asyncParallelHook.tapAsync('DownloadPlugin', (url, callback) => {
    setTimeout(() => {
        console.log(`下载完成: ${url}`);
        callback(); // 必须调用 callback 表示完成
    }, 500);
});

// 触发钩子
asyncParallelHook.callAsync('https://example.com', () => {
    console.log('所有异步任务完成');
});