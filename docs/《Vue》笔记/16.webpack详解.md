---
title: 16-webpack详解
date: 2022-07-08 16:09:11
permalink: /pages/43e659/
categories:
  - Vue
tags:
  - 
author: 
  name: yami
  link: https://github.com/yamin-hub
---
### 认识webpack
+ webpack是什么
  - 本质上来说, webpack是一个现代的javaScript应用的静态模块打包工具
  - 实质上, webpack就是 将代码进行模块化和打包的工具
+ 前端模块化
  - 前端模块化的一些方案有, AMD CMD CommonJS ES6
  - 在ES6之前, 我们想要进行模块化开发, 就必须借助于其他的工具进行
  - 而且在通过模块化开发完成项目后, 还需要处理模块和模块之间的各种依赖, 进行整合打包
  - 而webpack和其中一个核心就是帮助我们进行模块化开发, 并且帮助我们处理模块之间的依赖关系
  - 不仅仅时JS文件, CSS, 图片, json文件等等都可以被webpack中当作模块来使用
  - 这就是webpack中模块化的概念
+ 什么是打包
  - webpack可以帮助我们进行模块化, 并且处理模块之间的各种复杂关系
  - 打包就是将webpack中的各种资源模块进行打包, 合并成一个或者多个包(bundle)
  - 在打包的过程中,还可以对资源进行处理, 比如压缩图片, scss转换为css, 将ES6语法转化为ES5语法进行兼容, 将TypeScript 转换成JavaScript语法等等的操作
  - 这种打包的操作, grunt/gulp 也可以完成, 他们有什么区别呢?
+ webpack和grunt/gulp的区别
  - grunt/gulp 的核心是 task
    + 我们可以配置一系列的task代码, 并且定义task要处理的事物(ES6转化, ts转化, 图片压缩, scss转化等)
    + 然后让grunt/gulp 来依次执行task, 并且让整个流程自动化
    + 所以grunt/gulp 也被称为前端自动化任务管理工具

  - 什么时候用grunt/gulp 呢?
    + 工程模块依赖非常简单, 甚至没有用到模块化的概念
    + 只需要进行简单的合并, 压缩, 就只使用grunt/gulp就可以了
    + 当项目使用了模块化管理, 而且模块之间的相互依赖非常强, 就要使用功能更加强大的webpack了

  - 所以grunt/gulp 和 webpack的区别
    + grunt/gulp 更加强调的是前端流程的自动化, 模块化并不是它的和兴
    + webpack更加强调的是模块化开发管理, 而文件压缩合并, 代码预处理等功能是附加功能

### webpack的安装
+ 安装webpack需要安装Node.js 建议使用8.0以上的Node.js版本
```
 <!--查看自己的node版本,终端输入命令行 -->
 node -v
```
+ 全局安装 webpack (这里使用的版本是3.6.0 因为vue cli2 依赖这个版本, 如果版本过高, webpack底层代码被隐藏起来不利于学习, 所以这里使用3.6.0版本)
```
npm install webpack@3.6.0 -g
```
+ 局部安装webpack (后续需要)
  - --save-dev 是开发时依赖, 项目打包后不需要继续使用, -save 是运行时依赖, 项目打包后也是要继续使用的
  - 一般webpack时 开发时依赖安装 
``` 
cd 对应的目录路径
npm install webpack@3.6.0 --save-dev
```
+ 为什么全局安装后, 还需要局部安装?
  - 在终端直接执行webpack命令, 使用的是全局安装的webpack
  - 当在package.json中定义script时, 其中包含了webpack命令, 那么使用的是局部webpack

### 准备工作, 文件和文件夹的创建
+ 文件和文件夹解析
  - dist 文件夹, 里面的代码是经过处理的, 最终上传到服务器的代码
  - src 文件夹, 里面的代码源码, 所有的源码都应该在src文件夹里面
    + main.js : 项目的入口文件
    + 其他的js文件, 通常一个js文件就是一个模块
  - index.html文件, 浏览器打开展示的首页html
  - package.json: 通过npm init 生成的, 里面记录了这个项目所需要的包的信息
+ 注意作为入口的文件, 不需要放到文件夹中, 放在文件夹外面是最合适的

