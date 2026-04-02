---
draft: true
---

# 选型中心设计文档

## 一、背景与目标

当前站点头部导航里有文档、博客等一级入口，但缺少一个可持续扩展的专题型内容模块。用户希望在头部增加 `专题` 入口，并将 `选型中心` 作为独立模块挂载进去，形成与博客并列、可长期扩充的内容区域。

本次目标不是一次性建设完整的内容体系，而是先把信息架构和模块骨架搭好：

- 头部新增 `专题` 下拉入口
- 下拉中先提供 `选型中心`
- `选型中心` 独立挂载到 `/selection-center`
- 模块内包含一个首页和若干详情页，便于后续持续新增专题内容

## 二、用户旅程

### 2.1 用户入口

1. 用户访问站点头部导航
2. 在一级导航中看到 `专题`
3. 打开下拉菜单并点击 `选型中心`
4. 进入 `选型中心` 首页
5. 从首页进入具体选型专题详情页

### 2.2 页面结构

- 头部导航：新增 `专题` 下拉
- 选型中心首页：承担模块介绍、专题导览、推荐阅读
- 选型详情页：承接单个选型主题内容

### 2.3 成功标准

- 头部可见 `专题 > 选型中心`
- `/selection-center` 可独立访问
- 模块内至少具备首页和详情页
- 内容组织方式可继续扩展，而不需要重构导航

## 三、实现方案

### 3.1 模块承载方式

采用第二个 Docusaurus docs 内容插件来承载 `选型中心`。

原因：

- 比自定义一套页面和数据源更轻
- 比博客更适合做专题型知识内容和左侧导航
- 独立 `path`、独立 `routeBasePath`、独立 `sidebar`，满足“独立模块”要求

### 3.2 路由与文件结构

- 插件内容目录：`selection-center/`
- 模块根路由：`/selection-center`
- 独立侧边栏：`selectionCenterSidebar.js`

计划创建：

- `selection-center/index.mdx`：模块首页
- `selection-center/application-delivery-platform.mdx`：专题详情页 1
- `selection-center/private-delivery-solution.mdx`：专题详情页 2
- `selection-center/platform-selection-checklist.mdx`：专题详情页 3

### 3.3 首页策略

首页不做复杂筛选系统，第一版保持轻量：

- 一段模块说明
- 3 张专题入口卡片
- 一组“你将看到什么”的说明
- 右侧/下方补充热门专题和最近更新信息

为保证样式可控，首页用 MDX 引用自定义 React 组件实现，而不是把复杂结构直接堆在 Markdown 中。

## 四、文件边界

- `docusaurus.config.js`
  - 注册 `selection-center` docs 插件
  - 增加头部 `专题` 下拉菜单
- `selectionCenterSidebar.js`
  - 定义模块独立侧边栏
- `selection-center/*.mdx`
  - 承载模块首页与详情页内容
- `src/components/SelectionCenter/Landing/index.tsx`
  - 选型中心首页内容组件
- `src/components/SelectionCenter/Landing/styles.module.css`
  - 首页样式

## 五、非目标

- 不做多级专题体系
- 不做筛选、搜索、标签系统
- 不改博客模块
- 不做新的内容管理后台

## 六、验证方式

- 运行 `npm run build`
- 确认构建成功且无路由冲突
- 检查导航项和新模块页面均可生成
