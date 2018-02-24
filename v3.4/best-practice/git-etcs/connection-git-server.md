---
title: 部署GitLab与云帮对接
summary: 讲解如何对接云帮外部的gitlab仓库和使用云帮内部的gitlab仓库
toc: false
asciicast: true
---

<div id="toc"></div>

云帮通过对接Git仓库来创建基于源代码及Dockerfile的应用。

如果是公开的项目，可以通过填写项目地址的方式创建应用，但如果是私有项目，目前云帮公有云支持 [Github](docs/stable/user-app-docs/addapp/addapp-code.html#github)和 好雨Git仓库，私有化版本只支持通过 SSH 公钥的的方式对接Git仓库。

本文主要讲解通过 SSH 公钥的方式对接私有Git仓库，以Gitlab为示例进行说明。


### 公有云对接私有仓库

#### 配置 SSH 公钥

进入创建应用-私有Git，获取公有云的SSH公钥：

{% include copy-clipboard.html %}

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCy97mlKJo1xPoDYejmeK0bMhM6O/leVuLF/U0ry/NLWatfkl1R69NIX6TpW/hVFjGXRZTz56V37jLOVQWq24dQaLIXyFqxZwJnakZzX/b6K3sKb6Y+dDZdktcPEVLUQPWHs6gm0tUgbvgywulEVuTgAt5fYwa1rG48zmgCHlU4a6jWT8iQ9D2Lqpf4ZYZnUOOGB6AmaABfCBSCFDj8ihIz00Hp77s42gxRhn/iQJE9ZrDYWnxN0cUAxvLpB1jCANFR4Zc5FslHUp4tLVNMdDeqi8OPZMj4G6yWclwa3Uqfu7yd3gqik4nI1jaRLL9Lq/2GgA20MvCFWqtvcBJ2Tcv1 builder
```
#### 创建项目

**新建项目**
<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-01.png"  width="90%" />

**填写项目名称**
<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-02.png"  width="90%" />

**创建示例代码**

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-03.png"  width="90%" />

{{site.data.alerts.callout_success}}
切换到SSH地址后，需要记住项目的SSH地址，后续创建应用时需要用到，这里的地址是 `git@172.16.210.205:test/helloworld.git`
{{site.data.alerts.end}}


新建一个index.html 的文件，内容为 `hello world,hello goodrain!` 提交。
<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-create-project-04.png"  width="90%" />

#### 配置SSH公钥

**切换到项目首页**
<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-01.png"  width="90%" />

**添加SSH公钥**
<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-02.png"  width="90%" />

**SSH 公钥添加完成**
<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-add-ssh-key-03.png"  width="90%" />


#### 测试对接是否成功
通过私有仓库创建应用的方式来测试云帮能否通过SSH关于获取Git仓库中的代码。
<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-test-ssh-key-01.png"  width="90%" />

**创建应用**
<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-test-ssh-key-02.png"  width="90%" />

**能够识别语言，代表对接成功**
<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/git-test-ssh-key-03.png"  width="90%" />


### 对接云帮-私有云

以下配置在管理节点:

1. 获取变量的值为22端口映射端口值，图中红线部分。<img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/get-ssh-port.png" width="80%">

2. 配置ssh_config

   将刚刚获取的映射端口值配置在下文中Port的值:

   ```bash
   cat <<EOF >/etc/goodrain/ssh/config
   Host <22端口对应Host，此示例为10.46.287.104>
     IdentityFile ~/.ssh/goodrain-builder
     StrictHostKeyChecking no
     LogLevel ERROR
     Port <22端口映射值，此示例为20004>
   EOF
   ```

3. 生成ssh key并设置权限

   ```
   ssh-keygen -t rsa -f /etc/goodrain/ssh/goodrain-builder
   #更改文件权限为rain用户
   chown -R rain.rain /etc/goodrain/ssh
   #更改公钥权限
   chmod 400 /etc/goodrain/ssh/goodrain-builder.pub
   ```

4. 配置SSH key

   ```
   #获取公匙
   cat /etc/goodrain/ssh/goodrain-builder.pub
   ```

   将/etc/goodrain/ssh/goodrain-builder.pub的内容添加到gitlab创建demo项目用户的SSH-key列表中（参考公有云GitLab配置SSH-key方式）

5. 参考公有云GitLab应用创建demo方式，在配置SSH key的账户中创建演示demo，并获取SSH的git地址。

6. 私有git创建应用

   - 进入创建应用-私有Git页面
   - 将刚刚获取的git地址直接粘至应用创建的地址栏，其余均与公有云创建方式相同。

## 使用自行创建的GitLab

在您在本地安装GitLab应用，以下配置可帮助您通过SSH方式将仓库中的代码部署在云帮：

### 安装时配置

根据GitLab官方提供[参数](https://hub.docker.com/r/goodrainapps/gitlab/)，在安装时可将`GITLAB_SSH_HOST`变量传入，`GITLAB_SSH_HOST`变量值为你的内网IP。

### 配置SSH

此部分包括配置ssh_config；生成SSH key；在GitLab配置SSH key；获取项目SSH的git地址；云帮创建git应用等。此处讲解ssh_config配置方式，其余均与私有云创建GitLab配置相同。

#### 配置ssh_config

```bash
cat <<EOF >/etc/goodrain/ssh/config
Host <创建GitLab应用时传入的GITLAB_SSH_HOST变量值，默认内网IP>
  IdentityFile ~/.ssh/goodrain-builder
  StrictHostKeyChecking no
  LogLevel ERROR
  Port <GitLab应用端口值，默认为22>
EOF
```

完成配置即可使用GitLab仓库的代码在[云帮](user.goodrain.com)创建应用了。
