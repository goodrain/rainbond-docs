---
title: 多数据中心部署
summary: 介绍多数据中心部署方式
toc: false
---

多数据中心即在多区域多机房部署云帮环境,本文已经默认安装了两套云帮环境。

```
# 数据中心A
MariaDB [console]> select * from region_info\G;
*************************** 1. row ***************************
          ID: 1
   region_id: asdasdasdasdasdasdasdasdas
 region_name: rainbond
region_alias: 私有数据中心1
         url: http://region.goodrain.me:8888
       wsurl: ws://47.94.3.130:6060
  httpdomain: cc10df.grapps.cn
   tcpdomain: 47.94.3.130
       token: NULL
      status: 1
 create_time: 0000-00-00 00:00:00.000000
        desc: 当前数据中心是默认安装添加的数据中心
       scope: private
 ssl_ca_cert: /etc/goodrain/region.goodrain.me/ssl/ca.pem
   cert_file: /etc/goodrain/region.goodrain.me/ssl/client.pem
    key_file: /etc/goodrain/region.goodrain.me/ssl/client.key.pem
1 row in set (0.00 sec)

# 数据中心B
MariaDB [console]> select * from region_info\G;
*************************** 1. row ***************************
          ID: 1
   region_id: asdasdasdasdasdasdasdasdas
 region_name: rainbond
region_alias: 私有数据中心1
         url: http://region.goodrain.me:8888
       wsurl: ws://47.93.103.244:6060
  httpdomain: 034212.grapps.cn
   tcpdomain: 47.93.103.244
       token: NULL
      status: 1
 create_time: 0000-00-00 00:00:00.000000
        desc: 当前数据中心是默认安装添加的数据中心
       scope: private
 ssl_ca_cert: /etc/goodrain/region.goodrain.me/ssl/ca.pem
   cert_file: /etc/goodrain/region.goodrain.me/ssl/client.pem
    key_file: /etc/goodrain/region.goodrain.me/ssl/client.key.pem
1 row in set (0.00 sec)
```


```bash

```

在A数据中心

```bash
export IP=47.93.103.244
export DOMAIN=034212.grapps.cn
cat > /tmp/region_info.sql <<EOF
INSERT INTO \`region_info\` ( \`region_id\`, \`region_name\`, \`region_alias\`, \`url\`, \`token\`, \`status\`, \`desc\`, \`wsurl\`, \`httpdomain\`, \`tcpdomain\`, \`scope\`, \`ssl_ca_cert\`,\`cert_file\`,\`key_file\`) VALUES('asdasdasdasdasdasdasdasdas', 'rainbond2', '私有数据中心2', 'http://region.goodrain.me:8888', NULL, '1', '当前数据中心是默认安装添加的数据中心', 'ws://$IP:6060', '$DOMAIN', '$IP', 'private','/etc/goodrain/region.goodrain.me/ssl/ca.pem','/etc/goodrain/region.goodrain.me/ssl/client.pem','/etc/goodrain/region.goodrain.me/ssl/client.key.pem');
EOF

docker cp /tmp/region_info.sql rbd-db:/root/ri.sql
din rbd-db
mysql
use console;
source /root/ri.sql;
```
