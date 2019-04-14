---
title: "应用问题排查FAQ"
weight: 1702
chapter: true
---

{{% notice note %}}
当安装使用 Rainbond 遇到问题时，请先参考本篇文档快速索引部分。如果问题未解决，请按要求收集必要的信息通过[社区(用户帮助)](https://t.goodrain.com/)或者[Github](https://github.com/goodrain) 提供给Rainbond开发者。尽可能提供具体信息，方便排查问题。

```yaml
# 参考模板
1. 集群是否正常（grctl node list）
2. 应用是否正常  (grctl service get <应用概览url>)
3. 应用监听端口是否正确，是否开启了健康检测，持久化目录是否设置正确
4. 应用构建失败报错
5. 应用日志是否有明显报错
6. rbd-repo服务是否正常
```
{{% /notice %}}

#### 使用指南

1. [源码构建失败提示gzip stdin not in gzip format](/user-operations/op-guide/code_build_failure_download_gzip/)