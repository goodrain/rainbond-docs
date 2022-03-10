---
title: '第三方组件实践-统一管理集群内服务访问集群外数据库'
Description: '集群内服务访问无法或尚未迁移到 Rainbond 的集群外数据库或其他组件。'
---

如果在公有云(比如阿里云, AWS)上的分布式数据库, 无法迁移到 Rainbond 上; 或是其他尚未迁移到 Rainbond 的数据库, 那么你可以使用`第三方组件`将它们注册到 Rainbond 中, 从而使得集群内服务也可以访问它们。本文将演示如何把集群外的 MySQL 通过第三方组件注册到 Rainbond 集群中, 并为其定义共享环境变量，从而解决多个服务重复定义数据库连接信息变量的问题。

> 如果 Rainbond 安装在阿里云，请注意使用阿里云 RDS 云数据库时必须与 Rainbond 集群处于同一个区域。

### 前期准备

- 请确保你已经安装了 Rainbond V5.1 或更高的版本。

- 需要添加的服务, 本文使用的是 Rainbond 集群外的一个 MySQL。

- phpMyAdmin, 可以在应用云市中安装, 也可以通过[镜像](https://hub.docker.com/r/phpmyadmin/phpmyadmin)的方式创建.

你可以  假设这个 MySQL 是非常复杂的, 比如它是一个分布式, 主从复制, 读写分享的 MySQL, 迁移的难度比较在; 那么你可以先不迁移这个 MySQL, 通过第三方组件将这个 MySQL 的实例添加到 Rainbond 集群中, 让它也可以使用 Rainbond 服务通信治理, 组件拓扑关系等功能.

### 步骤 1: 填写第三方服务信息

登录 Rainbond 控制台, 进入 `创建应用` -> `添加第三方组件`.

填写 `组件名称`, `应用名称`, `组件注册方式(以 API 注册为例)`, `组件地址`等信息.

点击 `创建组件`, 并在检测通过后, 点击 `创建`.

### 步骤 2: 添加实例地址

#### 1. 获取添加实例的 API 地址和秘钥

添加实例的 API 地址和秘钥等信息在组件的`总览` 页面中, 如下图所示:

![Minion](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/thirdparty/practice-2/%E6%80%BB%E8%A7%88%E9%A1%B5%E9%9D%A2.png)

#### 2. 能过 Restful API 添加组件实例

在你的终端中, 结合 1 中的 API 和秘钥, 输入类似以下的 curl 命令, 发起 PUT 请求, 将实例`192.168.1.107`添加到组件中.

```markup
curl -X PUT \
--url http://192.168.1.200:7070/console/third_party/bb9371b3a3288e5abb329d780d85507b \
-H "Content-Type: application/json" \
-d '{"secret_key":"jErDmpot","ip":"192.168.1.107","is_online":true}'
{"msg":"success","code":200,"data":{"bean":{},"list":[]},"msg_show":"修改成功"}
```

详细的 API 注册请参考: [基于 API 注册的第三方组件](../../user-manual/app-creation/thirdparty-service/thirdparty-create/#创建基于api注册的第三方组件)

### 步骤 3: 添加端口

创建完成后, 会进入到组件的管理页面. 在导航中选择 `端口`.

点击`添加端口`, 输入端口为 `3306`, 选择 `mysql` 协议.

添加完成后, 打开`对内服务`, 开启服务的组件通信治理功能.

> 这里需要注意的是, 内部的服务可以添加多个端口, 而第三方组件只能添加一个端口.

### 步骤 4: 定义和分享连接信息

在导航中选择 `连接信息`, 然后定义 MySQL 的连接信息(连接信息实际上是服务的环境变量). 如图所示:

![Minion](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/thirdparty/practice-2/%E8%BF%9E%E6%8E%A5%E4%BF%A1%E6%81%AF.png)

这样, 当其他服务依赖了这个 MySQL 后, 就可以直接使用它的连接信息. 也就是说, 定义后的连接信息, 是可以分享出去的.

### 步骤 5: 确认服务

打开`对内服务`后, 该服务就可以使用 Rainbond 的服务通信治理功能.

使准备好的 phpMyAdmin, 与依赖第三方组件建立依赖; 然后更新或启动 phpMyAdmin.

在 phpMyAdmin 的 Dashboard 中, 点击访问, 对其进行访问, 并输入 MySQL 的账号密码.

你应该会在浏览器中看到类似下面的网页:

![Minion](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/thirdparty/practice-2/phpMyAdmin.png)

这表明, 你已经成功地将集群外的服务(MySQL), 通过第三方组件添加到了集群中.

进入 phpMyAdmin 的实例容器, 查看环境变量, 你应该可以看到步骤 4 中定义的 MySQL 连接信息:

```markup
# env | grep MYSQL
MYSQL_PASS=rainbond
MYSQL_HOST=127.0.0.1
MYSQL_USER=root
MYSQL_PORT=3306
```

这表明, MySQL 的连接信息已经成功地被分享给 phpMyAdmin 了. 在这个例子中, phpMyAdmin 没有使用这些连接信息, 你实际的使用过程中, 你可以根据实际的情况对这些连接信息进行利用.

### 总结

至此, 相信你已经了解了如何将 Rainbond 集群外的服务注册到集群中, 并为定义和分享其环境变量. 第三方组件注册到集群后, 可以像内部服务一样, 使用通信治理, 组件拓扑关系等功能.
