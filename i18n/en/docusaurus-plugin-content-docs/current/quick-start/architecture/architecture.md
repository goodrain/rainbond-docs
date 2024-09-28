---
title: Architecture
description: Rainbond Technical Architecture
---

### Rainbond Technical Architecture

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/architecture.svg" width="100%"/>

Rainbond implements the application-centric concept, absorbs excellent community solutions, and forms a data center logic technology architecture that combines application control, application runtime, and cluster control. The physical architecture divided by the storage node to the class node type forms a highly available and highly scalable data center architecture system.

Based on the data center architecture, it is divided into application management control terminals and resource management control terminals according to the target population to serve application development, operation and maintenance and resource users respectively.A multi-data center model that supports users to manage and control multiple data centers at the same time.Multidata centre mode that supports users to manage and control multiple data centres simultaneously.

## Data Center Service Component Description

### Data Center API Service

As an abstract core control service at the data center level, API service provides Restful-style API services to the outside world, and is the only entry for data center control requests. Security control is based on TLS two-way security authentication.Self-signed certificates are distributed to clients.Send the certificate to the client after issuing it on an autonomous basis.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/images/api.png" width="100%"/>

Once an API service request is made available by the Root module. Regular requests to enter the Handle Request Processing module. These requests are mainly requests to operate database models. API services are based on ORM support for the Mysql database and CockroachDB databases.Enter Proxy requests into API and Websocket requests.Discover proxy targets and forward requests by Discover module via the etcd service.The API provided by other components can therefore be forwarded by the API Service Agent via Service Registration.

### Application Gateway Service

The application gateway is the only entry point for external traffic to enter the internal components of the Rainbond tenant, providing HTTP, HTTPs routing, TCP/UDP services, load balancers, advanced routing (A/B testing, grayscale publishing), virtual IP support and other functions.

The design of the application gateway is inspired by the NGINX Ingress Controller. Based on the configuration of converting the monitored Kubernetes resource (Ingress, Service, Secret, Endpoint) model from the kube-apiserver to the Proxy controller, it provides an automatic work, real-time effective, dynamic Hot-configured Layer 7, Layer 4 gateway services.

The application gateway can increase concurrency and basic performance through horizontal expansion, and the general configuration takes effect synchronously in all gateway nodes.For 74IP+For 74IP+

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/gw.png" width="100%"/>

The architectural goal of the single-node application gateway service is to support multiple data sources, support multiple IPs, support high concurrency capabilities, support multiple server capabilities, and support dynamic configuration change capabilities.Based on this, the application gateway architecture is designed as follows：The following： design is required for this Gateway Architecture

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/images/gateway.png" width="100%"/>

The application gateway service integrates the Openresty service as a front-end traffic proxy service. Based on lua, Openresty can be extended. Lua-Config-Controller implements dynamic configuration, Upstream management, and load balancing strategy implementation. Lua-Monitor-Controller implements request data. The record and summary report, Lua-Security-Controller implements the security control of the request.The three Lua modules are driven by Openresty-Controller. The Metric-Controller module aggregates various monitoring data of the gateway and exposes the Metric-Server of the Prometheus specification.Openresty-Controller is driven by data, the data comes from Gateway-Model-Controller, the two layers have no coupling relationship, and it implements standard interface specifications.We can implement drivers based on other proxy services, such as F5, as needed.Three Lua modules are operated by Openresty-Controller, and the Metric-Controller module brings together all types of monitoring data from the gateway and exposes Prometheus to the outside.The Openresty-Controller is data driven, from Gateway-Model-Controller and has no coupling of the two layers and implements standard interface specifications.If needed, we can implement drives based on other proxy services, such as F5.

After the API service request is entered, the router module performs the request distribution, and the ordinary request enters the Handle request processing module. This type of request is mainly the request to operate the database model. The API service supports Mysql database and CockroachDB database based on ORM.The requests entering the Proxy are divided into API requests and Websocket requests.It is up to the Discover module to discover its proxy targets and forward requests through the etcd service.Therefore, APIs provided by other components can forward requests by the API service proxy through service registration.The data model source of the application gateway supports the ingress model of kubernetes or the reduced model discovered from etcd, and the data discovery service drives the dynamic work of the entire gateway.IP is an important resource of the gateway. After the IP-Port-Pool module is started, it will obtain all available IP addresses and ports of the current cluster, and establish the perception of IP address changes. The IP-Manage module will judge whether the gateway policy is based on the IP and port data. Take effect on the current node.

