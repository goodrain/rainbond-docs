---
title: 创建一个应用
summary: rainbond，创建应用
toc: false
---

<div id="toc"></div>

**应用**是Rainbond可管理的最小服务单元，用户可以将多个应用组成一个复杂的业务系统，这套业务系统可以对外提供服务，也可以分享给其他组织独立部署。

Rainbond支持多种方式创建应用，下图是支持创建应用的方式示意图，你可以选择适合自己的方式快速起步：

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/create-app.png" width="100%" />

## 一、通过源代码创建应用
Rainbond支持[流行的编程语言](create-an-app.html#2-3)源代码直接创建应用，同时也支持Dockerfile创建应用，接下来主要通过2个示例来介绍。

### 1.1 PHP源码创建应用

源代码地址：[https://github.com/goodrain/php-demo.git](https://github.com/goodrain/php-demo.git)

- 点击【创建应用】--【从源码创建】
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/php-demo01.gif" width="100%"/>

- PHP语言的高级设置
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/php-demo02.png" width="100%" />

- 构建应用并访问
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/php-demo03.png" width="100%" />


### 1.2 Dockerfile源码创建应用

源代码地址：[https://github.com/goodrain/dockerfile-demo.git](https://github.com/goodrain/dockerfile-demo.git)

- 点击【创建应用】--【从源码创建】
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/dockerfile-demo.gif" width="100%" />


## 二、通过Docker镜像创建应用
Rainbond可以通过直接拉取Docker官方或者第三方Docker镜像的方式创建应用，但需要注意的是，第三方Docker仓库一定要支持HTTPS协议，否则需要 [修改管理节点docker配置，支持非安全的仓库地址](../operation-manual/manage/add-insecure-registry.html)。除了通过拉取镜像，rainbond还支持`docker run`命令来创建应用，下面通过两个示例介绍创建方法：


### 2.1 通过docker镜像创建应用

- 点击【创建应用】--【从Docker镜像创建应用】--【指定镜像】
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/image-demo01.gif" width='100%' />

### 2.2 通过docker run命令创建应用

使用如下Docker Run命令创建应用，先复制到剪贴板:

{% include copy-clipboard.html %}
```bash
docker run -d --name ghost -p 3001:2368 -v /data:/var/lib/ghost/content ghost:1-alpine
```

- 点击【创建应用】--【从Docker镜像创建应用】--【Docker Run命令】

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/image-demo02.gif" width="100%" />

### 2.3 其他语言源码创建应用

- <a href="language-support/java.html" target="_blank">Java源码创建应用</a>
- <a href="language-support/php.html" target="_blank">PHP源码创建应用</a>
- <a href="language-support/python.html" target="_blank">Python源码创建应用</a>
- <a href="language-support/nodejs.html" target="_blank">Node.js源码创建应用</a>
- <a href="language-support/ruby.html" target="_blank">Ruby源码创建应用</a>
- <a href="language-support/golang.html" target="_blank">Golang源码创建应用</a>
- <a href="language-support/html.html" target="_blank">Html静态源码创建应用</a>
- <a href="language-support/dockerfile.html" target="_blank">Dockerfile源码创建应用</a>

## 三、通过云市创建应用
除了上文介绍的两大类创建应用的方法外，rainbond还提供了应用市场的应用一键部署，应用市场是好雨提供的一项公有云服务，提供了常用的开发应用及工具。下面介绍通过应用市场安装 Wordpress 应用的示例：

- 点击【创建应用】--【从云市安装】

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/appstore-demo.gif" width="100%" />
