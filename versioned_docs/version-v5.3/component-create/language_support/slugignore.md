---
title: .slugignore文件
description: 讲解.slugignore文件的用法和作用
hidden: false
aliases: 
- /docs/user-manual/component-create/language-support/etc/slugignore/
---

### .slugignore文件作用介绍

`.slugignore` 与大家知道的[.gitignore](https://git-scm.com/docs/gitignore)文件一样，具有在打包阶段忽略某些文件的作用。我们在使用Rainbond进行源码构建打包时或许会有这样一个需求，我不想将源代码打包到最终的软件包中，但是Rainbond需要根据你的定义确定哪些文件是你不想要的。因此就有了`.slugignore` 文件。

### .slugignore文件定义方式

* 文件位置与命名

文件名称必须为`.slugignore`，且必须放置于源代码主目录中。

* 文件内容规范

与`.gitignore`规范一致，需要忽略的文件将其路径定义到文件中，每行一个，支持通配符。

示例：

```
src/main/java/com/*
src/test
```


