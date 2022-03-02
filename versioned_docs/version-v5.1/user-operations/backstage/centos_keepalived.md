---
title: "CentOS Keepalived配置"
description: "CentOS Keepalived配置"
hidden: true
---

借助 **keepalived** 完成VIP配置

- 安装

`yum install -y keepalived`

- 编辑配置文件

```bash
# 备份原有配置文件，如果没有则自行创建
cp /etc/keepalived/keepalived.conf /etc/keepalived/keepalived.conf.bak
# 编辑配置文件内容如下
! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL
}
vrrp_script check_gateway {
   #检测脚本
   script "/etc/keepalived/check_gateway_status.sh"
   #执行间隔时间
   interval 5
}
vrrp_instance VI_1 {
    				
    #角色，当前为主节点
    state BACKUP  
    #网卡设备名，通过 ifconfig 命令确定  
    interface ens6f0       
    virtual_router_id 51
    #优先级，主节点大于备节点     
    priority 100	
    advert_int 1
    nopreempt
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        <VIP>				
     }
     track_script {
     #必须与上面一致
    check_gateway
    }
}

# 其他管理节点
! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL
}
vrrp_script check_gateway {
  #检测脚本
  script "/etc/keepalived/check_gateway_status.sh"
  #执行间隔时间
  interval 5
  }	
    vrrp_instance VI_1 {
    #角色，当前为备节点
    state BACKUP 
    #网卡设备名，通过 ifconfig 命令确定   
    interface ens6f0
    virtual_router_id 51
    #优先级，主节点大于备节点   
    priority 50
    advert_int 1
    nopreempt
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        <VIP>			
    }
     track_script {
     #必须与上面一致
    check_gateway
    }
}
```


- 扩展对gateway节点健康检查的脚本，脚本的功能是当该rbd-gateway,rbd-api组件停止服务，则关闭本机的Keepalived，切换VIP

```
[root@gateway01 ~]# vi /etc/keepalived/check_gateway_status.sh 
#!/bin/bash                                                                                             
/usr/bin/curl -I http://localhost:18080/healthz && /usr/bin/curl -I http://localhost:8888/v2/health

if [ $? -ne 0 ];then
                                                                   
     cat /var/run/keepalived.pid | xargs kill

fi

#添加执行权限
chmod +x /etc/keepalived/check_gateway_status.sh
```

- 更改keepalived systemd启动文件，添加两项配置

```
# 添加两项如下
[root@gateway01 ~]# cat /lib/systemd/system/keepalived.service
# /lib/systemd/system/keepalived.service
[Unit]
Description=Keepalive Daemon (LVS and VRRP)
After=network-online.target
Wants=network-online.target
# Only start if there is a configuration file
ConditionFileNotEmpty=/etc/keepalived/keepalived.conf
[Service]
Type=forking
KillMode=process
PIDFile=/var/run/keepalived.pid
# Read configuration variable file if it is present
EnvironmentFile=-/etc/default/keepalived
ExecStart=/usr/sbin/keepalived $DAEMON_ARGS
ExecReload=/bin/kill -HUP $MAINPID
#总是重启该服务
Restart=always
#重启间隔时间
RestartSec=10

[Install]
WantedBy=multi-user.target
```

- 启动服务

启动服务，设置开机自启动

```bash
systemctl start keepalived
systemctl enable keepalived
systemctl status keepalived
```

### 手动校验

在网关节点执行如下命令：

```bash
#关闭rbd-gateway组件
docker stop rbd-gateway
#查看VIP漂移状况
ip a
```

如果在关闭服务后，vip成功在某一台备用节点上启动，则进入下一步；如果vip没有成功漂移，请重新审查本节操作。
