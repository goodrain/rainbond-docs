---
title: "创建应用提示Table 'region.tenants' doesn't exist"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 807
hidden: true
description: 创建应用提示Table 'region.tenants' doesn't exist
---

错误信息如下:

```bash
CallApiError: {"url": "https://region.goodrain.me:8443/v2/resources/tenants", "body": {"msg": "get resources error, Error 1146: Table 'region.tenants' doesn't exist"}, "httpcode": 500, "method": "POST", "apitype": "Not specified"}
```

#### 排查方式

> 外部数据库类似.

1. 检查数据库是否有相关表 `docker exec rbd-db mysql -e "use region;show tables;"`
2. 重建数据库相关表

```
docker exec rbd-db mysql -e "drop database console;drop database region;"
/opt/rainbond/.init/updatedb.sh prepare
docker exec rbd-app-ui python /app/ui/manage.py migrate
docker cp /opt/rainbond/.init/init.sql rbd-db:/root
docker cp /opt/rainbond/.init/region_info.sql rbd-db:/root
docker exec rbd-db mysql -e "use console;truncate table console_sys_config"
docker exec rbd-db mysql -e "use console;source /root/init.sql;"
docker exec rbd-db mysql -e "use console;source /root/region_info.sql;"
systemctl restart rbd-api
```