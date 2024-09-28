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
| region_id   | path     | string | Yes      |              | none                                |
| region_id   | query    | string | no       |              | Data center name, id                |
| extend_info | query    | string | no       |              | Whether additional data is required |

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
| region_name                      | string | true     | none       | Region name   | data center name     |
| region_alias                     | string | true     | none       | Region alias  | data center nickname |
| url                                                   | string | true     | none       | Url           | none                 |
| wsurl                                                 | string | true     | none       | Wsurl         | none                 |
| httpdomain                                            | string | true     | none       | Httpdomain    | none                 |
| tcpdomain                                             | string | true     | none       | Tcpdomain     | none                 |
| scope                                                 | string | true     | none       | Scope         | none                 |
| ssl_ca_cert | string | true     | none       | ssl ca cert   | none                 |
| cert_file                        | string | true     | none       | Cert file     | none                 |
| key_file                         | string | true     | none       | Key file      | none                 |
| desc                                                  | string | true     | none       | Desc          | none                 |
| used_disk                        | number | false    | none       | Used disk     | used storage         |
| total_disk                       | number | false    | none       | Total disk    | Store all            |
| used_memory                      | number | false    | none       | Used memory   | use memory           |
| total_memory                     | number | false    | none       | Total memory  | All memory           |
| used_cpu                         | number | false    | none       | used cpu      | use cpu              |
| total_cpu                        | number | false    | none       | total cpu     | all cpus             |
| health_status                    | string | false    | none       | health status | cluster status       |
| status                                                | string | false    | none       | Status        | state                |
