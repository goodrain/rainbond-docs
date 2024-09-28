---
title: Advanced environment variable configuration
description: Rainbond's advanced usage of environment variables is suitable for developers to refer to, so that applications can effectively interact with the platform.
---

组件的运行环境除了用户自己设置的环境变量以外，平台还会默认注入一些有用的环境变量。另外，一些实验性质的新功能也可能基于设置特殊的环境变量的开启或设置。In addition to the environment variables set by the user, the platform also injects some useful environment variables by default.In addition, some experimental new features may also be enabled or set based on setting special environment variables.Therefore, understanding Rainbond's default environment variable mechanism can enable developers to develop more efficiently in many scenarios, and can also produce applications that are more suitable for Rainbond to run.

### Default injected environment variables

> Generally, the relevant variables are injected according to the relevant properties of the component, so as to facilitate the developer to obtain the information related to the component.

| variable name                                                 | variable                                                                                    | illustrate                                                                                                                                                                                  |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT                                                          | The first port number set by the application                                                | When the application establishes port monitoring, try to obtain the value of the PORT environment variable for monitoring                                                                   |
| PROTOCOL                                                      | http\tcp\mysql etc.                                                         | The protocol type corresponding to the above port                                                                                                                                           |
| TENANT_ID                                | Tenant ID                                                                                   | Tenant ID                                                                                                                                                                                   |
| SERVICE_ID                               | App ID                                                                                      | App ID                                                                                                                                                                                      |
| SERVICE_NAME                             | 应用名称                                                                                        | 应用名称，由应用英文名和组件英文名组成，格式为：应用英文名-组件英文名                                                                                                                                                         |
| NAMESPACE                                                     | 应用所属命名空间                                                                                    | 应用所属命名空间                                                                                                                                                                                    |
| MEMORY_SIZE                              | micro, small, medium, large, 2xlarge, etc. See below for the correspondence | Indicates the memory size setting of the current application instance, generally used for the initialization of application memory-related settings, such as JAVA_OPTS |
| SERVICE_POD_NUM     | Number of application instances                                                             | number of application instances                                                                                                                                                             |
| DEPEND_SERVICE                           | serviceAlias:serviceID,                                                     | dependent application                                                                                                                                                                       |
| HOST_IP                                  | ip address                                                                                  | The IP address of the host where the component is running                                                                                                                                   |
| POD_IP                                   | ip address                                                                                  | IP address of the component runtime                                                                                                                                                         |
| DISCOVER_URL                             | http://xxxxxxx/v1/resources/xxx                                             | Configure the discovery interface address, the plugin running environment is valid                                                                                                          |
| DISCOVER_URL_NOHOST | /v1/resources/xxx                                                                           | Configure discovery URL without IP address, use HOST_IP：6100                                                                                                           |

- The relationship between the component instance memory setting size and the value of the MEMORY_SIZE environment variable

  > It is very beneficial for the program to obtain the memory size set by the current component, such as Java's JVM configuration, PHP's fpm configuration, etc. Some internal middleware that needs to set memory should preferably be coordinated with the memory settings of the component itself, otherwise OOM or memory waste may occur. Case.

  > | 内存/Mb | 环境变量值    |
  > | ----- | -------- |
  > | 128   | micro    |
  > | 256   | small    |
  > | 512   | medium   |
  > | 1024  | large    |
  > | 2048  | 2xlarge  |
  > | 4096  | 4xlarge  |
  > | 8192  | 8xlarge  |
  > | 16384 | 16xlarge |
  > | 32768 | 32xlarge |
  > | 65536 | 64xlarge |

* Description of environment variables for automatic domain name injection:

The application defaults to inject the current component's access domain name environment variable information：DOMIAN and DOMAIN_PROTOCOL. If the component has multiple ports, the injection strategy is as follows

If there are multiple ports,`_ port number`will be added after the environment variable name, that is,`DOMAIN_ port number`For example: DOMAIN_80, DOMAIN_8080

