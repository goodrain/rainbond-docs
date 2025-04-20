---
title: 重置管理员密码
description: 本文介绍如何重置 Rainbond 管理员密码
keywords:
- Rainbond 重置管理员密码
---

## 重置管理员密码

如是快速安装则需要执行 `docker exec -it rainbond bash` 进入容器内执行如下命令。

```bash
kubectl get pod -l name=rbd-app-ui -n rbd-system
kubectl exec -it rbd-app-ui-xxxxx-xxx -n rbd-system bash

执行以下命令即可修改指定用户密码。
python manage.py change_password --username=用户名 --password=新密码
```