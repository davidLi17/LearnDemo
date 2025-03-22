// class SyncHook {
//     constructor(args = []) {
//         this._args = args;//_表示 私有属性
//         this.taps = [];
//     }
//     tap(name, task) {
//         this.taps.push({ name, task });
//     }
//     call(...args) {
//         //限制参数个数，保证参数不会超过构造函数中定义的数量
//         const params = args.slice(0, this._args.length);
//         console.log("webpack原理/SyncHook.js params::", params);
//         this.taps.forEach(({ task }) => {
//             task(...params);
//         })
//     }
// }
// // 使用示例
// const hook = new SyncHook(['name', 'age']);

// // 注册插件
// hook.tap('plugin1', (name, age) => {
//     console.log("webpack原理/SyncHook.js plugin1", name, age);
// });
// // 注册第二个插件
// hook.tap('plugin2', (name, age) => {
//     name = 'Jerry'; // 修改参数值
//     age = 20; // 修改参数值
//     console.log("webpack原理/SyncHook.js plugin2", name, age);
// });

// hook.call('Tom', 18, 'extra');  // 第三个参数不会被传递

// 引入 tapable 的钩子类
const { SyncHook } = require('tapable');

// 创建一个同步钩子（SyncHook）
const myHook = new SyncHook(['name']); // 参数 ['name'] 表示钩子触发时会传递一个参数

// 注册监听函数（类似事件监听）
myHook.tap('Plugin1', (name) => {
    console.log(`Plugin1: 你好, ${name}!`);
});

myHook.tap('Plugin2', (name) => {
    const time = new Date().toLocaleDateString();
    console.log("webpack原理/SyncHook.js time::", time);
    const formatTime = time.split('/').join('-');
    console.log(`Plugin2: 今天是 ${formatTime}，${name}！`);
});

// 触发钩子（触发所有注册的监听函数）
myHook.call('小明');