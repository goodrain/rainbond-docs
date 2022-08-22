---
title: rbd-monitor component description
description: "rbd-monitor component parameter description"
---


### Guardian operation mode

> The node will generate the systemd configuration file of rbd-monitor and run it through the systemd daemon. You can obtain the systemd configuration file of rbd-monitor through`systemctl cat rbd-monitor`  
> The rbd-monitor service runs through the mirror

rbd-monitor default configuration file`/opt/rainbond/conf/master.yaml`

### Common parameter description

```
--alertmanager-address AlertManager address
--cadvisor-listen-port kubelet cadvisor listening port
--config.file Prometheus configuration file path
--rules-config.file Prometheus alerting rules file path
--storage.tsdb.retention Data retention time, default 7 days
```

