#### Ubuntu keepalived配置

> VIP要保证和当前机器ip在同一网段内。

借助 **keepalived** 完成VIP配置

- 安装

```
#安装所需依赖包
apt-get -y install libssl-dev
apt-get -y install openssl
apt-get -y install libpopt-dev

#安装keepalived
apt-get -y install keepalived

```

- 编辑配置文件

```
#备份原有配置文件，如果没有则自行创建
cp /etc/keepalived/keepalived.conf /etc/keepalived/keepalived.conf.bak
#编辑配置文件内容如下
#主节点

! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL
}
vrrp_script check_gateway {
   script "/etc/keepalived/check_gateway_status.sh" #检测脚本
   interval 5    #执行间隔时间
}
vrrp_instance VI_1 {
    				
    state MASTER    	 #角色，当前为主节点   
    interface ens6f0	 #网卡设备名，通过 ifconfig 命令确定         
    virtual_router_id 51     
    priority 100		#优先级，主节点大于备节点
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        <VIP>				#VIP
     }
     track_script {
    check_gateway  #必须与上面一致
    }
}

#其他管理节点
! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL
}
vrrp_script check_gateway {
  script "/etc/keepalived/check_gateway_status.sh" #检测脚本
  interval 5		#执行间隔时间
  }	
    vrrp_instance VI_1 {
    state BACKUP		 #角色，当前为备节点    
    interface ens6f0	 #网卡设备名，通过 ifconfig 命令确定
    virtual_router_id 51   
    priority 50			#优先级，主节点大于备节点  
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        <VIP>				#VIP
    }
     track_script {
    check_gateway  #必须与上面一致
    }
}
```


- 扩展对gateway节点健康检查的脚本，脚本的功能是当该rbd-gateway,rbd-api组件停止服务，则关闭本机的Keepalived，切换VIP

```
#注意脚本需加执行权限
[root@gateway01 ~]# cat /etc/keepalived/check_gateway_status.sh 
#!/bin/bash                                                                                             
/usr/bin/curl -I http://localhost:10254/healthz && /usr/bin/curl -I http://localhost:8888/v2/health

if [ $? -ne 0 ];then
                                                                   
     cat /var/run/keepalived.pid | xargs kill

fi

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
Restart=always   #总是重启该服务
RestartSec=10 #重启间隔时间
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
docker stop rbd-gateway #关闭rbd-gateway组件
ip a		#查看VIP漂移状况
```

如果在关闭服务后，vip成功在某一台备用节点上启动，则进入下一步；如果vip没有成功漂移，请重新审查本节操作。
