---
title: 17-vue cil详解
date: 2022-07-08 16:09:11
permalink: /pages/f3ffda/
categories:
  - Vue
tags:
  - 
author: 
  name: yami
  link: https://github.com/yamin-hub
---
### 什么时Vue CLI
+ 如果只是写几个Vue的Demo程序, 那么时不需要用Vue CLI的
+ 如果在开发大型项目的话, 那么就需要, 而且必然需要使用Vue CLI
  - 因为在使用Vue.js开发大型应用的时候, 我们需要考虑代码的目录结构,项目结构和部署,热加载,代码单元测试(国内公司少做)等事情
  - 如果每个项目都要手动完成这些工作,那无疑效率是十分低效的, 所以我们需要使用一些脚手架工具来帮助完成这些繁琐的事情
+ CLI是什么意思
  - CLI是Command-Line Interface, 翻译过来就是命令行界面, 俗称脚手架
  - Vue CLI是官方发布vue.js项目脚手架
  - 使用vue-cli 可以快速搭建Vue开发环境以及对应的webpack配置

### 使用Vue CLI的前提 -- Node
+ 安装NodeJS
  - NPM安装 (推荐)
  - 官网安装
+ 检测安装的NodeJS版本
  - 使用脚手架需要Node环境8.9以上的版本
+ 什么是NPM
  - NPM 全称是 Node Package Manager
  - 就是一个NodeJS包管理和分发工具, 已经成为了非官方的发布Node模块的标准
  - 后续会经常使用NPM安装一些开发过程的依赖包

### 使用Vue CLI的前提 --Webpack
+ Vue.js官方脚手架工具就是使用webpack模板的
  - webpack可以对所有资源进行压缩等优化操作
  - 在开发过程中提供了一套完整的功能, 是开发变得更加高效
+ webpack的全局安装
  - npm install webpack -g

### Vue CLI的使用
+ 安装Vue脚手架
  - npm install @vue/cli -g
  - 注意默认安装的是Vue CLI4的版本, 如果需要安装Vue CLI2的方式初始化项目语法是不可以的
+ 如果需要用Vue CLI2的方式搭建脚手架
  - Vue CLI >= 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。如果你仍然需要使用旧版本的 vue init 功能，你可以全局安装一个桥接工具：
  - npm install -g @vue/cli-init

+ Vue CLI2初始化项目
  - vue init webpack my-project (my-project指的是项目名字)

+ Vue CLI>=3 初始化项目
  - vue create my-project (my-project指的是项目名字)

### 为了深入地学习脚手架, 本文会交替编写Vue CLI2 和 Vue CLI3
+ Vue CLI2 初始化项目详解
``` js
// 命令行输入
vue init webpack vuecli2test  // 意思是在该文件目录下 创建一个vuecli2test的项目
Project name // 项目名字, 默认是跟上面创建的项目名字相同
Project description // 项目描述
Auther // 项目作者
Vue build // 项目运行的vue版本, 选择是运行时版本还是完整版本
Install vue-router? // 是否安装vue-router 即是vue路由
Use ESLint to list your code? // 是否使用严格模式下的js代码
Set up unit test // 是否使用代码单元测试(国内少做)
Setup e2e tests with Nightwatch // 是否使用e2e测试
Should we run `npm install` for you after the project has been created? (recommended)  // 选择npm安装或者yarn安装
```

### Vue CLI2 初始化项目的目录结构详解

