//index.js
import Text from './some.txt'
import "./index.css"
console.log("src/index.js Text::", Text);
const hello = require('./hello.js')


// 源代码
console.log("这个会被移除");
console.info("如果在配置中包含 info，这个也会被移除");
const a = 1;
console.warn("警告信息可以选择性保留");

const textElement = document.createElement('div');
textElement.textContent = Text;
document.querySelector('#root').appendChild(textElement);

document.querySelector('#root').appendChild(hello())
