---
title: SonarQube 静态扫描
description: 利用 SonarScanner 静态扫描 Rainbond 上的 Maven 项目
keywords:
- SonarQube 代码静态扫描
- 代码静态扫描
---

对代码进行静态扫描是一种非常常见的代码质量保证手段，这种扫描不仅仅可以检查到代码中的缺陷，应用各种业界最佳实践，也可以检查出安全方面的漏洞，给予项目代码全方位的提升。在各种代码扫描方案之中，SonarQube 最为人熟知，应用最为广泛。各种持续集成方案都有自己的方式融入 SonarQube 进行代码的静态扫描工作。

今天介绍一种基于 SonarScanner 在 Rainbond 源码构建过程中，对 Java Maven 项目进行静态扫描的方法。



## SonarScanner For Maven 简介

使用  SonarScanner for Maven 对 Maven 项目进行代码静态扫描，是 SonarQube 官方推荐的默认扫描器。只需要在 mvn 命令中加入指定的参数，就可以集成该扫描器，并在构建的过程中分析代码漏洞。

示例命令：

```bash
mvn clean verify sonar:sonar -Dsonar.login=myAuthenticationToken
```

在实际执行过程中， `myAuthenticationToken` 会被替代成为 SonarQube 中，某个实际用户自己生成的令牌。



## 融入持续集成链条

了解 SonarScanner for Maven 的工作方式之后，我们就可以尝试将代码扫描这个过程，融入到 Rainbond 的自动化持续集成链条之中。**我们希望最终达成的效果，是在代码提交后自动触发项目的构建，在构建过程中进行代码的扫描分析，并生成相应的报告。**

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-1.png)

整个流程可以概括为如下几个阶段：

1. 开发人员向代码仓库提交代码，触发整个持续集成链条。
2. 代码仓库利用 Webhook 调用 Rainbond 的 Openapi 接口，触发对应的服务组件构建自身。
3. Rainbond 自动构建对应服务组件的同时，触发 SonarScanner 扫描工作，并将扫描结果发送给 SonarQube 服务。
4. SonarQube 服务分析扫描结果，生成代码检测报告。
5. 开发人员读取代码检测报告，获悉改进点。
6. 开发人员根据报告完善代码，并再次提交，回到步骤1，形成持续集成的闭环。

接下来，将会从实际操作的角度出发，基于 Rainbond 一点点实现上述持续集成链条。



### 前提条件

本文中介绍的包括了代码扫描的持续集成链条，都是基于 Rainbond 云原生管理平台实现的。所以需要用户自行准备可用的 Rainbond 环境，该环境需要连接公网，为使用开源应用商店做准备。



### 搭建 SonarQube

除了 Rainbond 云原生应用管理平台，还需要准备代码仓库和 SonarQube 服务。前者我们选择使用 Gitlab ，而 SonarQube 服务则可以直接基于开源应用商店安装。目前开源应用商店提供了 8.9.9 （lts）版本的 SonarQube ，供用户一键安装。

用户只需要在 Rainbond 的应用市场界面选择开源应用商店，搜索 `sonarqube` 即可找到对应的安装入口：

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-2.png)

点击安装，选择好安装位置，即可将 SonarQube 服务以及 Postgresql 数据库一键安装到指定的位置。

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-3.png)

访问 SonarQube 的对外服务端口，即可进入它的登录页面 ，默认的用户名和密码为： `admin / admin` 。



> 如果用户还没有自己的代码仓库，也可以遵循相似的流程，基于开源应用商店安装 Gitlab。



### 生成 AuthenticationToken

在 SonarQube 中，每个用户都可以生成 `AuthenticationToken` 来作为通信令牌，SonarScanner 就是通过这个令牌和 SonarQube 服务通信，验证自己的身份。

在这里，我们为 `Administrator` 用户生成专门用于扫描 Java Maven 项目的 `AuthenticationToken` 。

以 admin 用户登录后，在 **我的账户** 页面切换到 **安全** 选项卡，即可生成 Token。

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-4.png)

复制记录下创建出来的 `AuthenticationToken`  ，它只会出现一次！



### 从 Gitlab 构建 Maven 项目

Rainbond 可以基于 Oauth2.0 与 Gitlab 代码仓库对接，可以非常方便的选择构建 Gitlab 中的项目，并自动配置代码自动构建。