### JS文件的打包
+ 现在的js文件中使用了模块化的方式进行开发, 是不可以直接使用的
  - 因为直接在index.html文件中引入模块化开发的js文件, 浏览器是不会识别里面的模块化代码的
  - 另外, 项目中有很多的js模块文件, 如果一个一个地按照顺序在html文件中引用是非常麻烦, 而且不利于后期的维护和管理的
+ 使用webpack工具, 对多个js文件进行打包
  - webpack是一个模块化打包工具, 所以它支持我们在代码中写模块化代码, 而且是各种各样的模块化, 混合使用都可以
  - 处理完各个模块之间的关系后, 只需要将多个js打包到一个js文件中, 引入的时候就变得非常方便了
  - 打包的命令行
```
webpack ./src/main.js ./dist/bundle.js
<!-- 这段代码的意思是将src目录下的main.js和其导入的所有模块文件, 打包到dist目录下的一个叫bundle.js的文件中, 如果没有这个文件, 则会自动创建该文件 -->
```
+ 使用打包后的文件
  - 打包后会在dist文件夹下生成一个bundle.js文件
    + 这个文件是webpack处理了项目直接文件依赖生成的一个js文件, 现在只需要将这个js文件在index.html中引入即可

+ 具体代码如下
``` js
// main.js的代码
// 1. 使用CommonJS规范 导入信息
const {sum, mul} = require("./mathUtils.js");
console.log(sum(10,20));
console.log(mul(10,20));

// 2. 使用ES6规范 导入信息
import {name, age, height} from "./info.js"
console.log(name);
console.log(age);
console.log(height);

// 使用webpack 打包模块
// 终端命令行输入 webpack 路径1 路径2
// 路径1 为想要打包的模块main 代码
// 路径2 为目标的js
// 例如 webpack ./src/main.js ./dist/bundle.js
```

``` js
// mathUtils.js 的代码
// 1. 使用CommonJS规范
function sum(num1, num2) {
  return num1 + num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

// CommonJS规范导出信息
module.exports = {sum, mul};
```

``` js
// info.js 的代码
// 2. 使用ES6 规范导出信息
export const name = "xiaoLam";
export const age = 18;
export const height = 1.88;
```

``` html
<!-- index.html 的代码 -->
<body>
  <script src="./dist/bundle.js"></script>
</body>
```

### 入口和出口
+ 如果每次使用webpack的命令都需要写上入口和出口作为参数, 这样是很麻烦的, 特别是真实开发的时候这些参数都很长
+ 解决方法, 在项目根目录中创建一个叫 webpack.config.js 的文件
  - 在文件内编写入口和出口的参数
  - 然后再命令行中直接输入 webpack 命令, node就会找到这个文件按照里面编写好的的参数来运行
``` js
// webpack.config.js 的代码
// path模块是node中的内置模块, 是用于处理文件路径
const path = require("path");

// 使用CommonJS规范书写
module.exports = {
  // 编写入口
  entry : "./src/main.js",
  // 编写出口, output 是一个对象, 对象包含两个属性, path 路径 和fliename 文件名, 其中path路径必须是绝对路径
  // path绝对路径, 借助了node中的内置模块 path 的resolve方法 这个方法是用来拼接路径的
  output : {
    path : path.resolve(__dirname,"dist"), // __dirname 指的是当前文件的绝对路径
    filename : "bundle.js" // 填写需要保存为的文件名
  }
}
```

### 局部安装webpack
+ 目前使用的webpack都是全局安装的webpack, 那么就会有问题出现了
  - 一般来说, 一个项目往往依赖某个特定版本的webpack, 全局的版本可能与当前项目的webpack版本不一致, 导出打包的时候就会出现问题
  - 所以通常来说, 一个项目都有自己的局部webpack
+ 所以要安装局部webpack
  - 在项目根目录的路径下, 命令行输入 npm install webpack@3.6.0 --save-dev (--save-dev 就是局部安装, 并且是开发依赖的意思)
+ 运行局部webpack
  - 只要是在终端中直接输入 webpack 命令 都是运行的全局安装的webpack
  - 如何运行局部webpack呢?
    + 第一种方法, 通过路径运行启动webpack打包
      - 在项目的根目录下 命令行输入 node_modules/.bin/webpack 启动webpack打包 (太繁琐不推荐)
    + 第二种方法 package.json中定义启动

