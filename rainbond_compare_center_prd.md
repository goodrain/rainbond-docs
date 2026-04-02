# Rainbond 选型中心 PRD

## 文档信息
- 项目名称：Rainbond 选型中心（Compare Center）
- 文档类型：开发 + 设计执行版需求文档
- 文档日期：2026-03-31
- 适用版本：V1 完整上线版
- 目标站点：`rainbond-docs`

## 1. 项目背景

Rainbond 当前已经具备较强的产品差异化表达、案例内容、场景内容、安装文档与试用入口，但这些内容仍主要分散在首页、文档、博客、案例页和场景页中，没有形成一个面向“高意图决策用户”的统一入口。

在中国市场，用户搜索和决策路径通常不是先搜“Rainbond 是什么”，而是先搜：

- `Rainbond vs Rancher`
- `Rainbond 和 KubeSphere 区别`
- `Sealos 怎么选`
- `Helm 和 Rainbond 有什么区别`
- `不会 K8s 怎么部署 Dify`
- `离线环境怎么做应用交付`

这类用户已经处在高意图阶段，距离注册、试用、安装、咨询非常近。当前如果没有专门的选型落地页承接，这部分流量会分散到：

- 零散博客
- 文档说明页
- 第三方转载
- 竞品页面

导致 Rainbond 丢失高价值新增用户。

因此需要在主站内建立一个独立的信息架构：`选型中心`，统一承接“怎么选”“和谁比”“适合谁”的高意图流量，并把用户推进到：

- 试用 Rainbond Cloud
- 查看快速安装
- 阅读案例和场景页
- 进入社群或进一步咨询

## 2. 项目目标

### 2.1 业务目标
- 提升中国市场高意图流量的承接能力。
- 提升 `对比/选型` 相关关键词的自然搜索点击和转化。
- 把原本分散的对比认知内容升级成可转化的 landing page 集群。
- 提升从内容访问到 `run.rainbond.com`、安装文档、案例页、场景页的跳转率。

### 2.2 产品目标
- 在主站下新增 `选型中心` 一级内容集群。
- 提供统一的选型页模板，支持未来持续扩展更多 `vs` 页面。
- 建立稳定的内容复用方式，避免每新增一个对比页都从零写。

### 2.3 用户目标
- 用户能在 30-60 秒内理解：Rainbond 适不适合自己。
- 用户能快速知道：Rainbond 与 Rancher / KubeSphere / Sealos / Helm 的核心差异。
- 用户能明确下一步动作：试用、安装、查看案例、看场景方案、加入社群。

## 3. 非目标

以下内容不在 V1 范围内：

- 独立域名或子域名建设
- 动态数据库驱动的对比平台
- 多语言版本
- 交互式选型问卷工具
- 用户登录态个性化推荐
- 大规模 programmatic SEO 页面批量生成
- 站外渠道内容生产执行

## 4. V1 范围

### 4.1 必须上线内容
- 一个选型中心首页：`/compare`
- 四个核心对比页：
  - `/compare/rainbond-vs-rancher`
  - `/compare/rainbond-vs-kubesphere`
  - `/compare/rainbond-vs-sealos`
  - `/compare/rainbond-vs-helm`
- 首页导航/入口调整
- 首页 `Comparison` 模块调整
- 站内关键页面到 `/compare` 的内链导流
- 基础 SEO / GEO / FAQ / 埋点

### 4.2 建议同步上线内容
- 每个对比页至少 1 组相关案例推荐
- 每个对比页至少 1 组相关场景推荐
- 每个对比页至少 1 个明确 CTA 组

## 5. 成功标准

V1 上线后 30-60 天内，项目以以下指标判断是否有效：

### 5.1 流量指标
- `/compare` 集群 UV 持续增长
- `Rainbond vs X` 相关页面获得自然搜索流量
- 选型页面在站内内容流中的访问占比提升

### 5.2 转化指标
- 对比页到 `run.rainbond.com` 的点击率
- 对比页到安装文档的点击率
- 对比页到案例页/场景页的点击率
- 对比页来源的注册或深度访问数

### 5.3 质量指标
- 页面跳出率下降
- 页面停留时间提升
- FAQ 区块点击或展开率稳定

## 6. 目标用户

