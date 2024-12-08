---
title: Create Component
---

## Basic Information

This interface is primarily used to create components by mirror

```bash title="请求路径"
/openapi/v1/teams/{team_name}/regions/{region_name}/apps/{group_id}/services
```

```json title="Body 请求体示例"
LO
  "group_id": 9,
  "docker_cmd": "",
  "image": "nginx:late",
  "service_cname": "nginx",
  "k8s_component_name": "nginx", 
  "user_name": "",
  "password": "",
  "is_employ": true 
}
```

## Request Parameters

Interface Parameters

| Name                             | Type    | Required | Note           |
| -------------------------------- | ------- | -------- | -------------- |
| team_name   | String  | Yes      | Team ID        |
| region_name | String  | Yes      | Cluster ID     |
| group_id    | integer | Yes      | Application ID |

Body parameters

| Name                                                         | Type   | Required | Note                                                                                                                               |
| ------------------------------------------------------------ | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| group_id                                | String | Yes      | Application ID                                                                                                                     |
| docker_cmd                              | String | No       | Container start command                                                                                                            |
| Image                                                        | String | Yes      | Mirror address, example：nginx:latest                                                                               |
| service_name                            | String | Yes      | Component name, only lowercase letters, numbers or '-' is supported and must start with letters, end with numbers or letters       |
| k8s_component_name | String | Yes      | Component in English, only lowercase letters, numbers or '-' is supported and must start with letters, end with numbers or letters |
| user_name                               | String | No       | Mirror repository user                                                                                                             |
| password                                                     | String | No       | Image repository password                                                                                                          |
| is_upload                               | Bool   | Yes      | Whether to build automatically after creation                                                                                      |

## Back to results

| Status Code | Status code meanings | Note    |
| ----------- | -------------------- | ------- |
| 200         | OK                   | Success |

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