### 在package.json中定义启动局部安装的webpack
+ 在package.json文件中的 scripts中定义自己的执行脚本
``` json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // 下面这个就是自定义的执行脚本
    // 这句话的意思是 在命令行中输入 npm run build 的时候就会执行对应的代码
    "build" : "webpack"
  },
```
+ package.json中的scripts脚本在执行时, 会按照一定的顺序寻找命令对应的位置
  - 首先 会寻找本地的node_modules/.bin 路径中对应的命令
  - 如果没有找到, 会在全局的环境变量中寻找

+ 执行build指令
  - 在项目根目录路径下, 命令行输入 npm run build 即可执行指令

### 什么是loader
+ loader是webpack中一个非常核心的概念
  - 它是用来扩展webpack的功能的, webpack自身是不会处理css, 图片, typeScript等等的文件的, 也就是说webpack本身只会处理js的文件
  + 但是我们在开发中不仅仅需要有基本的js代码管理, 还需要夹中css, 图片, ES6转换ES5, TypeScript转换ES5代码等等等等的需求
  - 那么就需要用loader来扩展webpack的功能
+ loader的使用过程
  - 步骤一: 通过npm安装需要使用的loader
    + 可以通过查阅webpack官方文档来查询各种loader的功能
  - 步骤二: 在webpack.config.js 中的module关键字中进行配置
    + 具体配置方法可以查阅webpack官方文档
+ 大部分loader都可以在webpack官网中找到用法

### 通过loader处理css文件
+ 第一步: npm局部安装css-loader和style-loader
+ 第二步: 在入口js文件中编写css文件依赖 require=("css文件的路径")
  - 不需要用变量去接收这个css文件, 只需要让js文件依赖这个css文件就行, 实际上就是让css文件与项目有了联系
+ 第三步: 在webpack.config.js 的module关键字下进行配置
  - webpack在读取使用的loader的过程中，是按照从右向左的顺序读取的。

+ 注意点:
  - css-loader 只负责加载css文件, 但是不会负责将css具体样式嵌入到DOM中
  - style-loader 会负责将css具体样式嵌入到DOM中
  - 所以这两个loader 是一起使用的, 用来处理css文件的
```
<!-- 局部安装css-loader和 style-loader 命令行输入-->
npm install css-loader@需要的版本号 --save-dev
npm install style-loader@需要的版本号 --save-dev
```
``` js
// 在入口的js文件中编写css文件依赖
require = ("css文件的路径") // 不需要用变量去接收这个css文件, 只需要让js文件依赖这个css文件就行, 实际上就是让css文件与项目有了联系
```
``` js
// 在webpack.config.js 中的module关键字中编写配置
// 可以在webpack官网中查阅各个loader的用法
module.exports = {
  module : {
    rules: [
      {
        // 这个test的作用为导入以 .css结尾的文件
        test: /\.css$/,
        // 这里注意了, webpack在读取使用的loader的过程中，是按照从右向左的顺序读取的。
        // 所以是先执行css-loader 再执行 style-loader 顺序不能写错
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

### less文件处理
+ 准备工作
  - 在css文件夹中创建less文件
+ 局部安装less-loader 和 less
  - 这里不仅安装了less-loader 还安装了less
    + 因为webpack并不会编译less文件, 需要借助less来进行编译
+ 根据官方文档修改对应的配置文件
``` js
// 这里是main.js文件中新增的代码
// 4. 在这里依赖一下less文件, 让less文件与项目有关系
require("./css/special.less")
// 为了可以看到效果, 给页面中填写一些文字
document.writeln("<h2>你好你好</h2>")
```
``` js
// 这里是webpack.config.js 中的修改后的module对象, 其实就是按照官方文档复制粘贴就行
module: {
    rules: [
      {
        test: /\.css$/,
        // 这里注意了, webpack在读取使用的loader的过程中，是按照从右向左的顺序读取的。
        // 所以是先执行css-loader 再执行 style-loader 顺序不能写错
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
    }
    ]
  }
