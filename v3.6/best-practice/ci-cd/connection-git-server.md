---
title: 云帮对接私有Git仓库
summary: 讲解如何对接云帮外部的gitlab仓库和使用云帮内部的gitlab仓库
toc: false
asciicast: true
---

<div id="toc"></div>

Rainbond通过对接Git仓库来创建基于源代码及Dockerfile的应用。

通过【自定义源码】的方式创建应用，当你填写Git地址时，平台会自动判断地址的协议，如果是HTTP的Git地址，平台会提示你输入Git仓库的用户名和密码，如果是公开项目，用户名密码可以省略。当输入的Git地址是SSH协议时，平台会提示你将rainbond的SSH公钥复制到Git仓库中。

本文主要讲解通过 SSH 公钥的方式对接私有部署的Git仓库，以 [GitLab](https://gitlab.com/)为示例进行说明。


## 一、配置SSH公钥对接私有仓库

### 1.1 获取公钥

进入【创建应用】-【从源码创建】-【自定义源码】，将项目的SSh协议的地址复制到【Git仓库地址】栏中时，会提示【配置授权Key】连接，点开显示详细信息：

<img src="https://static.goodrain.com/images/docs/3.6/best-practice/ci-cd/ssh-01.gif" width="100%" />


### 1.2 Gitlab创建新项目

- **新建项目**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-01.png"  width="90%" />

- **填写项目名称**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-02.png"  width="90%" />

- **创建示例代码**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-03.png"  width="90%" />

{{site.data.alerts.callout_success}}
切换到SSH地址后，需要记住项目的SSH地址，后续创建应用时需要用到，这里的地址是 `git@172.16.210.205:test/helloworld.git`
{{site.data.alerts.end}}


新建一个index.html 的文件，内容为 `hello world,hello goodrain!` 提交。

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-04.png"  width="90%" />

### 1.3 将公钥添加到Git仓库

- **切换到项目首页**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-01.png"  width="90%" />

- **添加SSH公钥**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-02.png"  width="90%" />

- **SSH 公钥添加完成**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-03.png"  width="90%" />


### 1.4 测试对接是否成功
通过私有仓库创建应用的方式来测试云帮能否通过SSH关于获取Git仓库中的代码。

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-test-ssh-key-01.png"  width="90%" />

- **创建应用**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-test-ssh-key-02.png"  width="90%" />

- **能够识别语言，代表对接成功**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-test-ssh-key-03.png"  width="90%" />


## 二、对接云帮上部署的GitLab私有仓库

上文介绍的都是对接现有GitLab的情况，如果你还没有Git仓库，云帮可以一键部署GitLab应用，下面主要介绍对接云帮上部署的GitLab

### 2.1 创建GitLab应用

通过 【新建应用】-【应用市场】搜索到GitLab应用，选择需要的版本安装即可。

### 2.2 配置GitLab

GitLab安装完成后，可以在应用的端口页面看到对外打开的端口号，如下图：

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-install-gitlab-02.png"  width="90%"/>

- 端口号：应用内部监听的端口，本例中监听了`22`和`80`端口
- 访问地址：云帮映射的地址与端口，本例中 22端口映射的地址为`172.16.210.205`，端口为`20006` ，80端口地址为`	80.grea7fc4.zggk.48mt2.goodrain.org`，端口为`80`


{{site.data.alerts.callout_success}}
- 云帮为HTTP协议的应用端口默认分配一个访问域名
- 云帮为非HTTP协议的应用端口默认分配一个访问地址和一个随机的映射端口，但端口映射与应用端口唯一对应，不会变化，因此本例的端口可能与你实际情况不一致。
{{site.data.alerts.end}}

- **设置GitLab的HTTP和SSH地址**

GitLab应用通过 `GITLAB_SSH_HOST` 和 `GITLAB_HOST` 环境变量来设置SSH和HTTP的地址，因此需要将这两个变量设置到GitLab应用中。

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-configure-gitlab-01.png"  width="90%"/>

{{site.data.alerts.callout_success}}
设置环境变量后，需要重启GitLab应用。
{{site.data.alerts.end}}

### 配置云帮对接Git仓库的ssh协议端口号

```bash
# 默认地址
git@gr6a10f1.demo.ali-sh-s1.goodrain.net:test/helloworld.git

# 修改为
ssh://git@gr6a10f1.demo.ali-sh-s1.goodrain.net:20592/test/helloworld.git
```
