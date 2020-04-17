---
title: 安装问题排查
weight: 30003
Description: "安装问题排查、诊断、解决"
hidden: true
pre: "<b>6.2 </b>"
---

<div id="toc"></div>

### 排查思路

Rainbond安装过程，大体分为两个阶段：

1. 脚本初始化阶段，负责检查系统环境，以及一些预处理

2. ansible-playbook执行阶段，将安装任务托管于ansible

不同阶段，遇到的问题以及排查思路不尽相同。

#### 脚本初始化阶段

该过程中如有报错，则直接根据其关键字段进行排查：

```bash
not found *.sh
```
- 检查 `/opt/rainbond/scripts/installer/` 目录下是否包含指定脚本。如无，则安装脚本不完全，重新执行安装。

```bash
Not Support <操作系统名称>
```
- 服务器操作系统不被支持，阅读 [软件和硬件环境要求](/docs/user-operations/op-guide/recommendation/)

```bash
port <端口号> is already used 
```
- 特定端口被占用，检查什么服务占用了它，并关闭对应服务。阅读 [软件和硬件环境要求](/docs/user-operations/op-guide/recommendation/)

```bash
The disk is recommended to be at least 40GB
```
- Rainbond安装建议磁盘空间40G。阅读 [软件和硬件环境要求](/docs/user-operations/op-guide/recommendation/)

```bash
Unable to connect to internet
```
- 网络连接失败。如确为离线安装，检查是否指定了 `--install-type=offline`。

```bash 
Static binary versions of Rainbond are available only for 64bit Intel/AMD CPUs (x86_64), but yours is:

or 

Static binary versions of Rainbond are available only for Linux, but this system is:
```

- CPU 架构，操作系统不支持。阅读 [软件和硬件环境要求](/docs/user-operations/op-guide/recommendation/)

```bash
Current Node does not exist <指定的iip参数>
```

- 当前服务器不存在指定的内网ip地址。

```bash
The root user must be used by default
```

- 应切换为root用户安装。

```bash
使用外部数据库console库参数不全
```

- 在指定外部数据库时，指定参数不足。阅读 [节点初始化重要参数说明](/docs/user-operations/tools/grctl/#节点初始化重要参数说明)



执行安装操作前，在环境中引入指定环境变量，可以开启调试模式。`export DEBUG=true`



#### ansible-playbook执行阶段

进入ansible-playbook阶段后，排查的思路变为：由playbook返回的错误信息排查。

比如报错如下：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/install-problem-1.png" width="100%">

由报错信息可知：



在执行 `/opt/rainbond/.init/initr6d.sh` 脚本的过程中，返回非0状态码。



可以尝试的排查操作：



阅读脚本 `/opt/rainbond/.init/initr6d.sh`，了解其工作内容。





实际上，当前脚本运行的目的是初始化集群数据库 `rbd-db` 服务（或是用户指定的外部数据库）。在服务器内存不足或者磁盘性能低下时，容易出现这个问题。解决的具体方式，是安装流程结束后[手动初始化数据库](/docs/Troubleshoot/concrete-operations/manual-init-db/)



如果想要了解该任务的详细信息，可以按照以下对应方式，找到定义该任务的文件



任务 TASK [node/init : init rainbond] 对应了 `/opt/rainbond/rainbond-ansible/roles/node/init/tasks/main.yml` 中，名为 `init rainbond` 的任务



```yml
- name: init rainbond 
  shell: "bash /opt/rainbond/.init/initr6d.sh > /tmp/install/init.r6d.log"
  register: init_r6d_ok
  until: init_r6d_ok is succeeded
  retries: 5
  ignore_errors: true
```

{{% notice info %}}

将导致任务报错失败的所有原因一一罗列是不可能的。但是绝大多数的任务执行失败后，通过 msg 信息的提示，都可以找到排查的切入点。



### 推荐阅读

[RAINBOND集群安装和运维原理解读](/docs/user-operations/install/install-d/)


### 我的问题没有被涵盖

如果你在阅读了这篇文档后，对于如何排查并解决你的安装问题依然一筹莫展，你可以：

- 移步 [GitHub](https://github.com/goodrain/rainbond-ansible/issues) 查询是否有相关的 issue ，如没有则提交 issues

- 前往[社区](https://t.goodrain.com/) 阅读前缀名为【安装问题】的帖子，寻找相似问题的答案

