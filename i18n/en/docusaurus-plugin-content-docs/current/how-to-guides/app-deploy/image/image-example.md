---
title: Container Image Support Specification
description: Detailed introduction to Rainbond's support specifications and best practices for creating components based on Docker images
keywords:
  - Docker Image Deployment
  - Rainbond Image Specification
  - Containerized Applications
---

This document details Rainbond's support specifications for creating components based on Docker images, helping you understand which types of images are suitable for running on the Rainbond platform and how to correctly configure images for the best experience.

## Image Type Support Description

Rainbond supports most standard Docker images, but there are some specific types of images that are not suitable for direct operation on the platform.Understanding these differences is crucial for successful application deployment.

### Image Types Not Supported for Direct Operation

The following types of images cannot be directly operated on Rainbond:

1. **Basic System Images**: Such as: `alpine`, `centos`, `debian` and other basic system images. The startup process of these images is not foreground by default, and the container will exit immediately after startup.They are usually only used for local runtime to open stdin for TTL interactive operations and are not suitable as long-running services.

2. **Basic Language Environment and Tool Images**: Such as: golang compilation environment, docker compilation environment, maven compilation environment, etc. These images are mainly used for the build and compilation process, not for running actual services.They usually exit after completing specific tasks and are not suitable as continuously running applications.

:::caution Note
Do not directly use basic system images to create components. You should build images containing actual application services on this basis.
:::

### Recommended Image Types

The following types of images are very suitable for running on the Rainbond platform:

**Middleware Class**

- Databases: MySQL, MongoDB, Redis
- Web Servers: Tomcat, Nginx, Apache
- Message Queues: RabbitMQ, Kafka

**Web Tools Class**

- phpMyAdmin, Adminer, Grafana, etc

**Basic Components Class**

- SFTP components, MinIO object storage, etc

**Other Components Providing TCP/UDP Services**

- All containerized applications designed for long-term operation and providing network services.

## Image Detection and Configuration Specifications

### Image Accessibility Requirements

- The image must be able to be normally obtained by the Rainbond cluster server
- The image name must be accurate and exist in the corresponding image repository
- Private repository images need to provide correct account and password
- Self-built repositories should configure HTTPS or configure Docker trust settings for Rainbond cluster nodes

### Image Attributes Automatically Obtained by Rainbond

Rainbond will automatically extract the following information from the image:

1. **Port Information**: Obtained from the `EXPOSE` instruction in Dockerfile
2. **Environment Variables**: As the recommended configuration method for cloud-native applications
3. **Storage Mounts**: Obtained from the `VOLUME` instruction in Dockerfile

:::info
Components created using Docker Compose only obtain relevant information from the compose configuration, while components created with the docker run command obtain information from both the creation command and the image.
:::

### Default Component Configuration Settings

#### Memory Allocation

- Default allocation: <b>512</b>MB memory
- Exception: When created via docker run or docker compose, if memory parameters are explicitly set, the set value will be adopted

#### Deployment Type Settings

- Default setting: Stateless deployment type
- Exception: The following image names will automatically be set to stateful deployment type

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

  For example, the following images will be deployed as stateful types:

  - mysql:latest
  - hub.example.com/xxx/mysql:5.5
  - xxx/mysql:5.7
