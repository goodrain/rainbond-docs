---
title: 管理依赖
summary: 一些应用程序无法独自完成预计实现业务，需要依赖其他应用或服务才可以实现。
toc: false
---

<div id="toc"></div>



## 应用连接信息

###作用与机制

-  **应用连接信息** 提供了应用之间相互依赖的纽带。通过键值对的方式，将环境变量写入实例的系统环境中，供进程读取和调用。以 **WordPress+MySQL** 的应用组合为例，您需要在 **MySQL应用**中正确定义的 **用户名、密码、连接地址、端口** 四个变量。这样，在WordPress应用正确的依赖于该MySQL应用后，WordPress应用将自动读取四个变量，即不用您输入用户名、密码、连接地址、端口，就可以登陆您的WordPress应用了。

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-reliance1.png" style="border:1px solid #eee;max-width:100%" />

###添加变量

- 点击 **添加变量**，您可以输入自定义的变量名、变量值、说明。输入完毕后，该变量将以环境变量的形式写入该应用后端所有实例的系统环境中。

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-reliance2.png" style="border:1px solid #eee;width:60%" /></center>

##应用依赖信息

### 作用与机制

-  **应用依赖信息** 表明了当前应用都依赖了哪些其他应用。通过添加依赖，可以让当前应用读取被依赖应用的连接信息，通过这些连接信息，您的应用会自动与被依赖应用互动，为您提供相应的服务。以 **WordPress+MySQL** 的应用组合为例，您需要为 **WordPress** 应用添加 **MySQL应用** 为依赖，WordPress应用在读取连接信息后，会自动访问 MySQL的地址与端口：127.0.0.1:3306 并以对应的用户名密码登陆数据库。 **值得注意的是** 不同的可依赖应用，所需要的连接信息也不尽相同。

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-reliance3.png" style="border:1px solid #eee;max-width:100%" />

- 点击 **连接信息** 可以查看被依赖应用的连接信息详情。

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-reliance4.png" style="border:1px solid #eee;width:60%" /></center>

### 添加依赖

- 点击 **添加依赖** 可以显示当前可用的所有可依赖应用，这些应用可以在不同的 **应用组** 下，勾选并点击 **确定** 即可建立依赖关系。

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-reliance5.png" style="border:1px solid #eee;width:60%" /></center>

## 拓扑显示

- 成功建立依赖关系后，在 **拓扑图视图** 中，您可以清晰的看到这种依赖关系的建立，原本独立的应用通过带有箭头的连线相连接，箭头指向即依赖关系的体现。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-reliance6.png" style="border:1px solid #eee;width:60%" /></center>

- 建立应用之间的依赖，需要您对自己的应用组合有足够的了解，如果您并不了解应用组合之间的内部关联，那么强烈建议您[从云市安装](http://www.rainbond.com/docs/dev/user-app-docs/addapp/addapp-market.html)您的应用。