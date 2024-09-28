---
title: 3rd party service creation
description: Explain the creation method and process of Rainbond supporting third-party services
---

### 3rd party service creation

There are still two entries for the creation of third-party services, namely`to create-->to create a third-party component`on the left navigation of the team view and`to add a third-party component`button on the application Dashboard page. The creation process is the same.

#### Create a static third-party service

- Select the service registration method as static registration

- Fill in the mailing address of the service

  For example, the service has two running instances, and the IP addresses are 192.168.0.1 and 192.168.0.2. For the convenience of setting, we can fill in the port configuration when filling in the first instance, that is, provide the following data to inform the Rainbond service that the listening port is 8080 , and are consistent.

  > 192.168.0.1:8080
  >
  > 192.168.0.2

- Submit the creation and go to the Dashboard page of the service to configure the service port, connection information, and health check properties.

#### Create a Kubernetes third-party service (Beta)

- Select the service registration method as Kubernetes
- Fill in the Namespace, the default is the Namespace where the current team is located
- Fill in Service, Service should belong to the Namespace filled in above
- Submit the creation, enter the port interface to configure, the newly added port must be consistent with the service configuration port to be able to access normally

#### Create third-party services based on API registration

- Select the service registration method as API registration

- Submit the creation and go to the Dashboard page of the service to configure the service port, connection information, and health check properties.

- After the creation is completed, the communication address of the service can be dynamically changed by calling the API according to the`API address`and`key`displayed on the overview page.

The API provides three calling methods: GET, PUT, DELETE, which correspond to the query, addition (or modification) and deletion of the service address, respectively.

##### GET

Below is an example of the API for querying an instance:

```bash
curl -s -G \
--url http://ip:port/console/third_party/8ad4b1c7ffb305f2b59b6de625b1ee6a \
--data secret_key=6RW0mYM3
```

After executing the curl request, you will get a response similar to the following:

```
{
    "msg": "success",
    "code": 200,
    "msg_show": "query success",
    "data": {
        "list": [
            {
                "status": "healthy",
                "ip": "192.168.0.1",
                "is_static": true,
                "is_online": true
            },
            ...
        ]
    }
}
```

Description of request parameters:

| parameter                       | Is it required | illustrate |
| :------------------------------ | :------------- | :--------- |
| secret_key | Yes            | key        |

Response parameter description:

| parameter                      | type   | illustrate                                                                                                     |
| :----------------------------- | :----- | :------------------------------------------------------------------------------------------------------------- |
| code                           | int    | business code                                                                                                  |
| msg                            | string | A detailed description of the response to the request                                                          |
| msg_show  | string | A description of the response to the request, for display                                                      |
| status                         | string | Status of the instance, possible values are: healthy, unhealthy, unknown                       |
| ip                             | string | IP address of the instance                                                                                     |
| is_static | bool   | Whether the instance is of static type, true: static type; false: dynamic type |
| is_online | bool   | Whether the instance is online, true: online; false: offline                   |

##### PUT

Below is an example of the API that modifies the instance:

```
curl -X PUT \
--url http://192.168.1.200:7070/console/third_party/8d545c3e8e7780b228b6dcc77561388b \
-H "Content-Type: application/json" \
-d '{"secret_key":"4FsL5PWK" ,"ip":"192.168.0.1","is_online":true}'
```

After executing the curl request, you will get a response similar to the following:

```
{
    "msg": "success",
    "code": 200,
    "msg_show": "Modified successfully"
}
```

Description of request parameters:

| parameter                       | Is it required | type   | illustrate                            |
| :------------------------------ | :------------- | :----- | :------------------------------------ |
| secret_key | Yes            | string | key                                   |
| ip                              | Yes            | string | Service instance address, ipv4 format |
| is_online  | no             | bool   | Whether online, default true          |

Response parameter description:

| parameter                     | type   | illustrate                                                |
| :---------------------------- | :----- | :-------------------------------------------------------- |
| code                          | int    | business code                                             |
| msg                           | string | A detailed description of the response to the request     |
| msg_show | string | A description of the response to the request, for display |

##### DELETE

Here is an example of the API for deleting an instance:

```
curl -X DELETE \
--url http://192.168.1.200:7070/console/third_party/8d545c3e8e7780b228b6dcc77561388b \
-H "Content-Type: application/json" \
-d '{"secret_key":"4FsL5PWK" ,"ip":"192.168.1.107","is_online":true}'
```

After executing the curl request, you will get a response similar to the following:

```
{
    "msg": "success",
    "code": 200,
    "msg_show": "Delete successful"
}
```

Description of request parameters:

| parameter                       | Is it required | type   | illustrate                            |
| :------------------------------ | :------------- | :----- | :------------------------------------ |
| secret_key | Yes            | string | key                                   |
| ip                              | Yes            | string | Service instance address, ipv4 format |

Response parameter description:

| parameter                     | type   | illustrate                                                |
| :---------------------------- | :----- | :-------------------------------------------------------- |
| code                          | int    | business code                                             |
| msg                           | string | A detailed description of the response to the request     |
| msg_show | string | A description of the response to the request, for display |

The request content of the PUT and DELETE methods is of type application/json

### Third-party service creation example

#### Docking with internal services

> Such as the rbd-app-ui or rbd-monitor components of the Rainbond platform

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/thirdparty-create/dsffwex1.jpg" width="100%" />

After the creation is complete, you need to go online manually.

For example, if you don't want to open port 7070 to the outside world or want to access the console through 80/443, you can do this in this way.

#### Docking with Alibaba Cloud RDS

Rainbond provides corresponding support for domain name instances of third-party components, allowing users to add domain name instance addresses of third-party components, and provide internal services of the rainbond platform. Combined with the existing logic that domain names can be resolved to multiple IP addresses, the rainbond platform only allows adding one domain name instance address to third-party components.
结合域名可以解析到多个 IP 地址上这样一个现有的逻辑，rainbond 平台仅允许添加一个域名实例地址到第三方组件中。

static registration

In the process of creating static third-party components, there will be logic for address verification. If there are multiple addresses filled in by the user and the number of domain name addresses is greater than or equal to one, the verification cannot be passed. In other words, a third-party service added by domain name can only add one domain name instance address.
换句话说，以域名方式添加的第三方服务只能添加 1 个域名实例地址。

Dynamic registration method

In the process of creating dynamic third-party components, especially when adding instance addresses through dynamic discovery such as etcd, there will also be address verification logic. If it is found that the data contains a domain name, the first domain name will be used as the third party. The instance address of the component.

The adjustment process is the same as that of connecting to the internal services of the platform. There are a few points to note. If the platform application needs to rely on the MYSQL installed by the third service, it needs to enable internal access and manually add application connection information.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/thirdparty-create/dsffwex2.jpg" width="100%" />
