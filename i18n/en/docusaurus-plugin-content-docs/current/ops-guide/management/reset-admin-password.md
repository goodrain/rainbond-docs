---
title: Reset Administrator Password
description: If you forget your administrator password, reset it by referring to this document
keywords:
  - 重置 Rainbond 管理员密码
---

普通用户的密码如果忘记了，可以由企业管理员在用户管理页面中进行修改。

如果企业管理员密码忘记了且只有一个企业管理员。那就只能通过以下方式进行修改了。

1. 首先进入控制台容器的终端中。

```bash
# 控制台部署在 docker 中
docker exec -it rainbond-allinone bash

# 控制台部署在 POD 中
kubectl get pod -l name=rbd-app-ui -n rbd-system
kubectl exec -it rbd-app-ui-xxxxx-xxx -n rbd-system bash
```

2. 执行以下命令即可修改指定用户密码。

```
python manage.py change_password --username=用户名 --password=新密码
```