### application building service

<img src="https://static.goodrain.com/images/docs/3.6/architecture/app-ci.png" width="100%"/>

The Rainbond application building service handles the CI process, parses, compiles, and packages the input source including `source code` or `Docker image` or `application market application` , and finally generates the version medium of the application (component).

Package Repository (Artifactory)Traditionally, a complete CI process would include：design, coding, packaging, testing, and release. Since its launch, Docker images have gradually become a new form of packaging for many application codes.Existing CI products have been very mature in source code testing and Pipline, such as Jenkins, Gitlab, etc. Therefore, Rainbond can directly connect with third-party services in the pre-processing of source code or Docker images, which is processed by third-party services. The source code or mirror image is then docked to the Rainbond-Chaos module for application abstraction.

The input sources of Chaos are code repositories that support Git and Svn protocols, and Docker image repositories.If it is source code, Chaos intelligently judges the type of source code, such as Java, PHP, Python, Dockerfile, etc., selects the corresponding BuildingPack (source code builder) for source code compilation according to different source code types, and identifies the operating environment requirements defined in the source code parameters. , application ports, environment variables and other parameters to form the configuration prototype of application abstraction.Source code types other than Dockerfile will be compiled into application code environment package (SLUG) and stored in distributed storage, other generated Docker local images will be stored in data center image warehouse, and application component attributes will be formed in combination with various attribute information of the application.In the case of source code, Chaos intelligent judgement type of source code, e.g. Java, PHP, Python, Dockerfile etc. Select the buildingPack, source constructor based on different source types, while recognizing the operating environment parameters defined in the source code, the application port, environment variables, etc. to form an abstract configuration prototype of application.Source types other than Dockerfile will be compiled into the Application Code Environment Package (SLUG) stored in distributed storage, other generation of Docker local mirrors stored in the Data Center mirror repository, forming component properties in combination with the application's various properties information.

The application building service is a stateless architecture, designed with task executors driven by the message system (rbd-mq). Implemented Git client and mirror warehouse client, integrated SVN client to obtain component build source resources. The task execution process records a complete log, and the event client inputs the log to the rbd-event-log service through the message stream.Each source code build process is controlled by Chaos by calling the native Docker API to create a build container and maintain the container life cycle. Implementation of Git client and mirror repository clients, integrating SVN clients to get component build source resource. The full task execution record log is entered by the client via the message stream into the rbd-event-log service.Each source build process is controlled by Chaos calls the native Docker API to create a container and maintain the container's life cycle.

The source code building process is a very resource-consuming process. Therefore, the application build service supports multi-node deployment to increase the number of concurrently supported build tasks. The maximum number of concurrent builds supported by each node is determined by the number of node CPU cores or manually set by operation and maintenance personnel.

> - About the BuildingPack of source code compilation, please refer to [each language support document](/docs/use-manual/component-create/creation-process).
> - The application construction service supports multi-point high-availability deployment, and multi-point deployment obtains application construction tasks from message middleware.

### Application Runtime Control Service

The application runtime control service instantiates the Rainbond-Application Model and converts it into a Kubernetes resource model, assigns various resources required for application operation, and completes the running state part of the application life cycle. It can be understood as the CD control service. The design points of this service It is the life cycle supervision that supports a large number of applications.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/worker-arch.svg" width="100%"/>

App can experience stops, upgrades and rolls during your life cycle.The application life cycle may experience start, stop, upgrade and rollback.Different application types require different control strategies. For example, stateless applications can perform unordered rolling upgrades, while the upgrade control strategies for stateful applications will be more complex.The Worker service implements lifecycle controllers for various component types, including start, stop, update, and scaling waits.A lifecycle controller, containing start, stop, update, scaled-up waiting for all components types in the workker service.

Application operation requires various external environment support. For example, network resources such as tenant IP and ports need to be allocated. Persistent storage resources need to be assigned according to application settings. For example, shared file storage allocates storage directories, and block storage relies on various plug-ins to allocate storage resources. Establish service discovery and load balancing strategies based on application dependency properties for mesh plugins.Generate scheduling policies based on application properties to call the Kubernetes cluster to schedule application running. Build your service discovery and load equilibrium strategy to build your plugins based on your app's dependence.Generate the scheduler to launch the Kubernetes cluster scheduler application according to the application attribute.

Currently Rainbond uses the following resource types：Deemployment, Statefulset, Service, Ingress, Secretary, ConfigMap, Pod.For users, there is no need to understand these resources and they are not reflected in the products and they are only carriers of applications.

