export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  name: '张宸与', englishName: 'JOHNSON', city: '广州', cityEn: 'GUANGZHOU, CN',
  coordinates: '23°08′ N / 113°16′ E', phone: '13048846907', phoneDisplay: '130 4884 6907',
  email: '3287464372@qq.com', wechat: 'ZCYJohnson',
};

// Pending user assets, in final display order: AI conversation, assessment, music.
// Insert only real supplied screenshots before the public overview image.
export const projects = [
  {
    id: 'mindlink', no: '01', name: 'MindLink 心链', category: 'AI 应用', type: 'AI × MENTAL WELLNESS',
    subtitle: '让技术理解情绪，让陪伴更近一步。',
    description: '从心理问卷、产品原型到 AI 流式对话，连接有温度的体验与可落地的工程。',
    role: '全栈开发负责人 / 产品设计', date: '2024.12 — 2026.05',
    tags: ['Vue 3', 'FastAPI', 'DeepSeek-R1', 'RAG / SSE'],
    url: 'https://mindlink.chat/', qr: 'mindlink-qr', gallery: [
      {src:'images/mindlink-chat.webp',fullSrc:'images/mindlink-chat.jpg',title:'AI 对话 · 心链助手',alt:'MindLink 心链智能助手对话界面',caption:'用户提供的实际界面截图；展示心链 AI 助手的问候、提问与流式对话。'},
      {src:'images/mindlink-assessments.webp',fullSrc:'images/mindlink-assessments.jpg',title:'心理测评 · 量表入口',alt:'MindLink 心理测评量表选择页面',caption:'用户提供的实际界面截图；展示核心自我评价、SCL-27、乐嘉性格色彩等量表入口。'},
      {src:'images/mindlink-personality.webp',fullSrc:'images/mindlink-personality.jpg',title:'乐嘉性格色彩 · 答题',alt:'MindLink 乐嘉性格色彩测试答题界面',caption:'用户提供的实际界面截图；展示测试题目与选项交互。'},
      {src:'images/mindlink-analysis.webp',fullSrc:'images/mindlink-analysis.jpg',title:'问卷完成 · AI 分析中',alt:'MindLink 问卷完成后显示 AI 分析中的页面',caption:'用户提供的实际界面截图；展示问卷完成后的 AI 分析中状态，不代表已生成分析结果。'},
      {src:'images/mindlink-music.webp',fullSrc:'images/mindlink-music.jpg',title:'音乐 · 推荐首页',alt:'MindLink 音乐推荐页面',caption:'用户提供的实际界面截图；展示音乐推荐、播放入口与首页氛围视觉。'},
      {src:'images/mindlink-profile.webp',fullSrc:'images/mindlink-profile.jpg',title:'个人中心 · 音乐与问卷',alt:'MindLink 个人中心页面，包含音乐视频问卷标签',caption:'用户提供的实际界面截图；展示正念天数、资源统计以及音乐、视频、问卷入口。'},
      {src:'images/mindlink-full.webp',fullSrc:'images/mindlink-full-original.png',title:'公开介绍 · 完整页面',alt:'MindLink 完整公开页面，包含功能、使用流程和订阅方案',caption:'公开页面完整截图 · 2026.09.13。包含核心功能、使用流程和方案介绍。'},
    ],
    intro: '面向心理健康陪伴场景的 AI 助手平台。我在项目中结合产品设计与全栈开发，参与从需求梳理、高保真原型、接口设计到前后端联调的完整过程。',
    contributions: [
      '设计 AI 问答、音乐推荐、VIP 与个人中心等核心模块的原型，梳理用户路径与统一交互规范。',
      '搭建心理健康问卷系统，筛选专业量表，整理结构化 JSON 文档并明确接口参数。',
      '基于 DeepSeek-R1 构建对话引擎，设计 Prompt 与 RAG 流程，以 SSE 实现流式回复。',
      '使用 Vue 3 组件化实现页面，使用 FastAPI 开发后端，协调前后端联调与技术方案。',
    ],
    outcome: '完成心理健康平台落地，覆盖问卷评估、AI 对话、音乐推荐与付费体系，支持多端访问。',
    note: '后端版原简历记录「系统支持 500+ QPS」；未附压测环境与报告，因此此处不将其作为经独立验证的性能指标。实际使用需要登录，封面为公开页面截图。',
  },
  {
    id: 'characters', no: '02', name: '古文字库', category: 'AI 应用', type: 'CULTURE × DATA',
    subtitle: '让古老字形，拥有新的检索方式。',
    description: '将散落的字形资料变成可查询的数据：从 Agent 清洗到数据库、API 与前端。',
    role: '独立开发者', date: '2026.04 — 2026.05',
    tags: ['Python / Flask', 'SQLite', 'OpenClaw', '数据清洗'],
    url: 'https://ancient-characters-db.onrender.com', qr: 'characters-qr', gallery: [
      {src:'images/characters-query.webp',fullSrc:'images/characters-query-original.png',title:'字形检索 · 实际使用',alt:'古文字库查询喜字的结果，含朝代分类、字形、引用和注释',caption:'用户提供的查询界面；页面显示 459 个字头、3,977 张图片。与原项目总量分别保留，未推断包含关系。'},
      {src:'images/characters.webp',fullSrc:'images/characters.webp',title:'项目介绍',alt:'古文字库公开介绍页面',caption:'公开项目介绍 · 2026.09.11；记录 839 个字头、5,661 个字形。'},
    ],
    intro: '一个支持字头搜索与历史字形演变查询的古文字数据库。我独立完成数据处理、建模、接口与页面开发，将资料整理成可使用的查询系统。',
    contributions: [
      '借助 OpenClaw Agent 批量提取、清洗和结构化处理数据，解析 5,661 个字形元数据。',
      '实现朝代识别、繁简转换与编码去重，迭代修复识别缺陷。',
      '完成数据库建模、RESTful API 设计与前端开发，支持字形分组展示和检索。',
      '公开项目页列明 Flask、SQLite、注释管理、批量导入与跨域接口能力。',
    ],
    outcome: '整理 839 个字头、5,661 个字形，覆盖简历及项目页面所列的 7 个朝代分类。',
    note: '数据规模来自原始简历，并与 2026-09-11 的公开项目页面相互核对。Render 托管页面闲置后，首次访问可能需要等待唤醒。',
  },
  {
    id: 'openclaw', no: '03', name: 'OpenClaw 工作流', category: '自动化', type: 'AGENTS × AUTOMATION',
    subtitle: '把重复留给流程，把思考留给人。',
    description: '自定义 Skill、持续记忆和 RPA，让 Agent 走进真实的日常工作。',
    role: '深度开发者', date: '2026.03 — 2026.06',
    tags: ['OpenClaw', 'LanceDB', 'RPA', 'LLM API'],
    intro: '围绕内容生成、素材产出与重复业务流程，部署和维护 OpenClaw AI Agent，并探索跨会话记忆与可复用 Skill。',
    contributions: [
      '完成 Agent 环境初始化、部署配置、日常调教、运行维护与问题排查。',
      '重构记忆系统，搭建 LanceDB 向量库，实践混合检索、智能遗忘与跨会话记忆。',
      '开发业务自定义 Skill，用于内容生成、素材产出和自动化工作流。',
      '结合大模型 API、RPA 和 AI 辅助编程，改造重复性业务流程。',
    ],
    outcome: '形成可复用的自动化工作方式，多个 Skill 已在实际工作中使用；古文字库是 Agent 数据处理能力的一项具体应用。',
    note: '原始简历自述开发效率提升 60%+，未附量化测量方法，作为个人经验描述保留。封面为能力流程示意。',
  },
  {
    id: 'support', no: '04', name: '智能客服系统', category: 'AI 应用', type: 'KNOWLEDGE × CONVERSATION',
    subtitle: '从一个问题，到一次有效解答。',
    description: '知识库优先匹配，未命中时接入大模型，为技术支持提供可扩展的问答入口。',
    role: '个人作品 / 全栈开发', date: '作品展示',
    tags: ['Python / Flask', 'NLP', 'RESTful API', '知识库'],
    url: 'https://kefu-guqj.onrender.com', repo: 'https://github.com/johnson0504/kefu', qr: 'support-qr', gallery: [{src:'images/support-app.webp',fullSrc:'images/support-app.webp',title:'在线客服 · 实际界面',alt:'智能客服在线聊天界面',caption:'公开体验页面截图 · 2026.09.11。'}],
    intro: '以结构化知识库和 AI 大模型共同支撑的智能客服系统。该作品链接出现在 OpenClaw 版简历中，以下功能依据公开项目页及在线体验页面整理。',
    contributions: [
      '通过关键词加权与文本相似度进行混合匹配，优先使用知识库，未命中时回退至 AI 生成回答。',
      '接入 Claude、OpenAI 等模型提供商，支持多轮对话、上下文记录和会话隔离。',
      '使用结构化 JSON 管理分类、关键词和知识内容，通过 Flask 暴露标准 HTTP 接口。',
      '提供健康检查、请求日志与知识库统计；在线页面提供无人机产品等技术问题的快捷入口。',
    ],
    outcome: '公开提供项目介绍、在线聊天体验及源码链接，展示知识库问答到大模型集成的完整路径。',
    note: '公开页面另标注 50+ 知识条目、6 个 API、<100ms 与 85%+ 等指标；这些为项目自述，本作品集未对响应时间或准确率进行独立测试。首次访问可能需要等待 Render 唤醒。',
  },
  {
    id: 'robotics', no: '05', name: '智元系列机器人', category: '工程交付', type: 'ROBOTICS × REAL WORLD',
    subtitle: '让代码，真正走进物理世界。',
    description: '机器狗群体控制、L2 雷达点云与人形机器人调试，连接软件和现场。',
    role: '核心交付工程师', date: '2025.09 — 2026.06',
    tags: ['Python', 'ROS / ROS 2', '点云', '设备联调'],
    intro: '参与机器人与雷达的软硬件协同调试，处理从脚本控制、数据采集到多设备同步的现场问题。',
    contributions: [
      '编写 Python 自动化脚本，实现机器狗群体控制与自动巡航任务。',
      '开发宇树 L2 雷达数据采集与处理后端，实现点云实时传输与 3D 重建。',
      '搭建雷达、机器人与 PC 三端互联架构，处理多设备数据同步问题。',
      '参与性能调优、缺陷修复，以及远征 A2 人形机器人的语音交互与定制动作调试。',
    ],
    outcome: '积累机器人现场调试、部署和交付实践，保障巡航任务与多设备协同运行。',
    note: '内容依据后端 / 机器人方向原始简历，封面为点云与设备互联的概念示意。',
  },
  {
    id: 'market', no: '06', name: '夜市摊位预约小程序', category: '工程交付', type: 'MINI APP × EVERYDAY LIFE',
    subtitle: '从预约一个摊位，到落地一套流程。',
    description: '交互原型、双端界面、后台管理和审核部署，覆盖小程序的完整交付。',
    role: '小程序全栈开发 / 部署运营', date: '2024 — 2025',
    tags: ['微信小程序', 'UniApp', '腾讯云数据库', '交互设计'],
    intro: '围绕夜市摊位预约需求，开发用户端与商家端界面，并完成审核、部署、后台管理与使用培训。',
    contributions: [
      '设计交互原型与核心预约流程，规划用户端、商家端的数据展示与操作路径。',
      '基于微信小程序原生框架开发，兼容 UniApp 跨端适配规范。',
      '搭建腾讯云数据库和管理后台，处理 API 配置、资质审核、内容安全与协议备案。',
      '完成上线部署，培训管理员并编写操作手册。',
    ],
    outcome: '通过微信审核并上线使用，将夜市摊位预约流程数字化。',
    note: '原稿时间分别为：前端版 2024.04–2024.11；产品运营版 2024.09–2025.03。此处保留各版本记录。图标来自原始简历，封面流程为示意。',
  },
];

