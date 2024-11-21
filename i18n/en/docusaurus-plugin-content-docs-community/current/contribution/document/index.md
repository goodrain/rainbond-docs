---
title: Contribute documentation
description: Rainbond Documentation Contributions
---

## Rainbond Documentation Contribution Guidelines

Rainbond documentation, including all documentation for Rainbond 5.x

This website uses the ~~Hugo Framework~~ [Docusaurus 2](https://docusaurus.io/) Documentation Framework.

## How to develop?

### Prepare

Make sure your development environment has the following software：

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) \>= 14 (with NPM)
- [Yarn](https://yarnpkg.com/en/docs/install) \>= 1.5

### Install

If yarn install is slow, you can try configuring Taobao Registry.

```
$ yarn config set registry https://registry.npm.taobao.org
```

Install initialization

```bash
$ git clone https://github.com/goodrain/rainbond-docs.git
$ cd rainbond-docs
$ yarn install
```

### local start

```bash
$yarn start
```

will automatically open http://localhost:3000/ in your browser

### Local production test starts

Use the following command to simulate a production test launch locally

```bash
$yarn serve --build
```

## Participate and contribute

The old version of the documentation is no longer maintained, only the Current version is maintained.

Fork the [Rainbond-docs](https://github.com/goodrain/rainbond-docs.git) repository to your own repository, modify the document and submit it to your own repository, submit a Pull Request to [Rainbond-docs](https://github.com/goodrain/rainbond-docs.git)

### Content requirements

Rainbond Chinese documents are divided into **Conceptual Documents**\*\* **Operate Guidance Documents** and **Best Practice Documents** different document types.The documents in Rainbond are divided into **conceptual documents** **operational guidance documents** and **best practice documents** different document types.When writing a document, please specify the type of document, and determine the content of the article according to the effect that different types need to achieve.

### Typesetting requirements

- Chinese and English must be separated by spaces, and they can also be wrapped in backticks \`\`

  For example：I deploy xxx on Rainbond, I deploy xxx on `Rainbond`

- The word Rainbond appears in the document, and the R must be uppercase.

- The title is preferably 1 2 3 4, and the fifth or sixth title should be avoided as much as possible. If there is too much content, it can be added.

- The name of the title should be clear at a glance

- The imported image format is as follows

  ```html
  ![API架构](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/images/api.png)

  <!-- also works -->
  <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/images/api.png" width="100%" title="API架构" />
  ```

- The citation format for the link is as follows

  1. Refer to other documents in the document to use relative paths, refer to [docusaurus document](https://docusaurus.io/zh-CN/docs/markdown-features/assets)
  2. Referring to external links must include http or https

  ```html
  [Rainbond](https://www.rainbond.com)

  <!-- also works -->
  <a href="https://www.rainbond.com" target="_blank" />
  ```

- The imported video formats are as follows

  ```html
  import Bvideo from @site/src/components/Bvideo";
  <Bvideo src="//player.bilibili.com/player.html?aid=550933549&bvid=BV1Vq4y1w7FQ&cid=492223110&page=1"/>
  ```

- Use of Code Blocks Reference [Docusaurus Code Block](https://docusaurus.io/zh-CN/docs/markdown-features/code-blocks)

- Documents contain "Instructions to users" to use [Docusaurus Notice](https://docusaurus.io/zh-CN/docs/markdown-features/admonitions)

### Add MD file

If you need to add new files, add them to the corresponding directory in the `docs/` directory, and fill in the new file names in `sidebars.js` in order, please refer to [Docusaurus Sidebar](https://docusaurus.io/zh-CN/docs/sidebar).
