---
title: 创建组件
---

## 基本信息

该接口主要用于通过镜像创建组件

```bash title="请求路径"
/openapi/v1/teams/{team_name}/regions/{region_name}/apps/{group_id}/services
```

```json title="Body 请求体示例"
{
  "group_id": 9,
  "docker_cmd": "",
  "image": "nginx:latest",
  "service_cname": "nginx",
  "k8s_component_name": "nginx", 
  "user_name": "",
  "password": "",
  "is_deploy": true 
}
```

## 请求参数

接口参数

| 名称        | 类型    | 必选 | 说明   |
| ----------- | ------- | ---- | ------ |
| team_name   |  string  | 是   | 团队ID |
| region_name | string  | 是   | 集群ID |
| group_id    |  integer | 是   | 应用ID |

Body 参数

| 名称               | 类型   | 必选 | 说明                                                         |
| ------------------ | ------ | ---- | ------------------------------------------------------------ |
| group_id           | string | 是   | 应用ID                                                       |
| docker_cmd         | string | 否   | 容器启动命令                                                 |
| image              | string | 是   | 镜像地址，例：nginx:latest                                   |
| service_cname      | string | 是   | 组件名，只⽀持⼩写字⺟、数字或“-”，并且必须以字⺟开始、以数字或字⺟结尾 |
| k8s_component_name | string | 是   | 组件英文名，只⽀持⼩写字⺟、数字或“-”，并且必须以字⺟开始、以数字或字⺟结尾 |
| user_name          | string | 否   | 镜像仓库用户                                                 |
| password           | string | 否   | 镜像仓库密码                                                 |
| is_deploy          | Bool   | 是   | 创建后是否自动构建                                           |



## 返回结果

| 状态码 | 状态码含义 | 说明 |
| ------ | ---------- | ---- |
| 200    | OK         | 成功 |

```json
{
  "code": 200,
  "msg": "success",
  "msg_show": "组件创建成功", 
  "data": {
    "bean": {
      "service_id": "0941ab572e006f49e7855e6213f7915c" 
    },
    "list": [] 
  }
}
```

