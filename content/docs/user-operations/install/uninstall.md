---
title: "Rainbond集群卸载"
weight: 1003
description: "引导用户卸载Rainbond集群"
---

### 卸载流程

如果安装过程中出现了不可恢复的情况，可以参考以下操作彻底卸载集群，进行重新安装

- rainbond集群卸载

  访问operator所在的节点的IP:30008，进入集群管理界面，点击卸载，等待卸载完成即可

  执行以下命令确定资源都已卸载完成

  ```bash
  #只要operator的pod则表示已经卸载完成
  kubectl get pod -n rbd-system
  #没有任何资源被创建
  kubectl get rainbondcluster -n rbd-system
  #没有任何资源被创建
  kubectl get rainbondpackage -n rbd-system
  #没有任何资源被创建
  kubectl get rbdcomponent -n rbd-system
  #没有任何和rainbond相关资源被创建
  kubectl get persistentvolumeclaims -n rbd-system
  #没有任何和rainbond相关资源被创建
  kubectl get storageclasses
  #没有任何和rainbond相关资源被创建
  kubectl get persistentvolumes -n rbd-system
  ```

- 数据清理

  在operator所在节点执行

  ```bash
  rm -rf /opt/rainbond
  ```

  清理集群所有数据

  ```rm -rf /opt/rainbond```，清理集群所有数据

- operator卸载

  在k8s集群的客户端执行

  ```bash
  helm uninstall rainbond-operator --namespace=rbd-system
  ```

  即可完成卸载，如果安装了mysql-operator，通过

  ```bash
  helm uninstall mysql-operator --namespace=rbd-system
  ```

  命令即可完成卸载

- operator安装包清理

  进入operator下载目录，执行
  
  ```bash
  rm -rf rainbond-operator-chart-v0.0.1-beta2-V5.2-dev.tgz && rm -rf ./chart
  ```
  
  即可完成清理，如果安装了mysql-operator，通过
  
  ```bash
  rm -rf mysql-operator-chart.tgz && rm -rf ./mysql-operator
  ```

通过以上操作可以完成卸载过程，如果使用了外部资源，请自行删除或清理
