---
title: performance analysis
description: Interpretation of Rainbond component performance analysis function
---

Component real-time performance analysis functions depend on the component open performance analysis class plugin. The real-time performance analysis function of the component is completed by enabling the performance analysis plug-in of the component. Rainbond currently provides performance analysis plug-ins that support HTTP protocol and Mysql protocol by default for users to use.

## Component performance analysis

We use three metrics to measure the performance of all types of：

- Response time

Response time is also called delay, and components generally work in the application layer of network communication, such as http, mysql, redis, grpc, etc.The time it takes for a component to process a client request is the response time.If we measure it from the dimension of network packets, it is the time between the first packet of the request packet and the first packet of the response packet.The component responds every time it handles a client request.If we measure from the dimension of the web report, request the first package to reach the middle of the first package to respond to the report.

- throughput rate

The throughput rate is also referred to as the traffic volume, i.e. the number of times the component handles the request within the unit time.

- Error rate

Errors include explicit errors (such as HTTP 500 errors) and implicit errors (such as HTTP returns 200 but the business is wrong), here we mainly focus on explicit errors, each communication protocol has standard error types, such as mysql has query Statement error.The error rate is normally closely related to the saturation of the component.The error rate is normally closely related to the saturation of the component.

To sum up, we have two ideas when implementing performance analysis. One is that in the ServiceMesh network, the agent will report three types of indicators according to different protocols. The second is the currently used method. The performance analysis plug-in bypasses the way to monitor the network communication of the component, so as to directly analyze the above indicators of the component.

## Monitoring effect

The performance analysis data is persistently stored in the Rainbond monitor component for client query.In the component monitoring page, in addition to displaying the monitoring historical data, we also display the request status of http and mysql in real time, such as the execution status of the sql statement requested by mysql.This provides a direct guide for users to refine and optimize.In the component monitoring page, we display control history data to think of real time display as an overlay and mysql request like the execution of the sql statement requested by mysql.This provides a direct guide to users in fine-tuning.

![](https://static.goodrain.com/docs/5.6/use-manual/component-manager/monitor/performance-analysis.png)

## Steps

Install the performance analysis plug-in and enable it.

![](https://static.goodrain.com/docs/5.6/use-manual/component-manager/monitor/open-plugin.png)

After the plugin is activated, update/restart the component to take effect.

## More protocol support

In the TODO list, we plan to support the performance analysis of the grpc protocol, redis protocol, and mongodb protocol.
