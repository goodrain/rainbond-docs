---
title: Glusterfs distributed storage
description: Docking with Glusterfs as cluster shared storage
weight: 5015
---

### Install a Glusterfs cluster with Kubernetes

Through the content of this article, I will explain to users how to install a Glusterfs cluster through Kubernetes and provide high-availability storage for Rainbond

### Preconditions

- In the installed Kubernetes cluster, each of the three nodes should be mounted with an SSD disk with a space of not less than 500G

- Format and mount the prepared disk to the specified directory

  ```bash
  # View available disks
  fdisk -l
  # Partition and format
  mkfs.xfs /dev/vdb1
  mkdir -p /data
  echo "/dev/vdb1 /data xfs defaults 1 2" >>/etc/fstab
  # Mount
  mount -a
  # Make sure /data is mounted
  df -h | grep data
  ```

- Install the corresponding version of the Glusterfs client tool on all Kubernetes nodes and load the required kernel modules

  - Ubuntu 1604/1804

  ```bash
  apt install software-properties-common
  add-apt-repository ppa:gluster/glusterfs-7
  apt update
  apt install glusterfs-client -y
  modprobe dm_thin_pool
  ```

  - CentOS 7

  ```bash  
  yum -y install centos-release-gluster
  yum -y install glusterfs-client
  modprobe dm_thin_pool
  ```

### Deploy the Glusterfs cluster

The following operations can be performed once on any master node of Kubernetes

- Get the corresponding item

  ```bash
  git clone https://gitee.com/liu_shuai2573/gfs-k8s.git && cd gfs-k8s
  ```

- Set the node label and specify the corresponding node to run the Glusterfs component

  ```bash
  #Set the label and change Glusterfs1/2/3 to the corresponding Kubernetes node node
  kubectl label node Glusterfs1 Glusterfs2 Glusterfs3 storagenode=glusterfs
  #After this operation, the corresponding node will only run the Glusterfs service. To reuse this node, please Don't do this
  kubectl taint node Glusterfs1 Glusterfs2 Glusterfs3 glusterfs=true:NoSchedule
  ```

- Create a Glusterfs service

  ```bash
  kubectl create -f gluster-daemonset.yaml
  ```

- Check if the Glusterfs service is running normally on the specified node

  ```bash
  kubectl get pods -o wide --selector=glusterfs-node=daemonset
  NAME READY STATUS RESTARTS AGE IP NODE NOMINATED NODE READINESS GATES
  glusterfs-2k5rm 1/1 Running 0 52m 192.168.2.200 192.168.2.200   <none>           <none>
  glusterfs-mc6pg 1 /1 Running 0 134m 192.168.2.22 192.168.2.22    <none>           <none>
  glusterfs-tgsn7 1/1 Running 0 134m 192.168.2.224 192.168.2.224   <none>           <none>
  ```

- Add Glusterfs service as unified cluster

  ```bash
  #Add the other two Glusterfs services to the cluster through one of the Glusterfs services
  kubectl exec -ti glusterfs-2k5rm gluster peer probe Glusterfs2_IP
  kubectl exec -ti glusterfs-2k5rm gluster peer probe Glusterfs3_IP
  #Check whether the addition is successful, the addition will show other Status of both Glusterfs services
  kubectl exec -ti glusterfs-2k5rm gluster peer status
  ```

Configure a Glusterfs cluster as a resource available to Kubernetes

- Create a service account and authorize RBAC

  ```bash
  kubectl create -f rbac.yaml
  ```

- Create Glusterfs-provisioner

  ```bash
  kubectl create -f deployment.yaml
  ```

- Create storageclass resource

  ```bash
  #Modify the value of parameters.brickrootPaths in storageclass.yaml and replace it with the IP
  of the Glusterfs node kubectl create -f storageclass.yaml
  ```

- Create pvc validation

  ```bash
  kubectl create -f pvc.yaml
  kubectl get pvc | grep gluster-simple-claim #STATUS is Bound when the creation is successful
  ```

- Create pod verification

  ```bash
  kubectl create -f pod.yaml
  kubectl get po | grep gluster-simple-pod #STATUS is Running when running normally
  ```

- remove verification pod

  ```bash
  kubectl delete -f pod.yaml
  ```

Complete the installation of Glusterfs, refer to [to initialize the Rainbond cluster parameter description](../cluster-manage/init-region/) to connect to the storage.