export const abilities = [
  {label:'AI 应用开发', en:'BUILD WITH INTELLIGENCE', title:'把模型能力，变成可用的产品。', description:'从模型接入、提示词和检索增强，到流式回复与会话管理，关注 AI 如何融入真实使用场景。', skills:['Python','FastAPI','Flask','LLM API','RAG','SSE','LanceDB'], proof:'实践于 MindLink、智能客服系统与 OpenClaw 工作流。', icon:'brain'},
  {label:'产品与交互', en:'DESIGN WITH INTENT', title:'从用户路径，推演每一次交互。', description:'梳理需求、设计高保真原型与关键流程，将问卷、对话、预约和后台管理拆解成可实现的界面与接口。', skills:['需求分析','高保真原型','即时设计 / Figma','Vue 3','UniApp','微信小程序'], proof:'实践于心理健康问卷、AI 对话与夜市预约的完整体验。', icon:'design'},
  {label:'自动化与工程', en:'MAKE IT REPEATABLE', title:'让重复的工作，成为可靠的流程。', description:'用自定义 Skill、数据清洗、RPA 与脚本，把一次性的操作沉淀为能够复用的能力，持续处理部署与运行问题。', skills:['OpenClaw','RPA','Linux','Docker','MySQL','SQLite','GitHub'], proof:'实践于 5,661 个字形数据处理、业务工具与 Agent 维护。', icon:'workflow'},
  {label:'技术支持与交付', en:'CLOSE THE LOOP', title:'从报错现场，找到问题的根因。', description:'理解用户描述，复现环境问题，区分权限、参数与网络故障，再把解决路径写进知识库和工具。', skills:['API 配置','npm / PATH','Git Bash','故障定位','知识库','ROS 2','设备联调'], proof:'实践于时空智联技术售后、机器人现场调试与部署交付。', icon:'terminal'},
];

export const resumeFiles = [
  {name:'AI 开发与自动化',desc:'OpenClaw · LanceDB · 古文字库',file:'ai-automation'},
  {name:'Python 与机器人',desc:'FastAPI · AI 平台 · 机器人交付',file:'python-robotics'},
  {name:'前端与小程序',desc:'Vue 3 · UniApp · 产品协作',file:'frontend-product'},
  {name:'产品设计与实施',desc:'原型设计 · 部署运营 · 数据平台',file:'product-delivery'},
];
