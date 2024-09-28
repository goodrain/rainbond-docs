---
title: Use online knowledge base system zyplayer-doc on Rainbond
description: zyplayer-doc is a knowledge base management tool for businesses and individuals, providing online knowledge base management functionality, designed specifically for privatization deployment, and ensuring data security for businesses or individuals
slug: zyplayer-doc
image: https://static.goodrain.com/wechat/zyplayer-doc/zyplayer-doc.png
---

[zyplayer-doc](http://doc.zyplayer.com/doc-wiki#/integrate/zyplayer-doc) is a business-and personal-friendly WIKI knowledge base management tool that provides online knowledge base management functionality, designed specifically for privatization-deployed, to the greatest extent possible to ensure data security for businesses or individuals and can be deployed in a fully Intranet way.

It can also be used as a descriptive file for business products, supporting a single click to open the entire space content to the Internet, and providing options for open document style in different styles to save you from customizing the development of a system for product description.

This paper will describe two ways in which the zyplayer-doc online knowledge base system is deployed, using Rainbond open source stores and using source code.

## Deploying zyplayer-doc

### Install Rainbond

[Rainbond](https://www.rainbond.com/) is a cloud native application management platform that uses simple and does not require knowledge of containers, Kubernetes and substrate complex technologies, supports managing multiple Kubernetes clusters and manages enterprises applying life cycles.The main functions include the application development environment, the application market, the micro-service architecture, the application delivery, the application workload, and the application of cloud management.

You can quickly install Rainbod with a command.

```bash
curl -o install.sh https://get.rainbond.com && cash ./install.sh
```

### Deploy zyplayer-doc through the app store

`zyplayer-doc` has been posted to the Rainbond Open Source Store where users can install `zyplayer-doc` via the Open Source Store key.

Search for `zyplayer-doc` and install it in the **Platform Manager -> Marketplace -> Open Source Store**.

![](https://static.goodrain.com/wechat/zyplayer-doc/1.png)

The sketch after deployment is completed is as follows.

![](https://static.goodrain.com/wechat/zyplayer-doc/2.png)

Access to `zyplayer-doc` is available through the domain name provided by Rainbond by default. Access requires suffix `/zyplayer-doc/`, e.g.：`http://xxx.cn/zyplayer-doc/`, default user password**zyplayer/123456**.

![](https://static.goodrain.com/wechat/zyplayer-doc/3.png)

### Deploy zyplayer-doc via source

zyplayer-doc is a SpringBoot project written by Java, Rainbond can package blocks for Java projects by identifying the project's pom.xml file and build and deploy to achieve a one-click experience.

#### MySQL deployment

MySQL is required for zyplayer-doc using MySQL and can be rapidly deployed through Rainbond Open Source Store.

Search for `mysql` and install it in the **Platform Manager -> Marketplace -> Open Source AppStore** of Rainbond, opting to install version `5.7` or `8.0`.

![](https://static.goodrain.com/wechat/zyplayer-doc/4.png)

#### Zyplayer-doc source deployment

Modify the `zyplayer-doc-manage/src/main/resources/application.yml` configuration file, connection information can be viewed in MySQL components.

```yaml
zyplayer:
  doc:
    manage:
      datasource:
        driverClassName: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&autoReconnect=true&useSSL=false
        username: ${MYSQL_USER}
        password: ${MYSQL_PASSWORD}
```

Go to team/app, choose to create components by source code.

- The name of the component, the name of the component in English is all customized.
- Warehouse address：https://gitee.com/droma/zyplayer-doc
- Code branch：master

![](https://static.goodrain.com/wechat/zyplayer-doc/5.png)

Rainbond will then detect for multi-module items, select `zyplayer-doc-manage` and build, others are dependencies and are not running.

![](https://static.goodrain.com/wechat/zyplayer-doc/6.png)

#### Organization Services

In the app -> Switch to Array Mode, rely on MySQL components so that MySQL components can inject their own environment variables into zyplayer, and zyplayer components can connect to MySQL databases by environmental variables in the configuration file.

![](https://static.goodrain.com/wechat/zyplayer-doc/7.png)

Then update the zyplayer component.

Finally access `zyplayer-doc` via the domain name provided by Rainbond default. Access requires suffix `/zyplayer-doc/`, e.g.：`http://xxx.cn/zyplayer-doc/`,default user password**zyplayer/123456**.
