---
title: "第三方组件管理"
description: "讲解第三方组件类型的管理操作"
hidden: true
Weight: 5200
---

### 总览

总览页面主要有展示[第三方组件创建](/user-manual/app-creation/thirdparty-service/thirdparty-create/)的元数据, 和对实例的管理.

[实例的类型](/user-manual/app-creation/thirdparty-service/thirdparty-design/#第三方组件分类)有两类: 静态实例和动态实例. 对于静态的实例, 可以在 UI 对它们执行`查询`, `新增`, `上线`, `下线`和`删除`等操作; 而对于动态实例, 只可以在 UI 上对它们执行`查询`操作, 它们的`新增`, `上线`, `下线`和`删除`等操作只能体现在组件注册中心数据的变化和健康检查上.

#### 查询

将当前组件所有的实例展示出来, 包括实例的数量,  IP 地址, 端口, 健康状态, 是否上线等信息.

#### 下线

将实例从当前组件生效的实例列表中移出, 不再提供组件, 并保留当前组件的元数据中.

#### 上线

将实例从元数据中, 转移到生效的实例列表中, 为当前组件提供组件.

#### 新增

将新的实例添加到当前组件中. 在默认情况下, Rainbond 会将其设置为`上线`.

#### 删除

将指定实例下线, 并从元数据中中将其永久地移除.

### 端口

端口的功能基本上和内部的组件保持一致, 唯一的不同点是, 第三方组件`只能添加一个端口`. 详情参考: [组件端口](/user-manual/app-service-manage/service-port-domain/)

### 连接信息

详情参考: [连接信息](/user-manual/app-service-manage/service-rely/#组件连接信息管理)

### 更多设置

在更多设置中, 第三方组件保留了[健康检测](/user-manual/app-service-manage/service-other-set/#健康检查)和[成员组件权限](/user-manual/app-service-manage/service-other-set/#成员组件权限). 在这两者中, [成员组件权限](/user-manual/app-service-manage/service-other-set/#成员组件权限)跟内部组件保持一致, 有变化的是健康检测. 第三方组件不健康处理方式有`下线` 和 `忽略`(内部组件为`下线`和`重启`).