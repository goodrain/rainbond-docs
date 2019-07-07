---
title: "快速部署"
weight: 1001
description: "此方式适用于你想快速安装和试用Rainbond平台, 最少只需要单台裸系统机器即可安装完成。此方式为基础安装方式，后续安装方案都是在本方案基础上的扩展和延伸。"
hidden: true
---

## 一、操作系统准备和检查

### 1.1 检查操作系统，目前版本支持以下操作系统

| 系统     | 版本         | 说明                     |
| :------- | :----------- | :----------------------- |
| CentOS   | 7.3及以上      | 64位，[7.4.1708下载](http://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/system/CentOS/CentOS-7-x86_64-Minimal-1708.iso)) |
| Debian   | 9.6及以上          | 64位                     |
| Ubuntu   | 16.04        | 64位      推荐安装               |
| 中标麒麟 | 服务器版V7.4 | 64位                     |

更多关于软硬件要求请参考 [软件和硬件环境要求](/user-operations/op-guide/recommendation/)

### 1.2 下载系统安装工具

目前最新安装的版本是: v5.1.5-release
```
wget https://pkg.rainbond.com/releases/common/v5.1/grctl
chmod +x ./grctl
```

## 二、初始化数据中心

[数据中心](/architecture/architecture/#二-数据中心服务组件说明) 是Rainbond资源集合的核心抽象。初始化数据中心操作需要在第一台服务器上执行安装命令。

* 初始化安装第一个节点(<b>配置最低2核4G内存40G磁盘</b>)
    * 快速安装无需设置过多的参数，重点注意IP地址的设定。若当前机器存在多个内网IP地址时需要请务必指定内网IP地址(iip);  
    * 若当前机器同时具备`内网`和`公网` IP地址时，务必指定公网IP地址(eip)，若无则无需指定;  
    * 如果想跳过系统配置检查，安装时指定`--enable-check disable`,如果配置过低可能会无法正常安装部署;  
    * [支持对接外部数据库](/user-operations/tools/grctl/#初始化时对接外部数据库); 
    * 更多参数说明请阅读[节点初始化重要参数说明](/user-operations/tools/grctl/#节点初始化重要参数说明)

```bash
# 建议使用root执行安装操作
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
如果集群状态是不健康的，参考[节点健康检测](/user-operations/management/component-op/#节点健康检查机制) 文档解决故障。

## 三、数据中心添加节点

上诉步骤完成默认将第一个节点安装成为第一个管理节点和第一个计算节点。

若你需要增加你的集群计算资源池，可以快速扩容计算节点：

> 其中host/hostname可以根据排序顺序依次compute01-computeN,host/hostname不要重复。

```bash
# 建议使用root执行安装操作
grctl node add --host computexx --iip 计算节点IP --root-pass root用户密码 --role compute --install
示例：
grctl node add --host compute01 --iip 192.168.1.1 --root-pass 12345678 --role compute --install
grctl node list
# 确定节点处于健康状态上线节点
grctl node up <NodeID>
```

更多细节可以参考文档 [节点扩容](/user-operations/management/node/#添加节点) 

{{% button href="/user-manual/" %}}安装完成，开启Rainbond云端之旅{{% /button %}}
