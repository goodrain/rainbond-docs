---
title: .slugignore file
description: Explain the usage and function of the .slugignore file
---

### Introduction to the role of the .slugignore file

`.slugignore` , like the well known[.gitignore](https://git-scm.com/docs/gitignore)files, has the effect of ignoring certain files during the packaging phase.We may have such a requirement when using Rainbond to build and package the source code. I don't want to package the source code into the final package, but Rainbond needs to determine which files you don't want based on your definition.Hence the`.slugignore` file.We may have such a need when using Rainbond to package the source build. I don't want to pack the source code into the final package, but Rainbond needs to determine which files you don't want based on your definition.Consistent with the\`\`specification, files that need to be ignored have their paths defined into files, one per line, wildcards are supported.

### .slugignore file definition method

- File location and naming

The file name must be`.slugignore`and must be placed in the main source directory.

- file content specification

Consistent with the `.gitignore` norm, the file needs to be ignored to define its path to the file, one per line, supporting wildcards.

Example：

```
src/main/java/com/*
src/test
```
