---
title: Modify personal account password
---

## Basic Information

Modify personal account password

```json title="请求路径"
PUT/openapi/v1/changewd
```

```json title="Body请求参数"
LO
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
LO
  "password": "stringst",
  "password1": "stringst"
}

```

### Attributes

| name      | type   | required | constraint | Chinese name | illustrate                     |
| --------- | ------ | -------- | ---------- | ------------ | ------------------------------ |
| password  | String | true     | none       | Password     | new password                   |
| password1 | String | true     | none       | Password1    | Confirm the new password again |