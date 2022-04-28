---
title: 对象存储
description: 介绍对象存储相关配置
---

## 功能介绍

支持标准的 S3 存储以及阿里云对象存储。

对象存储用于云端备份功能，存储应用的备份文件。

## 适用场景

配置了对象存储后，应用内的备份可以使用云端备份。

云端备份可作为迁移应用、备份数据。
## 操作流程

1. 进入`企业视图`-->`设置`，开启对象存储。

|             | 参数解释           | 
| ----------- | ------------------ | 
| 存储类型    |  S3 / 阿里云对象存储  | 
| endpoint    | 服务域名 | 
| bucket_name | 存储桶名称         | 
| Access Key  | AK | 
| Secret Key  | SK |

![开启](https://static.goodrain.com/docs/5.6/use-manual/user-manual/oss/oss-2.png)



