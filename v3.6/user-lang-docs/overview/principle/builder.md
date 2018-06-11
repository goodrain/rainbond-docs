---
title: Builder
summary: 
toc: false
---
&emsp;&emsp;Builder是一个镜像，您所提交的应用源码可以在Builder中进行解压、预编译、编译、打包等。


## 构建流程图

以下展示Builder工作流程，如图：

<center><img src="https://static.goodrain.com/images/acp/docs/code-docs/princple-process-builder.png" width="80%" /></center>

> 说明：

1. 将代码打包并放置在master分支
2. 通过管道将已打包代码传送到builder
3. 通过tar命令将压缩文件解压，解压出源码
4. 将源码预编译：
   - 通过接口获取用户设置的应用环境
   - 把用户配置写入文件procfile
5. 执行detect脚本，识别源码类型
6. 执行compile脚本，编译源码。一般会拉去对应Runtime、framework等
7. 执行release脚本，输出yaml
8. 系统生成后缀为.tgz的slug文件