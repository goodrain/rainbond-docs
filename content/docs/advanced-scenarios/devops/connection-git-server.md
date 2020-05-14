---
title: 对接私有源码仓库（Git、Svn）
description: 讲解Rainbond如何获取私有源代码仓库进行源码构建
hidden: true
---

### 原理解读

[通过自定义源码的方式创建组件](/docs/user-manual/component-create/creation-process/#从源码创建)
当你填写 Git 地址时，平台会自动判断地址的协议，如果是 HTTP 的 Git 地址，平台会提示你输入 Git 仓库的用户名和密码，如果是公开项目，用户名密码可以省略。当输入的 Git 地址是 SSH 协议时，平台会提示你将 Rainbond 的 SSH 公钥复制到 Git 仓库中。Rainbond 会为每个团队生成独立的公钥以避免多团队密钥冲突。

当你填写 Svn 代码地址时，平台提示输入账号名和密码，如果是私有仓库，请务必输入账号。

### 操作流程

本文主要讲解通过 SSH 公钥的方式对接私有部署的 Git 仓库，以 [GitLab](https://gitlab.com/)为示例进行说明。

##### Gitlab 创建新项目

> 如果你已有项目，此步骤跳过

- **新建项目**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-01.png"  width="90%" />

- **填写项目名称**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-02.png"  width="90%" />

- **创建示例代码**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-03.png"  width="90%" />

> 切换到 SSH 地址后，需要记住项目的 SSH 地址，后续创建组件时需要用到，这里的地址是 `git@172.16.210.205:test/helloworld.git`

新建一个 index.html 的文件，内容为 `hello world,hello goodrain!` 提交。

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-04.png"  width="90%" />

#### 配置 SSH 公钥对接私有仓库

##### 获取公钥

进入【创建组件】-【从源码创建】-【自定义源码】，将项目的 SSh 协议的地址复制到【Git 仓库地址】栏中时，会提示【配置授权 Key】连接，点开显示详细信息：

<img src="https://static.goodrain.com/images/docs/3.6/best-practice/ci-cd/ssh-01.gif" width="100%" />

##### 将公钥添加到 Git 仓库

- 切换到项目首页

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-01.png"  width="90%" />

- 添加 SSH 公钥

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-02.png"  width="90%" />

- SSH 公钥添加完成

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-03.png"  width="90%" />

#### 测试对接是否成功

通过私有仓库创建组件的方式来测试云帮能否通过 SSH 关于获取 Git 仓库中的代码。

- 创建组件
  <img src="https://static.goodrain.com/images/docs/3.6/best-practice/ci-cd/ssh-02.png"  width="100%" />

- 能够识别语言，代表对接成功

<img src="https://static.goodrain.com/images/docs/3.6/best-practice/ci-cd/ssh-03.png"  width="75%" />

### 在 Rainbond 部署 GitLab 私有仓库服务

上文介绍的是对接现有 GitLab 的情况，如果你还没有 Git 仓库，Rainbond 可以一键部署 GitLab 应用，下面主要介绍对接云帮上部署的 GitLab

#### 创建 GitLab 应用

通过 【新建应用】-【应用市场】搜索到 GitLab 应用，选择需要的版本安装即可。

#### 配置 GitLab

GitLab 安装完成后，可以在组件的端口页面看到对外打开的端口号，如下图：

<img src="https://static.goodrain.com/images/docs/3.6/best-practice/ci-cd/ssh-04.png"  width="100%" />

- 端口号：组件内部监听的端口，本例中监听了`22`和`80`端口
- 访问地址：云帮映射的地址与端口，本例中 22 端口映射的地址为`172.16.210.205`，端口为`20006` ，80 端口地址为`80.grea7fc4.zggk.48mt2.goodrain.org`，端口为`80`

* Rainbond 为 HTTP 协议的组件端口默认分配一个访问域名
* Rainbond 为非 HTTP 协议的组件端口默认分配一个访问地址和一个随机的映射端口，但端口映射与组件端口唯一对应，不会变化，因此本例的端口可能与你实际情况不一致。

#### 设置 GitLab 的 HTTP 和 SSH 地址

GitLab 组件通过 `GITLAB_SSH_HOST` 和 `GITLAB_HOST` 环境变量来设置 SSH 和 HTTP 的地址，因此需要将这两个变量设置到 GitLab 组件中。

<img src="https://static.goodrain.com/images/docs/3.6/best-practice/ci-cd/ssh-05.png"  width="100%" />

> 设置环境变量后，需要重启 GitLab 组件。

#### 创建组件时 Git 地址中的端口配置

由于 SSH 协议使用的是非默认的 22 端口，因此在创建组件时，填写的 Git 地址也需要加上端口信息，格式如下：

```bash
# 默认地址
git@172.16.210.205:test/helloworld.git

# 修改为
git@172.16.210.205:20006/test/helloworld.git
```
