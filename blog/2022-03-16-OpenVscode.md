---
title: OpenVSCode云端IDE加入Rainbond一体化开发体系
description: OpenVSCode云端IDE加入Rainbond一体化开发体系
slug: OpenVscode
# authors: QiZhang
---

:::info
OpenVSCode 是一款基于Web 界面的在线IDE 代码编辑器，只需要PC端存在浏览器即可使用，更轻量，高效，简洁，其基础功能完全继承了微软出品的 [VS Code](https://code.visualstudio.com/) ，可以通过安装扩展的方式继续加强代码编辑能力。Rainbond 开源应用商店推出的 OpenVSCode 预安装了 gitlab-workflow 扩展用于对接私有化代码仓库 Gitlab，同时预装了常见语言运行环境（目前版本集成了Golang , Node.js , python , java ），可以在 Terminal 终端中快速调试业务代码。

Rainbond 有能力快速搭建一体化开发环境，通过对接代码仓库 webhook 机制，完成业务从代码开始，到最终上线的全流程。通过纳入 OpenVSCode 云端 IDE，可以将 Rainbond 一体化开发体系全部托管于云端，开发人员只需要一个浏览器，即可完成代码从编辑到上线的全流程。
:::

<!--truncate-->


![](https://static.goodrain.com/wechat/openvscode/1.png)

为了实现上述的目标，本文会按照操作顺序逐次讲解：

- 一键安装 OpenVSCode 和 Gitlab

> 借助 Rainbond 内置的开源应用商店，一键安装 OpenVSCode 和 Gitlab ，是搭建一体化开发体系最快捷的方式。

- OpenVSCode 对接 Gitlab

> 借助 OpenVSCode 自带的扩展机制，完成与 Gitlab 的对接，可以获取 Gitlab 中的代码仓库。

- 编码与调试

> 在 OpenVSCode 的帮助下，基于浏览器完成各种有关编码与调试的高级操作。

- Gitlab 对接 Rainbond

> 通过 Oauth2.0 协议打通 Rainbond 与 Gitlab，方便地将 Gitlab 中的项目部署到 Rainbond 中去，并自动配置 Webhook 。

- 代码提交触发自动构建

> 验证整个场景的效果，从 OpenVSCode 提交代码后，完成 Rainbond 上部署项目的自动发布上线。

---

## 一键安装 OpenVScode 和 Gitlab

一体化开发体系中所引用的 OpenVSCode 和 Gitlab 都已经加入 Rainbond 开源应用商店，供用户一键安装部署。

在开源应用商店中搜索，点击安装即可一键部署 Gitlab 应用，注意选择 `14.8.2` 版本：

![](https://static.goodrain.com/wechat/openvscode/openvscode-11.png)

在开源应用商店中搜索，点击安装即可一键部署 OpenVSCode 应用，目前提供 `1.64.2` 版本：

![](https://static.goodrain.com/wechat/openvscode/openvscode-12.png)

整体拓扑：

![](https://static.goodrain.com/wechat/openvscode/openvscode-13.png)

---

### OpenVSCode 对接 Gitlab

Rainbond 提供的 OpenVSCode 默认集成了 Gitlab-workflow 扩展，该扩展为 OpenVSCode 提供了对接 Gitlab 代码仓库的能力，开发人员可以直接查看 Gitlab 中托管的代码仓库，并一键克隆到工作空间中。

- OpenVSCode对接Gitlab仓库
  
  - 通过对接代码仓库，可以更加快速的拉取，提交代码，并且可以通过IDE进行代码的调试功能
  
  - 填写 Gitlab 对应的 URL（如果是平台部署的 Gitlab 则为http访问的域名）  以及 token即可
  
  ![](https://static.goodrain.com/wechat/openvscode/2.png)
  
  - 对接成功以后，可以直接克隆仓库代码在终端进行编码、调试、推送等功能。
  
  ![](https://static.goodrain.com/wechat/openvscode/openvscode-1.png)

- Gitlab 获取 Token
  
  - 在GitLab中，单击右上角并选择“首选项”在左侧边栏中。选择访问令牌，然后选择“添加个人访问令牌”
  - 权限：api , read_user 

---

### 编码与调试

完成 OpenVSCode 和 Gitlab 的对接后，就可以直接读取 Gitlab 中的项目进行克隆操作。

![](https://static.goodrain.com/wechat/openvscode/openvscode-2.png)

根据开发语言的不同，可以在线安装各种开发语言的扩展，提升编辑代码的便利性。

![](https://static.goodrain.com/wechat/openvscode/openvscode-3.png)

编辑代码的体验和本地 IDE 并无二致。

![](https://static.goodrain.com/wechat/openvscode/openvscode-4.png)

打开 Terminal 之后，可以在命令行界面进行操作，OpenVSCode 默认集成了 maven 构建工具，方便构建 Jar 包进行测试。

![](https://static.goodrain.com/wechat/openvscode/openvscode-5.png)

构建完成后的下一步，可以直接在 Terminal 中启动项目。

![](https://static.goodrain.com/wechat/openvscode/openvscode-6.png)

被调试的项目启动后监听 5000 端口，开发人员只需要为 OpenVSCode 开启 5000 端口的对外服务，即可访问到调试中的服务了。

![](https://static.goodrain.com/wechat/openvscode/openvscode-7.png)

---

### Gitlab 对接 Rainbond

完成编码与调试后，开发人员的业务进入了部署阶段。为了使整个流程的自动化程度更高，开发人员可以将 Gitlab 和 Rainbond 打通。

Gitlab 与 Rainbond 之间能够利用 Oauth2 协议打通单点登录流程，方便用户在 Rainbond 界面内直接选择 gitlab 中的仓库进行代码的部署，并自动配置 webhook，完成代码 commit 之后的自动构建。

配置以及使用方法参见以往文章：

[GitLab和Rainbond整合实现一体化开发环境](https://mp.weixin.qq.com/s/JtV2gvPLC22jbPTeLQJqyA)

完成 Gitlab 与 Rainbond 的对接后，可以在 Rainbond 界面中选择 Gitlab 中的项目进行部署。

![](https://static.goodrain.com/wechat/openvscode/openvscode-8.png)

打开是否开启自动构建的开关，可以自动配置 Gitlab 的 Webhook ，Gitlab 一旦接收到指定的推送信息，就会触发 Rainbond 对当前服务组件的自动构建。

![](https://static.goodrain.com/wechat/openvscode/openvscode-9.png)

---

### 代码提交触发自动构建

修改项目文件提交时 Commit 信息添加关键字 @deploy ，提交成功以后，rainbond会自动触发自动构建。

  ![](https://static.goodrain.com/wechat/openvscode/openvscode-10.png)

自动更新效果展示

  ![](https://static.goodrain.com/wechat/openvscode/3.png)
