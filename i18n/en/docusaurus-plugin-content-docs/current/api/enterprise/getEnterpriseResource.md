---
title: Obtain information about enterprise usage resources
---

## 基本信息

Obtain information about enterprise usage resources

```json title="请求路径"
GET /openapi/v2/manage/enterprises/{eid}/resource
```

## request parameters

| name | Location | type   | required | illustrate |
| ---- | -------- | ------ | -------- | ---------- |
| eid  | path     | string | Yes      | none       |

## return result

| status code | Status code meaning | illustrate | data model                            |
| ----------- | ------------------- | ---------- | ------------------------------------- |
| 200         | OK                  | success    | [EnterpriseSource](#enterprisesource) |

## Model

### EnterpriseSource

```json
{
  "enterprise_id": "string",
  "used_cpu": 0,
  "used_memory": 0,
  "used_disk": 0
}

```

### Attributes

| name                               | type   | required | constraint | Chinese name  | illustrate                                            |
| ---------------------------------- | ------ | -------- | ---------- | ------------- | ----------------------------------------------------- |
| enterprise_id | string | true     | none       | Enterprise id | Enterprise ID (Federated Cloud ID) |
| used_cpu      | number | true     | none       | cpu used      | used cpu                                              |
| used_memory   | number | true     | none       | Used memory   | memory used                                           |
| used_disk     | number | true     | none       | Used disk     | used storage                                          |
