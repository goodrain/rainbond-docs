--- 
title: 部署Rainbond UI
summary: 部署Rainbond UI
toc: true 
---

## 一、部署云帮UI

```bash
cat > /opt/rainbond/compose/ui.yaml <<EOF
version: '2.1'
services:
  rbd-app-ui:
    image: rainbond/rbd-app-ui:3.6
    container_name: rbd-app-ui
    environment:
      MANAGE_SECRET_KEY: <随机字符串token>
      MYSQL_HOST: <数据库地址>
      MYSQL_PORT: <数据库端口>
      MYSQL_USER: <数据库用户>
      MYSQL_PASS: <数据库密码>
      MYSQL_DB: console
    volumes:
    - /grdata/services/console:/data
    - /opt/rainbond/logs/rbd-app-ui/goodrain.log:/tmp/goodrain.log
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
EOF

dc-compose up -d rbd-app-ui
```

## 二、更新数据库

```bash
docker exec rbd-app-ui python /app/ui/manage.py migrate
din rbd-db 
cat > /root/init.sql <<EOF
INSERT INTO `console_sys_config` (`ID`,`key`,`type`, `value`, `desc`, `enable`, `create_time`) VALUES(NULL, 'REGION_SERVICE_API', 'json', '  [{\"url\": \"http://region.goodrain.me:8888\", \"token\": null, \"enable\": true, \"region_name\": \"rainbond\", \"region_alias\": \"rainbond\"}]', '', 1, '2018-02-05 14:00:00.000000');
EOF
cat > /root/region.sql <<EOF
INSERT INTO `region_info` ( `region_id`, `region_name`, `region_alias`, `url`, `token`, `status`, `desc`, `wsurl`, `httpdomain`, `tcpdomain`, `scope`) VALUES('rainbond_defalut_id', 'rainbond', '私有数据中心1', 'http://region.goodrain.me:8888', NULL, '1', '当前数据中心是默认安装添加的数据中心', 'ws://172.17.119.104:6060', '042ff9.grapps.cn', '172.17.119.104', 'private');
EOF
mysql
# sql语句
use console;
truncate table console_sys_config;
source /root/init.sql;
source /root/region.sql;
```

## 三、访问控制台

控制台地址 http://<>:7070
默认第一个注册用户是平台管理员。
