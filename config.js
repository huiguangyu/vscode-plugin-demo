// https://code.visualstudio.com/api
const config = {
  // 插件名称
  name: "vscode-plugin-demo",
  // 插件的友好显示名称， 用于显示在应用市场，支持中文
  displayName: "VSCode插件demo",
  // 描述
  description: "描述",
  // 关键字， 用于应用市场搜索
  keywords: ["vscode", "console", "log"],
  // 版本
  version: "0.0.1",
  // 发布者
  publisher: "yuguanghui",
  // 支持插件最低的 vscode版本
  engines: {
    vscode: "1.23.0",
  },
  // 应用市场分类,可选值 [Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs]
  categories: ["Other"],
  // 插件的图标，至少128x128
  icon: "images/icon.png",
  // 插件入口
  main: "./src/extension.ts",
  // 扩展的激活事件数组，可以被哪些事件激活扩展，后文有详细介绍
  // onLanguage:javascript 只要打开js文件就会激活，采用语言标识符，可以单独条目声明多个
  // onCommand 执行对应命令会激活
  // onDebug 将在调试之前被激活
  // workspaceContains 工作区包含可匹配的文件，会被激活
  // * 每当 VS Code 启动时，就会发出激活事件，并激活感兴趣的扩展。
  // ...
  activationEvents: ["onCommand:extension.sayHello"],
  // 贡献点，最重要的配置
  contributes: {
    // 插件配置项
    // vscode.workspace.getConfiguration('myExtension')
    configuration: {
      type: "object", // string number 等
      // 配置项标题，会显示在vscode的setting.json
      title: "vscode-plugin-demo",
      properties: {
        // 这里我随便写了2个设置，配置你的昵称
        name: {
          type: "string",
          default: "yuguanghui",
          description: "你的名字",
        },
        // 是否在启动时显示提示
        showTip: {
          type: "boolean",
          default: true,
          description: "是否在每次启动时显示欢迎提示！",
        },
      },
    },
    // 命令
    commands: [
      {
        command: "extension.sayHello", // 命令的id,上面依靠这个id找到这个命令
        title: "Hello World", // 命令语句，在vscode中ctrl+shift+p 切出输入命令
      },
    ],
    // 快捷键绑定
    keybindings: [
      {
        command: "extension.sayHello",
        key: "ctrl+l",
        mac: "cmd+l",
        when: "editorTextFocus",
      },
    ],
    menus: {
      // 编辑器右键菜单
      "editor/context": [
        {
          // 表示只有编辑器具有焦点时才会在菜单中出现
          when: "editorFocus",
          command: "extension.sayHello",
          // navigation是一个永远置顶的分组，后面的@6是人工进行组内排序
          group: "navigation@6",
        },
        {
          when: "editorFocus",
          command: "extension.demo.getCurrentFilePath",
          group: "navigation@5",
        },
        {
          // 只有编辑器具有焦点，并且打开的是JS文件才会出现
          when: "editorFocus && resourceLangId == javascript",
          command: "extension.demo.testMenuShow",
          group: "z_commands",
        },
        {
          command: "extension.demo.openWebview",
          group: "navigation",
        },
      ],
      // 编辑器右上角图标，不配置图片就显示文字
      "editor/title": [
        {
          when: "editorFocus && resourceLangId == javascript",
          command: "extension.demo.testMenuShow",
          group: "navigation",
        },
      ],
      // 编辑器标题右键菜单
      "editor/title/context": [
        {
          when: "resourceLangId == javascript",
          command: "extension.demo.testMenuShow",
          group: "navigation",
        },
      ],
      // 资源管理器右键菜单
      "explorer/context": [
        {
          command: "extension.demo.getCurrentFilePath",
          group: "navigation",
        },
        {
          command: "extension.demo.openWebview",
          group: "navigation",
        },
      ],
    },
    // 代码片段
    snippets: [
      {
        language: "javascript",
        path: "./snippets/javascript.json",
      },
    ],
    viewsContainers: {
      activitybar: [
        {
          id: "coverUrl",
          title: "封面",
          icon: "images/coverUrl.png",
        },
      ],
    },
  },
  scripts: {
    postinstall: "node ./node_modules/vscode/bin/install",
    test: "node ./node_modules/vscode/bin/test",
  },
  // 开发依赖
  devDependencies: {},
  // 许可证 如MIT Apache
  license: "SEE LICENSE IN LICENSE.txt",
  bugs: {
    url: "https://github.com/xxx/vscode-plugin-demo/issues",
  },
  repository: {
    type: "git",
    url: "https://github.com/xxx/vscode-plugin-demo",
  },
  // 主页
  homepage: "https://github.com/xxx/README.md",
};
