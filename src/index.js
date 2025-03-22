import txt from './some.txt';
import './index.css';
import md from './readme.md';
const hello = require('./hello.js');

// 添加错误处理
const rootElement = document.querySelector('#root');
if (!rootElement) {
    console.error('找不到 root 元素！');
} else {
    document.addEventListener('DOMContentLoaded', () => {
        const rootElement = document.querySelector('#root');
        if (!rootElement) {
            console.error('找不到 root 元素！');
            return;
        }

        rootElement.appendChild(md());
        rootElement.appendChild(txt);
        rootElement.appendChild(hello());
    });
}