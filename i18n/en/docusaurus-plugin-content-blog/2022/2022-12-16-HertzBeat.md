---
title: 简单易用的监控告警系统 | HertzBeat 在 Rainbond 上的使用分享
description: HertzBeat 是一个拥有强大自定义监控能力，无需Agent的实时监控系统。网站监测，PING连通性，端口可用性，数据库，操作系统，中间件，API监控，阈值告警，告警通知
slug: hertzbeat
image: https://static.goodrain.com/wechat/HertzBeat/3.png
---

在现有的监控告警体系中 Prometheus + AlertManger + Grafana 一直是主流，但对于中小团队或个人来说，这种体系显的较为复杂。而 HertzBeat 能让中小团队或个人很快速的搭建监控告警系统，并通过简单的配置实现应用、数据库、操作系统的监控与告警等。

## HertzBeat

[HertzBeat赫兹跳动](https://hertzbeat.com/) 是一个拥有强大自定义监控能力，无需Agent的实时监控系统。网站监测，PING连通性，端口可用性，数据库，操作系统，中间件，API监控，阈值告警，告警通知（邮件微信钉钉飞书）。

## Rainbond

[Rainbond](https://www.rainbond.com) 是一个云原生应用管理平台，使用简单，遵循 **以应用为中心** 的设计理念，统一封装容器、Kubernetes和底层基础设施相关技术，让使用者专注于业务本身, 避免在业务以外技术上花费大量学习和管理精力。

## 快速部署 HertzBeat

HertzBeat 已发布到 Rainbond 开源应用商店，你可以在开源应用商店中搜索 `HertzBeat` 一键安装。

![](https://static.goodrain.com/wechat/HertzBeat/1.png)

安装后，可以通过 Rainbond 默认提供的域名访问 HertzBeat，默认用户密码 `admin/hertzbeat`。

![](https://static.goodrain.com/wechat/HertzBeat/2.png)

## HertzBeat 快速使用

### 仪表盘

![](https://static.goodrain.com/wechat/HertzBeat/3.png)

### 应用服务监控

应用服务监控支持多种方式，如：

| 应用服务监控                        | 说明                                                  |
| ----------------------------- | --------------------------------------------------- |
| PING连通性                       | 检测域名或 IP 的连通性                                       |
| HTTP API                      | 调用HTTP API接口，查看接口是否可用，对其响应时间等指标进行监测，可自定义请求头         |
| JVM 虚拟机                       | 监控 JVM虚拟机的通用性能指标                                    |
| SpringBoot2.0 | 监控 SpringBoot2.0 actuator 暴露的通用性能指标 |
| 全站监控                          | 监控网站的全部页面                                           |
| 端口可用性                         | 监控服务暴露的端口                                           |
| SSL 证书                        | 监控网站 SSL 证书过期时间以及响应时间                               |

![](https://static.goodrain.com/wechat/HertzBeat/4.png)

### 数据库监控

支持监控多种类型数据库，如：MySQL、Redis、PostgreSQL、SqlServer、ElasticSearch、Oracle、MariaDB、OpenGauss、达梦数据库。

![](https://static.goodrain.com/wechat/HertzBeat/5.png)

### 操作系统监控

支持对主流的 Linux 和 Windows 系统进行监控，例如：Centos、Ubuntu、Windows等。

![](https://static.goodrain.com/wechat/HertzBeat/6.png)

### 告警配置

支持自定义告警阀值，告警通知支持 邮箱、WebHook、企业微信机器人、钉钉机器人、飞书机器人。

![](https://static.goodrain.com/wechat/HertzBeat/7.png)

## 最后

HertzBeat 还支持中间件的监控、对容器的监控以及自定义 Prometheus 监控等，小伙伴们可以自行探索。 通过 HertzBeat 让我们用简单的配置即可监控、告警我们的业务，让我们在监控告警这块节省更多时间、成本。
