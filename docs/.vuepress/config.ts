module.exports = {
    //设置网页head信息
    head: [
        ['link', {rel: 'icon', href: '/img/favicon.ico'}], //favicons，资源放在public文件夹
        [
            'meta',
            {
                name: 'keywords',
                content: '个人学习博客',
            },
        ],
        ['meta', {name: 'baidu-site-verification', content: '7F55weZDDc'}], // 百度统计的站长验证（你可以去掉）
        ['meta', {name: 'theme-color', content: '#11a8cd'}], // 移动浏览器主题颜色
    ],
    //设置语言
    locales: {
        '/': {
            lang: 'zh-CN',
            title: "Yami's blog",
            description: 'web前端技术博客,专注web前端学习与总结。JavaScript,js,ES6,TypeScript,vue,React,python,css3,html5,Node,git,github等技术文章。',
        }
    },
    //设置输出
    dest:'./public',
    //设置主题
    theme: 'vuepress-theme-vdoing',
    //配置主题
    themeConfig: {
        // 导航配置
        nav:[
            {text:'首页',link:'/'},
            {
                text:'前端',
                link:'/web/',
                items:[
                    {text:'HTML',link:'/pages/6e1c39/'},
                    {text:'CSS',link:'/pages/6cd8c2/'},
                    {text:'JavaScript',link:'/pages/f0d6b6/'},
                    {
                        text:'学习笔记',
                        items:[
                            { text: '《CSS教程》',link:'/note/css/'},
                            { text: '《JavaScript教程》', link: '/note/javascript/' },
                            { text: '《ES6教程》', link: '/note/es6/' },
                            { text: '《Ajax教程》', link: '/note/ajax/' },
                            { text: '《Vue教程》', link: '/note/vue/' },

                        ]
                    }
                ]
            },
            {
                text:'算法',
                link:'/algorithm/'
            },
            {
                text:'技术',
                link:'/technology/',
                items: [
                    { text: 'Git', link: '/note/git/'},
                    {text:'axios',link:'/pages/12abaa/'}
                ]
            },

            {
                text:'项目',
                link:'/projects/'
            },
            {
                text:'更多',
                link:'/more/',
                items:[
                    {text:'学习',link:'/pages/59c8b3/'},
                    {text:'使用技巧',link:'/pages/53c889/'}
                ]
            },
            {
                text: '收藏',
                link: '/pages/36bb3c/',
            },
            {
                text: '索引',
                link: '/archives/',
                items: [
                    { text: '标签', link: '/tags/' },
                    { text: '分类', link:'/categories/'},
                    { text: '归档', link: '/archives/' },
                ],
            },
        ],
        sidebarDepth: 2, //侧边栏显示深度，默认1，最大2（显示到h3标题）
        logo: '/img/favicons/logo.png', // 导航栏logo
        repo: 'yamin-hub/blog', // 导航栏右侧生成Github链接
        searchMaxSuggestions: 10, // 搜索结果显示最大数
        lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
        docsDir: 'docs', // 编辑的文件夹
        docsBranch: 'main', //编辑在main分支下
        editLinks: true, // 启用编辑
        editLinkText: '编辑',
        category: true, //关闭分类
        // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | <自定义>    温馨提示： 目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
        sidebar: 'structuring',
        // 文章默认的作者信息，(可在md文件中单独配置此信息) string | {name: string, link?: string}
        author: {
            name: 'Yami', // 必需
            link: 'https://github.com/yamin-hub', // 可选的
        },
        // 博主信息 (显示在首页侧边栏)
        blogger: {
            avatar: '/img/avatar.webp',
            name: 'Yami',
            slogan: '前端初学者',
        },
        //社交图标
        social: {
            // iconfontCssFile: '//at.alicdn.com/t/xxx.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自己添加。阿里图片库： https://www.iconfont.cn/
            icons: [
                {
                    iconClass: 'icon-youjian',
                    title: '发邮件',
                    link: 'mailto:2039013391@qq.com',
                },
                {
                    iconClass: 'icon-github',
                    title: 'GitHub',
                    link: 'https://github.com/yamin-hub',
                },
                {
                    iconClass: 'icon-erji',
                    title: '听音乐',
                    link: 'https://music.163.com/#/playlist?id=755597173',
                },
            ],
        },
        // 页脚信息
        footer: {
            createYear: 2022, // 博客创建年份
            copyrightInfo:
                'Yamin | <a href="https://github.com/yamin-hub/blog/blob/main/LICENSE" target="_blank">MIT License</a>', // 博客版权信息，支持a标签或换行标签</br>
        },
        // 扩展自动生成frontmatter。（当md文件的frontmatter不存在相应的字段时将自动添加。不会覆盖已有的数据。）
        extendFrontmatter: {
            author: {
                name: 'yami',
                link: 'https://github.com/yamin-hub'
            },
        },
    },

    //插件配置
    plugins:[
        'fulltext-search',
        [
            'one-click-copy', // 代码块复制按钮
            {
                copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
                copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
                duration: 1000, // prompt message display time.
                showInMobile: false, // whether to display on the mobile side, default: false.
            },
        ],
        [
            'vuepress-plugin-zooming', // 放大图片
            {
                selector: '.theme-vdoing-content img:not(.no-zoom)', // 排除class是no-zoom的图片
                options: {
                    bgColor: 'rgba(0,0,0,0.6)',
                },
            },
        ],
    ],
    markdown: {
        lineNumbers: true,
        extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
    },

    // 监听文件变化并重新构建
    extraWatchFiles: [
        '.vuepress/config.ts',
    ]
}
