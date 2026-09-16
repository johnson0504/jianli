# 张宸与 / Johnson 个人作品集

React 19 + Vite 7，PC 优先，最大版心 1700px，同时适配手机和平板。

## 电脑端一键预览

在上一级 `outputs` 文件夹双击 `打开作品集.cmd`，会启动本地预览并用默认浏览器打开 `http://127.0.0.1:5173/`。服务作为独立后台进程运行，启动窗口结束后仍可访问；重复打开会复用已有服务。电脑重启后需要重新双击启动。公网发布目标为 `https://johnson0504.github.io/jianli/`；当前等待 GitHub 重新登录，尚未完成推送与上线验收。

也可在本目录运行 `node start-preview.cjs`（只启动）或 `node start-preview.cjs --open`（启动并打开浏览器）。需要已安装 Node.js 与项目依赖。启动日志位于项目根目录的 `work/preview/`；若端口被其他应用占用，脚本报告错误，不会结束其他应用。

后续视觉调整优先保证电脑端，包括首屏层级、作品网格、章节衔接和鼠标动效。

## 启动与预览

需要 Node.js 22.12+（或 20.19+）与 npm。在本项目目录运行：

```sh
npm install
npm run dev
```

浏览器打开终端显示的地址，默认是 http://127.0.0.1:5173/ 。网页需要通过本地服务器访问，不要直接双击 index.html。

生产构建：

```sh
npm run build
npm run preview
```

构建产物位于 `dist/`。所有字体、背景视频、项目截图、头像与简历均本地托管。

## 内容与交互

- 全屏 Hero：Minecraft 暖阳林间 MP4 视频、静态降级海报、动画暂停按钮；尊重系统减少动态效果设置，离开首屏自动暂停视频。
- 关于我：从原简历提取的个人照片、定位、介绍与可核对的项目数据。
- 六个精选项目：分类筛选、项目详情、MindLink 七张真实功能截图与公开长图、原始二维码及作品外链。
- 能力模块：AI、产品交互、自动化、技术支持，支持鼠标与方向键切换。
- 经历模块：技术售后实习、监测平台实习、教育与认证。
- 全屏联系页：邮件、电话、微信复制、四个方向简历下载。
- 模态窗口：原生 dialog，支持 Escape、焦点约束和关闭后焦点返回。

## 内容修改位置

| 位置 | 内容 |
| --- | --- |
| `src/data.js` | 项目详情、技术栈、作品链接、能力文案、简历文件列表 |
| `src/main.jsx` | 首页、个人介绍、经历、联系信息与组件结构 |
| `src/styles.css` | 配色、字号、版式和响应式断点 |
| `public/images/` | 原照片、标识、二维码与 2026-09-11 作品站点截图 |
| `public/media/` | Minecraft 首屏视频（736×414，38.87 秒）、备用图三视频（640×360，26.22 秒）和海报 |
| `public/resumes/` | 上一任务交付的四份完整修订 PDF，未在本次网站任务中改写 |
| `public/resumes/originals/` | 四份原始 PDF，完整保留照片、图标、二维码等内容 |
| `docs/content-notes.md` | 来源、版本差异和数据表述说明 |

## 视觉方向

当前版本采用明亮纸感：米白背景、鼠尾草绿强调色、Minecraft 暖阳林间视频，以及横向纸币式真实头像。首屏使用森林色渐变遮罩保证文字可读性；能力模块与联系区采用纸色底上的独立森林绿章节：桌面外沿 24px / 圆角 24px，手机外沿 12px / 圆角 16px；能力详情以分隔线与轻微色差组织层次。经历模块使用浅色工作手记和证据卡，形成明暗节奏。中文标题使用本地托管的思源宋体子集，正文使用本地托管的思源黑体子集，避免系统字体差异。

## 公网部署

目标公开仓库为 `johnson0504/jianli`，主分支为 `main`。GitHub Pages 使用 `.github/workflows/deploy.yml`：Node.js 22 → `npm ci` → `VITE_BASE=/jianli/ npm run build` → GitHub Actions Pages。Render 使用根目录的 `render.yaml`，创建 Static Site：`npm ci && VITE_BASE=/ npm run build`，发布 `dist/`。

GitHub Pages 地址为 `https://johnson0504.github.io/jianli/`；Render 地址由服务名生成，通常为 `https://jianli-portfolio.onrender.com/`，若名称冲突则以 Render 控制台显示的地址为准。生产基础路径由 `VITE_BASE` 控制：Pages 使用 `/jianli/`，Render 使用 `/`，开发服务器使用 `/`。图片、视频、PDF、字体和异步动效模块均通过 Vite 基础路径解析，网站使用单页 hash 导航。