## 6.1 用户画像 A：技术门槛敏感型团队
- 团队规模较小
- 开发多，专业 K8s 运维少
- 关注：能不能快上手、少学概念、快速交付

典型问题：
- 我们不会 K8s，能不能用？
- 是不是比 Rancher 简单？
- 比 KubeSphere 更适合中小团队吗？

## 6.2 用户画像 B：传统企业/交付型团队
- 有离线环境、国产化、客户交付、多环境部署需求
- 关注：离线交付、多环境一致性、应用模板、安装维护成本

典型问题：
- Rainbond 是否适合离线交付？
- 和 Helm 比，哪个更适合标准化交付？
- 国产化/ARM/鲲鹏环境能不能跑？

## 6.3 用户画像 C：平台选型比较用户
- 已经在几款平台之间做 shortlist
- 关注：适合谁、不适合谁、成本、学习曲线、场景匹配

典型问题：
- Rainbond 和 Rancher 到底谁更适合我？
- Sealos 适合开发环境，那生产环境呢？
- Helm 很灵活，但为什么还需要 Rainbond？

## 7. 用户搜索与决策意图

选型中心要承接的不是泛流量，而是以下高意图搜索：

- `Rainbond vs Rancher`
- `Rainbond 和 KubeSphere 区别`
- `Rancher 和 Rainbond 怎么选`
- `Sealos 和 Rainbond 对比`
- `Helm 和 Rainbond 区别`
- `不懂 Kubernetes 用什么平台`
- `离线环境应用交付平台`
- `AI 私有化部署平台 怎么选`

这些搜索意图的共同特征：
- 用户已经知道一部分方案
- 用户在做比较，不是纯认知教育
- 用户接下来最可能的动作就是试用、咨询、安装、看案例

## 8. 产品方案总览

### 8.1 方案定义
在 Rainbond 主站下新增一个 `Compare Center` 内容集群，用统一模板生成独立的高意图 landing page。

### 8.2 核心原则
- 不做独立域名，放在主站内继承权重
- 不把页面写成“功能堆砌”，而要写成“决策辅助”
- 不写成纯文档，要兼顾 SEO、设计展示和转化
- 每个页面都必须有明确的下一步动作

### 8.3 页面职责分工
- `/compare`
  - 选型中心首页
  - 聚合入口
  - 引导用户进入具体对比页
- `/compare/rainbond-vs-*`
  - 独立承接搜索和转化
  - 提供完整决策信息
- 现有文档页
  - 提供技术细节和深度说明
- 现有案例页/场景页
  - 提供信任证据和使用证明

## 9. 信息架构与 URL 规划

### 9.1 URL 结构
- `/compare`
- `/compare/rainbond-vs-rancher`
- `/compare/rainbond-vs-kubesphere`
- `/compare/rainbond-vs-sealos`
- `/compare/rainbond-vs-helm`

### 9.2 后续扩展预留
- `/compare/rainbond-vs-openshift`
- `/compare/rainbond-vs-portainer`
- `/compare/how-to-choose-cloud-native-platform`

### 9.3 导航入口
V1 建议新增以下入口：

- 顶部导航新增一级或二级入口：`选型中心`
- 首页 `Comparison` 模块 CTA 从“了解更多”升级为“进入选型中心”
- 在相关 blog / docs / case / usescene 页面增加对比页推荐区

## 10. 页面清单

### 10.1 页面 1：选型中心首页 `/compare`
作用：
- 聚合所有核心对比页
- 提供用户自我分流
- 作为首页、博客、文档、案例页导流终点

### 10.2 页面 2：`/compare/rainbond-vs-rancher`
作用：
- 承接最核心的竞品对比搜索
- 解决“集群管理 vs 应用交付”的认知分歧

### 10.3 页面 3：`/compare/rainbond-vs-kubesphere`
作用：
- 承接中国市场核心国产竞品对比流量
- 强调易用性、应用抽象和学习门槛差异

### 10.4 页面 4：`/compare/rainbond-vs-sealos`
作用：
- 承接新平台对比和 AI / 开发环境相关兴趣流量
- 强调“团队阶段”和“场景成熟度”差异

### 10.5 页面 5：`/compare/rainbond-vs-helm`
作用：
- 承接偏技术、偏交付型流量
- 解释“工具 vs 平台”的本质差异

