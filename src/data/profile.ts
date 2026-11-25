import type { ProfileData, ProjectCategoryKey } from '@/types/profile'

export interface CategoryFilterOption {
  key: ProjectCategoryKey
  label: string
}

export const PROJECT_CATEGORY_LIST: CategoryFilterOption[] = [
  { key: 'all', label: '全部作品' },
  { key: 'ai-tools', label: 'AI 与极客工具' },
  { key: 'indie-product', label: '独立产品与小游戏' },
  { key: 'production', label: '大型生产实践' },
  { key: 'open-source', label: '开源工程底座' }
]

export const PROFILE_DATA: ProfileData = {
  name: 'Crysu',
  handle: '547414',
  email: '268zhb@gmail.com',
  githubUrl: 'https://github.com/547414',
  websiteUrl: 'https://crysu.com',
  websiteDisplay: 'crysu.com',
  miniGameUrl: 'https://crysu.com/mini-game/',
  statusText: '全速前进中 · AI-Native 全栈工程师',
  roleTitle: '全栈系统架构师 · AI 工作流造物主 · 独立产品开发者',
  heroLead:
    '信奉工业级工程纪律，也热衷把 AI 调教成靠谱的研发搭档——顺手还造了个手机遥控工具，致力于早日实现在海边喝着椰子水点「允许」把需求上线。',
  heroSubLead:
    '主力 Python / FastAPI 与 Vue 3 / TypeScript，跨界 Go、Kotlin、原生客户端与微信小游戏。代码之外，喜欢打磨有爽点、有温度的独立产品。',
  motto: '全速前进。时代在加速，我们从不减速。',
  navItemList: [
    { label: '关于我', href: '#about' },
    { label: '技术版图', href: '#stack' },
    { label: '代表作品', href: '#works' },
    { label: '工程信条', href: '#principles' },
    { label: '联系', href: '#contact' }
  ],
  statMetricList: [
    { value: '50+', label: '全链路实战项目', hint: '企业级系统、AI 基础设施与独立产品' },
    { value: '30+', label: 'FastAPI × Vue 3', hint: '沉淀出高度统一的跨项目全栈底座' },
    { value: '24+', label: '共享规范体系', hint: '以子模块与 CLAUDE.md 驱动人机协同' },
    { value: '3,400', label: '单场生产峰值', hint: '集团百年庆典全流程系统实战验证' }
  ],
  terminalTabList: [
    {
      id: 'profile',
      filename: 'crysu.profile.ts',
      command: 'whoami --verbose',
      lineList: [
        { key: 'name', value: '"Crysu (@547414)"', tone: 'accent' },
        { key: 'archetype', value: '"一人全栈军团 · AI-Native 架构师"', tone: 'default' },
        { key: 'dailyStack', value: '["FastAPI", "SQLAlchemy 2", "Vue 3", "TypeScript"]', tone: 'default' },
        { key: 'crossDomain', value: '["Go", "Kotlin", "macOS/Win 原生", "微信小游戏", "Three.js"]', tone: 'amber' },
        { key: 'homeBase', value: '"https://crysu.com"', tone: 'accent' },
        { key: 'motto', value: '"时代在加速，我们从不减速"', tone: 'success' }
      ]
    },
    {
      id: 'discipline',
      filename: 'architecture.rule',
      command: 'cat code_config/GENERAL.md',
      lineList: [
        { prefix: '01', value: '单向分层依赖: basic -> basic_module -> biz_module', tone: 'accent' },
        { prefix: '02', value: '零 any 强契约: 显式 interface + Pydantic Model 自动驼峰/下划线', tone: 'default' },
        { prefix: '03', value: '命名强迫症: 列表一律 _list / List，告别模糊复数', tone: 'amber' },
        { prefix: '04', value: '生产洁癖: UnitOfWork 事务 + 日志敏感字段自动脱敏 + 蓝绿发版', tone: 'success' },
        { prefix: '05', value: '规范即代码: 24+ 仓库共享同一套 Git Submodule 规范底座', tone: 'muted' }
      ]
    },
    {
      id: 'ai-flow',
      filename: 'ai-workflow.sh',
      command: './run-ai-crew.sh --mode=remote',
      lineList: [
        { prefix: '$', value: 'load CLAUDE.md + AGENTS.md + code_config', tone: 'muted' },
        { prefix: '✓', value: 'Claude Code / Codex / Antigravity 接入规范上下文', tone: 'success' },
        { prefix: '✓', value: 'MCP 工具网关 + Agent Skills 权限策略就绪', tone: 'accent' },
        { prefix: '⚡', value: 'Phone AI Audit 已待命：离开工位，手机锁屏一键审批上线', tone: 'amber' }
      ]
    }
  ],
  portraitCardList: [
    {
      id: 'architecture',
      eyebrow: '01 · 工程纪律',
      title: '把经验沉淀成底座，而不是每次从零造轮子',
      summary:
        '在几十个全栈项目的迭代里，我把最容易腐化的部分全部收束成可复用骨架：后端严格单向分层、依赖注入、UnitOfWork 事务与 Model 强契约；前端坚持显式 interface 与零 any；并抽离出跨 20+ 项目共享的 code_config 规范子模块，让项目从第一天起就具备可维护性与生产级安全边界。',
      highlightList: ['单向分层架构', '跨仓共享 code_config', '日志脱敏 & 蓝绿发版'],
      accent: 'cyan'
    },
    {
      id: 'ai-native',
      eyebrow: '02 · AI-NATIVE',
      title: '不止用 AI 写代码，更给 AI 立规矩、造武器',
      summary:
        '把工程规范写进 CLAUDE.md / AGENTS.md 只是起点。为了让人机协同真正可控、趁手，我亲手做了手机远程审批与终端遥控工具 Phone AI Audit，也落地过企业级 AI 工具网关、智能问数 MCP、Agent Skills 体系及自建 TTS / ASR 语音推理接口。',
      highlightList: ['远程遥控三大 AI Agent', 'MCP & 工具网关', '语音推理自建'],
      accent: 'amber'
    },
    {
      id: 'maker',
      eyebrow: '03 · 独立产品魂',
      title: '既扛得住千人生产现场，也懂小游戏的瞬时爽感',
      summary:
        '写代码最迷人的瞬间，是技术真正落到人的体验上。既能独当一面交付 3,400 人参会的集团百年庆典全链路系统，也会在业余认真琢磨「只看 13% 拼豆就猜中」的微交互，或是为一对偷偷帮奶奶忙年的泥娃娃写下八章四十关的解谜剧本。',
      highlightList: ['千人级实战交付', '产品爽点提炼', '极客表达与温度'],
      accent: 'emerald'
    }
  ],
  techGroupList: [
    {
      id: 'core',
      badge: 'CORE ENGINE',
      title: '全栈主力引擎',
      subtitle: '经过 30+ 实战项目打磨的高效交付主战栈，覆盖后端服务、PC 管理端与移动端 H5。',
      skillList: [
        { name: 'Python 3.12', core: true },
        { name: 'FastAPI', core: true },
        { name: 'SQLAlchemy 2.0', core: true },
        { name: 'Pydantic', core: true },
        { name: 'Vue 3', core: true },
        { name: 'TypeScript', core: true },
        { name: 'Vite', core: true },
        { name: 'Tailwind CSS', core: true },
        { name: 'Naive UI' },
        { name: 'Vant' },
        { name: 'Celery' },
        { name: 'ECharts' }
      ]
    },
    {
      id: 'ai',
      badge: 'AI & AGENTS',
      title: 'AI 与 Agent 工程',
      subtitle: '围绕大模型应用、多 Agent 协同规范、工具网关协议与端到端语音推理构建生产闭环。',
      skillList: [
        { name: 'Claude Code / Codex / AGY', core: true },
        { name: 'MCP (Streamable HTTP)', core: true },
        { name: 'Agent Skills', core: true },
        { name: 'LLM-SDK / LangGraph', core: true },
        { name: 'ChatTTS (HLS 流式)' },
        { name: 'Faster-Whisper ASR' },
        { name: 'OCR 智能解析' },
        { name: 'SQLGlot 安全校验' }
      ]
    },
    {
      id: 'cross',
      badge: 'BEYOND WEB',
      title: '跨端与系统穿透',
      subtitle: '不被单一语言束缚，面对底层协议、桌面原生、移动端或图形交互时直接切最合适的栈。',
      skillList: [
        { name: 'Go (CLI / 核心服务)', core: true },
        { name: '原生微信小程序', core: true },
        { name: '微信小游戏', core: true },
        { name: 'Kotlin (Android)' },
        { name: 'macOS AppKit / 签名公证' },
        { name: 'Windows WPF' },
        { name: 'Three.js / Canvas' },
        { name: 'Java 微服务 / React' }
      ]
    },
    {
      id: 'infra',
      badge: 'INFRASTRUCTURE',
      title: '数据与生产基建',
      subtitle: '关注系统上线后的稳定性、权限边界与可观测性，追求开箱即用与平滑发版。',
      skillList: [
        { name: 'PostgreSQL', core: true },
        { name: 'Redis', core: true },
        { name: 'MinIO / RustFS', core: true },
        { name: 'Docker & Nginx' },
        { name: '蓝绿部署' },
        { name: 'RBAC 组织权限中台' },
        { name: '事务日志脱敏审计' },
        { name: 'Git Submodule 工程化' }
      ]
    }
  ],
  projectList: [
    {
      id: 'phone-ai-audit',
      title: 'Phone AI Audit',
      subtitle: '《人不在工位，我靠手机遥控 AI 一键上线》',
      category: 'ai-tools',
      categoryLabel: 'AI 与极客工具',
      featured: true,
      statusBadge: '开源 · 极客主推',
      summary:
        '面向 Claude Code、OpenAI Codex 与 Antigravity 的手机端 AI 通知、双端同步审批与远程终端遥控系统。别人苦守工位给 AI 点确认，你躺吊床就能锁屏审批、连终端、看 Diff 并一键 Push。',
      highlightList: [
        '双端同步审批（手机通知栏 + Mac 悬浮窗），高危命令自带指纹/面容二次门禁',
        '内置 xterm.js + tmux 反向加密隧道，无需暴露 SSH 端口即可手机接管终端',
        '按需流式远程翻代码、rg 全文秒搜，在线改代码强制 Diff + SHA256 乐观锁'
      ],
      tagList: ['Go', 'Kotlin', 'macOS', 'xterm.js', 'tmux', 'AI Agent'],
      linkList: [
        { label: '查看 GitHub 源码', url: 'https://github.com/547414/phone_ai_audit', primary: true }
      ]
    },
    {
      id: 'centennial-platform',
      title: '百年庆典活动平台',
      subtitle: '支撑 3,400 人参会的集团百年庆典全链路系统',
      category: 'production',
      categoryLabel: '大型生产实践',
      statusBadge: '生产级案例复盘',
      summary:
        '覆盖大型集团百年庆典全流程的线上与现场协同平台：在线报名、定制邀请函、多维晚宴排桌与座位查询、服装尺码登记及现场扫码打卡。在个人主站公开了完整的架构拆解、截图与真实生产环境数据复盘。',
      highlightList: [
        '3,400 人真实参会现场平稳承压，打通报名、排座、核销全链路',
        '公开完整系统架构图、现场业务闭环设计与生产环境复盘数据'
      ],
      tagList: ['FastAPI', 'Vue 3', 'PostgreSQL', 'Redis', '高并发现场'],
      linkList: [
        { label: '阅读案例复盘', url: 'https://crysu.com/centennial/', primary: true }
      ]
    },
    {
      id: 'xiaowo-shuati',
      title: '小窝刷题',
      subtitle: '个人题库管理、分享与高效练习微信小程序',
      category: 'indie-product',
      categoryLabel: '独立产品与小游戏',
      statusBadge: '开源 · 23 ★',
      summary:
        '围绕真实备考与记忆场景打磨的自制题库小程序。支持五种题型、LaTeX 数学公式渲染、Excel/ZIP 批量导入导出、分享码流转、顺序/随机/整套模拟练习与自动错题本复盘。',
      highlightList: [
        'Excel / ZIP 一键批量导入，支持 KaTeX 精准渲染公式与受控图片',
        '顺序、随机、整套多模式刷题，错题自动沉淀，克制聚焦核心体验'
      ],
      tagList: ['微信小程序', 'FastAPI', 'Vue 3', 'KaTeX', 'Celery'],
      linkList: [
        { label: '产品介绍页', url: 'https://crysu.com:5556/intro', primary: true },
        { label: 'GitHub', url: 'https://github.com/547414/tkwxxcx' }
      ]
    },
    {
      id: 'peek-bead',
      title: '这你豆能猜（Peekabead）',
      subtitle: '拼豆视觉 × 图像补全 × 早猜挑战微信小游戏',
      category: 'indie-product',
      categoryLabel: '独立产品与小游戏',
      statusBadge: '可在线试玩',
      summary:
        '一幅拼豆图案从零开始逐颗显现，玩家随时四选一抢答。故意砍掉冗长的摆豆与经营负担，把所有爽点聚焦在「别人还没看出来，我只看了 13% 就猜中了」的瞬间成就感。',
      highlightList: [
        '以「识别百分比」作为核心主数字，精准放大早猜挑战的传播爽点',
        '全栈自建关卡资产管线与管理后台，介绍页可直接上手试玩'
      ],
      tagList: ['微信小游戏', 'FastAPI', 'Vue 3', '核心玩法设计'],
      linkList: [
        { label: '介绍与试玩', url: 'https://crysu.com:5552/intro', primary: true }
      ]
    },
    {
      id: 'catdog-newyear',
      title: '猫狗过大年',
      subtitle: '一猫一狗，偷偷帮奶奶忙年 · 视觉错位解谜',
      category: 'indie-product',
      categoryLabel: '独立产品与小游戏',
      statusBadge: '独立创作中',
      summary:
        '竖屏单机视觉错位解谜微信小游戏。玩家一人操控灶台灯窝里的一对泥娃娃——小狗「年糕」和小猫「芝麻」，从腊月二十三到除夕趁奶奶睡着，在老厨房里「看起来连着，就能走」，把过年的事一样样偷偷做完。',
      highlightList: [
        '原创温暖中式民俗叙事：完整规划八章 40 关剧本与概念美术管线',
        '将视觉错位机制与生活化厨房场景深度融合，追求有温度的独立游戏质感'
      ],
      tagList: ['微信小游戏', '视觉错位解谜', '原创剧本', '独立策划'],
      linkList: [
        { label: '逛逛主站小游戏', url: 'https://crysu.com/mini-game/' }
      ]
    },
    {
      id: 'fun-quiz',
      title: 'Fun Quiz',
      subtitle: '多算法趣味测验平台 + AI 一键生成测验结构',
      category: 'ai-tools',
      categoryLabel: 'AI 与极客工具',
      statusBadge: '开源项目',
      summary:
        '开箱即用的趣味测评与诊断平台，原生支持多维向量匹配（MBTI/SBTI 风格）、累分段映射、分支决策树与加权随机四种算法；内置免登录 Token 授权体系与大模型辅助创建流水线。',
      highlightList: [
        '四种可配置测验引擎覆盖人格测试、能力测评、分类诊断与趣味抽签',
        '粘贴文本或 JSON 即可由大模型一键生成完整题目与计分结构'
      ],
      tagList: ['FastAPI', 'Vue 3', 'LLM 辅助生成', 'Token 授权'],
      linkList: [
        { label: '查看 GitHub 源码', url: 'https://github.com/547414/fun_quiz', primary: true }
      ]
    },
    {
      id: 'backend-framework-tts',
      title: '后端规范脚手架 & ChatTTS Stream API',
      subtitle: '多年工程实践沉淀的 Python 底座与流式语音服务',
      category: 'open-source',
      categoryLabel: '开源工程底座',
      statusBadge: '开源工具箱',
      summary:
        '包含两项面向开发者的开源沉淀：一套强调依赖注入、清晰分层与强类型约束的 Python Web 后端规范框架；以及支持 HLS 流式自动播放、多角色音色且实测兼容多端内置浏览器的 ChatTTS API 服务。',
      highlightList: [
        '后端规范底座：依赖注入 + SQLAlchemy + Pydantic，助力团队统一代码味道',
        'ChatTTS Stream API：边合成边播放，低首字延迟并适配企微与主流浏览器'
      ],
      tagList: ['Python', '依赖注入', 'SQLAlchemy', 'ChatTTS', 'HLS 流媒体'],
      linkList: [
        { label: '后端规范框架', url: 'https://github.com/547414/python_web_backend_framework', primary: true },
        { label: 'ChatTTS API', url: 'https://github.com/547414/chat_tts_api' }
      ]
    }
  ],
  enterpriseTrackList: [
    {
      title: '企业级 AI 工具网关',
      detail: 'Go CLI 终端接入 + 身份鉴权 + 工具授权、数据策略与全链路调用审计',
      tagList: ['Go CLI', 'FastAPI', '权限审计']
    },
    {
      title: '智能问数 MCP 平台',
      detail: '基于 Streamable HTTP 的企业级 MCP 服务，SQLGlot 执行前校验并注入角色数据范围',
      tagList: ['MCP', 'SQLGlot', 'Doris']
    },
    {
      title: '跨平台无线投屏系统',
      detail: 'Go 核心协议栈 + macOS AppKit 签名公证 + Windows WPF + Android TV 接收端',
      tagList: ['Go', 'AppKit', 'WPF', 'Android TV']
    },
    {
      title: 'AI 科研 & 多端企业中台',
      detail: 'mRNA 序列优化 Web UI、RustFS 私有网盘、OCR 票据解析与多系统集成自动化',
      tagList: ['生物计算 UI', 'RustFS', 'OCR']
    }
  ],
  principleList: [
    {
      index: '01',
      title: '先立规矩，再谈速度',
      enTitle: 'STRUCTURE FIRST',
      description:
        '依赖必须单向，类型拒绝模糊，重复两次以上的脚手架就该抽成底座。前期多花十分钟立好规矩，后期迭代才敢真正全速前进。'
    },
    {
      index: '02',
      title: '把 AI 训成队友，而非开盲盒',
      enTitle: 'AI AS SYSTEM',
      description:
        '与其反复提示返工，不如把架构约定、边界和验收标准写成机器可读的规范文档与工具网关，让 AI 写出的每行代码都长成团队期待的样子。'
    },
    {
      index: '03',
      title: '语言是工具，交付才是答案',
      enTitle: 'PRAGMATIC POLYGLOT',
      description:
        '用最顺手的 Python + Vue 3 稳稳守住 80% 战场；遇到端侧性能、原生窗口或底层隧道瓶颈时，随时掏出 Go、Kotlin 或原生 API 解决战斗。'
    },
    {
      index: '04',
      title: '留住折腾的兴致与产品的温度',
      enTitle: 'BUILD WITH SOUL',
      description:
        '严谨的工程思维保证系统不崩，而好奇心与同理心决定了作品是否让人记住。写完生产级鉴权与脱敏，也别忘了给自己和世界做点好玩的东西。'
    }
  ]
}
