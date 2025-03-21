/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/readme.md":
/*!***********************!*\
  !*** ./src/readme.md ***!
  \***********************/
/***/ ((module) => {

eval("module.exports = \"<h1>WebPack 学习项目</h1>\\n<h2>项目简介</h2>\\n<p>这是一个用于学习 WebPack 的示例项目，主要包含自定义 loader 和 plugin 的实现。</p>\\n<h2>项目结构</h2>\\n<pre><code>├── src/\\n│   ├── index.js        # 入口文件\\n│   └── index.html      # HTML 模板\\n├── loaders/            # 自定义 loader\\n├── plugins/            # 自定义 plugin\\n├── webpack.config.js   # Webpack 配置文件\\n└── package.json        # 项目依赖配置\\n</code></pre>\\n<h2>主要内容</h2>\\n<h3>1. 自定义 Loader</h3>\\n<ul>\\n<li>实现原理</li>\\n<li>使用示例</li>\\n<li>开发注意事项</li>\\n</ul>\\n<h3>2. 自定义 Plugin</h3>\\n<ul>\\n<li>实现原理</li>\\n<li>使用示例</li>\\n<li>开发注意事项</li>\\n</ul>\\n<h3>3. 配置说明</h3>\\n<ul>\\n<li>webpack.config.js 配置详解</li>\\n<li>loader 配置说明</li>\\n<li>plugin 配置说明</li>\\n</ul>\\n<h2>使用说明</h2>\\n<ol>\\n<li>安装依赖</li>\\n</ol>\\n<pre><code class=\\\"language-bash\\\">npm install\\n</code></pre>\\n<ol start=\\\"2\\\">\\n<li>运行开发环境</li>\\n</ol>\\n<pre><code class=\\\"language-bash\\\">npm run dev\\n</code></pre>\\n<ol start=\\\"3\\\">\\n<li>构建生产环境</li>\\n</ol>\\n<pre><code class=\\\"language-bash\\\">npm run build\\n</code></pre>\\n\";\n\n//# sourceURL=webpack://learndemo/./src/readme.md?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ (() => {

"use strict";
eval("// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://learndemo/./src/index.css?");

/***/ }),

/***/ "./src/hello.js":
/*!**********************!*\
  !*** ./src/hello.js ***!
  \**********************/
/***/ ((module) => {

eval("// hello.js\r\nmodule.exports = function () {\r\n    let hello = document.createElement('div')\r\n    \r\n    hello.innerHTML = 'hello.js:::welcome to China!'\r\n    return hello\r\n}\n\n//# sourceURL=webpack://learndemo/./src/hello.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony import */ var _some_txt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./some.txt */ \"./src/some.txt\");\n/* harmony import */ var _some_txt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_some_txt__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _readme_md__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./readme.md */ \"./src/readme.md\");\n/* harmony import */ var _readme_md__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_readme_md__WEBPACK_IMPORTED_MODULE_2__);\n//index.js\r\n\r\n\r\n\r\n\r\n\r\nconst hello = __webpack_require__(/*! ./hello.js */ \"./src/hello.js\")\r\n// new RemoveConsolePlugin({\r\n//     include: ['log', 'error']\r\n// }),\r\n\r\n// 源代码\r\n\r\n\r\nconsole.error(\"error相关信息会被保留.\");\r\nconst a = 1;\r\nconsole.warn(\"警告信息可以选择性保留\");\r\n\r\n// index.js\r\ndocument.querySelector('#root').appendChild((_readme_md__WEBPACK_IMPORTED_MODULE_2___default()));\r\n\r\ndocument.querySelector('#root').appendChild(hello())\r\n\n\n//# sourceURL=webpack://learndemo/./src/index.js?");

/***/ }),

/***/ "./src/some.txt":
/*!**********************!*\
  !*** ./src/some.txt ***!
  \**********************/
/***/ ((module) => {

eval("module.exports = \"I AM A STUPID POP SONG;\\r\\nIN 1984, I WAS NUMBER ONE.\\r\\nSOMETHING ELSE\\r\\nAND GOD KNOWS I'M NOT WRONG.\"\n\n//# sourceURL=webpack://learndemo/./src/some.txt?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;