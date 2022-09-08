---
title: "接入已安装平台集群"
description: "接入已安装平台集群"
weight: 1001
---

此方式适合已经完成Rainbond集群端部署，希望接入控制台进行应用调度管理。

### 前提条件

- 集群端服务器`8443`端口与控制台网络保持畅通；
- 已安装 [grctl命令行工具](/docs/ops-guide/tools/grctl)。

## 安装部署

- 在集群页面选择 `接入已安装平台集群`


<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-by-rainbond/from-rainbond.jpg" title="接入已安装平台集群" width="100%"/>

- 填写集群ID、集群名称及Region Config文件内容

Region Config文件内容获取方式如下：

在已安装[grctl命令行工具](/docs/ops-guide/tools/grctl)的节点上执行以下命令

```bash
grctl config
```

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-by-rainbond/config.jpg" title="添加集群" width="100%"/>


- 完成对接

添加完成后集群处于运行中状态即完成对接，可以进行使用。
 
<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-by-rainbond/direct-docking.jpg" title="对接完成" width="100%"/>



