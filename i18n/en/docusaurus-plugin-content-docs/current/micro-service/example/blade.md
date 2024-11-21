---
title: Deploy the Spring Cloud Blade
description: This chapter describes how to deploy Spring Cloud Blade on Rainbond
keywords:
  - Spring Cloud Blade Deployment
  - Microservice deployment examples
---

## About Spring Cloud Blade

- In back-to-end separation, front-end open source two frameworks：[Sword](https://gitee.com/smallc/Sword) (based on React, Ant Design),[Saber](https://gitee.com/smallc/Saber) (based on Vue, Element-UI)
- The backend uses the entire bucket of SpringCloud with a high level of encapsulation of its base components, with a separate open-source framework：[BladeTool](https://gitee.com/smallc/blade-tool)
- [BladeTool](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fchillzhuang%2Fblade-tool)已推送至Maven中央库，直接引入即可，减少了工程的臃肿，也可更注重于业务开发
- Integrated Sentinel is stable from multiple dimensions of protection services such as flow control, melting down downgrading, system loads, etc.
- Select Nacos for registration centers, configuration centers, and increase links between modules while running for wasting work.
- There is an extremely short encapsulation of multiple tenants at the bottom and a smaller number of codes is used to expand the more extensive SaaS multi-tenants system.
- Using OAuth2, a multi-terminal authentication system has been implemented that controls the token permissions of the subsystem in isolation.
- Security has been used to encapsulate a security module, using JWT as a token certification, and to expand granular control programmes such as Integrated Redis.
- Project subcontracting is clear, regulating the micro-service development model and clarifying the division of labour between packages and packages.

### Module Description

```bash
SpringBlade
├── blade-auth -- 授权服务提供
├── blade-common -- 常用工具封装包
├── blade-gateway -- Spring Cloud 网关
├── blade-ops -- 运维中心
├    ├── blade-admin -- spring-cloud后台管理
├    ├── blade-develop -- 代码生成
├    ├── blade-resource -- 资源管理
├    ├── blade-seata-order -- seata分布式事务demo
├    ├── blade-seata-storage -- seata分布式事务demo
├── blade-service -- 业务模块
├    ├── blade-desk -- 工作台模块 
├    ├── blade-log -- 日志模块 
├    ├── blade-system -- 系统模块 
├    └── blade-user -- 用户模块 
├── blade-service-api -- 业务模块api封装
├    ├── blade-desk-api -- 工作台api 
├    ├── blade-dict-api -- 字典api 
├    ├── blade-system-api -- 系统api 
└──  └── blade-user-api -- 用户api 
```

## Deploy Spring Cloud Blade with source code

This document tutorial is based on [Spring Cloud Blade v3.5.0](https://gite.com/smallc/SpringBlade/tree/v3.5.0/)

### Deploying Nacos

Use the open source store to deploy `Nacos`, search for `Nacos' in the open source store and choose to install version `2.1.2\`

### Deploying Redis

Use the Open Source Store to deploy `Red`, search for `Redis` in the Open Source Store and choose to install `5.0.7` version.

### Deploying Sentinel Dashboard

Search `Sentinel Dashboard` in the open source store by deploying `Sentinel Dashboard` and install `1.8.6` instead.

### Initialization of database

The `Nacos` installed from the open source store takes the `Mysql` component, entering the component -> Port -> Open External Service through the client tool.

1. Create `blade` database.
2. Initialization table structure and data：[Blade SQL](https://gitee.com/smallc/SpringBlade/blob/v3.5.0/doc/sql/blade/blade-shaber-mysql.sql)

### V. Deployment of Blade backend services

1. **Create components based on source code, fill out the following information：**

|                                   | Content                                |
| --------------------------------- | -------------------------------------- |
| Component name                    | Custom                                 |
| Component English Name            | Custom                                 |
| Repository Address                | `https://gitee.com/smallc/SpringBlade` |
| Code Version: Tag | v3.5.0 |

2. **Detected multiple modules build, enter multi-module build page**

:::tip

1. Before creating, build a multi-block page -> modify button -> right to change the launch command for each module, as follows.
2. After creating, delete the default port for each component, add new ports and port aliases for each component and open the end-to-end service for the port, as follows.
3. Build component after modification.
   :::

| Component      | Port  | Start command                                                                  |
| -------------- | ----- | ------------------------------------------------------------------------------ |
| blade-auth     | 8100  | `web: java $JAVA_OPTS -jar blade-auth/target/blade-auth.jar`                   |
| blade-gateway  | 80    | `web: java $JAVA_OPTS -jar blade-gateway/target/blade-gateway.jar`             |
| blade-admin    | 7002  | `web: java $JAVA_OPTS -jar blade-ops/blade-admin/target/blade-admin.jar`       |
| blade-develop  | 7007  | `web: java $JAVA_OPTS -jar blade-ops/blade-develop/target/blade-develop.jar`   |
| blade-report   | 8108  | `web: java $JAVA_OPTS -jar blade-ops/blade-report/target/blade-report.jar`     |
| blade-resource | 8010  | `web: java $JAVA_OPTS -jar blade-ops/blade-resource/target/blade-resource.jar` |
| blade-swagger  | 18000 | `web: java $JAVA_OPTS -jar blade-ops/blade-swagger/target/blade-swagger.jar`   |
| blade-desk     | 8105  | `web: java $JAVA_OPTS -jar blade-service/blade-desk/target/blade-desk.jar`     |
| blade-log      | 8103  | `web: java $JAVA_OPTS -jar blade-service/blade-log/target/blade-log.jar`       |
| blade-system   | 8106  | `web: java $JAVA_OPTS -jar blade-service/blade-system/target/blade-system.jar` |
| blade-user     | 8102  | `web: java $JAVA_OPTS -jar blade-service/blade-user/target/blade-user.jar`     |

3. **Edit dependence, toggle `Array mode` to create dependency.**

![](https://static.goodrain.com/docs/5.10/microservice/example/blade/blade-depend.png)

4. Enter the `Nacos` component -> Port -> Open External Service at the `8848` port, access Nacos and login, default user password `nacos/nacos`, create the following configuration file.

<details>
  <summary>
    Create <b>blade.yaml</b> Profile
  </summary>
  <div>

```yaml title="blade.yaml"
#服务器配置
server:
  undertow:
    # 以下的配置会影响buffer,这些buffer会用于服务器连接的IO操作,有点类似netty的池化内存管理
    buffer-size: 1024
    # 是否分配的直接内存
    direct-buffers: true
    # 线程配置
    threads:
      # 设置IO线程数, 它主要执行非阻塞的任务,它们会负责多个连接, 默认设置每个CPU核心一个线程
      io: 16
      # 阻塞任务线程池, 当执行类似servlet请求阻塞操作, undertow会从这个线程池中取得线程,它的值设置取决于系统的负载
      worker: 400

#spring配置
spring:
  cloud:
    sentinel:
      eager: true
  devtools:
    restart:
      log-condition-evaluation-delta: false
    livereload:
      port: 23333

#feign配置
feign:
  sentinel:
    enabled: true
  okhttp:
    enabled: true
  httpclient:
    enabled: false

#对外暴露端口
management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    health:
      show-details: always

#knife4j配置
knife4j:
  #启用
  enable: true
  #基础认证
  basic:
    enable: false
    username: blade
    password: blade
  #增强配置
  setting:
    enableSwaggerModels: true
    enableDocumentManage: true
    enableHost: false
    enableHostText: http://localhost
    enableRequestCache: true
    enableFilterMultipartApis: false
    enableFilterMultipartApiMethodType: POST
    language: zh-CN
    enableFooter: false
    enableFooterCustom: true
    footerCustomContent: Copyright © 2022 SpringBlade All Rights Reserved

#swagger配置信息
swagger:
  title: SpringBlade 接口文档系统
  description: SpringBlade 接口文档系统
  version: 3.5.0
  license: Powered By SpringBlade
  licenseUrl: https://bladex.vip
  terms-of-service-url: https://bladex.vip
  contact:
    name: smallchill
    email: smallchill@163.com
    url: https://gitee.com/smallc

#blade配置
blade:
  token:
    sign-key: 请配置32位签名提高安全性
  xss:
    enabled: true
    skip-url:
      - /weixin
  secure:
    skip-url:
      - /test/**
    client:
      - client-id: sword
        path-patterns:
          - /sword/**
      - client-id: saber
        path-patterns:
          - /saber/**
  tenant:
    column: tenant_id
    tables:
      - blade_notice
```

  </div>
</details>

<details>
  <summary>
    Create <b>blade-dev.yaml</b> Profile
  </summary>
  <div>

```yaml title="blade-dev.yaml"
#spring配置
spring:
  redis:
    ##redis 单机环境配置
    host: 127.0.0.1
    port: 6379
    password:
    database: 0
    ssl: false

#项目模块集中配置
blade:
  #通用开发生产环境数据库地址(特殊情况可在对应的子工程里配置覆盖)
  datasource:
    dev:
      url: jdbc:mysql://127.0.0.1:3306/blade?useSSL=false&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&transformedBitIsBoolean=true&tinyInt1isBit=false&allowMultiQueries=true&serverTimezone=GMT%2B8
      username: root
      password: root
```

</div>
</details>

:::info
Update or restart all components other than `Nacos` `Mysql` `Reddis` `Sentinel Dashboard`.
:::

### Deployment of Blade Frontend Saber

1. Create components based on source code, fill out the following information：

|                        | Content                                  |
| ---------------------- | ---------------------------------------- |
| Component name         | Custom                                   |
| Component English Name | Custom                                   |
| Repository Address     | `https://gitee.com/zhangbigqi/Saber.git` |
| Code Version           | v3.5.0   |

:::caution
Here you used my repository address and modified the Nginx configuration.
:::

2. Enter `Saber` component -> Port -> Delete default port, add `8080` port and open external service.
3. Edit dependence, toggle `Array mode` to create a dependency by dragging `Saber` to `blade-gateway` and updating the component.
4. Use the default domain to access `Saber UI` and log in.

### Final deployment topography

![](https://static.goodrain.com/docs/5.10/microservice/example/blade/blade-topology.png)
