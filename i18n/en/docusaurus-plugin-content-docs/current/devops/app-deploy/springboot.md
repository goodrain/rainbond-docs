---
title: SpringBoot 项目部署
description: Deploy the SpringBoot project in Rainbond
keywords:
  - Rainbond 部署 SpringBoot 项目
  - SpringBoot 项目部署
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=5" />

Rainbond 支持构建 SpringBoot 单模块和多模块的项目，并自动识别其模块。

Maven 项目是根据 `pom.xml` 文件来划分的, Rainbond 对它的识别也是建立在 `POM` 的基础上的. 主. 是识别出具体`模块(module)` 的构建命令和启动命令. 构建命令的作用是指定需要构建的模块, 是类似于 **mvn install -pl 'module name' -am** 的 mvn 命令. 启动命令的作用是在构建完成后, 指定需要执行的 Jar 包, 是类似于 \*_web: java $JAVA_OPTS -jar _.jar__ 的命令.

**识别策略:**

- 根据根 POM 中的 modules 中的 module 标签, 找到相应模块下的 POM。
- 如果 POM 中的 packing 标签的值是 jar(war)，则解析出当前 POM 对应的模块名和 jar(war) 包名.。packing 标签的值为空, 会认为是 jar。
- 模块名由名级父 POM 中的 module 标签的值组成, 用 `/` 分割, 类似于: rbd-worker/rbd-thirdparty。
- jar(war) 包名默认是 **${artifaceId}-\*.jar(war)**。如果设置了 finalName 标签, 则会使用 finalName 标签的值; 如果 finalName 标签使用了变量 **${project.name}** 或 **${project.aritfactId}**，则会使用变量对应的值; 如果使用了其他的变量, 则直接用 代替, 即: .jar(war)。
- 如果 POM 中的 packing 标签的值是 POM，且 modules 标签中的 module 多于 1, 则重复 1 ~ 5。

## 部署 SpringBoot 多模块项目

1. 基于源码部署组件，填写以下信息：

|        | 内容                                           |
| ------ | -------------------------------------------- |
| 组件名称   | 自定义                                          |
| 组件英文名称 | 自定义                                          |
| 仓库地址   | `https://gitee.com/zhangbigqi/RuoYi-Vue.git` |
| 代码版本   | Master                                       |

2. 进入多模块构建，勾选 **ruoyi-admin** 模块，此模块是可运行的，其他模块都是依赖项。
3. 进入 **组件 -> 端口** 删除掉默认5000端口，添加 **8080 http** 端口。
4. 等待构建完成即可。
