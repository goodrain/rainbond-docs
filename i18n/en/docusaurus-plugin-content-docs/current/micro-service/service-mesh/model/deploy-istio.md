---
title: Istio network governance model
description: Using the Istio network governance model in Rainbond
---

在Rainbond中，用户可以对不同的应用设置不同的治理模式，即用户可以通过切换应用的治理模式，来按需治理应用，这样带来的好处便是用户可以不被某一个ServiceMesh框架所绑定，且可以快速试错，能快速找到最适合当前业务的ServiceMesh框架。

在当前版本Rainbond中，Istio以"插件"的模式存在，当用户需要使用Istio治理模式时，如果未安装Istio的控制平面，则会提示需要安装对应的控制平面。因此在使用前需要部署Istio的控制平面，控制平面在一个集群中只需安装一次，它提供了统一的上层运维入口，将用来管理工作在Istio治理模式下的服务，完成配置下发等功能。结合Rainbond现有的helm安装方式，我们可以便捷的安装好对应的组件。

## 部署Istio控制平面

### 准备工作

- 创建团队

在 Rainbond v5.5.0 版本中，我们支持了用户在创建团队时指定命名空间，由于默认helm安装的命名空间为 istio-system ，所以为了减少用户配置，我们首先需要创建出对应的团队。如下图所示，团队英文名对应的则是该团队在集群中的命名空间。此处填写 `istio-system` 。

![image-20211212203716453](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-20211212203716453.png)

- 对接商店

Rainbond支持基于helm直接部署应用，所以接下来对接Rainbond官方helm仓库，后续基于Helm商店部署Istio即可， 在应用市场页面，点击添加商店，选择helm商店，输入相关信息即可完成对接。

商店地址：https://openchart.goodrain.com/goodrain/rainbond

![image-20211212203208140](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-20211212203208140.png)

### 安装 Istio 控制平面

目前Rainbond官方Helm商店提供的Istio版本为`1.11.4`，根据 [Istio官方文档](https://istio.io/latest/docs/releases/supported-releases/)，该版本要求的Kubernetes集群的版本为：1.19, 1.20, 1.21, 1.22，如果您的集群是按照Rainbond官方文档部署则已满足该版本要求。

- 安装 base 应用

选择helm商店中的`base`应用进行部署，选择之前创建已创建好的团队，该应用主要部署了Istio相关的集群资源和 CRD 资源。

![image-20211212204419466](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-20211212204419466.png)

点击**确定**后进入base应用界面，无需修改配置，直接点击页面下方**安装**按钮即可，待页面上方出现**已部署**按钮即表示安装完成。

![image-20211212204419466](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/base.png)

- 安装 istio-discovery

同上述base应用一样，选择正确的团队，安装 `istio-discovery`应用，有了这两个应用，就可以拥有 Istio 基础的治理能力了。

- 安装 prometheus

在Istio中，各个组件通过暴露HTTP接口的方式让Prometheus定时抓取数据（采用了Exporters的方式）。所以Istio控制平面安装完成后，需要在istio-system的命名空间中部署Prometheus，将Istio组件的各相关指标的数据源默认配置在Prometheus中。

同上述base应用一样，选择正确的团队，安装 `Prometheus`应用。

- 安装kiali

Istio为我们查看相关服务与配置提供了统一化的可视化界面Kiali ，能够在可视化界面中展示服务拓补关系，进行服务配置。

同上述base应用一样，选择正确的团队，安装 kiali-operator 应用。

安装过程将自动创建Service，通过Rainbond平台第三方组件的形式可将 kiali 的访问端口暴露出来。如下图所示：

![image-20211212212924071](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-20211212212924071.png)

| 配置项       | 值            |
| --------- | ------------ |
| 组件名称      | 自定义          |
| 组件英文名称    | 自定义          |
| 组件注册方式    | Kubernetes   |
| Namespace | istio-system |
| Service   | kiali        |

在端口界面添加访问端口，添加以后打开**对外服务**使用生成的网关策略即可进行访问

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/port.jpg)

kiali登录时需要身份认证token，使用以下命令获取token：

```
kubectl describe secret $(kubectl get secret -n istio-system | grep kiali-token | awk '{print $1}') -n istio-system
```

没有kubectl命令时参考[命令行工具](/docs/ops-guide/tools/#kubectl)文档进行安装。

获取到token登陆至kiali可视化界面，到此完成Istio控制平面的部署。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/dashboard.jpg)

### 使用 Istio 网络治理模式

**1. 切换治理模式**

我们以SpringBoot后台管理系统[若依](https://gitee.com/y_project/RuoYi)为例，如下图所示，用户可以先从开源应用商店安装一个`若依SpringBoot`应用，版本选择3.6.0，点击治理模式切换，选择Istio治理模式。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/network.jpg)

在点击切换为Istio治理模式后，会需要用户手动设置内部域名，此处的内部域名将会是该组件在Kubernetes集群中的service名称，在同一个团队下唯一。这里我们修改为可读性较高的内部域名。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/model.png)

**2. 修改配置文件**

在这一步完成后，我们还需要进入 `ruoyi-ui` 挂载一个新的配置文件。这主要是因为默认情况下，`ruoyi-ui` 的nginx配置文件 `web.conf`  中后端服务地址为 127.0.0.1，在之前使用 Rainbond 内置 ServiceMesh 模式时，该地址可用。

但使用 Istio 治理模式时，组件间通过内部域名进行通信，因此需要通过挂载配置文件的方式修改对应的代理地址，`ruoyi-ui` 的配置文件可以通过右上方的 `Web终端` 访问到容器中，复制 `/app/nginx/conf.d/web.conf` 这个文件的内容。修改代理地址后保存，如下图所示。之前我们设置了控制台的内部域名为 `ruoyi-admin`，所以这里替换为 `ruoyi-admin`。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/conf.jpg)

**3. 重启应用**

在完成以上两步后，我们需要重启整个应用。在启动应用后，进入组件页面查看，可以看到每个组件都有一个类似的Sidecar容器，这就是Istio的数据平面，在应用切换为Istio治理模式以后，该应用下的所有组件都会自动注入对应的Sidecar容器，不需要用户额外设置。

至此，该应用已纳入Istio治理范围，用户如果需要对该应用有更多的配置，则可以参考 [Istio官方文档](https://istio.io/latest/docs/setup/getting-started/#dashboard) 进行扩展。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/dataplane.png)

**4.服务可观测性拓展**

访问kiali可视化界面，在Applications一栏，选中应用所在的命名空间，就可以看到我们之前创建的应用，点击进入，可以看到如下的流量路线。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/overview.png)

在 Graph 一栏，也可以看到对应的应用内的流量请求。更多的配置及相关功能参考 [Kiali官方文档](https://kiali.io/docs/installation/quick-start/)。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/display.png)
