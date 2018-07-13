# 针对 eslint 的配置

> [参考视频](https://coding.imooc.com/lesson/196.html#mid=12211)

```cmd
 jiiiiiin@jiiiiiins-MacBook-Pro  ~/Documents/WebstormProjects/todos   master  npm i eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node -D
npm WARN todos@1.0.0 No repository field.

+ eslint-plugin-promise@3.8.0
+ eslint-plugin-standard@3.1.0
+ eslint-config-standard@11.0.0
+ eslint-plugin-import@2.13.0
+ eslint-plugin-node@6.0.1
+ eslint@5.1.0
```

配置.eslintrc:

```js
{
  "extends": "standard"
}
```

添加上面的依赖之后，就可以使用 eslint 命令对项目中的 js 代码进行校验，但是针对.vue 文件，因为不是 js 文件，需要依赖下面的插件对 html 中的 script 标签中的 js 进行校验：

```cmd
 jiiiiiin@jiiiiiins-MacBook-Pro  ~/Documents/WebstormProjects/todos   master ●  npm i eslint-plugin-html -Dnpm WARN todos@1.0.0 No repository field.

+ eslint-plugin-html@4.0.5
```

重新配置.eslintrc:

```js
{
  "extends": "standard",
  "plugins": [
    "html"
  ]
}
```

修改 npm script：

```js
// --ext指定后缀 最后一个指定要对那个目录下面的文件进行检测
"lint": "eslint --ext .js --ext .jsx --ext .vue client/"
```

针对编码过程中实时进行 lint 校验：

```bash
npm i eslint-loader babel-eslint -D
```

修改 eslint 配置：

```json
{
  "env": {
    "es6": true
  },
  // 因为我们项目代码都是需要通过babel进行编译的，而babel处理的语法可能会导致eslint不一定支持，所以我们在使用eslint-loader去处理的时候就会出现一些问题
  // 所以在使用eslint+babel完成开发的时候都需要进行下面的插件指定
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": "standard",
  "plugins": ["html"]
}
```

- 修改 webpack 配置：

```js
 module: {
    rules: [{
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        // 针对上面指定的文件进行预处理，如果处理不通过，直接不走下面的loader
        enforce: 'pre'
      }, {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: createVueLoaderOptions(isDev)
        }]
      },
```

- 针对.editorconfig 文件

针对项目进行编辑器配置

- 关于 vscode：
  [vs-code-space-before-function-parentheses](https://stackoverflow.com/questions/41150726/vs-code-space-before-function-parentheses)
  [针对 vscode save auto format eslint space-before-function-paren 错误](http://www.jk-kj.com/2017/11/03/vscode配置eslint/)
  关键是添加`"eslint.autoFixOnSave": true,`这一行配置;
  ide： `shift+ctrl+p => 选择 eslint fix all auto-fixable problems`
