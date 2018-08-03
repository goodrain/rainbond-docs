---
title: Rainbond有哪些特性
summary: Rainbond有哪些特性
toc: true
toc_not_nested: true
asciicast: true
---

## 源代码构建

有别于一般容器云平台，Rainbond不仅可以从镜像或以docker-compose方式构建应用，还支持Java、PHP、Python、Ruby、Node.js、Golang、Scala等主流语言的源代码构建。换句话说，用户不需要理解Docker，也不需要编写Dockerfile，Rainbond将自动识别语言，并将源代码自动构建成应用。与此同时，Rainbond还提供了对于Jenkins等第三方CI/CD的对接支持。

在Rainbond上构建的应用，可搭配Mysql、Redis、Zookeeper等各类数据存储应用，构成一个完整的服务，并可发布到私有应用市场供企业内部共享，或分享到[好雨云市](http://app.goodrain.com/)进行商业销售。

## 微服务架构落地

微服务架构是Rainbond的核心功能之一，在它之上部署的任何应用，本身即是微服务，可按照微服务的方式进行操作。借助好雨微服务架构强大的插件体系，Rainbond无侵入原生提供服务治理、服务注册与发现、服务升级、服务监控、服务伸缩等功能，同时支持各类第三方微服务框架。

同样由好雨开源的最佳实践项目云框架中的[Spring Cloud](https://github.com/cloudframeworks-springcloud/user-guide-springcloud)、[api gateway](https://github.com/cloudframeworks-apigateway/user-guide-apigateway)等微服务架构主题，均可完美运行于Rainbond之上，开发者仅需替换实例中业务代码即可变成自己的微服务架构项目，并通过docker-compose的方式一键部署。

## 混合云多云管理

混合云多云管理是Rainbond的另一项优势功能。在云计算飞速发展的今天，众多厂商提供了丰富的各类型公有云资源，Rainbond通过对应用与资源的解耦，将各类资源（私有云服务器、公有云服务器、网络资源）统一整合成Rainbond数据中心，对各类资源进行自动管理，实现跨区域互联与租户化隔离，用户无需关注服务器即可将应用部署于混合云多云环境。

*更多特性请见[功能列表](https://github.com/goodrain/rainbond-docs/edit/master/v3.6/overview/edition.md)*