```

### 图片文件的处理
+ 资源准备阶段
  - 在src文件夹中的img文件夹中准备两张图片, 一张大于设定的limit大小, 一张小于设定的limit大小
+ 局部安装url-loader
  - 按照webpack官网设置webpack.config.js文件
  - 先在css文件中引用小于设定的limit大小的图片作为页面背景
  - 命令行输入 npm run build 进行打包
  - 浏览器运行后发现, 小于limit大小的图片是经过base64编码成字符串后渲染出来的
+ 现在用大于设定的limit大小的图片作为页面背景
  - 命令行输入 npm run build 进行打包
  - 会发现报错, 提示项目中没有file-loader模块
  - 安装file-loader模块后 再次进行打包
  - 会发现dist文件夹下多了一个图片文件
    + 原理: 如果图片的大小大于webpack.config.js中limit设定的大小的话, webpack会用file-loader模块进行图片文件的导出

### 图片文件处理-修改文件名称
+ 我们会webpack 通过file-loader导出的图片的名字是一个很长的名字
  - 这是一个32位hash值, 目的是为了防止名字的重复
  - 但是, 真实开发中, 我们可能对打包的图片名字有一定的要求
  - 比如, 将图片放到一个文件夹中, 跟上图片原来的名字, 同时要防止文件名的重复
+ 所以在webpack.config.js 中de1options中添加如下选项
  - name : "img.[name].[hash:8].[ext]"
  - img : 文件要打包到的文件夹
  - [name] : 获取图片原来的名字,放在该位置
  - [hash:8] : 防止图片名称冲突,依然使用hash,但是保留8位,以免文件名字过长
  - [ext] : 使用图片原来的扩展名
+ 做完以上处理后, 再次打包, 会发现图片并没有显示出来, 这是因为图片使用的路径不正确
  - 默认情况下, webpack会将生成的路径直接返回给使用者
  - 但是, 我们整个程序打包是在dist文件夹下的, 所以在这里我们需要在路径下再添加一个dist/
  - 在实际开发中并不需要添加在路径下再添加dist/ ,因为项目最终入口文件都会放到dist文件夹中, 现在是在学习阶段, 所以需要添加, 到后面要删除整个多余的dist/路径的

``` css
/* 这里是css中引入的两张图片 */
body {
  /* background: pink; */
  /* 这是一张小于limit 大小的图片 */
  /* background: url(../img/OIP.jfif) */
  /* 这是一张大于limit 大小的图片 */
  background: url(../img/sunlogo.jpg);
}
```
``` js
/* 这里是webpack.config.js 代码 */
/* 引用内置的path模块 */
const path = require("path");

// 使用CommonJS规范书写
module.exports = {
  // 编写入口
  entry : "./src/main.js",
  // 编写出口, output 是一个对象, 对象包含两个属性, path 路径 和fliename 文件名, 其中path路径必须是绝对路径
  // path绝对路径, 借助了node中的内置模块 path 的resolve方法
  output : {
    path : path.resolve(__dirname,"dist"),
    filename : "bundle.js", // 填写需要保存为的文件名
    // 设置publicPath, 让导出的每一个url地址在开头都添加上一个前缀地址
    publicPath: "dist/"
  },
  // 引入css文件需要局部安装 css-loader 和 style-loader
  module: {
    rules: [
      {
        test: /\.css$/,
        // 这里注意了, webpack在读取使用的loader的过程中，是按照从右向左的顺序读取的。
        // 所以是先执行css-loader 再执行 style-loader 顺序不能写错
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
    },
    {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            // 设置limit 限制图片的大小, 单位是B, 一般设置位8Kb, 
            limit: 16000,
            // 设置name属性, 来设置导出的图片名字
            name : "img/[name].[hash:8].[ext]"
          }
        }
      ]
    }
    ]
  }
}
```

### ES6语法处理
+ 如果仔细阅读webpack打包的js文件, 会发现写的ES6语法并没有转换成ES5语法, 这就意味着我们的代码不能兼容一些对ES6还不支持的浏览器
+ 如果要将ES6语法转换为ES5, 那么就需要使用babel
  - 命令行输入 npm install --save-dev babel-loader@7.1.5 babel-core@6.26.3 babel-preset-es2015@6.24.1 (这里是为了模块版本的兼容, 所以需要安装特定版本号的模块)
  - 配置webpack.config.js文件
  - 打包即可
``` js
{
  // 这句是匹配所有.js结尾的文件
  test: /\.js$/,
  // 这句是表示除了 node_modules|bower_components 文件夹内的文件
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      // 这里是转换位 ES5代码 的意思
      presets: ['es2015']
    }
  }
}
```

### 引入Vue.js
+ 在后续的项目中, 我们会使用Vuejs进行开发, 而且会以特殊的文件来组织Vue的组件
  - 所以需要在webpack环境中集成Vuejs
+ 利用npm安装Vue
  - 在项目文件目录下, 命令行输入 npm install vue --save
  - 注意这里要使用 运行时依赖安装 --save
    + 因为项目在浏览器中运行的时候要依赖vue的
+ 在需要的js文件中引入vue, 并且按照之前学习的语法使用Vue
+ 编写好vue代码后, 进行打包, 浏览器运行, 会发现报错
  - 错误信息提示, 我们使用的时runtime-only(运行时版本)的vue
    - 按照vue官网的意思是, 运行时版本的vue比runtime-compiler(完整版的vue)的文件大小要小30%, 所以默认vue是使用运行时版本的, 但是运行时版本的vue不包括编译template模块的功能, 而我们的root组件其实就算是一个template模块, 所以这里会报错
    - 解决方法, 在webpack.config.js打包工具中配置别名即可(其实就是将默认vue使用的版本修改问完整版的版本)
+ 重新打包, 浏览器运行, 就不会报错了

``` 
<!-- 在当前项目文件夹下, 终端输入命令行安装vue -->
npm install vue --save
```
``` js 
// 在需要使用vue的js文件中的js代码
// 5. 使用Vue
import Vue from "vue";
const app = new Vue({
  el : "#app",
  data : {
    message : "你好你好,我是Vue"
  }
})
```
``` html
<body>
  <div id="app">
    <h2>{{message}}</h2>
  </div>
  <script src="./dist/bundle.js"></script>
