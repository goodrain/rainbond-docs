---
title: Migrate rbd-db data to an external database
weight: 1007
description: Migrate data from the platform's default data storage center rbd-db to an external database
---

### Steps

#### Optional, deploy external database via docker


- Database node install and start docker

  ```bash
  export VERSION=19.03 && curl -fsSL https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/releases/docker/install-docker.sh | bash -s docker
  systemctl start docker
  ```

- run database

  ```bash
  mkdir -p /opt/rainbond/rbd-db/data/ && docker run --name rbd-db -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" -v /opt/rainbond/rbd-db/data:/ var/lib/mysql -i registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-db:8.0.19
  ```
> <font color="#dd0000">Note：Do not continue to operate on the platform after data backup to avoid data inconsistency</font><br />

### Migrate data

- Get the original database password

  ```bash
  kubectl exec -it -n rbd-system rbd-db-0 --env|grep MYSQL_ROOT_PASSWORD
  ```

- After substituting the variable `MYSQL_ROOT_PASSWORD` , back up the database and confirm that the data is complete

  ```bash
  kubectl exec -it rbd-db-0 -n rbd-system --mysqldump -p$MYSQL_ROOT_PASSWORD --all-databases > all.sql && cat all.sql
  ```


- View rbd-db service container

  ```bash
  docker ps | grep rbd-db
  ```

- Copy the database backup file to the container

  ```bash
  docker cp /tmp/all.sql rbd-db:/tmp
  ```

- into the container

  ```bash
  docker exec -it rbd-db mysql
  ```

- Import Data

  ```bash
  source /tmp/all.sql;
  ```

- restart the database

  ```bash
  docker rm -f rbd-db && docker run --name rbd-db -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" -v /opt/rainbond/rbd-db/data:/var/lib/mysql -i registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-db:8.0.19
  ```

#### Modify database connection address

> The rbd-app-ui configuration needs to be modified on the first management node

- Because the data has been imported, just modify the IP that points to the database host

  Modify the connection address of the rbd-app-ui component

```bash
kubectl edit -n rbd-system rbdcomponents.rainbond.io rbd-app-ui

spec:
  env:
  - name: MYSQL_HOST
    value: 172.24.206.27
```

Modify the database connection parameters of the rbd-api component

```bash
kubectl edit -n rbd-system rbdcomponents.rainbond.io rbd-api

spec:
  args:
  - --mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

Modify the database connection parameters of the rbd-chaos component

```bash
kubectl edit -n rbd-system rbdcomponents.rainbond.io rbd-chaos

spec:
  args:
  - --mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

Modify the connection address of the rbd-worker component

```bash
kubectl edit -n rbd-system rbdcomponents.rainbond.io rbd-worker

spec:
  args:
  - --mysql=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

Modify the connection address of the rbd-eventlog component

```bash
kubectl edit -n rbd-system rbdcomponents.rainbond.io rbd-eventlog

spec:
  args:
  - --db.url=mysql_user:mysql_pass@tcp(mysql_host:mysql_port)/region
```

Finally check the cluster status

```bash
kubectl get pod -n rbd-system
```
Log in to the platform to view the application status

#### After the data migration is completed, stop the rbd-db service, and complete the data migration here.