发布步骤：在本机完成 `gh auth login --hostname github.com --git-protocol https --web`，核实账号为 `johnson0504` 后推送 `main`；仓库 Pages 的 Source 使用 GitHub Actions。随后在 Render 通过 GitHub OAuth 连接同一仓库并创建 Static Site，使用 `render.yaml` 或等价配置。等待两个平台构建成功，再检查首页、锚点、视频、字体、图片、PDF 和动效模块。无需在聊天中提供密码或令牌。

## 已完成验证

- `npm run build` 生产构建成功。
- Chromium 实际访问；1920、1440、1280、1113、768、511、390、320px 均检查横向溢出、导航及内容显示。
- 图四 MP4 在浏览器中解码并播放（736×414，38.87 秒）；图三视频作为备用素材保存。
- 项目筛选、七项 MindLink 图集、长图查看、Escape 返回、能力方向键切换、微信复制正常。
- 四份简历 URL 返回 200，文件头确认为 PDF。
- 前版 124 项报告保存在 `work/qa/feedback/qa-results.json`；本次动效版本报告为 `work/qa/motion/qa-results.json` 与 `work/qa/motion/interaction-results.json`，最终副本见 `docs/qa-motion-results.json` 和 `docs/qa-motion-interactions.json`。
- 前版截图保存在 `outputs/previews/motion/`；本次重播版本截图在 `outputs/previews/repeat/`，脚本与原始报告在 `work/qa/repeat/`。

## 外部作品的访问边界

MindLink 图集中的 AI 对话、量表、答题、AI 分析中、音乐和个人中心截图由用户提供；“AI 分析中”仅表示页面状态，不代表已生成分析结果。公开介绍长图来自 2026-09-13 截取。智能客服已验证公开聊天界面；未提交测试对话。古文字库已读取公开项目页与搜索输入页面。Render 站点冷启动时可能暂时返回加载页，截图和内容在本作品集中本地保存，因此不影响作品集展示。

## 动效与章节衔接

- 首屏英文标题遮罩上移，身份、简介与操作分层入场；正文滚动入场可在离屏后重复播放，首屏返回时也可重播，导航标题容器本身不移动。
- 桌面内容入场 28px / 700ms，同组错开 80ms；900px 以下 12px / 400ms。首屏视差上限 32px，森林背景层从 0.985 展开至 1，仅桌面精细指针启用。
- 作品封面局部鼠标提示、1.018 倍轻缩放；纸币头像倾斜上限 3°；主要按钮内部磁吸位移上限 6px，点击区域固定。系统光标保留。
- 项目分类通过 GSAP Flip 做 300ms 位置重排与淡入淡出；筛掉的卡片退出辅助技术与键盘焦点顺序。能力内容 220ms 切换，网格叠放预留最长文案高度，隐藏内容使用 inert。600px 以下能力选项为两列。
- 经历仍使用原生 details / summary，展开 240ms，支持快速反转；项目与简历仍使用原生 dialog，入场 220ms；图集切换 200ms。关闭弹窗保留原生焦点恢复与 Escape 行为。
- `src/RepeatReveal.js` 独立管理每个元素的重播状态；完全离屏且留出 24px 缓冲才重置，向下在约 85% 位置进入，反向重新进入同样播放。导航、直接 hash 与键盘聚焦立即展示目标；筛选期间暂停卡片入场，结束后重新测量。
- 头像去掉两侧文字与花章，保留真实肖像、中央椭圆线与纸纹，底部居中签名“保持好奇 · 动手创造”。头像和首屏主按钮使用 2px 暖金／浅绿边缘流光，8 秒循环，离屏或页面隐藏时暂停。项目封面边缘跟随柔光，能力选项选中时 400ms 高亮。
- `src/PortfolioMotion.jsx` 是 React 接入层；`src/motion.js` 按需加载 GSAP / ScrollTrigger / Flip；`src/motion.css` 集中管理章节轮廓及过渡。无需外部 CDN。
- 系统减少动态效果即时生效；触屏无鼠标跟随、磁吸和倾斜。动效模块加载失败时页面静态可读且交互可用；视频暂停、失败和动效互相独立。
- 滚动继续使用浏览器原生行为；不拦截滚轮，不引入横向展览或滚动锁定。

参考 Rafael Kurosawa 的节奏与 React Bits 的 AnimatedContent、TiltedCard、Magnet、StarBorder 思路，针对当前项目重新实现；未复制外部人物、文案或图片。没有改变简历、项目事实、日期、联系方式或本地原始素材。

2026-09-13 历史版本的 193 项检查记录保留在 `docs/motion-validation.md`。2026-09-14 重播版本的验收、截图与性能观察见 `docs/repeat-validation.md`，原始报告位于上级项目的 `work/qa/repeat/`。