## 11. 页面模板规范

所有 `vs` 页必须使用统一模块顺序，避免每页结构不一致。

### 11.1 模块 1：Hero
必须包含：
- 页面标题
- 一句话结论
- 两个主 CTA
- 适合谁的简短提示

示例结构：
- 标题：`Rainbond vs Rancher：哪个更适合你的团队？`
- 副标题：`如果你更关注应用交付效率和低 K8s 门槛，Rainbond 更适合；如果你更关注多集群治理，Rancher 更合适。`
- CTA 1：立即体验
- CTA 2：3 分钟安装

### 11.2 模块 2：先给结论
要求：
- 不让用户自己读完全页才知道答案
- 必须给出“什么情况下选 Rainbond，什么情况下不选 Rainbond”

格式建议：
- 如果你符合这些情况，优先看 Rainbond
- 如果你更符合这些情况，优先看对方

### 11.3 模块 3：适合谁 / 不适合谁
要求：
- 明确到团队规模、角色结构、场景复杂度
- 必须诚实，不写成单边碾压

### 11.4 模块 4：核心对比表
维度建议：
- 产品定位
- 目标用户
- 学习曲线
- 是否需要懂 K8s
- 部署与交付方式
- 多环境/离线支持
- 应用市场/模板能力
- 应用级可视化能力
- 多集群/基础设施治理能力
- 典型适用场景

### 11.5 模块 5：场景化决策说明
要求：
- 不只给静态表格
- 需要告诉用户“你是什么类型团队，就该怎么选”

至少包含 3 个场景：
- 小团队/中小企业
- 交付型团队/离线环境
- 平台团队/多集群治理团队

### 11.6 模块 6：证据区
内容来源：
- 现有案例页
- 现有场景页
- 现有应用市场能力
- 现有安装和离线能力说明

要求：
- 每页至少放 2 个证据卡片
- 最好带量化结果

### 11.7 模块 7：FAQ
每页至少 5 个问题：
- Rainbond 和 X 的本质区别是什么？
- 我完全不懂 K8s 能不能用？
- 哪个更适合离线环境？
- 哪个更适合 AI 私有化部署？
- 我应该先试 Rainbond Cloud 还是先自建安装？

### 11.8 模块 8：CTA 结束区
每页必须有 4 类出口：
- 立即试用 Rainbond Cloud
- 查看快速安装
- 查看案例
- 查看相关场景方案

## 12. 选型中心首页模板

`/compare` 需要与 `vs` 页不同，它更像一个目录型 landing page。

### 12.1 模块建议
- Hero：告诉用户“你现在是在做平台选型，这里帮你快速判断”
- 快速分流卡片：
  - 我要比 Rancher
  - 我要比 KubeSphere
  - 我要比 Sealos
  - 我要比 Helm
- 按团队类型选：
  - 我不懂 K8s
  - 我做离线交付
  - 我做 AI 私有化
  - 我是平台运维团队
- 推荐证据：
  - 热门案例
  - 热门场景
  - 热门安装方式
- 统一 CTA

## 13. 内容策略与文案原则

### 13.1 文案原则
- 先结论，后解释
- 场景优先，不做纯功能堆砌
- 讲清适合谁，也讲清不适合谁
- 少用抽象概念，多用团队处境和业务结果

### 13.2 语气要求
- 专业、诚实、能帮助用户做决定
- 不攻击竞品
- 不写成“万能产品”

### 13.3 禁止写法
- 纯功能罗列
- 纯品牌口号
- 一味贬低对手
- 没有下一步动作的结尾

## 14. 内容复用来源

V1 必须优先复用现有资产，避免从零写。

### 14.1 主要复用来源
- [differences.md](/Users/liufan/Code/market/rainbond-docs/docs/quick-start/differences.md)
- [首页 Comparison 组件](/Users/liufan/Code/market/rainbond-docs/src/components/HomePage/Comparison/index.tsx)
- 相关案例页：
  - [diningroom.md](/Users/liufan/Code/market/rainbond-docs/src/pages/case/diningroom.md)
  - [xybigdata.md](/Users/liufan/Code/market/rainbond-docs/src/pages/case/xybigdata.md)
  - [talkweb.md](/Users/liufan/Code/market/rainbond-docs/src/pages/case/talkweb.md)
  - [csgApp.md](/Users/liufan/Code/market/rainbond-docs/src/pages/case/csgApp.md)
