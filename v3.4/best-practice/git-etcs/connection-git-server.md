---
title: 部署GitLab与云帮对接
summary: 讲解如何对接云帮外部的gitlab仓库和使用云帮内部的gitlab仓库
toc: false
asciicast: true
---

<div id="toc"></div>

云帮支持直接部署私有仓库中的源码，目前支持GitLab。同时我们的[云市](https://www.goodrain.com/#/index)提供一键式部署[GitLab应用]()。部署情况分为以下两种:

## 使用云帮创建的GitLab

### 新建GitLab应用

公有云进入[云市](https://www.goodrain.com/#/index)选择GitLab应用，一键部署在云帮。私有云进入创建应用-应用列表创建GitLab应用。

应用创建请参考文档：[创建应用-应用市场](https://www.rainbond.com/docs/stable/user-app-docs/addapp/addapp-market.html)

### 配置GitLab应用

1. 获取`GITLAB_SSH_HOST`变量值

   获取变量的值为22端口访问地址中红线包括部分，截止到`.net`处结束。不包括其后的冒号（:）与映射端口（此图中20046）

   <img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/connect-git1.png"  width="80%"/>

2. 添加变量

   进入[应用控制台-设置](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-settings.html)，添加变量`GITLAB_SSH_HOST`

   <img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/connect-git2.png"  width="80%" />

3. 重启与访问

   配置完成后请先重启应用，观察[应用控制台-日志](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-logs.html)。待日志显示GitLab完成配置，进入[应用控制台-概览](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-overview.html)即可访问。

   <img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/connect-git3.png"  width="80%" />

4. 登录

   首次登录GitLab您需要重置root用户的密码；或注册一个新的GitLab用户。root用户重置密码完成后使用用户名为`root`及新的密码登录。

### 对接云帮-公有云

{{site.data.alerts.callout_success}}

若您使用HTTP方式提交代码，完成GitLab应用创建并获取HTTP的git地址即可GitLab代码仓库中的代码创建应用，可跳过本小节。

{{site.data.alerts.end}}

1. 配置SSH-key

   进入创建应用-私有Git，获取公有云的授权key：

   {% include copy-clipboard.html %}

   ```
   ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCy97mlKJo1xPoDYejmeK0bMhM6O/leVuLF/U0ry/NLWatfkl1R69NIX6TpW/hVFjGXRZTz56V37jLOVQWq24dQaLIXyFqxZwJnakZzX/b6K3sKb6Y+dDZdktcPEVLUQPWHs6gm0tUgbvgywulEVuTgAt5fYwa1rG48zmgCHlU4a6jWT8iQ9D2Lqpf4ZYZnUOOGB6AmaABfCBSCFDj8ihIz00Hp77s42gxRhn/iQJE9ZrDYWnxN0cUAxvLpB1jCANFR4Zc5FslHUp4tLVNMdDeqi8OPZMj4G6yWclwa3Uqfu7yd3gqik4nI1jaRLL9Lq/2GgA20MvCFWqtvcBJ2Tcv1 builder
   ```

   进入GitLab点击右上角头像，进入Setting界面。进入Setting界面后在导航栏选择SSH keys，进入SSH-key配置界面。添加公有云提供的授权key：

   <img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/connect-git4.png"  width="80%" />

2. 在配置SSH key的账户创建测试demo并获取SSH的git地址

   在GitLab创建一个project，或者导入您本地的代码。完成创建project并确认测试代码存在并且可用的情况下，获取此project对应SSH的git地址

   {{site.data.alerts.callout_success}}

   git基本使用可参考：[git-简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)

   {{site.data.alerts.end}}

3. 使用私有Git创建应用

   - 获取变量的值为22端口映射端口值，图中红线部分。

     <img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/get-ssh-port.png" width="80%">


   - 进入创建应用-私有Git页面（获取云帮-公有云授权key的页面）

   - 编辑已获取的SSH的git地址:

     ```
     #原本获取的git地址格式大致为
     git@gr842b59.demo.ali-hz-s1.goodrain.net:root/test.git
     #修改为(在获取的git地址前添加 ssh:// ；在地址.net后添加刚刚获取的映射端口值):
     ssh://git@gr842b59.demo.ali-hz-s1.goodrain.net:20046/root/test.git
     ```

   <img src="https://static.goodrain.com/images/acp/docs/bestpractice/gitlab/connect-git5.png"  width="80%"/>

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