```js
├── node_modules:里面存放的是node的模块包
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

### 关于 ESLint 严格模式
+ 如果在初始化Vue CLI的过程中
  - 询问Use ESLint to list your code?的时候, 选择使用了其中一个规范
  - 那么在编写js代码的时候, 就要严格地遵循该规范, 如果有不遵循规范的地方, 运行本地服务器模块, 或者打包的时候, 会报错. 但是这个规范很不灵活, 不人性化, 所以一般都不会开启, 但是有些公司会要求开启, 那就要慢慢适应了
+ 如何关闭 ESLint 严格模式
  - 在当前项目中找到 config 文件夹下的 index.js 文件
  - 将里面的useEslint: true 改为 useEslint: false 即可

### Runtime-Compiler 和 Runtime-only的区别
+ 这两者最大的区别其实就是Runtime-Compiler具有解析template的功能, 而Runtime-only没有这个功能
  - Runtime-Compiler解析代码的过程为
    + template -> ast -> render -> vDOM(虚拟DOM) -> UI(真实渲染在页面中的DOM)
  - Runtime-only解析代码的过程为
    + render -> vDOM(虚拟DOM) -> UI(真实渲染在页面中的DOM)
+ 很明显runtime-only解析代码的时候是跳过了template -> ast 的过程的
  - 所以runtime-only比runtime-compiler更轻量(大小小了6KB), 而且代码执行效率更高, 因为解析的时候没有 template -> ast 的过程
+ 但是我们的.vue文件中是带有template模板的, 在runtime-only中是什么来解析template模板的呢?
  - 是由 vue-template-compiler 模块来解析的, 可以在package.json文件中找到该模块
  - .vue文件中的template模块, 在传入main.js文件中的时候, 已经被vue-template-compiler模块解析为一个 render对象了
  - 所以我们在实际开发中, 都是选用 runtime-only , 因为它更小更效率

### render函数的使用
+ 1.使用方法一 (基本不会用这种方法)
  - 1.1 基本使用
    + return createElement("标签名", {属性对象(可以不传)}, ["内容数组"])
  - 1.2 render函数嵌套
    + return createElement("标签名",
     {属性对象(可以不传)}, 
      ["内容",createElement("标签名",{属性对象(可以不传)},["内容数组"])])
+ 2.使用方法二
  - 传入一个组件对象
    + return createElement(App);
``` js
// 组件对象
const cpn = {
  template : `<h2>{{message}}</h2>`,
  data() {
    return {
      message : "你好你好"
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render : function(createElement) {
    // 1. 使用方法一: 
    // 1.1 基本使用 return createElement("标签名", {属性对象(可以不传)}, ["内容数组"])
    // return createElement("h2", {class : "box"}, ["你好你好我是render的内容"])
    
    // 1.2 嵌套render函数
    /* return createElement("h2",
    {class : "box"}, 
    ["你好你好", createElement("button",["我是按钮"])]) */

    // 2. 使用方法二: 传入一个组件对象
    return createElement(cpn);
  }
})
```

### 不能改的配置项

- ​	**public**文件夹名
- ​	**public**文件夹里面的**favicon.ico**和**index.html**
- ​	**src**文件夹
- ​	**main.js**文件

**可配置项需要在vue.config.js（该文件在src同级目录下）中配置，可配置项可以去官网看。[地址](https://cli.vuejs.org/zh/config/])**

### 认识Vue CLI3

+ vue-cli>=3 和 vue-cli2 版本的区别
  - vue-cli>=3 是基于webpack4 打造的, vue-cli2 是基于webpack3 打造的
  - vue-cli>=3 的设计原则是"0配置", 移除了根目录下的配置文件, build和config等目录
  - vue-cli>=3 提供了vue ui 命令, 也就是提供了可视化设置, 更加人性化, 更加方便修改设置了
  - 移除了static静态文件夹, 新增了public文件夹(这个文件夹里面的东西打包的时候也会原封不动地打包进dist中), 并且将index.html移动到了public文件夹中

+ 使用vue-cli>=3 初始化项目
  - 1. 选择配置方式
  - 2. 选择自己需要的配置(按空格选中或者反选), 选择完毕后直接敲回车进入下一步
  - 3. 选择对应的配置, 是单独生成文件还是放在package.json文件中, 建议单独生成文件
  - 4. 是否将刚才的选择配置保存下来
    + 如果选择是, 那么就会让你填入配置的名称, 在下次初始化项目的时候, 在第1步, 选择配置方式的步骤中, 就会出现保存下来的配置
  - 5. 选择npm安装还是yran安装

### vue-cli3 初始化项目的目录结构详解
+ node_modules文件夹: 储存node模块包
+ public文件夹: 相当于vue-cli2中的static静态文件夹, 在打包项目的时候, 会将里面的文件原封不动地添加到dist中, vue-cli3将index.html也放入了这个文件夹中
+ src文件夹: 存放源码的文件夹
  - assets文件夹: 放资源的, 图片logo等
+ .browserslistrc文件: 这个文件存放关于浏览器兼容的信息, 比如哪些浏览器需要兼容, 哪些浏览器不去兼容
+ .gitignore文件: 这个文件是存放关于上传项目的信息的
+ babel.config.js文件: 关于ES语法转换的
+ postcss.config.js文件: 关于样式转换的
+ package.json文件: 记录node模块版本信息
+ package-lock.json文件: 记录实际的node模块版本信息
+ README.md文件: 项目说明文件

### vue-cli3 与vue-cli2 中的main.js 的区别
+ vue-cli3中将 el: "#app" 去除了, 添加上了 .$mount('#app')
+ 实际上这两个东西是一样的作用
+ el: "#app" 在代码的解析的时候也会转换成 .$mount('#app')
``` js
new Vue({
  render: h => h(App),
}).$mount('#app')
// 在这里用链式操作, 添加上 .$mount('#app') 与在Vue实例中的 el : "#app" 是一样的作用
```

### vue-cli>=3的配置文件去哪里了? 要如何修改我们项目的配置呢?
+ 方法一: 要修改项目的配置, 可以在终端的命令行输入 vue ui 进入项目配置的可视化界面
  - 我们在什么时候安装了 vue ui 呢?
    + 在我们全局安装vue/cli 的同时安装了vue 和安装了vue ui这个模块
    + 所以我们在任何目录下都可以执行 vue ui 这个命令行
  - 在vue ui 可视化界面中导入我们的项目, 就可以对项目的插件, 依赖和配置进行修改了

+ 方法二: 在项目的根目录中按照路径 node_modules/@vue/cli-service 就可以找到项目的配置文件 webpack.config.js
  + 在webpack.config.js 文件中, 可以看到我们引用的配置在 当前文件夹中的 lib/Service中(一般不要随意修改node_modules中的文件)

+ 方法三: 在项目的根目录中新建一个名为 vue.config.js(名字是固定的不可以修改) 的文件
  - 在该文件中编写想要修改的配置
  - 在vue编译的时候, 就会在根目录中寻找这个文件, 如果找到了就会将文件中的配置与原本的配置进行合并





