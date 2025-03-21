//index.js
import Text from './some.txt'
import "./index.css"
import htmlContent from './readme.md';

console.log("src/index.js Text::", Text);
const hello = require('./hello.js')
// new RemoveConsolePlugin({
//     include: ['log', 'error']
// }),

// 源代码
console.log("log:这个会被移除");
console.info("info:这个会被移除");
console.error("error相关信息会被保留.");
const a = 1;
console.warn("警告信息可以选择性保留");

// index.js
document.querySelector('#root').appendChild(htmlContent);

document.querySelector('#root').appendChild(hello())
