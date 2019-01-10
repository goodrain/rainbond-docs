---
title: 离线部署安装
summary: 离线安装部署Rainbond 5.0
toc: true
toc_not_nested: true
asciicast: true
---

## 准备工作

1. 检查操作系统，目前离线版本仅支持CentOS 7.4.1708版本
2. 确保机器重启，服务器IP地址和nameserver不发生改变，推荐配置静态ip
3. 多节点部署时，需要确保机器间时间要同步
4. 多节点时，机器间网络访问没有限制

<!--
5. 机器资源最低要求2核4G，否则程序会退出
-->

## 下载离线包

```
# 有网环境
wget http://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/dev/offline.5.0.190102.tgz
```

## 同步到数据中心节点

根据具体情况操作，需要将此压缩包同步到即将安装的第一个节点(即数据中心初始化节点)

```
# 示例
scp offline.5.0.190102.tgz <数据中心节点ip>:/root/
```

## 登陆到目标机器操作

```
# 需要移除默认源
mv /etc/yum.repos.d/*.repo /tmp/
# 解压离线包
tar xf offline.5.0.190102.tgz
# 进入解压目录下
cd offline
# 执行准备工作
./offline.sh
# 安装前检查工作
1. ls /grdata/services/offline/ 目录下有base.images.tgz rainbond.images.tgz这两个文件
2. ls /grdata/services/offline/pkgs/rpm/centos/7/repodata/repomd.xml 存在这个文件
3. ls /opt/rainbond/rainbond-ansible/roles/prepare/templates/rainbond.repo.j2 存在这个文件
# 确定上述文件都存在后执行后续安装操作
```

## 初始化数据中心节点

{{site.data.alerts.callout_info}}
离线情况下，初始化数据中心必须指定参数要求：
必须指定install-type为offline 
可选参数要求：  
1. 如果是多网卡情况下，需要指定iip  
2. 离线情况下，默认使用`pass.example.com`域名，需要自行指定离线域名，并需要配置相关解析工作如`*.pass.example.com`解析到数据中心节点   
3. role身份,赋予当前节点身份属性,默认为管理和计算节点复用，指定为master，则表示当前节点仅具有管理节点属性 
{{site.data.alerts.end}}

```
# 在offline目录下。如果第一个节点不复用，可通过指定role为master即可。如下所示：
./grctl init --install-type offline  --iip <当前机器内网ip>  --domain <自定义域名> --role master
```

## 添加计算节点

```
# 添加计算节点,请不用使用offline目录下的grctl执行相关节点添加删除操作
## 法一 密码
grctl node add --host <计算节点主机名> --iip <计算节点内网ip> --root-pass <计算节点root密码> --role compute
## 法二 key
grctl node add --host <计算节点主机名> --iip <计算节点内网ip> --key /root/.ssh/id_rsa.pub --role compute
# 安装计算节点
grctl node install <新添加计算节点的Uid>
# 确定计算节点ok后，上线节点
当节点处于offline(unschedulable)状态后可以up
grctl node up <新添加计算节点的Uid>
```

## 其他说明

制作其他版本离线包可以参考[如何制作5.0版本的离线包](https://t.goodrain.com/t/5-0/564)