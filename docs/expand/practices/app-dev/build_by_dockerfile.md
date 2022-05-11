---
title: 用 Dockerfile 便捷构建运行组件
weight: 4001
---


**Rainbond平台**支持直接通过**Dockerfile**构建并运行镜像，操作流程简单，方便进行持续迭代。

操作流程分为以下几步：

1. 在**Github**上创建**Dockerfile**项目，[Demo项目](https://github.com/goodrain/dockerfile-demo)

   ![create-repository](https://static.goodrain.com/docs/practice/Dockerfile/create-repository.jpg)

   **Dockerfile**内容

   ```dockerfile
   ARG VERSION=1.15.0
   FROM nginx:${VERSION}-alpine
   
   COPY index.html /usr/share/nginx/html/
   
   VOLUME /data
   EXPOSE 80
   ```

2. 通过**Rainbond平台**的源码构建功能选择项目进行构建

   ![create-demo](https://static.goodrain.com/docs/practice/Dockerfile/create-demo.jpg)

3. 验证镜像运行效果

   ![running](https://static.goodrain.com/docs/practice/Dockerfile/running.jpg)

   ![nginx-page](https://static.goodrain.com/docs/practice/Dockerfile/nginx-page.jpg)

其中有以下几点需要**注意**:

1. **Rainbond平台**进行源码构建时是通过不同类型代码的个性化文件进行语言类型识别的，所以在项目指定目录下必须存在**Dockerfile**文件
2. 构建过程相当于在项目指定目录（默认为/目录）执行`docker build -t image:tag .`操作，所以在**Dockerfile**中使用`COPY`、`ADD`等模块时需要注意相对路径的选择
3. 需要指定镜像的守护进程，如果不指定守护进程在镜像启动命令运行完成后就会自动退出然后重新启动，构建好的组件可能会处于运行异常的状态中

相对于普通**Docker**环境的**优点**：

对于需要不断调整**Dockerfile**的用户来说构建过程更加简单，通过参考[配置组件自动构建部署](/docs/use-manual/component-manage/build-source/auto_build)可以借助**Github**的**Webhook**实现代码修改的同时完成镜像的更新操作。