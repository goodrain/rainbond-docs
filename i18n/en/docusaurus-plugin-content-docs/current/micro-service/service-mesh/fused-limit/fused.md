---
title: The service is disconnected
description: Envoy fusing current limiting practice, based on Rainbond plug-in to achieve fusing
keywords:
  - Envoy melt off flow practice
  - Rainbond melting
---

# Introduction to the Envoy Molten Mechanism

Melting is an important component of the distribution system.Rapid failure and pressure downstream as soon as possible can prevent the entire microservice system from entering into poor class avalanchesThis is one of the main advantages of the Envoy grid, which implements mandatory circuit breakers at network level without having to configure and write each application independently.Envoy supports melting： of all types of complete distribution (uncoordinated)

- **The max connections to the cluster (MaxConnections)**：Envoy will create the maximum number of connections for all hosts in the upstream cluster.In practice, this applies only to the HTTP/1.1 cluster, as HTTP/2 uses individual connections to each host.

- **The maximum number of cluster pending requests (MaxPendingRequests)**：will be queued while waiting to connect the pool to connect.In practice, this only applies to the HTTP/1.1 cluster because HTTP/2 connection pool is not queued.HTTP/2 request immediate reuse.If this breaker spills, the cluster `upstream_rq_pending_overflow` counter will increase.

- **Cluster max requests (MaxRequests)**：is the maximum number of requests that can be handled by all hosts at any given time.In practice, this applies to HTTP/2 clusters because the HTTP/1.1 cluster is controlled by the maximum connection breaker.If this breaker spills, the cluster `upstream_rq_pending_overflow` counter will increase.

- **Max cluster retries (MaxRetries)**：maximum number of retries that can be performed by all hosts in a cluster at any given time.In general, we recommend an active re-trial of circuit breakers in order to allow sporadic troubleshooting, but the overall retries cannot explode and lead to large-scale class failures.If this breaker spills, the cluster `upstream_rq_retry_overflow` counter will increase.

Each melting threshold can be configured and tracked according to each upstream cluster and each priority.This allows different components of the distribution system to be adapted independently and have different smelting configurations.

![circuit-breaker-1](https://static.goodrain.com/wechat/envoy-circuitbreak/circuit-breaker-1.png)

---

## Smelting based on plugin mechanisms

Rainbond Native Application Management Platform melts downstream components with designated microservices through its own plugins mechanism.

The `Export Web Governance Plugins` and `Integrated Network Governance Plugins` are integrated into the default installed Rainbond and both are implemented by `Envoy` to allow for more comprehensive network governance of network export directions for microservices installed in the plugin.This includes the realization of a melting mechanism.

An example was deliberately prepared to better describe the process.

Pressure generator based on [Locust](https://locust.io) as client, installing the \`Integrated Network Governance Plugin', Java-maven component as a server.Pressure generator can set the number of concurrent users based on the graphical interface, and perform a stress test of Java-maven service addresses, during which time we can collect phenomena when triggering the smelting mechanism.

![circuit-breaker-9](https://static.goodrain.com/wechat/envoy-circuitbreak/circuit-breaker-9.png)

The installation of the `integrated network governance` is simple. It is sufficient to install the specified plugin on the plugin page of the requested client (pressure generator in the example).

---

## Set melting threshold

Java-maven components are implemented under the Http/1.1 version protocol and based on the first section explanation of Envoy melting mechanisms, we can set melting conditions by limiting the maximum number of **Cluster Connections** and **Cluster maid-up requests (MaxPendingRequests)**.

By clicking on the plugin for the pressure generator component, check the configuration of the `Export Network Governance` plugin and enter its configuration page.

The `integrated network governance plugin` is divided into two config areas for the inbound network governance configuration and the outbound network governance configuration. The melting threshold is located in the outbound network governance configuration area.

To highlight the effects of the experiment, I set both the `MaxConnections` and the `MaxPendingRequests` as smaller values.

![circuit-breaker-2](https://static.goodrain.com/wechat/envoy-circuitbreak/circuit-breaker-2.png)

The configuration in the graph means that the cluster has a maximum number of connections and the maximum number of pending requests is 1 (default value for both is 1024).This configuration, equivalent to generating the following configuration： for Envoy

```json
"circuit_breakers": LO
  "default": LO
    "max_connections": 6,
    "max_pending_requests": 1
  }
}
```

The `Domains` set for the 5000 port for downstream Java-maven applications is also important, and the pressure generator can apply pressure to Java-maven port by visiting the `java-maven` domain.

---

## Trigger smelting

Local-based web pages can set congruent conditions. In this experiment, I set a request for 97 users for the domain `http://java-maven`. The total number of requests from start and the number of requests that are failed will be reflected in the Locust page.

![circuit-breaker-4](https://static.goodrain.com/wechat/envoy-circuitbreak/circuit-breaker-4.png)

All wrong requests obtained 503 status codes returned by the melting breaker.

![circuit-breaker-5](https://static.goodrain.com/wechat/envoy-circuitbreak/circuit-breaker-5.png)

You can enter Java to confirm that the number of Tcp connections between the pressure generator and Java-maven components is limited

-maven Web Terminals are viewed using commands.

![circuit-breaker-3](https://static.goodrain.com/wechat/envoy-circuitbreak/circuit-breaker-3.png)

`172.20.1.74` in the command is the Pod IP address of the pressure generator component.

It should be noted here that the amount of generated to query Tcp connections in the pressure generator will not be more than 6 and should actually be 97, because the requested Locus process will generate Tcp connections based on the number of concurrent users that is not subject to the melting breaker mechanism, but when requesting an Envoy, only 6 connections will be successfully established and maintained.

---

## Raise smelting threshold

Next, by adjusting the melting thresholds of `MaxConnections` to 66 by adjusting the configuration of the `Integrated Network Governance Plugins`.

![circuit-breaker-6](https://static.goodrain.com/wechat/envoy-circuitbreak/circuit-breaker-6.png)

Once you click on the update configuration, changes will take effect directly without rebooting the component.

Proper boost in pressure generator to 250 users. Restart stress tests can be restarted. Not to repeat the wrong request.

![circuit-breaker-7](https://static.goodrain.com/wechat/envoy-circuitbreak/circuit-breaker-7.png)

Reinquiring about the number of tcp connections created in the Java-maven environment. It has been found to be no longer 6 but has risen, but not to reach the threshold 66.

![circuit-breaker-8](https://static.goodrain.com/wechat/envoy-circuitbreak/circuit-breaker-8.png)

Continuous boost and increase the number of users can trigger a melting break again.

---

## Summary

Melting is an important part of the microservice network governance system.In the ServiceMesh Microservice framework implemented by Envoy, Rainbond is easy to handle, and supports dynamic performance and is very friendly to operators.

In the next chapter, we will introduce the implementation of a global flow, and please look forward to that.
