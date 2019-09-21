---
title: "平台问题排查FAQ"
weight: 1701
---

{{% notice note %}}
当安装使用 Rainbond 遇到问题时，请先参考本篇文档快速索引部分。如果问题未解决，请按要求收集必要的信息通过[社区(用户帮助)](https://t.goodrain.com/)或者[Github](https://github.com/goodrain) 提供给Rainbond开发者。尽可能提供具体信息，方便排查问题。

```yaml
# 参考模板
Rainbond版本(grctl version/docker run --rm goodrain.me/rbd-api:5.1.1 version):
操作系统/内核版本:
节点配置(CPU核数,内存大小,硬盘类型(SSD/机械硬盘),网络类型,网络拓扑):
安装类型(是否离线或者对接已有集群):
集群状态(是否health，是否有计算节点，是否多管理节点):
如何复现(什么操作导致的):
尝试解决(重启相关组件): 
相关截图(具体日志部分截图):
```
{{% /notice %}}

#### 安装指南

> 安装问题建议反馈至 [rainbond-ansible](https://github.com/goodrain/rainbond-ansible.git)

* 安装如何自定ssh port
如果企业提供的机器不支持SSH 22端口的话，目前需用用户手动设置需要安装节点的SSH端口信息，有两种设置方式：
1. 禁用自动生成ansible host文件，手动配置

```bash
export NOT_WRITE_ANSIBLE_HOSTS=true
vi /opt/rainbond/rainbond-ansible/inventory/hosts
```

类似如下，更改 [all] 分组中每个节点的端口信息：

```bash
[manage]
959eba4b-6bbe-4ad5-ba0f-ecfad17d378d

[new-manage]

[gateway]

[new-gateway]

[compute]
b4e3a2dd-ccef-410b-93a8-95d19a18b282
4756d361-afbc-4283-b60e-1bfdcd8e4b5e
e96f51b7-5c12-4b48-a126-8a91e9df5165

[new-compute]

[etcd]
959eba4b-6bbe-4ad5-ba0f-ecfad17d378d

[all]
959eba4b-6bbe-4ad5-ba0f-ecfad17d378d ansible_host=10.10.10.10 ansible_port=2222 ip=10.10.10.10 port=2222 role=manage
b4e3a2dd-ccef-410b-93a8-95d19a18b282 ansible_host=10.10.20.10 ansible_port=2222 ip=10.10.20.10 port=2222 role=compute ansible_ssh_private_key_file=/root/.ssh/id_rsa.pub
4756d361-afbc-4283-b60e-1bfdcd8e4b5e ansible_host=10.10.20.11 ansible_port=2222 ip=10.10.20.11 port=2222 role=compute ansible_ssh_private_key_file=/root/.ssh/id_rsa.pub
e96f51b7-5c12-4b48-a126-8a91e9df5165 ansible_host=10.10.20.12 ansible_port=2222 ip=10.10.20.12 port=2222 role=compute ansible_ssh_private_key_file=/root/.ssh/id_rsa.pub
```

2. 全局定义SSH端口。

> 此方式缺陷是要求安装的节点都是相同的SSH端口
 修改/opt/rainbond/rainbond-ansible/scripts/installer/global.sh配置，添加如下内容：
 
 ```bash
 INSTALL_SSH_PORT=2222
 ```

 其中实际端口根据你的实际情况修改，定义完成后可以执行下述命令重新生成host文件并验证：

 ```bash
 grctl ansible hosts
 cat /opt/rainbond/rainbond-ansible/inventory/hosts
 ```

 如果配置文件中的端口信息已经修改。则证明方法有效，可以开始安装节点了。
 

#### 使用指南

1. [企业管理员密码忘记如何处理](/user-operations/op-guide/reset_enterprise_password/)
2. [对接自己私有Artifactory指南](/user-operations/op-guide/op-repo/)
3. [控制台报系统等错误服务排查](/user-operations/op-guide/console_error/)
4. [web容器管理报错](/user-operations/op-guide/error_dialing_backend/)
5. [创建应用提示Table 'region.tenants' doesn't exist](/user-operations/op-guide/table_region_tenants_not_exist/)