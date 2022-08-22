---
title: rbd-dns component description
description: "rbd-dns component parameter description"
hidden: true
---


### Operation mode

Running inside the Kubernetes cluster, POD running, jointly maintained and managed by Kubernetes and Rainbond-Operator


### Common parameter description

```shell
    - --healthz-port port
    for health monitoring - --dns-bind-address address
    for DNS requests - --nameservers upstream dns
    - --recoders resolution record
```

If you need to resolve a domain name through rbd-dns

```
--recoders=goodrain.me=192.168.195.1,*.goodrain.me=192.168.195.1,buhuibaidu.me=172.20.0.101,*.buhuigoogle.me=172.20.0.102
```
Rainbond `rbd-dns`[source address](https://github.com/goodrain/dns)