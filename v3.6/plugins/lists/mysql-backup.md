---
title: MySQL数据库备份与恢复插件
summary: 讲解如何使用数据库插件
toc: true
asciicast: true
---

<div id="toc"></div>

数据库的备份与恢复插件基于 [Percona XtraBackup](https://www.percona.com/software/mysql-database/percona-xtrabackup) 实现，支持 MySQL 数据库物理热备与完全恢复。

目前此插件处于alpha版本。

## 一、插件基本信息

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

## 二、数据库备份插件参数定义

> 目前插件仅支持注入类型:环境变量
参数:

- DINGTOKEN: 钉钉bot token,用于备份等通知.
- FULLENABLE: 启动全量备份,默认true.
- SCHEDULE: 备份定时策略,支持0 30 * * * *; @hourly; @every 1h30m等
- UPLOADTYPE: 上传备份到远端,目前支持 minio & ftp
    - MINIOURL/ACCESSKEY/SECRETKEY/BUCKET(minio配置参数)
    - FTPADDR/FTPPORT/FTPUESR/FTPPASS/FTPDIR(ftp配置参数)

## 三、数据库恢复插件参数定义

> 目前插件仅支持注入类型:环境变量

参数:

- RESTOREDATE: 数据全量备份日期(目前只支持)
- RESTOREON: 启用全量恢复,默认true.

## 四、演示 demo

### 4.1 创建数据库备份插件

这里为了演示方便,将全量备份周期为240s.

<img style="width: 100%; height: 100%;"  src="https://i.loli.net/2018/05/02/5ae9dc8465e78.gif" alt="数据库备份插件" title="数据库备份插件" />

<a href="https://i.loli.net/2018/05/02/5ae9dc8465e78.gif" target="_blank">高清大图</a>

### 4.2 创建数据库恢复插件

<img style="width: 100%; height: 100%;" src="https://i.loli.net/2018/05/02/5ae9df73c5cfd.gif" alt="数据库恢复插件" title="数据库恢复插件" />

<a href="https://i.loli.net/2018/05/02/5ae9df73c5cfd.gif" target="_blank">高清大图</a>


### 4.3 安装插件 

<img style="width: 100%; height: 100%;" src="https://i.loli.net/2018/05/03/5ae9e413b3786.gif" alt="安装插件" title="安装插件" />

<a href="https://i.loli.net/2018/05/03/5ae9e413b3786.gif" target="_blank">高清大图</a>


### 4.4 数据库恢复

<img style="width: 100%; height: 100%;" src="https://i.loli.net/2018/05/03/5ae9e54027c7a.gif" alt="数据恢复" title="数据恢复" />

<a href="https://i.loli.net/2018/05/03/5ae9e54027c7a.gif" target="_blank">高清大图</a>

