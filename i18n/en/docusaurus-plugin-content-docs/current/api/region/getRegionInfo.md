---
title: Get the specified data center data
---

## basic information

Get the specified data center data

```json title="请求路径"
GET /openapi/v1/regions/{region_id}
```

## request parameters

| name                             | Location | type   | required | Chinese name | illustrate                          |
| -------------------------------- | -------- | ------ | -------- | ------------ | ----------------------------------- |
| region_id   | Path     | String | Yes      |              | none                                |
| region_id   | Query    | String | no       |              | Data center name, id                |
| extend_info | Query    | String | no       |              | Whether additional data is required |

## return result

| status code | Status code meaning | illustrate | data model                  |
| ----------- | ------------------- | ---------- | --------------------------- |
| 200         | OK                  | success    | [RegionInfoR](#regioninfor) |

## Model

### RegionInfoR

```json
{
  "region_name": "string",
  "region_alias": "string",
  "url": "string",
  "wsurl": "string",
  "httpdomain": "string",
  "tcpdomain" : "string",
  "scope": "string",
  "ssl_ca_cert": "string",
  "cert_file": "string",
  "key_file": "string",
  "desc": "string",
  "used_disk": 0,
  "total_disk": 0,
  "used_memory": 0,
  "total_memory": 0,
  "used_cpu": 0,
  "total_cpu": 0,
  "health_status": "string" ,
  "status": "string"
}

```

### Attributes

| name                                                  | type   | required | constraint | Chinese name  | illustrate           |
| ----------------------------------------------------- | ------ | -------- | ---------- | ------------- | -------------------- |
| region_name                      | String | true     | none       | Region name   | data center name     |
| region_alias                     | String | true     | none       | Region alias  | data center nickname |
| Url                                                   | String | true     | none       | Url           | none                 |
| wsurl                                                 | String | true     | none       | Wsurl         | none                 |
| pdomain                                               | String | true     | none       | Httpdain      | none                 |
| tcpdomain                                             | String | true     | none       | Tcpdomain     | none                 |
| Scope                                                 | String | true     | none       | Scope         | none                 |
| ssl_ca_cert | String | true     | none       | ssl ca cert   | none                 |
| cert_file                        | String | true     | none       | Cert file     | none                 |
| key_file                         | String | true     | none       | Key file      | none                 |
| desc                                                  | String | true     | none       | Desc          | none                 |
| used_disk                        | Number | false    | none       | Used Disk     | used storage         |
| Total_disk                       | Number | false    | none       | Total disk    | Store all            |
| used_memory                      | Number | false    | none       | Used memory   | use memory           |
| Total_memory                     | Number | false    | none       | Total memory  | All memory           |
| used_cpu                         | Number | false    | none       | used cpu      | use cpu              |
| Total_cpu                        | Number | false    | none       | total cpu     | all cpus             |
| health_status                    | String | false    | none       | health status | cluster status       |
| Status                                                | String | false    | none       | Status        | state                |