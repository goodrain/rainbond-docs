---
title: Country production letter
description: Industrial and chemical information and innovation support
keywords:
  - Country production letter
  - Industrial and chemical information and innovation
---

## Introduction

Nationalized credit creation refers to the development and diffusion of Chinese indigenous information technology and innovation industries.The main objective of the country's confidence-building industry is to reduce its dependence on imported technologies and improve its ability to acquire autonomous innovation and core technologies. In the process of digital transition, Rainbond, by integrating cloud and native technologies with national production systems and national production CPU, has made the development, deployment, delivery and delivery of applications more simple and efficient.

## Main features

### Creative Environment Deployment

Rainbond adapted the national production CPU and national production operating systems, while also supporting the deployment and management of the “cloud of multicore” cluster.

#### Country CPU and National Production Operating System support

The Rainbod Enterprise version provides comprehensive support to the national CPU and the national production operating system to ensure that applications operate in a stable environment of domestically produced hardware and software.This includes the optimization and adaptation of a wide range of CPU structures, such as the SAP Peng, Flightenn, Dragon, etc., as well as compatibility with national production operating systems, such as commutation, galaxin rain, monologue, Loronsor, Olara operating system, etc.This support covers not only the basic operating environment but also the optimization of specific hardware and software features to improve performance and security.In addition, the Rainbod platform provides a full developer tool and API interface to help users quickly build and deploy cloud native applications.

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/xinchanang/xinchanang2.png)

#### One cloud of multi-core cluster support

Rainbond supports "a cloud of multich" cluster management, "a cloud of multiple chires" mainly refers to a platform to manage hardware server clusters in different structures. Can support multiple types of chips and solve cloud management problems associated with different types of chip coexistence.Rainbond has provided support in two main areas.

First, in terms of cluster deployment and management.Rainbond allows for the deployment of clusters of different structures through a single control platform, i.e. clusters that manage the x86 architectural structure directly through the page, or clusters that manage the ARM structure, while also supporting the deployment of nodes of different structures within the same cluster.This means that users can monitor and manage clusters across multiple CPU structures in a centralized interface, thus optimizing resource allocation and operating processes.

Second, Rainbod supports the deployment of isomers to support different nodes structures within a single cluster.This feature allows applications of different structures to operate in the same cluster on nodes suitable for them and to communicate seamlessly between them.For example, in the same cluster, ARM-based applications can run on the ARM node, while the x86 architecture-based application is on the x86 node, all of which can be easily achieved through the Rainbond interface.

### Run across schema app compilations

Rainbod supported the automatic compilation of the source x86 application system into compatible nationally-produced CPU, and also provided a repository of national production capacity to help users to settle and reuse various types of national production applications.

#### Cross-CPU Structure Source Compilation

In the traditional application development and deployment environment, most applications are compiled for x86 equipment.However, as the process of national production progresses, an increasing number of applications need to operate on the non-x86 set of instructional CPUs.This means that business systems that were already operating in the x86 environment will need to be recompiled based on the national production server to function properly.This process is not only complex but time-consuming, but also requires considerable human and time input.In addition to finding appropriate language building tools, there is a need to collect the types of dependencies required in the compilation.

Rainbod has a key role to play here.It supports the automatic compilation of the x86 application system with a source code into compatible nationally produced CPU.This function greatly simplifies the traditional compilation process and reduces the complexity of migrating applications to domestically produced hardware platforms.There is no need for users to study and deal in depth with a variety of compilation dependencies and environmental issues, and the building process in Rainbond, which will automatically process these efforts, significantly improving the compatibility of national production applications.

Current supported source types include Java (Maven, Jar, War, Gradle), NodeJS, Golang, Python, PHP, Html, etc.

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/xinchanang/xinchanang3.png)

#### National Productivity Repository

National production compatibility is a system project that requires support from surrounding ecological and national production intermediaries, in addition to the re-codification of the application itself.The application market for Rainbond could be integrated and managed in a differentiated manner through national production capacities, such as compatible applications, intermediates and tools, and gradually replace national production through the accumulation of national production capabilities.

And Rainbond supports automatic matching of apps based on the CPU structure of the current cluster when deployed.Avoid problems where the app will not work properly because the app architecture does not match.

## Manual

### Creative Environment Deployment

1. Environmentally prepared：ensures that the required national production operating systems are installed in the server environment, such as command, Galaxy and so on.
2. Deploy the Rainbond Enterprise Console：and install the Rainbond Console on the NPAS using the docker run command and access it.
3. ClusterIntegration|ClusterIntegration|Create a new cluster in：in the Rainbond console. By adding IP addresses of nodes, the platform will automatically create a Kubernetes cluster and identify architectural information for each node.
4. Monitoring and maintaining：allows you to view the status of each node, CPU architecture, etc. in the Platform Manager-Cluster, and to manage your node's schedule, sorting, and so on.

### Run across schema app compilations

1. Source preparation：uploads your x86 source code into a compressor or directly provides a Git repository address.
2. Automatically identify and compile：new apps in the Rainbond console. Select the source build method. The platform will automatically identify the source type. When built, it will be possible to select an amd64 or arm64 architecture. The platform will be automatically compiled into an application compatible with the selected CPU architecture.
3. Apps running and accessing：compiled apps will run automatically on the corresponding node architecture.Go to the component details at this time and open the external service to quickly access it.
4. The isomer applies to the：referees which will have a transition period during which the arm application and the amd app will need to coexist and communicate.On the platform, when each component chooses its structure at the time of construction, it can be programmed in a drag and drop and can be accessed between components when the programming is complete.
5. Publish to the National Productivity Repository：for apps that are compatible with national production, can be applied in the app view and posted to the National Productivity Repository by publishing functionality, and easy to use by other users.