- 相关场景页：
  - [offlineDelivery.md](/Users/liufan/Code/market/rainbond-docs/src/pages/usescene/offlineDelivery.md)
  - [MultiCloudManagement.md](/Users/liufan/Code/market/rainbond-docs/src/pages/usescene/MultiCloudManagement.md)
  - [IntegrationDev.md](/Users/liufan/Code/market/rainbond-docs/src/pages/usescene/IntegrationDev.md)
  - [x86ToArm.md](/Users/liufan/Code/market/rainbond-docs/src/pages/usescene/x86ToArm.md)
- 相关博客：
  - `2026-03-27-rainbond-rancher-kubesphere-sealos.md`
  - `2025-03-06-cloud-native-platform-comparison-2025.md`

## 15. 设计要求

### 15.1 设计目标
- 保持与 Rainbond 主站一致的视觉语言
- 但要比普通文档页更像决策 landing page
- 强化信息层级和 CTA 可见性

### 15.2 页面风格
- 首屏必须有明确结论
- 对比表要清晰，不可滚动成本过高
- `Rainbond` 一列视觉高亮，但不能夸张失真
- 证据区和 CTA 区必须与正文区显著区分

### 15.3 响应式要求
- 桌面端优先
- 移动端对比表需要可读的折叠或卡片方案
- 首屏 CTA 在移动端不能被折叠到首屏外

## 16. 功能需求

### 16.1 导航需求
- 顶部导航可进入 `/compare`
- 首页对比模块 CTA 跳转 `/compare`

### 16.2 页面内功能
- 支持锚点跳转
- 支持 FAQ 展开
- 支持相关推荐区块
- 支持多 CTA 类型

### 16.3 推荐的文件结构

建议新增：

- `rainbond-docs/src/pages/compare/index.tsx`
- `rainbond-docs/src/pages/compare/rainbond-vs-rancher.tsx`
- `rainbond-docs/src/pages/compare/rainbond-vs-kubesphere.tsx`
- `rainbond-docs/src/pages/compare/rainbond-vs-sealos.tsx`
- `rainbond-docs/src/pages/compare/rainbond-vs-helm.tsx`

建议新增组件：

- `rainbond-docs/src/components/Compare/CompareHero.tsx`
- `rainbond-docs/src/components/Compare/CompareTable.tsx`
- `rainbond-docs/src/components/Compare/FitChecklist.tsx`
- `rainbond-docs/src/components/Compare/DecisionScenarios.tsx`
- `rainbond-docs/src/components/Compare/EvidenceCards.tsx`
- `rainbond-docs/src/components/Compare/CompareFaq.tsx`
- `rainbond-docs/src/components/Compare/CompareCTA.tsx`
- `rainbond-docs/src/components/Compare/ComparePageLayout.tsx`

建议修改：

- `rainbond-docs/src/components/HomePage/Comparison/index.tsx`
- `rainbond-docs/src/components/NavBar/index.tsx`

## 17. CTA 设计

### 17.1 CTA 类型
- `立即体验 Rainbond Cloud`
- `3 分钟快速安装`
- `查看用户案例`
- `查看场景方案`
- `加入交流群`

### 17.2 CTA 规则
- 每页首屏至少 2 个 CTA
- 每页中段至少 1 个 CTA
- 每页底部必须有完整 CTA 组

### 17.3 CTA 与意图匹配
- Rancher 对比页：更强调“适合开发/应用交付团队”
- Helm 对比页：更强调“交付、模板、可视化管理”
- Sealos 对比页：更强调“团队阶段和 AI 场景”
- KubeSphere 对比页：更强调“易用性与学习门槛”

## 18. SEO / GEO 需求

### 18.1 SEO 基础
每页必须独立配置：
- Title
- Description
- H1
- canonical
- Open Graph

### 18.2 关键词方向
- `Rainbond vs Rancher`
- `Rainbond 和 Rancher 区别`
- `Rainbond vs KubeSphere`
- `Rainbond vs Sealos`
- `Rainbond vs Helm`
- `不会 Kubernetes 用什么平台`

