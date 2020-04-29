---
title: 应用复制
description: 说明应用复制功能的作用、使用场景
Weight: 4006
---

## 应用复制

应用复制，故名思源是通过复制的形式快速的部署应用的一种新模式。在开发场景中同样一套业务系统，可能会根据不同的代码分支部署不同的开发环境，也可能每一个开发者都搭建自己的开发环境。没有应用复制的时候，应对这种场景需要每次通过源代码或镜像从头开始创建组件，可能有1个，也可能是10个。然而每一套环境可能只是代码分支不同，重复的工作量肯定不是Rainbond的设计追求，应用复制可以很好的解决这些问题。

### 为什么需要应用复制

在之前的版本迭代中，我们的产品已经有了**应用分享与发布**、**应用备份**等功能，那为什么还需要**应用复制**这个看似鸡肋的功能呢？细想一下，你就会发现，他们之间的区别，

- **应用分享与发布**功能主要作用于对应用的打包，发布。整个过程中，会将不同构建源的组件统一抽象为OAM模型，而OAM模型的构建源是镜像，应用内组件的构建源已经发生了变化。对于想要搭建不同开发环境的开发者来说，构建源的变化是不能满足需求的

- **应用备份**功能就相当于对当前应用制作快照，整个过程不仅保存了应用的原有构建源，同时也保存了当前应用的持久化数据，这对于想要快速搭建不同构建源的开发环境的开发者来说，整个过程不仅耗时而且不能修改构建源。

因此**应用复制**这个功能就应运而生了，应用复制的主要用途就是快速跨集群部署基于不同构建源的开发环境，且只复制应用内组件的构建信息，依赖关系。因此它的速度很快。满足了开发者快速搭建属于自己的开发环境的需求。

### 应用复制流程演示

让我们来看一下应用复制的流程：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/console/V5.2/app_copy_01.gif" width="100%" />

在复制过程中，我们可以选择部分组件进行复制，如果被复制的组件存在依赖，当被依赖的组件未被选中复制时，会根据复制范围而智能的处理依赖，当复制范围为当前团队时，新的组件会依赖原应用下的组件；如果复制范围为其他的团队，则会将依赖删除。
让我们来看一下具体效果：

- 当前团队下应用部分复制

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/console/V5.2/app_copy_02.gif" width="100%" />

- 其他团队下应用部分复制

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/console/V5.2/app_copy_03.gif" width="100%" />

目前仅支持部分构建源类型修改分支，未来，我们将提供更多可修改内容，不断完善这项功能。

### 应用复制开放接口

为了更加方便的使用快速复制功能，我们也提供了相关API供开发者调用，（此功能目前只能在cloud服务中使用，开源版本暂不支持）。

#### 获取备份应用内组件信息列表
``` url
// 获取备份应用内组件信息列表
GET https://cloud.goodrain.com/openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/copy
Accept: application/json
Content-Type: application/json
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Authorization: "user_access_token"

// build_source字段为构建源信息，不同类型的构建源返回不同结构的构建源信息
Response
[
  {
    "build_source": {
      "version": "latest",
      "language": "Java-jar",
      "code_from": "gitlab_demo",
      "service_source": "source_code",
      "code_version": "master",
      "git_url": "https://gitee.com/rainbond/java-jar-demo.git",
      "full_name": null,
      "service_id": "service_id",
      "oauth_service_id": null,
      "user_name": null,
      "password": null
    },
    "update_time": "2020-04-29T15:17:02.826162",
    "deploy_version": "",
    "create_status": "complete",
    "service_alias": "gree47b9",
    "service_cname": "java",
    "version": "latest",
    "service_type": "application",
    "service_id": "service_id",
    "app_name": "应用复制",
    "min_memory": "1024"
  },
  {
    "build_source": {
      "version": "latest",
      "language": null,
      "code_from": "image_manual",
      "service_source": "docker_image",
      "docker_cmd": "nginx",
      "image": "nginx:latest",
      "password": null,
      "user_name": null
    },
    "update_time": "2020-04-28T20:40:08.145377",
    "deploy_version": "",
    "create_status": "complete",
    "service_alias": "gra98bbe",
    "service_cname": "nginx",
    "version": "latest",
    "service_type": "application",
    "service_id": "service_id",
    "app_name": "应用复制",
    "min_memory": "512"
  },
  {
    "build_source": {
      "version": "5.0",
      "language": null,
      "code_from": null,
      "service_source": "market",
      "rain_app_name": "opto"
    },
    "update_time": "2020-04-20T15:41:05.968926",
    "deploy_version": "20200420153657",
    "create_status": "complete",
    "service_alias": "gr02a72b",
    "service_cname": "Mysql5.7(单机版)",
    "version": "latest",
    "service_type": "application",
    "service_id": "service_id",
    "app_name": "应用复制",
    "min_memory": "512"
  }
]
```

