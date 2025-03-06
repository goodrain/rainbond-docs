---
title: 参与社区贡献：分享你的插件
description: 本文介绍如何分享你的插件到 Rainbond 开源应用商店，共享插件扩展能力的同时也可以与 Rainbond 社区一起丰富插件市场，插件本身仅包含描述和实现，使其可以被复用。
slug: pluginshare
image: https://static.goodrain.com/wechat/plugin-share/plugin-share.png
---

本文介绍如何分享你的插件到 Rainbond 开源应用商店，共享插件扩展能力的同时也可以与 Rainbond 社区一起丰富插件市场。

由于应用运维特征的实现都具有较大的共性，为了将业务容器与其运维能力解耦，Rainbond 基于 SideCar 模式实现了一种组件下的插件机制。Rainbond 插件可以作为组件运维能力的扩展，插件本身就是一个 Sidecar 容器，它可以用于解决以下问题：

- 在不更改现有业务代码的情况下扩展组件的功能
- 在业务运行前完成一些数据初始化的操作
- 将业务的日志发送到外部服务器用于分析处理
- 拦截清洗业务的流量，用作防火墙
- 监控业务的性能指标等

插件本身仅包含描述和实现，使其可以被复用。必须绑定到组件时才具有运行时状态。在 V5.7.0-release 版本中，Rainbond 支持用户分享自己的插件到开源应用商店中，其他用户都可使用该插件。

<!--truncate-->

## 插件原理

![](https://static.goodrain.com/wechat/plugin-share/1.png)

如上图所示，Rainbond 插件有以下特性：

- 与应用共享网络，网络空间一致使插件可以对组件网络流量进行旁路复制、截断，设置组件本地域名解析等
- 与应用共享存储，插件与组件之间可以通过持久化目录进行文件交换
- 与应用共享环境变量，插件可以通过读取组件的环境变量实现配置信息共享

基于以上特性，我们就可以制作自己的插件，将其与组件一起分享到开源应用商店，供大家使用。

## 插件制作

接下来将以 `Fluentd-ElasticSearch6` 插件为例，介绍插件如何制作。

### 制作 Fluentd ElasticSearch 6 插件

1. 进入到 Rainbond 团队视图 -> 插件 -> 新建插件，创建一般类型插件。
   * 镜像地址：qlucky/fluentd-elasticsearch6:v1.14

![](https://static.goodrain.com/wechat/plugin-share/2.png)

2. 创建插件并点击右上角构建进行插件构建。
3. 给 Fluentd 插件添加配置文件，在插件下方的 `配置文件和共享存储` 新增配置。
   1. 配置文件挂载路径：/fluentd/etc/fluent.conf

```yaml
<source>
  @type tail
  path /var/log/nginx/access.log
  pos_file /var/log/nginx/nginx.access.log.pos
  <parse>
    @type nginx
  </parse>
  tag es.nginx.log
</source>
<match es.nginx.**>
  @type elasticsearch   
  log_level info          
  hosts 127.0.0.1
  port 9200
  user elastic
  password MagicWord
  index_name fluentd.${tag}
  <buffer>
    chunk_limit_size 2M
    queue_limit_length  32
    flush_interval 5s
    retry_max_times 30
  </buffer>
</match>
```

![](https://static.goodrain.com/wechat/plugin-share/3.png)


### 使用 Fluentd 插件

1. 基于镜像创建组件，镜像使用 `nginx:latest`，并且挂载存储`var/log/nginx`。
   * 在组件内挂载存储后，插件也会自定挂载该存储，并可收集到 Nginx 产生的日志。
2. 在 Nginx 组件内 -> 插件 -> 未开通，开通 Fluentd 插件，更新\重启组件即可生效。
3. 基于开源应用商店安装 `Elasticsearch 6.2.4` 
4. 添加依赖，Nginx(已开通插件) 依赖 Elasticsearch，更新\重启 Nginx 组件使依赖生效。
5. 访问 Nginx 组件对外端口，使其产生访问日志。
6. 进入 Kibana -> Management -> Kibana -> Index Patterns，添加 Index，进入 Discover 查看日志信息。

![](https://static.goodrain.com/wechat/plugin-share/4.png)

详细使用教程可参考:point_down:

## 插件分享

> 目前插件只能配合组件进行发布，因此在发布插件时，应用下的业务组件也会发布，但从商店安装插件时，应用不会被安装。所以建议在发布时，选择镜像较小的基础组件绑定该插件进行发布。如：Nginx。我们后续也会持续优化此发布流程。减少不必要的镜像推送。

应用视图 -> 发布 -> 创建新的应用模板 -> 勾选作为插件发布 -> 选择开通了插件的组件进行发布，确认发布即可。

发布完成后请参阅 [应用商店应用上架](https://www.rainbond.com/docs/use-manual/app-store-manage/share-app "应用商店应用上架")，上架后社区的小伙伴都可以安装此插件。

![](https://static.goodrain.com/wechat/plugin-share/5.png)

## 参与社区贡献

通过以上步骤，我们了解了插件如何进行分享，如果小伙伴们有兴趣贡献你的插件，随时可以在应用商店发布。

