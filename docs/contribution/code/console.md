---
title: 控制台贡献指南
description: 该文档介绍如何为 Rainbond 控制台项目做出贡献。
---
## 本地化开发

### 前提条件

- MYSQL 数据库
- Python 3.6.5

### 启动项目

1. 安装依赖，建议采用 virtualenv 管理项目依赖，命令如下

```bash
python3.6 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. 环境变量配置，以下环境变量都需要导入到终端后，再执行启动项目的命令

| 变量名 | 说明                           | 示例 |
| --- |------------------------------| --- |
| `DB_TYPE` | 数据库类型，默认为sqlite，使用mysql需显式指定 | mysql |
| `DJANGO_SETTINGS_MODULE` | Django 配置文件                  | goodrain_web.settings |
| `MYSQL_DB` | 数据库名称                        | console |
| `MYSQL_HOST` | 数据库地址                        | 192.168.1.1 |
| `MYSQL_PASS` | 数据库密码                        | 123456 |
| `MYSQL_PORT` | 数据库端口                        | 3306 |
| `MYSQL_USER` | 数据库用户名                       | root |

3. 启动项目

对于已经初始化过的数据库，可以直接启动项目：

```bash
python3 manage.py runserver
```

未初始化过的数据库，需要先执行数据库迁移后再进行启动：

```bash
python3 manage.py makemigrations www
python3 manage.py makemigrations console
python3 manage.py migrate

python3 manage.py runserver
```

## 业务层代码编译

### 前提条件

- 需要有 docker 环境

### 编译前端代码镜像

(1) 克隆项目

```bash
git clone https://github.com/goodrain/rainbond-ui.git
```

(2) 编译项目

`VERSION` 指定构建完镜像的 tag，前端打包出的镜像将作为后端代码的基础镜像。

```
VERSION=v5.5.0-release ./build.sh
```

### 源码编译后端代码镜像

(1) 克隆项目

```bash
git clone https://github.com/goodrain/rainbond-console.git
```

(2) 编译项目

`VERSION` 指定构建完镜像的 tag，由于前端代码的镜像为基础镜像，因此该处应与前端项目的 tag 保持一致。请使用如下命令将前后端代码编译在一起，形成最终可直接运行的 allinone 镜像。

```
VERSION=v5.5.0-release ./release.sh allinone
```

### 运行业务层镜像

当编译完成 allinone 镜像后，你可以参考如下命令，将最后一行的镜像名替换为你打包的镜像名后，运行该镜像。

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
rainbond/rainbond:v5.5.0-release-allinone
```

镜像运行起来后，访问机器的 7070 端口，即可进入 Rainbond 控制台。
