---
title: calico component description
description: "calico component parameter description"
hidden: true
---


### Guardian operation mode

> The node will generate the systemd configuration file of calico and run it through the systemd daemon. You can obtain the systemd configuration file of calico through`systemctl cat calico`  
> calico service is run through the mirror

calico default configuration file`/opt/rainbond/conf/network.yaml`

### Common parameter description

```
-e IP=<Current node IP>
-e CALICO_IPV4POOL_CIDR=<POD CIDR>
-e NODENAME=<UUID>of current node Node
```

### health examination

`/opt/rainbond/health/network.sh` Check if the container is running