---
title: 2. Deploy a Java service from source
description: One-click build and deploy business components from source code
---

### Purpose

Learn how to quickly build and deploy your own business source code to Rainbond through the documentation.The whole process does not need to modify the code, and does not need to make an image.整个过程不需要修改代码，不需要制作镜像。

### significance

创建服务组件，是使用 Rainbond 的开始。Creating service components is the beginning of using Rainbond.Rainbond supports the creation of service components in a variety of ways, and deploys from source code without changing the user's code.It is a non-intrusive construction method, users do not need to learn container technology to make images, which lowers the threshold for using Rainbond.是一种无侵入的构建方式，用户不必学习容器技术来制作镜像，降低了使用 Rainbond 的门槛。

### Preconditions

- Complete [team management and multi-tenancy](/docs/use-manual/get-start/team-management-and-multi-tenancy/).Finish creating the first team.完成第一个团队的创建。

- 一份托管于代码仓库（Git、Svn）的源代码。在文档的示例中，以一份基于 Maven 构建的 Java 语言代码为例。A source code hosted in a code repository (Git, Svn).In the documentation's example, a Maven-based build of Java language code is used as an example.[source address](https://gitee.com/rainbond/java-maven-demo)

### Create service components

- Under the specified team page, click **to add**,**to create a component based on source code**.

- On the **custom source code** interface, select an existing application or **create a new application**.

- In **custom source code** interface, enter **component name**,**warehouse address**,**code branch**.

- If you need to specify a user name, password, or the required code is located in a subdirectory in the repository, you can also set it on this page.

- **confirm creation**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-app-from-source/build-from-source-1.png" title="创建服务组件" width="100%" />

### Code language recognition

Rainbond will automatically pull the corresponding code and perform corresponding code detection.The user can preliminarily judge whether the process is working normally according to the test results.用户可以根据检测的结果，初步判断这个流程工作是否正常。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-app-from-source/build-from-source-2.png" title="代码识别" width="100%" />

### start building

点击 **创建** 即可进入构建阶段。Click **to create** to enter the build phase.If you need to define the **build source settings of the current service component before building (for different languages, the build source optional settings are different, for the Java language, it will include build commands, mirror private server addresses, etc.)**,**Ports**,**Environment variables**,**Persistence**,**Allocate memory** and other configurations, then click **Advanced settings**.

Once the build starts, users can click to view the build log, understand the build process according to the log, and troubleshoot errors if the build fails.In general, projects that users can build locally can be built normally in Rainbond. If you encounter problems, please feel free to contact Haoyu Technology's technical staff for help.一般情况下，用户本地可以构建的项目，在 Rainbond 都可以正常构建，如果遇到问题，请随时联系好雨科技技术人员寻求帮助。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-app-from-source/build-from-source-3.png" title="构建日志输出" width="100%" />

After the build is complete, the service component will automatically start and provide services.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-app-from-source/build-from-source-4.png" title="启动完成" width="100%" />

### Next step

- Try deploying your own source code on Rainbond.

- In the next document, we will explore deploying an application based on Rainbond's unique shared library mechanism.
