---
title: 分享应用
description: 分享你的应用到开源应用商店
---

## 背景：

当前我们在使用 Rainbond 时，为了快速部署一些应用，我们可以通过对接开源应用商店，然后一键安装即可。这样对用户而言，使用某些开源应用或基础设施直接安装即可。

但是由于每个用户的需求不同，应用商店也无法满足所有用户的需求。比如一些用户在使用 Rainbond 时，就遇到过以下问题：

- 从应用市场安装下来的应用，用起来很方便，但是版本比较低，没有自己想要的版本

- 自己业务用到了一些通用的中间件，在 Rainbond 开发环境中跑起来后，到生产环境又要再次部署

- 自己将一些开源项目跑在了 Rainbond 上后，如果重新搭建 Rainbond 环境，又需要再次处理各种依赖关系再部署

在之前遇到这些问题时，用户只能以手动的方式处理。但现在我们提供了一种方式，使你可以将你自己的应用分享出去。既能方便自己的使用，还能供他人使用。要实现这点，我们需要先了解 Rainstore 是什么。

## Rainstore 是什么？
Rainstore 是一个可以管理企业应用交付流程、实现商店全流程管理的平台。

对于大多数使用过 Rainbond 的用户，应该都注意到了应用市场那里，默认会对接我们自己的商店：开源应用商店。这个商店就是我们基于 Rainstore 创建的商店。在这个商店中，会有我们制作好的应用，用户只需要完成授权，即可一键安装应用。

当然，用户能一键安装的前提就是有人制作过该应用。如果没有人制作过应用，那你遇到上面的问题时，你只能社区发帖求助，但现在，you can do it。

你可以将你自己做好的应用分享到开源应用商店，供大家使用。

## 如何进行分享应用？
在你想要制作出属于自己的应用时，供自己或他人使用时，你将会经历以下步骤：

- 对接开源应用商店，获取应用发布权限

- 制作你的应用，可参考Rainbond应用市场应用制作规范，并验证通过

- 发布你的应用，供大家使用

### 第一步：对接商店
如果你之前没有对接过开源应用商店，那么你只需要在以下页面，输入你的手机号，通过验证码登录，我们将会为你创建一个用户，并给到相应的权限。

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-authorization.png)

如果你之前已经对接过应用商店，那么需要执行如下操作重新获取发布授权。

1. 在 Rainbond 中找到应用市场，切换到开源应用商店的 Tab 页，点击编辑

2. 清空 accesskey ，点击保存。保存完成后，你将会看到只拥有只读权限。

3. 此时随便选择某个应用，点击安装，会再次弹出认证对话框

4. 最后输入手机号，验证码对接即可

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-store-info.png)

当你完成以上几步后，你将会看到开源应用商店有以下权限：只读、安装、推送应用。此时前期准备完成。

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-perms-show.png)

### 第二步：制作应用
接下来就该是制作你的应用，这里我们以 harbor 为例。目前应用商店中的 harbor 版本较低。当我们想要更高的版本，但应用商店没提供时。我们就可以自己做一个 harbor 应用分享出来。

之前我们制作的应用，都会将应用制作教程分享到社区，拿这个 harbor 为例，我们可以参考[企业级Docker镜像仓库Harbor在Rainbond上的部署](https://t.goodrain.com/d/8204-dockerharborrainbond)。这里我们参考该文章制作出 2.3 版本的 harbor 应用。如下图所示

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/harbor-topological.png)

### 第三步：分享应用
此时，选择左侧发布，发布到云应用商店，选择开源应用商店即可。

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/publish-page.png)

接下来我们需要新建一个应用模版。填写上对应的版本号。选择发布即可。待镜像推送完成并确认后，应用分享成功。

:::caution

**注意：**必须新建一个应用模版，你无法向他人的应用推送版本。

:::

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-app-model-1.png)

此时我们新建一个应用模版：Harbor应用。如下图所示

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-app-model-2.png)

