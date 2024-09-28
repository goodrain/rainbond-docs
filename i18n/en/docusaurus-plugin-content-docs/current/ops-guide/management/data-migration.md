---
title: rbd-db data is migrated to an external database
weight: 1007
description: Migrate data from the platform's default data storage center, rbd-db, to an external database
---

### Action step

#### Optional, deploy external database via docker

- Database node installation and launch docker

  ```bash
  export VERSION=19.03 && curl -fsSL https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/releases/docker/install-docker.sh | bash-s docker
  systemctl start docker
  ```

- Run database

  ```bash
  mkdir - p /opt/rainbond/rbd-db/data/ && docker run --name rbd-db -p 3306:3306-e MYSQL_ALLOW_EMPTY_PASSSWORD="yes" -v /opt/rainbond/rbd-db/data:/var/lib/mysql -i registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-db:8.0.19
  ```

> <font color="#dd0000">Note that after backup of：data do not continue operations on the platform, lest the data do not match</font><br />

### Migration data

- Gets the original database password

  ```bash
  kubtl exec -it -n rbd-system rbd-db-0 -- env|grep MYSQL_ROOT_PASSWORD
  ```

- Replace `MYSQL_ROOT_PASSWORD` with `MYSQL_ROOT_PASSWORD` to backup the database and confirm the complete data

  ```bash
  kubectl exec  -it  rbd-db-0 -n rbd-system  --  mysqldump -p$MYSQL_ROOT_PASSWORD --all-databases > all.sql && cat all.sql
  ```

- View rbd-db service container

  ```bash
  docker | grep rbd-db
  ```

- Copy database backup file to container

  ```bash
  docker cp /tmp/all.sql rbd-db:/tmp
  ```

- Enter Container

  ```bash
  docker exec -it rbd-db mysql
  ```

- Import Data

  ```bash
  source /tmp/all.sql;
  ```

- Restart database

  ```bash
  docker rm -f rbd-db && docker run --name rbd-db -p 3306:3306-e MYSQL_ALLOW_EMPTY_PASSWORD="yes" -v opt/rainbond/rbd-db/data:/var/lib/mysql -i registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-db:8.0.19
  ```

#### Modify database connection address

> The rbd-app-ui configuration needs to be modified at the first admin node

- Just modify the IP sufficient for the database host because the data has been imported

  Modify the rbd-app-ui component connection address

```bash
kubtl edit - n rbd-system rbdcomponents.rainbond.io rbd-app-ui

spec:
  env:
  - name: MYSQL_HOST
    value: 172.24.206.27
```

Modify the rbd-api component database connection parameter

```bash
kubtl edit - n rbd-system rbdcomponents.rainbon.io rbd-api

spec:
  args:
  - ----mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

Edit rbd-chaos component database connection parameter

```bash
kubtl edit - n rbd-system rbdcomponents.rainbond.io rbd-chaos

spec:
  args:
  - ---mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

Modify the rbd-worker component connection address

```bash
kubtl edit - n rbd-system rbdcomponents.rainbond.io rbd-worker

spec:
  args:
  - ---mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

Modify the rbd-eventlog component connection address

```bash
kubtl edit - n rbd-system rbdcomponents.rainbond.io rbd-eventlog

spec:
  args:
  - --db.url=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

Last view cluster status

```bash
kubtl get pod -n rbd-system
```

Login platform to view app status

#### Data migration stopped rbd-db service, so data migration finished
