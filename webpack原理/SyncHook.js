class SyncHook {
    constructor(args = []) {
        this._args = args;//_表示 私有属性
        this.taps = [];
    }
    tap(name, task) {
        this.taps.push({ name, task });
    }
    call(...args) {
        //限制参数个数，保证参数不会超过构造函数中定义的数量
        const params = args.slice(0, this._args.length);
        console.log("webpack原理/SyncHook.js params::", params);
        this.taps.forEach(({ task }) => {
            task(...params);
        })
    }
}
// 使用示例
const hook = new SyncHook(['name', 'age']);

// 注册插件
hook.tap('plugin1', (name, age) => {
    console.log("webpack原理/SyncHook.js plugin1", name, age);
});
// 注册第二个插件
hook.tap('plugin2', (name, age) => {
    name = 'Jerry'; // 修改参数值
    age = 20; // 修改参数值
    console.log("webpack原理/SyncHook.js plugin2", name, age);
});

hook.call('Tom', 18, 'extra');  // 第三个参数不会被传递