The function of the worker component is divided into a stateful part and a stateless part. In order to realize the cluster deployment of the worker component, the worker elects the master node, and the service elected as the master node will provide the application storage provider and storage statistics service.

The Worker component is a module for the kubernetes-controller controller extension and scheduler extension. Currently, there are local storage providers, shared storage providers for stateful components, etc. It also obtains existing resources in the Kubernetes cluster for Rainbond application components to choose and use .

Worker components can support multi-node deployment to ensure high availability.

### Monitoring service

The design goal of the Rainbond cluster monitoring service is to comprehensively monitor the four dimensions of application business performance level, application container resource level, cluster node level, and management service level. It provides data storage, query, visualization and alarming functions, and supports performance in terms of performance. large-scale clusters.

Prometheus does not support cluster deployment by default, and cannot directly increase monitoring capabilities by expanding nodes.In order to improve the processing capacity of the monitoring system, it currently supports remote storage of stored data to improve data storage capacity; supports configuration synchronization of multiple nodes to provide service availability; supports adjustment of monitoring data storage window and reduces the occupation of memory resources.It is planned to support clustered partitioning of monitoring targets, thereby supporting expansion of nodes to expand monitoring capabilities, and providing a unified query API to shield the underlying data partitions.Rainbond encapsulates the Monitor component based on Prometheus. By automatically discovering various monitoring objects of applications, clusters, and cluster node services from etcd and Kubernetes clusters, and completing the configuration of Prometheus monitoring targets, the monitoring targets are included in the scope of Prometheus monitoring.Each component of Rainbond also implements the monitoring indicators exposed on the exporter side of Prometheus.Automated monitoring of multiple dimensions without user intervention.Automatically monitor multiple dimensions without user intervention.

The Monitor component can automatically configure some default alarm rules. It plans to support obtaining custom alarm rule resources from Kubernetes to generate Prometheus alarm rules to make them take effect dynamically, thereby supporting custom alarm rules. The alarm information is processed by the third-party Alter-Manage system.

Prometheus does not support cluster deployment by default and cannot improve monitoring capacity directly through the expansion of nodes.In order to improve the processing capabilities of the MCS system, support is being provided to improve data storage capacity through remote storage; to support multiple nodes configuration synchronization to provide service availability; and to adjust control data storage windows and reduce the use of memory resources.It is planned to support the clustering of surveillance targets, thereby supporting the expansion of nodes to expand surveillance capabilities and the external provision of a unified query API block data partition at the bottom.

### message middleware service

The MQ component is a lightweight distributed, message persistence and globally consistent message middleware based on Etcd.This component maintains asynchronous task messages and provides multi-topic message publishing and subscription capabilities.This component maintains asynchronous task messages, provides multi-topic message posting and subscription capabilities.

There are many message middleware products on the market, such as ActiveMQ, RabbitMQ,：, etc. According to our requirements, the key attributes such as distribution, persistence, global consistency, light weight, order, etc., the existing message middleware products or More or less dissatisfied.

Etcd is a simple, secure, fast and credible key storage service that plays an important role in our entire system architecture.A basic message system based on the already convenient features of the etcd.Use a key for each subscription theme with etcd control over time series and exclusive mechanisms that allow incoming messages to be consumed sequentially, and the watch mechanism provided by clients via etcd can be very simple subscription messages.Based on this, we have packaged medical API: restul and grpc.Client can easily operate messages in PUB/SUB/SUB.

### Event and Log Processing Service

The logs and message information that the Rainbond platform needs to process includes three categories:：user asynchronous operation logs, application construction logs, and application running logs.

Currently Rainbond uses the following resource types in：Deployment, Statefulset, Service, Ingress, Secret, ConfigMap, Pod.For users, there is no need to understand these resources, and they are not reflected in the product, they are just the carrier of application operation.User asynchronous operation log：For the user operation log, we need to track the final status of each operation in a distributed manner. Currently, the eventlog component judges the final status of the operation according to the log aggregation of each operation.In the process of processing an asynchronous task, other components will send process log records to the eventlog cluster through the gRPC message stream.

Application build log：mainly displays the output information of source code build or Docker image build, which comes from the application build service.

Application running log, currently we divide it into two forms：

(1) Standard output/error output log

