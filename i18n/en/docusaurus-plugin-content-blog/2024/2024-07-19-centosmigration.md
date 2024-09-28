---
title: CentOS 7 service terminated, where do I go from?I understand that there is no room for migration
description: On December 08, 2020, CentS officially announced the cessation of the Maintenance CentS Project and launched the CentS Stream Project, and indicated that follow-up would be made to the CentS Stream project.For more information, see [CencoS official announcement] (https://blog.centos.org/2020/12/future-is-centos-stream/).
slug: centosmigration
---

## Background

On December 08, 2020, CentS officially announced the cessation of the Maintenance CentS Project and launched the CentS Stream Project, and indicated that follow-up would be made to the CentS Stream project.For more information, see [CencoS official announcement] (https://blog.centos.org/2020/12/future-is-centos-stream/).

- CentOS 6 ceased maintenance on 30 November 2020, and CentOS 8 stopped maintenance on 31 December 2021.
- CentOS 7 stopped maintenance on 30 June 2024.

## Impact

CentOS stopped services primarily affected by two aspects of：

- **Safety Bug：** can't get a security patch to fix the high-risk CVE hole.

* **Software feature：** is no longer available for new versions of the package, no new features or architectural support;

Stopping maintenance generally means that it is not possible to get a secure patch to fix the high-risk CVE loop, or to get new features and architecture support from new versions of the package.This has led directly to the failure to officially address any security gaps or other issues in the operating system, while many basic software packages are no longer updated.

## How to respond

Faced with this situation, we have to consider migrating to other long-term support (LTS) distribution versions of Linux to ensure the security and continuity of the system.Alternative migration targets include：

- **Ubuntu LTS**：provides security updates and maintenance for at least five years, suitable for business environments that require long-term stability support.
- **Debian Stable**：also provides long-term security support, is stable and suitable for the production environment.
- **Fedora Server or Fedora Workstation**：provides the latest software and features for environments that require the latest technology, although the support cycle is shorter.
- **Rocky Linux**：was created to fill gaps left by Censorship to stop maintenance, compatible with the high level of Red Hat Enterprise Linux (RHEL) and the migration process is relatively simple.
- **Anolis OS, openEuler, OpenCloudOS**：These Linux distributions led by domestic manufacturers and source are also highly compatible with RHEL and provide good localization support and services to business users.

When selecting migration targets, if migrating to **Ubuntu, Debian or Fedora** are selected, some external tools may be required to help migrate because these systems differ significantly from CentS management and the migration process may involve higher risks.

The choice of **Rocky Linux, Anolis OS, openEuler or OpenCloudOS** will simplify the migration process because the high compatibility of these systems with CentOS reduces migration difficulty and makes the process easier.

### Cents 7 migrated to Anolis OS 7

Here you migrate as Cents 7 to Anolis OS 7 examples.

1. Download Anolis OS Migration Tool yum Source

```bash
wget https://mirrors.openanolis.cn/anolis/migration/anolis-migration.repo -O /etc/yum.repos.d/anolis-migration.repo
```

2. Install migration tool centos2anolis

```bash
yum - y install centos2anolis
```

> If you report the following errors, you will need to install the epel source, the migration tool needs to depend on the python36-psutil pack in the edel source
>
> ```bash
> Error: Package: centos2anolis-0.2-20.an7.no-search (migration)
> Requires: python36-psutil
>
> $ yum install -y etel-release
> ```

3. Execute Migration Command

```bash
# By default migrate to Anolis OS
centos2anolis.py
# to Anolis OS
centos2anolis.py --rhck in RCK
```

Figure： below after migration has been completed

![](https://static.goodrain.com/wechat/cents-migration/1.png)

4. Reboot and verify OS version

![](https://static.goodrain.com/wechat/cents-migration/2.png)

5. Migration finished, the OS version can also be seen in the node details of Rainbond cluster management.

![](https://static.goodrain.com/wechat/cents-migration/3.png)

### Migrate to other Linux distribution

Most Linux distributions have provided migration guides since the Centos series have been announced to stop maintenance. eg:：

- [Centos migrate to Rocky Linux](https://docs.rockylinux.org/en/guides/migrate2rocky/)
- [Centos migrated to Anolis OS] (https://openanolis.cn/sig/migration/doc/451732372594279514)
- [Centos migrate to openEuler](https://www.openeuler.org/en/migration/guidance/)
- [Centos migrate to OpenCloudOS](https://docs.opencloudos.org/centos_migrate/migrate_CentOS7_to_OC7/)

All four approaches are quite easy and simple, as they are highly compatible with Centos.

## Last

Migration of operating systems is a more important matter that requires full planning and implementation.It is recommended that all key business applications be fully tested to ensure compatibility and that detailed rollback programmes be prepared to respond to potential problems before they are implemented.Good luck in migration for all!
