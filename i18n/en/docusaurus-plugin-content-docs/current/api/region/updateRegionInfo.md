---
title: Update specified data center metadata
---

## basic information

Update specified data center metadata

```json title="请求路径"
PUT /openapi/v2/manage/regions/{region_id}
```

```json title="Body请求参数"
{
  "region_alias": "string",
  "url": "string",
  "token": "string",
  "wsurl": "string",
  "httpdomain": "string",
  "tcpdomain" : "string",
  "scope": "string",
  "ssl_ca_cert": "string",
  "cert_file": "string",
  "key_file": "string",
  "status": "st",
  "desc": "string"
}

```

## request parameters

| name                           | Location | type                                | required | Chinese name | illustrate |
| ------------------------------ | -------- | ----------------------------------- | -------- | ------------ | ---------- |
| region_id | path     | string                              | Yes      |              | none       |
| body                           | body     | [UpdateRegionReq](#updateregionreq) | no       |              | none       |

> back to example

## return result

| status code | Status code meaning                                              | illustrate | data model                                                               |
| ----------- | ---------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| 200         | OK                                                               | success    | [v2_RegionInfoSerializer](#v2_regioninfoserializer) |
| 400         | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | 400        | [Fail](#schemafail)                                                      |
| 404         | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | 404        | [Fail](#schemafail)                                                      |

## Model

### UpdateRegionReq

```json
{
  "region_alias": "string",
  "url": "string",
  "token": "string",
  "wsurl": "string",
  "httpdomain": "string",
  "tcpdomain" : "string",
  "scope": "string",
  "ssl_ca_cert": "string",
  "cert_file": "string",
  "key_file": "string",
  "status": "st",
  "desc": "string"
}
```

### Attributes

| name                                                  | type        | required | constraint | Chinese name | illustrate                                                                                           |        |
| ----------------------------------------------------- | ----------- | -------- | ---------- | ------------ | ---------------------------------------------------------------------------------------------------- | ------ |
| region_alias                     | string      | true     | none       | Region alias | data center alias                                                                                    |        |
| url                                                   | string      | true     | none       | Url          | Datacenter API url                                                                                   |        |
| token                                                 | string¦null | false    | none       | Token        | data center token                                                                                    |        |
| wsurl                                                 | string      | true     | none       | Wsurl        | datacenter websocket url                                                                             |        |
| httpdomain                                            | string      | true     | none       | Httpdomain   | Data center http application access root domain name                                                 |        |
| tcpdomain                                             | string      | true     | none       | Tcpdomain    | Data center tcp application access root domain name                                                  |        |
| scope                                                 | string      | false    | none       | Scope        | data center scope private                                                                            | public |
| ssl_ca_cert | string¦null | false    | none       | ssl ca cert  | Data center access ca certificate address                                                            |        |
| cert_file                        | string¦null | false    | none       | Cert file    | Verify documents                                                                                     |        |
| key_file                         | string¦null | false    | none       | Key file     | verification key                                                                                     |        |
| status                                                | string      | true     | none       | Status       | Data Center Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |        |
| desc                                                  | string      | false    | none       | Desc         | Data Center Description                                                                              |        |

### v2_RegionInfoSerializer

```json
{
  "region_id": "string",
  "region_name": "string",
  "region_alias": "string",
  "url": "string",
  "token": "string",
  "wsurl" : "string",
  "httpdomain": "string",
  "tcpdomain": "string",
  "scope": "string",
  "ssl_ca_cert": "string",
  "cert_file": "string",
  "key_file": "string",
  "status": "st",
  "desc": "string"
}

```

### Attributes

| name                                                  | type        | required | constraint | Chinese name | illustrate                                                                                           |        |
| ----------------------------------------------------- | ----------- | -------- | ---------- | ------------ | ---------------------------------------------------------------------------------------------------- | ------ |
| region_id                        | string      | true     | none       | Region id    | region id                                                                                            |        |
| region_name                      | string      | true     | none       | Region name  | Data center name, cannot be modified                                                                 |        |
| region_alias                     | string      | true     | none       | Region alias | data center alias                                                                                    |        |
| url                                                   | string      | true     | none       | Url          | Datacenter API url                                                                                   |        |
| token                                                 | string¦null | false    | none       | Token        | data center token                                                                                    |        |
| wsurl                                                 | string      | true     | none       | Wsurl        | datacenter websocket url                                                                             |        |
| httpdomain                                            | string      | true     | none       | Httpdomain   | Data center http application access root domain name                                                 |        |
| tcpdomain                                             | string      | true     | none       | Tcpdomain    | Data center tcp application access root domain name                                                  |        |
| scope                                                 | string      | false    | none       | Scope        | data center scope private                                                                            | public |
| ssl_ca_cert | string¦null | false    | none       | ssl ca cert  | Data center access ca certificate address                                                            |        |
| cert_file                        | string¦null | false    | none       | Cert file    | Verify documents                                                                                     |        |
| key_file                         | string¦null | false    | none       | Key file     | verification key                                                                                     |        |
| status                                                | string      | true     | none       | Status       | Data Center Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |        |
| desc                                                  | string      | false    | none       | Desc         | Data Center Description                                                                              |        |
