---
title: Obtain information about enterprise usage resources
---

## Basic Information

Obtain information about enterprise usage resources

```json title="请求路径"
GET /openapi/v2/manage/enterprises/{eid}/resource
```

## request parameters

| name | Location | type   | required | illustrate |
| ---- | -------- | ------ | -------- | ---------- |
| eid  | Path     | String | Yes      | none       |

## return result

| status code | Status code meaning | illustrate | data model                       |
| ----------- | ------------------- | ---------- | -------------------------------- |
| 200         | OK                  | success    | [EnterpriseSource](#enterprises) |

## Model

### Enterprise Source

```json
LO
  "enterprise_id": "string",
  "used_cpu": 0,
  "used_memory": 0,
  "used_disk": 0
}

```

### Attributes

| name                               | type   | required | constraint | Chinese name  | illustrate                                            |
| ---------------------------------- | ------ | -------- | ---------- | ------------- | ----------------------------------------------------- |
| Enterprise_id | String | true     | none       | Enterprise id | Enterprise ID (Federated Cloud ID) |
| used_cpu      | Number | true     | none       | cpu used      | used cpu                                              |
| used_memory   | Number | true     | none       | Used memory   | memory used                                           |
| used_disk     | Number | true     | none       | Used Disk     | used storage                                          |
