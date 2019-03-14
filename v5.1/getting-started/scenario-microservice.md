---
title: 各类微服务架构落地
summary: 各类微服务架构落地
toc: false
toc_not_nested: true
asciicast: true
---

以Rainbond作为微服务管理平台，可帮助企业快速完成从传统应用架构向微服务架构的转型，享受微服务架构带来的种种优势。Rainbond支持部署[Spring Cloud](https://github。com/cloudframeworks-springcloud/user-guide-springcloud)、[api gateway](https://github。com/cloudframeworks-apigateway/user-guide-apigateway)等微服务框架，同时借助好雨微服务架构强大的应用插件体系，无侵入原生提供服务治理、服务注册与发现、服务升级、服务监控、服务伸缩等功能。

## 谈谈微服务架构落地
目前，基于Spring Cloud构建微服务的企业有很多，Spring Cloud基于Spring Boot, 由众多的子项目组成。 例如Spring Cloud Config是一个中心化的配置管理服务, 用来解决微服务环境下配置文件分散管理的难题, Spring Cloud Stream是一个消息中间件抽象层, 目前支持Redis, Rabbit MQ和Kafka, Spring Cloud Netflix整合了Netflix OSS, 可以直接在项目中使用Netflix OSS。 目前Spring Cloud的子项目有接近20个, 如果要使用Spring Cloud, 务必先将子项目都了解一遍, 得知道哪些功能Spring Cloud已经提供了, 避免团队花费大量时间重复造轮子。

Spring Cloud是伴随着微服务的概念诞生的。 毫无疑问, 微服务真正落地是一项艰巨的任务。 不但是技术的变革, 也是开发方式的转变。 仅仅依靠Dubbo或Spring Cloud开发几个互相调用的服务不能算做是微服务。 一个合格的微服务系统必然包括从设计(从业务层面划分服务, 独立数据库), 到开发(选用合适的架构和工具, 解决CAP问题), 到测试(持续集成, 自动化测试), 到运维(容器化, 服务监控, 服务容错)的一系列解决方案。

## Rainbond扮演角色
Rainbond的微服务架构设计基于ServiceMesh，初期以sidebar形式对应用所依赖的应用进行4层透明本地网络代理，屏蔽了应用的IP变化问题，而Rainbond本身并不处理通信协议，完整的微服务功能由框架完成，因此Rainbond可以原生部署Spring Cloud、api gateway等第三方微服务框架。

目前Rainbond正在构建应用插件体系，对sidebar模式进行进一步的封装，为应用通信和治理创造更大的扩展空间。其中计划在近期增加的以envoy为基础的7层网络治理插件，将用来向原生的熔断、限流、金丝雀部署等高级治理提供支持。

应用插件体系结合已有Rainbond APP Runtime提供的服务伸缩、服务注册和发现、自定义资源注册和发现等功能，将可以原生提供可扩展的微服务运行环境，开发者也无需再学习第三方微服务框架复杂的技术实现。

<img src="http://oe5ahutux.bkt.clouddn.com/20171208151271258220330.png" width="100%"/>
*图：Rainbond部署Spring Cloud微服务框架拓扑图*


