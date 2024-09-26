---
title: Modify personal account password
---

## 基本信息

Modify personal account password

```json title="请求路径"
PUT /openapi/v1/changepwd
```

```json title="Body请求参数"
{
  "password": "stringst",
  "password1": "stringst"
}
```

## request parameters

| name | Location | type                          | required | illustrate |
| ---- | -------- | ----------------------------- | -------- | ---------- |
| body | body     | [ChangePassWd](#changepasswd) | no       | none       |

> back to example

## return result

| status code | Status code meaning | illustrate | data model                    |
| ----------- | ------------------- | ---------- | ----------------------------- |
| 200         | OK                  | success    | [ChangePassWd](#changepasswd) |

## Model

### ChangePassWd

```json
{
  "password": "stringst",
  "password1": "stringst"
}

```

### Attributes

| name      | type   | required | constraint | Chinese name | illustrate                     |
| --------- | ------ | -------- | ---------- | ------------ | ------------------------------ |
| password  | string | true     | none       | Password     | new password                   |
| password1 | string | true     | none       | Password1    | Confirm the new password again |