</body>
```

``` js
// 这里时webpack.config.js中配置Vue的别名
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  }
}
```

### el和template的区别
+ 如果我们希望修改页面中由vue解析的数据, 那么就必须修改index.html的代码
+ 如果我们后面自定义了组件, 也必须修改index.html的代码来使用组件
+ 但是html模板在之后的开发中, 我们不会频繁地修改
+ 这个时候就需要给Vue实例定义template属性了
  - 在Vue实例中,我们定义了el属性, 用域与index.html中的节点进行绑定, 让Vue实例之后可以管理节点中的内容
  - 在这里我们再给Vue实例再定义一个template属性, 并且编写渲染在页面中的模板
  - 如果Vue实例中同时定义了template和el, 那么template模板的内容就会替换掉挂载的对应的el的模板
+ 这样做的好处
  - 这样做只会, 就不需要再开发中操作index.html了, 只需要再template中写入对应的标签, Vue编译的时候就会将template中的模板替换掉index.html中被el挂载的标签

``` js
// 5. 使用Vue
import Vue from "vue";
new Vue({
  el : "#app",
  // 这个template中的模板,在Vue编译的时候,会替换el绑定的标签
  template: `
  <div>
    <h2>{{message}}</h2>
    <button>按钮</button>
    <h2>{{name}}</h2>
  </div>`,
  data : {
    message : "你好你好,我是Vue",
    name : "xiaoLam"
  }
})
```
### Vue组件化开发引入
+ Vue开发过程中, 我们都会采用组件化开发的思想
  - 在当前项目中, 我们也可以采用组件化的形式开发
+ 这里是将Vue实例中的emplate, data 抽取出来作为一个js文件模块, 同理也可以抽取实例中的其他option的, 例如 computed, methods等等
+ 然后再在main中导入这个js文件
``` js
export default {
  template : `
  <div>
    <h2>{{message}}</h2>
    <button>按钮</button>
    <h2>{{name}}</h2>
  </div>`,
  data() {
    return {
      message : "你好你好,我是Vue",
      name : "xiaoLam"
    }
  }
}
```
``` js
// 在main中导入上面的js文件
import test from "./vue/test.js" 
```

### .vue文件的封装处理
+ 一个组件以一个对象的形式进行组织和使用是非常不方便的
  - 一方面编写template模块很麻烦, 模块的代码写在ES6中的模板字符串中, 代码会很乱
  - 另外, 如果元素有样式的话, 也不知道应该写在哪一个地方
+ 所以现在, 使用一个全新的组件来组织Vue的组件
  - .vue文件就可以解决这个问题
  - .vue文件 由三个标签组成
    + <template>标签, 里面编写组件模板
    + <script>标签, 里面编写组件的组件构造器
    + <style>标签, 里面编写组件模板的样式
+ 这是一个新的文件类型, 所以我们需要用webpack中新的loader来处理这类文件
+ 在项目文件目录下, 命令行输入 npm install --save-dev vue-loader vue-template-compiler  (开发时依赖安装) 注意:这里使用的两个模块的版本分别是 vue-loader@13.0.0 和 vue-template-compiler@2.5.21版本
+ 在webpack.config.js 文件中修改配置
+ 然后在main.js文件中引用模块
+ 并且在Vue实例的components中注册, 这样就可以在Vue实例中的template中使用该组件模块了, 再进行打包即可

```
<!-- 再项目文件目录下, 命令行输入以下代码, 安装模块 -->
npm install --save-dev vue-loader vue-template-compiler
```
``` vue
// 这是.vue文件
// template标签内编写组件模板
<template> 
  <div>
    <h2 class="title">{{ message }}</h2>
    <button @click="btnClick">按钮</button>
    <h2>{{ name }}</h2>
    <test2></test2>
  </div>
