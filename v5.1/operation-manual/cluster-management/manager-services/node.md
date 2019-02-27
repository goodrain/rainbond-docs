---
CUR_NETtitle: node
summary: 数据中心节点控制器
toc: true
---

## 1. 概要

node组件负责rainbond集群的组建和控制，提供应用运行时的大部分功能服务。

## 2. 启动参数

```
Usage of /usr/local/bin/node:
      --api-addr string                                    the api server listen address (default ":6100")
      --checkInterval-second int                           the interval time of healthy check (default 5)
      --collector.diskstats.ignored-devices string         Regexp of devices to ignore for diskstats. (default "^(ram|loop|fd|(h|s|v|xv)d[a-z]|nvme\\d+n\\d+p)\\d+$")
      --collector.filesystem.ignored-fs-types string       Regexp of filesystem types to ignore for filesystem collector. (default "^(sysfs|autofs|procfs|proc)$")
      --collector.filesystem.ignored-mount-points string   Regexp of mount points to ignore for filesystem collector. (default "^/(sys|proc|dev)($|/)")
      --config-path string                                 the path of config to store(new) (default "/rainbond/acp_configs")
      --db-type string                                     db type mysql or etcd (default "mysql")
      --etcd stringSlice                                   the path of node in etcd (default [http://127.0.0.1:2379])
      --etcd-dialTimeOut duration                          etcd cluster dialTimeOut. (default 2s)
      --event-log-server stringSlice                       host:port slice of event log server (default [127.0.0.1:6367])
      --execRecordPath string                              the path of job exec record (default "/rainbond/exec_record")
      --failTime int                                       the fail time of healthy check (default 3)
      --hostIP string                                      the host ip you can define. default get ip from eth0
      --init-status string                                 the path of init status to store (default "/rainbond/init_status")
      --installed-marker string                            the path of a file for check node is installed (default "/etc/acp_node/check/install/success")
      --jobPath string                                     the path of job in etcd (default "/rainbond/jobs")
      --k8sNode string                                     the path of k8s node (default "/store/nodes/")
      --kube-conf string                                   absolute path to the kubeconfig file  ./kubeconfig
      --lockPath string                                    the path of lock in etcd (default "/rainbond/lock")
      --lockttl int                                        lock ttl (default 600)
      --log-level string                                   the log level (default "info")
      --min-resync-period duration                         The resync period in reflectors will be random between MinResyncPeriod and 2*MinResyncPeriod (default 12h0m0s)
      --mysql string                                       mysql db connection info (default "admin:admin@tcp(127.0.0.1:3306)/region")
      --nodePath string                                    the path of node in etcd (default "/rainbond/nodes")
      --nodeid-file string                                 the unique ID for this node. Just specify, don't modify (default "/opt/rainbond/etc/node/node_host_uuid.conf")
      --noderule compute                                   current node rule,maybe is compute `manage` `storage`  (default "compute")
      --onlineNodePath string                              the path of master node in etcd (default "/rainbond/onlinenodes")
      --path.procfs string                                 procfs mountpoint. (default "/proc")
      --path.sysfs string                                  sysfs mountpoint. (default "/sys")
      --procPath string                                    the path of proc in etcd (default "/rainbond/task/proc/")
      --procreq int                                        proc req (default 5)
      --procttl int                                        proc ttl (default 600)
      --prometheus string                                  the prometheus api (default "http://localhost:9999")
      --reqTimeOut int                                     req TimeOut. (default 2)
      --run-mode string                                    the acp_node run mode,could be 'worker' or 'master' (default "worker")
      --service-endpoint-reg-path string                   For registry service entpoint info into etcd then path. (default "/rainbond/nodes/target")
      --service-list-file string                           A list of the node include components (default "/opt/rainbond/conf/manager-services.yaml")
      --service-manager string                             For service management tool on the system. (default "systemd")
      --servicePath string                                 the path of service info to store (default "/traefik/backends")
      --static-task-path string                            the file path of static task (default "/etc/goodrain/rainbond-node")
      --statsd.listen-address string                       The UDP address on which to receive statsd metric lines. DEPRECATED, use statsd.listen-udp instead.
      --statsd.listen-tcp string                           The TCP address on which to receive statsd metric lines. "" disables it. (default ":9125")
      --statsd.listen-udp string                           The UDP address on which to receive statsd metric lines. "" disables it. (default ":9125")
      --statsd.mapping-config string                       Metric mapping configuration file name.
      --statsd.read-buffer int                             Size (in bytes) of the operating system's transmit read buffer associated with the UDP connection. Please make sure the kernel parameters net.core.rmem_max is set to a value greater than the value specified.
      --ttl int                                            node timeout second (default 10)
```



### 环境变量

| 环境变量名称      | 默认值             | 说明                             |
| ----------------- | ------------------ | -------------------------------- |


