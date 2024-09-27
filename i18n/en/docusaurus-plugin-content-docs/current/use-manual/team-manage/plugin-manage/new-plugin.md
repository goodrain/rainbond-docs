---
title: Plugin production
description: Explain how to make a plugin
---

This article mainly introduces the design of the plug-in and the creation process of the plug-in.Make users have a certain understanding of Rainbond plug-ins, and can make simple plug-ins.使用户对 Rainbond 插件有一定的认识，并能制作简单的插件。

### Plug-in system design

The abstraction of Rainbond's plug-in system focuses on the business level of the platform. The theoretical basis is derived from the pod mechanism of Kubernetes and some container concepts.The process of abstracting kubernetes container orchestration at the platform business level and transforming it into a Rainbond plug-in product that is friendly to the user experience, which is convenient for users to use without knowing the principles of Kubernetes.针对平台业务层面对 kubernetes 容器编排进行抽象，转变为一个对用户体验友善的 Rainbond 插件产品的过程，方便用户在不需要懂 Kubernetes 原理的情况下使用。

#### Design Principles

The design of the Rainbond plugin system follows the principles of **easy to understand** and **easy to：**

- easy to understand

In the Rainbond plug-in system, the process of plug-in use is the process of combining the main container with containers such as init or sidecar. Network and environment variables, so some additional functions can be implemented by plug-ins, such as traffic analysis of the main application, etc.

init container

A pod can encapsulate multiple containers, and applications run in these containers; at the same time, a pod can have one or more init containers, which are started before the application container is started.If the init container of a pod fails to start and run, Kubernetes will continuously restart the pod until the init container starts and runs successfully.Of course, we can set the pod's restartPolicy to Never to prevent it from restarting repeatedly.如果某个 pod 的 init 容器启动运行失败， Kubernetes 将不断重启 pod ，直到 init 容器启动运行成功为止。当然，我们可以设定 pod 的 restartPolicy 值为 Never ，阻止它重复启动。

sidecar container

Taking advantage of the ability of containers in a pod to share storage and networking, sidecar containers can scale and augment the "main" container, coexist with it and make it work better.

- easy to use

The easy-to-use principle of the Rainbond plug-in system is reflected in `types of application`,`binding use`,`unique variable scope` and so on.

#### class application

Rainbond 插件体系为插件设计了与应用类似的生命周期，包含创建、启用、关闭等模式，与 Rainbond 平台用户操作应用的习惯保持一致。The Rainbond plug-in system has designed a life cycle similar to that of applications, including creating, enabling, closing and other modes, which is consistent with the habits of users of the Rainbond platform to operate applications.At the same time, the Rainbond plug-in system simplifies the type of plug-in creation and supports creation based on docker image and dockerfile. Creating plug-ins is easier than creating applications.

The plug-in creation process design is shown in the figure below：

![Plugin creation process](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/plugin/Rainbond%E6%8F%92%E4%BB%B6%E5%88%9B%E5%BB%BA%E6%B5%81%E7%A8%8B.png)

It should be noted that when a plug-in version is fixed, its memory, version information, and plug-in variables cannot be modified. These elements only apply to the current plug-in version.When elements such as plugin variables need to be modified, rebuild the plugin by`and`, and repeat the creation process.When making network management and plug-ins, you can use component ports and downstream component ports to monitor them to meet the needs of network management.Generic types and initialization types plugins use no dependencies by default.

创建完成后，用户可以对插件进行针对性设置，目前可以设置变量、插件生效与否和内存设定。After the creation is completed, the user can make targeted settings for the plug-in. Currently, variables, whether the plug-in is valid or not, and memory settings can be set.The memory limit will be limited when the pod is created, and the plugin variables will take effect and real-time modification will continue to be introduced below.

#### Unique variable scope

The variables injected into the container are designed to have two types of：`shared variables` and `plugin variables`.

