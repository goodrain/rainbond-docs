---
title: Docker image support specification
description: This chapter will introduce you to Rainbond's support specification for creating components based on Docker images.
---

This chapter will take you to know the supported specifications of components created by Rainbond based on Docker images.

### Image Support Specification

Rainbond's way of creating components based on existing standards is the fastest and most compatible way.Here we will describe what images can run on Rainbond from the following aspects：这里我们将从以下几个方面描述什么镜像可以在 Rainbond 运行：

#### 不能运行的镜像

Here we first explain which images cannot be run, which is very important.

- basic system environment

The basic system images represented by`alpine` `centos` `debian` are necessary for us to make component images, but they cannot be directly run on Rainbond, why? Because they start the process is not running in the foreground by default, that is, the container will exit when it starts.Only open stdin for TTL interactive runs when running locally. 因为它们启动进程默认是非前台运行的，即容器启动则会退出。只能在本地运行时打开 stdin 进行 TTL 交互式运行。

- Basic language&tools

At present, many developers use Docker images to distribute command-line tools, such as golang compilation environment, docker compilation environment, maven compilation environment, and so on.They don't work for the same reasons as the first category.它们不能运行的原因与第一类相同。

### runnable image

In addition to the image types described above, the following types of components are recommended to be created based on：.

- middleware class

For example,`Mysql Mongo Redis Tomcat nginx`and other frequently used middle price components.

- web tools

For example`phpmyadmin`etc.

- basic component class

For example,`sFTP`component,`minio`object storage components, etc.

- Other various component images that provide TCP or UDP protocol components

### Mirror Detection Specification

- The image can be obtained normally by the Rainbond cluster server

  - The provided image name is accurate and exists in the corresponding image repository

  - For private warehouse images, please provide the account password

  - For self-built warehouses, please configure HTTPs or configure Docker trust for Rainbond cluster nodes

- Rainbond will get the following property information from the image：

  - Port, the Expose port information configured in the dockerfile will be obtained.

  - Environment variables, environment variables are the recommended custom configuration methods under cloud native, and are also recommended users of Docker image custom configuration.

  - Storage mount, the volume information configured in the dockerfile will be obtained

  > The components created by Docker compose are only obtained from the compose configuration, and the components created by docker run are obtained from the create command and image.

- Component memory allocation setting：

  The components created with the image use 512M memory allocation by default. If the components created by dockerrun or docker compose show that the memory parameters are set, the settings will prevail.

- Component deployment type setting：

  Components created from images are set to`by default for stateless deployment type`After version 5.1.3, the default setting is`for stateful deployment type` when the image name is the following value:

  - mysql
  - mariadb
  - mongo
  - redis
  - tidb
  - zookeeper
  - kafka
  - mysqldb
  - mongodb
  - memcached
  - cockroachdb
  - cockroach
  - etcd
  - postgres
  - postgresql
  - elasticsearch
  - consul
  - percona
  - mysql-server
  - mysql-cluster

  For example the following image will be deployed as stateful type：

  - mysql:latest
  - hub.example.com/xxx/mysql:5.5
  - xxx/mysql:5.7
