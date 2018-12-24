---
title: 基于静态HTML源码创建应用
summary: 基于静态HTML源码创建应用
toc: true
---

## 代码识别

您的代码根目录需要有一个 `index.html` ，云帮会识别为Static(静态网页)语言。您也可以使用如下命令在您代码的根目录创建`index.html`:
{% include copy-clipboard.html %}

```bash
echo '<h1>hello world!</h1>' > index.html
```

## 代码运行

静态代码Rainbond支持以Nginx和Apache中间件运行，通过 `服务管理`-`构建源设置` 设置。

## 示例代码

- [静态Html示例代码](https://github.com/goodrain/static-demo.git)