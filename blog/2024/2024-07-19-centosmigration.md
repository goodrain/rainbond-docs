---
title: CentOS 7 服务终止，何去何从？一文搞懂，迁移无忧
description: 2020年12月08日，CentOS 官方宣布了停止维护 CentOS 项目，并推出了 CentOS Stream 项目，并表示后续都会投入到 CentOS Stream 项目中。更多信息，请参见 [CentOS官方公告 ](https://blog.centos.org/2020/12/future-is-centos-stream/)。
slug: centosmigration
---

## 背景

2020年12月08日，CentOS 官方宣布了停止维护 CentOS 项目，并推出了 CentOS Stream 项目，并表示后续都会投入到 CentOS Stream 项目中。更多信息，请参见 [CentOS官方公告 ](https://blog.centos.org/2020/12/future-is-centos-stream/)。

- CentOS 6 已于 2020年11月30日 停止维护，CentOS 8 已于 2021年12月31日 停止维护。
- CentOS 7 已于 2024年06月30日 停止维护。

<!--truncate-->

## 影响

CentOS 停止服务主要的影响是以下两个方面：

* **安全漏洞：**无法获取安全补丁来修复高风险的CVE漏洞。

- **软件功能：**不再发布新版本软件包，缺乏新功能、新架构支持；

总的来说停止维护意味着无法获取安全补丁修复高风险的 CVE 漏洞，也无法获取到新版本软件包带来的新功能和架构支持。这直接导致了操作系统出现的任何安全漏洞或其他问题都无法得到官方的处理，同时许多基础软件包也不再更新。

## 如何应对

面对这种情况，我们不得不考虑迁移到其他长期支持（LTS）的 Linux 发行版，以确保系统的安全和持续更新。可选的迁移目标包括：

- **Ubuntu LTS**：提供至少五年的安全更新和维护，适合需要长期稳定支持的企业环境。
- **Debian Stable**：同样提供长期安全支持，稳定性良好，适合生产环境。
- **Fedora Server 或 Fedora Workstation**：虽然支持周期较短，但提供最新的软件和特性，适合需要最新技术的环境。
- **Rocky Linux**：为了填补 CentOS 停止维护留下的空白而创建的，与 Red Hat Enterprise Linux（RHEL）高度兼容，迁移过程相对简单。
- **Anolis OS、openEuler、OpenCloudOS**：这些由国内厂商主导并开源的 Linux 发行版，同样与 RHEL 高度兼容，为企业用户提供了很好的本地化支持和服务。

在选择迁移目标时，如果选择迁移到 **Ubuntu、Debian 或 Fedora**，可能需要使用一些外部工具帮助迁移，因为这些系统与 CentOS 有较大的包管理差异，迁移过程可能涉及较高的风险。

而选择 **Rocky Linux、Anolis OS、openEuler 或 OpenCloudOS** 则会简化迁移过程，因为这些系统与 CentOS 的高度兼容性降低了迁移难度，让过程更为顺畅。

### Centos 7 迁移到 Anolis OS 7

这里以 Centos 7 迁移到 Anolis OS 7 举例。

1. 下载 Anolis OS 迁移工具 yum 源

```bash
wget https://mirrors.openanolis.cn/anolis/migration/anolis-migration.repo -O /etc/yum.repos.d/anolis-migration.repo
```

2. 安装迁移工具 centos2anolis

```bash
yum -y install centos2anolis
```

> 若出现下述的报错，则需要安装epel源，迁移工具需要依赖 epel 源中的 python36-psutil 包
>
> ```bash
> Error: Package: centos2anolis-0.2-20.an7.noarch (migration)
> Requires: python36-psutil
> 
> $ yum install -y epel-release
> ```

3. 执行迁移命令

```bash
# 不加参数默认迁移到 ANCK 内核的 Anolis OS
centos2anolis.py
# 迁移到 RHCK 内核的 Anolis OS
centos2anolis.py --rhck
```

迁移完成后如下图所示：

![](https://static.goodrain.com/wechat/centos-migration/1.png)

4. 重启并验证 OS 版本

![](https://static.goodrain.com/wechat/centos-migration/2.png)

5. 迁移完成，在 Rainbond 集群管理的节点详情中也可查看到操作系统版本。

![](https://static.goodrain.com/wechat/centos-migration/3.png)

### 迁移到其他 Linux 发行版

自 Centos 系列项目宣布停止维护以后，大部分 Linux 发行版都提供了迁移指南，例如：

* [Centos 迁移到 Rocky Linux](https://docs.rockylinux.org/zh/guides/migrate2rocky/)
* [Centos 迁移到 Anolis OS](https://openanolis.cn/sig/migration/doc/451732372594279514)
* [Centos 迁移到 openEuler](https://www.openeuler.org/zh/migration/guidance/)
* [Centos 迁移到 OpenCloudOS](https://docs.opencloudos.org/centos_migrate/migrate_CentOS7_to_OC7/)

以上四种方式都是相当容易、简单的，因为它们都与 Centos 高度兼容。

## 最后

迁移操作系统是一个比较重要的事情，需要完整的计划和执行。建议在大家实施之前，充分测试所有关键的业务应用以确保兼容性，准备好详细的回滚方案以应对可能出现的问题。祝大家都能完美迁移成功～
