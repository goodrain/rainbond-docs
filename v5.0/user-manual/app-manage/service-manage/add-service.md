---
title: 服务操作
summary: 添加服务存储
toc: true
asciicast: true
---

## 添加服务存储

### 1.1 服务为什么要添加存储

服务是平台的抽象概念，底层是通过容器封装运行起来的，容器默认是没有存储的，也就是说，在容器中的程序在运行过程中的日志、生成或处理的文件，一旦容器关闭或重启，之前生成或存储的文件就丢失了。

因此，为了保存程序运行中的文件，需要给容器挂载一个存储，在 rainbond 中，只要给服务挂载一个存储，即使服务水平扩展几十上百个节点，平台都会自动挂载。

### 1.2 如何为服务添加存储

为服务添加存储有两种方式：

- <b>(1) 新增服务存储</b>

找到 【存储】页面

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage01.png" width="100%" />

点击 【添加持久化】按钮

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage02.png" width="60%" />

存储添加完成

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage03.png" width="100%" />

- <b>(2) 挂载其他服务的存储</b>

在【存储】页面找到 【挂载目录】
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage04.png" width="100%" />

点击【挂载目录】按钮后，勾选需要挂载其他服务的名称，并填写挂载到本服务的目录
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage05.png" width="90%" />

完成挂载其他服务存储

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage06.png" width="100%" />

{{site.data.alerts.callout_danger}}

- 新增或挂载其他服务的存储后，需要重启服务，挂载其他服务的存储不支持挂载到有状态的服务。
- 新增或挂载其他服务存储时，本服务的路径不能使用 Linux 系统保留目录，如：/dev、/usr、/bin、/sys、/proc 等

{{site.data.alerts.end}}