</template>

<script>
// script标签内编写组件构造器, 如果有其他依赖的模块, 也可以用import导入其他的模块
import test2 from "./Test2.vue";
export default {
  name: "test",
  data() {
    return {
      message: "你好你好,我是Vue",
      name: "xiaoLam",
    };
  },
  methods: {
    btnClick() {
      console.log("我被点击了");
    },
  },
  components: {
    test2,
  },
};
</script>

<style scoped>
/* style标签内编写样式 */
.title {
  color: pink;
}
</style>
```
``` js
// 最后在main.js中导入模块
// 并且在Vue实例的components中注册, 这样就可以在Vue实例中的template中使用该组件模块了
import test from "./vue/Test.vue"

new Vue({
  el : "#app",
  template: `<test></test>`,
  components : {
    test
  }
})
```

### 认识plugin
+ 什么时plugin
  - plugin的意思时插件的意思, 通常是用于对某个现有的架构进行的扩展
  - webpack中的插件, 就是对webpack现有功能的各种扩展,比如打包优化,文件压缩等等

+ loader和plugin的区别
  - loader主要用于转换某些类型的模块, 他是一个转换器
  - 而plugin是插件, 是对webpack本事的扩展, 是一个扩展器

+ plugin的使用过程:
  - 步骤一: 通过npm安装需要使用的plugins(有一写plugin在webpack已经内置了,就不需要安装)
  - 步骤二: 在webpack.config.js中的plugins中配置插件

### 添加版权的plugin
+ 我们可以给打包的文件添加版权声明
  - 什么是版权声明
    + 百度五分钟
+ 添加版权的插件名为BannerPlugin, 属于webpack的内置插件(所以不需要npm安装)
+ 按照下列代码配置webpack.config.js中的plugins后重新打包程序, 就可以看到打包出来的文件头部多了版权的注释
``` js
// 引用webpack内置的模块
const webpack = require("webpack")
module.exports = {
  // ...
  // 在plugins中编写版权plugin
  plugins : [
    new webpack.BannerPlugin("最终版权归xiaoLam所有")
  ]
}
```

### 打包html的plugin
+ 目前, 我们的index.html文件时存放在项目的根目录中的
  - 但是,当我们要发布项目到服务器中的时候, 发布的是dist文件夹中的内容, 但是dist文件夹中没有index.html文件, 那么打包的js文件就没有意义了
  - 所以我们要将index.html文件打包到dist文件夹中, 这个时候就需要用到webpack中的HtmlWebpackPlugin插件了
+ HtmlWebpackPlugin插件有什么用?
  - 可以自动生成一个index.html文件(并且可以指定模板)
  - 会将打包的js文件,自动通过script标签插入到body中, 所以原本的index.html文件就不需要script标签了

+ htmlwebpackplugin插件的使用
  - 安装
    + 当前项目目录下 命令行输入 npm install html-webpack=plugin --save-dev (开发时依赖安装)
  - 在webpack.config.js文件中引用插件
  - 编辑webpack.config.js文件中的plugins部分的内容
    + template填入一个html文件的路径, 表示根据什么模板来生成index.html
    + 注意, 我们从现在开始就不需要output中以前添加的publicPath属性了, 因为已经将html打包进dist文件夹中了, 否则html文件中的路径引用会有问题
```
 <!--在当前项目目录下命令行输入  -->
 npm install html-webpack-plugin --save-dev