The shared variable is the variable of the main container. In order to allow the plug-in to participate in or even extend the functions of the main application, the environment variables of the main application are injected into the plug-in container during the pod creation process; variable repetition and mixing.

### Plugin configuration

The plugin information is divided into two parts,`version basic information` and `configuration group management`.Specify the plugin's build sources and the configuration of plugin variables separately.分别指定插件的构建源和插件变量的配置。

#### Version basic information

The version information specifies the plugin's installation source, plugin type, and minimum memory limit.

- installation source

  Rainbond provides two installation sources: `image` and `Dockerfile`.When using a mirror, provide the mirror address.When using the Dockerfile, provide the project source code address.使用镜像时，提供镜像地址。使用 Dockerfile 文件时，提供项目源码地址。

- Plugin type

  Plug-in types have `entry network`,`exit network`,`exit entry co-governance network`,`performance analysis`,`initialization type`and`general type`.

  `ingress network`,`egress network`,`egress ingress co-governance network` and `performance analysis` four types of plug-ins have the default support of Rainbond and are used as the default plug-in type.When users create a new plug-in, they can use `to initialize type` and `to general type` , two completely open types.用户新建插件时，可以使用 `初始化类型` 和 `一般类型` 两种完全开放的类型。

#### Plugin variable configuration

Plugin variables contain dependency metadata types, injection types and configuration item settings

Plug-in variables are set in the way of `configuration management group` , and the settings of plug-in variables are different between different configuration management groups.The settings of the plugin variables include `dependent metadata types`,`injection types` and `configuration items`.其中插件变量的设定包含 `依赖元数据类型`、`注入类型` 和 `配置项`。

- Depends on metadata type

  Depending on the metadata type, you can choose `independent of`, `component ports` and `downstream component ports` three options.

  当制作网络治理、插件时可以使用组件端口和下游组件端口，对其进行监控，实现网络治理的需求。一般类型和初始化类型插件默认使用不依赖。

- injection type

  当依赖元数据类型选择不依赖时，注入类型有 `环境变量` 和 `主动发现`。When the dependent metadata type chooses not to depend, the injection type has `environment variables` and `actively discovered`.Users can use environment variables to set configuration items, or use active discovery to dynamically set configuration items.

- configuration item

  The configuration item supports setting `protocol` and `parameter type`.

  协议设定的目的在于对不同的端口协议进行不同的支持。The purpose of the protocol setting is to support different port protocols differently.After the configuration in the configuration item sets the protocol, if it is inconsistent with the protocol of the listening port, the configuration cannot be performed, and naturally it cannot take effect during the use process.

  The parameter type supports `string`,`single choice` and `multiple choice` three types, providing rich parameter configuration for selection when using the plug-in.If the parameter type is selected as radio, when using this plug-in to configure the parameters, you can select the required value from the set value.如参数类型选择单选，在使用该插件，进行参数配置时，可以从设定值中选择需要的值。

### Plugin production

Here, the default plugin `Alibaba Cloud Log Service Collection Plugin` is used as an example to introduce how to create a plugin.

Refer to the log collection configuration template：officially provided by Alibaba Cloud

