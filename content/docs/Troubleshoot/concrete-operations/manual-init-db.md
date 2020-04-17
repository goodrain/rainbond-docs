---
title: 手动初始化数据库
weight: 30007
Description: "集群初始化数据库失败后的手动操作"
hidden: true
---

### 使用 rbd-db 时

Rainbond默认安装指定的数据库运行于 `rbd-db` 容器内。当用户需要手动初始化数据库时，需要在首个管理节点执行：

```bash
systemctl stop node
systemctl stop rbd-db 
rm -rf /opt/rainbond/data/mysql/
systemctl start node
/opt/rainbond/.init/updatedb.sh prepare
/opt/rainbond/.init/updatedb.sh migrate
/opt/rainbond/.init/updatedb.sh config
``` 

### 使用外部数据库时

Rainbond提供方式指定外部数据库用于存储集群元数据。当需要手动初始化数据库时，需要在外部数据库执行：

- 手动将外部数据库中的 console 与 region 数据库删除

- 在首个管理节点执行：

```bash
/opt/rainbond/.init/updatedb.sh prepare
/opt/rainbond/.init/updatedb.sh migrate
/opt/rainbond/.init/updatedb.sh config
```