---
title: 网络维护之Calico
summary: 维护Calico网络基准
toc: true
asciicast: true
---

##一、Calico介绍

Calico是一个纯3层的数据中心网络方案。能够提供可控的VM、容器、裸机之间的IP通信。     

通过将整个互联网的可扩展IP网络原则压缩到数据中心级别，Calico在每一个计算节点利用Linux Kernel实现了一个高效的vRouter来负责数据转发，而每个vRouter通过BGP协议负责把自己上运行的workload的路由信息像整个Calico网络内传播——小规模部署可以直接互联，大规模下可通过指定的BGP route reflector来完成。

这样保证最终所有的workload之间的数据流量都是通过IP路由的方式完成互联的。

<img src="https://static.goodrain.com/images/acp/docs/Calico/calico%E6%B5%81%E9%87%8F%E6%B5%81%E7%A8%8B%E5%9B%BE.png" width="65%" />



Calico节点组网可以直接利用数据中心的网络结构（无论是L2或者L3），不需要额外的NAT，隧道或者Overlay Network。

<img src="https://static.goodrain.com/images/acp/docs/Calico/calico%E5%B0%81%E5%8C%85%E5%9B%BE.png" width="50%" />

如上图所示，这样保证这个方案的简单可控，而且没有封包解包，节约CPU计算资源的同时，提高了整个网络的性能。

此外，Calico基于iptables还提供了丰富而灵活的网络Policy，保证通过各个节点上的ACLs来提供Workload的多租户隔离、安全组以及其他可达性限制等功能。

###1.1 Calico 架构

<img src="https://static.goodrain.com/images/acp/docs/Calico/calico%E6%9E%B6%E6%9E%84%E5%9B%BE.png" width="60%" />


- Felix，Calico Agent,跑在每台需要运行Workload的节点上，主要负责配置路由及ACLs等信息来确保Endpoint的连通状态；

- etcd，分布式键值存储，主要负责网络元数据一致性，确保Calico网络状态的准确性；

- BGP Client（BIRD）, 主要负责把Felix写入Kernel的路由信息分发到当前Calico网络，确保Workload间的通信的有效性；

- BGP Route Reflector（BIRD），大规模部署时使用，摒弃所有节点互联的 mesh 模式，通过一个或者多个BGP Route Reflector来完成集中式的路由分发；

##二、对接云帮


###2.1 云帮Calico架构图

<img src="https://static.goodrain.com/images/acp/docs/Calico/calico%E4%BA%91%E5%B8%AE%E4%BD%BF%E7%94%A8%E6%9E%B6%E6%9E%84%E5%9B%BE.png" width="70%" />


###2.2 Calico在云帮实现的功能

#### 容器网络的互连
Calico在每一个计算节点利用Linux Kernel实现了一个高效的vRouter来负责数据转发，而每个vRouter通过BGP协议负责把自己上运行的workload的路由信息像整个Calico网络内传播——小规模部署可以直接互联，大规模下可通过指定的BGP route reflector来完成。 这样保证最终所有的workload之间的数据流量都是通过IP路由的方式完成互联。

#### 隔离租户

Calico基于iptables提供了丰富而灵活的网络Policy，保证通过各个节点上的ACLs来提供Workload的多租户隔离、安全组以及其他可达性限制等功能。
 
###2.3 k8s结合calico的使用

#### k8s与calico流程架构图
<img src="https://static.goodrain.com/images/acp/docs/Calico/k8s%E7%BB%93%E5%90%88calico%E6%B5%81%E7%A8%8B%E5%9B%BE.png" width="50%" />

- 通过k8s创建启动网络容器，通过calico-cni插件根据cni的配置然后分配calico的网络。

#### CNI配置文件介绍


