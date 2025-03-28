---
title: 管理应用
description: 本章描述 开源应用商店 发布应用会有哪些价值。
---

本节主要介绍在云原生应用市场如何管理应用，主要包含应用上下架、应用描述、套餐和版本以及生成离线包等内容。`管理员`角色还会有更多的管理功能。

## 管理维护应用信息

在云原生应用市场中，登录以后，点击右上角`控制台`进入`后台管理`，选择左侧`上架应用`，点击`管理`会进入到应用信息管理界面去完善应用信息，Tab页主要包含`基础信息`、`应用版本`。

### 完善基本信息

应用基础信息是介绍你应用的好地方，你可以通过简介让更多人对应用有更清晰的理解。

- 应用基本信息字段说明：

|字段|说明|
|-|-|
|名称|应用的名称，自定义|
|logo|应用上架之后所展示的logo|
|分类|对应用进行归类，当前应用属于什么类别|
|标签|根据应用的类型定义标签，可通过标签分组|
|简介|应用的简要描述|
|详情|应用的详细介绍，也可以是使用说明|

将信息填写完整，点击下方保存按钮就可以将编写的信息进行保存。

### 应用版本

选择上面Tab页`应用版本`，一个应用可以有多个版本。你可以编辑某个版本的信息，或删除对应版本，还可以对 RAM 版本生成离线安装包。

- 版本信息：可以编辑版本作为插件使用,以及版本别名和描述。

- 离线包：点击离线包会弹出一个窗口，有一个`生成`按钮,点击按钮会生成应用的离线包，只有生成离线包上架之后才会展示下载应用包的按钮，不生成离线包是不支持下载的。

信息编辑完成之后会在应用版本列表显示。


### 上架

在完善应用信息以后，也为该应用创建了对应的套餐，这时候我们就可以去完成应用的上架。在应用列表处点击`上架`按钮，即可完成上架。

上架成功后的应用从商店首页就可以搜索到上架的应用，点进应用详情页之后，可看到发布应用的作者，如果生成过离线包，则在应用详情页会展示出来一个`下载`按钮,点击下载会得到一个当前应用的安装包，此安装包可以被其他人导入到Rainbond平台进行管理，导入流程参考[使用指南](https://www.rainbond.com/docs/store/install/appPackage)。

## 上架规范

### 基础信息规范

**应用名称：**应用名称要明确，需使用与应用功能相关的词汇，不能是日常通用性的描述词汇，不得出现测试、test等宽泛字样。正规，无淫秽、侵权、暴力等非法字符。

**应用Logo：**应用 Logo 的设计应该简洁明了，易于理解和识别。建议上传 100*100 比例的Logo图片。

**应用简介：**应用简介的内容应该言简意赅，避免出现冗长繁琐的描述，同时也要确保涵盖应用的主要特点和功能。建议在60字以内。

**分类：**应用添加已有分类时要考虑应用功能与分类标签保持一致性和规范性。避免因分类错误而导致应用无法被准确地检索。

**所属组织：**应用添加所属组织，以便于根据组织筛选查看上架应用。应如实填写所属组织，避免上架应用的所属组织混乱而导致应用无法被准确地检索。

**标签：**应用标签用于帮助用户快速准确地搜索和筛选应用。在添加标签时，需要根据应用的实际情况和功能，选择恰当的标签，以确保标签与应用的功能和特点保持一致性和规范性。同时，还需要注意标签的数量和分类，不宜过多或过少，以免影响用户的使用体验和搜索效果。

**应用介绍：**应用介绍是介绍应用功能和特点的详细介绍，能够让用户更加全面地了解应用的用途和功能。此外为了保证上架应用详情内容格式的一致性，Rainbond制定了以下书写规范，请认真阅读并遵守：

- 推荐使用一级和二级标题，避免过多嵌套的标题，以确保阅读体验的清晰和易读。
- 标题级别对应的富文本编辑器样式如下：

| 标题级别 | 富文本编辑器 | 样式             |
| :------- | :----------- | :--------------- |
| 一级标题 | H1           | 左对齐加粗       |
| 二级标题 | H2           | 左对齐加粗       |
| 三级标题 | H3           | 左对齐不加粗     |
| 正文     | 正文         | 左对齐  默认字号 |

**安装文档**：安装文档旨在提供清晰的指导，以帮助用户正确安装应用。为了保证文档的一致性和易读性，请按照以下规范书写安装文档：

- 推荐使用一级和二级标题，避免过多嵌套的标题，以确保阅读体验的清晰和易读。
- 标题级别对应的富文本编辑器样式同应用介绍。

请遵循上述规范书写安装文档，包括前提条件、下载应用和安装应用的详细步骤。确保提供清晰的指导，以帮助用户成功安装应用。

**使用文档**：使用文档旨在提供清晰的指导，以帮助用户正确使用应用。为了保证文档的一致性和易读性，请按照以下规范书写使用文档：

- 推荐使用一级和二级标题，避免过多嵌套的标题，以确保阅读体验的清晰和易读。
- 标题级别对应的富文本编辑器样式同应用介绍

请遵循上述规范书写使用文档，包括登录账户、主界面功能介绍、核心功能的操作指南等。确保提供清晰的指导，以帮助用户顺利使用应用。

### 应用版本规范

版本号命名规范通常采用“主版本号.次版本号.修订号”的形式。

1. 主版本号：表示软件的重大更新或重构，通常由开发者或公司决定。当软件进行了重大更新或重构时，主版本号应该从1开始重新计数。

2. 次版本号：表示软件的功能增强或修改，通常由开发者或公司决定。当软件进行了重大更新或重构时，次版本号应该重置为0。

3. 修订号：表示软件的bug修复或小的改进，通常由开发者或测试人员决定。每次bug修复或小的改进，修订号都应该加1。

例如，一个软件的版本号为1.2.3，其中1表示主版本号，2表示次版本号，3表示修订号。

除此之外，版本号命名规范还需要遵循以下几点：

1. 版本号的各个部分之间用点号（.）分隔，不使用其他符号。
2. 版本号应该是一个字符串，不能包含任何空格或其他特殊字符。
3. 版本号应该是唯一的，不允许出现相同的版本号。



