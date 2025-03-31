---
title: Document Contribution Guide
description: This document describes how to contribute to the Rainbond documentation project.
---

## Rainbond Documentation Contribution Guide

Rainbond documentation uses the [Docusaurus 2](https://docusaurus.io/) documentation framework.

## How to develop?

### Preparation

Ensure your development environment has the following software:

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) \>= 14 (with NPM)
- [Yarn](https://yarnpkg.com/en/docs/install) \>= 1.5

### Installation

Clone the documentation project code

```bash
git clone https://github.com/goodrain/rainbond-docs.git
```

If yarn install is slow, you can try configuring the Taobao Registry.

```
yarn config set registry https://registry.npm.taobao.org
```

Installation initialization

```bash
cd rainbond-docs
yarn install
```

### Local startup

```bash
yarn start
```

Will automatically open http://localhost:3000/ in the browser

### Local production test startup

Use the following command to simulate a production test startup locally

```bash
yarn serve --build .
```

## Contribute

Fork the [Rainbond-docs](https://github.com/goodrain/rainbond-docs.git) repository to your own repository, modify the documentation and submit it to your own repository, submit a Pull Request to [Rainbond-docs](https://github.com/goodrain/rainbond-docs.git)

### Content requirements

Rainbond documentation is divided into **conceptual documentation**, **operational guidance documentation**, and **best practice documentation** different types of documentation.When writing documentation, please clarify the type of documentation, and determine the content of the article based on the effects that need to be achieved for different types.

### Typesetting requirements

- There should be spaces between Chinese and English, or you can use backticks to wrap them \`\`

  For example: I deploy xxx on Rainbond, I deploy xxx on `Rainbond`

- In the documentation, the word Rainbond must have a capital R.

- Headings are preferably level 1, 2, 3, or 4. Level 5 and 6 headings should be avoided if possible, but can be added if there is too much content.

- The naming of headings should be clear at a glance

- The format for introducing images is as follows

    ![API Architecture](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/images/api.png)
    
    <!-- You can also use  -->
    <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/images/api.png" width="100%" title="API Architecture" />

- The format for referencing links is as follows

  1. Referencing other documents within the documentation should use relative paths, refer to [docusaurus documentation](https://docusaurus.io/zh-CN/docs/markdown-features/assets)
  2. Referencing external links must include http or https

    [Rainbond](https://www.rainbond.com)
    
    <!-- You can also use  -->
    <a href="https://www.rainbond.com" target="_blank" />

- The format for introducing videos is as follows
```html
    import Bvideo from "@site/src/components/Bvideo";
    <Bvideo src="//player.bilibili.com/player.html?aid=550933549&bvid=BV1Vq4y1w7FQ&cid=492223110&page=1"/>
```
- For the use of code blocks, refer to [Docusaurus code blocks](https://docusaurus.io/zh-CN/docs/markdown-features/code-blocks)

- If there is "User Notice" in the documentation, use [Docusaurus admonitions](https://docusaurus.io/zh-CN/docs/markdown-features/admonitions)

### Add new MD file

If you need to add a new file, add it to the corresponding directory under the `docs/` directory, and fill in the name of the new file in order in `sidebars.js`, refer to [Docusaurus Sidebar](https://docusaurus.io/zh-CN/docs/sidebar).

