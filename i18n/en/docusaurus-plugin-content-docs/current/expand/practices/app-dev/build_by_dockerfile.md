---
title: Easily build and run components with Dockerfile
weight: 4001
---


**Rainbond platform**supports building and running images directly through**Dockerfile**, the operation process is simple, and it is convenient for continuous iteration.

The operation process is divided into the following steps：

1. Created**Dockerfile**projects on**Github**,[Demo projects](https://github.com/goodrain/dockerfile-demo)

   ![create-repository](https://static.goodrain.com/docs/practice/Dockerfile/create-repository.jpg)

   **Dockerfile**content

   ```dockerfile
   ARG VERSION=1.15.0
   FROM nginx:${VERSION}-alpine

   COPY index.html /usr/share/nginx/html/

   VOLUME /data
   EXPOSE 80
   ```

2. Select the project to build through the source code build function of the**Rainbond platform**

   ![create-demo](https://static.goodrain.com/docs/practice/Dockerfile/create-demo.jpg)

3. Verify the mirror operation effect

   ![running](https://static.goodrain.com/docs/practice/Dockerfile/running.jpg)

   ![nginx-page](https://static.goodrain.com/docs/practice/Dockerfile/nginx-page.jpg)

Among them, the following points need to be paid to

1. **When Rainbond platform**builds the source code, the language type is identified through the personalized files of different types of codes, so there must be**Dockerfile**files in the specified directory of the project
2. The build process is equivalent to executing`docker build -t image:tag .`in the specified directory of the project (default is / directory), so you need to pay attention to the choice of relative paths when using modules such as`COPY`and`ADD`in**Dockerfile**
3. The daemon process of the mirror needs to be specified. If the daemon process is not specified, it will automatically exit and restart after the mirror startup command is completed, and the built components may be in an abnormal state.

**advantages over normal**Docker**environment**：

For users who need to continuously adjust**Dockerfile**, the build process is simpler. By referring to[to configure components to automatically build and deploy](/docs/use-manual/component-manage/build-source/auto_build), you can use**Github**and**Webhook**to implement code modification and complete image update operations.