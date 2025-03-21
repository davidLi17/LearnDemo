/**
 * 超简化版的 TypeScript 转 JavaScript loader
 * @param {string} source - TypeScript 源代码内容
 * @return {string} - 转换后的 JavaScript 代码
 */
function simpleTypeScriptLoader(source) {
    // 第1步：删除类型注解 (例如: ": string", ": number", 等)
    // 这个正则表达式会匹配冒号后面的类型定义
    let result = source.replace(/:\s*([A-Za-z<>[\](){}|&,\s]+)(?=\s*[=,);])/g, '');

    // 第2步：删除接口定义 (interface)
    result = result.replace(/interface\s+[^{]+\s*\{[^}]*\}\s*/g, '');

    // 第3步：删除类型定义 (type)
    result = result.replace(/type\s+[^=]+=\s*[^;]+;\s*/g, '');

    // 第4步：删除泛型信息 (例如: <string>, <T>, <number[]>, 等)
    result = result.replace(/<([^<>]|<[^<>]*>)*>/g, '');

    console.log("转换后的代码:", result);
    return result;
}

// 测试示例
const typeScriptCode = `
  interface User {
    name: string;
    age: number;
    isAdmin: boolean;
  }
  
  type ID = string | number;
  
  function createUser(name: string, age: number): User {
    const user: User = {
      name,
      age,
      isAdmin: false
    };
    return user;
  }
  
  const fetchData = <T>(url: string): Promise<T[]> => {
    return fetch(url).then(response => response.json());
  };
  `;

// 执行转换
const javascriptCode = simpleTypeScriptLoader(typeScriptCode);