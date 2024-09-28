---
title: Contribute to：share your plugin
description: This paper describes how to share your plugins with Rainbond Open Source Store. Sharing plugin extensions can also enrich the plugin market with the Rainbond community. The plugins themselves only contain descriptions and implementations so that they can be reused.
slug: pluginshare
image: https://static.goodrain.com/wechat/plugin-share/plugin-share.png
---

This paper describes how to share your plugins with Rainbond Open Source Store and can also enrich the plugin market with the Rainbond community.

Because of the greater commonality of the application dimensions and in order to decouple business containers and their viability, Rainbond implemented a plugin mechanism under a component based on SideCar mode.Rainbond plugin can be used as an extension of component viability. The plugin itself is a Sidecar container that can be used to solve the following problems：

- Extend component functions without changing existing business code
- Complete some data initialization actions before business runs
- Send business logs to external servers for analysis processing
- Block the traffic of cleaning operations for firewall
- Performance indicators for monitoring operations, etc.

The plugin itself only contains descriptions and implementations, so that it can be reused.A component must be bound to be running when it is not operational.In V5.7.0-release version, Rainbond supports users to share their plugins in the Open Source Store and can be used by other users.

## Principles of Plugins

![](https://static.goodrain.com/wechat/plugin-share/1.png)

As shown in the graph above, Rainbond plugin has the following characteristics：

- Networking with apps. Consistent with cyberspace allows plugins to replicate, truncate, set component local domain parse etc.
- Shared storage with apps, files can be exchanged between plugins and components through persistent directories
- Share environment variables with apps. Plugin enables configuration information sharing by reading the environmental variables of the component

Based on the above features, we can create our own plugins and share them with components in an open source application store for use.

## Plugin Production

The `Fluentd-ElasticSearch6` plugin will be used as an example of how the plugin is produced.

### Make Fluentd ElasticSearch 6 plugins

1. Go to Rainbond team view -> Plugins -> Create new plugin to create general type plugins.
   - Mirror address：qlucky/fluentd-elasticsearch6:v1.14

![](https://static.goodrain.com/wechat/plugin-share/2.png)

2. Create a plugin and click on the upper right corner to build a plugin.
3. Add configuration file to the Fluentd plugin, add configuration to the `configuration file and shared storage` below the plugin.
   1. Configuration file mount path：/fluentd/etc/fluent.conf

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

### Use Fluentd Plugin

1. Build components based on mirrors, using `nginx:` and mount the `var/log/nginx` storage.
   - When mounting a storage inside a component, the plugin will also mount the store customarily and can collect logs from Nginx.
2. In the Nginx component -> Plugins -> Unenabled, open Fluentd plugin, update\restart component to take effect.
3. Install `Elasticsearch 6.2.4` for open source stores
4. Add dependence, Nginx (plugins opened) depends on Elasticsearch, update\restart the Nginx component to make dependency effective.
5. Visit the Nginx component external port to generate access logs.
6. Enter Kibana -> Management -> Kibana -> Index Patterns, add Index, enter Discover to view log information.

![](https://static.goodrain.com/wechat/plugin-share/4.png)

Learn more about using tutorials :point_down:

## Plugin Share

> The plugin can only be published in conjunction with the component so that when publishing the plugin, the app will also be published, but the app will not be installed when the plugin is installed from the store.So it is recommended that when publishing, select a smaller base component to bind the plugin to publish.e.g.：Nginx.We will continue to optimize this release process as well.Reduce unnecessary mirror push

App View -> Publish -> Create a New Application Template -> Check to Publish as Plugin -> Select as Release -> Select a Component that opens a plugin to publish. Make sure to publish.

See [应用商店应用上架](https://www.rainbond.com/docs/use-manual/app-store-manage/share-app "App Store app" after release and all small partners of the community can install this plugin.

![](https://static.goodrain.com/wechat/plugin-share/5.png)

## Engage in community contributions

With these steps, we know how plugins are shared, and if small partners are interested in contributing your plugin, they can always be posted in the App Store.

If you need help, please contact community members!Contribute to it please check [贡献指南](https://www.rainbond.com/community/contribution/ "Contributing Guide").
