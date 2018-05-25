---
title: 云帮对接私有Git仓库
summary: 讲解如何对接云帮外部的gitlab仓库和使用云帮内部的gitlab仓库
toc: false
asciicast: true
---

<div id="toc"></div>

云帮通过对接Git仓库来创建基于源代码及Dockerfile的应用。

如果是公开的项目，可以通过填写项目地址的方式创建应用，如果是私有项目，目前云帮公有云支持 [GitHub](/docs/stable/user-app-docs/addapp/addapp-code.html#github)和 好雨Git仓库，如果是私有化部署的Git服务，云帮通过 SSH 公钥的的方式对接Git仓库。下图是云帮对接Git仓库支持的方式与协议：

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/rbd-link-git.png"  width="80%" />


本文主要讲解通过 SSH 公钥的方式对接私有部署的Git仓库，以[GitLab](https://gitlab.com/)为示例进行说明。


## 公有云对接私有仓库

### 获取公钥

进入创建应用-私有Git，获取公有云的SSH公钥：

{% include copy-clipboard.html %}

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCy97mlKJo1xPoDYejmeK0bMhM6O/leVuLF/U0ry/NLWatfkl1R69NIX6TpW/hVFjGXRZTz56V37jLOVQWq24dQaLIXyFqxZwJnakZzX/b6K3sKb6Y+dDZdktcPEVLUQPWHs6gm0tUgbvgywulEVuTgAt5fYwa1rG48zmgCHlU4a6jWT8iQ9D2Lqpf4ZYZnUOOGB6AmaABfCBSCFDj8ihIz00Hp77s42gxRhn/iQJE9ZrDYWnxN0cUAxvLpB1jCANFR4Zc5FslHUp4tLVNMdDeqi8OPZMj4G6yWclwa3Uqfu7yd3gqik4nI1jaRLL9Lq/2GgA20MvCFWqtvcBJ2Tcv1 builder
```
### 创建项目

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

### 将公钥添加到Git仓库

- **切换到项目首页**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-01.png"  width="90%" />

- **添加SSH公钥**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-02.png"  width="90%" />

- **SSH 公钥添加完成**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-03.png"  width="90%" />


### 测试对接是否成功
通过私有仓库创建应用的方式来测试云帮能否通过SSH关于获取Git仓库中的代码。

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-test-ssh-key-01.png"  width="90%" />

- **创建应用**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-test-ssh-key-02.png"  width="90%" />

- **能够识别语言，代表对接成功**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-test-ssh-key-03.png"  width="90%" />

## 云帮私有云对接私有仓库
云帮私有云对接私有Git仓库的流程和公有云一致，唯一不同的就是需要手动生成SSH公钥。

### 生成SSH公钥

在云帮第一个管理节点执行如下命令:

```bash
ssh-keygen -t rsa -f /etc/goodrain/ssh/goodrain-builder

#更改文件权限为rain用户
chown -R rain.rain /etc/goodrain/ssh

#更改公钥权限
chmod 400 /etc/goodrain/ssh/goodrain-builder.pub

#获取公钥内容
cat /etc/goodrain/ssh/goodrain-builder.pub

# 配置config
Host *
  IdentityFile ~/.ssh/goodrain-builder
  StrictHostKeyChecking no
  LogLevel ERROR
```

文件 `/etc/goodrain/ssh/goodrain-builder.pub` 的内容就是SSH公钥内容，剩下的工作与公有云对接私有仓库的流程一致，这里就不再赘述了。

{{site.data.alerts.callout_success}}
当云帮有多个管理节点时，需要将第一台生成的 `/etc/goodrain/ssh` 目录复制到其他管理节点的相应目录下。也就是说，要保证所有管理节点的`/etc/goodrain/ssh` 内容及权限一致。

该目录会被 [rbd-chaos](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-chaos.html) 组件挂载并使用。
{{site.data.alerts.end}}

## 对接云帮上部署的GitLab私有仓库

上文介绍的都是对接现有GitLab的情况，如果你还没有Git仓库，云帮可以一键部署GitLab应用，下面主要介绍对接云帮上部署的GitLab

### 创建GitLab应用

通过 【新建应用】-【应用市场】搜索到GitLab应用，选择需要的版本安装即可。

### 配置GitLab

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
云帮通过默认的22端口，利用ssh协议拉取Git仓库的代码，但由于GitLab安装到了云帮平台，云帮又将22端口映射成其他端口，因此需要特殊处理，下面分别介绍公有云和私有云的配置方式：

#### 云帮私有化部署的处理方式

**第一个管理节点执行：**

```bash
cat << EOF >/etc/goodrain/ssh/config
# 22 端口映射的地址，本示例为 172.16.210.205
Host 172.16.210.205
  IdentityFile ~/.ssh/goodrain-builder
  StrictHostKeyChecking no
  LogLevel ERROR
  # 22端口的映射端口，本示例为20006
  Port 20006
EOF
```

{{site.data.alerts.callout_success}}
当云帮有多个管理节点时，需要将第一台生成的 `/etc/goodrain/ssh` 目录复制到其他管理节点的相应目录下。也就是说，要保证所有管理节点的`/etc/goodrain/ssh` 内容及权限一致。

该目录会被 [rbd-chaos](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-chaos.html) 组件挂载并使用。
{{site.data.alerts.end}}

#### 云帮部署gitlab的ssh协议处理方式
如果是上传大文件，建议使用ssh协议。另外ssh协议问题目前只能通过修改ssh地址的方式来支持：

```bash
# 默认地址
git@gr6a10f1.demo.ali-sh-s1.goodrain.net:test/helloworld.git

# 修改为
ssh://git@gr6a10f1.demo.ali-sh-s1.goodrain.net:20592/test/helloworld.git

# 如git clone 
git clone ssh://git@gr6a10f1.demo.ali-sh-s1.goodrain.net:20592/test/helloworld.git

```
