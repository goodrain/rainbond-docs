---
title: 贡献文档
description: Rainbond 文档贡献
---

## Rainbond 文档贡献指南

Rainbond 文档，包含 Rainbond 5.x 所有文档

本网站使用了 ~~Hugo框架~~ [Docusaurus 2](https://docusaurus.io/) 文档框架。

## 如何开发？

### 准备

确保您的开发环境有如下软件：

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) \>= 14 (with NPM)
- [Yarn](https://yarnpkg.com/en/docs/install) \>= 1.5

### 安装

如果yarn install的速度很慢，可以尝试配置淘宝Registry。

```
$ yarn config set registry https://registry.npm.taobao.org
```

安装初始化

```bash
$ git clone https://github.com/goodrain/rainbond-docs.git
$ cd rainbond-docs
$ yarn install
```

### 本地启动

```bash
$ yarn start
```

将在浏览器中自动打开http://localhost:3000/

### 本地生产测试启动

使用以下命令在本地模拟生产测试启动

```bash
$ yarn serve --build .
```



## 参与贡献

旧版本文档不再维护，只维护 Current 版。

将 [Rainbond-docs](https://github.com/goodrain/rainbond-docs.git) 仓库 Fork 到自己的仓库，修改文档并提交至自己的仓库，提交  Pull Request 到 [Rainbond-docs](https://github.com/goodrain/rainbond-docs.git)



### 内容要求

Rainbond 中文档分为 **概念性文档** **操作指引性文档** 和 **最佳实践性文档** 不同的文档类型。编写文档请明确文档的类型，根据不同的类型需要达成的效果进行文章内容的确定。



### 排版要求

* 中英文夹杂要有空格区分，也可使用反引号包裹起来 ``

  例如：我在 Rainbond 上部署xxx，我在 `Rainbond` 上部署xxx

* 文档中出现 Rainbond 字样，R 必须是大写。

* 标题最好是 1 2 3 4 级，五六级标题尽量避免，如果内容太多确实需要可以加上。

* 标题的命名要一目了然

* 引入图片格式如下

  ```html
  ![API架构](https://static.goodrain.com/images/5.1/images/api.png)
  
  <!-- 也可以使用  -->
  <img src="https://static.goodrain.com/images/5.1/images/api.png" width="100%" title="API架构" />
  ```

* 链接的引用格式如下

  1. 引用文档内其他文档要使用相对路径，参考 [docusaurus文档](https://docusaurus.io/zh-CN/docs/markdown-features/assets)
  2. 引用外部链接必须要带 http or https

  ```html
  [Rainbond](https://www.rainbond.com)
  
  <!-- 也可以使用  -->
  <a href="https://www.rainbond.com" target="_blank" />
  ```

* 引入视频格式如下

  ```html
  import Bvideo from "@site/src/components/Bvideo";
  <Bvideo src="//player.bilibili.com/player.html?aid=550933549&bvid=BV1Vq4y1w7FQ&cid=492223110&page=1"/>
  ```

* 代码块的使用参考 [Docusaurus 代码块](https://docusaurus.io/zh-CN/docs/markdown-features/code-blocks)

* 文档中如有 "用户须知" 要使用 [Docusaurus 告示](https://docusaurus.io/zh-CN/docs/markdown-features/admonitions)

### 新增MD文件

如果需要新增文件，在 `docs/` 目录下增加至对应的目录内，并在 `sidebars.js` 中按照顺序填写新增的文件名，可参考 [Docusaurus Sidebar](https://docusaurus.io/zh-CN/docs/sidebar)。

