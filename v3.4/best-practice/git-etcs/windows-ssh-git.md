---
title: Windows下配置SSH连接GitHub
summary: 讲解如何在windows下配置SSH连接GitHub
toc: false
asciicast: true
---

<div id="toc"></div>


## 安装Git

### 准备

Windows7/Windows8系统

Git安装包([下载Git for Windows](https://git-scm.com/download/win))

### 安装

1. Git安装包通过浏览器下载完成后,需要修改文件的锁定属性,特别是 `.zip` 文件和 `.chm` 文件(否则打开chm会显示404). 右键点击下载的文件,选择属性,然后点击"解除锁定"按钮,确定即可. 如下图所示:

   <img src="https://static.goodrain.com/images/acp/docs/bestpractice/windows-ssh-git/windows-ssh-git.png" width="50%" />

2. 双击安装包文件开始安装，如果有Windows拦截警告，允许即可。

3. 出现安装向导界面，按照提示安装。建议均使用默认配置，点击下一步(Next)即可。

   <img src="https://static.goodrain.com/images/acp/docs/bestpractice/windows-ssh-git/windows-ssh-git2.png" width="50%" />

> 提示:
>
> 如图，此处选项可根据个人需求勾选

   

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/windows-ssh-git/windows-ssh-git3.png" width="50%" />

4. 安装完成可打开 **CDM** 或 **Git Bash** 输入 `git ` 或 `git --version` 尝试 git 命令。



## 配置ssh连接git

1. 打开 **Git Bash** ，检查本机是否有SSH key设置。输入如下命令：

   ```bash
   $ cd ~/.ssh
   ```

   - 如果没有则提示： No such file or directory

   - 如果有，则进入~/.ssh路径下输入如下命令：

     ```Bash
     $ ls				#查看~/.ssh路径下的文件
     $ rm *			#删除~/.ssh路径下的文件
     ```

2. 生成新的SSH key，输入如下命令：

   ```bash
   $ cd ~  #保证当前路径在家目录下

   $ ssh-keygen -t rsa -C "xxxxxx@yy.com"  #建议填写自己真实有效的邮箱地址

   Generating public/private rsa key pair.

   Enter file in which to save the key (/c/Users/xxxx_000/.ssh/id_rsa):   #不填直接回车

   Enter passphrase (empty for no passphrase):   #输入密码（可以为空，回车）

   Enter same passphrase again:   #再次确认密码（可以为空，回车）

   Your identification has been saved in /c/Users/xxxx_000/.ssh/id_rsa.   #生成的密钥

   Your public key has been saved in /c/Users/xxxx_000/.ssh/id_rsa.pub.  #生成的公钥

   The key fingerprint is:

   e3:51:33:xx:xx:xx:xx:xxx:61:28:83:e2:81 xxxxxx@yy.com
   ```

3. SSH key已生成，复制`id_rsa.pub`文件内容，输入如下命令：

   ```bash
   $ cat ~/.ssh/id_rsa.pub			#将输出内容复制
   ```

4. 登录GitHub，自定义SSH key的标题，将刚刚复制的`id_rsa.pub`内容添加至key，点击保存

   <img src="https://static.goodrain.com/images/acp/docs/bestpractice/windows-ssh-git/windows-ssh-git4.png" width="100%" />

5. 配置账户：

   ```bash
   $ git config --global user.name “your username”			#自定义用户名

   $ git config --global user.email “your_registered_github_Email”	 #设置邮箱地址(建议用注册giuhub的邮箱)
   ```

6. 测试ssh keys是否设置成功。

   ```bash
   $ ssh -T git@github.com

   The authenticity of host 'github.com (192.30.252.129)' can't be established.

   RSA key fingerprint is 16:27:xx:xx:xx:xx:xx:4d:eb:df:a6:48.

   Are you sure you want to continue connecting (yes/no)? yes #确认你是否继续联系，输入yes

   Warning: Permanently added 'github.com,192.30.252.129' (RSA) to the list of known hosts.
   ```

## 测试git基本操作

1. 在GitHUb创建新的仓库，并复制此仓库的ssh路径。

2. 打开Git Bash输入如下命令：

   ```bash
   #创建目录
   $ mkdir test
   $ cd test

   #初始化
   $ git init

   #创建hello.md文件
   $ echo "This is a ssh key test" > README.md

   #提交到本地
   $ git add .   #提交当前目录下所以文件
   $ git commit -m "add README.md"   #提交记录说明 

   #提交到github
   $ git remote add origin ‘<SSH url>’  #引号内<SSH url>粘贴刚刚复制的仓库ssh路径
   $ git push -u origin master

   #ssh key若设置密码，则会提示输出密码
   Enter passphrase for key '~/.ssh/id_rsa':  
   ```

3. 刷新GitHub界面，查看刚刚推到此库的`README.md`