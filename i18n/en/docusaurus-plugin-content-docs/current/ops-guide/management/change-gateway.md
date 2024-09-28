---
title: Example Change the cluster gateway IP address
descrition: This document is intended for operation and maintenance personnel. How do I change the IP address of the cluster gateway
keywords:
  - Rainbond modify cluster gateway IP
---

When previously users expand or reduce Kubernetes nodes, there is often a problem that directly affects the console and cluster communication when gateway nodes change, where a cluster exception is reflected.This is usually due to the fact that the certificate was not updated when the gateway node was replaced.At this point, users need to edit some CRD files manually, restart rbd-api, etc.This is more demanding for users.Therefore, for user-friendliness purposes.Replacing cluster API addresses with grctl command is now supported.

## Prerequisite

- Install [grctl](/docs/ops-guide/tools/grctl) command line tools

## Action step

1. Copy the generated `token` to the right corner of the **Console right -> Personal Center -> Access Token -> New Access Token**.
2. Execute grctl command, replace cluster gateway IP.

```bash
grctl place ip
--ip=192.168.1.2 \
--domain=http://192.168.1.2:700=
--token=<token值> \
--name=<cluster id>
--suffix=false.
```

Argument Description：

| Parameters | Note                                                                                                                                                                        |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ip         | IP of the gateway node to change                                                                                                                                            |
| domain     | Full access to the console, e.g. http://192.168.1.2:7070    |
| token      | Bottom first token generated in the console                                                                                                                                 |
| Name       | Unique identifier, in cluster page -> Edit -> cluster ID                                                                                                                    |
| suffix     | Whether the domain suffix changes, default false, if the value is specified as true will automatically generate new domain name suffixes and replace them with the given IP |