```
cat /etc/goodrain/cni/net.d/10-calico.conf
{
    "name": "calico-k8s-network",    ##网络的名字
    "cniVersion": "0.1.0",           ##CNI标准的版本号
    "type": "calico",                 ##网络插件的类型
    "etcd_endpoints": "http://127.0.0.1:2379", ##etcd地址
    "log_level": "info",     ##日志级别
    "ipam": {            
        "type": "calico-ipam"    ##ipam的类型
    },
    "kubernetes": {
        "kubeconfig": "/etc/goodrain/kubernetes/admin.kubeconfig".  ##kubeconfig文件路径
    }
}
``` 
 
##三、Calico性能测试

###3.1 测试环境

系统|CentOS7.3 | |
----------|--------|------|
宿主机的主机名|宿主机IP	|容器IP|
calico1|	10.80.84.49|172.19.183.195
calico2|	10.81.9.113|172.19.189.196

- 测试工具：iperf 命令

###3.2 宿主机测试
- calico2执行命令

```
[root@calico2 ~]# iperf -s calico1
iperf: ignoring extra argument -- calico1
------------------------------------------------------------
Server listening on TCP port 5001
TCP window size: 85.3 KByte (default)
------------------------------------------------------------
```

- calico1执行命令

```
[root@calico1 ~]# iperf  -c calico2 -i 2
------------------------------------------------------------
Client connecting to calico2, TCP port 5001
TCP window size: 85.0 KByte (default)
------------------------------------------------------------
[  3] local 10.80.84.49 port 33618 connected with 10.81.9.113 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0- 2.0 sec   186 MBytes   781 Mbits/sec
[  3]  2.0- 4.0 sec   130 MBytes   547 Mbits/sec
[  3]  4.0- 6.0 sec   124 MBytes   522 Mbits/sec
[  3]  6.0- 8.0 sec   124 MBytes   519 Mbits/sec
[  3]  8.0-10.0 sec   124 MBytes   521 Mbits/sec
[  3]  0.0-10.1 sec   689 MBytes   571 Mbits/sec
```

- 以上测试是客户端calico1到服务端calico2的上行带宽测试

###3.3 容器测试
- 在calico1宿主机上的容器端执行命令

```
rain@36a969da35df472eaab75d71c6b27c11-fr3c2:~$ iperf  -s  172.19.189.196

iperf: ignoring extra argument -- 172.19.189.196
------------------------------------------------------------
Server listening on TCP port 5001
TCP window size: 85.3 KByte (default)
------------------------------------------------------------
```

- 在calico2宿主机的容器执行命令

```
rain@36a969da35df472eaab75d71c6b27c11-8k3kw:~$ iperf  -c 172.19.183.195 -i 2
------------------------------------------------------------
Client connecting to 172.19.183.195, TCP port 5001
TCP window size: 85.0 KByte (default)
------------------------------------------------------------
[  3] local 172.19.189.196 port 54252 connected with 172.19.183.195 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0- 2.0 sec   179 MBytes   750 Mbits/sec
[  3]  2.0- 4.0 sec   115 MBytes   481 Mbits/sec
[  3]  4.0- 6.0 sec   126 MBytes   530 Mbits/sec
[  3]  6.0- 8.0 sec   115 MBytes   481 Mbits/sec
[  3]  8.0-10.0 sec   113 MBytes   476 Mbits/sec
[  3]  0.0-10.0 sec   648 MBytes   543 Mbits/sec
```

- 以上测试是客户端calico1的容器到服务端calico2中容器的上行带宽测试

###3.4 结论

- 通过测试对比我们发现使用calico中容器之间的网络与宿主机的消耗是非常小的。
 

##四、Calico维护

###4.1 Calico的常用资源

|资源|说明|
|---|---|
|node|物理机连接数|
|ipPool|calico的ip池|
|policy|节点的资源|
|profile|配置文件的资源|

