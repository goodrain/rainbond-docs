+++
title = "FAQs"
weight = 30000
pre = "<b>6. </b>"
+++

#### 一般问题

##### 1.好雨是做什么的、什么时候成立的？
> 好雨是一家致力于企业数字化转型建设的云计算服务商，通过Rainbond PaaS产品和服务，实现加速数字业务快速交付、赋能企业IT资源，让云落地进入企业，帮助企业获得面向未来的竞争力和创新能力。2015年成立至今，好雨产品服务以用户业务和最佳技术为驱动，已获得上万用户的体验和使用，其中包括百余家政府、能源、金融、教育行业大中型用户。2017年12月，好雨开放Rainbond源代码，Rainbond进而成为了国内首个开源的无服务器PaaS，深受广大技术爱好者和开源社群青睐。 [企业官网](https://www.goodrain.com)

##### 2.rainbond是什么？
> 好雨云帮（Rainbond） ：“以应用为中心”的新一代无服务器PaaS平台，作为企业应用操作系统，将数字化业务抽象为“应用”，以云帮（rain-）为纽带（-bond），通过“应用生命周期”的管理，连接应用、数据、基础设施等IT资源，实现业务快速交付，并为企业带来价值增长。
>
> > 企业应用包括：各类信息系统、OA、CRM、ERP、数据库、大数据、物联网、互联网平台、微服务架构等运行在企业内部的各种系统。

##### 3.什么是无服务器paas
> 无服务器PaaS（Serverless PaaS）本身并非没有服务器，而是将搭建、设置、管理等在内的服务器相关工作封装起来，交由第三方供应商全权接管，让用户感受不到服务器的存在。rainbond作为无服务器paas，在对接底层资源后，用户在rainbond上进行应用级别的开发运维工作，不需要担心服务器的细节问题，只需在Serverless PaaS环境中执行应用逻辑。当开发者不再受到底层环境问题的掣肘，从而专注开发伟大的应用，那么他必将持续不断地产生价值。 [产品官网](https://www.rainbond.com)

##### 4.跟iaas区别
> rainbond是paas平台，支持私有化部署在任意集群环境里，包括物理机、虚拟机、云服务器等。  同时，好雨科技为了方便技术爱好者快速体验rainbond产品，提供rainbond+阿里云iaas（杭州+上海）的公有云服务，让您感受到与直接对接iaas不一样的开发运维体验。

##### 5.跟rancher的区别、优势对比
> rancher是容器级别抽象的管理平台，可以理解为容器管理的ui界面。需要用户对容器技术有很强的掌控能力，在容器级别进行开发运维操作。
> rainbond是应用级别抽象的管理平台，以应用为中心，不需要用户学习容器技术，即可享受容器技术带来的价值！如果您需要进行容器级别的操作，同时rainbond还提供web shell 的形式，满足您的使用需求。

##### 6.底层是否是容器技术、跟docker、k8s有什么关系
> rainbond底层使用容器技术（docker+k8s），V3.7.2及以往版本，采用魔改后的k8s和docker，帮助用户少踩坑，避免重复造轮子。 V5.0及后续版本讲支持社区版K8s和Docker，帮助用户更好的过渡使用rainbond作为应用全生命周期的DevOps平台。

##### 7.rainbond是否开源
> rainbond于2017年12月12日开源，关注我们：
[产品官网](https://www.rainbond.com)
[Github](https://github.com/goodrain/rainbond)
[Gitee](https://gitee.com/rainbond/Rainbond)

##### 8.功能是否全部开源
> rainbond 是以应用为核心的无服务器paas平台，应用作为平台使用的核心抽象，我们把应用管理后台全部功能开源。

##### 9.使用开源有什么限制
> 使用开源rainbond需要遵守GPLv3 License。 [详情](https://github.com/goodrain/rainbond/blob/master/Licensing.md)

##### 10.我能用rainbond干什么
<blockquote>
<p>Rainbond提供了一种聚焦于应用管理的新一代云计算模式，企业和开发者可以将Rainbond作为公有云或私有云环境下的：</p>
<ul>
<li>持续交付——产品高效上线、快速迭代</li>
<li>高效运维——轻松管理大量服务器</li>
<li>应用市场——提供丰富的一点即用的云端应用</li>
<li>灵活伸缩——支持大用户秒级扩充资源</li>
<li>微服务架构——最成熟的微服务架构解决方案原生支持Service Mesh</li>
<li>云框架——支持各种复杂的技术架构</li>
<li>多数据中心——支持多数据中心管理</li>
<li>多租户——支持租户间的网络与服务隔离</li>
<li>渐进式的混合云——公有云与私有云平滑过渡</li>
</ul>
</blockquote>
##### 11.Rainbond对使用者有什么要求？
> 了解容器化知识和最佳实践将有助于用户使用。


##### 12.使用Rainbond对我的开发习惯有哪些影响、我要做出哪些改变？
> 我们希望开发者能够具备持续部署所开发服务的能力。



##### 13.是否支持二次开发？
> 开源rainbond支持二次开发，但需要遵守GPLv3 License。  [开发者文档](https://github.com/goodrain/rainbond/tree/master/api)

##### 14.开源和企业有什么不同？
>从理念上，开源版更强调用户能够自助使用，好雨仅提供社区支持。 
企业版由好雨负责技术落地，强调开箱即用，并通过知识转移等增值服务，让用户具备掌握平台和相关技术的能力。
从功能上，开源版功能支持企业级开发生产环境使用。 
企业版额外提供更利于操作使用的管理界面，如资源管理后台、saas应用市场等解决方案，帮助企业更快落地相关技术。
[详情](https://www.goodrain.com/industrycloud)

##### 15.企业服务报价？
>好雨科技提供产品买断or订阅+服务买断or订阅，以及定制开发和技术咨询等增值服务。 最终项目报价在基础报价上根据增值项目作适当调整。项目整体预估价格按照开发者人数、交付客户数量、交付集群规模来综合判断。具体请咨询18701654470（微信&手机）

#### 安装问题

##### 1.rainbond是否可以运行在物理服务器和虚拟机上

> Rainbond可以很好的部署和运行在 Intel 架构服务器环境及主流虚拟化环境，并支持绝大多数的主流硬件网络

##### 2.私有部署如何配置内网dns

> Rainbond 安装程序会完成集群DNS的修改。 若你是完全离线的环境，使用Rainbond提供的HTTP域名管理功能，需要离线环境下的DNS支持。

##### 3.访问rainbond应该开放什么端口

> 对外只需要开放80,6060,7070,以及使用tcp协议对外开发的端口默认20000-30000

##### 4.rainbond安装支持那些操作系统

> 支持CentOS 7;Ubuntu 16.04;Debian 9

#### 维护问题

##### 1.如何查看rainbond 服务的状态？

> UI下通过服务总览页面查询或拓扑图查询，命令行下通过grctl service相关命令查询

##### 2.如何上下线节点？

> 开源版本使用grctl node相关命令对节点进行操作

##### 3.如何判断节点状态？

> 根据grctl node list 展示的结果判断节点状态

##### 4.后端创建出多余实例该怎么办？

> 可以通过kubectl 相关命令手动干预Kubernetes资源。正常情况下不会出现多余实例的情况

##### 5.如何查看rainbond各组件日志？

> Rainbond各组件在Linux下通过systemd管理，可以通过journalctl命令查询日志。Windows下通过Windows服务管理，日志一般写入到`c:\rainbond\log`目录下。

##### 6.如何去掉管理节点的计算属性？

> 移除配置文件 /opt/rainbond/conf/k8s-worker.yaml, 停kubelet服务`systemctl stop kubelet`,更新/opt/rainbond/scripts/start-node.sh文件里noderule为manage,重启node`systemctl restart node`

##### 7.更新泛解析域名

> 可以通过grctl domain命令进行操作

#### 开发问题

##### 1.Rainbond支持哪些开发语言？

> 支持[Java](/user-manual/app-creation/language-support/java/) [PHP](/user-manual/app-creation/language-support/php/) [Python](/user-manual/app-creation/language-support/python/) [NodeJS](/user-manual/app-creation/language-support/nodejs/) [Golang](/user-manual/app-creation/language-support/golang/) [静态HTML](/user-manual/app-creation/language-support/html/) [.NetCore](/user-manual/app-creation/language-support/netcore/) [Dockerfile](/user-manual/app-creation/language-support/dockerfile/) 等开发语言。

##### 2.是否支持.net 语言、是否支持windows应用、是否支持windows服务器部署？

>  5.0及以后版本支持Windows开发平台的应用管理和计算节点管理。

##### 3.是否支持helm？

> helm将作为一种语言类型计划于5.1及以后版本支持

##### 4.如何配置maven私服？

> Rainbond支持对接maven私服，对接方式见 [对接Maven私服](/advanced-scenarios/devops/connection-maven-repository/)

##### 5.遗留系统是否能运行在rainbond上？

> 经过众多社区用户验证，大多数遗留系统进行小量的调整即可运行于Rainbond平台。

##### 6.如何对接已有ci/cd？

> Rainbond推荐推荐Jenkins前置CI系统

##### 7.是否支持oracle  jdk ？

> Rainbond默认提供的源码构建环境使用OpenJDK,你可以根据你的需要更换为OracleJDK。Rainbond不承担版权责任。

##### 8.是否支持svn？

> 支持

##### 9.代码拉取失败怎么办？

> 查看服务构建日志查询错误原因。一般错误包括：未授权、网络不通等等

##### 10.Rainbond是否提供镜像仓库管理？

> Rainbond数据中心内置镜像存储仓库，我们认为镜像存储为内部资源，用户正常情况下无需关注镜像仓库资源，因此Rainbond不提供镜像仓库管理，对应的是提供应用的构建版本管理和应用市场管理。

#### 使用问题

##### 1.重启和更新的区别？

> 重启是先关闭服务，再启动，一定会影响服务。更新是进行滚动升级，最大程度上不影响服务。

##### 2.是否支持资源限额？

> 租户级资源限额目前属于企业版功能，应用级资源限额通过设置服务内存量限制。

##### 3.如何备份平台上的mysql 数据库？

> 通过安装Mysql数据备份插件

##### 4.如何自定义mysql配置？

> 5.1以前版本主要基于环境变量定义服务配置，5.1及以后版本将支持动态配置文件模版。

##### 5.健康检查配置错误导致应用无法启动

> 启动时健康检查未通过，服务处于异常状态，状态机将认为服务还未启动成功。

##### 6.如何查看应用持久化存储挂载的宿主机路径？

> 通过grctl service get 命令查询

##### 7.如何查看应用部署在某个宿主机上？

> 通过grctl service get 命令查询

##### 8.如何在平台外访问平台上的数据库？

> 应用网关配置TCP访问策略，指定需要访问的数据库服务

##### 9.应用是否支持跨数据中心迁移？

> 支持，备份应用后可以跨数据中心、跨租户迁移。

##### 10.如何用环境变量动态配置自己的配置文件？

> 根据不同的配置文件支持不同，有些配置文件解析器可以直接读取环境变量。如果不能支持的，5.1版本之前可以采用env2config命令重新渲染配置文件。

#### 架构问题

##### 1.是否支持dubbo、是否支持spring cloud？

> 支持，关于SpringCloud查看文档[Spring Cloud 微服务架构](/advanced-scenarios/micro/spring_cloud/)

##### 2.微服务架构 service mesh 是什么？怎么用？

> [ServiceMesh 简史](https://www.goodrain.com/2018/06/25/tech-20180625/) 一般的字面解释是“服务网格”，作为时下最流行的分布式系统架构微服务的动态链接器，处于服务到服务的通信的专用基础设施层，该层独立于应用程序为服务之间的通信提供轻量级的可靠传递。如果简单的描述的话，可以将它比作是应用程序或者说微服务间的 TCP/IP，负责服务之间的网络调用、限流、熔断和监控，同样使用 ServiceMesh 也就无须关系服务之间的那些原来是通过应用程序或者其他框架实现的事情，比如 Spring Cloud、OSS，现在只要交给 ServiceMesh 就可以了。ServiceMesh的出现主要是由于应用虚拟化技术的发展，例如Kubernetes,Rainbond等项目，大大降低了应用的部署和运维复杂度。

> Rainbond内置ServiceMesh架构文档：[SERVICEMESH微服务架构](/advanced-scenarios/micro/service_mesh/)

#### 插件问题

##### 1.插件是什么？怎么用？

> 应用插件是标准化的为应用提供功能扩展，与应用共同运行的程序，例如：性能分析插件可以实时看到该服务的性能如何，吞吐率、响应时间以及在线人数等；网路治理插件则可以实现智能路由、A/B测试以及灰度发布等
>
>  文档： [插件管理](/user-manual/plugin-manage/)

##### 2.使用服务性能监控插件有什么限制？

> 目前版本默认提供的性能分析插件仅支持Http、Mysql协议分析，其他端口协议无法正常使用。

##### 3.我该如何设计和开发服务插件？

> 查看文档 : [插件设计与开发](/user-manual/plugin-manage/plugin-design-develop/)


{{% button href="https://t.goodrain.com" %}}更多问题浏览Rainbond社区{{% /button %}}