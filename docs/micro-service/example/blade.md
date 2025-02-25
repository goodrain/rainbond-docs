---
title: 部署 Spring Cloud Blade
description: 本章文档介绍在 Rainbond 上部署 Spring Cloud Blade
keywords:
- Spring Cloud Blade 部署
- 微服务部署示例
---

## 关于 Spring Cloud Blade

* 采用前后端分离的模式，前端开源两个框架：[Sword](https://gitee.com/smallc/Sword) (基于 React、Ant Design)、[Saber](https://gitee.com/smallc/Saber) (基于 Vue、Element-UI)
* 后端采用SpringCloud全家桶，并同时对其基础组件做了高度的封装，单独开源出一个框架：[BladeTool](https://gitee.com/smallc/blade-tool)
* [BladeTool](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fchillzhuang%2Fblade-tool)已推送至Maven中央库，直接引入即可，减少了工程的臃肿，也可更注重于业务开发
* 集成Sentinel从流量控制、熔断降级、系统负载等多个维度保护服务的稳定性。
* 注册中心、配置中心选型Nacos，为工程瘦身的同时加强各模块之间的联动。
* 极简封装了多租户底层，用更少的代码换来拓展性更强的SaaS多租户系统。
* 借鉴OAuth2，实现了多终端认证系统，可控制子系统的token权限互相隔离。
* 借鉴Security，封装了Secure模块，采用JWT做Token认证，可拓展集成Redis等细颗粒度控制方案。
* 项目分包明确，规范微服务的开发模式，使包与包之间的分工清晰。

### 模块说明

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

## 通过源码部署 Spring Cloud Blade

本文档教程基于 [Spring Cloud Blade v3.5.0](https://gitee.com/smallc/SpringBlade/tree/v3.5.0/) 版本部署

### 一、部署 Nacos

通过开源应用商店部署 `Nacos`，在开源应用商店中搜索 `Nacos单机` 并选择安装 `2.1.2` 版本。

### 二、部署 Redis

通过开源应用商店部署 `Redis`，在开源应用商店中搜索 `Redis` 并选择安装 `5.0.7` 版本。

### 三、部署 Sentinel Dashboard

通过开源应用商店部署 `Sentinel Dashboard`，在开源应用商店中搜索 `Sentinel-Dashboard` 并选择安装 `1.8.6` 版本。

### 四、初始化数据库

从开源应用商店安装的 `Nacos` 自带了 `Mysql` 组件，进入该组件中 -> 端口 -> 打开对外服务，通过客户端工具连接。

1. 创建 `blade` 数据库。
2. 初始化表结构和数据：[Blade SQL](https://gitee.com/smallc/SpringBlade/blob/v3.5.0/doc/sql/blade/blade-saber-mysql.sql)

### 五、部署 Blade 后端服务

1. **基于源码创建组件，填写以下信息：**

|              | 内容                                 |
| ------------ | ------------------------------------ |
| 组件名称     | 自定义                               |
| 组件英文名称 | 自定义                               |
| 仓库地址     | `https://gitee.com/zhangbigqi/SpringBlade` |
| 代码分支 | master                      |

2. **检测出多模块构建，进入多模块构建页面**  

:::tip
1. 创建前，在多模块构建页面 -> 右侧修改按钮 -> 修改每个模块的启动命令，如下。
2. 创建后，删除每个组件的默认端口，为每个组件添加对应的新端口和端口别名并打开端口的对内服务，如下。
3. 修改完成后构建组件。
:::

| 组件                   | 端口 | 启动命令 |
| ---------------------- | ---- | ---- |
| blade-auth | 8100 | `web: java $JAVA_OPTS -jar blade-auth/target/blade-auth.jar` |
| blade-gateway | 80 | `web: java $JAVA_OPTS -jar blade-gateway/target/blade-gateway.jar` |
| blade-admin | 7002 | `web: java $JAVA_OPTS -jar blade-ops/blade-admin/target/blade-admin.jar` |
| blade-develop | 7007 | `web: java $JAVA_OPTS -jar blade-ops/blade-develop/target/blade-develop.jar` |
| blade-report | 8108 | `web: java $JAVA_OPTS -jar blade-ops/blade-report/target/blade-report.jar` |
| blade-resource | 8010 | `web: java $JAVA_OPTS -jar blade-ops/blade-resource/target/blade-resource.jar` |
| blade-swagger | 18000 | `web: java $JAVA_OPTS -jar blade-ops/blade-swagger/target/blade-swagger.jar` |
| blade-desk | 8105 | `web: java $JAVA_OPTS -jar blade-service/blade-desk/target/blade-desk.jar` |
| blade-log | 8103 | `web: java $JAVA_OPTS -jar blade-service/blade-log/target/blade-log.jar` |
| blade-system | 8106 | `web: java $JAVA_OPTS -jar blade-service/blade-system/target/blade-system.jar` |
| blade-user | 8102 | `web: java $JAVA_OPTS -jar blade-service/blade-user/target/blade-user.jar` |

3. **编辑依赖关系，切换到 `编排模式` 拖动组件进行依赖关系建立。**

![](https://static.goodrain.com/docs/5.10/micro-service/example/blade/blade-depend.png)

4. 进入 `Nacos` 组件内 -> 端口 -> 打开 `8848` 端口的对外服务，访问 Nacos 并登录，默认用户密码 `nacos/nacos`，创建以下配置文件。

<details>
  <summary>
    创建 <b>blade.yaml</b> 配置文件
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
    创建 <b>blade-dev.yaml</b> 配置文件
  </summary>
  <div>

```yaml title="blade-dev.yaml"
#spring配置
spring:
  redis:
    ##redis 单机环境配置
    host: ${REDIS_HOST}
    port: 6379
    password:
    database: 0
    ssl: false

#项目模块集中配置
blade:
  #通用开发生产环境数据库地址(特殊情况可在对应的子工程里配置覆盖)
  datasource:
    dev:
      url: jdbc:mysql://${MYSQL_HOST}:3306/blade?useSSL=false&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&transformedBitIsBoolean=true&tinyInt1isBit=false&allowMultiQueries=true&serverTimezone=GMT%2B8
      username: root
      password: root
```

</div>
</details>

:::info
更新或重启除 `Nacos` `Mysql` `Redis` `Sentinel Dashboard` 之外的所有组件。
:::

### 六、部署 Blade 前端 Saber

1. 基于源码创建组件，填写以下信息：

|              | 内容                                 |
| ------------ | ------------------------------------ |
| 组件名称     | 自定义                               |
| 组件英文名称 | 自定义                               |
| 仓库地址     | `https://gitee.com/zhangbigqi/Saber.git` |
| 代码版本     | v3.5.0                        |


:::caution
这里使用了我的仓库地址，修改了 Nginx 配置。
:::

2. 进入 `Saber` 组件内 -> 端口 -> 删除默认端口，新增 `8080` 端口并打开对外服务。
3. 编辑依赖关系，切换到 `编排模式` 拖动组件进行依赖关系建立，将 `Saber` 依赖 `blade-gateway` 并更新组件。
4. 使用默认域名访问 `Saber UI` 并登录。

### 最终部署拓扑图

![](https://static.goodrain.com/docs/5.10/micro-service/example/blade/blade-topology.png)