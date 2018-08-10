---
title: 应用构建常见问题及解决方式
summary: 应用构建常见问题
toc: true
---

## 一、Maven源码构建

### 1.1 解决由于缓存原因构建失败的问题
报错日志如下：

```log
14:20:58builder:builder: [ERROR] Failed to execute goal 
org.apache.maven.plugins:maven-install-plugin:2.5.2:install (default-install) on project 
record-query-services: Execution default-install of goal 
org.apache.maven.plugins:maven-install-plugin:2.5.2:install failed: Plugin 
org.apache.maven.plugins:maven-install-plugin:2.5.2 or one of its dependencies could not be resolved: 
The following artifacts could not be resolved: org.apache.maven:maven-plugin-api:jar:2.2.1, 
org.apache.maven:maven-profile:jar:2.2.1: Failure to find org.apache.maven:maven-plugin-api:jar:2.2.1 
in http://maven.goodrain.me/ was cached in the local repository, resolution will not be reattempted 
until the update interval of nexus-osc has elapsed or updates are forced -> [Help 1]
```

解决方法：  
1. 应用添加环境变量NO_CACHE 值为true，重新构建  
2. 如果还构建失败，请确定是否使用了私有maven仓库，如果有请参考 [对接Maven仓库
](../../best-practice/ci-cd/connection-maven-repository.html)  

### 1.2 对于maven 多模块项目 怎么运行

暂时只能拆开，单独运行。

### 1.3 如何设置maven构建命令

构建命令 `mvn install -pl jsoft-common -am -amd`  
设置应用环境变量：`BUILD_MAVEN_CUSTOM_GOALS="clean install -pl jsoft-common -am -amd"`  

### 1.4 如何设置启动命令

通过设置 [Procfile](../language-support/java.html#3-4) 实现自定义启动命令。

### 1.5 设置构建与运行时的编码

通过在应用的 【设置】--【自定义环境变量】添加变量的方式可以指定构建和运行时的编码。主要解决java程序中文文件下载和读取问题：

- 添加名为 `BUILD_LANG` 值为 `C.UTF-8` 的环境变量，设置<b>构建时的编码</b>
- 添加名为 `LANG` 值为 `C.UTF-8` 的环境变量，设置<b>运行时的编码</b>

<center>
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/trouble-shooting/tb1-5.png" width=80% />
</center>

## 二、应用运行异常如何排查

### 2.1 单一应用异常
示例应用URL:  `http://console.goodrain.com/#/team/goodrain/region/ali-sh/app/gr33927d/overview`

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/Issue/WX20180726-164608@2x.png" width=100% />

1. 查看应用日志看服务是否有报错日志
2. 查看应用状态 `grctl service get http://console.goodrain.com/#/team/goodrain/region/ali-sh/app/gr33927d/overview`,看pod的`PodStatus`状态是否为`True`,正常情况如下`PodStatus:    	Initialized : True  Ready : True  PodScheduled : True`
3. 登录到pod所在节点(PodHostIP/PodHostName),查看容器状态`dps |head -10`或者`ctop`
4. 可以排查一下docker,kubelet的状态。

### 2.2 多个应用或者全部应用都异常

1. 检查集群状态 `kubectl get cs` & `kubectl get node`
2. 检查rbd-worker的状态



当使用Rainbond 遇到问题时，请先参考本篇文档。如果问题未解决，请按文档要求收集相关信息通过 Github [反馈给 Rainbond开发者](https://github.com/goodrain/rainbond/issues/new)。

