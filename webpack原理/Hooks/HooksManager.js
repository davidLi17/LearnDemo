class HookManager {
    constructor() {
        // 使用 Map 替代普通对象
        this.hooks = new Map();
    }

    register(hookName, callback) {
        if (!this.hooks.has(hookName)) {
            // 如果该钩子名称还未存在，则创建一个数组来存储对应的钩子函数
            this.hooks.set(hookName, []);
        }
        // 获取现有的回调函数数组并添加新的回调
        const callbacks = this.hooks.get(hookName);
        callbacks.push(callback);
    }

    trigger(hookName, ...args) {
        console.log("Hooks/HooksManager.js args::", args);
        if (this.hooks.has(hookName)) {
            // 获取并执行该钩子名称下的所有回调函数
            const callbacks = this.hooks.get(hookName);
            callbacks.forEach((callback) => {
                callback(...args);
            });
        }
    }
}

// 使用示例
const hookManager = new HookManager();

// 注册一个名为 'beforeSave' 的钩子函数
hookManager.register('beforeSave', (data) => {
    console.log('在保存之前执行的操作:', data);
});

// 注册另一个名为 'beforeSave' 的钩子函数
hookManager.register('beforeSave', (data) => {
    console.log('另一个在保存之前执行的操作:', data);
});

// 触发 'beforeSave' 钩子
const sampleData = { name: 'John', age: 30 };
hookManager.trigger('beforeSave', sampleData);
