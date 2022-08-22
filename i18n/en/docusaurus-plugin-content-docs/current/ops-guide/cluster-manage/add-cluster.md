---
title: Cluster addition
description: This chapter documents the operations related to adding a cluster to Rainbond.
weight: 102
---

Enterprise administrators have permission to add clusters.Cluster addition is roughly divided into 2 steps：

1. Install the Kubernetes cluster.

2. Initialize the Rainbond cluster Region service on the Kubernetes cluster, and then connect to the console for management.

![image-20210219131838603](https://static.goodrain.com/images/5.3/add-cluster-index.png)

As shown in the figure above, click Add Cluster on the Enterprise View Cluster page to enter the Rainbond Cluster Add page.

![](https://static.goodrain.com/images/5.3/add-cluster.png)

## Preparation of the Kubernetes cluster

### Install from bare metal

Rainbond uses the RKE cluster installation solution to automate the installation of Kubernetes clusters.The user selects`to start the installation from the host and`to enter the cluster list page of this type. If it is installed for the first time, the configuration window will pop up automatically.

![image-20210219132826379](https://static.goodrain.com/images/5.3/rke-cluster-config.png)

Fill in the cluster name and plan node properties in the configuration page.Cluster names need to be unique.Node attributes are set as needed, all node attributes must include `ETCD` `management` `Calculation`, of which`ETCD`must be an odd number.The IP address of the node refers to the address that can be accessed through the host where the console is located, and the intranet IP address is the address for service communication between nodes.The SSH port is set according to the real port of the node, the default is`22`.

Each node must meet the following conditions：

1. Internet connection is possible.
2. An X86 Linux operating system such as Ubuntu, Centos, Debian, etc. has been installed.
3. The system kernel is preferably greater than 5.10.
4. Single node resource configuration test environment>= 4GB/2Core; production environment recommended>= 32GB/8Core
5. The root directory space of the disk should preferably be greater than 30GB. The production environment`/var/lib/docker` mounts the disk >alone = 200GB, and the root directory >= 100GB.
6. A clean operating system is required.
7. It is necessary to ensure that ports 80, 443, 6060, 8443, 10254, 18080, and 18081 are free. If there is a security group restriction, please allow 80, 443, 6060, 8443

> After the cluster installation through the host installation is complete, you can continue to add nodes, so it is not necessary to prepare all nodes for the first experience.It can be expanded later as needed.`ETCD` `manages`and`and computes`nodes.

After the node planning is completed, you need to run the node initialization command on all nodes according to the prompts on the configuration page. This command mainly completes the operating system check, password-free login configuration, Docker service detection and installation, and installation of related system tools.

After the node is ready, click the`to start installation`button to enter the installation process of the Kubernetes cluster.

> Please note that the console cannot be closed during the installation process, otherwise the installation will enter a non-continuable state.

![image-20210219133807675](https://static.goodrain.com/images/5.3/rke-cluster-install.png)

As shown in the figure above, the cluster is in the process of being installed.If you want to view more detailed logs, you can close this window and click`in the cluster list to view the log`function option.The cluster installation log will be queried.If there is an abnormal situation, please make the relevant node-related adjustments according to the log prompts and then reinstall`and`.

After the cluster is installed successfully, the cluster will be in the running state.A running cluster supports operations such as querying Kubeconfig, node expansion, and deletion.This state can enter the next step[cluster initialization](#rainbond-集群的初始化)

![image-20210219134301992](https://static.goodrain.com/images/5.3/rke-cluster-list.png)

The kubectl command line tool does not exist by default in the cluster host installed in this way. If you need to use it, please refer to[kubectl installation](../tools/kubectl/)

### Access to Kubernetes cluster

The premise of accessing a Kubernetes cluster is that you have installed the Kubernetes cluster and have a certain foundation for the basic use and operation of the Kubernetes cluster. Otherwise, we recommend that you use the 1 or 3 methods to prepare the Kubernetes cluster. Before starting, the cluster needs to meet the following：

1) The cluster version should be v1.16 and above. 2) We need to provide the Kubeconfig file that we have cluster management privileges, and ensure that the network where the Rainbond console is located can use the Kubeconfig to communicate with the cluster. 3) The first node of the node needs to ensure that the ports 80, 443, 6060, 8443, 10254, 18080, and 18081 are in an idle state. If there is a security group restriction, please allow 80, 443, 6060, 8443.These ports are required by the Rainbond Gateway service.

![image-20210219141244746](https://static.goodrain.com/docs/5.6/cluster/Add-cluster-2.png)

Click`to connect to Kubernetes cluster`The first time you add it will pop up a window to connect to the Kubernetes cluster. You need to fill in the correct Kubeconfig file to confirm.If communication is normal, the cluster will appear in the running state in the list.In this state, you can enter the next step[cluster initialization](#rainbond-集群的初始化).

### Use Alibaba Cloud ACK cluster

This method requires the user to prepare an Alibaba Cloud RAM account with correct permissions and fill in AK/SK.

![image-20210219141805518](https://static.goodrain.com/images/5.3/ack-index.png)

First, you need to activate the ACK service on Alibaba Cloud, and configure the RAM account and service permissions according to the product page as shown above.If ACK clusters already exist in your account, after filling in AK/SK, all clusters will be listed.If you have not purchased an ACK cluster, click Buy Cluster to help you quickly complete the cluster purchase.

> Purchasing an ACK cluster on Alibaba Cloud also requires a certain threshold. If you do not have sufficient knowledge of Kubernetes clusters, the purchasing process may even take more than 30 minutes.Rainbond will automate the process for you.

> If you are a user of Tencent Cloud or Huawei Cloud, please actively provide feedback in the community.Support will be sorted according to the strength of user feedback.

Please note that the resources purchased by Rainbond are all based on a pay-as-you-go model. If you need a monthly subscription, please upgrade by yourself.

## Initialization of Rainbond Cluster

Kubernetes clusters accessed through three forms, if the status meets the requirements, you can choose to initialize the Rainbond cluster. Rainbond cluster initialization means that the Rainbond Region service will be deployed in the Kubernetes cluster to control and take over the resources of the cluster. Deploy cloud-native applications.

Cluster initialization precautions are as follows：

1. If you choose a Kubernetes cluster that is already in use, don't worry, the next initialization action will not affect the existing business form of the cluster.

2. When Rainbond cluster is initialized, the first and second nodes are used as gateway nodes and build nodes by default. You can also add annotations to Kubernetes nodes to specify the corresponding nodes (rainbond.io/gateway-node=true or rainbond.io/chaos-node =true).

3. The ports below the gateway node must be free：80, 443, 6060, 8443, 10254, 18080, 18081, otherwise initialization will fail.

4. If the number of cluster nodes is greater than 3, high availability mode will be installed by default.

5. During the installation process, you need to access ports 80, 443, 6443, 8443, and 6060 of the gateway node. Please ensure that the relevant ports can be accessed, for example, configure the security group policy.

6. The initial state of all services in Rainbond Region is expected to occupy 2GB of memory space.Among them, monitoring services and database resources take up a lot.

After confirming that there are no problems with the appeal conditions, cluster initialization can begin.For ACK clusters, Rainbond will automatically purchase RDS as the cluster database, NAS as the default storage, and SLB as the load balancer.Other cluster types deploy NFS storage type and single-instance database by default.The initialization process is mainly based on the product display process. Please do not close the window during the cluster initialization process.

If the initialization process has not been completed for a long time, you can run the following command to view：in the cluster

```
kubectl get rainbondcluster rainbondcluster -n rbd-system
```

> If the cluster is installed through the host, the kubectl command does not exist, please refer to [kubectl installation](../tools/kubectl/) to install the command.
> 
> For more information custom cluster initialization parameters, please refer to document cluster initialization parameters1