For standard output logs, the computing node log collector obtains the log stream through Docker Daemon and separates services. By default, the container logs of all computing nodes are sent to the Eventlog component in real time based on TCP data stream communication, and they are aggregated at the application level for storage. and push it to the UI in real time. In subsequent versions, the log collector will realize the connection with the third-party log system and directly deliver the logs to the third-party log processing platform.

(2) Business logs (access logs) output to persistent files

For business logs output to the persistent directory, it is generally necessary to automatically analyze them, such as connecting to the ELK system. Therefore, install a log processing plugin in the plugin system to collect log files from the persistent directory and send them to a third-party log analysis service.

The log processing design requirement for the cluster is to support log aggregation, storage, real-time push and query.And can support a larger log volume.and can support a larger amount of logs.

According to the above log type analysis, operation logs are limited log streams whose main requirements are to implement storage and implement push clients.The processing link for such logs is mainly that the grpc message stream accepts logs from various component clients, aggregates and stores logs in units of events, and simultaneously propagates them in the cluster, thereby providing distributed logs to clients. Subscription capability.Realize the effect of single-node storage and multi-node readability.Etcd is a simple, secure, fast, and trusted key-value storage service that plays an important role in our entire system architecture.It is very convenient to implement a basic message system based on the existing features of etcd.A key is used for each subscription topic. The timing and exclusive mechanism are controlled by etcd, so that incoming messages can be consumed in sequence. The client can subscribe messages very simply through the watch mechanism provided by etcd.Based on this we wrap two types of APIs: restful and grpc.The client can conveniently operate the PUB/SUB of the message.Achieve single-node storage, multiple nodes readable effects.

Based on the open source Artifactory project, it serves all third-party class libraries and file packages required for application construction based on source code, storage or proxy application construction.It is a necessary component for source code construction, and it can be connected to other package repositories within the enterprise.The application running log is an infinite log stream with many log sources, which is determined by the amount of applications existing in the current cluster and the amount of logs generated by each application.Therefore, in order to support the huge amount of application logs, the eventlog service implements the partitioned log processing capability, and flexibly adjusts the log processing nodes in units of components (service_id). The running logs of the same component are passed through the log collection service of each computing node. The TCP message flow sends the log to the specified eventlog service node. After the eventlog service receives the log, the log is aggregated, buffered and placed on the disk.It also provides real-time push capabilities to subscribing clients.When the client subscribes, the rbd-api service loads the specified eventlog service node according to the subscribed service_id information.It also provides real-time push capability to subscribers to clients.Client subscription is loaded to the specified eventlog service node by the rbd-api service based on subscription_id information.

The Node component is the basic service formed by the Rainbond cluster, and all nodes in the cluster need to run this component.Provides key capabilities such as node information collection, cluster service maintenance, application log collection, and application runtime support.The cluster nodes of the Eventlog service need to communicate with each other, including operation log stream sharing and processing capacity reporting to determine the processing nodes of the application running log.Therefore, the nodes of the Eventlog service realize the inter-node communication through the ZeroMQ subscription mode. ZeroMQ is a high-performance message library, based on which to ensure the communication performance between the Eventlog services.The worker nodes of Eventlog make full use of the memory buffering mechanism when processing logs to improve the throughput of log messages and reduce the pressure on the disk.Eventlog working nodes process logs fully use memory buffers to improve log message throughput while reducing pressure on disk.

The Eventlog service is a stateful cluster service that supports horizontal scaling to improve application log processing capabilities.

### Cluster, node management services

The Node component is the basic service of the Rainbond cluster and needs to run all nodes in the cluster.Provides key capabilities for nodal information gathering, cluster service maintenance, application log gathering, app running support, etc.

Kubernetes Master includes three components, Kube-apiserver, Kube-ControllerManager, and Kube-Scheduler in version 1.10.11.The Node component has two roles, the master role and the worker role.Generally, the Node running on the management node has the master role. The master role maintains the status and information aggregation of all nodes, and provides API query services. The worker role node regularly reports the status to the master node.

<img src="https://static.goodrain.com/images/docs/3.6/architecture/rainbond-cluster-ctl.png" width="100%" />

The node controller first acts as a daemon for the current node running service, similar to Kubelet.The service or health detection item that each node needs to run is defined through the yaml format in /opt/rainbond/conf directory.When the controller starts it will read the configuration under this directory, call the systemd daemon to start the service for which it needs to be launched, and the health monitoring project will generate the health detection controller based on the configuration.This is mainly designed to achieve the project to extend the monitoring of the kubernetes nodes for cluster automation.The node controller will maintain the status of all configuration items and report them to master node.For abnormal service controllers will try to reboot the recovery service according to the rules. If this is not possible, master node will be advised to set the current node unhealthy and depart from the available range until the node recovers.