```

``` js
// 配置webpack.config.js 文件
// 引入webpack中的html-webpack-plugin模块
const htmlwebpackplugin = require("html-webpack-plugin");

output : {
  path : path.resolve(__dirname,"dist"),
  filename : "bundle.js", // 填写需要保存为的文件名
  // 设置publicPath, 让导出的每一个url地址在开头都添加上一个前缀地址
  // 在将index.html也一起打包到dist文件夹中的时候, 这句代码就要去掉了 把它注释掉
  // publicPath: "dist/"
},
plugins : [
  new webpack.BannerPlugin("最终版权归xiaoLam所有"),
  new htmlwebpackplugin({
  // 给htmlwebpackplugin实例添加一个对象, 对象里面包含template,值为html模板的路径
  template : "./index.html"
  })
]
```

### 压缩js的Plugin
+ 在项目发布的时候, 我们必然需要将js等文件进行压缩
  - 将所有的注释, 空格, 换行删除, 并将变量名和函数名转换为最简单的字符串
  - 以达到文件最小化, 增加传输加载效率
  - 所以在这里我们使用一个第三方插件uglifyjs-webpack-plugin, 并且为了与接下来学习的脚手架CLI2保持一致, 使用的版本号为 1.1.1
+ 安装uglifyjs-webpack-plugin
  - 在项目目录下, 命令行输入, npm install uglifyjs-webpack-plugin@1.1.1 --save-dev (使用开发依赖安装)
+ 修改webpack.config.js 配置文件

``` 
<!-- 在当前项目根目录下， 命令行输入 -->
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
```

``` js
// 在webpack.config.js 中进行配置
// 引入模块
const uglifyjswebpackplugin = requrie("uglifyjs-webpack-plugin");

// 在plugins中使用该模块
module.exports = {
  // ...
  plugins : [
    // ...
    new uglifyjswebpackplugin();
  ]
}
```

### 搭建本地服务器
+ 本地服务器的原理
  - 在开发过程中，新增的代码代码是经常需要调试的
  - 但是如果我们每次调试代码的时候, 都要将所有文件打包一次到本地磁盘中, 再在浏览器中运行, 这样的效率是十分低的
  - 我们可以搭建一个本地服务器, 将这个服务器服务于我们的某个文件夹, 此时这个服务器就会实时地监听代码有没有发生改变
  - 如果有发生改变的时候, 就会对改变的代码进行编译
  - 编译后并不会立即生成最终的文件, 也就是不会将编译好的代码存入硬盘中
  - 而是会将编译好的代码先放入内存中, 让我们进行测试 (这一点很重要), 内存的读取速度是远远大于硬盘的
    + 实际上本地服务器的作用就是, 将编写的代码先放入内存中, 而不是原来的放入某个文件夹中, 在测试的时候调用的是内存中的代码, 这样就不需要, 调试新增或者修改的代码的时候, 都要将代码打包到某个文件夹中, 再进行调试, 本地服务器可以实时地监听代码地更新  
  - 在最终想要发布的时候, 再打包一次代码即可
+ 如何搭建本地服务器
  - webpack提供了一个本地开发服务器, 这个本地服务器是基于node.js搭建地, 内部使用express框架, 可以实现我们想要的浏览器自动刷新显示修改代码地效果
  - webpack-dev-server 是一个单独的模块, 在webpack中使用需要先安装
    + 命令行输入 npm install webpack-dev-server@2.9.1 --save-dev (为了配合其他模块指定版本问2.9.1, 开发时依赖安装)
  - 在webpack.config.js中配置webpack-dev-server
    + devserver是webpack中的一个option选项, 所以不需要引用
    + devserver选项本身可以设置如下属性:
      - contentBase: 填写一个路径, 表示为哪一个文件夹提供本地服务, 默认是根文件夹, 这里我们填写 ./dist
      - port : 端口号, 默认是8080
      - inline : 设置页面是否实时刷新, 填入一个布尔值
      - historyApiFallback: 在SPA页面中, 依赖HTML5的history模式
+ 运行服务器
  - 配置好以上文件后, 在命令行输入 webpack-dev-server 来运行服务器
    + 会发现报错, 说没有找到该模块
    + 原因是, 在命令行直接输入模块名来运行模块, 终端会在全局中寻找该模块, 而我们的webpack-dev-server是局部安装的,所以会报错
  - 局部运行模块的两种方法
    + 第一种, 在命令行中完整输入模块路径
    + 第二种, 配置package.json中的scripts脚本属性
      - --open参数表示, 运行同时直接打开浏览器
```
<!-- 在当前项目根目录下 命令行输入 -->
npm install webpack-dev-server@2.9.1 --save-dev
```

```js
// 配置webpack.config.js
module.exports = {
  // ...
  devServer : {
    // 指定建立本地服务器的文件夹
    contentBase : "./dist",
    // 指定是否进行实时刷新页面
    inline : true
  }
}
```
```js
// 配置package.json文件中的 scripts脚本属性
"scripts": {
    // ...
    // 配置好后, 在命令行输入 npm run dev 就可以运行本地服务器了
    // --open是指, 能够在运行本地服务器的同时打开浏览器
    "dev" : "webpack-dev-server --open"
  }