The corresponding domain name protocol is DOMAIN_PROTOCOL_80

2.DOMIAN 变量的值为组件端口号从小到大，自定义域名优先的值。The value of the DOMIAN variable is the component port number from small to large, and the custom domain name takes precedence.For example, there are ports 80 and 8080. If 8080 is bound with a custom domain name, the value of DOMIAN is the custom domain name of port 8080.If no custom domain name is bound, it is the default domain name of port 80.如果都没有绑定自定义域名，则为 80 端口的默认域名。

### Variables used when building the component

Environment variables whose variable names start with`BUILD_`take effect in the construction phase of the source code construction class application, such as the following variable：

| variable name                                                                           | variable                                                                                                                                                                                                                   | illustrate                                   |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| BUILD_REPARSE                                                      | true                                                                                                                                                                                                                       | Re-identify code language type at build time |
| NO_CACHE                                                           | true                                                                                                                                                                                                                       | Build without cached packages                |
| BUILD_MAVEN_CUSTOM_OPTS  | -DskipTests=true -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true | For maven builds, defaults as before         |
| BUILD_MAVEN_CUSTOM_GOALS | clean install                                                                                                                                                                                                              | For maven builds, defaults as before         |

For more component build environment settings, please refer to [Build Source Configuration](./index)

### Application Runtime Function Control Variables

Environment variables starting with`ES_`will be used as extended function variables, such as the following use case：

| variable name                                                                           | variable       | illustrate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ES_SELECTNODE                                                      | Select host ID | Used for fixed-point scheduling, specify scheduling to a host, and the node ID can be obtained through grctl node list                                                                                                                                                                                                                                                                                                                                                                                             |
| ES_HOSTNETWORK                                                     | true           | Whether to use host port mapping, please use this variable with caution                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ES_HOSTNAME                                                        | CPU name       | Set the hostname of the instance, for single-instance components                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ES_CPULIMIT                                                        | 1 core=1000    | CPU limit values for custom components are supported in version 5.0.3 and later                                                                                                                                                                                                                                                                                                                                                                                                    |
| ES_CPUREQUEST                                                      | 1 core=1000    | CPU request values for custom components are supported in version 5.0.3 and later                                                                                                                                                                                                                                                                                                                                                                                                  |
| ES_TCPUDP_MESH_MEMORY    | MB             | Customize the default MESH container memory limit, the default is 128MB                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ES_TCPUDP_MESH_CPU       | 1 core=1000    | Customize the default MESH container CPU limit, the default is 120, the minimum is 120                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ES_HOST_DOMAINNAME                            | IP address     | Customize domain name resolution, generate a resolution record corresponding to DOMAINNAME to IP address in /etc/hosts<br/>比如为组件添加环境变量 ES_HOST_test.goodrain.com（值为 172.18.1.6），则会在组件容器的 /etc/hosts 文件中追加如下内容：<br/># Entries added by HostAliases.<br/>172.18.1.6      test.goodrain.com |
| ES_DISABLE_SIDECAR_CHECK | true           | Turn off the port detection of the dependent service by the MESH plugin, even if the corresponding port of the dependent component is not ready, it will still start its own component                                                                                                                                                                                                                                                                                                                             |

### Efficient use of environment variables for software configuration

The third point of the 12 elements of cloud native applications："Code and configuration are strictly separated, configuration must be completely separated from code, and different environments share a set of code.It is recommended to store application configuration in environment variables".It is recommended that the parts of your program that need to be configured be as variable as possible in the environment.| memory/Mb | environment variable value | | ------- | ---------- | | 128 | micro | | 256 | small | | 512 | medium | | 1024 | large | | 2048 | 2xlarge | | 4096 | 4xlarge | | 8192 | 8xlarge | | 16384 | 16xlarge | | 32768 | |推荐将你的程序需要配置的部分尽可能的环境变量化。
