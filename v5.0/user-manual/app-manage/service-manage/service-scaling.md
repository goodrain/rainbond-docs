---
title: 服务操作
summary: 服务的伸缩操作
toc: true
asciicast: true
---

## 伸缩服务

平台服务有两种伸缩方式：

- 垂直伸缩：增加或减少服务的内存（服务 CPU 与内存是联动的，按照一定的[比例调整](#3-1-cpu)）
- 水平伸缩：增加或减少服务的实例数

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-scaling01.png" width="100%" />

{{site.data.alerts.callout_danger}}

- 垂直伸缩时平台会自动调整资源后重启服务，单节点服务会中断，多节点服务不受影响。
- 水平伸缩时平台通过滚动新增或者下线节点的方式进行操作，因此操作不会影响现有服务。

{{site.data.alerts.end}}

### 1.1 垂直伸缩 CPU 与内存比例关系

| 申请值比例（CPU/内存） | 限制值比例（CPU/内存) |
| ---------------------- | --------------------- |
| 0.24/1                 | 1.28/1                |

{{site.data.alerts.callout_info}}

- Kubernetes 针对 CPU 和内存分为申请值与限制值，详情参见: [管理容器的计算资源](https://kubernetes.io/cn/docs/concepts/configuration/manage-compute-resources-container/)
- 平台目前调整的 CPU 与内存占比是经过生产环境验证过，目前平台还没有提供修改占比的方式, 如果想修改团队的资源配额，需在资源管理后台设置。

{{site.data.alerts.end}}