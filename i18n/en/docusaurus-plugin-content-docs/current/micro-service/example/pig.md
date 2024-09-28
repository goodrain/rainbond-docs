---
title: Deploy Spring Cloud Pig
description: This chapter describes how to deploy Spring Cloud Pig on Rainbond
keywords:
  - Spring Cloud Pig deployment
  - Microservice deployment examples
---

## About Spring Cloud Pig

- RBAC permission management system based on Spring Cloud 2021, Spring Boot 2.7, OAuth2
- Seal element-plus based on a Data-Drive view that even if no Vue experience is available quickly
- Provides lambda , stream api, webflux production practice

### Module Description

```bash
pig-ui  -- https://gitee.com/log4j/pig-ui

pig -- https://gitee.com/log4j/pig
├── pig-auth -- 授权服务提供[3000]
└── pig-common -- 系统公共模块
     ├── pig-common-bom -- 全局依赖管理控制
     ├── pig-common-core -- 公共工具类核心包
     ├── pig-common-datasource -- 动态数据源包
     ├── pig-common-job -- xxl-job 封装
     ├── pig-common-log -- 日志服务
     ├── pig-common-mybatis -- mybatis 扩展封装
     ├── pig-common-seata -- 分布式事务
     ├── pig-common-security -- 安全工具类
     ├── pig-common-swagger -- 接口文档
     ├── pig-common-feign -- feign 扩展封装
     └── pig-common-xss -- xss 安全封装
├── pig-register -- Nacos Server[8848]
├── pig-gateway -- Spring Cloud Gateway网关[9999]
└── pig-upms -- 通用用户权限管理模块
     └── pig-upms-api -- 通用用户权限管理系统公共api模块
     └── pig-upms-biz -- 通用用户权限管理系统业务处理模块[4000]
└── pig-visual
     └── pig-monitor -- 服务监控 [5001]
     ├── pig-codegen -- 图形化代码生成 [5002]
     ├── pig-sentinel-dashboard -- 流量高可用 [5003]
     └── pig-xxl-job-admin -- 分布式定时任务管理台 [5004]
```

## Deploy Spring Cloud Pig with source code

