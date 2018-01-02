---
title: 对接gitlab仓库
summary: 讲解如何对接云帮外部的gitlab仓库和使用云帮内部的gitlab仓库
toc: false
asciicast: true
---

<div id="toc"></div>

## 概述 

云帮平台的应用可以通过源码来创建，在创建应用之前，需要将平台与代码仓库（目前云帮只支持Git Server）进行对接。

云帮是通过 acp_chaos 进行应用的源码构建，因此云帮与代码仓库的对接，实际上就是云帮acp_chaos 组件与代码仓库的对接。

本文会针对两种情况进行讲解：

1、有git仓库，云帮与现有的git仓库进行对接

2、没有git仓库，在云帮平台创建git仓库，并与云帮平台对接

##云帮对接Git仓库的原理

Git Server可以通过ssh，http的方式拉取代码。云帮平台使用的是ssh key，通过添加组件acp_chaos中的ssh公钥到Git Server上，可以实现免秘钥拉取代码，推荐使用ssh key的方式。(云帮对接自建Git server 目前只支持 ssh key 的方式。)

## 对接外部的Git Server

### 新建测试文件

- 新建库

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/create-new-projects.png" width="80%">

- 输入项目名称，创建私有项目

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/create-private-projiect.png" width="80%">

- 仓库中创建一个index.html 文件

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/create-new-file.png" width="80%">

- 编辑index.html 文件

  <img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/edit-index-html.png" width="80%">

###配置管理节点的ssh config文件

- 配置ssh_config

Port设置为gitlab服务器的ssh服务端口号

```bash
cat <<EOF >/etc/goodrain/ssh/config
Host *
  IdentityFile ~/.ssh/goodrain-builder
  StrictHostKeyChecking no
  LogLevel ERROR
  Port ##gitlab服务器的ssh端口
EOF
```

- 生成ssh key

`ssh-keygen -t rsa -f /etc/goodrain/ssh/goodrain-builder`

- 更改文件权限为rain用户

`chown -R rain.rain /etc/goodrain/ssh`

- 更改公钥权限

`chmod 400 /etc/goodrain/ssh/goodrain-builder.pub`

- 查看public key

`cat /etc/goodrain/ssh/goodrain-builder.pub`

- 将/etc/goodrain/ssh/goodrain-builder.pub的内容添加到gitlab创建demo项目的用户ssh-key列表中。

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/add-ssh-key.png" width="80%">

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/add-ssh-key1.png" width="80%">

{{site.data.alerts.callout_info}}
ssh-key和 ssh config 是在管理节点上生成并配置，管理节点上的acp_chaos程序都是以容器的方式运行，通过挂载的形式将宿主机的/etc/goodrain/ssh 目录挂载到容器内部。详情可以参见 /etc/goodrain/docker-compose.yaml 配置文件。
{{site.data.alerts.end}}

###对接云帮

- 获取之前创建的demo地址

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/get-demo.png" width="80%">

- 云帮创建应用

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/create-app.png" width="80%">

​			选择**从源码**，**私有git**

​			云帮私有云对接私有git目前只支持ssh协议。

- 粘贴地址

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/add-address.png" width="80%">

给应用起名字，粘贴git地址，部署应用。

- 访问

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/get.png" width="80%">

## 对接云帮平台创建的Git Server

### 云帮部署gitlab应用

Gitlab依赖Mysql和Redis这两个应用，云帮创建gitlab应用会自动创建依赖应用并连接。
- 在应用市场选择最新应用

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/deploy-gitlab.png" width="80%"  />

- 配置环境变量

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/configure%20environment%20variable.png" width="80%">

​			"GITLAB_SSH_HOST"设置为你的内网ip。

​			"GITLAB_SSH_PORT"不用填写，云帮会默认要求其为22。

​			点击**下一步**部署。

- 设置**GITLAB_HOST**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/gitlab-host.png" width="80%">

​			在端口界面取得上图的地址。

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/delete.png" width="80%">

​			在设置界面删除原有的GITLAB_HOST变量，新增这个变量值设为刚才取到的地址。

​			最后重启应用。

### 新建测试文件

- 设置密码并登录gitlab

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/set-password.png" width="80%">

​			设置密码并登录，用户名默认是admin@example.com

- 新建仓库

与对接外部gitlab步骤一致。

### 配置管理节点的ssh config文件

- 取得gitlab容器ssh的端口号

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/get-ssh-port.png" width="80%">

- 配置ssh_config

```bash
cat <<EOF >/etc/goodrain/ssh/config
Host *
  IdentityFile ~/.ssh/goodrain-builder
  StrictHostKeyChecking no
  LogLevel ERROR
  Port ##上面看到的端口号
EOF
```
剩余步骤与上述对接外部的gitlab仓库一致。

###对接云帮

与上述对接外部gitlab步骤一致。