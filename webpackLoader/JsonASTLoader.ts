interface CSSStyle {
	[index: number]: string;
	length: number;
	parentRule?: any;
	_importants: {
		[key: string]: string;
	};
    __starts: number;
    [key: string]: any;
}

interface CSSRule {
    //@ts-ignore
	parentRule?: null | CSSRule;
    //@ts-ignore
    parentStyleSheet: any;
	selectorText?: string;
    style?: CSSStyle;
    media?: {
        [key: string]: string;
        //@ts-ignore
        length: number;
    };
    cssRules?: CSSRule[];
    __starts: number;
    __ends: number;
}

interface CSSJsonStructure {
    parentStyleSheet: null | any;
    cssRules: CSSRule[];
}

interface StyleMap {
    [selector: string]: {
        [property: string]: string;
    };
}
const cssJson=JSON.parse(`{
	"parentStyleSheet": null,
	"cssRules": [
		{
			"parentRule": null,
			"parentStyleSheet": "[Circular ~]",
			"media": {
				"0": "screen and (min-width: 480px)",
				"length": 1
			},
			"cssRules": [
				{
					"parentRule": "[Circular ~.cssRules.0]",
					"parentStyleSheet": "[Circular ~]",
					"selectorText": "body",
					"style": {
						"0": "background-color",
						"length": 1,
						"parentRule": "[Circular ~.cssRules.0.cssRules.0]",
						"_importants": {
							"background-color": ""
						},
						"__starts": 155,
						"background-color": "lightgreen"
					},
					"__starts": 150,
					"__ends": 200
				}
			],
			"__starts": 107,
			"__ends": 202
		},
		{
			"parentRule": null,
			"parentStyleSheet": "[Circular ~]",
			"selectorText": "#main",
			"style": {
				"0": "border",
				"length": 1,
				"parentRule": "[Circular ~.cssRules.1]",
				"_importants": {
					"border": ""
				},
				"__starts": 210,
				"border": "1px solid black"
			},
			"__starts": 204,
			"__ends": 242
		},
		{
			"parentRule": null,
			"parentStyleSheet": "[Circular ~]",
			"selectorText": "ul li",
			"style": {
				"0": "padding",
				"length": 1,
				"parentRule": "[Circular ~.cssRules.2]",
				"_importants": {
					"padding": ""
				},
				"__starts": 250,
				"padding": "5px"
			},
			"__starts": 244,
			"__ends": 268
		}
	]
}
`)
// 定义CSS JSON处理器类，用于提取和处理CSS样式信息
class CSSJsonProcessor {
	// 存储处理结果的私有属性，使用StyleMap接口定义格式
	private result: StyleMap = {};

	/**
	 * 处理CSS规则数组的私有方法
	 * @param rules CSS规则数组，包含所有CSS规则信息
	 */
	private processRules(rules: CSSRule[]): void {
		// 检查输入参数是否有效
		if(!rules||!Array.isArray(rules)) return ;
		rules.forEach((rule:CSSRule)=>{
			// 如果当前规则包含子规则(如@media查询)，递归处理
			// "media": {
			// 	"0": "screen and (min-width: 480px)",
			// 	"length": 1
			// },
			if(rule.cssRules){
				this.processRules(rule.cssRules);
			}
			// 处理具有选择器和样式的规则
			if(rule.selectorText&&rule.style){
				// 为当前选择器创建一个新的样式对象
				//"selectorText": "body",
				this.result[rule.selectorText]={};//{ "body": {} }

				// 遍历样式对象中的所有属性
				for(let i=0;i<rule.style.length;i++){
					// 获取样式属性名和值
					const propertyName = rule.style[i];//"0": "background-color",
					const propertyValue = rule.style[propertyName];//"background-color": "lightgreen"

					// 确保属性名是字符串类型后再添加到结果中
					if(typeof propertyName=="string"){
						//{ "background-color": "lightgreen" }
						this.result[rule.selectorText][propertyName]=propertyValue;
					}
				}
			}
		})
	}

	/**
	 * 公共方法：提取CSS JSON中的选择器和样式
	 * @param cssJson 包含完整CSS规则的JSON结构
	 * @returns 返回处理后的样式映射对象
	 */
	public extractSelectorsAndStyles(cssJson: CSSJsonStructure): StyleMap {
	   // 重置结果对象
	   this.result={};
	   // 处理顶层CSS规则
	   this.processRules(cssJson.cssRules);
	   return this.result;
	}
}

// 使用try-catch块进行错误处理
try {
	// 创建处理器实例
	const processor = new CSSJsonProcessor();
	// 处理CSS JSON数据
	const result = processor.extractSelectorsAndStyles(cssJson);
	
	// 输出处理后的完整结果
	console.log("处理后的样式映射:", JSON.stringify(result, null, 2));

	// 遍历并详细输出每个选择器及其样式
	Object.entries(result).forEach(([selector, styles]) => {
		console.log(`\n选择器: ${selector}`);
		console.log("样式:", styles);
	});
} catch (error) {
	// 错误处理
	console.error("处理 CSS JSON 时出错:", error);
}