---
title: Gateway troubleshooting
descrition: This topic describes how to troubleshoot the Rainbond gateway
keywords:
  - Rainbond Troubleshooting Gateway Usage
---

This article introduces the problems and solutions encountered in the use of Rainbond Gateway.

## work process

The workflow of the Rainbond gateway is shown in the figure below:

![](https://static.goodrain.com/docs/5.12/troubleshooting/installation/en-gateway-process.png)

1. After installing Rainbond, a second-level wildcard domain name will be allocated by default, such as `*.7a7b7c.grapps.cn`.
2. 打开组件的对外的 HTTP 访问服务后，默认会给该组件分配一个域名，该域名的分配方式是 **\<组件端口>.\<组件ID>.\<应用ID>.7a7b7c.grapps.cn**，如 `5000.grbc.grcc.7a7b7c.grapps.cn`。
3. After opening the external TCP access service of the component, a port above 10000 will be allocated by default, and the port will be monitored on the host.
4. When a user accesses the `domain name/IP`, it will be forwarded through the Rainbond gateway and forwarded to the corresponding component port.

## common problem

### The domain name cannot be accessed

After opening the external access service of the component, the component cannot be accessed with the default generated domain name, and the prompt cannot be accessed. The usual situation is:

The resolution of the domain name is incorrect; if the gateway IP is not specified, then Rainbond will automatically select the IP resolution, which usually resolves to the internal network IP, resulting in the public network IP being unable to access through the domain name.

### IP:PORT Inaccessible

Usually this happens in the stand-alone trial version, because the stand-alone trial version only opens ten ports 10000-10010 by default. If you need other ports, you need to re-run according to the command printed in the script and specify the `-p` parameter, such as :

```bash
docker run --name rainbond-allinone ...
...
-p 888:8888
- p 10020-10030:10020-10030
...
```

### Domain access shows that the application is in preparation

Displaying this page means that the Rainbond gateway has not found the corresponding back-end component, which belongs to the 404 page. Usually, there are several situations for this phenomenon:

1. Component not started
2. The port of the component is incorrect. For example, the listening port of the actual container is 8080. If the port is set to 8081 and the external service is opened, the corresponding port service cannot be found at this time.

If the configuration is correct, there may be a problem with the gateway itself. You can check the gateway log for troubleshooting:

```bash
kubectl logs-fl name=rbd-gateway -n rbd-system
```
