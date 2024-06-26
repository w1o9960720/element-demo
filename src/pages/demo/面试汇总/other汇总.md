- [ ] 1、假设你们公司开发小程序没有区分环境，你做了，还写了一个简单的脚手架，这虽然是很小的事但还是能体现你的价值。
- [x] 2、比如你们公司没用ESLint、形成了一套标准，你推动各个项目组都使用了，你升级了webpack版本，优化了打包速度等等。这时你又学习到了ESLint 和webpack基本原理。
- [x] 3、比如小程序、PC端、H5端等、线上问题排查定位困难，你引入了免费的sentry错误监控，来解决问题，保证线上稳定性。（引入sentry其实挺简单的），通过这件事，你学习总结了错误监控原理，都是亮点。关于sentry原理推荐我的这篇文章若川：学习 sentry 源码整体架构，打造属于自己的前端异常监控SDK
- [x] 4、比如项目有登录功能，你研究后知道如何实现的，另外又自己总结了几种常见登录方案的优缺点。比如 jwt 和 session 等。
- [x] 5、比如你们可能每次都带薪打包编译项目，你引入了持续集成CI，都是体现你的价值。
- [x] 6、比如你们可能项目提交git commit message信息比较乱，你引入了工具校验message，生成changelog、使用了release-it等等，虽然比较容易， 但你有意识的去做了，也是亮点。
- [x] 7、根据业务场景和统计需求。引入了埋点（比如友盟）等，了解统计用户行为和浏览器等设备信息，帮助公司某些功能开发时做一些决策，而且研究了其原理等。
- [x] 8、假设你开发了很多组件，做成了组件库，但别的项目也要引用，这时候就需要私有化部署。但还是有问题，如果组件库一修改，其他引用的多个项目都要编译然后重新部署上线？是不是可以考虑CDN之类的，CDN可能不稳定，那么又如何兜底。这些思考起来，然后去解决沉淀就是你的收获和亮点。
- [ ] 9、假设每次新建页面都需要复制粘贴很多文件，然后替换注释（作者信息），那么是不是可以写个简单功能，根据已有模板，生成新页面的文件替换作者信息等等。
- [ ] 10、假设你们做了很多报表，大部分都是类似，是不是可以考虑做成拖拽快速生成报表。
- [ ] 11、前后端分离，接口都写在文档里，是不是可以直接写的文件里，然后方便数据mock，然后自行研究学会了数据mock的原理等。总之就是发现问题，解决问题，总结问题，推广给他人
- [x] 12. 大文件上传
- [x] 13. 打包优化
 14. webpack构建优化
- [ ] 15. loader- [x]
- [ ] 16. 后台管理权限
- [ ] 17. SKU
- [ ] 18. 骨架屏
- [x] 19. 长列表优化
- [x] 20. Vue大文件上传和断点续传
- [x] 21. 前端监控系统





# 1. 统一规范

## 代码规范

代码规范是指程序员编码时要遵守的规则，规范的目的就是为了让程序员编写易于阅读丶可维护的代码。

试想一下，有个几十万行的项目，存在几种不同的代码规范，阅读起来是什么感受？连代码缩进使用空格还是 Tab 都能引发不少程序员的争论，可以说统一代码是非常重要的事情。

统一代码规范除了刚才所说的两点外，还有其它好处：

- 规范的代码可以促进团队合作
- 规范的代码可以降低成本
- 规范的代码有助于 code review（代码审查）
- 养成代码规范的习惯吗，有助于程序员自身的成长

当团队的的成员严格按照代码规范写代码时，可以保证每个人的代码看起来是一个人写的，看别人的代码就像是看自己的代码（代码一致），阅读起来更加顺畅。更重要的是我们能够认识到规范的重要性，并坚持规范的开发习惯。

### 如何制定代码规范？

代码规范一般包含了 代码格式规范 丶 变量和函数命名规范  丶文档注释规范 等等。

#### 代码格式

一般是指代码缩进使用空格是 Tab丶每行结尾要不要加分号丶左花括号需不需要换行等等。

#### 命名规范

命名规范一般指命名使用驼峰式丶匈牙利式还是帕斯卡式；用名词丶名词组还是动宾结构来命名。

```js
const smallObject = {}; // 驼峰式，首字母小写
const SmallObject = {}; // 帕斯卡式，首字母大写
const strname = "strName"; // 匈牙利式 前缀表示变量式什么 这个前缀表示了式一个字符串
```

变量命名和函数命名的侧重点不同

变量命名的重点是表明这个变量”是什么“，倾向于用名词命名。而函数命名的重点是表明这个函数”做什么“，倾向于用动宾结构来命名（动宾结构就是 doSomething）

```js
// 变量命名示例
const appleNum = 1;
const sum = 10;

// 函数命名示例
function formatDate() { ... }
function toArray() { ... }
```

由于拼音同音字太多，千万不要使用配音来命名。

#### 文档注释

文档注释比较简单，例如单行注释使用`//`，多汗注释使用`/**/`

```js
/**
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 
function add(a, b) {
	return a + b;
} 
// 单行注释
const actie = true;
```

如果要让团队从头开始指定一份代码规范，工作量会非常大，也不现实。所以强烈建议找一份比较好的开源代码规范，在此基础上结合团队的需求做定制化修改。

下面列出比较出名的 JavaScript 代码规范：

- airbnb
- standard
- 百度前端编码规范

CSS 代码规范也有不少，例如：

- styleguide
- spec

### 如何检查代码规范

规定制定下来了，那怎么确保它被严格执行？目前有两个方法：

- 使用工具检验代码格式
- 使用 code review 审查变量命名丶注释

建议使用这两个方法双管齐下，确保代码规范被严格执行。

#### ESLint

ESLint 最初是由 Nicholas C.Zakas 于 2013 年 6 月创建的开源项目。它的目标是提供一个插件化的 JavaScript 代码检测工具。

1. 下载依赖

```js
// eslint-config-airbnb-base 使用 airbnb 代码规范
npm i -D babel-eslint eslint eslint-config-airbnb-base eslint-plugin-import
```

2. 配置 .eslintrc 文件

   ```js
   {
       "parserOptions": {
           "ecmaversion": 2019
       },
       "env": {
           "es6": true
       },
       "parser": "babel-eslint",
       "extends": "airbnb-base"  
   }
   ```

   在 package.json 的 script 加上这行代码 "lint": "eslint --ext .js test/ src/"。然后执行 npm run lint 即可开始验证代码。代码中的 test/ src/ 是要进行校验的代码目录，这里指明了要检查 test src 目录下的代码。

   不过这样检查代码的效率太低，每次都得手动检查。并且报错了还得手动修改代码。

   为了改善以上缺点，我们可以使用 VSCode。使用它并加上适当的配置可以在每次保存代码的时候，自动验证代码并进行格式化，省去了动手的麻烦。

   （如何使用 VSCode 自动格式化代码）

#### stylelint

stylelint 是一个开源的丶用于检查 CSS 代码格式的开源工具。

#### 使用 VSCode 自动化格式化代码

格式化 JavaScript 代码

安装 VSCode，然后安装插件 ESLint

<img src="https://img-blog.csdnimg.cn/img_convert/b4af668deae95fe6f00e8ce9a2b651bf.png">

选择 File -> Preference -> Setting(如果装了中文插件应该是 文件 -> 选项 -> 设置)，搜索 eslint，点击 Edit in setting.json

<img src="https://img-blog.csdnimg.cn/img_convert/9820d5a2ec912c0fa232908174911424.png">

将以下选项添加到配置文件

```js
"editor.codeActionsOnSave": {
    "source.fixAll": true
}
```

配置完之后，VSCode 会根据你当前项目下的 .eslintrc 文件的规则来验证和格式化代码。

<img src="https://img-blog.csdnimg.cn/img_convert/2124694cc6805a78697657ba790f69a0.gif">

### TypeScript 	

下载插件

```js
npm install --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

在 .eslintrc 配置文件，添加以下两个配置项：

```js
module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"]
}
```

在根目录下的 package.json 文件的 script 选项里添加以下配置项：

```js
"script": {
    "lint": "eslint --ext .js,.ts,tsx test/ src/",
}
```

test/ src/ 是你要校验的目录。修改完后，现在 ts 文件也可以自动格式化了。

<img src="https://img-blog.csdnimg.cn/img_convert/e990512dbf4bbf446017ec810b878ec1.gif">

## 拓展

### 如何格式化HTML丶Vue（或其他后缀）文件中的 HTML 和 CSS？

这需要利用 VSCode 自带的格式化，快捷键是 shift + alt + f。假设当前 VSCode 打开的是一个 Vue 文件，按下 shift + alt + f 会提示你选择一种格式化规范。如果没有提示，那就是已经有默认的格式化规范了（一般是 vetur插件），然后是 Vue 文件的所有代码都会格式化，并且格式化规则还可以自己配置。

具体规则如下图所示，可以根据自己的喜好来选择格式化规则。

<img src="https://img-blog.csdnimg.cn/img_convert/f532633b2856c8e1cedaa6c38c176151.png">

因为之前已经设置 ESLint 的格式化规则了，所以 Vue 文件只需要格式化 HTML 和 CSS 中的代码，不需要格式化 JavaScript 代码，所以我们需要禁止 vetur 格式化 JavaScript 代码：

<img src="https://img-blog.csdnimg.cn/img_convert/64fac739a981493721ae2fbdda495be0.png">

根据上图配置完成后，回到刚才的 Vue 文件。随意打乱代码的格式，再按下 shift + alt + f，会发现 HTML 和 CSS 中的代码已经格式化了，但是 JavaScript 的代码并没格式化。没关系，因为已经设置了 ESLint 格式化，所以只要执行保存操作，JavaScript 的代码也会自动格式化。

### 格式化 CSS 代码

下载依赖

```js
npm install  --save-dev stylelint stylelint-config-standard
```

在项目根目录下新建一个 .stylelintrc.json 文件，并输入以下内容

```js
{
    "extends": "stylelint-config-standard"
}
```

VSCode 添加 stylelint 插件

<img src="https://img-blog.csdnimg.cn/img_convert/afa020a625f5c5aee5fa304d35eb6682.png">

然后就可以看到效果了。

<img src="https://img-blog.csdnimg.cn/img_convert/6156343f2a04454fa1d843f8bdecd07e.gif">

如果你想修改插件的默认规则，可以看官方文档，它提供了 170 项规则修改。例如我想要用 4 个空格作为缩进，可以这样配置：

```js
{
    "extends": "stylelint-config-standard",
    "rules": {
          "indentation": 4  
    }
}
```

### Code Review 代码审查

代码审查是指让其他人来审查自己代码的一种行为。审查有很多种方式：例如结对编程（一个人写，一个人看）或者统一时间点大家互相做审查（单人或者多人）。

代码审查的目的是为了检查代码是否符合代码规范以及是否有错误的，另外也能让评审人了解被审人所写的功能。经常互相审查，能让大家更清晰地了解整个项目的功能，这样就不会因为某个核心开发人员离职了而引起项目延期。

当然，代码审查也是有缺点的：一是代码审查非常耗时，二是有可能引发团队成员争吵。据我了解，目前国内很多开发团队都没有代码审查，包括很多大厂。

个人建议在找工作时，可以咨询一下对方团队是否有测试规范丶测试流程丶代码审查。如果同时拥有以上几点，说明是一个靠谱的团队，可以优先选择。

## 项目规范

项目规范主要是指项目文件的组织方式和命名方式。统一项目规范是为了方便管理与修改，不会出现同样性质的文件出现在不同的地方。例如同样是图片，一个出现在 assets 目录，一个出现在 img 目录。

创建目录，需要按照用途来划分。例如比较常见的目录有：文档doc丶资源src丶测试test...

```js
|-- doc
|-- src
|-- test
```

src 资源目录又可以细分为：

```js
|-- api
|-- asset
|-- component
|-- style
|-- router 
|-- store
|-- util
|-- view
```

现在文件命名又很多钟形式（是否简写 img image丶是否复数img imgs丶文件名过长是用驼峰式还是用 - 连接oneTwo one-two）。其实用哪种方式不重要，最重要的命名方式一定要统一。

例如团队成员有人命名目录喜欢用复数形式（apis），有人喜欢用单数（api），这样是不允许的，一定要统一的。

## UI 规范

注意，这里的 UI 规范是指项目里常用 UI 组件的表现形式以及组件的命名方式，而不是指 UI 组件如何设计。

### 表现形式

现在开源的 UI 组件库又很多i，不同的组件库的表现形式也不一样。例如有些按钮组件点击时颜色变深，有些组件则是变浅。所以建议在 PC 端和移动端都使用统一的 UI 组件库（PC 端丶移动端各一个），或者同一个项目里只使用一个 UI 组件库。

例外，项目里常用的组件表示形式也需要通过文档确定下来。例如收缩展示的动画效果，具体到动画持续时间丶动画是缓进还是快出还是快进缓出等等。

如果不把这些表现方式的规范确定下来，就可能出现以下这种情况：

- 同样的组件，在不同的页面有不同表现形式（例如动画效果）。因为没有规范，开发根据个人喜好提交表现效果。
- 同样的二次确认弹窗，提示语不一样，按钮类型也不一样。

### 统一命名

统一命名，也是为了减少沟通成本。

举个例子，现在的日期组件可以选单个日期丶也可以选择范围日期，有的还可以选择时间。这样一来，一个日期组件就有四种情况：

- 单个日期带时间
- 单个日期不带时间
- 日期范围带时间
- 日期范围不带时间

如果这种情况不区分好，开发在看产品文档的时候就会疑惑，从而增加了开发与产品的沟通成本。

综上所述，我们可以发现制定 UI 规范的好处有两点：

- 统一页面 UI 标准，节省 UI 设计时间
- 减少沟通成本，提高前端开发效率

## git 目录规范

git 规范一般包括两点：分支管理规范 和  git  commit 规范

### 分支管理规范

一般项目主分支（master）和其它分支

当有团队成员要开发新功能或改 BUG 时，就从 master 分支开一个新的分支。例如项目要从客户端渲染改成服务端渲染，就开一个分支叫 SSR，开发完了再合并回 master 分支

如果要改一个重大的  BUG，也可以从 master 分支开一个新分支，并用 BUG 号命名

```js
# 新建分支并切换到新分支
git checkout -b test
# 切换回主分支，合并新分支
git chekout master
git merge test	
```

注意，在将一个新分支合并回 master 分支时，如果新分支中有一些意义不明确的 commit，建议先对它们进行合并（使用 git rebase）。合并后，在将新分支合并回 master 分支。

### git commit  规范

git 在每次提交时，都需要填写 commit message

```js]
git commit -m "this is a test"
```

commit  message 就是你对至此的代码提交进行一个简单的说明，好的提交说明可以让人一眼就明白这次代码提交说了什么。

<img src="https://img-blog.csdnimg.cn/img_convert/6ddb0c3a6a923d70d4d8a72229a2e9b6.png">

既然明白了 commit message 的重要性，那我们就要好好的学习一下 commit  message 规范。下面让我们看一下 commit message 的格式：

```js
<type>(<scope>):<subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>       
```

我们可以发现， commit message 分为三个部分（使用空格分割）

- 标题行（subject）：必填，填写主要修改类型和内容
- 主题内容（body）：描述为什么修改，做了什么样的修改，以及开发的思路等等
- 页脚注释（footer）：可以写注释，放 BUG 号的链接

type

commit 的类型

- feat：新功能丶新特性
- fix：修改 bug
- perf：更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
- refactor：代码重构（重构，在不影响代码内部行为丶功能下的代码修改）、
- docs：文档修改
- style：代码格式修改，注意不是 CSS 修改（例如分号修改）、
- test：测试用例新增丶修改
- build：影响项目构建或依赖项修改
- revert：恢复上一次提交
- ci：持续集成相关文件修改
- chore：其它修改（不在上述文件中的修改）
- release：发布新版本

scope

commit message 影响的功能或文件的范围，比如 route丶component丶utils丶build....

subject

commit message 的概述

body

具体修改内容，可以分为多行

footer

一些备注，通常是 BREAKING CHANGE 或修复的 bug 的链接

约定式提交规范

- 每个提交都必须使用类型字段前缀，它由一个名词组成，诸如 `feat` 或 `fix` ，其后接一个可选的作用域字段，以及一个必要的冒号（英文半角）和空格。
- 当一个提交为应用或类库实现了新特性时，必须使用 `feat` 类型。
- 当一个提交为应用修复了 `bug` 时，必须使用 `fix` 类型。
- 作用域字段可以跟随在类型字段后面。作用域必须是一个描述某部分代码的名词，并用圆括号包围，例如： `fix(parser):`
- 描述字段必须紧接在类型/作用域前缀的空格之后。描述指的是对代码变更的简短总结，例如： `fix: array parsing issue when multiple spaces were contained in string.`
- 在简短描述之后，可以编写更长的提交正文，为代码变更提供额外的上下文信息。正文必须起始于描述字段结束的一个空行后。
- 在正文结束的一个空行之后，可以编写一行或多行脚注。脚注必须包含关于提交的元信息，例如：关联的合并请求、Reviewer、破坏性变更，每条元信息一行。
- 破坏性变更必须标示在正文区域最开始处，或脚注区域中某一行的开始。一个破坏性变更必须包含大写的文本 `BREAKING CHANGE`，后面紧跟冒号和空格。
- 在 `BREAKING CHANGE:` 之后必须提供描述，以描述对 API 的变更。例如： `BREAKING CHANGE: environment variables now take precedence over config files.`
- 在提交说明中，可以使用 `feat` 和 `fix` 之外的类型。
- 工具的实现必须不区分大小写地解析构成约定式提交的信息单元，只有 `BREAKING CHANGE` 必须是大写的。
- 可以在类型/作用域前缀之后，: 之前，附加 `!` 字符，以进一步提醒注意破坏性变更。当有 `!` 前缀时，正文或脚注内必须包含 `BREAKING CHANGE: description`

#### 示例

##### [#](https://woai3c.gitee.io/introduction-to-front-end-engineering/02.html#fix-修复bug)fix（修复BUG）

每次 git commit 最好加上范围描述。

例如这次 BUG 修复影响到全局，可以加个 global。如果影响的是某个目录或某个功能，可以加上该目录的路径，或者对应的功能名称。

```js
// 示例1
fix(global):修复checkbox不能复选的问题
// 示例2 下面圆括号里的 common 为通用管理的名称
fix(common): 修复字体过小的BUG，将通用管理下所有页面的默认字体大小修改为 14px
// 示例3
fix(test): value.length -> values.length
```

##### feat（添加新功能或新页面）

```js
feat: 添加网站主页静态页面

这是一个示例，假设对任务静态页面进行了一些描述。
 
这里是备注，可以是放 BUG 链接或者一些重要性的东西。
```

##### chore（其他修改）

chore 的中文翻译为日常事务、例行工作。顾名思义，即不在其他 commit 类型中的修改，都可以用 chore 表示。

```js
chore: 将表格中的查看详情改为详情
```

其他类型的 commit 和上面三个示例差不多，在此不再赘述。

#### 验证 git commit 规范

利用 [git hook (opens new window)](https://git-scm.com/book/zh/v2/自定义-Git-Git-钩子)能在特定的重要动作发生时触发自定义脚本。

验证 git commit 规范也不例外，我们需要通过 git 的 `pre-commit` 钩子函数来进行。当然，你还需要下载一个辅助插件 husky 来帮助你进行验证。

> pre-commit 钩子在键入提交信息前运行，它用于检查即将提交的快照。

husky 是一个开源的工具，使用它我们可以在 `package.json` 里配置 `git hook` 脚本。下面让我们看一下如何使用：

下载

```js
npm i -D husky
```

在 `package.json` 加上下面的代码：

```js
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
}
```

然后在你项目根目录下新建一个文件夹 `script`，并在下面新建一个文件 `verify-commit.js`，输入以下代码：

```js
const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = require('fs')
.readFileSync(msgPath, 'utf-8')
.trim()

// 提前定义好 commit message 的格式，如果不符合格式就退出程序。
const commitRE = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
    console.error(`
        不合法的 commit 消息格式。
        请查看 git commit 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md
    `)

    process.exit(1)
}
```

现在来解释下各个钩子的含义：

1. `"pre-commit": "npm run lint"`，在 `git commit` 前执行 `npm run lint` 检查代码格式。
2. `"commit-msg": "node script/verify-commit.js"`，在 `git commit` 时执行脚本 `verify-commit.js` 验证 commit 消息。如果不符合脚本中定义的格式，将会报错。
3. `"pre-push": "npm test"`，在你执行 `git push` 将代码推送到远程仓库前，执行 `npm test` 进行测试。如果测试失败，将不会执行这次推送。

通过工具，我们可以很好的管理团队成员的 git commit 格式，无需使用人力来检查，大大提高了开发效率。

另外，我提供了一个简单的工程化 [DEMO (opens new window)](https://github.com/woai3c/front-end-engineering-demo)。它包含了自动格式化代码和 git 验证，如果看完文章还是不知道如何配置，可以参考一下。

**注意事项**：如果 husky 不起作用，请卸载 husky，然后重新下载 4.2.3 版本的 husky，就可以解决此问题。

```js
npm i -D husky@4.2.3
```

#### lint-staged

使用 `lint-staged` 可以只对 git 暂存区上的文件进行校验，不需要对所有的文件进行 lint 检查。

安装

```js
npm i -D lint-staged
```

将原来 `package.json` 文件中的代码：

```改为：
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
},
```

改为:

```js
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
},
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": "eslint",
  "test/**/*.{js,jsx,ts,tsx}": "eslint"
},
```

文件过滤说明：

```js
{
    "*.js": "项目下所有的 js 文件（不包含子文件夹）",
    "**/*.js": "项目下所有的 js 文件",
    "src/*.js": "src 目录所有的 js 文件（不包含子文件夹）",
    "src/**/*.js": "src 目录所有的 js 文件"
}
```

多个后缀匹配：

```js
"lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": "eslint",
  },
