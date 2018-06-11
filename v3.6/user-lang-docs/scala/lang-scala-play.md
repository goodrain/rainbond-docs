---
title: 云帮部署Play框架
summary: 由于Play1.x版本不支持Scala语言，所以云帮支持的Play框架版本是基于Play2.x版本。Scala语言支持已经介绍了如何识别Scala 语言以及Play框架，接下来让我为您介绍Play框架的运行条件。
toc: false
---
<div id="toc"></div>

&emsp;&emsp;由于Play1.x版本不支持Scala语言，所以云帮支持的Play框架版本是基于Play2.x版本。[Scala语言支持](lang-scala-overview.html)已经介绍了如何识别Scala 语言以及Play框架，接下来让我为您介绍Play框架的运行条件。

## 启动

云帮运行play框架时需要执行相关jar包，所以需要您创建`Procfile`文件，并输入以下内容：

{% include copy-clipboard.html %}

```bash
web: target/start $JAVA_OPTS
```

## 代理设置

环境构建过程中需要下载Jar包，考虑到国内环境，我们添加了代理下载jar文件的功能。

### 代理服务

云帮可以通过在  [应用-应用控制台-设置](/docs/stable/user-app-docs/myapps/myapp-platform-settings.html)  中设置 `PROXY=true` 来启用好雨官方提供的代理服务。

<center><img src="https://static.goodrain.com/images/acp/docs/code-docs/lang-scala-play.png" style="border:1px solid #eee;max-width:100%" /></center>

### 添加环境变量

`SBT_EXTRAS_OPTS` 变量来设置，内容如下：

{% include copy-clipboard.html %}

```bash
Dhttp.proxyHost=proxyhostURL -Dhttp.proxyPort=proxyPortNumber 
-Dhttp.proxyUser=someUserName -Dhttp.proxyPassword=somePassword
```

<center><img src="https://static.goodrain.com/images/acp/docs/code-docs/lang-scala-play2.png" style="border:1px solid #eee;max-width:100%" /></center>

{{site.data.alerts.callout_success}}

1. `PROXY` 和 `SBT_EXTRAS_OPTS` 变量都可以提供设置代理功能。
2. `PROXY` 变量在 **公有云/企业版** 设置为true时使用好雨官方提供的代理服务。
3. `PROXY` 变量在社区版中暂时无效，但可以通过设置 `SBT_EXTRAS_OPTS` 变量使用自己的代理服务。

{{site.data.alerts.end}}