```

### webpack的webpack.config.js配置分离
+ 在实际开发过程中
  - 开发时用的配置文件, 和 最终打包的配置文件是不一样的
    + 比如说, 在开发中,我们不需要用到uglifyjs-webpack-plugin压缩js这个插件, 在最终打包中不需要用到webpack-dev-server构建本地服务器这个插件
  - 所以我们应该将webpack.config.js中的配置进行抽取分离, 实现在开发中使用一套配置文件, 在打包时使用另一套配置文件
+ 进行配置分离的详细过程
  - 第一步, 创建配置文件的文件夹
    + 分离出来的配置文件会由一份变成好几份, 所以我们需要用一个新的文件夹来存储它们
    + 在项目根目录中创建名为build的文件夹, 里面存储配置文件
  - 第二步, 创建配置文件
    + base.config.js 这个配置文件里面包含的是公共的配置
    + prod.config.js 这个配置文件里面包含的是打包的时候使用的配置
    + dev.config.js 这个配置文件里面包含的是开发的时候使用的配置
  - 第三步, 下载合并配置文件的模块, webpack-merge , 这个模块用于将公共的配置和需要使用的配置合并在一起
    + 命令行输入 npm install webpack-merge@4.1.5 --save-dev (开发依赖安装)
  - 第四步, 配置webpack-merge模块, 就是简单的引用模块, 使用模块
  - 第五步, 调整原本配置的出口, 因为将配置文件放在了不同的位置, 所以要将原本配置中的路径修改一下
  - 第六步, 调整package.json中的scripts脚本, 因为npm执行配置文件的时候, 默认是寻找webpack.config.js文件的, 现在我们修改了文件的名称, 所以要修改scripts脚本

``` 
<!-- 在当前项目根目录下, 命令行输入 -->
npm install webpack-merge@4.1.5 --save-dev
```
``` js
// 这是base.config.js 中的代码
// 其余的代码不变, 只保留公共的部分
module.exports = {
  // ...
  output : {
    // 修改了path
    path : path.resolve(__dirname,"../dist"),
    filename : "bundle.js", // 填写需要保存为的文件名
  }
```
``` js
// 这是prod.config.js的代码
// 将只在打包时需要的配置抽取到这里
// 引入压缩js的webpack-plugin的模块
const uglifyjswebpackplugin = require("uglifyjs-webpack-plugin");

// 引入webpack-merge 配置文件合并模块
const webpackmerge = require("webpack-merge")

// 引入base基本配置文件
const baseConfig = require("./base.config.js")

// 使用CommonJS规范书写
module.exports = webpackmerge(baseConfig, {
  plugins : [
    new uglifyjswebpackplugin()
  ]
})
```

``` js
// 这是dev.config.js的代码
// 将开发时需要的配置抽取到这里
// 引入配置文件合并模块
const webpackmerge = require("webpack-merge");

// 引入base基本配置文件
const baseConfig = require("./base.config.js");

// 使用CommonJS规范书写
module.exports = webpackmerge(baseConfig, {
  devServer : {
    // 指定建立本地服务器的文件夹
    contentBase : "./dist",
    // 指定是否进行实时刷新页面
    inline : true
  }
})
```
``` json
// 这里时package.json的代码
// 修改scripts
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // --config 可以将默认使用的webpack.config.js配置文件修改为自定义的配置文件
    "build": "webpack --config ./build/prod.config.js",
    "dev": "webpack-dev-server --open --config ./build/dev.config.js"
  }
```
