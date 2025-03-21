// 引入 Babel 的 transform 函数，用于代码转换
import { transform } from '@babel/standalone'
// 引入 Files 类型，用于表示文件集合
import { Files } from '../../PlaygroundContext'
// 引入入口文件名称常量
import { ENTRY_FILE_NAME } from '../../files'

// 导出 babelTransform 函数，用于将代码通过 Babel 转换
export const babelTransform = (filename: string, code: string, files: Files) => {
  // 初始化结果字符串
  let result = ''
  // 使用 try-catch 结构处理可能出现的转换错误
  try {
    // 调用 transform 函数进行代码转换
    // 参数 code 是要转换的代码字符串
    // 配置对象包含以下选项：
    // presets: 使用 'react' 和 'typescript' 预设
    // filename: 当前转换文件的名称
    // plugins: 空数组，表示不使用额外插件
    // retainLines: 保持原始代码行数不变
    result = transform(code, {
      presets: ['react', 'typescript'],
      filename,
      plugins: [],
      retainLines: true
    }).code!
  } catch (e) {
    // 如果转换过程中出现错误，打印错误信息
    console.error('编译出错', e);
  }
  // 返回转换后的代码字符串
  return result
}

// 导出 compile 函数，用于编译文件集合
export const compile = (files: Files) => {
  // 从文件集合中获取入口文件
  const main = files[ENTRY_FILE_NAME]
  // 调用 babelTransform 函数进行代码转换，并返回结果
  return babelTransform(ENTRY_FILE_NAME, main.value, files)
}