In terms of monitoring, Node exposes various monitoring indicators at the operating system and hardware level of the node (integrating promethes node-exporter), and as a collector of application performance analysis data, it converts and exposes application performance analysis indicators.All exposed monitoring metrics are collected by the rbd-monitor service.All exposed monitoring indicators are collected by the rbd-monitor service.

The DNS service provides DNS resolution services for the cluster, based on the secondary development of Kube-DNS.The Node service group running on all computing nodes builds the running environment support for running applications in the tenant network, especially ServiceMesh support and plug-in dynamic configuration query support.The Node service provides a general configuration discovery API and service discovery API to support the application architecture running on the current node. On this basis, it provides the XDS Server service and provides dynamic configuration for the built-in ServiceMesh architecture.

<img src="https://static.goodrain.com/images/docs/3.6/architecture/ServiceMesh.png" width="100%"/>

The node controller first acts as a daemon task for the current node running service, similar to Kubelet in this respect.The services or health check items that each node needs to run are defined in the /opt/rainbond/conf directory in the format of yaml.After the controller is started, it will read the configuration in this directory, call the systemd daemon to start the service for the service that needs to be started, and generate the health check controller according to the configuration for the health check project.The design here is mainly to realize the automatic operation and maintenance of the cluster and expand the monitoring project of kubernetes nodes.The node controller will maintain the state of all configuration items and report to the master node.For an abnormal service controller, it will try to restart and restore the service according to the rules. If it cannot be restored, it is recommended that the master node set the current node to an unhealthy state and leave the scheduling availability range until the node is restored.The node controller log collection module implements log collection for all application containers of the current node.By obtaining the container list and log driver configuration in real time from Dockerd, a log copyer driver for each container is generated. There are multiple implementations of the log copyer driver. The default implementation is to transfer logs to the eventlog service.It also supports drivers of other log collection services, such as ES.Also supports the drivers of other time log collection services, such as ES.

### Application Web Terminal Control Service

This component implements web connecting to the Container Contain.This component implements the function of connecting to the container console through the web.This component communicates with the UI through WebSocket. Users can send various shell commands by simulating the web terminal. The webcli executes commands in the container through the exec method provided by kube-apiserver and returns the results to the web terminal.

The rbd-webcli service can intercept and sanitize all user commands.Prevent malicious command injection, and realize terminal-to-browser through the communication mode.Prevent malicious commands from injecting, use communication mode to get terminals to browsers.

### metadata storage service

Rainbond data center metadata currently supports storage in Mysql database or CockroachDB database.The database mainly stores the basic metadata of the application model, and does not record the running state data of the application.Running state data is mainly maintained by the Kubernetes cluster or recorded in the ETCD service.The database primarily stores basic metadata for the application model, and does not record the application's operating state data.Running data is mainly maintained by Kubernetes clusters or recorded in ETCD services.

5.1.8 and earlier versions support Mysql 5.6

5.1.9 and later versions support Mysql 5.7 8.0

### Mirror Repository Service

Based on the open source [Distribution](https://github.com/docker/distribution) project, it is used for container image storage in the current data center.

## Description of business logic layer components

### application console

As the key module of Rainbond's application-centric abstraction, the application console UI component is oriented to application developers and application users.Based on the front-end and back-end separation architecture design of Django+Ant design, it provides users with application abstraction, application group abstraction, data center abstraction, and application market abstraction to provide interactive experience.Realize the complete application creation, management process, application delivery and sharing process, etc.Based on the Django+Ant design structure design that provides an interactive view of the user's abstraction, the group abstraction, the data centre abstraction, and the market abstraction.Achieve full app creation, management process, app delivery sharing process, etc.

### Resource Management Console (Enterprise Edition)

The resource console UI component provides Rainbond cluster resource management. It is planned to support the resource management capability of docking with IaaS, and is designed for operation and maintenance personnel.Pay attention to the management of node physical resources, cluster resources, management service resources, actual application resources, and tenant resources.A key display platform for Rainbond's automated operation and maintenance capabilities.Focus on the management of nodal physical resources, cluster resources, management of service resources, application of actual use resources, tenant resources, etc.A key display platform for sustaining automated transport capabilities.

## Component deployment

[Component Deployment Architecture Documentation](/docs/ops-guide/component/)
