---
title: How to use OpenAPI
slug: /Intro
---

## How to call console OpenAPI

1. Before calling the console OpenAPI, the user needs to click the personal center-access token-add in the upper right corner of the platform to create an access token for authorization
2. Before calling the console OpenAPI, make sure you have obtained the access token required by the API and added it to the request header
3. Only relative paths are displayed in the OpenAPI documentation, such as `/openapi/v1/administrators`, and the actual request path is not displayed.You need to piece together your console access address as a path to form the full address.eg `http://192.168.2.225:7070/openapi/v1/administrators`You need to concatenate your console access address with the path to form the complete address.Like `http://192.168.2.225:7070/openapi/v1/administrators`

## OpenAPI Documentation Convention Format

The console OpenAPI document format is mainly as：

```
Request：
    Basic information: Introduce what the API does
    Request method: Introduce the request methods required by the API (POST, PUT, DELETE, GET, etc.)
    Request parameters: A brief description of the path parameters and query parameters used by the API
    Request Body: This part of the parameters needs to be placed in the Body of the HTTP request, usually in JSON format
    Request body example: Example of a successful request parameter corresponding to the API
Response：
    Response body: After an API call, the body part of the HTTP response Content
    Example Response Body: Example of API Successful Request Result
```

## OpenAPI common parameter description

The following parameters are descriptions of the path parameters that are often used when calling the platform.

| name                             | Location | type   | Chinese name              | illustrate                                                                        |
| -------------------------------- | -------- | ------ | ------------------------- | --------------------------------------------------------------------------------- |
| team_id     | path     | string | Team ID                   | ID that identifies a team, 32-bit string                                          |
| app_id      | path     | int    | App ID                    | Identifies an application, integer                                                |
| service_id  | path     | string | component ID              | ID that identifies a component, 32-bit string                                     |
| region_name | path     | string | Cluster unique identifier | A name that identifies a cluster, unique under the enterprise, user-defined value |
| user_id     | path     | int    | User ID                   | ID that identifies a user, integer                                                |

## Parameter acquisition and interface example

Rainbond is mainly divided into four views：enterprise view, team view, application view, and component view, so Openapi documents are also organized according to this logic.

The following describes the specific request sample：

### Get the list of teams under the enterprise

```bash
curl -X GET 'http://192.168.2.225:7070/openapi/v1/teams' -H 'Authorization: <Please fill in the access token>obtained from the console here'
```

#### Example of response result

Here `tenant_id` corresponds to the value of `team_id`

```json
{
    "tenants":[
        {
            "ID":1,
            "tenant_id":"8e5a07dd37e34dd7a2a74b0a2ab29d95",
            "tenant_name":"o19p6wen",
            "tenant_alias":"admin's team",
            "is_active": true,
            "enterprise_id":"f246bce23170eeaac90d6f7b150793f0",
            "create_time":"2022-06-01T13:52:13.321196",
            "creater":"admin",
            "role_infos":[
                {
                    "role_id": "1",
                    "role_name":"Administrator"
                }
            ]
        }
    ],
    "total":1,
    "page":1,
    "page_size":10
}
```

### Get a list of clusters

```bash
curl -X GET 'http://192.168.2.225:7070/openapi/v1/regions' -H 'Authorization: <Please fill in the access token>obtained from the console here'
```

#### Example of response result

`region_name` here corresponds to the unique identifier of the cluster

```json
[
    {
        "region_id":"febc993cefe84d158b3ac245d7aa0943",
        "region_name":"test",
        "region_alias":"Self-built cluster",
        "url":"https://192.168.2.225:8443",
        "status":"1",
        "desc":"Provide host to install Kubernetes cluster and connect",
        "scope":"private",
        "ssl_ca_cert":null,
        "cert_file":null,
        "key_file" :null
    }
]
```

### Get application list

`team_id` and `region_name` Please fill in the response values obtained from the above two interfaces

```bash
curl -X GET 'http://192.168.2.225:7070/openapi/v1/teams/{team_id}/regions/{region_name}/apps' -H 'Authorization: <Please fill in the access token>obtained from the console here'
```

#### Example of response result

Here `ID` corresponds to `app_id`

```json
[
    {
        "ID":1,
        "tenant_id":"8e5a07dd37e34dd7a2a74b0a2ab29d95",
        "group_name":"Test Application",
        "region_name":"test",
        "is_default":true,
        "order_index": 0,
        "note":"",
        "username":"",
        "governance_mode":"BUILD_IN_SERVICE_MESH",
        "create_time":"2022-06-01T13:52:13.407637",
        "update_time":" 2022-06-15T15:37:51.020167",
        "app_type":"rainbond",
        "app_store_name":null,
        "app_store_url":null,
        "app_template_name":null,
        "version":null,
        " logo":"",
        "k8s_app":"app-38b4d14a"
    }
]
```

### build components

According to the above interface request example, we can continue to find the corresponding `service_id` to operate the component.Here is an example of building a componentTaking building a component as an example here

```bash
curl -X POST 'http://192.168.2.225:7070/openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/build' -H 'Authorization: <here please fill in from the console Obtained access token>'
```

#### Example of response result

```json
{
    "event_id": "5821167607ec460b89b326084fb3d1e0"
}
```