参阅文档：[Rainbond 与 Gitlab 的对接](https://www.rainbond.com/docs/use-manual/enterprise-manage/enterprise-settings/base/oauth2.0/)

我所使用的 Gitlab 中已经存在一份标准的 Java Maven 项目代码。点击基于源码构建组件，选择对接好的 Gitlab，就可以搜索想要部署的项目了。

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-5.png)

创建组件的过程中，可以开启自动构建的开关，相当于配置好了代码推送触发自动构建的开关。

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-6.png)

点击确认创建之后，会完成代码语言的检测，此时进入高级设置，点击左侧的部署属性，我们需要做些高级设置来适配 SonarScanner 。

需要进行的设定包括：声明 SonarQube 服务的地址，对应账户的  `AuthenticationToken` ，以及添加了代码扫描步骤的构建命令。



### 配置 Settings.xml 

SonarScanner 的一般性配置，包括 SonarQube 服务地址，以及  `AuthenticationToken`   都可以配置进 Settings.xml 全局配置，供 Java Maven 项目构建时使用。

Rainbond 在针对 Java Maven 类型的项目进行构建时，提供入口配置全局生效的 Settings.xml 。在高级设置——部署属性中，可以点击 **管理Maven配置** 来编辑默认的 Settings.xml。此处我们已经提供了一份默认的配置，我们需要在 xml 格式下添加以下配置来定义 SonarQube 服务地址，以及  `AuthenticationToken`   。

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      http://maven.apache.org/xsd/settings-1.0.0.xsd">
  <pluginGroups>
    <pluginGroup>org.sonarsource.scanner.maven</pluginGroup>
  </pluginGroups>
  <profiles>
    <profile>
      <id>sonar</id>
      <activation>
        <activeByDefault>true</activeByDefault>
      </activation>
      <properties>
        <sonar.host.url>
          http://9000.grba63fe.duaqtz0k.17f4cc.grapps.cn
        </sonar.host.url>
        <sonar.login>
          c1041c2b4ac2e89d1fe3f5fa5bb5971bc8dc85b7
        </sonar.login>
      </properties>
    </profile>
  </profiles>
</settings>
```

当然，用户也可以新建一份专用的 Settings.xml 配置，在我的环境中，我将这份配置命名为 `sonar-scanner`。全局配置只需要定义一次就可以了。



### 修改构建命令

SonarScanner For Maven 通过在 mvn 命令中加入特定的参数来进行代码扫描。

在 Maven 构建命令 输入框中，修改命令如下：

```bash
clean verify sonar:sonar   -Dsonar.projectName=Maven-demo -Dsonar.projectKey=Maven-demo  install
```

对于每一个不同的项目，需要自定义 ` -Dsonar.projectName` ` -Dsonar.projectKey ` 的值。前者定义了在 SonarQube 服务中，这个项目的名字，后者则定义了项目的唯一 ID。



### 开始首次构建

当前使用的 SonarScanner 要求 JDK 版本高于 1.8 。这里我们选择 OpenJDK 11，因为这个版本是 1.8 之后的另一个长期支持版本。

到现在，部署属性中，构建源信息页面应该体现如下：

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-7.png)

点击确认创建，即可跳转页面，进入第一次构建流程之中。稍等一会，首次构建就会完成，代码会自动被打包并上线，查看构建日志，可以了解构建过程中的分析步骤：

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-8.png)

访问日志中提及的地址，可以在 SonarQube 服务中查看新增的报告。

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-9.png)



### 代码分析报告

开发人员参考 SonarQube 服务提供的报告，可以了解目前代码的问题。SonarQube 报告中会给出业界最佳实践来修复漏洞。以我使用的项目为例，扫描到了 2 个 Bug，和 4 个安全问题。以其中一个 Bug 为例， SonarQube 给出了很详尽的提示，包括合理的代码提示。

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-10.png)



### 更新迭代代码

开发人员根据分析报告，修复代码后，再次提交代码，在代码提交信息中包含关键字，即可自动触发项目的构建以及新一轮的代码扫描。

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-11.png)

Commit Message 中包含的 `@deploy` 是触发自动构建的关键字。有关 Rainbond 自动构建的详细信息，请参考文档 [Rainbond自动构建](https://www.rainbond.com/docs/use-manual/component-manage/build-source/auto_build)

等待项目自动构建完成，再次审查分析报告，来确定 Bug 是否得到了解决。

回顾 Rainbond 中组件的操作记录，会发现手动构建与自动构建之间的区别。

![](https://static.goodrain.com/wechat/sonarqube/sonarqube-workflow-12.png)

