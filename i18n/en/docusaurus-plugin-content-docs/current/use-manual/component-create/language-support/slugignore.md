---
title: .slugignore file
description: Explain the usage and function of the .slugignore file
---

### Introduction to the role of the .slugignore file

`.slugignore` , like the well known[.gitignore](https://git-scm.com/docs/gitignore)files, has the effect of ignoring certain files during the packaging phase.We may have such a requirement when using Rainbond to build and package the source code. I don't want to package the source code into the final package, but Rainbond needs to determine which files you don't want based on your definition.Hence the`.slugignore` file.我们在使用 Rainbond 进行源码构建打包时或许会有这样一个需求，我不想将源代码打包到最终的软件包中，但是 Rainbond 需要根据你的定义确定哪些文件是你不想要的。Consistent with the\`\`specification, files that need to be ignored have their paths defined into files, one per line, wildcards are supported.

### .slugignore file definition method

- File location and naming

The file name must be`.slugignore`and must be placed in the main source directory.

- file content specification

与`.gitignore`规范一致，需要忽略的文件将其路径定义到文件中，每行一个，支持通配符。

Example：

```
src/main/java/com/*
src/test
```
