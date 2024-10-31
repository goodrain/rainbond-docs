---
title: 插件制作
description: 讲解如何制作插件
---

本文主要内容介绍插件的设计和插件的创建过程。使用户对 Rainbond 插件有一定的认识，并能制作简单的插件。

### 插件体系设计

 Rainbond 的插件体系抽象集中在平台的业务层面，理论基础源于 Kubernetes 的 pod 机制和一部分容器概念。针对平台业务层面对 kubernetes 容器编排进行抽象，转变为一个对用户体验友善的 Rainbond 插件产品的过程，方便用户在不需要懂 Kubernetes 原理的情况下使用。

#### 设计原则

Rainbond插件体系的设计遵循 **易于理解** 和 **易于使用** 的原则：

- 易于理解

在 Rainbond 插件体系中，插件使用的过程即主容器与 init 或 sidecar 等容器结合的过程，原理是将插件容器以 sidecar 容器（大部分）的形式编排至主应用的 pod 中，共享主应用容器的网络和环境变量，因此可以插件化实现某些附加功能，例如对主应用进行流量分析等。

init容器

一个pod可以封装多个容器，应用运行在这些容器之中；同时，pod 可以有一个或者多个 init 容器， init 容器在应用容器启动之前启动。如果某个 pod 的 init 容器启动运行失败， Kubernetes 将不断重启 pod ，直到 init 容器启动运行成功为止。当然，我们可以设定 pod 的 restartPolicy 值为 Never ，阻止它重复启动。

sidecar容器

利用 pod 中容器可以共享存储和网络的能力， sidecar 容器得以扩展并增强“主要”容器，与之共存并使其工作得更好。

- 易于使用

Rainbond插件体系易于使用的原则体现在 `类应用化`、`绑定使用`、`独有的变量作用域` 等方面。

#### 类应用化

Rainbond 插件体系为插件设计了与应用类似的生命周期，包含创建、启用、关闭等模式，与 Rainbond 平台用户操作应用的习惯保持一致。同时， Rainbond 插件体系简化了插件创建类型，支持基于 docker image 和 dockerfile 创建，创建插件比创建应用更加简单。

插件创建流程设计如下图所示：

![插件创建流程](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/plugin/Rainbond%E6%8F%92%E4%BB%B6%E5%88%9B%E5%BB%BA%E6%B5%81%E7%A8%8B.png)

需要注意的是，当一个插件版本固定后，其内存、版本信息、插件变量无法再做修改，这些元素仅作用于当前插件版本。需要修改插件变量等元素时，对插件进行`重新构建`，重复创建流程即可。

创建完成后，用户可以对插件进行针对性设置，目前可以设置变量、插件生效与否和内存设定。内存的限制将在 pod 创建时进行限制，插件变量生效与实时修改在下文中会继续介绍。

#### 独有的变量作用域

注入到容器内的变量设计为有两类：`共用变量` 与 `插件变量`。

共用变量就是主容器的变量，为使插件参与甚至扩展主应用的功能，在 pod 创建过程中将主应用的环境变量注入到了插件容器中；插件变量则仅作用在该插件容器内部，防止插件间的变量重复与混用。

### 插件配置

插件信息分为两部分，`版本基础信息` 和 `配置组管理`。分别指定插件的构建源和插件变量的配置。

#### 版本基础信息

版本信息中指定插件的安装来源、插件类型和最小内存限定。

- 安装来源

  Rainbond 提供 `镜像` 和 `Dockerfile` 两个安装来源。使用镜像时，提供镜像地址。使用 Dockerfile 文件时，提供项目源码地址。

- 插件类型

  插件类型有 `入口网络`、`出口网络`、`出口入口共治网络`、`性能分析`、`初始化类型`和`一般类型`。

  `入口网络`、`出口网络`、`出口入口共治网络` 和 `性能分析` 四种插件类型有 Rainbond 的默认支持，作为默认插件类型使用。用户新建插件时，可以使用 `初始化类型` 和 `一般类型` 两种完全开放的类型。

#### 插件变量配置

插件变量包含 依赖元数据类型、注入类型和配置项设定

插件变量以 `配置管理组` 的方式进行设定，不同配置管理组之间，插件变量的设定不同。其中插件变量的设定包含 `依赖元数据类型`、`注入类型` 和 `配置项`。

- 依赖元数据类型

  依赖元数据类型可以选择 `不依赖`、 `组件端口` 和 `下游组件端口` 三个选项。

  当制作网络治理、插件时可以使用组件端口和下游组件端口，对其进行监控，实现网络治理的需求。一般类型和初始化类型插件默认使用不依赖。

- 注入类型

  当依赖元数据类型选择不依赖时，注入类型有 `环境变量` 和 `主动发现`。用户可以使用环境变量的方式设定配置项，或者使用主动发现，动态的进行配置项的设定。

- 配置项

  配置项支持设定 `协议` 和 `参数类型` 。

  协议设定的目的在于对不同的端口协议进行不同的支持。配置项中的配置设定协议后，如果与监听端口的协议不一致则不能进行配置，自然在使用的过程中也不能生效。

  参数类型支持 `字符串`、`单选` 和 `多选` 三种类型，提供丰富的参数配置，供在使用插件时进行选择。如参数类型选择单选，在使用该插件，进行参数配置时，可以从设定值中选择需要的值。


### 插件制作

这里以默认插件 `阿里云日志服务收集插件` 为例，介绍如何制作插件。

参考阿里云官方提供的日志收集配置模板：

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

该模板分为两个容器，一个是日志产生服务，一个是日志收集服务。两者通过同时挂载 `nginx-log` 存储实现共享存储，使日志收集服务可以收集到日志。

日志收集服务除了提供的镜像外，需要指定 `ALIYUN_LOGTAIL_USER_ID`、 `ALIYUN_LOGTAIL_USER_DEFINED_ID`、  `ALIYUN_LOGTAIL_CONFIG`、 `ALIYUN_LOG_ENV_TAGS` 等环境变量，用于配置日志收集服务。

有了上述模板，构建插件的思路就会很清晰，首先需要通过镜像的方式新建插件，其次将需要的环境变量提前设定好。

- 插件构建

在团队管理页面的插件页面，选择新建插件，安装来源选择 `镜像` ，填写模板中的镜像地址，使用 `一般类型` 插件类型进行插件的构建。

- 插件变量设定

在插件的管理页面中，添加插件 `配置管理组`。将模板中的环境变量以 `环境变量` 的注入方式，使用 `字符串` 参数类型，添加到该插件的配置管理组中，安装并开通使用该插件后，就可以配置这些环境变量，使其在插件容器中生效。

这样一个日志收集的插件就制作完成了，可以将其安装到某个会产生日志文件的组件中收集日志到阿里云平台进行测试。

插件的使用可以参考 [最佳实践](/docs/use-manual/get-start/concept/plugin) 章节。

### 常见问题

- 插件构建失败

拉取镜像，源码构建

插件构建时会打印构建日志到页面上，可以通过日志分析是拉取镜像问题，或者是源码构建过程中源码编译问题。

- 插件安装之后无法运行

检查该插件的镜像或 Dockerfile ，确定其可以独立运行，也可以通过组件管理页面中的日志页面，通过实时日志排查插件无法运行的原因。