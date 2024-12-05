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
| Query    | Query    | String | no       |              | Search by data center name |
| Current  | Query    | String | no       |              | page number                |
| pageSize | Query    | String | no       |              | Quantity per page          |

## return result

| status code | Status code meaning | illustrate | data model                        |
| ----------- | ------------------- | ---------- | --------------------------------- |
| 200         | OK                  | success    | [ListRegionsResp](#listregionres) |

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

| name  | type                                                                                                  | required | constraint | Chinese name | illustrate |
| ----- | ----------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| Total | integer                                                                                               | true     | none       | Total        | Total      |
| Data  | [[RegionInfoAndStatusResp](#regioninfoandstatus)] | true     | none       |              | none       |

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
| region_id                        | String                                                       | true     | none       | Region id        | region id                                                                                        |
| Enterprise_id                    | String                                                       | true     | none       | Enterprise id    | Enterprise ID                                                                                    |
| Enterprise_alias                 | String                                                       | true     | none       | Enterprise alias | business alias                                                                                   |
| region_name                      | String                                                       | true     | none       | Region name      | cluster name                                                                                     |
| region_alias                     | String                                                       | true     | none       | Region alias     | cluster alias                                                                                    |
| region_type                      | [string] | true     | none       |                  | Cluster type                                                                                     |
| Url                                                   | String                                                       | true     | none       | Url              | Cluster API url                                                                                  |
| wsurl                                                 | String                                                       | true     | none       | Wsurl            | cluster websocket url                                                                            |
| pdomain                                               | String                                                       | true     | none       | Httpdain         | Cluster http application access root domain name                                                 |
| tcpdomain                                             | String                                                       | true     | none       | Tcpdomain        | Cluster tcp application access root domain name                                                  |
| Status                                                | String                                                       | true     | none       | Status           | Cluster Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |
| desc                                                  | String                                                       | true     | none       | Desc             | Cluster description                                                                              |
| ssl_ca_cert | String                                                       | true     | none       | ssl ca cert      | api ca file                                                                                      |
| cert_file                        | String                                                       | true     | none       | Cert file        | api cert file                                                                                    |
| key_file                         | String                                                       | true     | none       | Key file         | api cert key file                                                                                |
| Total_memory                     | integer                                                      | true     | none       | Total memory     | Sum of scheduling memory MB                                                                      |
| used_memory                      | integer                                                      | true     | none       | Used memory      | Scheduling memory usage MB                                                                       |
| Total_cpu                        | integer                                                      | true     | none       | total cpu        | Scheduling CPU Sum                                                                               |
| used_cpu                         | Number                                                       | true     | none       | used cpu         | Schedule CPU usage                                                                               |
| Total_disk                       | integer                                                      | true     | none       | Total disk       | Total GB of global shared storage                                                                |
| used_disk                        | integer                                                      | true     | none       | Used Disk        | Global Shared Storage Usage GB                                                                   |
| rbd_version                      | String                                                       | true     | none       | Rbd version      | Cluster version                                                                                  |
