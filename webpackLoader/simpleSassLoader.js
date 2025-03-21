/**
 * 超简化版的 SCSS 转 CSS loader
 * @param {string} source - SCSS 源代码内容
 * @return {string} - 转换后的 CSS 代码
 */
function simpleSassLoader(source) {
    // 第1步：处理变量
    // 先找出所有变量定义
    const variables = {};
    const variableRegex = /\$([a-zA-Z0-9_-]+):\s*([^;]+);/g;
    let match;

    while ((match = variableRegex.exec(source)) !== null) {
        variables[match[1]] = match[2].trim();
    }

    // 移除变量定义
    let result = source.replace(variableRegex, '');

    // 替换变量引用
    Object.keys(variables).forEach(varName => {
        const varRegex = new RegExp('\\$' + varName + '\\b', 'g');
        result = result.replace(varRegex, variables[varName]);
    });

    // 第2步：处理嵌套 (简化版，仅处理一级嵌套)
    const nestedRules = [];
    const cssBlocks = result.match(/([a-zA-Z0-9_\-\.#\[\]="':*]+)\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)?\}/g) || [];

    cssBlocks.forEach(block => {
        // 提取选择器和内容
        const selectorMatch = block.match(/([^{]*)\{(.*)\}/s);
        if (!selectorMatch) return;

        const selector = selectorMatch[1].trim();
        const content = selectorMatch[2];

        // 处理内部嵌套
        const innerBlocks = content.match(/([a-zA-Z0-9_\-\.#\[\]="':*&]+)\s*\{([^{}]*)\}/g) || [];

        innerBlocks.forEach(innerBlock => {
            const innerMatch = innerBlock.match(/([^{]*)\{(.*)\}/s);
            if (!innerMatch) return;

            let innerSelector = innerMatch[1].trim();
            const innerContent = innerMatch[2];

            // 处理 & 符号
            innerSelector = innerSelector.replace(/&/g, selector);

            // 如果没有 &，就是后代选择器
            if (!innerSelector.includes(selector)) {
                innerSelector = `${selector} ${innerSelector}`;
            }

            nestedRules.push(`${innerSelector} { ${innerContent} }`);
        });

        // 移除内部嵌套，只保留当前级别的 CSS
        result = result.replace(block, `${selector} { ${content.replace(/([a-zA-Z0-9_\-\.#\[\]="':*&]+)\s*\{([^{}]*)\}/g, '')} }`);
    });

    // 将嵌套处理结果添加到输出
    result += '\n' + nestedRules.join('\n');

    // 第3步：清理空白
    result = result.replace(/\n\s*\n/g, '\n');

    console.log("转换后的CSS:", result);
    return result;
}

// 测试示例
const scssCode = `
  $primary-color: #3498db;
  $secondary-color: #2ecc71;
  $padding: 10px;
  
  .container {
    max-width: 1200px;
    background-color: #f5f5f5;
    padding: $padding;
    
    .header {
      color: $primary-color;
      font-size: 24px;
    }
    
    .button {
      background-color: $secondary-color;
      padding: $padding;
      
      &:hover {
        background-color: darken($secondary-color, 10%);
      }
    }
  }
  `;

// 执行转换
const cssCode = simpleSassLoader(scssCode);