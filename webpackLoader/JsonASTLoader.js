"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cssJson_json_1 = require("./cssJson.json");
var CSSJsonProcessor = /** @class */ (function () {
    function CSSJsonProcessor() {
        this.result = {};
    }
    /**
     * 处理CSS规则数组
     * @param rules CSS规则数组
     */
    CSSJsonProcessor.prototype.processRules = function (rules) {
        var _this = this;
        if (!rules || !Array.isArray(rules))
            return;
        rules.forEach(function (rule) {
            // 处理媒体查询内的规则
            if (rule.cssRules) {
                _this.processRules(rule.cssRules);
            }
            // 处理直接的样式规则
            if (rule.selectorText && rule.style) {
                _this.result[rule.selectorText] = {};
                // 提取样式属性
                for (var i = 0; i < rule.style.length; i++) {
                    var prop = rule.style[i];
                    if (typeof prop === 'string') {
                        _this.result[rule.selectorText][prop] = rule.style[prop];
                    }
                }
            }
        });
    };
    /**
     * 提取选择器和样式
     * @param cssJson CSS的JSON表示
     * @returns 提取出的选择器和样式的映射对象
     */
    CSSJsonProcessor.prototype.extractSelectorsAndStyles = function (cssJson) {
        this.result = {};
        this.processRules(cssJson.cssRules);
        return this.result;
    };
    return CSSJsonProcessor;
}());
// 使用示例
try {
    var processor = new CSSJsonProcessor();
    //@ts-ignore
    var result = processor.extractSelectorsAndStyles(cssJson_json_1.default);
    console.log("Processed CSS Rules:", cssJson_json_1.default.cssRules);
    console.log("Extracted Styles:", result);
}
catch (error) {
    console.error("Error processing CSS JSON:", error);
}
