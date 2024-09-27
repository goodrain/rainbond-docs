---
title: Get all data center list v2
---

## basic information

Get a list of all data centers

```json title="请求路径"
GET /openapi/v2/manage/regions
```

## request parameters

| name     | Location | type   | required | Chinese name | illustrate                 |
| -------- | -------- | ------ | -------- | ------------ | -------------------------- |
| query    | query    | string | no       |              | Search by data center name |
| current  | query    | string | no       |              | page number                |
| pageSize | query    | string | no       |              | Quantity per page          |

## return result

| status code | Status code meaning | illustrate | data model                          |
| ----------- | ------------------- | ---------- | ----------------------------------- |
| 200         | OK                  | success    | [ListRegionsResp](#listregionsresp) |

## Model

### ListRegionsResp

```json
{
  "total": 0,
  "data": [
    {
      "region_id": "string",
      "enterprise_id": "string",
      "enterprise_alias": "string",
      "region_name": "string ",
      "region_alias": "string",
      "region_type": [
        "string"
      ],
      "url": "string",
      "wsurl": "string",
      "httpdomain": "string" ,
      "tcpdomain": "string",
      "status": "st",
      "desc": "string",
      "ssl_ca_cert": "string",
      "cert_file": "string",
      "key_file" : "string",
      "total_memory": 0,
      "used_memory": 0,
      "total_cpu": 0,
      "used_cpu": 0,
      "total_disk": 0,
      "used_disk": 0,
      "rbd_version ": "string"
    }
  ]
}

```

### Attributes

| name  | type                                                                                                      | required | constraint | Chinese name | illustrate |
| ----- | --------------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| total | integer                                                                                                   | true     | none       | Total        | Total      |
| data  | [[RegionInfoAndStatusResp](#regioninfoandstatusresp)] | true     | none       |              | none       |

### RegionInfoAndStatusResp

```json
{
  "region_id": "string",
  "enterprise_id": "string",
  "enterprise_alias": "string",
  "region_name": "string",
  "region_alias": "string",
  "region_type" : [
    "string"
  ],
  "url": "string",
  "wsurl": "string",
  "httpdomain": "string",
  "tcpdomain": "string",
  "status": "st",
  "desc": "string",
  "ssl_ca_cert": "string",
  "cert_file": "string",
  "key_file": "string",
  "total_memory": 0,
  "used_memory ": 0,
  "total_cpu": 0,
  "used_cpu": 0,
  "total_disk": 0,
  "used_disk": 0,
  "rbd_version": "string"
}

```

### Attributes

| name                                                  | type                                                         | required | constraint | Chinese name     | illustrate                                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------ | -------- | ---------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| region_id                        | string                                                       | true     | none       | Region id        | region id                                                                                        |
| enterprise_id                    | string                                                       | true     | none       | Enterprise id    | Enterprise ID                                                                                    |
| enterprise_alias                 | string                                                       | true     | none       | Enterprise alias | business alias                                                                                   |
| region_name                      | string                                                       | true     | none       | Region name      | cluster name                                                                                     |
| region_alias                     | string                                                       | true     | none       | Region alias     | cluster alias                                                                                    |
| region_type                      | [string] | true     | none       |                  | Cluster type                                                                                     |
| url                                                   | string                                                       | true     | none       | Url              | Cluster API url                                                                                  |
| wsurl                                                 | string                                                       | true     | none       | Wsurl            | cluster websocket url                                                                            |
| httpdomain                                            | string                                                       | true     | none       | Httpdomain       | Cluster http application access root domain name                                                 |
| tcpdomain                                             | string                                                       | true     | none       | Tcpdomain        | Cluster tcp application access root domain name                                                  |
| status                                                | string                                                       | true     | none       | Status           | Cluster Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |
| desc                                                  | string                                                       | true     | none       | Desc             | Cluster description                                                                              |
| ssl_ca_cert | string                                                       | true     | none       | ssl ca cert      | ssl ca cert                                                                                      |
| cert_file                        | string                                                       | true     | none       | Cert file        | api cert file                                                                                    |
| key_file                         | string                                                       | true     | none       | Key file         | api cert key file                                                                                |
| total_memory                     | integer                                                      | true     | none       | Total memory     | Sum of scheduling memory MB                                                                      |
| used_memory                      | integer                                                      | true     | none       | Used memory      | Scheduling memory usage MB                                                                       |
| total_cpu                        | integer                                                      | true     | none       | total cpu        | Scheduling CPU Sum                                                                               |
| used_cpu                         | number                                                       | true     | none       | used cpu         | Schedule CPU usage                                                                               |
| total_disk                       | integer                                                      | true     | none       | Total disk       | Total GB of global shared storage                                                                |
| used_disk                        | integer                                                      | true     | none       | Used disk        | Global Shared Storage Usage GB                                                                   |
| rbd_version                      | string                                                       | true     | none       | Rbd version      | Cluster version                                                                                  |
