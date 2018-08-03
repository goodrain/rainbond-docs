---
title: 数据库插件
summary: 讲解如何使用数据库插件
toc: true
asciicast: true
---

[Percona XtraBackup](https://www.percona.com/software/mysql-database/percona-xtrabackup)（简称PXB）是 Percona 公司开发的一个用于 MySQL 数据库物理热备的备份工具，支持 MySQl（Oracle）、Percona Server 和 MariaDB.数据库插件基于percona-xtrabackup构建而成.目前本数据库插件仅支持 mysql数据库全量备份&全量恢复.

## 数据库插件

<table class="comparison-chart">
<tr>
<th>插件</th>
<th>数据库备份插件</th>
<th>数据库恢复插件</th>
</tr>

<tr>
<td rowspan="1">
<b>插件类型</b>
</td>
<td>一般类型插件</td>
<td>初始化类型插件</td>
</tr>
<tr>
<td rowspan="1">
<b>备份/恢复类型</b>
</td>
<td>全量备份</td>
<td>全量恢复</td>
</tr>
<tr>
<td rowspan="1">
<b>插件镜像地址(rainbond/addones)</b>
</td>
<td>xtrabackup_backup</td>
<td>xtrabackup_restore</td>
</tr>
<tr>
<td rowspan="12">
<b>配置组管理主要参数</b>
</td>
<td>

FULLENABLE <br/> SCHEDULE

</td>
<td>

RESTOREDATE <br/> RESTOREON
</td>
</tr>
</table>

## 数据库备份插件

> 目前插件仅支持注入类型:环境变量
参数:

- DINGTOKEN: 钉钉bot token,用于备份等通知.
- FULLENABLE: 启动全量备份,默认true.
- SCHEDULE: 备份定时策略,支持0 30 * * * *; @hourly; @every 1h30m等
- UPLOADTYPE: 上传备份到远端,目前支持 minio & ftp
    - MINIOURL/ACCESSKEY/SECRETKEY/BUCKET(minio配置参数)
    - FTPADDR/FTPPORT/FTPUESR/FTPPASS/FTPDIR(ftp配置参数)

## 数据库恢复插件

> 目前插件仅支持注入类型:环境变量

参数:

- RESTOREDATE: 数据全量备份日期(目前只支持)
- RESTOREON: 启用全量恢复,默认true.

## 说明

目前此插件处于alpha版本.

## 演示 demo

### 创建数据库备份插件

这里为了演示方便,将全量备份周期为240s.

<img style="width: 100%; height: 100%;"  src="https://i.loli.net/2018/05/02/5ae9dc8465e78.gif" alt="数据库备份插件" title="数据库备份插件" />

[高清大图](https://i.loli.net/2018/05/02/5ae9dc8465e78.gif)

### 创建数据库恢复插件

<img style="width: 100%; height: 100%;" src="https://i.loli.net/2018/05/02/5ae9df73c5cfd.gif" alt="数据库恢复插件" title="数据库恢复插件" />

[高清大图](https://i.loli.net/2018/05/02/5ae9df73c5cfd.gif)

### 安装插件 

<img style="width: 100%; height: 100%;" src="https://i.loli.net/2018/05/03/5ae9e413b3786.gif" alt="安装插件" title="安装插件" />

[高清大图](https://i.loli.net/2018/05/03/5ae9e413b3786.gif)


### 数据库恢复

<img style="width: 100%; height: 100%;" src="https://i.loli.net/2018/05/03/5ae9e54027c7a.gif" alt="数据恢复" title="数据恢复" />

[高清大图](https://i.loli.net/2018/05/03/5ae9e54027c7a.gif)