- 资源使用yaml文件描述             

 [详细资源与格式介绍](https://docs.projectcalico.org/v2.1/reference/calicoctl/resources/bgppeer)

###4.2 Calico对资源的常用操作

- **资源常用命令**

	| 命令|用途
	----|------|
   | create | 创建
	| apply  | 增加
	|delete  | 删除
	| replace | 修改 
	|get|查看

- 操作资源格式	
`calicoctl   <COMMAND> -f <FILE_NAME>`

- 例：添加一个calico的ip池             
`calicoctl   apply -f ippool.yaml`


查看 |命令
---|---|
查看节点连接状态|calicoctl node status|     
|查看状态信息命令格式|calicoctl   get < NAME >  
|以文件格式查看详细信息的命令格式|calicoctl  get < NAME > -o yaml

- 例：以文件形式查看calico的ip池信息 	
`calicoctl  get ippool -o yaml`



###4.3 Calico连接的ip更改

- 以下为示例环境

#### 测试环境
系统 | CentOS 7.3 |
----|------|----
主机名 |  ip   | 
calico1 |  10.80.84.49 | 
calico2 | 10.81.9.113 | 

#### 查看Calico节点之间当前连接状态与IP

`calicoctl  node status`

#### 修改calico-node的启动文件进行修改calico连接的ip（所有节点都要改）

- `vim /usr/lib/systemd/system/calico-node.service`
	
- 主要修改第18行
   `-e IP_AUTODETECTION_METHOD=first-found \`
	`IP_AUTODETECTION_METHOD`这个是calico默认的变量，这个变量是自动检测ip（一般为公网ip）
	

-  我们可以修改成指定的变量或IP  
	把 ` -e IP_AUTODETECTION_METHOD=first-found \`改成`-e IP=${DEFAULT_IPV4} \`



```
cat /usr/lib/systemd/system/calico-node.service
[Unit]
Description=calicoctl node
After=docker.service
Requires=docker.service

[Service]
User=root
EnvironmentFile=/etc/goodrain/envs/calico.sh #calico的配置文件
PermissionsStartOnly=true
ExecStartPre=-/usr/bin/docker rm -f calico-node
#ExecStart=/usr/share/gr-calico/scripts/start-calico.sh
ExecStart=/usr/bin/docker run --net=host \
--privileged \
--name=calico-node  \
--restart=always \
-e NO_DEFAULT_POOLS= \
-e CALICO_LIBNETWORK_ENABLED=true \
-e IP=${DEFAULT_IPV4} \ # #calico的IP连接地址（修改连接ip就修改的这里）
-e CALICO_LIBNETWORK_CREATE_PROFILES=true \
-e CALICO_LIBNETWORK_LABEL_ENDPOINTS=false \
-e CALICO_LIBNETWORK_IFPREFIX=cali \
-e NODENAME=${HOSTNAME} \
-e CALICO_NETWORKING_BACKEND=bird \
-e IP6_AUTODETECTION_METHOD=first-found \
-e ETCD_ENDPOINTS=${ETCD_ENDPOINTS} \
-v /var/log/calico:/var/log/calico \
-v /var/run/calico:/var/run/calico \
-v /lib/modules:/lib/modules \
-v /run/docker/plugins:/run/docker/plugins \
-v /var/run/docker.sock:/var/run/docker.sock \
${NODE_IMAGE}

Restart=always
ExecStop=-/usr/bin/docker stop calico-node
RestartSec=10

[Install]
WantedBy=multi-user.target
```

#### 查看该变量的内容

```
[root@calico1 ~]# cat /etc/goodrain/envs/calico.sh
DEFAULT_IPV4=10.80.84.49
ETCD_ENDPOINTS=http://127.0.0.1:2379
NODE_IMAGE=hub.goodrain.com/dc-deploy/calico-node:v2.4.1
```
#### 修改完重启查看连接信息

```
[root@calico2 ~]# systemctl  daemon-reload
[root@calico2 ~]# systemctl  restart calico-node.service
[root@calico2 ~]# calicoctl  node status
Calico process is running.

IPv4 BGP status
+--------------+-------------------+-------+----------+-------------+
| PEER ADDRESS |     PEER TYPE     | STATE |  SINCE   |    INFO     |
+--------------+-------------------+-------+----------+-------------+
| 10.80.84.49  | node-to-node mesh | up    | 07:12:52 | Established |
+--------------+-------------------+-------+----------+-------------+

IPv6 BGP status
No IPv6 peers found.
```



