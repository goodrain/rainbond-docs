---
title: 第三方服务创建
Description: 讲解Rainbond支持第三方服务的创建方式和流程
Weight: 3
Hidden: true

---

### 第三方服务创建

第三方服务创建依然存在两个入口，分别是平台左侧导航的 创建应用-添加第三方服务 和应用Dashboard页面的添加第三方服务按钮，创建流程一致。

#### 创建静态第三方服务

* 选择服务注册方式为静态注册

* 填写服务的通信地址

  比如服务有两个运行实例，IP地址分别是192.168.0.1 192.168.0.2，为了设置方便，我们可以填写第一个实例时携带上端口配置，即提供如下的数据，告知Rainbond服务的监听端口是8080，且都一致。

  > 192.168.0.1:8080
  >
  > 192.168.0.2

* 提交创建，进入到服务的Dashboard页面对服务端口、连接信息、健康检查属性进行配置 [参考第三方服务管理](/user-manual/app-service-manage/thirdparty-manage/)


#### 创建动态第三方服务

- 选择服务注册方式为动态注册
- 选择动态注册类型
- 填写地址, Key 等服务注册中心的信息(用户名和密码为非必选项)
- 提交创建，进入到服务的 Dashboard 页面对服务端口、连接信息、健康检查属性进行配置。 [参考第三方服务管理](/user-manual/app-service-manage/thirdparty-manage/)

##### 服务注册中心中数据的格式
以 etcd 为例:
```bash
/rainbond/service1/3201a2727b6445e9a9234a26284549e6
{"ip":"192.168.0.1", "port": 5000}
/rainbond/service1/728d17f86a5f3d834b6db984dd4a50ad
{"ip":"192.168.0.2"}
```
这是注册在 etcd 中的两条信息, 每一条代表一个第三方服务的实例. 其中 `/rainbond/service1` 为上面填写的服务注册中心的信息的 Key, `3201a2727b6445e9a9234a26284549e6` 为这条数据的唯一标识(uuid), 以斜杠分割.

`{"ip":"192.168.0.107", "port": 5000}` 为第三方服务的实例的 IP 地址和端口. 如果没有提供端口, 那么 Rainbond 将会取你在[参考第三方服务管理](/user-manual/app-service-manage/thirdparty-manage/)中添加的端口.

#### 创建基于API注册的第三方服务

* 选择服务注册方式为 API 注册

* 创建服务后会返回url以及秘钥，提供api以供调用，我们已提供GET, PUT, DELETE三种请求方法：
    GET方法获取服务所有实例列表；

    > 参数：secret_key 秘钥
    >
    PUT方法添加或修改实例上下线操作，无实例时即为添加，有相同ip即为修改实例上下线操作

    >参数：secret_key 秘钥; ip 实例endpoint(str类型)；is_online 是否上线（布尔类型，默认为true）
    >

    DELETE方法为删除实例

    >参数：secret_key 秘钥; ip 实例endpoint(str类型)
    >

* 可在服务Dashboard页面进行健康检测，端口等配置项