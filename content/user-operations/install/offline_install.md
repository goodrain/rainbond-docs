---
title: "离线部署"
weight: 1005
description: "此方式适用于外网网络受到严格限制的用户，此版本目前支持CentOS 7.4.1708系统，Ubuntu 16.04 系统"
hidden: true
---

{{% notice warning %}}
目前我们提供了CentOS 7.4.1708版本，Ubuntu 16.04版本 的离线包，其他版本离线包制作请参考[离线包制作文档](/user-operations/op-guide/offline-package/)
{{% /notice %}}

### 软硬件要求

##### 1. 检查操作系统，目前离线版本支持以下操作系统

| 系统     | 版本         | 说明                     |
| :------- | :----------- | :----------------------- |
| CentOS   | 7.4.1708      | 64位，[ISO下载](http://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/system/CentOS/CentOS-7-x86_64-Minimal-1708.iso) |
| Ubuntu   | 16.04        | 64位  推荐安装   [ISO下载](https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/system/CentOS/ubuntu-16.04.6-server-amd64.iso)          |

##### 2. 确保机器重启，服务器IP地址和nameserver不发生改变，推荐配置静态ip  
##### 3. 多节点部署时，需要确保所有机器间时间要同步(很重要)  
##### 4. 多节点时，机器间网络访问没有限制  
##### 5. 支持使用root执行安装操作  

更多关于软硬件要求请参考 [软件和硬件环境要求](/user-operations/op-guide/recommendation/),安装前请务必确定是否满足条件。

#### 同步离线包

```bash
# 有网环境下载离线包,并同步到离线环境
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/dev/offline.2019-09-03-5.1.7.tgz

```

#### 离线安装操作

##### 准备工作

```bash
# 解压离线包
tar xf <离线包>
# 进入解压目录下
cd offline
# 执行准备工作
./offline.sh
# 确定上述文件都存在后执行后续安装操作
```

##### 初始化数据中心

{{% notice info %}}
离线情况下，初始化数据中心必须指定参数要求： 必须指定install-type为offline 可选参数要求：  
1. 如果是多网卡情况下，需要指定iip  
2. 离线情况下，默认使用`pass.grapps.cn`域名，需要自行指定离线域名，并需要配置相关解析工作如`*.pass.grapps.cn`解析到数据中心节点  
3. role身份,赋予当前节点身份属性,默认为管理节点,计算节点和网关节点复用;**单节点安装无需指定role身份**，若role指定为manage，则表示当前节点仅具有管理节点属性  
{{% /notice %}}

```bash
# 当前节点具有管理、网关、计算属性
 ./grctl init --install-type offline  --iip <当前机器内网ip>  --domain <自定义域名>
```

* 安装完成后检查, 当所有服务和节点皆处于健康状态时平台即可正常使用。

```bash
# 集群整体状态
grctl cluster

# 集群节点状态
grctl node list

# 控制台访问地址
http://<节点IP地址>:7070
```

如果集群状态是不健康的，参考[Rainbond组件运维](/user-operations/management/component-op/) 文档解决故障。

##### 添加节点

```bash
# 添加计算节点,请不用使用offline目录下的grctl执行相关节点添加删除操作
## 法一 密码
grctl node add  --iip <计算节点内网ip> --root-pass <计算节点root密码> --role compute
## 法二 key
grctl node add  --iip <计算节点内网ip> --key /root/.ssh/id_rsa.pub --role compute
# 安装计算节点
grctl node install <新添加计算节点的Uid>
# 确定计算节点ok后，上线节点
当节点处于offline(unschedulable)状态后可以up
grctl node up <新添加计算节点的Uid>
```

更多细节可以参考文档 [运维手册, 节点扩容](/user-operations/management/node/#添加节点)

{{% button href="/user-manual/" %}}安装完成，开启Rainbond云端之旅{{% /button %}}
