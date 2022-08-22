---
title: "Ubuntu keepalived configuration"
description: "Ubuntu keepalived configuration"
weight: 1010
---

> The VIP must be in the same network segment as the current machine ip.

Complete VIP configuration with **Keepalived**

- Install Keepalived

```
apt-get -y install libssl-dev
apt-get -y install openssl
apt-get -y install libpopt-dev
apt-get -y install keepalived
```

- Edit configuration file

    Notice!The content of the currently called health monitoring script is in the commented state, because it is necessary to ensure that the VIP already exists before installing Rainbond; after the Rainbond installation is completed, the comment needs to be canceled to realize the health monitoring and ensure the high availability of the gateway.

    - master node

```bash
$ vi /etc/keepalived/keepalived.conf

! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL
}
#vrrp_script check_gateway {
# Check script
# script "/etc/keepalived/check_gateway_status.sh"
# Interval time
# interval 5
#}
vrrp_instance VI_1 {

    #Because of the use of non-preemptive mode, here is backup
    state BACKUP 
    #Network card device name, determined by the ifconfig command  
    interface ens6f0       
    virtual_router_id 51
    #Priority, the primary node is greater than the backup node     
    priority 100    
    advert_int 1
    #non-preemptive mode
    nopreempt
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        <VIP>               
     }
# track_script {
# check_gateway
# }
}
```


   - slave node

```bash
$ vi /etc/keepalived/keepalived.conf

! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL
}
#vrrp_script check_gateway {
# Check script
# script "/etc/keepalived/check_gateway_status.sh"
# Interval time
# interval 5
# }    
    vrrp_instance VI_1 {
    #Because the non-preemptive mode is used, here is backup
    state BACKUP 
    #Network card device name, determined by the ifconfig command   
    interface ens6f0
    virtual_router_id 51
    #Priority, the primary node is greater than the standby node   
    priority 50
    advert_int 1
    #non-preemptive mode
    nopreempt
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        <VIP>           
    }
# track_script {
# check_gateway
# }
}
```


- Health monitoring script

 Expand the script for health check of gateway nodes. The function of the script is to turn off Keepalived and switch VIP when the rbd-gateway component stops serving.(both master and slave need to operate)

```bash
$ vi /etc/keepalived/check_gateway_status.sh 

#!/bin/bash                                                                                             
/usr/bin/curl -I http://localhost:10254/healthz 

if [ $? -ne 0 ];then

     cat /var /run/keepalived.pid | xargs kill

fi
```


   Add execute permission

```bash
$ chmod +x /etc/keepalived/check_gateway_status.sh
```


- Change the Keepalived systemd configuration file and add two configurations

    Add two parameters

```bash
$ vi /lib/systemd/system/keepalived.service

# /lib/systemd/system/keepalived.service
[Unit]
Description=Keepalive Daemon (LVS and VRRP)
After=network-online.target
Wants=network-online .target
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
# Always restart the service
Restart=always
# Restart interval
RestartSec=10

[Install]
WantedBy=multi-user.target
```

- start the service

    Start the service and set the boot to start automatically

```bash
systemctl start keepalived
systemctl enable keepalived
systemctl status keepalived
```

- Check if VIP is enabled

```bash
ip a |grep <VIP>
```


**Before proceeding to the next step, please make sure that the VIP already exists. If the VIP does not exist, please review the operation in this section; after the Rainbond installation is completed, please uncomment the configuration file and restart the Keepalived service to implement health monitoring to ensure that the gateway is high available.**
