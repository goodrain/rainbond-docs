---
title: SpringBoot project deployment
description: Deploy the SpringBoot project in Rainbond
keywords:
  - Rainbond Deployment SpringBoot Project
  - SpringBoot project deployment
---

Import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=5" />

Rainbond supports projects that build the SpringBoot Single Module and Multi Modules, and automatically identify its modules.

Maven 项目是根据 `pom.xml` 文件来划分的, Rainbond 对它的识别也是建立在 `POM` 的基础上的. 主. 是识别出具体`模块(module)` 的构建命令和启动命令. 构建命令的作用是指定需要构建的模块, 是类似于 **mvn install -pl 'module name' -am** 的 mvn 命令. 启动命令的作用是在构建完成后, 指定需要执行的 Jar 包, 是类似于 \*_web: java $JAVA_OPTS -jar _.jar__ 的命令.

**Identification Policy:**

- Find POM in the corresponding module based on modules in the root POM.
- Parse the current POM module name and jar(war) package name if the packing tag in POM is jar(war).The value of the packing tag is empty and will be considered jar.
- The module name consists of the value of the module tag in the parent POM, split with `/` and resembles the following: rbd-worker/rbd-thirdparty.
- jar(war) 包名默认是 \*\*$\{artifaceId}-\*.jar(war)\`。如果设置了 finalName 标签, 则会使用 finalName 标签的值; 如果 finalName 标签使用了变量 **$\{project.name}** 或 **$\{project.aritfactId}**，则会使用变量对应的值; 如果使用了其他的变量, 则直接用 代替, 即: .jar(war)。
- If the packing tag value in POM is POM, and the module in the module tab is more than 1, repeat 1 - 5.

## Deploy SpringBoot Multimodule Project

1. Deploy components based on source code, fill in the following information：

|                        | Content                                      |
| ---------------------- | -------------------------------------------- |
| Component name         | Custom                                       |
| Component English Name | Custom                                       |
| Repository Address     | `https://gitee.com/zhangbigqi/RuoYi-Vue.git` |
| Code Version           | Master                                       |

2. Enter the multimodule build, select the **ruoyi-admin** module, which is runnable and other modules are dependent.
3. Enter **Component -> Port** to delete default 5,000 ports, add **8080 http**.
4. Wait for the build to complete.
