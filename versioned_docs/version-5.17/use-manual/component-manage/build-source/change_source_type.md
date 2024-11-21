---
title: 更换构建类型
description: 本文讲解基于Rainbond如何更换不同的构建源类型
---

### 概述

不论你的组件是用什么方式创建的，构建源都可以更换为源码或者镜像，提升了组件构建的灵活性

这里使用应用商店安装的组件作为模版，把构建源更换为源码构建

### 使用流程

进入组件构建源，当前应用创建方式为云应用商店
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/build_source_appstore.png" title="构建源为云应用商店"/>

点击更改，选择源码，填写仓库地址和代码版本
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/build_source_code.png" title="更换源码构建"/>

更换过之后构建源信息会更新，这里需要重新检测语言
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/check_language.png" title="重新检测语言"/>


检测完之后重新点击构建
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/deploy.png" title="构建"/>

作为应用市场安装的应用，是可以升级版本的
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/upgrade.png" title="升级选项"/>

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/upgrade_service.png" title="升级"/>

更换过构建源的组件，如果选择升级的话，高版本会覆盖我们所更换过的组件；可以选择其他需要的组件进行升级

如果想要使用高版本的组件，可以安装到新的应用下使用

这里jar-t组件我们已经更换了构建源，可以只选择选择升级mysql

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/choose_upgrade_service.png" title="选择升级组件"/>

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/upgrade_result.png" title="升级结果"/>

这样jar-t组件还是基于源码构建的，mysql是通过升级安装的