```

## 小结

其实统一规范的最根本目的就是为了保证团队的一致性，从而减少沟通成本，提高开发效率。我以前就经历了因为规范不标准，造成产品与开发理解有偏差丶开发各写各的代码，导致各种 BUG 不断，最后项目延期的事情。

所以说为了提高开发效率，减少加班，请一定要统一规范。





# 2. ESLint Prettier 区别

代码规范校验使用 ESLint，但是一开始 ESLint 只有检测告诉你哪里有问题，常常出现的情况就是一堆 warning，改起来很痛苦。后来 ESLint 提供了 $ ESLint filename --fix 的命令可以自动帮你修复一些不符合规范的代码。

Prettier 是一个代码格式化工具，可以帮你把代码格式化成可读性更好的格式，最典型的就是一行代码过长的问题。

## ESLint 和 Prettier 区别

eslint（包括其它一些 lint 工具）的主要功能包含代码格式的校验，代码质量的校验。Prettier 只是代码格式的校验（并格式化代码），不会对代码质量进行校验。代码格式问题通常指的是：单行代码长度丶 tab长度丶空格丶逗号表达式等问题。而代码质量问题指的是：未使用变量丶三等号丶全局变量声明等问题。

## ESLint 和 Prettier 配合使用

为什么要两者配合使用？因为，第一在 ESLint 推出 --fix 参数之前，ESLint 并没有自动化格式代码的功能，要对一些格式问题做批量格式化只能用 Prettier 这样的工具。第二 ESLint 的规则并不能完全包含 Prettier 的规则，两者不是简单的谁替代谁的问题。但是在 ESLint 推出 --fix 命令行参数之后，如果你觉得 ESLint 提供的格式化代码够用了，也可以不使用 Prettier。

ESLint 和 Prettier 相互合作的时候有一些问题，对于他们交集的部分规则，ESLint 和 Prettier 格式化后的代码不一致。导致的问题是：当你用 Prettier 格式化代码后再用 ESLint 去检测，会出现一些因为格式化导致的 warning。这个时候有两个解决方案：

- 运行 Prettier 之后，再使用 eslint --fix 格式化一把，这样把冲突的部分以  ESLint 的格式为标准覆盖掉，剩下的 warning 就都是代码质量问题了。
- 在配置 ESLint 的校验规则时候把和 Prettier 冲突的的规则 disable 掉，然后再使用 Prettier 的规则作为校验规则。那么使用 ESLint 校验就不会出现对前者的 warning。

为什么不能先使用 ESLint 再使用 Prettier?针对方案1，如果你后使用 Prettier，那么格式化后提交的代码在下一次或者别人 checkout 代码后通不过 lint 校验的。针对方案2，其实是可以的，但是本人在实践中看社区方案的时候有提到某些情况下 eslint --fix 和 Prettier 混用会出现格式化问题。所以保险起见还是先 prettier 格式化，而不用 eslint --fix 命令去格式化。

## 使用总结

- 前端项目必然要使代码规范，无论是 JS 还是 TS 项目。
- 如前面说说 Prettier 是擅长代码格式的校验，ESLint 擅长代码质量的检验。虽说 ESLint 也能格式校验，但是并没有 Prettier 那么的强势。对于 ESLint 和 Prettier 使用顺序问题，前面已做解释。
- ESLint 和 Prettier 的配置和依赖一定要跟随风格，比如环境差异导致无谓的 git commit。比如 VSCode 及其插件（Prettier）很容易做到编码风格统一，逐步强化团队协作中代码统一问题，再结合 git hook 做到 eslint 检验通过，这时团队风格和质量就能保持一致。





# 3. 前端组件化

## 高内聚，低耦合

高内聚，低耦合是软件工程中的概念，它是判断代码好坏的一个重要指标。高内聚，就是指一个函数尽量只做一件事情。低耦合，就是两个模块之间的关联程度低。

```js
// math.js
export function add(a, b) {
    return a + b;
}

export function mul(a, b) {
    return a * b;
}
```

```js
// test.js
import { add, mul } from "math"
add(1, 2);
mul(1, 2);
mul(add(1, 2), add(1, 2));
```

上面的 math.js 就是高内聚，低耦合的典型示例。 add() 丶 mul() 一个函数只做一件事，它们之间也没有直接联系。如果要将这两个函数联系在一起，也只能通过传参和返回值来实现。

既然有好的示例，那就有坏的示例，下面再看一个不好的示例。

```js
// 母公司
class Parent {
    getProfit(...sub) {
        let profit = 0;
        subs.forEach(sub => {
            profit += sub.revenue - sub.cost;
        })
        return profit;
    }
}

// 子公司
class Sub {
    constructor(revenue, cost) {
        this.revenue = revenue;
        this.cost = cost;
    }
}

const p = new Parent();
const s1 = new Sub(100, 10);
const s2 = new Sub(200, 150);
console.log(p.getProfit(s1, s2));
```

上面的代码是一个不太好的示例，因为母公司在计算利润时，直接操作了子公司的数据。更好的做法是，子公司直接把利润返回给母公司，然后母公司做一个汇总。

```js
class Parent {
    getProfit(...subs) {
        let profit = 0;
        subs.forEach(sub => {
            profit += sub.getProfit;
        })
        return profit;
    }
}

class Sub {
    constructor	(revenue, cost) {
        this.revenue = revenue;
        this.cost = cost;
    }
    getProfit () {
        return this.revenue - this.cost;
    }
}

const p = new Parent();
const s1 = new Sub(100, 10);
const s2 = new Sub(200, 150);
console.log(p.getProfit(s1, s2)) // 140
```

这样改就好很多了，子公司增加了一个 getProfit() 方法，母公司在做汇总时直接调用这个方法。

## 高内聚，低耦合在业务场景中的运用

理想很美好，现实很残酷。刚才的示例是高内聚丶低耦合比较经典的例子。但在业务场景中写代码不可能做到这么完美，很多时候要出现一个函数处理多个逻辑的情况。

举个例子，用户注册。一般注册会在按钮上绑定一个点击事件回调函数 register()，用于处理注册逻辑。

```js
function register(data) {
    // 1. 验证用户数据是否合法
    /**
    * 验证账号
    * 验证密码
    * 验证短信验证码
    * 验证身份证
    * 验证邮箱
    **/
    // 省略一大串 if 判断语句...
    
    // 2. 如果用户上传了头像，则将用户头像转成 base64 码保存
    /** 
    * 新建 FileReader 对象
    * 将图片转换成 base64 码
    **/
    // 省略转换代码...
    
    // 3. 调用注册接口
    // 省略注册代码
}
```

这个示例属于很常见的需求，点击一个按钮处理多个逻辑。从代码中也可以发现，这样写的结果九十三个功能耦合在一起。

按照高内聚丶低耦合的要求，一个函数应该尽量只做一件事。所以我们可以将函数中的另外两个功能：验证和转换单独提取出来，封装成一个函数。

```js
function register(data) {
    // 1.验证用户数据是否合法
    verifyUserData();
    
    // 2. 如果用户上传了头像，则将用户头像转换成 base64 码保存
    toBase64();
    
    // 3. 调用注册接口
    // 省略注册代码...
}
function verifyUserData() {
    /**
    * 验证账户
    * 验证密码
    * 验证短信验证码
    * 验证身份证
    * 验证邮箱
    */
    // 省略一大堆串 if 判断语句...
}

function toBase64() {
    /**
    * 新建 FileReader 对象
    * 将图片转换成 base64 码
    */
    // 省略转换代码...
}
```

这样修改以后，就可以符合高内聚丶低耦合的要求了。以后即使要修改或移除丶新增功能，也非常方便。

## 模块化丶组件化

### 模块化

模块化，就是把一个个文件看成一个模块，它们之间作用域相互隔离，互不影响干扰。一个模块就是一个功能，它们可以被多次复用。另外，模块化的设计也体现了分治的思想。

字面上的理解是”分而治之“，就是把一个复制的问题分成两个或更多的相同或相似的子问题，直到最后子问题可以简单的直接求解，原问题的解子问题的解的合并。

从前端方面看，单独的 JavaScript 文件丶CSS 文件都算是一个模块。

例如一个 math.js 文件，它就是一个数字模块，包含了和数字运算相关的函数。

```js
// math.js
exports function add(a, b) {
    return a + b;
}

exports function mul(a, b) {
    return a * b;
}

exports function abs() { ... }
```

一个 button.css 文件，包含了按钮相关的样式：

```js
/* 按钮样式 */
button {
    ...
}
```

### 组件化

那什么是组件化？我们可以认为组件就是页面里的 UI 组件，一个页面可以由很多组件构成。例如一个后台管理系统页面，可能包含了 Header 丶Sidebar 丶Main 等各种组件。

一个组件又包含了 template(html)丶script丶style三部分，其中 script 丶style 可以由一个或多个模板组成。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85b61d1df959425ba68a96d5d1cdd98e~tplv-k3u1fbpfcp-zoom-1.image">

从上图可以看到，一个页面可以分解成一个个组件，每个组件又可以分解成一个个模块，充分体现了分治的思想。

由此可见，页面成为了一个容器，组件是这个容器的基本元素。组件与组件之间可以自由切换丶多次复用，修改页面只需修改对应的组件即可，大大的提高了开发效率。

最理想的情况就是一个页面元素全部由组件构成，这样前端只需要写一些交互的逻辑代码。虽然这种情况很难完全实现，但是我们要尽量往这个方向去做，争取实现全面组件化。

## Web Components

得益于技术的发展，目前三大框架在构建工具（例如 webpack丶vite...）的配合下都可以很好的实现组件化。例如 Vue，使用 *.Vue 文件就可以把 template 丶script丶style写在一起，一个 *.vue 文件就是一个组件。

```js
<template>
    <div>
    	{{ msg }}
    </div>
</template>    

<script>
export default {
	data() {
        return {
            msg: "Heelo World!"
        }
    }
}
</script>

<style>
    font-size: 14rpx;
</style>    
```

如果不使用框架和构建工具，还能实现组件化吗？

答案是可以的，组件化是前端未来的发展方向，Web Components 就是浏览器原生支持的组件化标准。使用 Web Components API，浏览器可以在不引入第三方代码的情况下组件化。

### 实战

### Custom elements （自定义元素）

现在我们来创建一个 customElements.define() 方法，允许我们定义一个自定义元素和它的行为，然后再页面中使用。

```j
class CustomButton extends HTMLElement {
	constructor {
		// 必须首先调用 super 方法
		super();
		
		元素的功能写在这里
		const templateContent = diocument.getElementById("custom-button").content;
		const shadowRoot = this.attachShadow({ mode: "open" });
		
		shadowRoot.appendChild(templateComponent.cloneNode(true));
		
		shadowRoot.querySelector("button").onclick = () => {
			alert("Hello World!");
		}
	}
	
	connectedCallback() {
		console.log("connected");
	}
}

customElements.define("custom-button", CustomButton);
```

上面的代码使用 custonElements.define() 方法注册了一个新的元素，并向其传递了元素的名称 custom-button丶指定元素功能的类 CustomButton。然后我们可以在页面中这样使用：

```js
<custom-button></custom-button>
```

这个自定义元素继承 HTMLElement （HTMLElement 接口代表所有的 HTML 元素），表明这个自定义元素具有 HTML 元素的特性。

使用  <template>  设置自定义元素内容

```js
<template id="custom-button">
    <button>自定义按钮</button>
	<style>
    	button {
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            text-align: center;
            box-sizing: border-box;
            outline: none;
            margin: 0;
            transition: 1s;
            font-weight: 500;
            padding: 12px 20px;
            font-size: 14px;
            border-radius: 4px;
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
            border: 0;
        }

		button:active {
            background: #3a8ee6;
            border-color: #3a8ee6;
            color: #fff;
        }
    </style>
</template>    
```

从上面的代码可以发现，我们为这个自定义元素设置了内容 `<button>自定义按钮</button>`以及样式，样式放在 style 标签里面，可以说 template 其实就是一个 HTML 模板。

Shadow DOM（影子DOM）

设置了自定义元素的名称丶内容以及样式，现在就差最后一步了：将内容丶样式挂载到自定义元素上。

``` 
// 元素的功能写在这里
const templateContent = document.getElementById("custom-button").content;
const shdowRoot = this.attachShadow({ mode: "open" });

shadowRoot.appendChild(templateContent.cloneNode(true));

shadowRoot.querySelector("button").onclick = () => {
	alert("Hello World");
}
```

元素的功能代码由一个 attachShadow() 方法，它的作用是将影子 DOM 挂到自定义元素上。DOM 我们知道是什么意思，就是指页面元素。那“影子”是什么意思呢？“影子”的意思就是附加到自定义元素上的 DOM 功能是私有的，不会与页面其它元素发生冲突。

attachShadow() 方法还有一个参数 mode，它由两个值：

- open 代表可以从外部访问影子 DOM
- closed 代表不可以从外部访问影子 DOM

```js
// open,返回 shadowRoot
document.querySelector('custom-button').shadowRoot;
// closed，返回 null
document.querySelector('custom-button').shadowRoot;
```

### 生命周期

自定义元素有四个生命周期：

- connectedCallback：当自定义元素第一次被连接到文档 DOM 时被调用。
- disconnectedCallback：当自定义元素与文档 DOM 断开连接时被调用
- adoptedCallback：当自定义元素被移动到新文档时被调用。
- attributeChangedCallback：当自定义元素的一个属性被增加丶移除或更改时被调用

生命周期在触发会自动调用对应的回调函数，例如本次示例中就设置了 connnectedback() 钩子。

最后附上完整的代码：

```js
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">	
    <title>Web Compoents</title>
</head>
<body>
        <custom-button></custom-button>
		
		<template id="custom-button">
        	<button>自定义按钮</button>
			<style>
            	button {
                    display: inline-block;
                    line-height: 1;
                    white-space: nowrap;
                    cursor: pointer;
                    text-align: center;
                    box-sizing: border-box;
                    outline: none;
                    margin: 0;
                    transition: .1s;
                    font-weight: 500;
                    padding: 12px 20px;
                    font-size: 14px;
                    border-radius: 4px;
                    color: #fff;
                    background-color: #409eff;
                    border-color: #409eff;
                    border: 0;
                }

				button:active {
                    bacground: #3a8ee6;
                    border-color: #3a8ee6;
                    color: #fff;
                }
            </style>
       	</template>
</body>

<script>
	class CustomButton extends HTMLElement {
        constructor () {
            // 必须首先调用 super 方法
             super();
            
            // 元素的功能代码写在这里
            const templateContent = document.getElementById("custom-button").content;
            const shadowRoot = this.attachShadow({ mode: "open" });
            
            shadowRoot.appendChild(templateContent.cloneNode(true));
            
            shadowRoot.querySelector('button').onclick = () => {
                alert("Hello World");
            }
        }
        
        connectedCallback() {
            console.log("connected");
        }
    }
    
    customElements.define("custom-button", CustomButton);        
</script>
```





# 4. 测试

## 什么是测试？

维基百科的定义：在规定的条件下对程序进行操作，以发现程序错误，衡量软件质量，并对其是否满足设计要求进行评估的过程。

也可以这样理解：测试的作用是为了提高代码质量和可维护性。

- 提高代码质量：测试就是找 BUG，找出 BUG，然后解决它。BUG 少了，代码质量自然就高了。
- 可维护性：对现有代码进行修改丶新增功能从而造成的成本越低，可维护性就越高。

## 什么时候写测试？

如果你的程序非常简单，可以不用写测试。例如下面的程序，功能简单，只有十几行代码：

```js
function add(a, b) {
    return a + b;
}

function sum(dat = []) {
    let result = 0;
    data.forEach(val => {
        result = add(result, val);
    })
    
    return result;
}

console.log(sum([1, 2, 3, 4, 5, 6, 7, 8, 9,10]));
```

如果你的程序有数百行代码，但封装得很好，完美得践行了模块化得理念。每个功能模块单一丶代码少，也可以不用写测试。

如果你的程序有成千上万行代码，数十行模块，模块与模块之间的交互错综复杂。在这种情况下，就需要写测试了。试想下，在你对一个复杂功能的项目进行修改后，如果没有测试会是什么情况？你需要将跟这次修改有关的每个功能都手动测一遍，以防止有 BUG 出现。但如果你写了测试，只需执行一条命令就能知道结果，省时省力。

## 测试类型与框架

测试类型有很多种：单元测试丶集成测试丶百盒测试...

测试框架也有很多种：Jest 丶Jasmine丶LambdaTest...

## Jest

安装

```js
npm i -D jest
```

打开 package.json 文件，在 script 下添加测试命令：

```js
"script": {
    "test": "jest"
}
```

然后在项目根目录下新建 test 目录，作为测试目录。

## 单元测试

什么是单元测试？

维基百科：单元测试（英语：Unit Testing）又称为模块测试，是针对程序模块（软件设计的最小单位）来进行准确性检验的测试工作。

从前端角度来看，单元测试就是对一个函数丶一个组件丶一个类做的测试，它针对的粒度比较小。

单元测试应该怎么写呢？

- 根据正确性写测试，即正确的输入应该有正常的结果。
- 根据错误性写测试，即错误的输入应该是错误的结果。

### 对一个函数做测试

例如一个取绝对值的函数 abs()，输入1, 2，结果应该与输入相同；输入-1，-2，结果应该与输入相反。如果输入非数字，例如 "abc"，应该抛出一个类型错误。

```js
// math.js
function abs(a) {
    if(typeof a != "number") {
        throw new TypeError("参与必须为数值型");
    }
    
    if(a < 0) return -a;
    return a;
}

// test.spec.js
test("abs", () => {
    expect(abs(1).toBe(1));
    expect(abs(0).toBe(0));
    expect(() => abs("abs")).toThrow(TypeError); // 类型错误
})
```

现在我们需要测试一下 abs() 函数：在 src 目录新建一个 main.js 文件，在 test 目录新建一个 test.spec.js 文件。然后将上面的两个函数代码写入对应的文件，执行 npm run test，就可以看到测试效果。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c5cb6fdc0954ff7baeaec2c70eb5a4d~tplv-k3u1fbpfcp-zoom-1.image">

### 对一个类做测试

假设有这样一个类：

```js
class Math {
    abs() {
        
    }
    
    sqrt() {
        
    }
    
    pow() {
        
    }
    ...
}
```

我们必须把这个类所有的方法都测一遍

```js
test('Math.abs', () => {
    // ...
})

test('Math.sqrt', () => {
    // ...
})

test('Math.pow', () => {
    // ...
})
```

### 对一个组件做测试

组件测试比较难，因为很多组件都涉及了 DOM 操作。

例如一个上传组件，它有一个将图片转成 base64 码的方法，那要怎么测试呢？一般测试都是跑在 node 环境下的，而 node 环境没有 DOM 对象。

我们先来回顾一下上传图片的过程：

- 点击 `<input type="file"/>`， 选择图片上传
- 触发 input 的change 事件，获取 file 对象
- 用 FileReader 将图片转换成 base64 码

这个过程和下面的代码是一样的：

```js
document.querySelector("input").onchange = function fileChangeHandler(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (res) => {
        const fileResult = res.target.result;
        console.log(fileResult); // 输出 base64 码
    }
    render.renderAsDataURL(file);
}
```

上面的代码只是模拟，真实情况下应该是这样使用：

```js
document.querySelector("input").onchange = function fileChangeHandler(e) {
    const file = e.target.files[0];
    tobase64(file);
}

function tobase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (res) => {
            const fileResult = res.target.result;
            resolve(fileResult); // 输出 base64 码
        }
        reader.readerAsDataURL(file);
    })
}
```

可以看到，上面的代码出现了 window 的事件对象 event 丶 FileReader。也就是说，只要我们能够提供这两个对象，就可以在任何环境下运行它。所以我们可以在测试环境下加上这两个对象：

```js
// 重写 File
window.File = function () {}

// 重写 FileReader
window.FileReader = function() {
    this.readAsDataURL = function () {
        this.onload 
        	&& target: {
                result: fileData
            }
    }
}
```

然后测试可以这样写：

```js
// 提前写好文件内容
const fileData = "data:image/test";

// 提供一个假的 file 对象给 tobase64() 函数
function test() {
    const file = new File();
    const event { target: {files: [file]}};
    file.type = "image/png";
    file.name = "test.png";
    file.size = 1024;
    
    if("file content", (done) => {
        tobase64(file).then(base64 => {
            expect(base64).toEqual(fileData);
            done();
        })
    })
}

// 执行测试
test();
```

提供这种 hack 的方式，我们就实现了对涉及 DOM 操作的组件的测试，

### 测试覆盖率

什么是测试覆盖率？用一个公式来表示：代码覆盖率 = 已执行的代码数 / 代码总数。Jest 如果要开启覆盖测试率统计，只需要在 Jest 命令后面加上 --coverage 参数：

```js
"script": {
    "test": "jest --coverage"
}
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/883c387751e148f588cf6836b29702de~tplv-k3u1fbpfcp-zoom-1.image">

覆盖率统计项

从覆盖率的图片可以看到一共有 4 个统计项：

- Stmts(statements)：语句覆盖率，程序中的每个语句是否都已执行
- Branch：分支覆盖率，是否执行了每个分支
- Funcs：函数覆盖率，是否执行了每个函数
- Lines：行覆盖率，是否执行了每一行代码

可能有人会有疑问，1和4不是一样的吗？其实不一样，因为一行代码可以包含好几个语句。

```js
if(typeof a != "number") {
    throw new TypeError("参数必须为数值型");
}

if(typeof a != "number") throw new TypeError("参数必须为数值型");
```

例如上面两段代码，它们对应的测试覆盖率就不一样。现在把测试类型错误的那一行代码注释掉，再试试：

```js
// expect(() => abs("abs")).toThrow(typeError);
```

第一段代码对应的覆盖率：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bf1ad49931c4d04a6d23f5944a0dcab~tplv-k3u1fbpfcp-zoom-1.image">



第二段代码对应的覆盖率：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/763b41496b874d97b69193d86b21d27b~tplv-k3u1fbpfcp-zoom-1.image">

它们未执行的语句都是一样，但第一段代码的 LInes 覆盖率更低，因为它有一行代码没执行。而第二行代码未执行的语句和判断语句是再同一行，所以 Lines 覆盖率为 100%。

### TDD 测试驱动开发

TDD（Test-Driven Development）就是根据需求提前把测试代码写好，然后根据测试代码实现功能。

TDD 的初衷是好的，但如果你的需求经常变，那就不是一件好事了。很有可能你天天都在写测试代码，业务代码反而没怎么动。

所以 TDD 用不用还得取决于业务需求是否经常变更，以及你对需求是否有清晰的认识。

## ESE 测试

端到端测试，主要是模拟用户对页面进行一系列操作并验证其是否符合预期。本章将使用 Cypress 讲解 E2E 测试。

Cypress 在进行 E2E 测试时，会打开 Chrome 浏览器，然后根据测试代码对页面进行操作，就像一个正常的用户在操作页面一样。

安装

```js
npm i -D cypress
```

打开 package.json 文件， 在 scripts 新增一条命令：

```js
"cypress": "cypress open"
```

然后执行 npm run cypress 就可以打开 Cypress。首次打开会自动创建 Cypress 提供的默认测试脚本。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5ce595f8e754198bc2460ae1e6cbc64~tplv-k3u1fbpfcp-zoom-1.image">

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fa5eca185c54082a509a1d91902b824~tplv-k3u1fbpfcp-zoom-1.image">

点击右边的 Run 19 integration specs 就会进行执行测试。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d2fe1bc5c0548df8f7e150dbb0aea16~tplv-k3u1fbpfcp-zoom-1.image">

### 第一次测试

打开 cypress 目录，在 integration 目录下新建一个 e2e.spec.js 测试文件：

```js
describe("The Home Page", () => {
    if("successfully loads", () => {
        cy.visit("http://localhost:8080");
    })
})
```

运行它，会无意外应该会看到一个测试失败的提示。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2781d0e1ccd49bb911866a28acfcbaf~tplv-k3u1fbpfcp-zoom-1.image">

因为测试文件要求访问 http://localhost:8080 服务器，但现在还没有。所以我们需要使用 express 创建一个服务器，新建 server.js 文件，输入以下代码：

