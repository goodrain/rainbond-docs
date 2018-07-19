---
title: 应用构建常见问题及解决方式
summary: 应用构建常见问题
toc: true
---

## 1. 源码构建maven项目

报错日志如下：

```log
14:20:58builder:builder: [ERROR] Failed to execute goal org.apache.maven.plugins:maven-install-plugin:2.5.2:install (default-install) on project record-query-services: Execution default-install of goal org.apache.maven.plugins:maven-install-plugin:2.5.2:install failed: Plugin org.apache.maven.plugins:maven-install-plugin:2.5.2 or one of its dependencies could not be resolved: The following artifacts could not be resolved: org.apache.maven:maven-plugin-api:jar:2.2.1, org.apache.maven:maven-profile:jar:2.2.1: Failure to find org.apache.maven:maven-plugin-api:jar:2.2.1 in http://maven.goodrain.me/ was cached in the local repository, resolution will not be reattempted until the update interval of nexus-osc has elapsed or updates are forced -> [Help 1]
```

解决方法：  
1. 应用添加环境变量NO_CACHE 值为true，重新构建  
2. 如果还构建失败，请确定是否使用了私有maven仓库，如果有请参考 [对接Maven仓库
](../../best-practice/ci-cd/connection-maven-repository.html)  


当使用Rainbond 遇到问题时，请先参考本篇文档。如果问题未解决，请按文档要求收集相关信息通过 Github [反馈给 Rainbond开发者](https://github.com/goodrain/rainbond/issues/new)。

## 2. 对于maven 多模块项目 怎么运行

暂时只能拆开，单独运行。

## 3. 如何设置maven构建命令

构建命令 `mvn install -pl jsoft-common -am -amd`  
设置应用环境变量：`BUILD_MAVEN_CUSTOM_GOALS="clean install -pl jsoft-common -am -amd"`  

## 4. 如何设置启动命令

通过设置 [Procfile](../language-support/java.html#3-4) 实现自定义启动命令。