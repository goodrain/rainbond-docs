---
title: 快速安装
summary: 快速在线安装Rainbond，使用默认的配置形式
toc: true
toc_not_nested: true
asciicast: true
---



## 一、操作系统准备和检查

### 1.1 检查操作系统，目前版本支持以下操作系统

| 系统     | 版本         | 说明                     |
| :------- | :----------- | :----------------------- |
| CentOS   | 7.3/7.4      | 64位，推荐安装([7.4.1708](http://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/system/CentOS/CentOS-7-x86_64-Minimal-1708.iso)) |
| Debian   | 9.6          | 64位                     |
| Ubuntu   | 16.04        | 64位                     |
| 中标麒麟 | 服务器版V7.4 | 64位                     |

{{site.data.alerts.callout_danger}}
CentOS 7.5/7.6版本需要内核版本升级到4.x,具体可以参考[社区方案](https://t.goodrain.com/t/centos-check-unpack/628)
{{site.data.alerts.end}}

更多关于软硬件要求请参考 [软件和硬件环境要求](../operation-manual/op-guide/recommendation.html)

### 1.2 下载系统安装工具

```
wget https://pkg.rainbond.com/releases/common/v5.0/grctl
chmod +x ./grctl
```

### 1.3 检查操作系统基础设置

   * 确保机器重启，服务器IP地址和nameserver不发生改变，推荐[配置静态ip](../operation-manual/install/config/static-ip.html)

   * 确定系统时间与时区(Asia/Shanghai)同步，参考[配置时区与时间同步](../operation-manual/install/config/timezone.html)

   * 如果已经装有docker, 需要在安装前配置`insecure registry: goodrain.me`,可以通过docker info查看`Insecure Registries`
   
   * 确定系统可以正常yum/apt-get install相关软件包，需要提前配置系统相关软件源
   
   * 确定系统已禁用`NetworkManager`或者[配置NetworkManager](https://t.goodrain.com/t/calico-networkmanager/591)
   
   * 节点资源：磁盘最低要求 40GB,内存要求最低2核4G, 默认情况下节点会给系统预留1.5核CPU1.5G内存的资源
   
   * 确定网络没有限制，如有请加如下域名添加到白名单

     repo.goodrain.com, api.goodrain.com, hub.goodrain.com, docker.io, domain.grapps.cn, aliyun.com,aliyuncs.com


## 二、初始化数据中心

[数据中心](/docs/v5.0/architecture/abstraction.html#region) 是Rainbond资源集合的核心抽象。初始化数据中心操作需要在第一台服务器上执行安装命令。

* 初始化安装第一个节点

> 快速安装无需设置过多的参数，重点注意IP地址的设定。若当前机器存在多个内网IP地址时需要请务必指定内网IP地址(iip);若当前机器同时具备`内网`和`公网` IP地址时，务必指定公网IP地址(eip)，若无则无需指定。如果想跳过系统配置检查，安装时指定`--enable-check disable`,如果配置过低可能会无法正常部署运行应用。如果需要安装特定docker版本，在安装前指定docker版本，如`export DOCKER_VERSION=18.06`

```bash
./grctl init --iip 内网ip --eip 公网ip
```

安装过程需要下载和处理大约2G的文件，需要一定时间，请耐心等待。若遇到无法解决的错误请于[Rainbond社区](https://t.goodrain.com)留言。

* 安装完成后检查, 当所有服务和节点皆处于健康状态时平台即可正常使用。

```bash
# 集群整体状态
grctl cluster

# 集群节点状态
grctl node list

# 控制台访问地址
http://<节点IP地址>:7070
```
如果集群状态是不健康的，参考[节点健康检测](/docs/v5.0/operation-manual/cluster-management/node-health.html) 文档解决故障。

## 三、数据中心添加节点

上诉步骤完成默认将第一个节点安装成为第一个[管理节点](/docs/v5.0/architecture/abstraction.html#node) 和第一个 [计算节点](/docs/v5.0/architecture/abstraction.html#node)

若你需要增加你的集群计算资源池，可以快速扩容计算节点：

> 其中host/hostname可以根据排序顺序依次compute01-computeN,host/hostname不要重复。

```bash
grctl node add --host computexx --iip 计算节点IP --root-pass root用户密码 --role compute
示例：
grctl node add --host compute01 --iip 192.168.1.1 --root-pass 12345678 --role compute
# 获取添加节点的NodeID，此时节点应处于未安装状态
grctl node list
# 指定节点ID开始安装
grctl node install NodeID
# 确定节点处于健康状态上线节点
grctl node up <NodeID>

```

更多细节可以参考文档 [运维手册, 节点扩容](../operation-manual/cluster-management/add-node.html) 

<div class="step">
  <a href="./quick-learning.html"><button class="btn">安装完成，开始部署管理你的应用</button></a>
</div>
