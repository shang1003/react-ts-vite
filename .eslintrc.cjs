/**
 * 此配置给 vscode的插件eslint和项目中eslint使用
 * （1）项目中使用npm run lint检查
 * （2）vscode插件中可以在settings文件配置开启
 */
module.exports = {
  parser: "@typescript-eslint/parser", //指定解析器  (babel-eslint 解析js)
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["react-hooks"], // 检查hooK语法规范
  globals: {
    page: true,
    REACT_APP_ENV: true,
    React: true, // 告诉eslint 全局配置，不是未定义
    dynamic: true, // 告诉eslint 全局配置，不是未定义
  },
  /** env 作用
   * 在.eslintrc文件中的env属性用于定义代码运行的环境。
   * 这些环境定义了一组预定义的全局变量，以及允许使用的特定的 ECMAScript 特性。
   */
  env: {
    browser: true, //启用浏览器环境，预定义了浏览器中常见的全局变量，如 window、document 等，不会报undefined错误。
    node: true, //启用 Node.js 环境，预定义了 Node.js 中常见的全局变量，如 require、module 等。
    es6: true, //启用 ECMAScript 6（ES6）环境，预定义了 ES6 中的全局变量和语法特性，如 Promise、let、const 等。
    mocha: true, //启用 Mocha 测试框架环境，预定义了 Mocha 中的全局变量，如 describe、it 等。
    jest: true, //启用 Jest 测试框架环境，预定义了 Jest 中的全局变量，如 describe、it 等。
    jasmine: true, //启用 Jasmine 测试框架环境，预定义了 Jasmine 中的全局变量，如 describe、it 等.
  },
  rules: {
    "react/prop-types": 0, // 禁用对 React 组件的 PropTypes 进行类型检查的要求
    "react/display-name": 0, // 禁用要求为具名函数或类组件提供 displayName 的要求
    "react-hooks/rules-of-hooks": "error", // 强制执行 React Hooks 规则
    "react-hooks/exhaustive-deps": "warn", // 对依赖项列表进行警告提醒
    semi: 2, // 要求使用分号
    "@typescript-eslint/no-explicit-any": 0, // 允许使用 any 类型
    "no-var": 2, // 禁止使用 var 声明变量
    "constructor-super": 2, // 强制在构造函数中调用 super()
    "no-class-assign": 2, // 禁止对类名重新赋值
    "for-direction": 2, // 禁止 for 循环中的错误方向
    "getter-return": 2, // 强制 getter 函数中有返回值
    // "react/react-in-jsx-scope": 0, // 禁用 React 在 JSX 中的未使用的 scope
    "no-async-promise-executor": 2, // 禁止在异步函数中使用带有异步执行器的 Promise 构造函数
    "no-compare-neg-zero": 2, // 禁止与 -0 进行比较
    "no-cond-assign": 2, // 禁止在条件语句中进行赋值操作
    "no-constant-condition": 2, // 禁止在条件语句中使用常量作为测试条件
    "no-control-regex": 2, // 禁止在正则表达式中使用控制字符
    "no-debugger": 2, // 禁用 debugger 语句
    "no-dupe-args": 2, // 禁止函数参数中出现重复命名的参数
    "no-dupe-keys": 2, // 禁止对象字面量中出现重复的键名
    "no-duplicate-case": 2, // 禁止在 switch 语句中出现重复的 case 标签
    "no-empty-character-class": 2, // 禁止在正则表达式中使用空字符类
    "no-ex-assign": 2, // 禁止对 catch 子句中的异常重新赋值
    "no-extra-boolean-cast": 2, // 禁止不必要的布尔类型转换
    "no-extra-semi": 2, // 禁止不必要的分号
    "no-func-assign": 2, // 禁止对函数声明重新赋值
    "no-inner-declarations": 2, // 禁止在嵌套的语句块中声明函数或变量
    "no-invalid-regexp": 2, // 禁止在 RegExp 构造函数中使用无效的正则表达式字符串
    "no-irregular-whitespace": 2, // 禁止在字符串和注释之外不规则使用空白
    "no-misleading-character-class": 2, // 禁止在字符类语法中使用特殊的字符类
    "no-obj-calls": 2, // 禁止将全局对象属性作为函数调用
    "no-prototype-builtins": 2, // 禁止直接调用 Object.prototype 的一些方法
    "no-regex-spaces": 2, // 禁止正则表达式中出现多个连续空格
    "no-sparse-arrays": 2, // 禁止使用稀疏数组
    "no-unexpected-multiline": 2, // 禁止使用令人困惑的多行表达式
    "no-unreachable": 2, // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
    "no-unsafe-finally": 2, // 禁止在 finally 语句块中出现控制流语句
    "no-unsafe-negation": 2, // 禁止对关系运算符的左操作数使用否定操作符
    "require-atomic-updates": 2, // 禁止由于 await 或 yield 的使用而可能导致出现竞态条件的赋值
    "use-isnan": 2, // 要求使用 isNaN() 检查 NaN
    "valid-typeof": 2, // 强制 typeof 表达式与有效的字符串进行比较
    "no-empty-pattern": 2, // 禁止使用空解构模式
    "no-fallthrough": 2, // 禁止 switch 语句中的 case 子句落空
    "no-global-assign": 2, // 禁止对全局变量或只读的全局变量进行赋值
    "no-octal": 2, // 禁用八进制字面量
    "no-redeclare": 2, // 禁止重新声明变量
    "no-self-assign": 2, // 禁止将变量与自身进行赋值操作
    "no-unused-labels": 2, // 禁用未使用过的标签
    "no-useless-catch": 2, // 禁止不必要的 catch 子句，可以直接删除
    "no-useless-escape": 2, // 禁用不必要的转义字符
    "no-with": 2, // 禁用 with 语句
    "no-delete-var": 2, // 禁止删除变量
    "no-shadow-restricted-names": 2, // 禁止变量声明与外层作用域的绑定冲突
    "no-undef": 2, // 禁用未声明的变量
    "no-mixed-spaces-and-tabs": 2, // 禁止混用空格和制表符缩进
    "no-const-assign": 2, // 禁止修改使用 const 声明的变量
    "no-dupe-class-members": 2, // 禁止类成员中出现重复的名称
    "no-new-symbol": 2, // 禁止使用 new 操作符和 Symbol 构造函数进行 Symbol 的创建
    "no-this-before-super": 2, // 禁止在调用 super() 之前使用 this 或 super
    "require-yield": 2, // 要求 generator 函数内有 yield
    "symbol-description": 2, // 要求符号的描述
    "space-infix-ops": 2, // 要求操作符周围有空格
    "space-before-blocks": 2, // 要求代码块前有空格
    "no-trailing-spaces": 2, // 禁用行尾空格
    "no-new-object": 2, // 禁止使用 Object 构造函数
    "no-multi-assign": 2, // 禁止连续赋值
    "no-array-constructor": 2, // 禁止使用 Array 构造函数
    "func-call-spacing": 2, // 要求调用函数时有空格
    "eol-last": 2, // 要求文件末尾保留一行空行
    "no-script-url": 2, // 禁止使用 javascript: URL
    "no-return-assign": 2, // 禁止在返回语句中进行赋值操作
    "no-useless-return": 2, // 禁止多余的 return 语句
    "no-proto": 2, // 禁用 __proto__ 属性
    "no-new-wrappers": 2, // 禁止使用原始包装器对象的构造函数
    "no-eval": 2, // 禁用 eval() 函数
    "no-extra-label": 2, // 禁用不必要的标签
    "no-implied-eval": 2, // 禁止使用隐式的 eval()
    "no-multi-spaces": 2, // 禁止多个连续的空格
    "no-multi-str": 2, // 禁止使用多行字符串
    "arrow-spacing": 2, // 强制箭头函数的箭头前后有空格
  },
  settings: {
    // "import/resolver": { node: { extensions: [".js", ".jsx", ".ts", ".tsx"] } },
    polyfills: ["fetch", "Promise", "URL", "object-assign"],
    /*这个配置用于指定需要提供的多个 polyfill（填充库）。
    Polyfills 是用于在旧版本浏览器或环境中提供缺失的新特性或 API 的代码。
    在这个配置中，指定了四个 polyfill：fetch、Promise、URL 和 object-assign。
    这意味着你可以在你的代码中使用这些功能和 API，即使目标环境本身不支持它们，ESLint 会假设这些 polyfill 已经被正确引入。
    */
  },
};
