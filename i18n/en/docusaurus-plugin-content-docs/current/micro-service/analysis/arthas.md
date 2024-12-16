---
title: Arthas usage
description: The JAVA diagnostic tool Arthas is implemented on Rainbond
keywords:
  - Arthas
  - Performance Analysis
---

Don't worry about what to do with Java business online, `Arthas` helps you solve the following FAQ：

- The class is loaded from which jar package?Why report various related Exceptions?
- Why did I change the code not be executed to?Is it not my commit?Something went wrong?
- Problems cannot be debugged online. Can you only republish by adding logs?
- There was a problem with the data processing of a user on the line, but it is also impossible to debug! It cannot be repeated underline!
- Is there a global perspective to see how the system works?
- What can be done to monitor the current status of JVM?
- How quickly to locate the app's hotspot and generate the flames?
- How do I find a class directly from JVM?

[Arthas](https://arthas.aliyun.com/) (Alsas) is an online diagnostic product that provides real-time access through a global view to the status of the application, load, memory, gc and thread, and can diagnose business issues without modifying the application code, including access to and access to the method, anomalies, monitoring methods time-consuming, class loading information, etc. to significantly increase the efficiency of online problem profiling.

Arthas uses command-line interactive mode while providing a rich range of `Tab` auto-completion, further facilitating the location and diagnosis of the problem.

And Arthas also supports entering command line interaction via Web Console which works for the Arthas Web Console Diagnostic Business when developers do not have server permissions.

## Arthas Integration on Rainbond

**1. Plugin integration**

Install the Arthas plugin from Rainbond Open Source Store and open in the component. When started, `arthas-agent.jar` is automatically launched using `javaagent` in combination with environmental variables.

**2. Arthas Tunnel Integration**

Diagnostic via Arthas is trouble when our microservices have 10+. Developers have no server permissions and access via Web Console can cause particular confusion due to too many visiting addresses.This will require remote managing/connecting multiple Agent via Arthas Tunnel Server/Client.

Arthas Agent will register in Arthas Tunnel via WS to manage uniformly.

Arthas Tunnel can be installed via Rainbond Open Source Store one key.

**3. Arthas Web Console**

For Spring Boot apps there is no need to access Web Console via Arthas Tunnel and add 8563 ports within the component to access Web Console.(Note that websocket support is required for：domain access

![](https://static.goodrain.com/wechat/arthas/10.png)

## Use Arthas to diagnose the Spring Boot app on Rainbond.

### 1. Deploy Spring Boot app

Team -> Add -> Create Component -> Deploy in App Store if you want to use SpringBoot\`.

### 2. Install Arthas Java Agent plugin and configure

**Install Plugins**

Team -> Plugins -> Install Plugins from App Shop -> Search `Arthas-Agent` for one-click deployments.

**Open Plugins**

Get the Arthas Agent plugin for `ruoyi-admin`, in the component -> Plugins -> Undo -> Open -> Open Plugin.

**Environment Variable Configuration**

Configure environment variables for `ruoyi-admin` components, --> Environment Variables -> Add Variable.

| Variable Name                                             | Variable value                                               |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| JAVA_OPTS                            | -javaagent:/arthas-agent.jar |
| ARTHAS_APP_NAME | ruoyi-admin                                                  |
| ARTHAS_AGENT_ID | ruoyi-admin                                                  |

**2.4 Add port and update**

Add 8563 ports and open external services for the `ruoyi-admin` component. Web Console can be accessed via default domain name when the component is completed.

![](https://static.goodrain.com/wechat/arthas/13.png)

## Use Arthas to diagnose SpringCloud app on Rainbond.

Use Arthas Diagnostics for Microservices [Spring Cloud Pig](/docs/microservice/example/pig) deployed on Rainbond and via Arthas Tunnel Unified Management Arthas agent.

### 1. Deployment of Spring Cloud Pig

Team -> Add -> Build Component -> Search for `SpringCloud-Pig` in the App Store.

### Deployment of Arthas Tunnel

Team -> Add -> Generate Component -> Search for `Arthas-Tunnel` in the App Store.

### 3. Install Arthas Agent plugin and configure

**Install Plugins**

Team -> Plugins -> Install Plugins from App Shop -> Search `Arthas-Agent` for one-click deployments.

**Open Plugins**

Open plugins for each microservice component, enter the microservice component -> Plugin -> Open plugin `Arthas-Agent`.

**Configure Environment Variables**

Configure environment variables for each microservice component, add variables in components -> Environment Variables -> Adds.

| Variable Name                                             | Variable value                                               | Note                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| JAVA_OPTS                            | -javaagent:/arthas-agent.jar | JAVA Launch Parameters                                     |
| ARTHAS_APP_NAME | Register                                                     | arthas app name, modified as actual                        |
| ARTHAS_AGENT_ID | Register                                                     | arthas agent ID cannot be the same as other IDs, is unique |

**Configure Relations**

Depends all microservice components on `arthas tunnel`. Apply views to layout mode to drag and drop them.

![](https://static.goodrain.com/wechat/arthas/arthasgif.gif)

**Bulk Update**

Update/Restart all microservice related components.You can bulk actions in the `list`.

### 4. Diagnostics via Arthas Tunnel connection to other Agents

1. Access Web Console via default generated domain name from Arthas Tunnel 8080 port.

2.IP:PORT Fill Arthas Tunnel 7777 in Web Console for External Service Port, 7777 for Agent connected to TunnelSo modify AgentId when connecting to other services via Web remotely

![](https://static.goodrain.com/wechat/arthas/7.png)

## Start with Arthas

### Arthas Command Use

Arthas uses command-line interactive mode while providing a rich range of `Tab` auto-completion, further facilitating problem location and diagnosis, below is part of the command, see document [Arthas命令列表](https://arthas.aliun.com/doc/commands.html).

- dashboard - real-time data panel for current system
- getstatic - View class static properties
- heapdump - dump java heap, heap dump features like jmap command
- jvm - View current JVM information
- Logger - View and modify the logger
- mbean - View Mbean information
- Memory - View JVM memory information
- ognl - execute ognl expression
- perfcounter - View Perf Counter information for current JVM
- sysenv - View JVM environment variables
- sysprop - View and modify JVM system properties
- thread - View current JVM thread stack information
- vmoption - View and modify the related option in JVM
- vmtool - lookup objects from jvm, executeGc

以下是部分命令的使用截图：

![](https://static.goodrain.com/wechat/arthas/15.png)

![](https://static.goodrain.com/wechat/arthas/16.png)

![](https://static.goodrain.com/wechat/arthas/17.png)

### 2. Generate Flame Chart

The `profiler` command supports the flame map that generates the flame of the application.Essentially, the results of the collected samples were generated by ongoing sampling.\
The following commands are executed in Arthas Tunnel Web Console.

**1. Start profiler**

```shell
$ profile start
Started [cpu] profile
```

**2.Stop profile and generate flame map**

By default, the result file is in `html` format and can also specify： with `--format@@`

```shell
$ profile stop --format html
OK
profile output file: /app/arthas-output/20220907-214802.html
```

**3. View Flame Charts via Browser**

Previous html file generated in the specified microservice component, so you need to view the flame in this microservice component.

Enter this microservice component, eg:：pig-auth, add `3658` port in the component port and open external service and visit `http://domain/arthas-output`

![](https://static.goodrain.com/wechat/arthas/9.png)