This document tutorial is based on Spring Cloud Pig [v3.6.2](https://gitee.com/log4j/pig/tree/v3.6.2/)

### I. Mysql deployment

1. Create components based on source code, fill out the following information：

|                        | Content                                                      |
| ---------------------- | ------------------------------------------------------------ |
| Component name         | Custom                                                       |
| Component English Name | Custom                                                       |
| Repository Address     | `https://gitee.com/zhangbigqi/pig.git`                       |
| Subdirectory Path      | db                                                           |
| Code Version           | v.3.6.2-1117 |

:::caution
My repository address is used here because some default configurations have been modified, such as database passwords, storage. If you do not want to change, you can use the original repository address
:::

2. Enter Mysql Component -> Other Settings, modify component deployment type to `stateful service (Statefulset type)`
3. Enter the Mysql component -> port, click the port alias to `MYSQL` and open the end's internal service.

:::info
The above variable names and variable values can be modified according to their own needs.If other components rely on Mysql, the variable in the dependency is injected into the Mysql component, see[通信变量注入](/docs/microservice/service-mesh/connection_env)
:::

:::tip
Build the `MySQL` component after modifying the above configuration
:::

### Deploying Redis

Seek `Redis` from the Open Source Store and install it in the Open Source Store.

### Deployment of the Pig backend service

1. Create components based on source code, fill out the following information：

|                                   | Content                                |
| --------------------------------- | -------------------------------------- |
| Component name                    | Custom                                 |
| Component English Name            | Custom                                 |
| Repository Address                | `https://gitee.com/log4j/pig.git`      |
| Code Version: Tag | v3.6.2 |

2. Multimodule build detected, enter multi-module build page, check the following modules and create them.
   - After creating, delete the default port for each component, add new ports and port aliases for each component and open the end-to-end service, as follows:：

| Component              | Port           | Port Alias                          |
| ---------------------- | -------------- | ----------------------------------- |
| pig-register           | 8848 9848 9849 | Port alias: `NACOS` |
| pig-gateway            | 9999           | Port: `GATEWAY`     |
| pig-auth               | 3000           |                                     |
| pig-upms-biz           | 4000           |                                     |
| pig-codegen            | 5002           |                                     |
| pig-monitor            | 5001           |                                     |
| pig-sentinel-dashboard | 5003           | SENTINEL                            |
| pig-xl-job-admin       | 5004           |                                     |

3. Edit dependence, toggle the `sorting mode` to drag the component to create the dependency.

![](https://static.goodrain.com/docs/5.10/microservice/example/pig/pig-depend.png)

4. Enter the `pig-register` component -> Port -> Open the external service of the `8848` port, access Nacos and login, the default user password `nacos/nacos`, modify the following configuration file content：

```yaml
# 编辑 application-dev.yml
spring:
  cache:
    type: redis
  redis:
    host: ${REDIS_HOST} #修改 redis host
  cloud:
    sentinel:
      eager: true
      transport:
        dashboard: ${SENTINEL_HOST}:${SENTINEL_PORT} # 修改 sentinel host

# 编辑 pig-codegen-dev.yml
spring:
  datasource:
    type: com.zaxxer.hikari.HikariDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: root
    url: jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/pig_codegen?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=Asia/Shanghai&nullCatalogMeansCurrent=true&allowPublicKeyRetrieval=true
    # 修改 mysql host 和 port

# pig-upms-biz-dev.yml
spring:
  datasource:
    type: com.zaxxer.hikari.HikariDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: root
    url: jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/pig?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowMultiQueries=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=Asia/Shanghai&nullCatalogMeansCurrent=true&allowPublicKeyRetrieval=true
    # 修改 mysql host 和 port
```

:::tip
Update all components except Mysql and Redis
:::

### Deployment Pig-UI frontend

4.1 Create component based on source code, fill out the following information：

|                        | Content                                                      |
| ---------------------- | ------------------------------------------------------------ |
| Component name         | Custom                                                       |
| Component English Name | Custom                                                       |
| Repository Address     | `https://gitee.com/zhangbigqi/pig-ui.git`                    |
| Code Version           | v.3.6.2-1117 |

:::caution
My repository address is used here because some default configurations have been modified, such as `nodestatic.json` `web.conf`, see [deployment of Vue, React front end](/docs/use-manual/component-create/language-support/nodejs-static)
:::

4.2 After creating a component, enter the `pig-ui` component -> Build Source -> Source Build Parameter, modify Node version to `16.15.0`, make sure to modify and build components

4.3 Edit dependence, toggle the `layout mode` to drag the component to create the dependency and place `pig-ui` on `pig-gateway`.

4.4 In `pig-ui` **Component -> Environment Configuration -> Add Configuration Files**, add the following Profile：

- Profile name：custom
- Configuration file path：`/app/nginx/conf.d/web.conf`
- The configuration file is as follows:

```conf
server {
    listen 80;

    gzip on;
    gzip_static on;     # 需要http_gzip_static_module 模块
    gzip_min_length 1k;
    gzip_comp_level 4;
    gzip_proxied any;
    gzip_types text/plain text/xml text/css;
    gzip_vary on;
    gzip_http_version   1.0; #兼容多层nginx 反代
    gzip_disable "MSIE [1-6]\.(?!.*SV1)";

    # 打包好的dist目录文件，放置到这个目录下
    root /app/www;

    # 注意维护新增微服务，gateway 路由前缀
    location ~* ^/(code|auth|admin|gen) {
      proxy_pass http://${GATEWAY_HOST}:${GATEWAY_PORT};
      #proxy_set_header Host $http_host;
      proxy_connect_timeout 15s;
      proxy_send_timeout 15s;
      proxy_read_timeout 15s;
      proxy_set_header X-Forwarded-Proto http;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 避免端点安全问题
    if ($request_uri ~ "/actuator"){
        return 403;
    }
}
```

4.5 delete default port, add `80` port and open external service.

4.6 Updates the component and visits `pig-ui` to verify it.

### Final Popup

![](https://static.goodrain.com/docs/5.10/microservice/example/pig/pig-topology.png)
