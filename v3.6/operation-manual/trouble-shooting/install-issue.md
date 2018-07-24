---
title: 安装问题排查
summary: 安装问题排查
toc: true
---

当安装Rainbond 遇到问题时，请先参考本篇文档。如果问题未解决，请按文档要求收集相关信息通过 Github [反馈给 Rainbond开发者](https://github.com/goodrain/rainbond-install/issues/new)或者通过邮件反馈<rainbond@goodrain.com>。

安装问题反馈需要提供如下信息:

1. 内核版本，系统信息；
2. 机器配置 如：CPU,内存,存储,网络(网络是否有限制)；
3. 安装出错步骤完整截图，具体哪一步出错；
4. 重新执行后，是否还是同样问题

## 安装过程提示salt命令未找到

salt服务未正常安装，请重新执行安装命令，或者手动安装salt服务

具体安装请参考官方文档 [install the 2017.7 release of SaltStack.](https://repo.saltstack.com/2017.7.html)

## 安装过程中提示Minion did not return. [No response]
主要是salt执行命令超时机制导致的。
salt在等待了timeout时间后minion还没有返回执行结果，就用find_job去minion查询一下当前执行的状态。当find_job超时过了gather_job_timeout设定时间，那么salt命令会返回Minion did not return.
目前我们默认设置的参数

```bash
gather_job_timeout: 10 #客户端请求有关运行作业的信息时所需等待的时间，默认10s
timeout: 60 #salt命令和api的默认超时，60s。
```
临时的解决措施就是重新执行安装命令。如果多次出现可以考虑重启salt服务,然后重新执行。

```bash
systemctl restart salt-master
systemctl restart salt-minion
```

## 安装过程中出现 error pulling image configuration: Get https://docker.mirrors.ustc.edu.cn/v2/rainbond 错误

请重新执行安装

## 安装网络问题排查

如果服务器无法直接联网，只能通过代理上网，需要做如下设置。

```bash
# 前提已经有了相关代理服务,示例代理192.168.199.39:1087
# bash/zsh

export http_proxy=http://192.168.199.39:1087
export https_proxy=http://192.168.199.39:1087
export no_proxy="goodrain.me"

# 在安装完docker需要配置

mkdir -p /etc/systemd/system/docker.service.d
cat > /etc/systemd/system/docker.service.d/http-proxy.conf <<EOF
[Service]
Environment="HTTP_PROXY=http://192.168.199.39:1087" "HTTPS_PROXY=http://192.168.199.39:1087" "NO_PROXY=goodrain.me"
EOF

# 重启docker

systemctl daemon-reload
systemctl restart docker
```

## 扩容计算节点了，grclt node list却没有列出对应的计算节点

```bash
# 确定计算节点uuid信息是否有重复的
salt "*" grains.item uuid
# 修改重复的计算节点的uuid 可通过uuidgen生成uuid
/opt/rainbond/envs/kubelet.sh HOST_UUID的值
/opt/rainbond/etc/rbd-node/node_host_uuid.conf:host_uuid的值
两者的值一致，修改完成
# 重启计算节点服务
systemctl restart node
systemctl restart kubelet
# 被重复的节点也需要重启一下node
systemctl restart node
# 重新上线重复节点
grclt node up <新生成的uuid>
```

## 云服务器因重启导致无法远程访问

可以通过远程连接方式登录服务器，排查问题。

```bash
# 阿里云目前已知的可能发生的问题
1. 网卡名与网卡配置中信息不一致，导致网络服务异常
如：网络信息是ens3，而网卡配置文件中是eth0;修改配置文件，重启网卡
2. ssh服务异常
```

如果进行上述操作还有问题，可以采用如下措施

```bash
# 清除防火墙规则
ptables -F;iptables -X;iptables -Z
# 禁止docker,kubelet,node开机启动
systemctl disable docker
systemctl disable kubelet
systemctl disable node
# 重启机器
# 然后依次启动docker,k8s,etcd,calico,node等组件
```

## 安装过程中安装db失败

请检查一下3306端口是否被其他mysql进程占用，如果是，请禁用其他mysql进程服务，重新执行安装命令
