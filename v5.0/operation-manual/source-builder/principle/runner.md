---
title: Runner
summary: 
toc: true
---

Runner是一个镜像，运行Builder制作的slug文件，通过Runner可以使应用程序运行。

## 运行流程图

<center><img src="https://static.goodrain.com/images/acp/docs/code-docs/princple-process-runner.png" width="30%" /></center>

> 说明：
>

1. 从管道取出slug文件送入Runner
2. 将slug文件解压
3. 运行应用相关依赖
4. 启动应用