### 18.3 GEO / AI 搜索适配
每页必须有：
- 明确结论型摘要
- FAQ 区块
- 场景判断段
- 标准化对比结构

### 18.4 内链要求
内链来源至少包括：
- 首页
- 相关 blog
- 相关 docs
- 相关场景页
- 相关案例页

内链去向至少包括：
- `/compare`
- 对应 `vs` 页
- 快速安装页
- 场景页
- 案例页

## 19. 数据埋点需求

### 19.1 必埋事件
- `compare_page_view`
- `compare_cta_click`
- `compare_scroll_depth`
- `compare_faq_expand`
- `compare_related_case_click`
- `compare_related_scene_click`
- `compare_to_install_click`
- `compare_to_cloud_click`

### 19.2 事件参数
- `page_name`
- `competitor`
- `cta_type`
- `source_page`
- `device_type`

### 19.3 核心看板
- Compare 集群访问量
- Compare 集群来源
- Compare -> Cloud 点击率
- Compare -> 安装文档点击率
- Compare -> 案例点击率
- Compare -> 场景页点击率

## 20. 验收标准

### 20.1 页面上线验收
- `/compare` 和 4 个 `vs` 页面均可访问
- 页面在桌面端和移动端样式正常
- 页面有完整 Title / Description / H1
- 页面 CTA 可正常跳转
- FAQ 可正常展开
- 相关案例和场景区块可正常跳转

### 20.2 信息架构验收
- 首页对比模块可导流到 `/compare`
- 顶部导航可进入 `/compare`
- 至少 4 个现有页面增加到选型中心的内链

### 20.3 内容质量验收
- 每页都有明确“适合谁/不适合谁”
- 每页都有对比表
- 每页都有案例或场景证据
- 每页都有底部 CTA 组

### 20.4 数据验收
- 必埋事件可正常触发
- 页面访问与 CTA 点击数据可进入分析系统

## 21. 风险与注意事项

### 21.1 风险 1：页面写成“宣传页”
后果：
- 用户不信任
- 转化降低

要求：
- 必须保留“对手更适合哪些团队”的说明

### 21.2 风险 2：信息太多，首屏不清楚
后果：
- 用户看不到结论
- 跳出率上升

要求：
- 首屏必须先给答案，再讲细节

### 21.3 风险 3：只有流量，没有承接
后果：
- 访问上涨但转化不涨

要求：
- 所有页面必须接 CTA、案例、场景、安装路径

### 21.4 风险 4：页面彼此重复
后果：
- SEO 重复
- 内容维护成本高

要求：
- 统一模板，差异化结论

## 22. 后续迭代建议

V1 上线后可以继续迭代：

- 增加更多 `vs` 页面
- 增加行业选型页
- 增加交互式选型问卷
- 增加视频版选型内容
- 增加下载型资产，如选型清单、迁移清单

## 23. 实施优先级建议

### 第一优先级
- `/compare`
- `/compare/rainbond-vs-rancher`
- `/compare/rainbond-vs-kubesphere`
- 顶部导航入口
- 首页 Comparison 导流调整

### 第二优先级
- `/compare/rainbond-vs-sealos`
- `/compare/rainbond-vs-helm`
- FAQ 与结构化内容
- 站内内链补齐

### 第三优先级
- 埋点优化
- 页面文案细化
- 案例/场景卡片升级

## 24. 推荐排期

### 第 1 周
- 确认信息架构
- 确认页面模板
- 确认页面文案框架

### 第 2 周
- 完成 `/compare` 与 4 个页面开发
- 完成首页与导航入口调整

### 第 3 周
- 完成内容填充
- 完成 FAQ、案例、场景、CTA
- 完成埋点和 SEO 配置

### 第 4 周
- 联调与验收
- 上线
- 监控数据并做首轮优化

## 25. 最终结论

Rainbond 选型中心 V1 的本质，不是新增一组内容页，而是建立一个新的高意图增长入口。

它要完成三件事：

1. 抢占中国用户“怎么选”的决策流量
2. 让用户快速判断自己适不适合 Rainbond
3. 把用户从对比认知推进到试用、安装、案例验证和进一步转化

只要 V1 把这三件事做扎实，Rainbond 就不再只是“有很多内容”，而是开始拥有一个真正能持续带来新增用户的选型引擎。
