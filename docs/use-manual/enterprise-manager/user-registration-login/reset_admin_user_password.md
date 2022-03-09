---
title: 重置管理员密码
description: 忘记管理员密码，重置密码，重置管理员密码参考本文档
# tags: 忘记管理员密码，重置密码，重置管理员密码
# wight: 24
---

普通用户的密码如果忘记了，可以由企业管理员在用户管理页面中进行修改。

如果企业管理员密码忘记了且只有一个企业管理员。那就只能通过以下方式进行修改了。

- 首先进入控制台容器的终端中。

  docker run 部署的控制台，通过`docker exec`命令进入。Rainbond 上部署的控制台，先寻找到控制台 Pod，然后通过 `kubectl exec` 命令进入。

- 执行以下命令即可修改指定用户密码。

```
python manage.py change_password --username=用户名 --password=新密码
```