#### 备份应用

``` url
// 备份应用
POST https://cloud.goodrain.com/openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/copy
Accept: application/json
Content-Type: application/json
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Authorization: "user_access_token"

// 不同构建源的版本统一传入version字段
// 当不做修改时，可不传change字段
Request
{
  "services": [
    {
      "service_id": "service_id",
      "change": {
        "build_source": {
          "version": "1.11"
        }
      }
    },
    {
      "service_id": "service_id"
    },
    {
      "service_id": "service_id"
    }
  ],
  "target_team_name": "team_name",
  "target_region_name": "region_name",
  "target_app_id": 305
}

// 返回复制后应用的组件列表
Response

{
  "services": [
    {
      "service_id": "service_id",
      "tenant_id": "tenant_id",
      "service_key": "0000",
      "service_alias": "grf18cee",
      "service_cname": "nginx",
      "service_region": "region_name",
      "desc": "docker run application",
      "category": "app_publish",
      "version": "1.11",
      "update_version": 1,
      "image": "nginx:1.11",
      "cmd": "",
      "extend_method": "stateless_multiple",
      "min_node": 1,
      "min_cpu": 80,
      "min_memory": 512,
      "code_from": "image_manual",
      "git_url": null,
      "create_time": "2020-04-29T16:04:23.868102",
      "git_project_id": 0,
      "code_version": null,
      "service_type": "application",
      "creater": 1,
      "language": "",
      "total_memory": 128,
      "is_service": false,
      "service_origin": "assistant",
      "expired_time": null,
      "tenant_service_group_id": 0,
      "open_webhooks": false,
      "service_source": "docker_image",
      "create_status": "complete",
      "update_time": "2020-04-29T16:04:23.868220",
      "check_uuid": "check_uuid",
      "check_event_id": "check_event_id",
      "docker_cmd": "nginx",
      "server_type": "git",
      "is_upgrate": false,
      "build_upgrade": true,
      "oauth_service_id": null,
      "git_full_name": null
    },
    {
      "service_id": "service_id",
      "tenant_id": "tenant_id",
      "service_key": "service_key",
      "service_alias": "grfe01f9",
      "service_cname": "Mysql5.7(单机版)",
      "service_region": "region_name",
      "desc": "market app ",
      "category": "app_publish",
      "version": "latest",
      "update_version": 1,
      "image": "docker image",
      "cmd": "",
      "extend_method": "state_multiple",
      "min_node": 1,
      "min_cpu": 80,
      "min_memory": 512,
      "code_from": "",
      "git_url": null,
      "create_time": "2020-04-29T16:04:23.879427",
      "git_project_id": 0,
      "code_version": null,
      "service_type": "application",
      "creater": 1,
      "language": "",
      "total_memory": 512,
      "is_service": false,
      "service_origin": "assistant",
      "expired_time": null,
      "tenant_service_group_id": 223,
      "open_webhooks": false,
      "service_source": "market",
      "create_status": "complete",
      "update_time": "2020-04-29T16:04:23.879505",
      "check_uuid": "",
      "check_event_id": "",
      "docker_cmd": null,
      "server_type": "git",
      "is_upgrate": false,
      "build_upgrade": true,
      "oauth_service_id": null,
      "git_full_name": null
    }
  ]
}
```