接下来选择对应版本提交后，将会开始同步组件镜像，待镜像同步完成，点击确认发布，即分享完成。

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-app-model-3.png)

### 第四步：补充信息

你已经完成了分享，但是现在的应用只有一个名称，其他的都是默认值，别人无法了解该应用究竟是什么，为了让别人更好的理解该应用，并且愿意使用它，我们需要去应用商店补充相关信息。

应用商店的网址为 https://hub.grapps.cn/enterprise/login, 在这个页面选择手机验证码登录，输入你在 Rainbond 申请授权时的手机号，登录进去后，选择商店管理，你就可以看到你发布的应用了。

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-app-manage-1.png)

点击你刚刚发布的应用，我们可以对应用的简介进行编辑，上传对应的 Logo等。

完成这些以后，我们进入套餐管理，创建一个套餐，并将应用上架。上架应用的目的是为了让更多的人能看见这个应用。即在[开源应用商店](https://hub.grapps.cn/marketplace)中能看见你发布的应用。

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-app-manage-2.png)

套餐类型选择免费，名称可以是对应的版本。保存后，回到后台管理页面，在应用列表中点击上架即可。

至此，你的第一次应用分享完成。

## 分享的是什么？
Rainbond 提出了一种应用模型 Rainbond Application Model（RAM），这是标准的 Rainbond 应用规范。在软件交付过程中 Rainbond 将业务系统抽象为应用模型，业务系统只要在 Rainbond 能够正常运行，即可通过应用模板发布至应用市场。

RAM 模型的抽象，囊括了企业应用所包含的所有服务组件以及组件间的关联关系。这一高级抽象无关乎企业应用内部包含多少服务组件，也无关乎组件间的关联关系是否复杂。应用模版（RAM模型在应用市场领域的具体实现）可以发布到 Rainbond 特有的应用市场中，发布出的应用模版可以作为企业应用的安装包看待，无论原有架构多么复杂、内部组件多寡，都可以完成一键安装与升级。

为了适应更广泛的交付领域，RAM 模型正在努力向 Open Application Model（OAM）演进。OAM 是业界新提出的一种应用模型，其设计是为了能够以简单的方式，在复杂环境中间交付更加健壮的企业应用。

## 如何管理我分享的应用？

### 如何使用

现在分享已经完成了，此时应该如何使用呢，你可以通过在开源应用商店中搜索你的应用，选择右边的安装，安装到某个应用下即可一键部署。

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/search-app.png)
![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/install-app-1.png)

部署效果如下图所示。等待构建完成，即可访问

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/install-app-2.png)

### 管理应用

如果你之后对应用有什么调整，需要管理应用相关信息，那么依然是先[登录应用商店](https://hub.grapps.cn/enterprise/login)，通过手机号登录，在商店管理中完成应用的相关操作。

### 最终效果

完成以上步骤后，我们可以去看下效果。访问[开源应用商店](https://hub.grapps.cn/marketplace) ，搜索你的应用，在这里你可以看到应用的访问数和安装数。可以看到我们刚刚完成了一次安装。

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/app-list-show.png)

点击进去后，你可以看到你的应用简介及相关信息，如下图所示。

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/app-detail-show.png)

在这个页面的右侧，展示了你的相关信息。你可以点击你的姓名，即可进入你个人信息的聚合页，在这个页面，你自己的相关信息以及发布的所有应用都会展示在这里。

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/publish-user-show.png)

此处由于是通过手机号登录，数据不完善，你可以选择进入后台，鼠标移动到右上角头像处，修改这些信息。

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-user-info.png)

## 总结

通过以上步骤，我们完成了一个应用的分享，解决了之前应用商店的应用不满足自己需求的问题，同时也能让他人使用你做好的应用。欢迎大家踊跃贡献你自己做好的应用。如果你做出来了一个好的应用，欢迎联系我们，我们可以通过一些渠道的宣传使更多人能用上你的应用。