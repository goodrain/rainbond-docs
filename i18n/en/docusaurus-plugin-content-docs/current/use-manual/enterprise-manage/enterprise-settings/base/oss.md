---
title: object storage
description: Introduce object storage related configuration
---

## Features

Supports standard S3 storage and Alibaba Cloud Object Storage.

Object storage is used for cloud backup functions to store application backup files.

## Applicable scene

With object storage configured, in-app backups can use cloud backup.

Cloud backup can be used to migrate applications and backup data.
## Operating procedures

1. Go to`Enterprise View`-->`Settings`, turn on Object Storage.

|              | Parameter explanation             |
| ------------ | --------------------------------- |
| storage type | S3 / Alibaba Cloud Object Storage |
| endpoint     | service domain name               |
| bucket_name  | bucket name                       |
| Access Key   | AK                                |
| Secret Key   | SK                                |

![turn on](https://static.goodrain.com/docs/5.6/use-manual/user-manual/oss/oss-2.png)



