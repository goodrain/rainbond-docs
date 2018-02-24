---
title: 云帮对接私有Git仓库
summary: 讲解如何对接云帮外部的gitlab仓库和使用云帮内部的gitlab仓库
toc: false
asciicast: true
---

<div id="toc"></div>

云帮通过对接Git仓库来创建基于源代码及Dockerfile的应用。

如果是公开的项目，可以通过填写项目地址的方式创建应用，但如果是私有项目，目前云帮公有云支持 [Github](docs/stable/user-app-docs/addapp/addapp-code.html#github)和 好雨Git仓库，私有化版本只支持通过 SSH 公钥的的方式对接Git仓库。

本文主要讲解通过 SSH 公钥的方式对接私有Git仓库，以Gitlab为示例进行说明。


## 公有云对接私有仓库

### 配置 SSH 公钥

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

### 配置SSH公钥

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