```js]
// server.js
const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
	res.send("Hello World!");
})

app.listen(port, () => {
	console.olg(`Example app listening at http://localhost:${port}`);
})
```

执行 node server.js，重新运行测试，这次就可以看到正确的结果了。

<img src="https://segmentfault.com/img/remote/1460000039093886">

PS：如果你使用了 ESLint 来校验代码，则需要下载 eslint-plugin-cypress 插件，否则 Cypress 的全局命令会报错。下载插件后，打开 .eslintrc 文件，在 plugins 选项中加上 cypress。

```js
"plugins": [
    "cypress"
]
```

### 模拟用户登录

上一个测试实在有点小儿科，这次我们来写一个稍微复杂一点的测试，模拟用户登录：

- 用户打开登录页 /login.html
- 输入账号密码（都是 admin）
- 登录成功后，跳转到 /index.html

首先需要重写服务器，修改一下 server.js 文件的目录：

```js
// server.js
const bodyParse = require('body-parser');
const express = require("express");
const app = express();
const port = 8000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("./login", (req, res) => {
    const { account, password } = req.body;
    // 由于没有注册功能，所以假定账号密码都为 admin
    if(account === "admin" && password === "admin") {
        res.send({
            msg: "登录成功",
            code: 0
        })
    }else {
        res.send({
            msg: "登录失败，请输入正确的账号密码",
            code: 1
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${post}`);
})
```

由于没有注册功能，所以暂时在后端写死账号密码为 admin。然后新建两个 html 文件：login.html 和 index.html，放在 public 目录。

```js
<!-- login.html -->
<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial=scale=1.0">
    <title>login</title>
	<style>
        div {
            text-align: center;
        }

		button {
            display: inline-block;
            line-height: 1;
            white-space: norwap;
            cursor: pointer;
            text-aligin: center;
            box-sizing: border-box;
            outline: none;
            margin: 0;
            transition: 0.1s;
            font-weight: 500;
            padding: 12px 20px;
            font-size: 12px 20px;
            border-radius: 4px;
            color: #fff;
            background-color: #409efff;
            border-color: #409efff;
            border: 0;
        }

		button:active {
            background: #3a8ee6;
            border-color: #3a8ee6;
            color: #fff;
        }

		input {
            display: block;
            margin: auto;
            margin-bottom: 10px;
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            boz-sizing: border-box;
            color: #606266;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: none;
            padding: 0 15px;
            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
    </style>    
</head>
<body>
      <div>
        <input type="text" placeholder="请输入账号" class="account">
        <input type="password" placeholder="请输入密码" class="password">
        <buttton>登录</button>
      </div>
      <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.min.js"></script>
      <script>
          document.querySelector("button").onclick = () => {
          axios.post("/login", {
              account: document.querySelector(".account").value,
              password: document.querySelector(".password").value
          })
          .then(res => {
              if(res.data.code == 0) {
                  location.href = "/index.html";
              } else {
                  alert(res.data.msg);
              }
          })
      }
      </script>   
</body>
</html>
```

```js
<!-- index.html -->
<!DCOTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale="1.0">
    <title>index</title>
</head>
<body>
     Hello World!
</body>
</html>
```

login.html 静态页

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df6b5a89a7024a6dae0c6a36985b7867~tplv-k3u1fbpfcp-zoom-1.image">

然后把测试文件内容改了一下：

```js
describle("The Home Page", () => {
    if("login", () => {
        cy.visit("http://localhost:8080/login.html");
        // 输入账号密码
        cy.get(".account").type("admin");
        cy.get(".password").type("admin");
        
        cy.get("button").click();
        // 重定向到 /index
        cy.url().should("include", "http://localhost:8080/index.html")
        
        // 断言 index.html 页面是否包含 Hello World! 文本
        cy.get("body").should("contain", "Hello World!");
    })
})
```

现在重新运行服务器 node server.js, 再执行 npm run cypress，点击右边的 Run... 开始测试

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/035b32febde7454d88abb9935c42c284~tplv-k3u1fbpfcp-zoom-1.image">

测试结果正确。为了统一脚本的使用规范，最好将 node server.js 命令替换为 npm run start：

```js
"scripts": {
    "test": "jest --coverage test/",
    "lint": "eslint --ext .js test/ src/",
    "start": "node server.js",
    "cypress": "cypress open"
}
```





# 5. 监控

```js
// 前端监控流程 
数据采集 --> 数据上报 --> 服务端处理 --> 数据库存储 --> 数据监控可视化平台
```

## 数据采集

### 性能数据采集

先了解一下  Web API  window.performance

> Perfomance 接口可以获取到当前页面中与性能相关的信息，它是 High Resolution Tim API的一部分，同时也融合了 Performance Timeline API丶Navigation Timing API丶User Timing API 和 Resource Timing API。

 这个 API 的属性 timing，包括了页面加载各个阶段的起始及结束时间。

<img src="https://user-gold-cdn.xitu.io/2020/6/12/172a6933c51f8baf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

<img src="https://user-gold-cdn.xitu.io/2020/6/12/172a6933c5ac7847?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

timing 各个属性的意义

```js
timing: {
    // 同一个浏览器上一个页面卸载(unload)结束时的时间戳。如果没有上一个页面，这个值会和fetchStart相同。
	navigationStart: 1543806782096,

	// 上一个页面unload事件抛出时的时间戳。如果没有上一个页面，这个值会返回0。
	unloadEventStart: 1543806782523,

	// 和 unloadEventStart 相对应，unload事件处理完成时的时间戳。如果没有上一个页面,这个值会返回0。
	unloadEventEnd: 1543806782523,

	// 第一个HTTP重定向开始时的时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0。
	redirectStart: 0,

	// 最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的时间戳。
	// 如果没有重定向，或者重定向中的一个不同源，这个值会返回0. 
	redirectEnd: 0,

	// 浏览器准备好使用HTTP请求来获取(fetch)文档的时间戳。这个时间点会在检查任何应用缓存之前。
	fetchStart: 1543806782096,

	// DNS 域名查询开始的UNIX时间戳。
    //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和fetchStart一致。
	domainLookupStart: 1543806782096,

	// DNS 域名查询完成的时间.
	//如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
	domainLookupEnd: 1543806782096,

	// HTTP（TCP） 域名查询结束的时间戳。
    //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 fetchStart一致。
	connectStart: 1543806782099,

	// HTTP（TCP） 返回浏览器与服务器之间的连接建立时的时间戳。
    // 如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
	connectEnd: 1543806782227,

	// HTTPS 返回浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，则返回0。
	secureConnectionStart: 1543806782162,

	// 返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间戳。
	requestStart: 1543806782241,

	// 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间戳。
        //如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。
	responseStart: 1543806782516,

	// 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时
        //（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳。
	responseEnd: 1543806782537,

	// 当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的 readystatechange事件触发时）的时间戳。
	domLoading: 1543806782573,

	// 当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的时间戳。
	domInteractive: 1543806783203,

	// 当解析器发送DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的时间戳。
	domContentLoadedEventStart: 1543806783203,

	// 当所有需要立即执行的脚本已经被执行（不论执行顺序）时的时间戳。
	domContentLoadedEventEnd: 1543806783216,

	// 当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange 被触发时的时间戳
	domComplete: 1543806783796,

	// load事件被发送时的时间戳。如果这个事件还未被发送，它的值将会是0。
	loadEventStart: 1543806783796,

	// 当load事件结束，即加载事件完成时的时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0.
	loadEventEnd: 1543806783802
}
```

通过以上数据，我们可以得到几个有用的时间

```js
// 重定向耗时
redirect: timing.redirectEnd - timing.redirectStart,
    
// DOM 渲染耗时
dom: timing.domComplete - timing.domLoading,

// 页面加载耗时
load: timing.loadEventEnd - timing.navigationStart,
    
// 页面卸载耗时
unload: timing.unloadEventEnd - timing.unloadEventStart,
 
// 请求耗时
request: timing.responseEnd - timing.requestStart,

// 获取性能信息当前时间
time: new Date().getTime()
```

还有一个比较重要的时间就是白屏时间，它指从输入网址到页面开始显示内容的时间

**将以下脚本放在 `</head>` 前面就能获取白屏时间**

```js
<script>
    whiteScreen = new Date - peformance.timing.navigationStart;
</script>    
```

通过这几个时间，就可以知道页面首屏加载性能如何了。

例外，通过 **window.performance.getEntriesByType("resource")** 这个方法，我们还可以获取相关资源（js丶css丶img...）的加载时间，它会返回页面当前加载的所有资源。

<img src="https://user-gold-cdn.xitu.io/2020/6/12/172a6933c5bb7990?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

它一般包括以下几个类型：

- script
- link
- img
- css
- fetch
- other
- xmlhttprequest

我们只需要用到以下几个信息

```js
// 资源的名字
name: item.name	

// 资源加载耗时
duration: item.duration.toFixed(2)

// 资源大小
size: item.transferSize

// 资源所用协议
protocol: item.nextHopProtocol
```

现在，写几行代码来收集这些数据

```js
// 收集性能信息
const getPerformance = () => {
    if(!window.performance) return;
    const timing = window.performance.timing;
    const performance = {
        // 重定向耗时
        redirect: timing.redirectEnd - timing.redirectStart.
        // 白屏时间
        whiteScreen: whiteScreen,
        // DOM 渲染耗时
        dom: timing.domComplete - timing.domLoading,
        // 页面加载耗时
        unload: timing.unloadEventEnd - timing.unloadEventStart,
        // 请求耗时
        request: timing.responseEnd - timing.requestStart,
        // 获取性能信息时当前时间
        time: new Date().getTime()
    }
	return performance
}


// 获取资源信息
const getRequest = () => {
    if(!window.perfomance) return;
    const data = window.performance.getEntriesByType('resource');
    const resource = {
        xmlhttprequest: [],
        css: [],
        other: [],
        script: [],
        img: [],
        link: [],
        fetch: [].
        // 获取资源信息时当前时间
        time: new Date().getTime()
    }
	data.forEach(item => {
        const array = resource[item.initialtorType];
        array && array.push({
            // 资源的名字
            name: item.name,
            // 资源加载耗时
            duration: item.duration.toFixed(2),
            // 资源大小
            size: item.transferSize
            // protocol: item.nextHopProtocol,
        })
    })
	return resource;
}
```

#### 小结

**通过对性能及资源信息的解读，我们可以判断出页面加载慢有以下几个原因：**

- 资源过多
- 网速过慢
- DOM 元素过多

### 错误数据采集

通过这几天的资料查找，了解到现在能捕捉的错误有三种：

- 资源加载错误
- JS 执行错误
- promise 错误

解决方案

- 通过 addEventListener('error', callback, true) 在捕获阶段捕捉资源失败错误
- window.onerror 捕捉 JS 错误
- 通过 addEventListener('unhandledrejection', callback) 捕捉 promise 错误，但是没有发生错误得行数丶列数等信息，只能手动抛出相关错误信息

我们可以建一个错误数组变量 errors 在错误发生时，将错误的相关信息添加到数组，然后在某个阶段统一上报，具体如何查找请看代码：

```js
// 捕获资源加载失败错误 js css img ...
addEventListener('error', e => {
    const target = e.target;
    if(target != window) {
        monitor.errors.push({
            type: target.localName,
            url: target.src || target.href,
            msg: (traget.src || target.href) + ' is load error',
            // 错误发生的事件
            time: new Date().getTime()
        })
    }
}, true)

// 监听 js 错误
window.onerror = function(msg, url, row, col, error) {
    monitor.errors.push({
        type: "javascript",
        row: row,
        col: col,
        msg: error && error.stack ? error.stack : msg,
        url: url,
        // 错误发生的时间
        time: new newDate().getTime()
    })
}

// 监听 promise 错误，缺点是获取不到行数数据
addEventListener('unhandledrejected', e => {
    monitor.errors.push({
        type: "promise",
        msg: (e.reason && e.reason.msg) || e.reason || '',
        // 错误发生的时间
        time: new Date().getTime()
    })
})
```

#### 小结

**通过错误收集，可以了解网站错误发生的类型及数量，从而可以做相应的调整，以减少错误的发生。**

## 数据上报

### 性能数据上报

**性能数据可以在加载完成之后上报，尽量不要对页面性能造成影响。**

```js
window.onload = () => {
    // 在浏览器空闲时间获取性能及资源信息
    if(window.requestIdleCallback) {
        window.requestIdleCallback(() => {
            monitor.performance = getPerformance();
            monitor.resource = getResources();
        })
    }else {
        setTimout(() => {
            monitor.performance = getPerformance();
            monitor.resources = getResources()'' 
        }, 0)
    }
}
```

当然，你也可以设一个定时器，循环上报。不过每次上报最好做一下对比去重再上报，避免同样的数据重复上报。

### 错误数据上报

我在 DEMO 里提供的代码，是用一个 errors 数组收集所有的错误，再在某个阶段统一上报（延时上报）。其实，也可以改成错误发生时上报（即时上报）。这样可以避免在收集错误延时上报还没触发，用户却已经关闭网页导致数据丢失的问题。

```js
监听 js 错误
window.onerror = function(msg, url, row, col, error) {
    const data = {
        type: "javascript",
        row: row,
        col: col,
        msg: error && error.stack ? error.stack : msg,
        url: url
        // 错误发生的时间
        time: new Date().getTime()
    }

	// 即时上报
	axios.post({ url: 'xxx', data})
}
```

## 拓展

### SPA

window.performance API 是由缺点的，在 SPA 切换路由时，window.performance.timing 的数据不会更新。所以我们需要另想办法来统计切换路由到加载完成的时间。拿 Vue 举例，一个可行的办法就是切换路由时，在路由的全局前置守卫 **beforeEach** 里获取开始时间，在组件的 **mouted** 钩子里执行 vm.$nextTick 函数来获取组件的渲染完毕时间。

```js
router.beforeEach((to, from, next) => {
    store.commit('setPageLoadedStartTime', new Date());
})
```

```js
mouted() {
    this.$nextTick(() => {
        this.$store.commit('setPageLoadedTime', new Date() - this.$store.state.pageLoadedStartTime);
    }) 
}
```

除了性能和错误监控，其实我们还可以做得更多

### 用户信息收集

#### navigator 	

使用 window.navigator 可以收集到用户的设备信息丶操作系统丶浏览器信息.....

#### UV(Unique visitor)

是指提供互联网访问丶浏览这个网页的自然人。访问您网站的一台电脑客户端作为一个访客。0:00-24:00 内相同的客户端只被计算一次。一天内同个访客多次访问仅计算一个 UV。在用户访问网站时，可以生成一个随机字符串+时间日期，保存到本地。在网页发生请求时（如果超过当天 24 小时，则重新生成），把这些数据传到后端，后端利用这些信息生成 UV 统计报告。

#### PV（Page View）

即网页浏览量或点击量，用户每一次对网站中的每个网页访问均被记录一个PV。用户对同一个页面的多次，访问量累计，用以衡量网站用户访问的网页数量。

#### 网页停留时间

传统网页 用户在进入 A 网页时，提供后台请求把用户进入页面的时间捎上。过了10分钟，用户进入 B 页面，这时后台可以通过接口捎带的参数可以判断出用户在 A 页面停留了 10 分钟。 SPA 可以利用 router 来获取用户停留时间，用 Vue 举例，通过 **router.beforeEach destroyed** 这两个钩子函数来获取用户停留该路由组件的时间。

#### 浏览深度

通过 document.documentElement.scrollTop 属性以及屏幕高度，可以判断用户是否浏览完网站内容。

#### 页面跳转来源

通过 document.referrer 属性，可以知道用户是从哪个网站跳转而来。

DEMO

```js
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script>
        function monitorInit() {
            const monitor = {
                // 数据上传地址
                url: '',
                // 性能信息
                performance: {},
                // 资源信息
                resources: {},
                // 错误信息
                errors: [],
                // 用户信息
                user: {
                    // 屏幕宽度
                    screen: screen.width,
                    // 屏幕高度
                    height: screen.height,
                    // 浏览器平台
                    platform: navigator.platform,
                    // 浏览器的用户代理信息
                    userAgent: navigator.userAgent,
                    // 浏览器用户界面的语言
                    language: navigator.language,
                },
                // 手动添加错误
                addError(error) {
                    const obj = {}
                    const { type, msg, url, row, col } = error
                    if (type) obj.type = type
                    if (msg) obj.msg = msg
                    if (url) obj.url = url
                    if (row) obj.row = row
                    if (col) obj.col = col
                    obj.time = new Date().getTime()
                    monitor.errors.push(obj)
                },
                // 重置 monitor 对象
                reset() {
                    window.performance && window.performance.clearResourceTimings()
                    monitor.performance = getPerformance()
                    monitor.resources = getResources()
                    monitor.errors = []
                },
                // 清空 error 信息
                clearError() {
                    monitor.errors = []
                },
                // 上传监控数据
                upload() {
                    // 自定义上传
                    // axios.post({
                    //     url: monitor.url,
                    //     data: {
                    //         performance,
                    //         resources,
                    //         errors,
                    //         user,
                    //     }
                    // })
                },
                // 设置数据上传地址
                setURL(url) {
                    monitor.url = url
                },
            }

            // 获取性能信息
            const getPerformance = () => {
                if (!window.performance) return
                const timing = window.performance.timing
                const performance = {
                    // 重定向耗时
                    redirect: timing.redirectEnd - timing.redirectStart,
                    // 白屏时间
                    whiteScreen: whiteScreen,
                    // DOM 渲染耗时
                    dom: timing.domComplete - timing.domLoading,
                    // 页面加载耗时
                    load: timing.loadEventEnd - timing.navigationStart,
                    // 页面卸载耗时
                    unload: timing.unloadEventEnd - timing.unloadEventStart,
                    // 请求耗时
                    request: timing.responseEnd - timing.requestStart,
                    // 获取性能信息时当前时间
                    time: new Date().getTime(),
                }

                return performance
            }

            // 获取资源信息
            const getResources = () => {
                if (!window.performance) return
                const data = window.performance.getEntriesByType('resource')
                const resource = {
                    xmlhttprequest: [],
                    css: [],
                    other: [],
                    script: [],
                    img: [],
                    link: [],
                    fetch: [],
                    // 获取资源信息时当前时间
                    time: new Date().getTime(),
                }

                data.forEach(item => {
                    const arry = resource[item.initiatorType]
                    arry && arry.push({
                        // 资源的名称
                        name: item.name,
                        // 资源加载耗时
                        duration: item.duration.toFixed(2),
                        // 资源大小
                        size: item.transferSize,
                        // 资源所用协议
                        protocol: item.nextHopProtocol,
                    })
                })

                return resource
            }

            window.onload = () => {
                // 在浏览器空闲时间获取性能及资源信息 https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
                if (window.requestIdleCallback) {
                    window.requestIdleCallback(() => {
                        monitor.performance = getPerformance()
                        monitor.resources = getResources()
                        console.log('页面性能信息')
                        console.log(monitor.performance)
                        console.log('页面资源信息')
                        console.log(monitor.resources)
                    })
                } else {
                    setTimeout(() => {
                        monitor.performance = getPerformance()
                        monitor.resources = getResources()
                        console.log('页面性能信息')
                        console.log(monitor.performance)
                        console.log('页面资源信息')
                        console.log(monitor.resources)
                    }, 0)
                }
            }

            // 捕获资源加载失败错误 js css img...
            addEventListener('error', e => {
                const target = e.target
                if (target != window) {
                    monitor.errors.push({
                        type: target.localName,
                        url: target.src || target.href,
                        msg: (target.src || target.href) + ' is load error',
                        // 错误发生的时间
                        time: new Date().getTime(),
                    })

                    console.log('所有的错误信息')
                    console.log(monitor.errors)
                }
            }, true)

            // 监听 js 错误
            window.onerror = function(msg, url, row, col, error) {
                monitor.errors.push({
                    type: 'javascript', // 错误类型
                    row: row, // 发生错误时的代码行数
                    col: col, // 发生错误时的代码列数
                    msg: error && error.stack? error.stack : msg, // 错误信息
                    url: url, // 错误文件
                    time: new Date().getTime(), // 错误发生的时间
                })

                console.log('所有的错误信息')
                console.log(monitor.errors)
            }

            // 监听 promise 错误 缺点是获取不到行数数据
            addEventListener('unhandledrejection', e => {
                monitor.errors.push({
                    type: 'promise',
                    msg: (e.reason && e.reason.msg) || e.reason || '',
                    // 错误发生的时间
                    time: new Date().getTime(),
                })

                console.log('所有的错误信息')
                console.log(monitor.errors)
            })

            return monitor
        }

        const monitor = monitorInit()
    </script>
    <link rel="stylesheet" href="test.css">
    <title>Document</title>
</head>
<body>
    <button class="btn1">错误测试按钮1</button>
    <button class="btn2">错误测试按钮2</button>
    <button class="btn3">错误测试按钮3</button>
    <img src="https://avatars3.githubusercontent.com/u/22117876?s=460&v=4" alt="">
    <img src="test.png" alt="">
<script src="192.168.10.15/test.js"></script>
<script>
document.querySelector('.btn1').onclick = () => {
    setTimeout(() => {
        console.log(button)
    }, 0)
}

document.querySelector('.btn2').onclick = () => {
    new Promise((resolve, reject) => {
        reject({
            msg: 'test.js promise is error'
        })
    })
}

document.querySelector('.btn3').onclick = () => {
    throw ('这是一个手动扔出的错误')
}
</script>
</body>
</html>

```

前端监控有三个步骤：前端埋点丶数据处理和数据分析

前端监控的目的：获取用户行为以及跟踪产品在用户端的使用情况，并以监控数据为基础，指明产品优化的方向。

前端监控可以分为三类：数据监控丶性能监控和异常监控。





# 前端埋点

收集监控数据根据我们是通过前端埋点来实现，目前的常见的前端埋点方法有三种：手动埋点丶可视化埋点和无埋点。

## 手动埋点

手动埋点，也叫代码埋点，即纯手动写代码，调用埋点 SDK 的函数，在需要埋点的业务逻辑功能位置调用接口，上报埋点数据，像友盟丶百度统计等第三方数据统计服务商大都采用这种方案。

手动埋点让使用者可以方便地设置自定义属性丶自定义事件；所以当你需要深入下钻，并精细化自定义分析时，比较适合使用手动埋点。

手动埋点的缺陷就是项目工程量大，需要埋点的位置太多，而且需要产品开发运营之间相互反复沟通，容易出现手动差错吗，如果错误，重新埋点的成本也很高。这会导致整个数据收集周期变得很长，收集成本变得很高，而且效率很低。因为手动埋点需要开发人员完成，所以每次埋点有更新，或者漏埋点，都需要重新走上线发布流程，更新成本也高，对线上稳定性也有一定危害。

## 可视化埋点

通过可视化交互的手段，代替上述的代码埋点。将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，提供这个可视化系统，可以在业务代码中自定义的增加埋点事件等等，最后输出的代码耦合了业务代码和埋点代码。缺点就是可以埋点的控件有限，不能手动定制。

可视化埋点听起来比较高大山，实际上跟代码埋点还是区别不大。也就是用一个系统来实现手动插入代码埋点的过程。比如国外比较早做可视化的 Mixpanel，国内较早可视化埋点的有 TalkingData丶诸葛IO，2017年腾讯的 MTA 也宣布支持可视化埋点；相比于手动埋点更新困难，埋点成本高的问题，可视化埋点优化了移动运营中数据采集的流程，能够支持产品运营随时调整埋点，无需再走开发版流程，直接把配置结果推入前端，数据采集流程更简化，也更方便产品的迭代。

可视化埋点中多数基于 Xpath 的方案，XPath 是一门在 XML 文档中查找信息的语言，XPath 可用来在 XML 文档中对元素的和属性进行遍历。

## 无埋点

无埋点是前端自动采集全部事件，上报埋点数据，由后端来过滤和计算出有用的数据。优点是前端只要一次加载埋点脚本，缺点是流量和采集的数据过于庞大，服务器性能压力山大。

采用无埋点的有主流的 GrowingIO丶神策。

## 上报

对于上报的方式无外乎两种：

- Ajax 的方式上报
- 提供 image 的形式进行上报

目前很多大厂都是采用的是 1* 1像素的的 Gif 图片进行上报

**为什么采用 image 的方式进行上报？**

- 没有处理跨域。因为数据服务器和后端服务器大概率是不同的页面，若采用 Ajax 的方式进行处理还要处理跨域问题，否则数据会被浏览器拦截的。
- 不会阻塞页面加载，只需 new Image 对象即可

**图片类型很多，为什么采用 gif 这种格式进行上报？**

小。对于1*1像素的图片，BMP结构的文件需要 74 字节，PNG 结构的文件需要 67 字节，GIF 结构的字节只需要 43 字节。同样的响应，GIF 可以比 BMP节约 41% 的流量，比 PNG 节约 35% 的流量，所以使用  GIF 进行上报。











# 6. 如何减少白屏时间（白屏监控）





# 7. 大文件上传和断点续传

## 大文件上传

### 整体思路

#### 前端

前端大文件上传网上的大部分文章已经给出了解决方案，核心是利用 Blob.prototype.slice 方法，和数组的 slice 方法相似，调用的 slice 方法可以返回原文件的某个切片。

这样我们就可以根据预先设置好的切片最大数量将文件切分为一个个切片，然后借助 http 的可并发性，同时上传多个切片，这样原本传一个大文件，变成了同时传多个小的文件切片，可以大大的减少上传时间。

另外由于是并发，传输到服务端的顺序可能会发生变化，所以我们还需要给每个切片记录顺序。

#### 服务端

服务端需要负责接收这些切片，并在接收所有切片后合并切片。

这里又引申出两个问题

- 合并合并切片，即切片什么时候传输完成
- 如何合并切片

第一个问题是需要前端进行配合，前端在每个切片中都携带切片最大数量的信息，当服务端接收这个数量的切片时自动合并，也可以额外发一个请求主动同时服务端进行切片的合并。

第二个问题，具体如何进行合并切片？这里可以使用 nodejs 的读写流（readStream/writeStream），将所有切片的流传输到最终文件的流里。

### 前端部分

#### 上传控件

首先创建选择文件的控件，监听 change 事件以及上传按钮

```js
<template>
    <div>
    	<input type="file" @change="handleFileChange" />
        <el-button @click="handleUpload">上传</el-button>    
    </div>
</template>

<script>
export default {
	data => ({
		container: {
            file: null
        }
	}),
    methods: {
        handleFileChange(e) {
            const [file] = e.target.files;
            if(!file) return;
            Object.assign(this.$data, this.$options.data());
            this.container.file = file;
        },
        async handleUpload() {}    
    }    
};
</script>
```

<img src="https://user-gold-cdn.xitu.io/2020/1/7/16f7ff98adb6bcdd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

#### 请求逻辑

考虑到通用性，这里没有用到第三方的请求库，而是用原生的 XMLHttpRequest 做一层简单的封装来发送请求

```js
request({
    url, 
    method = "post",
    data,
    headers = {},
    requestList    
}) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(headers).forEach(key => {
            xhr.setRequest(key, headers[key]);
        });
        xhr.send(data);
        xhr.onload = e => {
            resolve({
                data: e.target.response
            })
        }
    })
}
```

上传切片

接着实现比较重要的上传功能，上传需要做两件事

- 对文件进行切片
- 将切片传输给服务端

```js
<tempalate>
    <div>
    	<input type="file" @change="handleFileChange" />
        <el-button @click="handleUpload">上传</el-button> 
    </div>
</template>

<script>
const SIZE = 10 * 1024 * 1024; // 切片大小

export default {
    data: () => ({
        container: {
            file: null
        },
        data: []
    }),
    methods: {
        request () {},
        handleFileChange() {
            // 生成文件切片
            createFileChunk(file, size = SIZE) {
                const fileChunkList = [];
                let cur = 0;
                while(cur < file.size) {
                    fileChunkList.push({ file: file.slice(cur, cur + size) });
                    cur += size;
                }
                return fileChunkList;
            },
            // 上传切片
            async unloadChunks() {
                const requestList = this.data
                	.map(({ chunk, hash }) => {
                        const formData = new FormData();
                        formData.append("chunk", chunk);
                        formData.append("hash", hash);
                        formData.append("filename", this.container.file.name);
                        return { formData };
                    })
                	.map(async ({ formData }) => {
                        this.reques({
                            url: "http://localhost:3000",
                            data: forData
                        })
                    )
                    await Promise.all(requestList); // 并发切片
            },
            async handleUpload() {
            	if(!this.container.file) return;
                const fileChunkList = this.createFileChunk(this.container.file);
                this.data = fileChunkList.map(({ file }, index) => ({
                    chunk: file,
                    hash: this.container.file.name + '-' + index, // 文件名 + 数组下标
                }))
                await this.uploadChunks();                            
            }
        }
    
}
</script>    
```

当点击上传按钮时，调用 createFileChunk 将文件切片，切片数量通过文件大小控制，这里控制 10 MB，也就是说 100MB 的文件会被分成 10 个切片。

createFileChunk 内使用 while 循环和 slice 方法将切片放入 fileChunkList 数组中返回

在生成文件切片时，需要给每个切片一个标识作为 hash，这里暂时使用 文件名 +下标，这样后端可以知道当前切片是第几个切片，用于之后的合并切片。

随后调用 uploadChunks 上传所有的文件切片，将文件切片，切片hash，以及文件名放入 formData 中，再调用上一步的 request 函数返回一个 promise，最后调用 Promsie.all 并发上传所有的切片

#### 发送合并请求

这里使用整体思路中提到的第二种合并切片的方式，即前端主动通知服务端进行合并，所以前端还需要额外发请求，服务端接收到这个请求时主动合并切片。

```js]
<template>
	<div>
		<input type="file" @change="handleFileChange" />
		<el-button @click="handleUpload">上传<el-button>
	</div>
</template>

<script>
export default {
	data: () => ({
		container: {
			file: null
		},
		data: {}
	}),
	methods: {
		request() {},
		handleFileChange() {},
		createFileChunk() {},
		// 上传切片，同时过滤已上传的切片
		async uplaodChunks() {
			const requestList = this.data
				.map(({ chunk: hash}) => {
					const formData = new formData();
					formData.append("chunk", chunk);
					formData.append("hash", hash);
					formData.append("filename", this.container.file.name);
					return { formData };
				})
				.map(async ({ formData }) => 
					this.request({
						url: "http://localhost:3000",
						data: formData
					})
				)
				await Promise.all(requestList);
				// 合并切片
				await this.mergeRequest();
		},
		async mergeRequest() {
			await this.request({
				url: "http://localhost:3000/merge"，
				headers: {
					"content-type": "application/json"
				},
				data: JSON.stringify({
					filename: this.container.file.name
				})
			})
		},
		async handleUpload() {}
	}
}
</script>		
```

### 服务端部分

简单使用 http 模块搭建服务端

```js
const http = require("http");
const server = http.createServer();

server.on("request", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if(req.method === "OPTION") {
        res.status = 200;
        res.send();
        return;
    }
})

server.listen(3000, () => console.log("正在监听 3000 端口"));
```

#### 接受切片

使用 multiparty 包处理前端传来的 formData

在 multiparty.parse 的回调中，files 参数保存了 formData 中文件，fields 参数保存了 formData 中非文件的字段

```js
const http = require("http");
const path = require("path");
const fse = require("fs-extra");
const multiparty = require("multiparty");

const server = http.createServer();
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); // 大文件存储目录

server.on("request", async(req, res) => {
    res.setHeader("Access-control-Allow-Origin", "*");
    res.setHeader("Access-control-Allow-Header", "*");
    if(req.method === "OPTION") {
        res.status = 200;
        res.send();
        return;
    }
})

const multipart = new multipart.Form();

multipart.parse(req, async(err, fields, files) => {
  if(err) {
      return;
  }
  const [chunk] = files.chunk;
  const [hash] = files.hash;
  const [filename] = fields.filename;
  const chunkDir = path.resolve(UPLAOD_DIR, dilename);
    
  // 切片目录不存在，创建切片目录
  if(!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir);
  }
  await fse.move(chunk.path, `${chunkDir}/${hash}`);
    res.end("received file chunk");
  )}
})

server.listen(3000, () => console.log("正在监听 3000 端口”));
```

<img src="https://user-gold-cdn.xitu.io/2020/1/11/16f905fb6a626f47?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

查看 multiparty 处理后的 chunk 对象，path 是存储临时文件的路径，size 是临时文件大小，在 multiparty 文档中提到可以使用 fs.rename(由于我用的是 fs-extra，它的 rename 方法 windows 平台权限问题，所以换成 fse.move)移动临时文件，即移动文件切片。

在接受文件切片时，需要先创建存储切片的文件夹，由于前端在发送每个切片时额外携带了唯一值 hash，所以以 hash 作为文件名，将切片从临时路径移动切片文件夹中，最后的结果如下：

<img src="https://user-gold-cdn.xitu.io/2020/1/8/16f83c3caac8eb65?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">



#### 合并切片

在接收前端发送的合并请求后，服务端将文件夹下的所有切片进行合并

```js'
const http = require("http");
const path = require("path");
const fse = require("fs-extra");

const server = http.createServer();
const UPLOAD_DIR = path.resolve(__dirname, "..", "traget"); // 大文件存储目录

const resolvePost = req => 
	new Promise(resolve => {
		let chunk = "";
		req.on("data", data => {
			chunk += data;
		});
		req.on("end", () => {
			resolve(JSON.parse(chunk));
		})
	});
	
const pipeStream = (path, writeStream) => 
	new Promsie(resolve => {
		const readStream = fse.createReadStream(path);
		readStream.on("end", () => {
			fse.unlinkSync(path);
			resolve();
		})
		readStream.pipe(writeStream);
	})
	
// 合并切片
const mergeFileChunk = async(filePath, filename, size) => {
	const chunkDir = path.resolve(UPLOAD_DIR, filename);
	const chunkPaths = await fse.readdir(chunkDir);
	// 根据切片下标进行排序
	// 否则直接读取目录的获得的顺序可能会错乱
	chunkPaths.sort((a, b) => a.split("-")[1] - b.split('-')[1]);
	await Promsie.all(
		chunkPaths.map((chunkPath, index) => 
			pipeStream(
				path.resolve(chunkDir, chunkPaht),
				// 指定位置创建可写流
				fse.createWriteStream(filePath, {
					start: index * size,
					end: (index + 1) * size
				})
			)
		)
	);
	fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
}
	
server.on("request", async(req, res) => {
	res.setHeader("Access-Control-Allow-Origin",  "*");
	res.setHeader("Access-Control-Allow-Headers",  "*");
	if(req.method === 'OPTIONS') {
		res.status = 200;
		res.end();
		return;
	}
	if(req.url === '/merge') {
		const data = await resolvePost(req);
        const { filename, size } = data;
        const filePath = path.resolve(UPLOAD_DIR, `${filename}`);
        await mergeFileChunk(filePath, filename);
        res.end(
            JSON.stringify({
                code: 0,
                message: "file merged success"
            })
        )
    }
})	


server.listen(3000, () => console.log("正在监听 3000 端口"))
```

由于前端在发送合并请求时会携带文件名，服务器根据文件名可以找到上一步创建的切片文件夹

接着使用 fs.createWriteStream 创建一个可写流，可写流文件名就是切片文件夹名 + 后缀 组合而成

随后遍历整个切片文件夹，将切片通过 fs.createReadStream 创建可读流，传输合并到目标文件中

值得注意的是每次可读流都会传输到可写流的指定位置，这是通过 createWriteStream 的第二个参数 start/end 控制的，目的是能够并发合并多个可读流到可写流中，这样即使流的顺序不同也能传输到正确的位置，所以这里还需要让前端在请求的时候多提供一个 size 参数。

```js
async mergeRequest() {
    await this.request({
        url: "http://localhost:3000/merge",
        headers: {
            “content-type”: "application/json"
        },
        data: JSON.stringify({
            size: SIZE,
            filename: this.container.file.name
        })
    })
}
```

<img src="https://user-gold-cdn.xitu.io/2020/1/22/16fccc5d950c2275?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

其实也可以等上一个切片合并完成后再合并下个切片，这样就不需要指定位置，但传输速度会降低，所以使用了并发合并的手段，接着只要保证每次合并完成后删除这个切片，等所有的切片都合并完毕后最后删除切片文件夹即可

<img src="https://user-gold-cdn.xitu.io/2020/1/8/16f8414c7fae1c1f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

至此一个简单的大文件上传就完成了

### 显示进度条

上传进度分两种，一个是每个切片的上传进度，另一个是整个文件的上传进度，而整个文件的上传进度是基于每个切片上传进度计算而来，所以我们先实现切片的上传进度

#### 切片进度条

XMLHttpRequest 原生支持上传进度的监听，只需监听 upload.onpregress 即可，我们在原来的 request 基础上传入 onProgress 参数，给 XMLHttpRequest 注册监听事件

```js
// xhr
request({
    url, 
    method = "post",
    data,
    headers = {},
    onProgress = e => e;
    requestList
}) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = onProgress;
        xhr.open(method, url);
        Object.keys(headers).forEach(key => 
        	xhr.setRequestHeader(key, headers[key]);
        );
        xhr.send(data);
        xhr.onload = e => {
            resolve({
                data: e.target.response
            })
        }
    })
}
```

由于每个切片都需要触发独立的监听事件，所以还需要一个工厂函数，根据传入的切片返回不同的监听函数

在原有的前端上传逻辑中新增监听函数部分

```js
// 上传切片，同时过滤已上传的切片
async uploadChunks(uploadedList = []) {
    const requestList = this.data
    	.map(({ chunk, hash, index}) => {
            const formData = new FormData();
            formData.append("chunk", chunk);
            formData.append("hash", hash);
            formData.append("filename", this.container.file.name);
            return { formData, index }
        })
    	.map(async ({ formData, index }) => {
            thi.request({
                url: "http://localhost:3000",
                data: formData,
                onProgress: this.createProgressHeadler(this.data[index])
            })
        };
        await Promise.all(requestList);
        // 合并切片
        await this.mergeRequest();
}
async handleUpload() {
    if(!this.container.file) return;
    const fileChunkList = this.createFileChunk(this.container.file);
    this.data = fileChunkList.map(({ file }, index) => {
        chunk: file,
        index,
        hash: this.container.file.name + "-" + index,
        percentage: 0
    }));
    await this.uploadChunks();
} 
createProgressHandler(item) {
    return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100));
    }
}
```

每个切片在上传时都会通过监听函数更新 data 数组对应元素的 percentage 属性，之后把将 data 数组放到视图中展示即可

#### 文件进度条

将每个切片已上传的部分累加，除以整个文件的大小，就能得出当前文件的上传进度，所以这里使用 Vue 计算属性

```js
computed: {
    uploadPercentage() {
        if(!this.container.file || !this.data.length) return 0;
        const loaded = this.data
        	.map(item => item.size * item.percentage)
        	.reduce((acc, cur) => acc + cur);
        return perseInt((loaded / this.container.file.size).toFixed(2));
    }
}
```

最终视图如下

<img src="https://user-gold-cdn.xitu.io/2020/1/8/16f84ad6b4848423?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

## 断点续传



断点续传的原理在于前端/服务端需要记住已上传的切片，这样下次上传就可以跳过之前已上传的部分，有两种方案实现记忆的功能

- 前端使用 localStorage 记录已上传的切片的 hash
- 服务端保存已上传的切片的 hash，前端每次上传前向服务端获取已上传的切片

第一种是前端的解决方案，第二钟是服务端，而前端方案有个缺陷，如果换个浏览器就失去了记忆的效果，所以这里选取后者

### 生成 hash

无论是前端还是服务端，都必须要生成文件和切片的 hash，之前我们使用文件名 + 切片下标作为切片 hash，这样做文件名一旦修改就失去了效果，而事实上只要文件内容不变，hash就不应该变化，所以正确的做法是 根据文件内容生成 hash，所以我们修改下 hash 的生成规则。

这里用到另一个库 spark-md5，它可以根据文件内容计算出文件的 hash 值，另外考虑到如果上传一个超大文件，读取文件内容计算 hash 是非常耗费时间的，并且会引起 UI 的阻塞，导致页面的假死状态，所以我们使用 web-worker 在 worker 线程计算出 hash，这样用户仍在主界面正常的交互。

由于实例化 web-worker 时，参数是一个 JS 文件路径且不能跨域，所以我们单独创建一个 hash.js 文件放在 public 目录下，另外在 worker 中也是不允许访问 dom 的，但它提供了 importScripts 函数用于导入外部脚本，通过它导入 spark-md5

```zai
// /public/hash/js
self.importScript("/spark-md5.min.js"); // 导入脚本

// 生成文件 hash
self.onmessage = e => {
    const { fileChunkList } = e.data;
    const spark = new self.SparkMD5.ArrayBuffer();
    let percentage = 0;
    const loadNext = index => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(fileChunkList[index].file);
        reader.onload = e => {
            count ++;
            sparks.append(e.target.result);
            if(count === fileChunkList.length) {
                self.postMessage({
                    percentage: 100,
                    hash: spark.end()
                });
                self.close()
            }else {
                percentage += 100;
                self.postMessage({
                    percentage
                });
                // 递归计算下一个切片
                loadNext(count);
            }
        }
    }
    loadNext(0)
}
```

在 worker 线程中，接收文件切片 fileChunkList，利用 FileReader 读取每个切片的 ArrayBuffer 并不断传入 spark-md5 中，每计算一个切片通过 postMessage 向主线程发送一个进度事件，全部完成后将最终的 hash 发送给主线程

spark-md5 需要根据所有切片才能算出一个 hash 值，不能直接将整个文件放入计算，否则即使不同文件也会有相同的 hash，具体可以看官方文档

接着编写主线程与 worker 线程通讯的逻辑

```js
// 生成文件 hash(web-worker)
calculateHash(fileChunkList) {
    return new Promise(resolve => {
        // 添加 worker 属性
        this.container.worker = new Worker("./hash.js");
        this.contaienr.worker.postMessage({ fileChunkList });
        this.container.worker.onmessage = e => {
            const { percentage, hash } = e.data;
            this.hashPercentage = percentage;
            if(hash) {
                resolve(hash);
            }
        }
    })
}
async handleUpload() {
    if(!this.container.file) return;
    const fileChunkList = this.createFileChunk(this.container.file);
    this.container.hash = await this.calculateHash(fileChunkList);
    this.data = fileChunkList.map(({ file }, index) => {
        fileHash: this.container.hash,
        chunk: file,
        hash: this.container.file.name + "-" + index, // 文件名 + 数组下标
        percentage: 0
    }));
    await this.uploadChunks();
}
```

主线程使用 postMessage 给 worker 线程传入所有切片 fileChunkList，并监听 worker 线程发出的 postMessage 事件拿到文件 hash

加上显示计算 hash 的进度条，看起来像这个

<img src="https://user-gold-cdn.xitu.io/2020/1/8/16f84ae4f233e891?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">	至此前端需要将这个之前用文件名作为 hash 的地方改写为 worker 返回的这个 hash

<img src="https://user-gold-cdn.xitu.io/2020/1/8/16f84b3bba953304?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">



服务端则使用 hash 作为切片文件夹名，hash + 下标作为切片名， hash + 拓展名作为文件名，没有新增的逻辑

<img src="https://user-gold-cdn.xitu.io/2020/1/8/16f84b50117e4db2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">



### 文件秒传

在实现断点续传先简答介绍一下文件秒传

所谓的文件秒传，即在服务端已经存在的上传的资源，所以当用户再次上传时会直接提示上传成功

文件秒传需要依赖上一步生成的 hash，即在上传前，先计算出文件 hash，并把 hash 发送给服务端紧张验证，由于 hash 的唯一性，所以一旦服务端能找到 hash

相同的文件，则直接返回上传成功的信息即可

```js
async verifyUpload(filename, file) {
    const { data } = await this.request({
        url: "http://localhost:3000/verify",
        headers: {
            "content-type": "application/json"
        },
        data: JSON.stringify({
            filename,
            fileHash
        })
    });
    return JSON.parse(data)
}
async handleUpload() {
    if(!this.container.file) return;
    const filenameList = this.createFileChunk(this.container.file);
    this.container.hash = await this.verifyUpload(
    	this.container.file.name,
        this.coontainer.hash
    )
    if(!shouldUpload) {
        this.$messgae.success("秒传：上传成功");\
        return;
    }
    this.data = fileChunkList.map(({ file}))
}
```

秒传其实就是给用户看的障眼法，实际上根本没有上传

<img src="https://user-gold-cdn.xitu.io/2020/1/9/16f890e5967106c6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

服务端的逻辑非常简单，新增一个验证接口，验证文件是否存在即可

```js
const extractExt = filename => 
	filename.slice(filename.lastIndexOf("."), filename.length); // 提取后缀名
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); // 大文件存储目录

const resolvePost = req => 
    new Promise(resolve => {
        let chunk = "";
        req.on("data", data => {
            chunk += data;
        });
        req.on("end", () => {
            resolve(JSON.parse(chunk))
        })
    })

server.on("request", async(req, res) => {
    if(req.url === "/verify") {
        const data = await resolvePost(req);
        const { fileHash, filename } = data;
        const ext = extractExt(filename);
        const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);
        if(fse.existsSync(filePath)) {
            res.end(
            	JSON.stringify({
                    shouldUpload: false
                })
            )
        }else {
            res.end(
            	JSON.stringify({
                    shouldUpload: true
                })
            )
        }
    }
});
server.listen(3000, () => console.log("正在监听 3000 端口"));
```

### 暂停上传

讲完了生成 hash 和 文件秒传，回到断点续传

断点续传顾名思义即断点 + 续传，所以我们第一步先实现“断点”，也就是暂停上传

原理是使用 XMLHttpRequest 的 abort 方法，可以取消一个 xhr 请求的发送，为此我们需要将每个切片的 xhr 对象保存起来，我们再改造一下 request 方法

```js
request({
    url, 
    method = "post",
    data,
    headers = {},
    opProgress = e => e,
    requestList    
}) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = onProgress;
        xhr.open(method, url);
        Object.keys(headers).forEach => 
        	xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onlaod = e => {
            // 将请求成功的 xhr 从列表中删除
            if(requestList) {
                const xhrIndex = requestList.findIndex(item => item === xhr);
                requestList.splice(xhrInde, 1);
            }
            resolve({
                data: e.data.response
            })
        }
        // 暴露当前 xhr 给外部
        requestList?.push(xhr);
    })
}
```

这样在上传切片时传入 requestList 数组作为参数，request 方法就会将所有的 xhr 保存在数组中了

<img src="https://user-gold-cdn.xitu.io/2020/1/8/16f8563491ea7793?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

每当一个切片上传成功时，将对应的 xhr 从 requestList 中删除，所以 requestList 中只保存正在上传切片的 xhr

之后新建一个暂停按钮，当点击按钮时，调用保存在 requestList 中 xhr 的 abort 方法，即取消并清空所有正在上传的切片

```js]
handlePasuse() {
	this.requestList.forEach(xhr => xhr?.abort());
	this.requestList = [];
}
```

<img src="https://user-gold-cdn.xitu.io/2020/1/9/16f890e598dd6afb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

点击暂停按钮可以看到 xhr 都被取消了

<img src="https://user-gold-cdn.xitu.io/2020/1/8/16f85644dc27459e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

### 恢复上传

之前在介绍断点续传的时使用第二种服务端存储的方式实现续传

由于当文件切片上传后，服务端会建立一个文件夹存储存储所有上传的切片，所以每次前端上传前可以调用一个接口，服务端将已上传的切片的切片名返回，前端再跳过这些已经上传切片，这样就实现了“续传”的效果

而这个接口可以和之前秒传的验证接口合并，前端每次上传前发送一个验证的请求，返回两种结果

- 服务端已存在该文件，不需要再次上传
- 服务端不存在该文件或者已上传部分文件切片，通知前端进行上传，并把已上传的文件切片返回给前端

所以我们改造一下之前文件秒传的服务端验证接口

```js
const extractExt = filename => 
      filename.slice(filename.lastIndexOf("."), filename.length); // 提取后缀名
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); // 大文件存储目录

const resolvePost = req => {
    new Promise(resolve => {
        let chunk = "";
        req.on("data", data => {
            chunk += data;
        });
        req.on("end", () => {
            resolve(JSON.parse(chunk));
        })
    })
    
    // 返回已经上传切片名列表
    const createUploadedList = async fileHash => 
    	fse.existsSync(path.resolve(UPLOAD_DIR, fileHash))
    		? await fse.readdir(path.resolve(UPLOAD_DIR, fileHash))
    		: [];
    
    server.on("request", async(req, res) => {
        if(req.url === "/verify") {
            const data = await resolvePost(req);
            const { fileHash, filename} = data;
            const ext = extractExt(filename);
            const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);
            if(fse.existsSync(filePath)) {
                res.end(
                	JSON.stringify({
                        shouldUpload: false
                    })
                )
            }else {
                res.end(
                	JSON.stringify({
                        shouldUpload: true,
                        uploadedList: await createUploadedList(fileHash)
                    })
                )
            }
        }
    })
}
server.listen(3000, () => console.log("正在监听 3000 端口"));
```

接着回到前端，前端有两个地方需要调用验证的接口

- 点击上传时，检查是否需要上传和已上传的切片
- 点击暂停的恢复上传，返回已上传的切片

新增恢复按钮并改造原来上传切片的逻辑

```js
<template>
    <div id="app">
        <input type="file" @change="handleFileChange" />
        <el-button @click="handleUpload">上传</el-button>  
  		<el-button @click="handlePause" v-if="isPaused">暂停</el-button>  
		<el-button @click="handleResume" v-else>恢复</el-button>  
	<div>
</template>

async handleResume() {
    const { uploadedList } = await this.verifyUpload(
    	this.container.file.name,
        this.container.hash
    );
    await this.uploadChunks(uploadedList);
},
async handleUpload() {
    if(!this.container.file) return;
    const fileChunkList = this.createFileChunk(this.container.file);
    this.container.hash = await this.calculateHash(fileChunkList);
    
    const { shouldUpload, uploadedList } = await this.verifyUpload(
    	this.container.file.name,
        this.container.hash
    );
    if(!shouldUpload) {
        this.$message.success("秒传：上传成功");
        return;
    }
    
    this.data = fileChunkList.map(({ file }. index) => ({
        fileHash: this.container.hash,
        index,
        hash: this.container.hash + '_' + index,
        chunk: file,
        percentage: 0
    }));
    
    await this.uploadChunks(uploadedList)
}

// 上传切片，同时过滤已上传的切片
async uploadChunks(uploadedList = []) {
    const requestList = this.data
    	.filter(({ hash }) => {
            const formData = new FormData();\
            formData.append("chunk", chunk);
            formData.append("hash", hash);
            formData.append("filename", this.container.file.name);
            formData.append("fileHash", this.container.hash);
            return { formData, index };
        })
    	.map(async ({ formData, index }) => 
            this.request({
        		url: "http://localhost:3000",
            	data: formData,
            	onProgress: this.createProgressHandler(this.data[index]),
            	requestList: this.requestList
        	})
        );
    	await Promsie.all(requestList);
    	// 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时
        // 合并切片
    	if(uploadList.length + requestList.length === this.data.length) {
            await this.mergeRequest();
        }
}
```

<img src="https://user-gold-cdn.xitu.io/2020/1/9/16f890e598de0946?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

这里给原来上传切片的函数新增 uploadedList 参数，即上图中服务端返回的切片名列表，通过 filter 过滤掉已上传的切片，并且由于新增了已上传的部分，所以之前合并接口的触发条件做了一些改动。

到这里断点续传的功能基本完成了

### 进度条改进

虽然实现了断点续传，但还需要改进一下进度条的显示规则，否则在暂停上传/接送到已上传切片时的进度条会出现偏差

#### 切片进度条

由于再点击上传/恢复上传时，会调用验证接口返回已上传的切片，所以需要将上传切片的进度变成 100%

```js
async handleUpload() {
    if(!this.container.file) return;
    const fileChunkList = this.createFileChunk(this.container.file);
    this.container.hash = await this.calculateHash(fileChunkList);
    const { shouldUpload, uploadedList } = await this.verifyUpload(
    	this.container.file.name,
        this.container.hash
    );
    if(!shouldUpload) {
        this.$message.success("秒传：上传成功");
        return;
    }
    this.data = fileChunkList.map(({ file }, index) => ({
       fileHash: this.container.hash,
        index,
        hash: this.container.hash + '-' + index,
        chunk: file,
        percentage: uploadedList.includes(index) ? 100 : 0
    }));
    await this.uploadChunks(uploadedList);
}
```

uploadedList 会返回已上传的切片，在遍历所有切片时判断当前切片是否在已上传列表里即可

#### 文件进度条

之前说文件进度条是一个计算属性，根据所有的切片的上传进度计算而来，这遇到了一个问题

<img src="https://user-gold-cdn.xitu.io/2020/1/9/16f890e598de0946?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">



点击暂停会取消并清空所有的切片的 xhr 请求，此时如果已经上传了一部分，就会发现文件进度条有倒退的现象

<img src="https://user-gold-cdn.xitu.io/2020/1/9/16f884633f3acfd9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

当点击恢复时，由于重新创建了 xhr 导致切片进度清零，所以总进度就会倒退

解决方案是创建了一个“假”的进度条，这个进度条基于文件进度条，但只会停止和增加，然后给用户展示这个假的进度条

这里我们使用 Vue 的监听属性

```js
data: () => ({
    fakeUploadPercentage: 0
}),
computed: {
    uploadPercentage() {
        if(!this.container.file || !this.data.length) return 0;
        const loaded = this.data
        	.map(item => item.size * item.percentage)
        	.reduce((acc, cur) => acc + cur);
        return parseInt(loaded / this.container.file.size).toFixed(2))
    }
},
watch: {
    uploadPercentage(now) {
        if(now > this.fakeUploadPercentage) {
            this.fakeUploadPercentage = now;
        }
    }
}
```

当 uploadPercentage 即真的文件进度条增加时，fakeUploadPercentage 也增加，一旦文件进度条后退，加的进度条只需停止即可

## 总结：

大文件上传

- 前端上传大文件时使用 Blob.prototypes.slice 将文件切片，并发上传多个切片，最后发送一个合并的请求通知服务端合并切片
- 服务端接收切片并存储，收到合并请求后使用流将切片合并到最终文件
- 原生                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                XMLHttpRequest 的 upload.onprogress 对切片上传进度的监听
- 使用 Vue 计算属性根据每个切片的进度算出整个文件的上传进度

断点续传

- 使用 spark-md5 根据文件内容算出文件 hash
- 通过 hash 可以判断服务端是否已经上传改文件，从而提示用户上传成功（秒传）
- 通过 XMLHttpRequest 的  abort 方法暂停切片的上传
- 上传前服务端返回已经上传的切片名，前端就跳过这些切片的上传





# 8. 自动化部署

部署是指将代码发布到服务器的一种行为。自动化部署就是使用工具来帮助你实现部署过程，无需亲自到手。

在没有学会自动化部署前，我是这样部署项目的：

- 执行测试 npm run test
- 构建项目 npm run build
- 将打包好的文件放到静态服务器

偶尔一次两次还行，如果每次部署项目都这样，就会把很多时间在重复的操作上。所以我们要学会自动化部署，彻底解放双手。

自动部署（又叫持续部署 Continuous Deployment，英文缩写 CD）一般有两种触发方式：

- 定时触发
- 监听 webhook 事件，事件触发时执行自动打包丶部署等操作

## 定时触发

定时触发，就是构建软件每隔一段时间自动执行打包丶部署操作

这种方式不太好，很有可能软件刚部署完开发就改代码了。为了看到新的页面效果，不得不等到下一次构建开始。另外还有一个副作用，假如开发一天都没更改代码，构建软件还是会不停的执行打包丶部署操作，白白的浪费资源。

所以现在基本都是采用监听 webhook 事件的方式来进行部署

## 监听 webhook 事件

webhook 钩子函数，就是在你的构建软件上进行设置，监听某一个事件（一般是监听 push 事件），当事件触发时，自动执行定义好的脚本。

例如 Github Action，就有这个功能。

<img src="https://img-blog.csdnimg.cn/img_convert/220d8459a48a91fdd5c60968712f1a81.png">

为了满足不同用户的需要，本章将使用 Jenkins 和 Cithub Action 来讲解如何部署前端项目。

- 第一部分讲解如何使用 Gitea 配置局部网 git 服务器，再使用 Jenkins 将 Gitea 下的项目部署到局域网服务器
- 第二部分讲解如何使用 Github Actions 将 GitHub 项目部署到 Github Page 和阿里云服务器

阅读本章内容并不需要你提前了解 Jenkins 和 Github Action 的知识（它们两都是部署工具），只要按照本章内容的指引，就能够实现自动化部署项目。

PS：本人所用的电脑操作系统为 windows，即以下所有的操作均在 windows 下运行。其它操作系统的配置大同小异，不会有太大的差别。

## Gitea 用于构建 Git 局域网服务器，Jenkins 是 CI/CD 工具，用于部署前端项目。

Gitea 用于构建 Git 局域网服务器，Jenkins 是 CI/CD 工具，用于部署前端项目。

### 配置 Gitea

- 下载 Gitea，选择一个喜欢的版本，例如1.13，选择 `gitea-1.13-windows-4.0-amd64.exe` 下载
- 下载完后，新建一个目录（例如 gitea），将下载的 Gitea 软件放到该目录下，双击运行
- 打开 lcoalhost:3000 就能看到 Gitea 已经运行在你的电脑上了
- 点击注册，第一次会弹出一个初始化配置页面，数据库选择 SQLite3。另外把 localhost 改成你电脑的局域网地址，例如我的电脑 IP 为 192.168.0.118

<img src="https://img-blog.csdnimg.cn/img_convert/faf7c03a7738e8394045c8412aa3526a.png">

<img src="https://img-blog.csdnimg.cn/img_convert/992081e7fe5767173fc295016e58fbee.png">

- 填完信息后，点击立即安装，等待一会，即可完成配置
- 继续点击注册用户，第一个注册的用户将会成为管理员
- 打开 Gitea 的安装目录，找到 custom\conf\api.ini，在里面加上一行代码 START_SSH_SERVER=true。这时就可以使用 ssh 进行 push 操作了

<img src="https://img-blog.csdnimg.cn/img_convert/7341d3013afc300dc2221926fdd045c4.png">

- 如果使用 http 的方式无法克隆项目，请取消 git 代理

  ```js
  git config --global --unset http.proxy
  git config --global --unset https.proxy
  ```

### 配置 Jenkins

- 需要提前安装 JDK，JDK 安装教程网上很多，请自行搜索

​    <img src="https://img-blog.csdnimg.cn/img_convert/589872cde9a22a23e5a5361e70421d22.png">

- 打开 Jenkins 下载页面

- 安装过程中遇到 Logon Type 时，选择第一个

  <img src="https://img-blog.csdnimg.cn/img_convert/0d5924e243ee6b52735b0472d76e7d22.png">

- 默认端口为 `8080`，这里我填的是 8000。`安装完成之后会自动打开` http://localhost:8000 网站，这时需要等待一会，进行初始化。

- 按照提示找到对应的文件（直接复制路径在我的电脑中打开），其中有管理员密码

  <img src="https://img-blog.csdnimg.cn/img_convert/04179bdd1eb246a688608d77cb804330.png">

- 安装插件，选择第一个

  <img src="https://img-blog.csdnimg.cn/img_convert/04179bdd1eb246a688608d77cb804330.png">

- 创建管理员，点击完成保存，然后一路下一步

<img src="https://img-blog.csdnimg.cn/img_convert/0f17c8039adf82a5626155a0c25b8c99.png">

- 配置完成后自动进入首页，这时点击 Manage Jenkins ->  Manage plugins 安装插件

  <img src="https://img-blog.csdnimg.cn/img_convert/65c8615d54c869beb9e411cb4111064e.png">

- 点击 可选插件，输入 nodejs，搜索插件，然后安装

- 安装完成后回到首页，点击 `Manage Jenkins -> Global Tool Configuration` 配置 nodejs。如果你的电脑是 window7 的话，nodejs 版本最好不要太高，选择 v12 左右的就行。

  <img src="https://img-blog.csdnimg.cn/img_convert/65c8615d54c869beb9e411cb4111064e.png">

### 创建静态服务器

- 执行一个空目录，在里面执行 npm init -y，初始化项目

- 执行 npm i express 下载 express

- 然后建立一个 server.js 文件，代码如下

  ```js
  const express = require("express");
  const app = express();
  const port = 8080;
  
  app.use(express.static("dist"));
  
  app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
  })
  ```

  它将当前目录下的 dist 文件夹设为静态服务器资源目录，然后执行 node server.js，启动服务器。

  由于现在没有 dist 文件夹，所以访问网站是空网页

  <img src="https://img-blog.csdnimg.cn/img_convert/09fa82ba4e9f180b1f2098dbac533987.png">

不过不要着急，也会就能看到内容了

### 自动构建 + 部署到服务器

- 下载 Jenkins 提供的 demo 项目 building-a-multibranch-pipeline-project，然后在你的 Gitea 新建一个仓库，把内容克隆进去，并提交 Gitea 服务器。

  <img src="https://img-blog.csdnimg.cn/img_convert/66301120ef722a758c96544972879d98.png">

- 打开 Jenkins 首页，点击  新建 Item  创建项目。

  <img src="https://img-blog.csdnimg.cn/img_convert/0603f9492264f3765c72352b505a76c0.png">

- 选择 源码管理，输入你的 Gitea 上的仓库地址。

  <img src="https://img-blog.csdnimg.cn/img_convert/0603f9492264f3765c72352b505a76c0.png">

- 你也可以尝试一下定时构建，下面这个代码表示每 5 分钟构建一次

  <img src="https://img-blog.csdnimg.cn/img_convert/db7703be7640cdab042ee338156b44f2.png">

- 选择你的构建环境，这里选择刚才配置的 nodejs。

  <img src="https://img-blog.csdnimg.cn/img_convert/337e1f611e82089618ca2e65da480353.png">

- 点击增加构建步骤，windows 要选 execute window batch command，Linux 要选 execute shell

  <img src="https://img-blog.csdnimg.cn/img_convert/dbe1cb8cbf12889ec1cfa1d04809da67.png">

- 输入 npm i && npm run build && xcopy .\build\* G:\node-server\dist\ /s/s/y，这行命令的作用是安装依赖，构建项目，并将构建后的资源复制到指定目录 G:\node-server\dist\。这个目录是静态资源服务器目录。

  <img src="https://img-blog.csdnimg.cn/img_convert/bcab4399bd7dc47f075335d1d36ddeb9.png">

- 保存后，返回首页。点击项目旁边的小三角，选择 build now

  <img src="https://img-blog.csdnimg.cn/img_convert/77f7b001b033f58566d2c92052eca8f1.png">

- 开始构建项目，我们可以点击项目查看构建过程

  <img src="https://img-blog.csdnimg.cn/img_convert/4f9c1519e6c7477219b1328c18feeff5.png">

- 构建成功，打开 http://localhost:8080/ 看一下结果

  <img src="https://img-blog.csdnimg.cn/img_convert/eea4a4ba2539ad68aa6c6ecdfb492795.png">

<img src="https://img-blog.csdnimg.cn/img_convert/7bc8d9c591c13a24d6b79cc0bbf8098e.png">

- 由于网站设置了每 5 分钟构建一次，我们可以改变一下网站的内容，然后什么都不做，等待一会再打开网站看看。

  <img src="https://img-blog.csdnimg.cn/img_convert/189451220deee789c9fa2b3215bfc88c.png">

- 把修改的内容提交到 Gitea 服务器，稍等一会儿。打开网站，发现内容已经发生变化。

  <img src="https://img-blog.csdnimg.cn/img_convert/bf039b43f539faaef116f1a5f60e5332.png">

### 使用 pipeline 构建项目

使用流水线构建项目可以结合 Gitea 的 webhook 钩子，以便在执行 git push  的时候，自动构建项目。

- 点击首页右上角的用户名，点击设置

  <img src="https://img-blog.csdnimg.cn/img_convert/72a973164babda14120a8d29bb64b45f.png">

- 添加 token，记得将 token 保存起来

  <img src="https://img-blog.csdnimg.cn/img_convert/a6ef0405378c35e98fc3057dc27cf889.png">

- 打开 Jenkins 首页，点击 新建 Item 创建项目

  <img src="https://img-blog.csdnimg.cn/img_convert/a29c8a8db7f0e8ae9ecf4a53b804cba2.png">

- 点击 构建触发器，选择 构建远程触发，填入刚才创建的 token

  <img src="https://img-blog.csdnimg.cn/img_convert/4282c6df05ede5ab492d019a30a9048a.png">

- 选择流水线，按照提示内容，然后点击 保存。

  <img src="https://img-blog.csdnimg.cn/img_convert/c37cfa2d2fe3ca9b368c8632dfcd2bca.png">

- 打开 Jenkins 安装目录下的 Jenkins.xml 文件，知道 <arguments> 标签，在里面加上 -Dhudson.security.csrf.GlobalCrumbIssuerConfiguration.DISABLE_CSRF_PROTECTION=true。它的作用是关闭 CSRF 验证，不关的话，Gitea 的 webhook 会一直报 403 错误，无法使用。加好参数后，在该目录命令行下输入 jenkins.exe.restart 重启 Jenkins

  <img src="https://img-blog.csdnimg.cn/img_convert/f49e549d2179e722e171a9846e6c7446.png">

- 回收首页，配置全局安全选项。勾上 匿名用户具有可选权限，再保存

  <img src="https://img-blog.csdnimg.cn/img_convert/3c44a96e155811eb0f42894b8c52f5cc.png">

<img src="https://img-blog.csdnimg.cn/img_convert/44df9670cc57629a9ab9a5c50587c275.png">

- 打开你的 Gitea 仓库页面，选择 仓库设置

  <img src="https://img-blog.csdnimg.cn/img_convert/44df9670cc57629a9ab9a5c50587c275.png">

- 点击 管理web钩子，添加 web 钩子，钩子选项选择 Gitea

- 目标 URL 按照 Jenkins 的提示输入内容。然后点击 `添加web钩子`

<img src="https://img-blog.csdnimg.cn/img_convert/7cb98bb692b33b47070880e118e86d2c.png">

<img src="https://img-blog.csdnimg.cn/img_convert/ed4cb714b9942bb2e65da6e43d84a79f.png">

- 点击创建好的 web 钩子，拉到下方，点击测试推送。不出意外，应该能看到推送成功的消息，此时回到 Jenkins 首页，发现已经在构建项目了

<img src="https://img-blog.csdnimg.cn/img_convert/c4a2b242a400eec32cc4962949f6ea77.png">

- 由于没有配置 Jenkinsfile 文件，此时构建是不会成功的。所以接下来需要配置一下 Jenkinsfile 文件。将以下代码复制到你 Gitea 项目下的 Jenkinsfile 文件。Jenkins 在构建时会自动读取文件的内容执行构建及部署操作。

  ```js
  pipeline {
      agent any
      stages {
          stage('Build') {
              steps {  // window 使用 bat， linux 使用 sh
                  bat 'npm i'
                  bat 'npm run build'
              }
          }
          stage('Deploy') {
              steps {
                  bat 'xcopy .\\build\\* D:\\node-server\\dist\\ /s/e/y' // 这里需要改成你的静态服务器资源目录
              }
          }
      }
  }
  ```

- 每当你的 Gitea 项目执行 push 操作时，Gitea 都会通过 webhook 发送一个 post 请求给 Jenkins，让它执行构建及部署操作。

<img src="https://img-blog.csdnimg.cn/img_convert/f1a96522b2b7580a880dfd596c16baf7.png">

### 小结

如果你的操作系统是 Linux，可以在 Jenkins 打包完成后，使用 SSH 远程登录到阿里云，将打包后的文件复制到阿里云上的静态服务器上，这样就能实现阿里云自动化部署了。

## Github Actions 自动构建前端项目并部署到服务器

如何你的项目是 Github 项目，那么使用 Github Actions 也许是更好的选择

### 部署到 Github Page

接下来看一下如何使用 Github Actions 部署到 Github Page

在你需要部署到 Github Page 的项目下，建立一个 yml 文件，放在 .github/workflow 目录下。你可以命名为 ci.yml，它类似于 Jenkins 的 Jenkinsfile 文件，里面包含的是要自动执行的脚本代码。

这里 yml 文件的内容如下：

```yml
name: Build and Deploy
on: # 监听 master 分支上的 push 事件
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest # 构建环境使用 ubuntu
    steps:
      - name: Checkout
        uses: actions/checkout@v2.3.1  
        with:
          persist-credentials: false

      - name: Install and Build # 下载依赖 打包项目
        run: |
          npm install
          npm run build

      - name: Deploy # 将打包内容发布到 github page
        uses: JamesIves/github-pages-deploy-action@3.7.1 # 使用别人写好的 actions
        with:  # 自定义环境变量
          ACCESS_TOKEN: ${{ secrets.VUE_ADMIN_TEMPLATE }} # VUE_ADMIN_TEMPLATE 是我的 secret 名称，需要替换成你的
          BRANCH: master
          FOLDER: dist
          REPOSITORY_NAME: woai3c/woai3c.github.io # 这是我的 github page 仓库
          TARGET_FOLDER: github-actions-demo # 打包的文件将放到静态服务器 github-actions-demo 目录下
```

上面有一个 ACCESS_TOKEN 变量需要自己配置

- 打开 GitHub 网站，点击你右上角的头像，选择 setting

<img src="https://img-blog.csdnimg.cn/img_convert/b1e438b04781ae3624037c0b2626170c.png">

- 点击左下角的 developer setting

<img src="https://img-blog.csdnimg.cn/img_convert/0087e15148772eb839bc6da983a194a1.png">

- 在左侧边栏中，点击 Person access tokens（个人令牌）

<img src="https://img-blog.csdnimg.cn/img_convert/48a06f652f7fca7b17ceb159541665b2.png">

- 点击 Generate new token（生成新令牌）

<img src="https://img-blog.csdnimg.cn/img_convert/cceba0391821177f9cbe2c392c44612a.png">

- 输入名称并勾选 repo

<img src="https://img-blog.csdnimg.cn/img_convert/1f5ee8125def6be5268bd3723eee8caa.png">

- 拉到最下面，点击 `Generate token`，并将生成的 token 保存起来

<img src="https://img-blog.csdnimg.cn/img_convert/26c3866b116dc16a7874e1937ad6605d.png">

- 打开你的 GitHub 项目，点击  setting

<img src="https://img-blog.csdnimg.cn/img_convert/dabc4cb8a58146cd01b763165ddbc410.png">

- 点击 `secrets -> new secret`

<img src="https://img-blog.csdnimg.cn/img_convert/c700637ffded897f961256cf8bf4a341.png">

创建密钥，名称随便填（中间用下划线隔开），内容填入刚才新建的 token

<img src="https://img-blog.csdnimg.cn/img_convert/cade22d32370466387bfff56747a2abf.png">

将上文代码中的：

```
ACCESS_TOKEN: ${{ secrets.VUE_ADMIN-TEMPLATE}}
```

替换成刚才新建的 secret 名字，替换后代码如下：

```
ACCESS_TOKEN: ${{ secrets,TEST_A_B}}
```

保存后，提交到 GitHub

以后你的项目只要执行 `git push`，Github Actions 就会自动构建项目并发布到你的 Github Page 上

Github Action 的执行详情点击仓库中的 `Action` 选项查看

<img src="https://img-blog.csdnimg.cn/img_convert/be472567962cbd9599f600e072ee3ee5.png">



<img src="https://img-blog.csdnimg.cn/img_convert/b12ccc45ce168c8381231abea78553dd.png">

构建成功后，打开 Github Page 网站，可以发现内容已经发布成功

<img src="https://img-blog.csdnimg.cn/img_convert/ff5f3280dbe6bde247af8d34231b2eda.png">



### Github Actions 部署到阿里云

初始化阿里云服务器

- 购买阿里云服务器，选择操作系统，我选的 ubuntu
- 在云服务器控制台选择实例 -> 更多 -> 重置实例密码（一台登录用）
- 选择远程连接 -> VNC，会弹出一个密码，记住它，以后实例连接要用（ctrl + alt f1~f6 切换终端，例如 ctrl + alt + f1 是第一个终端）
- 进入后是一个命令 输入 root（默认用户名），密码为你刚才重置的实例密码
- 登录成功，更新安装源 `sudo apt-get update && sudo apt-get upgrade -y`
- 安装 npm `sudo apt-get install npm`
- 安装 npm 管理包 `sudo npm install -g n`
- 安装 node 最新稳定版 `sudo n stable`

创建一个静态服务器

```js
mkdir node-server // 创建一个 node-server 文件夹
cd node-server // 进入 node-server 文件夹
npm init -y // 初始化项目
npm i express
touch server.js // 创建 server.js 文件
vim server.js // 编辑 server.js 文件
```

将以下代码输入进去（用 vim 进入文件后按 i 进行编辑，保存时按 esc 然后输入 :wq，再按 enter），更多方法请自行搜索。

```js
const express = require("express");
const app = express();
const port = 3388; // 填入自己的阿里云映射端口，在网络安全组配置

app.use(express,static("dist"));

app.listen(port, '0.0.0.0', () => {
    console.log("listening");
})
```

执行 `node server.js` 开始监听，由于暂时没有 dist 目录，先不要着急

注意，监听 IP 必须为 `0.0.0.0`

阿里云入端口要在网络安全组中查看与配置

<img src="https://img-blog.csdnimg.cn/img_convert/0814d06c8887e7e2b110388619b480ba.png">

创建阿里云密钥对

将你的 ECS 服务器实例和密钥绑定，然后将私钥保存到你的电脑（例如保存在 ecs.pen 文件）、

打开你要部署到阿里云的 Github 项目，点击 setting -> secrets

<img src="https://img-blog.csdnimg.cn/img_convert/4c016267852c65a7a64577c08ae1f9e5.png">

点击 new secret

<img src="https://img-blog.csdnimg.cn/img_convert/93edf694856066fdb56c4f49bf2b32f1.png">



名称为 SERVER_SSH_KEY，并将刚才的阿里云密钥填入内容

<img src="https://img-blog.csdnimg.cn/img_convert/847a53eb6ca58cbd772f38c41c2fb591.png">

点击 add secret 完成

在你的项目下建立 `.github\workflows\ci.yml` 文件，填入以下内容

```
name: Build app and deploy to aliyun
on:
  #监听push操作
  push:
    branches:
      # master分支，你也可以改成其他分支
      - master
jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Install Node.js
      uses: actions/setup-node@v1
      with:
        node-version: '12.16.2'
    - name: Install npm dependencies
      run: npm install
    - name: Run build task
      run: npm run build
    - name: Deploy to Server
      uses: easingthemes/ssh-deploy@v2.1.5
      env:
          SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
          ARGS: '-rltgoDzvO --delete'
          SOURCE: dist # 这是要复制到阿里云静态服务器的文件夹名称
          REMOTE_HOST: '118.190.217.8' # 你的阿里云公网地址
          REMOTE_USER: root # 阿里云登录后默认为 root 用户，并且所在文件夹为 root
          TARGET: /root/node-server # 打包后的 dist 文件夹将放在 /root/node-server
```

保存，推送到  Github 上

以后只要你的项目执行`git push` 操作，就会自动执行 `ci.yml` 定义的脚本，将打包文件放到你的阿里云静态服务器上。

这个  Actions 只要做了两件事：

- 克隆你的项目，下载依赖，打包
- 用你的阿里云私钥以  SSH 的方式登录到阿里云，将打包文件上传（使用 rsync）到阿里云指定的文件夹中

`ci.yml`配置文件讲解

- `name`：表示这个工作流程（workflow）的名称
- `on`：表示监听的意思，后面加上各种事件，例如 push 事件

下面这段代码表示要监听 master 分支的 push 事件。当 Github Actions 监听到 push 事件发生时，就会执行下面的 jobs 定义的一系列操作。

```
name: Build app and deploy to aliyun
on:
  #监听push操作
  push:
    branches:
      # master分支，你也可以改成其他分支
      - master
jobs:
...
```

- `jobs`，看字面意思就是一系列的作业，你可以在 `jobs` 字段下面定义很多作业，例如 `jobs`丶`job2`的等等，并且它们是并行执行的。

  ```js
  jobs:
    job1:
    	...
    job2:
    	...
    job3:
  	...
  ```

  回想看一下 `ci.yml` 文件，它只有一个作业，即 `build`，作业的名称是自己定义的，你叫 `good` 也可以

- `run-on`，表示你这个工作流程要运行在什么操作系统上，`ci.yml`文件定义的是最新稳定版的 `ubunyu`。除了 ubuntu，它还可以选择 Mac 或 Windows。

<img src="https://img-blog.csdnimg.cn/img_convert/9e3d168e93618dbd641f27d325aa00be.png">

- `steps`，看字面意思就是一系列的步骤，也就是说这个作业由一系列的步骤完成。例如先执行  `step`1。

`step` 步骤详解

`step` 其实是一个数组，在 YAML 语法中，以 `-` 开始就是一个数组项。例如 `['a', 'b', 'c']` 用 YAMA 语法表示为：

```js
- a
- b
- c
```

所以 `steps` 就是一个步骤数组，从上到下开始执行。从 `ci.yml` 文件来看，每一个小步骤都由几个相关选项：

- `name`，小步骤的名称
- `uses`，小步骤使用的 actions 库名称或路径，Github Actions 允许你使用别人写好的 Actions 库
- `run`，小步骤要执行的 `shell` 命令
- `env`，设置于小步骤相关的环境遍历
- `with`， 提供参数

<img src="https://img-blog.csdnimg.cn/img_convert/d2b7820e4276136a2497417ef77b76f5.png">

综上所述，`ci.yml` 文件中的 `steps` 就很好理解了，下面从头到尾解释一边：

```js
steps:
    - uses: actions/checkout@v1
    - name: Install Node.js
      uses: actions/setup-node@v1
      with:
        node-version: '12.16.2'
    - name: Install npm dependencies
      run: npm install
    - name: Run build task
      run: npm run build
    - name: Deploy to Server
      uses: easingthemes/ssh-deploy@v2.1.5
      env:
          SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
          ARGS: '-rltgoDzvO --delete'
          SOURCE: dist # 这是要复制到阿里云静态服务器的文件夹名称
          REMOTE_HOST: '118.190.217.8' # 你的阿里云公网地址
          REMOTE_USER: root # 阿里云登录后默认为 root 用户，并且所在文件夹为 root
          TARGET: /root/node-server # 打包后的 dist 文件夹将放在 /root/node-server
```

- 使用 `actions/chekout@v1` 库克隆到 `ubuntu` 上
- 使用 `actions/setup-node@v1` 库安装 nodejs，`with` 提供了一个参数 `node-version` 表示要安装的 node.js 版本
- 在 ubuntu 的 shell 上执行 npm install 下载依赖
- 执行 `npm run build` 打包项目
- 使用 `easingthemes/ssh-deploy@v2.1.5` 库，这个库的作用就是用 SSH 的方式远程登录到阿里云服务器，将打包好的文件夹复制到阿里云指定的目录上

从 env 上可看到，这个 action 库要求我们提供几个环境变量：

- SSH_PRIVATE_KEY：阿里云密钥对中的私钥（需要你提前写在 github secrets 上）
- `ARGS: "-rltgoDzvO --delete''`，没仔细研究，我猜是复制完文件就删除掉
- `SOURCE`：打包后的文件夹名称、
- `REMOTE_HOST`: 阿里云公网 IP 地址
- `REMOTE_USER`: 阿里云服务器的用户名
- `TARGET`: 你要拷贝到阿里云服务器指定目录的名称 

如果你想了解其它 actions 库的实现，可以直接复制 actions 库的名称去搜索一下，例如搜索 `action/checkout` 的结果为：

<img src="https://img-blog.csdnimg.cn/img_convert/c86a63a2ff60d493ea04a9c380459339.png">



## 部署方式

部署有很多种方式，据我所知的有：蓝绿部署丶滚动发布丶灰度发布等等。当然，还有更简单的方式，直接停掉服务器，上传代码后再重新开启服务器。不过这种方式有一个很大的缺点：再服务器重启过程中，用户无法访问网站的服务，所以你可能会收到大量的投诉。

### 蓝绿部署

蓝绿部署是指在部署过程中同时运行两个版本的程序。部署新版本时，不停掉旧版本的服务器，然后等新版本运行起来后，再将流量切换到新版本。缺点是在部署过程中，需要配置双倍的服务器。

<img src="https://img-blog.csdnimg.cn/img_convert/3aaf991ad66c6070beba781024dda558.png">

### 滚动发布

滚动发布是指在升级过程中，逐步逐台的替换旧版本服务器。先启动一台新版本的服务器，再停掉一台旧版本的服务器。这样在部署过程中只需要 N + 1 台的服务器。

<img src="https://img-blog.csdnimg.cn/img_convert/bc3696dbf56407661330d3e8dfabb99b.png">

### 灰度发布

灰度发布也叫金丝雀发布，起源是，矿井工人发现，金丝雀对瓦斯气体很敏感，矿井会在下井之前，先放一只金丝雀到井中，如果金丝雀不叫了，就代表瓦斯浓度高。

灰度发布在新开启一台服务器后，先不将流量切换过来。而是先由测试人员对其进行测试，如果运行没问题，再将流量切换过来。同时在运行期间收集各种数据，如果此时新旧版本的数据进行对比，就是所谓的 A/B 测试。

当发现新版本运行良好时，再将剩下的服务器用同样的过程逐步切换。最后完全关闭旧版本的服务器，完成灰度发布。

如果在发布过程中发现新版本有问题，就可以将流量切回到旧版本服务器，这样将负面影响控制到最小。

<img src="https://img-blog.csdnimg.cn/img_convert/dfd738a930f2b24a1cfbc30897de059a.png">

## 小结

本章选用 Jenkins 和 Giithub Actions 来讲解自动化部署有两个原因

- 免费
- 使用人数比较多，很多坑都有现成的解决方案





# 9 . 技术选型

技术选型应该对很多程序员都不陌生了，无论是大到技术框架丶编程语言，还是小到工具库的选择，都属于技术选型的范畴。个人认为技术选型应该是按照以下四个指标进行选择：

- 可控性
- 稳定性
- 适用性
- 易用性

由于没有统一的叫法，所以以上四个指标的名称是我自己定的。下面就让我们一起深入了解一下如何进行技术选型吧。

## 可控性

可控性是技术选型中非常重要的一个指标。可控，就是指如果这门技术因为 BUG 对项目造成了影响，团队中有人能够去解决它，而不是等待官方修复。作为技术团队的负责人，一定要是能够兜底的那个人。如果团队解决不了，你必须能够解决。

例如一些公司内容不独有的由于“个性化”需求产生的各种魔改版 Vue丶React，就完美体现了可控性。

## 稳定性

稳定性，表示一门技术更新迭代比较稳定，不会有特别大的修改，比较靠谱。即使有，也很容易做到向后兼容（迁移简单丶成本小）。

作为一名程序员，我想大家都有过这种想法。希望自己在做项目时能够用上最新丶最热门的技术，这样就能一边工作一边学习了。可是理想很美好，现实却是骨感的。新技术往往是意味着不确定性，很有可能一步一坑。所以不建议在核心项目中使用新技术。

使用成熟稳定的技术，意味着你的项目比较安全。在这点上有两个很典型的反例，那就是 Aungular 和 python。例如 python2 升级到 python3，除了语法丶API 不兼容之外，python3 的各个版本之间也有差异，直到现在才逐步稳定下来。

从稳定性来看，该如何进行技术选型呢？可以根据以下四点进行选择：

- 社区是否活跃丶配套插件是否丰富
- 是否经常维护，可以通过 git commit 查看
- 官方文档是否齐全
- 更新是稳定丶小步的迭代，而不是非常激进的更新

刚才说不建议在核心项目中使用新技术，但为了团队成员自身的发展抑或是为了其它原因，是可以尝试一下新技术的。但一定要在边缘项目或者小项目上进行尝试，尝试如果发现这门新技术非常适合你们的项目，那就可以进一步考虑是否在核心项目中使用。

## 适用性

适用性，是指需要根据业务场景和团队成员来选择技术。

### 业务场景

#### 生命周期

从项目的生命周期来看，并不是所有的项目都需要做到滴水不漏的。例如节假日特定的活动页面，声明周期只有一两天。这种页面就算用 jQuery 写也是可以的，唯一的要求就是快。

与之相反的是，公司需要长期维护的核心项目。它们需要使用成熟稳定的技术栈，在开发语言中也要使用 TS 而不是 JavaScript。

#### 兼容性

由于项目必须在各种各样的设备上运行，所以兼容性也是一个需要考虑的点。

web 项目需要考虑不同浏览器的兼容性，app 需要考虑 IOS 和 Android 的兼容性。除了必须保证不能有死机丶白屏丶卡顿等明显的 BUG 外，样式也需要尽量抱持一致。

### 团队成员

团队成员不一定所有人都使用相同的技术栈，在这一点上需要权衡大家的长短进行选择。

但我尽量将团队成员的的权重放到比较低的位置，选择约束性比较低的技术是一个更好的选择（如果团队成员不会，就让他学）。要用长远的眼光为团队考虑，太过自由的技术，往往会造成灾难。例如使用 TS 已经被很多大公司和开源项目证明过是一个更好的选择。

## 易用性

易用性，顾名思义就是这门技术好不好上手，容不容易理解。如果两门技术各方面指标及应用场景差不多，易用性强的将成为赢家。

最典型的例子就是 Angular 和 Vue。Angular 学习曲线陡峭，需要比较长的学习时间；而 Vue 在熟练掌握 JavaScript 的情况下，看文档一两天就能上手干活。

从 Google 丶百度的趋势图就能看出来，它们在国内的受欢迎程度有相当大的差别。

<img src="https://img-blog.csdnimg.cn/img_convert/530e8075b05ea95fc8d7df9e368c3d43.png">

<img src="https://img-blog.csdnimg.cn/img_convert/89078aff75b09342fb624caacde6f447.png">

易用性，决定你的团队好不好招人，这一点对小公司和不在一线超市的公司来说非常重要。我在天津（二线城市）工作快 4 年了，招前端的基本上每个公司都要求会 Vue，而要求会 Angular 的基本没有。

## 小结

如果同时考虑以上 4 点来考虑，该如何做技术选型呢？我建议按照以下顺序来做选择：

- 必须可控
- 核心项目必须使用成熟稳定丶可靠的技术栈，边缘小项目可以使用新技术给团队成员练手或者踩坑。
- 在第二点的基础上，再按实用性做选择
- 再第三点的基础上，再按易用性做选择

为了帮助大家理解，我画了一个流程图：

<img src="https://img-blog.csdnimg.cn/img_convert/78850c57f289ce23ba22851987099176.png">

虽然说前端目前只有三大框架可以选择，但技术永远是在发展的，框架也是是不断的更新迭代。学会如何进行技术选型，则不管当下流行的是生命技术，都可以减少你在进行技术选型时可能会犯的失误。





# 10. 脚手架

最近在学习 vue-cli 的源码，获益良多。为了自己理解得更加深刻，我决定模仿它造一个轮子，争取尽可能多的实现原有的功能。

我将这个轮子分成三个版本：

- 尽可能用最少的代码实现一个最简版本的脚手架
- 在 1 的基础上添加一些辅助功能，例如选择包管理器丶npm 源等等。
- 实现插件化，可以自由的进行拓展。在不影响内部源码的情况下，添加功能。

有人可能不懂脚手架是什么。按我的理解，脚手架就是帮助你把项目的基础架子搭好。例如项目依赖丶模板丶构建工具等等。让你不用从零开始配置一个项目，尽可能快的进行业务开发。

建议在阅读本文时，能够结合项目源码一起配合使用，效果更好。项目中的每一个分支都对应一个版本，例如第一个版本对应的 git 分支为 v1。所以在阅读源码时，记得要切换到对应的分支。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21528a60b4b9470a9cf583bcc9edcbd2~tplv-k3u1fbpfcp-watermark.image">

## 第一个版本 v1

第一个版本的功能比较简单，大致为：

- 用户输入命令，准备创建项目
- 脚手架解析用户命令，并弹出交互语句，询问用户创建项目需要哪些功能
- 用户选择自己需要的功能
- 脚手架根据用户的选择创建 pakage.json 文件，并添加对应的依赖项
- 脚手架根据用户的选择渲染项目模板，生成文件（例如 index.html丶main.js 丶App.vue等文件）
- 执行 npm install 命令安装依赖

项目目录树：

```js
├─.vscode
├─bin 
│  ├─mvc.js # mvc 全局命令
├─lib
│  ├─generator # 各个功能的模板
│  │  ├─babel # babel 模板
│  │  ├─linter # eslint 模板
│  │  ├─router # vue-router 模板
│  │  ├─vue # vue 模板
│  │  ├─vuex # vuex 模板
│  │  └─webpack # webpack 模板
│  ├─promptModules # 各个模块的交互提示语
│  └─utils # 一系列工具函数
│  ├─create.js # create 命令处理函数
│  ├─Creator.js # 处理交互提示
│  ├─Generator.js # 渲染模板
│  ├─PromptModuleAPI.js # 将各个功能的提示语注入 Creator
└─scripts # commit message 验证脚本 和项目无关 不需关注
```

### 处理用户命令

脚手架第一个功能就是处理用户的命令，这需要使用 commander.js。这个库的功能就是解析用户的命令，提取出用户的输入交给脚手架。例如这段代码：

```js
#!/usr/bin/env node
const program = require('commander');
const create = require("../lib/create");

program
.version('0.1.0')
.command('create <name>')
.description('create a new project')
.action(name => {
    create(name)
})

program.parse();
```

它使用 commander 注册了一个 create 命令，并设置了脚手架的版本和描述。我将这段代码保存在项目下的 bin 目录，并命名为 mvc.js。然后在 pakage.json 文件添加这段代码：

```js
"bin": {
    "mvc": "/bin/mvc.js"
}
```

再执行 npm link，就可以将 mvc 注册成全局命令。这样在电脑上的任何地方都能使用 mvc 命令了。实际上，就是用 mvc 命令来代替执行 node ./bin/mvc.js。

### 和用户交互

取到用户要创建的项目名称 demo 之后，就可以弹出交互选型，询问用户要创建的项目需要哪些功能。这需要用到 Inquire.js。Inquire 的功能就是弹出一个问题和一些选项，让用户选择。并且选型可以指定是多选丶单选等等。

例如下面的代码：

```js
const prompts = [
    {
        "name": "feature", // 选项名称
        "message": "Check the features needed for your project", // 选项提示语
        "pageSize": 10,
        "type": "checkbox", // 选项类型 另外还有 confirm list 等
        "choices": [ // 具体的选项
            {
                "name": "Babel",
                "value": "babel",
                "description": “Transpile modern JavaScript to older versions(for compatibility)”,
            	"link": "http://babeljs.io/",
            	"checked": true
            },
    		{	
            	"name": "Router",
                "value": "router",
                "description": "Structure the app with dynamic pages",
                "link": "https://router.vuejs.org/"
            }
        ]
    }
]

inquirer.prompt(prompts);
```

弹出的问题和选项如下：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5799fd20f094ab4acd422cb24e66f54~tplv-k3u1fbpfcp-watermark.image">

问题的类型"type": "checkbox" 是 checkbxo 说明是多选。如果两个选项都进行选中的话，返回来的值为：

```js
{ feature: ["babel", "router"] }
```

其中 feature 是上面问题中的 name 属性。feature 数组中的值则是每个选项中的 value

`Inquires.js` 还可以提供具有相关性的问题，也就是上一个问题选择了指定的选项，下一个问题才会显示出来。例如下面的代码；

```js
{
    name: "Router",
    value: "router",
    description: "Structure the app with dynamic pages",
    link: "https://router.vuejs.org",
},
{
    name: "histoiryMode",
    when: answers => answers.feature.include("router"),
    type: "confirm",
    message: `User history mode for router?` ${chalk.yellow(`Requires proper server setup for index fallback in production`)}`,
    description: `By using the HTML5 History API, the UELs do not the '#' character anymore.`,
	link: "https://router.vuejs.org/guide/essentials/history-mode.html",
}
```

第二个问题中有一个属性 when，它的值是一个函数 answers=>answers.features.include("touter")。当函数的执行结果为 true，当第二个问题才会显示出来。如果你在上一个问题中选择了 router，它的结果就会变为了 true。弹出第二个问题：问你路由模式是否选择 history 模式。

大致了解 Inquires.js 后，就可以明白这一步完美要做什么了。主要就是将脚手架支持的功能配合对应的问题丶可选值在控制台上显示出来，供用户选择。获取到用户具体的选项值后，再渲染模板和依赖。

#### 有哪些功能

先来看一下第一个版本支持哪些功能：

- vue
- vue-router
- vuex
- babel
- webpack
- linter(eslint)

由于这是一个 vue 相关的脚手架，所以 vue 是默认提供的，不需要用户选择。另外构建工具 webpack 提供了开发环境和打包的功能，也是必需的，不用用户进行选择。所以可供用户选择的功能只有 4 个：

- vue-router
- vuex
- babel
- linter

现在我们先来看一下这 4 个功能对应的交互提示语相关的文件。它们全部放在 lib/promptModules，目录如下：

```js
- babel.js
- linter.js
- router.js
- vuex.js
```

每个文件包含了它相关的所有交互式问题。例如刚才的示例，说明 router 相关的问题有两个。下面再看下 babel.js 的代码：

```js
module.exports = (api) => {
    api.injectFeature({
        name: "Babel",
        value: "babel",
        short: "Babel",
        description: "Transpile modern Javascript to older versions (for compatibility)",
        link: "https://babeljs.io/",
        checked: true
    })
}
```

只有一个问题，就是问下用户需不需要 babel 功能，默认 checked: true，也就是需要。

#### 注入问题

用户使用 create 命令后，脚手架需要将所有功能的交互提示语句聚合在一起：

```js
// create,js
const creator = new Creator();
// 获取各个模板的交互提示语
const promptModules = getPromptModules();
const promptAPI = new PromptModuleAPI(creator);
promptModules.forEach(m => m(promptAPI));
// 清空控制台
clearConsole();

// 弹出交互提示语并获取用户的选择
const answers = await inquirer.prompt(creator.getFilnalPrompts());

function getPromptModles() {
    return [
        "babel",
        "router",
        "vuex",
        "linter"
    ].map(file => require(`./promptModules/${file}`))
}

// Creator.js
class Creator {
    constructor() {
        this.featureRrompt = {
            name: "features",
            message: "Check the feature needed for your project:",
            pageSize: 10,
            type: "checkbox",
            choices: []
        }
        
        this.injectedPrompts = [];
    }
    
    getFinalPrompts() {
        this.injectedPrompts.forEach(prompt => {
            const originalWhen = prompt.when || (() => true);
            prompt.when = answers => originalWhen(answers);
        })
        
        const prompts = [
            this.featurePrompt,
            ...this.injectedPrompts
        ]
        
        return prompts;
    }
}

module.exports = Creator;

// PromptModuleAPI.js
module.exports = class PromptModuelAPI {
    constructor(creator) {
        this.creator = creator;
    }
    
    injectFeature(feature) {
        this.creator.featurePrompt.choices.push(feature);
    }
    
    injectPrompt(prompt) {
        this.creator.injectedPrompts.push(prompt);
    }
}
```

以上代码的逻辑如下：

- 创建 creator 对象
- 调用 getPromptModules() 获取所有功能的交互提示语
- 再调用 PromptModuleAPI 将所有交互提示语注入 creator 对象
- 通过 const answers = await inquirer.prompt(creator.getFinalPrompts()) 在控制台弹出交互语句，并将用户选择结果赋值给 answers 变量。

如果所有功能都选上，answers 的值为：

```js \
{
    feature: ["vue", "webpack", "babel", "router", "vuex", "linter"], // 项目具有的功能
    historyMode: true. // 路由是否使用 history 模式
    eslintConfig: “airbnb”, // eslint 校验代码的默认规则，可悲覆盖
    lintOn: ["save"] // 保存代码时进行校验
}
```

### 项目模板

获取用户的选项后就该开始渲染模板和生成 pakage.json 文件了。先来看一下如何生成 package.json 文件：

```js
// package.json 文件内容
const pkg = {
    name,
    version: "0.1.0",
    dependencies: {},
    devDependencies: {}
}
```

先定义一个 pkg 变量来表示 package.json 文件，并设定一些默认值。

所有的项目模板都放在 lib/generator 目录下：

```js'
├─lib
│  ├─generator # 各个功能的模板
│  │  ├─babel # babel 模板
│  │  ├─linter # eslint 模板
│  │  ├─router # vue-router 模板
│  │  ├─vue # vue 模板
│  │  ├─vuex # vuex 模板
│  │  └─webpack # webpack 模板
```

每个模板的功能都差不多：

- 向 pkg 变量注入依赖项
- 提供模板文件

#### 注入依赖

下面是 babel 相关的代码：

```js
module.exports = (generator) => {
    generator.extendPackage({
        babel: {
            presets: ["@babel/preset-env"]
        },
        dependencies: {
            "core-js": "^3.8.3",
        },
        devDependencies: {
            "@babel/core": "^7.12.13",
            "@babel/preset-env": "^7.12.13",
            "babel-loader": "^8.2.2"
        }
    })
}
```

可以看到，模板调用 generator  对象的 extendPackage() 方法向 pkg 变量注入了 babel 相关的所有依赖。

```j
extendPackage(fields) {
	const pck = this.pkg;
	for(const key in fields) {
		const value = fields[key];
		const existing = pkg[key];
		if(isObject(value) && (key === "dependencies" || key === "devDependencies" || key === "scripts")) {
			pkg[key] = Object.asssign(existing || {}, value);
		}else {
			pkg[key] = value;
		}
	}
}
```

注入依赖的过程就是遍历所有用户已选择的模板，并调用 extendPackage() 注入依赖。

#### 渲染模板

脚手架是怎么渲染模板的呢？用 vuex 举例，先看下它的代码：

```js'
moduel.exports = (generator) => {
	// 向入口文件 `src/main.js` 注入代码 import store from './store'
	generator.injectImports(generator.entryFile, `import store from './store'`);
	
	// 向入口文件 `src/main.js` 的 new Vue() 注入选项 store
	generator.injectRootOptions(generator.entryFile, `store`);
	
	// 注入依赖
	generator.extendPakage({
		dependencies: {
			vuex: '^3.6.2'
		}
	})
	
	// 渲染模板
	generator.render('./template', {});
}
```

可以看到渲染的代码为 generator.render('./template', {})。 './template' 是模板目录的路径：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b01fc28bb365421ba284b14238252611~tplv-k3u1fbpfcp-watermark.image">

所有的模板代码都放在 template 目录下，vuex 将会在用户创建的目录下的 src 目录生成 store 文件夹，里面有一个 index.js 文件。它的内容为：

```js
import Vue from "vuex"
import Vuex from "vuex"


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        
    },
    mutations: {
        
    },
    actions: {
        
    },
    modules: {
        
    }
})
```

这里简单描述一下 generator.render() 的渲染过程

第一步，使用 globby 读取模板目录下的所有文件：

````
const _files = await globby (['**/*'], { cwd: source, dot: true })
````

第二步，遍历所有读取的文件。如果文件是二进制文件，则不作处理，渲染时直接生成文件。否则读取文件内容，再调用 ejs 进行渲染：

```js
// 返回文件内容
const template = fs.rendFileSync(name, "utf-8");
return ejs.render(template, data, ejsOptions);
```

使用 ejs 的好处，就是结合变量来决定是否渲染某些代码。例如 webpack 的模板中有这样一段代码：

```js
module: {
    rules: [
        <%_ if(hasBabel) {_%>
        {
        	test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/
        },
        <%_ } _%>    
    ]
}
```

ejs 可以根据用户是否选择了 babel 来决定是否渲染这段代码。如果 hasBabel 为 false，则这段代码：

```js
{
    test: /\.js$/,
    loader: "babel-loader",
    exclude: /node_module/    
}
```

将不会被渲染出来。hasBabel 的值是调用 render() 时用参数传过去的：

```js
generator.render("/template", {
    hasBabel: options.features.includes("babel"),
    lintOnSave: options.lintOn.includes("save")
})
```

第三步，注入特定代码。回想下刚才 vuex 中的：

```js
// 向入口文件 `src/main.js` 注入代码 import store from './store'
generator.injectImports(generator.entryFile, `import store from './store'`);

// 向入口文件 `src/main.js` 的 new Vue() 注入选项 store
generator.injectRootOptions(generator.entryFile, `store`);
```

这两行代码的作用是：在项目入口文件 src/main.js 中注入特定的代码。

vuex 是 vue 的一个状态管理库，属于 vue 全家桶中的一员。如果创建的项目没有选择 vuex 和 vue-router。则 src/main.js 的代码为：

```js
import Vue from "vue"
import App from "./App.vue"

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount("#app")
```

如果选择了 vuex，它会注入上面所说的两行代码，现在 src/main.js 代码变为：

```js
import Vue from "vuex"
import store from "./store"
import App from "./App.vue"

Vue.config.productionTip = flase;

new Vue({
    store, // 注入的代码
    render: (h) => h(App),
}).$mount("#app")
```

这里简单描述一下代码的注入过程：

- 使用 vue-codemod 将代码解析成抽象语法树 AST
- 然后将要插入的代码变成 AST 节点插入上面所说的 AST 中
- 最后将新的 AST 重新渲染成代码

### 提取 package.json 的部分选项

一些第三方库的配置项可以放在 pakage.json 文件，也可以自己独立生成一份文件。例如 babel 在 package.json 中注入的配置为：

```js
babel: {
    presets: ["@babel/preset-env"]
}
```

我们可以调用 generator.extracConfigFiles() 将内容提取出来并生成 babel.config.js 文件：

```js
module.exports = {
    presets: ["@babel/preset-env"]
}
```

### 生成文件

渲染好的模板文件和 package.json 文件目前还是在内存中，并没有真正的在硬盘上创建。这时可以调用 writeFileTree() 将文件生成：

````js
const fs = require("fs-extra");
const path = require("path");

module.exports = async function writeFileTree(dir, files) {
    Object.keys(files).forEach((name) => {
        const filePath = path.join(dir, name);
        fs.ensureDirSync(path.dirname(dilePath));
        fs.writeFileSync(filePath, files[name]);
    })
}
````

这段代码的逻辑如下：

- 遍历所有渲染好的文件，逐一生成
- 在生成一个文件时，确认它的父目录在不在，如果不在，就先生成父目录
- 写入文件

例如现在一个文件路径为 src/test.js，第一次写入时，由于还没有 src 目录。所以会先生成 src 目录，再生成 test.js 文件。

### webpack

webpack 需要提供开发环境下的热加载丶编译等服务，还需要提供打包服务。目前 webpack 的代码比较少，功能比较简单。而且生成的项目中，webpack 配置代码是暴露出来的。这留待 v3 版本再改进。

添加新功能

添加一个新功能，需要在两个地方添加代码：分别是 lib/promptModules 和 lib/generator。在 lib/promptModules 中添加的是这个功能相关的交互提示语。在 lib/generator 中添加的是这个功能相关的依赖和模板代码。

不过不是所有的功能都需要添加模板代码的，例如 babel 就不需要。在添加新功能时，有可能会已有的模板代码造成影响。例如我现在需要项目支持 TS。除了添加 TS 相关的依赖，还得在 webpack vue vue-router vuex linter 等功能中修改原有的模板代码。

举个例子，在 vue-router 中，如果支持 TS，则这段代码：

```js
const routes = [ // ... ]
```

需要修改为：

```JS
<%_ if(hasTypeScript) { _%>
const routes: Array<RouteConfig> = [ // ... ]
<%_ } else {_%>
const routes = [ // ...]
<%_ } _%>    
```

因为 TS 的值有类型。

总之，添加的新功能越多，各个功能的模板代码也会越来越多。并且还需要考虑到各个功能之间的影响。

### 下载依赖

 下载依赖需要使用 execa，它可以调用子进程执行命令。

```js
const execa = require(”execa“);
module.exports = function executeCommand(command, cwd) {
    return new Promie((resolve, reject) => {
        cwd,
        stdio: ["inherit", "pipe", "inheirt"],    
    })
    
    child.stdout.on("data", buffer => {
        process.stdout(buffer);
    })
        
    child.on("close", code => {
        if(code !== 0) {
            reject(new Error(`command failed: ${command}`))
        }
        
        resolve();
    })    
}
                      
// create.js 文件
console.log('\n正在下载依赖...\n');
// 下载依赖
await executeCommand("npm install", path.join(process.cwd(), name));
console.log("\n依赖下载完成！执行下列命令开始开发;\n");
console.log(`cd ${name}`);
console.log(`npm run dev`);
```

调用 executeCommand() 开始下载依赖，参数为 npm install 和用户创建的项目路径。为了能让用户看到下载依赖的过程，我们需要使用下面的代码将子进程的输出传给主进程，也就是输出到控制台：

```js
child.studout.on("data", buffer => {
    process.stdout.write(buffer);
})
```

下面我用动图演示 V1 版本的创建过程：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65b515014470417084aaf7bbd2f1c695~tplv-k3u1fbpfcp-watermark.image">

创建成功的项目截图：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9059e85152b343b0b6430a760df3bd14~tplv-k3u1fbpfcp-watermark.image">

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82b5e7e821a440ebba50c9872c41f783~tplv-k3u1fbpfcp-watermark.image">



## 第二版本 v2

第二个版本在 v1 的基础上添加了一些辅助功能：

- 创建项目时判断该项目是否已存在，支持覆盖合并创建
- 选择功能时提供默认配置和手动选择两种模式
- 如果用户的环境同时存在 yarn 和 npm，则会提示用户要使用哪个包管理器
- 如果 npm 的默认源速度比较慢，则提示用户是否要切换到淘宝源
- 如果用户是手动选择功能，在结束后混询问用户是否要将这次的选择保存为默认配置

### 覆盖和合并

创建项目时，先提前判断一下该项目是否存在：

```js]
const targetDir = path.join(process.cwd(), name);
// 如果目标目录已存在，询问是覆盖还是合并
if(fs.existsSync(targetDir)) {
	// 清空控制台
	clearConsole();
	
	const { action } = await inquirer.prompt([
		{
			name: "action",
			type: "list",
			message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action;`,
			choices: [
				{ name: "Overwrite", value: "overwrite" },
				{ name: "Merge", value: "merge" }
			]
		}
	])
	
	if(action === "overwrite") {
		console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
		await fs.remove(targetDir);
	}
}
```

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1da4b675cfdc4b2d9a0d473ec78122c7~tplv-k3u1fbpfcp-watermark.image">

如果选择 overwrite，则进行移除 fs.remove(targetDir)

### 默认配置和手动模式

先在代码中提前把默认配置的代码写好：

```js
exports.defaultPreset = {
    features: ["babel", "linter"],
    historyMode: false,
    eslintConfig: "airbnb",
    lintOn: ["save"]
}
```

这个配置默认使用 babel 和 eslint

然后生成交互提示语时，先调用 getDefaultPrompts 方法获取默认配置

```js
getDefaultPrompts () {
    const preset = this.getPresets();
    const presetChoices = Object.entries(presents).map(([name, preset]) => {
        let displayName = name;
        return {
            name: `${displayName} (${preset.feature})`,
            value: name
        }
    })
    
    const presetPrompt = {
        name: "preset",
        type: "list",
        message: `Please pick a preset:`,
        choices: [
            // 默认配置
            ...presetChoices,
            // 这是手动模式提示语
            {
                name: "Manually select feature",
                value: "__manual__"
            }
        ]
    }
    
    const featurePrompt = {
        name: "features",
        when: isManualMode,
        type: "checkbox",
        message: "Check the features needed for your project:",
        choices: [],
        pageSize: 10
    }
    
    return {
        presetPrompt,
        featurePrompt
    }
}
```

这样配置后，在用户选择功能前会先弹出这样的提示语：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4429ecc881a743b58a7046af32a9b4f4~tplv-k3u1fbpfcp-watermark.image">

### 包管理器

在 vue-cli 创建项目时，会生成一个 .vuerc 文件，里面会记录一些关于项目的配置信息。例如使用哪个包管理器丶npm 源是否使用淘宝等等。为了避免和 vue-cli 冲突，本脚手架生成的配置文件为 .mvcrc

这个 .mvcrc 文件保存在用户的 home 目录下（不同操作系统目录不同）。 我的是 win10 操作系统，保存目录为 C:\Users\bin。获取用户的 home 目录可以通过以下代码获取：

```js
const os = require("os");
os.homedir();
```

.mvcrc 文件还会保存用户创建项目的配置，这样会用户重新项目时，就可以直接选择以前创建过的配置，不用再一步步的选择项目功能。

在第一次创建项目时，.mvcrc 文件是不存在的。如果这时用户还安装了 yarn，脚手架就会提示用户要使用哪个包管理器：

```js
// 读取 `.mvcrc` 文件
const savedOptions = loadOptions();
// 如果没有指定包管理器并且存在 yarn
if(!savedOptions.packageManager && hasYarn) {
    const packageManagerChoices = [];
    
    if(hasYarn()) {
        packageManagerChoices.push({
            name: "Use Yarn",
            value: "yarn",
            short: "Yarn"
        })
    }
    
    packageManagerChoices.push({
        name: "Use NPM",
        value: "npm",
        short: "NPM"
    })
    
    otherPrompts.push({
        name: "packageManager",
        type: "list",
        message: "Pick the package manager to use when installing dependencies",
        choices: packageManagerChoices
    })
}
```

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/882416fb903d4222b00c6872f8e17ec7~tplv-k3u1fbpfcp-watermark.image">

当用户选择 yarn 后，下载依赖的命令就会变成 yarn；如果选择了 npm，下载命令则为 npm install:

```js
const PACKAGE_MANAGER_CONFIG = {
    npm: {
        install: ["install"]
    },
    yarn: {
        install: []
    }
}

await executeCommand(
    this.bin, // 'yarn' or 'npm'
    [
        ...PACKAGE_MANAGER_CONFIG[this.bin][command],
        ...(args || [])
    ],
    this.context
)
```

### 切换 npm 源

当用户选择了项目功能后，会先调用 shouldUseTaobao() 方法判断是否需要切换淘宝源：

``` 
const execa = require("execa");
const chalk = require("chalk");
const request = require("./request");
const { hasYarn } = require("./env");
const inquirer = require("inquirer");
const registries = require("./registries");
const { loadOptions, saveOptions } = require('./options');

async function ping(registry) {
	await request.get(`${registry}`/vue-cli-version-marker/latest`);
	return registry;
}

function removeSlash(url) {
	return url.replace(/\/$/, '');
}

let checked;
let result;

module.exports = async function shouldUseTaobao(command) {
	if(!command) {
		command = hasYan ? "yarn" : "npm"
	}
	
	// 确保只被调用一次
	if(checked) return result;
	checked = true;
	
	// 以前保存的偏好
	const saved = laodOptions().useTaobaoRegistry;
	if(typeof saved === "boolean") {
		return (result = saved);
	}
	
	const save = val => {
		result = val;
		saveOptions({ useTaobaoRegister: val });
		return val;
	}
	
	let userCurrent;
	try {
		userCurrent = (await execa(command, ["config", "get", "npmRegistryServer"])).stdout
	} catch (npmRegistryServerError) {
		return save(false);
	}
	
	let faster;
	try {
		faster = await Promise.race([
			ping(defaultRegister),
			ping(registries.taobao)
		])
	} catch (e) {
		return save(false);
	}
	
	if(faster !== registries.taobao) {
		return save(false);
	}
	
	if(process.env.VUE_CLI_API_MODE) {
		return save(true);
	}
	
	// 询问和保存偏好
	const { useTaobaoRegister } await inquirer.prompt([
		{
			name: "useTaobaoRegister",
			type: "confirm",
			message: chalk.yellow(
				`Your connection to the default ${command} registry seems to be slow.\n`
				`Use ${chalk.cyan(registries.taobao)} for faster installation`,
			)
		}
	])
	
	// 注册淘宝源
	if(useTaobaoRegistry) {
		await execa(command, ['config', 'set', 'registry'], registries.taobao)
	}
	
	return save(useTaobaoRegistry)
}
```

上面代码的逻辑为：

- 先判断默认配置文件 .mvcrc 是否有 useTaobaoRegistry 选项。如果有，直接将结果返回，无需判断
- 向 npm 默认源和淘宝源各发一个 get 请求，通过 Promise.race() 来调用。这样更快的那个请求会先返回，从而知道是默认还是淘宝源速度更快
- 如果淘宝源速度更快，向用户提示是否切换到淘宝源
- 如果用户选择淘宝源，则调用 await execa(command, ['config'. 'set', 'registry', 'registries.taobao']) 将当前的 npm 的源改为淘宝源，即 npm config set registry https://registry.npm.taobao.org。如果是 yarn，则命令为 yarn config set registry https://registry.taobao.org。

#### 一点疑问

其实 vue-cli 是没有这段代码的：

```js
// 注册淘宝源
if(useTaobaoRegistry) {
    await execa(command, ["config", "set", "registry", registries.taobao])
}
```

这是我自己加的。主要是我没有在 vue-cli 中找到显示注册淘宝源的代码，它只是从配置文件读取出是否使用淘宝源，或者将是否使用淘宝源这个选项写入配置文件。另外 npm 的配置文件 .npmrc 是可以更改默认源的，如果在 .npmrc 文件直接写入淘宝的镜像地址，那 npm 就会使用淘宝源下载依赖。但 npm 肯定不会去读取 .vuerc 的配置来决定是否属于淘宝源。

对于这一点我没搞明白，所以在用户选择了淘宝源之后，手动调用命令注册一遍。

### 将项目功能保存为默认配置

如果用户创建项目时选择手动模式，在选择完一系列功能后，会弹出下面的提示语：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41d813fb1cc44878995aa91452e61e95~tplv-k3u1fbpfcp-watermark.image">

询问用户是否将这次的项目选择保存为默认配置，如果用户选择是，则弹出下一个提示语：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5098adeb27974af7aba91d48b5d3871d~tplv-k3u1fbpfcp-watermark.image">

让用户输入保存配置的名称

这两句提示语相关的代码为：

```js
const otherPrompts = [
    {
        name: "save",
        when: isManualMode,
        type: "confirm",
        message: "Save this as a preset for future projects?",
        default: false
    },
    {
        name: "saveName",
        when: answers => answers.save,
        type: "input",
        message: "Save preset as:"
    }
]
```

保存配置的代码为：

```js
exports.saveOptions = (toSave) => {
    const options = Object.assign(cloneDeep(exports.loadOptions()), toSave)
    for(const key in options) {
        if(!(key in exports.defaults)) {
            delete options[key];
        }
    }
    cacheOptions = options;
    try {
        fs.writeFileSync(rcPath, JSON.stringify, null, 2);
        return true;
    } catch (e) {
        error {
            `Error saving pregerences`
            + `make sure you have write access ${rcPath}.\n`
            + `(${e.message})`,
        }
    }
}
    
exports.savePreset = (name, preset) => {
    const preset = cloneDeep(exports.loadOptions().presets || {});
    presets[name] = preset;
    
    return exports.saveOptions({ presets });
}    
```

以上代码直接将用户的配置保存到 .mvcrc 文件中。下面是我电脑上的 .mvcrc 的内容：

```js
{
    "packageManager": "npm",
    "presets": {
        "test": {
            "feature": [
                "label",
                "linter"
            ],
            "eslintConfig": "airbnb",
            "lintOn": [
                "save"
            ]
        },
        "demo": {
            "feature": [
                "babel",
                "linter"
            ],
            "eslintConfig": "airbnb",
            "lintOn": [
                "save"
            ]    
        }
    },
    "useTaobaoRegistry": true    
}
```

下次再创建项目时，脚手架就会读取这个配置文件的内容，让用户决定是否使用已有的配置来创建项目。

至此，v2 版本的内容就介绍完了。

### 小结

由于 vue-cli 关于插件的源码我还没有看完，所以这篇文章只讲解两个版本的源码。v3 版本等我看完 vue-cli 的源码再回来填坑，预计在 3 月初就可以完成。

## 第三个版本 v3

第三个版本主要添加了两个功能：

- 将项目拆分分为 menorepo 的组织方式
- 新增 add 命令，可以通过 mvc add xxx 命令的方式来添加插件

### menorepo

首先来简单了解一下 monorepo 和 multirepo。它们都是项目管理的一种方式，multirepo 就是将不同的项目在不同的 git 仓库维护，而 monorepo 将多个项目放在同一个 git 仓库中维护。在 v3 版本里，我要将 mini-cli 改造成 monorepo 的方式，把不同的插件当成一个个独立的项目来维护。

在将项目改造成 monorepo 后，目录如下所示：

```js
├─packages
│  ├─@mvc
│  │  ├─cli # 核心插件
│  │  ├─cli-plugin-babel # babel 插件
│  │  ├─cli-plugin-linter # linter 插件
│  │  ├─cli-plugin-router # router 插件
│  │  ├─cli-plugin-vue # vue 插件
│  │  ├─cli-plugin-vuex # vuex 插件
│  │  └─cli-plugin-webpack # webpack 插件
└─scripts # commit message 验证脚本 和项目无关 不需关注
│─lerna.json
|─package.json
```

#### monorepo 改造过程

全局安装 lerna

```js
npm install -g lerna
```

创建项目

```js
git init mini-cli
```

初始化

```js'
cd mini-cli
lerna init
```

创建 package

```js
lerna create xxx
```

由于 cli 是脚手架核心代码，在这里需要调用其它插件，因为要将其它插件添加到 @mvc/cli 的依赖项

```js
# 如果是添加到 devDependencies，则需要在后面加上 --dev
# 下载第三方依赖也是同样的命令
lerna add @mvc/cli-plugin-babel --scope=@mvc/cli
```

改造成 monorepo-repo 后的脚手架功能和第二版没有区别，只是将插件相关的代码独立成应该单独的 repo，后续可以将插件单独发布到 npm。

#### 使用 monorepo 的优点

- 如果采用 multirepo 的方式开发，在本地调试时如果调用其它插件，则需要先执行 npm i 安装，才能使用。采用 monorepo 则没有这种烦恼，可以直接调用在 packages 则没有这种烦恼，可以直接调用在 packages 目录里的其它插件，方便开发调式。
- 如果多个插件都进行了修改，执行 lerna publish 时可以同步发布已经修改过的插件，不用每个单独发布。

### add 命令

将项目改造成 monorepo-repo 的目的就是为了后续方便做拓展。例如生成的项目原来是不支持 router 的，在中途突然想加入router 功能，就可以执行 mvc add router 添加 vue-router 依赖以及相关的模板代码。

先来看一下 add 命令的代码：

```js
const path = require("path");
const inquirer = require("inquirer");
const Generator= require("./Generator");
const clearConsole = require("./utils/crearConsole");
const PackageManager = require("./PackageManager");
const getPackage = require("./utils/getPackage");
const readFiles = require("./utils/readFiles");

add function add(name) {
    const targetDir = process.cwd();
    const pkg = getPackage(targetDir);
    // 清空控制台
    clearConsole();
    
    let answers = {};
    try {
       const pluginPrompts = require(`@mvc/cli-plugin-${name}/prompts`);
        answers = await inquirer.prompt(pluginPrompts);
    } catch (error) {
        console.log(error);
    }
    
    const generator = new Generator(pkg, targetDir, await readFiles(targetDir));
    const pm = new PackageManager(targetDirm, answers.packageManager);
    require(`@mvc/cli-plugin-${name}/generator`)(generator, answers);
    
    await generator.generate();
    // 下载依赖
    await pm.install();
}

module.exports = add;
```

由于 v3 版本仍然是在本地开发的，所以没有将相关插件发布到 npm 上，因为可以直接引用插件，而不需执行 npm i 安装。在 v2 版本执行 create 命令创建项目时，所有的交互提示语都是在 cli 插件下的，但是 add 命令是单独添加一个插件，因此还需要在每个插件下添加一个 prompts.js 文件（如果不需要，可以不加），里面是一些和用户交互的语句。例如用 add 命令 添加 router 插件时，会询问是否选择 history 模式。

```js
const chalk = require("chalk");
module.exports = [
    {
        name: "historyMode",
        type: "confirm",
        message: `Use history mode for router?{chalk.yellow(`Requires poper server setup for index fallback in production`)}`,
        description: `By using the HTML5 History API,the URLs do not need the '#' character anymore.`,
    }
]
```

从 add 命令的代码逻辑可以看出来，如果新加的插件有 prompts.js 文件就读取代码弹出交互语句。否则跳过，直接进行下载。

## 第四个版本 v4

v4 版本主要将 webpack 的 dev 和 build 功能做成了动态，原来的脚手架生成的项目是有一个 build 目录，里面是 webpack 的一些配置代码。v4 脚本的脚手架生成的项目是没有 build 目录的。

这一个功能跳过新增的 mvc-cli-service 插件来实现，生成的项目中会有以下两个脚本命令：

```js
scripts: {
    serve: 'mvc-cli-service server',
    build: 'mvc-cli-service build'    
}
```

当运行 npm run server 时，就会执行命令 mvc-cli-service serve。这一块的代码如下：

```j
# !/usr/bin/env node
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const devConfig = require("../lib/dev.config");
const buildConfig = require("../lib/pro.config");

const args = process.argv.slice(2);
if(args[0] === 'serve') {
	const compiler = webpack(devConfig);
	const server = new WebpackDevServer(compiler);
	
	server.listen(8080, '0.0.0.0', err => {
		console.log(err)
	})
}else if(args[0] === "build") {
	webpack(buildConfig, (err, stats) => {
		if(err) console.log(err);
		if(stats.hasErrors()) {
			console.log(new Error('Build failed with errors.'))
		}
	})
} else {
	console.log('error command')
}
```

原理如下（npm scripts 使用指南）

> npm 脚本的原理非常简单。每当执行 npm run，就会自动新建一个 Shell，在这个Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面

> 比较特别的是，npm run 新建的这个Shell，会将当前目录的 node_modules/.bin 子目录加入 PATH 变量，执行结束后，再将 PATH 变量恢复原样

上述代码对执行的命令进行了判断，如果是 serve，就 new 一个 WebpackDevServer  实例启动开发环境。如果是 build，就用 webpack 进行打包。

vue-cli 的 webpack 配置是动态的，使用了 chainwebpack 来动态添加不同的配置，我这个 demo 是直接写死的，主要是没时间，所以没有深入研究。

### 发布到 npm 后

下载 mini-cli 脚手架，其实下载的只是核心插件 mvc-cli。如果这个插件需要引用其它插件，则需要先进行安装，再调用。因此对 create add 命令需要做一些修改。下面看一下 create 命令代码的改动：

```js
answers.feature.forEach(feature => {
    if(feature !== "service") {
        pck.devDependencies[`mvc-cli-plugin-${feature}`] = `~1.0.0`;
    }else {
        pkg.devDependencies['mvc-cli-service'] = '~1.0.0';
    }
})

await writeFileTree(targetDir, {
    'package.json': "JSON.stringify(pkg, null, 2)"
})

await pm.install();

// 根据用户选择的选项加载对应的模块，在 package.json 写入对应的依赖项
// 并且将对应的 template 模块渲染
answers.feature.forEach(feature => {
    if(feature != 'service') {
        require(`mvc-cli-plugin-${feature}/generator`)(generator, answers);
    } else {
        require(`mvc-cli-service/generator`)(generator, answers);
    }
})

await generator.generate();

// 下载依赖
await pm.install();
```

上面的代码就是新增的逻辑，在用户选择需要的插件后，将这些插件写入到 pkg 对象，然后生成 package.json 文件，再执行 npm install 安装依赖。安装完依赖，再读取每个插件的 generator 目录/文件代码，从而生成模板或再次添加不同的依赖。然后再执行一次安装。

### 发布遇到的坑

v3 版本的插件有一个前缀 @mvc，由于带有 @ 前缀的 npm 包会默认作为私人包，因此遇到了一些坑。花费了挺长的时间，后来懒得弄了，干脆将所有的插件重新改了前缀名，变成了 mvc 开头的前缀。







# 11. 富文本兼容性





# 12.前端登录

- Cookie + Session 登录
- Token 登录
- SSO 登录
- oAuth 第三方登录

## Cookie + Session 登录

HTTP 是一种无状态的协议，客户端每次发送请求时，首先要和服务器端建立一个连接，在请求完成后又会断开这个连接。这种方式可以节省传输时占用的连接资源，但同时也存在一个问题：每次请求都是独立的，服务端无法判断本次请求和上次请求是否来自同一个用户，进而也就无法判断用户的登录状态。

为了解决 HTTP 无状态的问题，Lou Montulli 在 1994 年的时候，推出了 Cookie。

> Cookie 是服务端发送客户端的一段特殊学信息，这些信息以文本的方式存放在客户端，客户端每次向服务端发送请求时都会带上这些特殊信息。

有了 Cookie 之后，服务器端就能够获取到客户端传递过来的信息了，如果需要对信息进行验证，还需要通过Session。

> 客户端请求服务端，服务端会为这次请求开辟一块内存空间，这个便是 Session 对象。

有了 Cookie 和 Session 之后，我们就可以进行登录认证了。

Cookie + Session 实现流程

Cookie + Session 的登录方式是最经典的一种登录方式，现在仍然有大量的企业在使用。

用户首次登录时：

<img src="https://user-gold-cdn.xitu.io/2020/7/2/1730fcc51a6e8670?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">



- 用户访问 a.com/pageA，并输入密码登录
- 服务器验证密码无误后，会创建 SeesionId，并将它保存起来
- 服务器端响应这个 HTTP 请求，并通过 Set-Cookie 头信息，将 SessionId 写入 Cookie 中

> 服务器端的 SessionId 可能存放在很多地方，例如：内存丶文件丶数据库等。

第一次登录完成之后，后续的访问就可以直接使用 Cookie 进行身份验证了：

<img src="https://user-gold-cdn.xitu.io/2020/7/2/1730fcc51a81b9f8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

- 用户访问 a.com/pageB 页面时，会自动带上第一次登录时写入的 Cookie
- 服务端对比 Cookie 中的 SessionId 和保存在服务器端的 SessionId 是否一致
- 如果一致，则身份认证成功

Cookie + Session 存在的问题

虽然我们使用 Cookie + Session 的方式完成了登录验证，但仍然存在一些问题：


根据上面的案例，我们可以分析出 Token 的优缺点

- 服务器端不需要存放 Token，所以不会对服务器端造成压力，即使是服务器集群，也不需要增加维护成本
- Token 可以存放在前端任何地方，可以不用保存在 Cookie 中，提升页面的安全性
- Token 下发之后，只要在生效之内，就一直有效，如果服务器端想收回此 Token 的权限，并不容易

### Token 的生成方式

最常见的 Token 生成方式是使用 JWT（Json Web Token），它是一种简洁的，自包含的方法用于通信双方之间以 JSON 对象的形式安全的传递信息。

上文中我们说到，使用 Token 后，服务器端并不会存储 Token，那怎么判断客户端发过来的 Token 是合法有效的呢？

答案其实就在 Token 字符串中，其实 Token 并不是一串杂乱无章的字符串，而是通过多种算法拼接而成的字符串，我们来具体分析一下。

**JWT 算法主要分为 3 个部分：header（头信息）,playload（消息体）,signature（签名）**

**header 部分指定了该 JWT 使用的签名算法**

```js
header = '{"alg": "HS256", "typ": "JWT"}' // `HS256` 表示使用了 HMAC-SHA256 来生成签名
```

**playload 部分表明了 JWT 的意图：**
- 由于服务器端需要对接大量的客户端，也就需要存放大量的 SessionId，这样会导致服务器压力过大
- 如果服务器端是一个集群，为了同步登录态，需要将 SessionId 同步到每一个机器上，无形中增加服务器端维护成本
- 由于 SessionId 存放在 Cookie 中，所以无法避免 CSRF 攻击

## Token 登录

为了解决 Session + Cookie 机制暴露出的诸多问题，我们可以使用 Token 的登录方式

> Token 是服务端生成返回的一串字符串，以作为客户端请求的一个令牌。当第一次登录后，服务器会生成一个 Token 并会给客户端，客户端后续访问时，只需带上这个 Token 即可完成身份认证。

### Token 机制实现流程

<img src="https://user-gold-cdn.xitu.io/2020/7/2/1730fcc51ab8a1db?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

- 用户输入账号密码，并点击登录
- 服务器端验证密码无误，创建 Token
- 服务器端将 Token 返回给客户端，由客户端自由保存

后续页面访问时：

<img src="https://user-gold-cdn.xitu.io/2020/7/2/1730fcc519ee3add?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

- 用户访问 a.com/pageB 时，带上第一次登录时的 Token
- 服务器验证 Token，有效则身份认证成功

### Token 机制的特点

```js
playload = '{"loggedInAs": "admin", "iat": 1422779638}' // iat 表示令牌生成的时间·
```

**signature 部分为 JWT 的签名，主要为了让 JWT 不能被随意篡改，签名的方法分为两个步骤：**

- 输入 base64url 编码的 header 部分丶.丶base64url 编码的 playload 部分，输出 unsigedToken
- 输入服务器端私钥丶unsignedToken，输出 signature 签名

```js
const base64Header = encodeBase64(header);
const base64Payload = encodeBase64(payload);
const unsignedToken = `${base64Header}.${base64Payload}`;
const key = "服务器私钥";

signature = HMAC(key, unsignedToken);
```

最后的 Token 计算如下：

```js
const base64Header = encodeBase64(header);
const base64Payload = encodeBase64(payload);
const base64Signature = encodeBase64(signature);

token = `${base64Header}.${base64Payload}.${base64Signature}`
```

服务器在判断 Token 时：

```js
const [base64Header, base64Payload, base64Signature] = token.split('.');

const signaturel = decodeBase64(base64Signature);
const unsignedToken = `${base64Header}.${base64Payload}`;
const signature2 = HMAC("服务器私钥", unsignedToken);

if(signaturel === signature2) {
    return "签名验证成功, token 没有被篡改";
}

const payload = decodeBase64(base64Payload);
if(new Date - payload.iat < "token 有效期") {
    return "token 有效"
}
```

有了 Token 之后，登录方式已经变得非常高效吗。

## SSO 单点登录

单点登录指的是公司内部搭建一个公共的认证中心，公司下的所有产品的登录都可以在认证中心里完成，一个产品在认证中心登录后，再去访问另一个产品，可以 不用再次登录，即可获取登录状态。

### SSO 机制实现流程

用户首次访问时，需要在认证中心登录：

<img src="https://user-gold-cdn.xitu.io/2020/7/2/1730fcc5167bfd98?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">



- 用户访问网站 a.com 下的 pageA 页面
- 由于没有登录，则会重定向到认证中心，并带上回调地址 www.so.com?return-uri=a.copm/pageA，以便登录成功直接进入页面
- 用户在认证中心输入账号密码，提交登录
- 认证中心验证账号密码有效，然后重定向 a.com?tiket=123 带上授权码 ticket，并将认证中心 sso.com 的登录态写入 Cookie
- 在 a.com 服务器中，拿着 ticket 向认证中心确认，授权码 ticket 真实有效
- 验证成功后，服务器将登录信息写入 Cookie（此时客户端有 2 个 Cookie 分别存有 a.com 和 sso.com 的登录态）

认证中心登录完成之后，继续访问 a.com 下的其它页面：

<img src="https://user-gold-cdn.xitu.io/2020/7/2/1730fcc51207ae80?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

这个时候，由于 a.com 存在已登录的 Cookie 信息，所以服务器直接认证成功

如果认证中心登录完成之后，访问 b.com 下的页面

<img src="https://user-gold-cdn.xitu.io/2020/7/2/1730fcc53c73e18a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

这个时候，由于认证中心存在之前登录过的 Cookie，所以也不用再次输入账号密码，直接返回第4步，下发 tiket 给 b.com 即可。

### SSO 单点登录退出

目前我们已经完成了单点登录，在同一个认证中心的管理下，多个产品可以共享登录状态。现在我们需要考虑退出了，即：在一个产品中退出了登录，怎么让其它的产品也都退出登录？

原理其实不难，可以回过头来看第 5 步，每一个产品在向认证中心验证 ticket 时，其实可以顺带将自己的退出登录 api 发送到认证中心。

当某个产品 c.com 退出登录时：

- 清空 c.com 中的登录态 Cookie
- 请求认证中心 sso.com 中的退出 API
- 认证中心遍历下发过 ticket 的所有产品，并调用对应的退出 API，完成退出

## OAuth 机制实现流程

这里以微信开发平台的接入流程为例：

<img src="https://user-gold-cdn.xitu.io/2020/7/2/1730fcc5628c0462?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">



- 首先，a.com 的运营者需要在微信开发者平台注册账号，并向微信申请微信登录功能
- 申请成功后，申请得到的 appid丶appsecret
- 用户在 a.com 上选择使用微信登录
- 这时会跳转微信的 OAuth 授权登录，并带上 a.com 的回调地址
- 用户输入微信账号和密码，登录成功后，需要选择具体的授权范围，如：授权用户的头像丶昵称等
- 授权之后，微信会根据拉起 a.com?code=123，这时候带上了一个临时票据 code
- 获取 code 之后，a.com 会拿着 code 丶appid丶appsecret，向微信服务器申请 token，验证成功后，微信会下发一个 token
- 有了 token 之后，a.com 就可以凭借着 token 拿到对应的微信用户头像，用户昵称等信息
- a.com 提示用户登录成功，并将登录状态写入 Cookie，以作为后续访问的凭证

## 总结

- Cookie + Session 历史悠久，适合于简单的后端架构，需开发人员自己处理好安全问题
- Token 方案对后端压力小，适合大型分布式的后端架构，但已分发出去的 token，如果想收回权限，就不是很方便了
- SSO 单点，适合于中大型企业，想要统一内部所有产品的登录方式
- OAuth 第三方登录，简单易用，对用户和开发者都友好，但第三方平台很多，需要选择合适自己的第三方登录平台





# 13. 前端组件库开发实战

设计一个组件库考察的不是假大空的概念，而是有关开发者仓库管理丶组件设计丶单元测试丶持续集成丶协同管理等等能力。

这是一篇干货比较多的组件库搭建实战，不仅有通用的代码规范丶提交规范丶文档维护丶单元测试丶Github Action 配置的讲解丶还涉及到 lerna 的多包管理架构丶React Native 图标库建设丶React Native 组件库开发调试丶按需加载原理及实现。工程化的思想是通用的，所以无论是你用的框架是什么，本文都值得一读。

## 站在 Vant Design 的肩膀上

维护开发一个组件库无疑是需要投入很多时间和精力的，我选择了给现有 UI Design 实现 Reactive Native 版本的方式开启组件库开发之旅。在调研了 vant丶fishd-mobile 和 ant-mobile 后我选择了 vant。这是几个仓库的现状对比

| 组件库       | 团队         | Github Star | Npm 周下载量 | 维护度                           |
| ------------ | ------------ | ----------- | ------------ | -------------------------------- |
| ant-mobile   | Ant Design   | 8.9K        | 31,470       | 几乎不维护，据说蚂蚁内部也不用了 |
| fishd-mobile | 网易云商前端 | 29          | 22           | KPI 项目                         |
| vant         | 有赞         | 17.7K       | 27,789       | 维护度高，流行度也高             |

确定了旅程的方向，就是给我们的组件库起一个合适的名字和口号，用前端工程师的方向表述就是 package.json 的 name 和 description 字段：

```js'
// package.json
{
	"name": "vant-react-native",
	"description": "Lightweight React Native UI Components inspired on Vant"
}
```

> 由于我们的组件库定位是 vant 的 RN 版，参照 lottie-react-native丶styled-react-native丶jpush-react-native 的命名方式，我们将组件库命名为 vant-react-native，同时也是希望组件库完成时能获得 vant 官方的支持

## 基于 Lerna 的多包管理架构

Lerna 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目。由 Lerna 管理的仓库我们一般称之为单体仓库（monorepo）。基于 Lerna 的多包管理架构的优点在于：

- 组件级别解耦，独立版本控制，每个组件都有版本记录可追溯
- 组件单独发布，支持灰度丶版本回滚以及平滑升降级
- 按需引用，用户安装具体某个组件包，无需配置即可实现按需加载的效果
- 关注点分离，降低大型复杂度丶组件之间依赖清晰可控制
- 单一职责原则，降低开源基友的参与和贡献难度

```js'
.
└── packages
    ├── button # @vant-react-native/button
    └── icons # @vant-react-native/icon
```

初始化 lerna 项目

```j
$ mkdir vant-react-native && lerna init --independent
```

yarn workspaces

使用 yarn workspaces 结合 Lerna useWorkspace 可以实现 Lerna Hoisting。这并不是多此一举，这可以让你在统一的地方（根目录）管理依赖，这即节省时间又节省空间。

配置 lerna.json

```js
{
    ...
    "npmClient": "yarn",
    "useWorkerspaces": true
}
```

托管给 yarn workerspace 之后，lerna 的 packages 将会被顶级 package.json 的 worspaces 覆盖

```js
{
    "private": true,
     ...
    "workerspaces": [
        "packages/*"
    ]
}
```

lerna push config

如果你不想在所有 package.json 文件中单独明确设置你的注册表配置，例如使用私有注册表时，设置 command.publish.registry 很有用。配置 ignoreChanges 则是为避免不必要的版本升级。

```js
"ignoreChanges": [
    "ignored-file",
    "**/--tests__/**",
    "**/*.md"
]
"command": [
    "publish": {
    	"registry": "http://registry.npmjs.org"
    }
]
```

> 除此之外，如果你的包是带 scope 的，需要在那个包的 package.json 中设置 publishConfig.access 为 "publish"

lerna version config

当配置 conventionalCommits 为 true 后，lerna 版本将使用 Conventional Commits Specificartion 来确定版本升级并生成 CHANGELOG.md 文件。

```js
"command": {
    "version": {
        "conventionalCommits": true,
        "message": "chore(release):publish"
    }
}
```

## 规范化提交

规范化 git commit 对于提高 git log 可读性丶可控的版本控制和 changelog 生成都有重要的作用。

> 注意：husky 高版本用法不向后兼容，我在这个 commit 中用尤大 yorkie 代替了 husky

## 代码规范化

代码规范化的重要性不言而喻，代码规范化涉及的工具又 eslintconfig丶eslint丶prettier 等。

vant-react-native 暂时使用 @youngjuning/eslint-config丶@youngjuning/prettier-config 约束项目代码规范。相关配置如下文。

### eslint

首先安装 react-native 所需的插件

```js
yarn add -D eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y \
  eslint-plugin-import \
  eslint-plugin-react-native
```

然后配置 .eslintrc.js

```js
// .eslintrc.js
module.exports = {
    extends: ["@youngjuning/eslint-config/react-native"]
}
```

### prettier

```js
// .prettierrc.js
module.exports = require("@youngjuning/prettier.config")
```

### editorconfig

```js
# .editorconfig
# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[*.gradle]
indent_size = 4

[BUCK]
indent_size = 4
```

### yorkie & lint-staged

```js
$ yarn add -D yorkie lint-staged
```

```js
{
   "gitHooks": {
       "commit-msg": "commitlint -e -V",
       "pre-commit": "lint-staged"    
   },
   "lint-staged": {
       "**/*.{js, jsx, ts, tsx}": {
           "eslint --fix",
           "git add ."    
       }
   }    
}
```

## 第一个组件从 Icon 开始

一个传输的组件库都会拥有自己的一套的 Icon，Icon 一般由设计师通过 Sketch 设计，然后导出 svg 文件。

ant-design-icons 的 svg 文件是保存在本地，然后通过脚本生成 react 组件丶 vue 组件 和 icons-react-nav 等组件，由于支持的框架比较完备我们无需自己首先，RN 我们直接使用 icons-react-native。

vant 以及 fishd-mobile 则是通过 Iconfont 维护 svg 文件，然后通过设置 @font-face 的方式首先 Icon 组件，如图所示：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b3f6212f0124f4fab8b70dfeeb40c25~tplv-k3u1fbpfcp-watermark.image">

有了 ttf 文件，我们可以像 @vant-design/icons-react-native 一样基于 ttf 文件使用脚本生成 Icon 组件，但是使用 ttf 字体有一个弊端，就是每次更新图标，都要相应更新 ttf 文件，然后再次打包发布 APP。而且 ttf 不支持多种色彩的图标，导致所有图标都是单色。如果你是借助 react-native-vector-icons，该库内置了 10 多套 ttf 文件，合起来有 2M 左右；你可能用不到它们，但是它们仍然被打包进你的 APP 里，这也是我认为 react-native-elements 这个库外强中干的一大原因。





# 14. 首屏加载优化

然后他问PV、UV应该怎么统计（我当时还厚脸皮的问他PV和UV是什么）？如果访问的页面出不来PV怎么统计？页面有没有做什么行为监测？页面访问量过大怎么处理？我大致讲了一些我的思路。

Jenkins 多人开发 本地编译？

框架层次图

1. JWT优缺点
2. 基本数据类型



1. 方案题：不同前端技术栈的项目，如何实现一套通用组件方案？
2. CI/CD流程
3. ssr优缺点
4. 谈谈eleme框架源码