```
apiVersion: batch/v1
kind: Job
metadata:
  name: nginx-log-sidecar-demo
  namespace: default
spec:
  template:
    metadata:
      name: nginx-log-sidecar-demo
    spec:
      restartPolicy: Never
      containers:
      - name: nginx-log-demo
        image: registry.cn-hangzhou.aliyuncs.com/log-service/docker-log-test:latest
        command: ["/bin/mock_log"]
        args: ["--log-type=nginx", "--stdout=false", "--stderr=true", "--path=/var/log/nginx/access.log", "--total-count=1000000000", "--logs-per-sec=100"]
        volumeMounts:
        - name: nginx-log
          mountPath: /var/log/nginx
      ##### logtail sidecar container
      - name: logtail
        # more info: https://cr.console.aliyun.com/repository/cn-hangzhou/log-service/logtail/detail
        # this images is released for every region
        image: registry.cn-hangzhou.aliyuncs.com/log-service/logtail:latest
        # when recevie sigterm, logtail will delay 10 seconds and then stop
        command:
        - sh
        - -c
        - /usr/local/ilogtail/run_logtail.sh 10
        livenessProbe:
          exec:
            command:
            - /etc/init.d/ilogtaild
            - status
          initialDelaySeconds: 30
          periodSeconds: 30
        resources:
          limits:
            memory: 512Mi
          requests:
            cpu: 10m
            memory: 30Mi
        env:
          ##### base config
          # user id
          - name: "ALIYUN_LOGTAIL_USER_ID"
            value: "${your_aliyun_user_id}"
          # user defined id
          - name: "ALIYUN_LOGTAIL_USER_DEFINED_ID"
            value: "${your_machine_group_user_defined_id}"
          # config file path in logtail's container
          - name: "ALIYUN_LOGTAIL_CONFIG"
            value: "/etc/ilogtail/conf/${your_region_config}/ilogtail_config.json"
          ##### env tags config
          - name: "ALIYUN_LOG_ENV_TAGS"
            value: "_pod_name_|_pod_ip_|_namespace_|_node_name_|_node_ip_"
          - name: "_pod_name_"
            valueFrom:
              fieldRef:
                fieldPath: metadata.name
          - name: "_pod_ip_"
            valueFrom:
              fieldRef:
                fieldPath: status.podIP
          - name: "_namespace_"
            valueFrom:
              fieldRef:
                fieldPath: metadata.namespace
          - name: "_node_name_"
            valueFrom:
              fieldRef:
                fieldPath: spec.nodeName
          - name: "_node_ip_"
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
        volumeMounts:
        - name: nginx-log
          mountPath: /var/log/nginx
      ##### share this volume
      volumes:
      - name: nginx-log
        emptyDir: {}
```

该模板分为两个容器，一个是日志产生服务，一个是日志收集服务。The template is divided into two containers, one is the log generation service and the other is the log collection service.The two realize shared storage by mounting `nginx-log` storage at the same time, so that the log collection service can collect logs.

In addition to the mirror provided by the log collection service, you need to specify environment variables such as `ALIYUN_LOGTAIL_USER_ID`, `ALIYUN_LOGTAIL_USER_DEFINED_ID`,  `ALIYUN_LOGTAIL_CONFIG`, `ALIYUN_LOG_ENV_TAGS` to configure the log collection service.

With the above template, the idea of building a plug-in will be very clear. First, you need to create a new plug-in by mirroring, and then set the required environment variables in advance.

- Plugin build

On the plug-in page of the team management page, select New plug-in, choose `for the installation source,` for the mirror, fill in the mirror address in the template, and use `general types and` plug-in types to build the plug-in.

- Plugin variable settings

在插件的管理页面中，添加插件 `配置管理组`。In the plugin's admin page, add plugin `to configure management group`.Add the environment variables in the template to the configuration management group of the plugin in the injection method of `environment variable` , using `strings and` parameters, and after installing and enabling the plugin, you can configure these environment variables to make them Takes effect in the plugin container.

Such a log collection plug-in is completed, and it can be installed in a component that generates log files to collect logs and test them on the Alibaba Cloud platform.

For the use of plugins, please refer to chapter [Best Practices](/docs/use-manual/get-start/concept/plugin).

### common problem

- Plugin build failed

Pull the image, build the source code

When the plug-in is built, the build log will be printed on the page, and the log can be analyzed whether it is the problem of pulling the mirror, or the problem of source code compilation during the source code construction process.

- Plugin does not work after installation

Check the image or Dockerfile of the plug-in to make sure that it can run independently, or you can use the log page in the component management page to check the reason why the plug-in cannot run through the real-time log.
