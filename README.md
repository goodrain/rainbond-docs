# Rainbond 文档

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

### 构建

```bash
$ yarn build
```



## 参与贡献

欢迎提交 Pull Request，参考 [Docusaurus 2](https://docusaurus.io/) Markdown语法格式。
