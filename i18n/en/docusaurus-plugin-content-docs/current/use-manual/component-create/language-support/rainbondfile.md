---
title: The rainbondfile source code defines the environment configuration file
description: Explain the usage of rainbondfile file
---

## rainbondfile introduction

rainbondfile is Rainbond's code-based strategy for specifying the environment in which a service will run.It is an ordinary text file in yaml format, which needs to be placed in the root directory of the code, which is suitable for all service types built based on source code.Currently rainbondfile supports defining `environment variables` `ports` `persistent storage` `startup commands` four items.During the process of creating a component, Rainbond will automatically set the content defined in it to the service properties, which can be viewed in the Rainbond console. The complete use case is as follows：其本身是一个普通的 yaml 格式的文本文件，需要将其放到代码的根目录中，其适用于所有基于源码构建的服务类型。目前 rainbondfile 支持定义 `环境变量` `端口` `持久化存储` `启动命令` 四个项目。Rainbond 在创建组件的过程中将识别其中定义的内容自动设置到服务属性中，在 Rainbond 控制台可以查阅。
完整用例如下：

```bash
language: Java-maven
buildpath: target/
ports:
 - port: 8080
   protocol: http
  #If you need to open multiple ports, continue to add ports and specify protocol
 - port: 5000
   protocol: tcp
envs:
  ENV_KEY1: ENV_VALUE1
  ENV_KEY2: ENV_VALUE2
# Applicable to Dockerfile, NetCore source type
cmd: java -jar xxxx.jar
```

## rainbondfile role

源码定义环境是 Rainbond 推荐的服务管理策略。The source code definition environment is the service management strategy recommended by Rainbond.Through the definition of rainbondfile, service attributes such as environment variables can be easily added in batches, and configurable attributes will be gradually added in subsequent versions.

## Description of supported configuration items

- language source type
- ports service port list
- envs List of service environment variables
- Useful when the main directory of the buildpath service is not in the current directory, specify the address of the secondary directory
- cmd specifies the service running mode, which is suitable for Dockerfile and NetCore source code types, and other languages specify the running mode through [Procfile](./procfile)
