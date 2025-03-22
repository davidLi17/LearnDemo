// Resgiter.js
import {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncSeriesHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} from 'tapable'

/**
 * Webpack钩子注册管理类
 */
export default class Resgiter {
    constructor() {
        this.hooks = {
            syncHook: new SyncHook(),
            syncBailHook: new SyncBailHook(['sum']),
            syncWaterfallHook: new SyncWaterfallHook(['score']),
            syncLoopHook: new SyncLoopHook(),
            asyncSeriesHook: new AsyncSeriesHook(),
            asyncParallelHook: new AsyncParallelHook(),
            asyncParallelBailHook: AsyncParallelBailHook(),
            asyncSeriesBailHook: new AsyncSeriesBailHook(),
            asyncSeriesWaterfallHook: new AsyncSeriesWaterfallHook(['score']) // 标注一下，要传参数啦
        }
    }

    syncHook() {
        // 基本类型钩子
        return this.hooks.syncHook.call()
    }

    syncBailHook(sum) {
        // 同步熔断钩子
        return this.hooks.syncBailHook.call(sum)
    }

    syncWaterfallHook(score) {
        // 同步瀑布钩子
        return this.hooks.syncWaterfallHook.call(score)
    }

    syncLoopHook() {
        // 同步循环钩子
        return this.hooks.syncLoopHook.call()
    }

    asyncSeriesHook(callback) {
        // 异步串行钩子
        return this.hooks.asyncSeriesHook.callAsync(callback)
    }

    asyncParallelHook() {
        // 异步串行钩子
        return this.hooks.asyncParallelHook.promise()
    }

    asyncParallelBailHook() {
        // 异步并行钩子
        return this.hooks.asyncParallelBailHook.promise()
    }

    asyncSeriesBailHook() {
        // 异步并行熔断钩子
        return this.hooks.asyncSeriesBailHook.promise()
    }

    asyncSeriesWaterfallHook() {
        // 异步并行瀑布钩子
        return this.hooks.asyncSeriesWaterfallHook.promise()
    }
}

