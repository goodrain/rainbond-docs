---
title: kubelet组件说明
description: "kubelet组件参数说明"
hidden: true
---


### 守护运行方式

> 通过二进制运行,由node生成systemd文件并启动   

kubelet默认配置文件`/opt/rainbond/conf/k8s-worker.yaml` (计算节点)

### 常用参数说明


`ExecStart=/bin/bash -c 'NODE_UUID=959eba4b-6bbe-4ad5-ba0f-ecfad17d378d/opt/rainbond/scripts/kubelet.sh'`
其中NODE_UUID值为当前节点node的uuid


具体参数请参见[k8s官方文档](https://v1-10.docs.kubernetes.io/docs/home/)


