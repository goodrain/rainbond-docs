---
title: rainbondfile源码定义环境配置文件
description: 讲解rainbondfile文件的用法
---

## rainbondfile 介绍

rainbondfile 是 Rainbond 基于代码指定服务运行环境的策略。其本身是一个普通的 yaml 格式的文本文件，需要将其放到代码的根目录中，其适用于所有基于源码构建的服务类型。目前 rainbondfile 支持定义 `环境变量` `端口` `持久化存储` `启动命令` 四个项目。Rainbond 在创建组件的过程中将识别其中定义的内容自动设置到服务属性中，在 Rainbond 控制台可以查阅。
完整用例如下：

```bash
language: Java-maven
buildpath: target/
ports:
 - port: 8080
   protocol: http
  #如需开启多个端口，则继续添加端口并指定协议
 - port: 5000
   protocol: tcp
envs:
  ENV_KEY1: ENV_VALUE1
  ENV_KEY2: ENV_VALUE2
# 适用于Dockerfile、NetCore源码类型
cmd: java -jar xxxx.jar
```

## rainbondfile 作用

源码定义环境是 Rainbond 推荐的服务管理策略。通过 rainbondfile 的定义可以便捷的批量添加环境变量等服务属性，后续版本将逐步增加可配置的属性。

## 支持的配置项目说明

- language 源码类型
- ports 服务端口列表
- envs 服务环境变量列表
- buildpath 服务主目录不在当前目录时有用，指定二级目录地址
- cmd 指定服务运行方式，适用于 Dockerfile、NetCore 源码类型，其他语言通过 [Procfile](./procfile) 指定运行方式
