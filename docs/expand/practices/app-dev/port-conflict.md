---
title: 组件依赖端口冲突处理
weight: 4004
---

在我们部署具有多个服务的分布式业务时，必须要考虑的一点就是如何处理服务之间的通信问题，那么当我们将业务部署到Rainbond 上时，又是如何去处理的呢？

Rainbond 开箱即用的ServiceMesh架构默认通过 Sidecar 代理的方式，为我们透明的解决了分布式场景下组件间的通讯问题。

例如A组件需要访问B组件，可以让A组件依赖B组件，这样A组件启动时会同时以插件方式启动一个 envoy 服务，而 envoy 服务会将B组件的对内端口映射到A组件 Pod 网络空间的本地回环地址`127.0.0.1`的相同端口，也就是说B组件开通了对内的8080端口，那么在建立了A到B的依赖关系后，在A组件内访问`127.0.0.1:8080`会由 envoy 将相关请求转发到B组件的8080端口。

但是我们实际的业务中经常会出现一种情况，那就是一个组件需要和多个其他组件通信，而这些组件使用的服务端口有可能会相同，这就会导致 envoy 在本地回环地址`127.0.0.1`起监听时出现端口冲突。

我们可以通过以下两种方式解决这个问题：

#### 方式一：通过HTTP 7层网络治理进行端口复用

这一类型的组件，通过[Rainbond网络治理插件](/docs/use-manual/team-manage/plugin-manage/mesh-plugin/)设置下游组件的域名（Domain）、请求路径、请求头等路由条件，由envoy通过80端口将访问对应域名的请求转发至对应的后端组件端口，不再监听开通插件的组件网络空间的对应端口，具体配置流程如下：

- 建立依赖关系

  ![build-dependency](https://static.goodrain.com/docs/practice/port-conflict-between-services/build-dependency.jpg)

- 开通A组件网络治理插件

  ![open-plug-in](https://static.goodrain.com/docs/practice/port-conflict-between-services/open-plug-in.jpg)

- 配置下游服务访问域名

  ![configure-domain](https://static.goodrain.com/docs/practice/port-conflict-between-services/configure-domain-b.jpg)![configure-demo-c](https://static.goodrain.com/docs/practice/port-conflict-between-services/configure-domain-c.jpg)



- 更新组件并测试域名访问效果

  ![domain-test](https://static.goodrain.com/docs/practice/port-conflict-between-services/domain-test.jpg)

- 注意事项

  网络治理类插件会监听服务网络的`127.0.0.1:80`，因此如果A组件本身再监听80端口的，会出现因80端口已被占用服务无法启动而导致的组件状态运行异常

#### 方式二：动态变更组件的监听端口

Rainbond上运行的组件在启动时会自动注入一个环境变量`PORT`，值为组件设置的第一个端口，可以设置组件启动时引用`PORT`变量设置服务的监听端口，将服务监听的端口由平台控制，即可不修改代码实现监听端口变更。这样依赖的不同服务设置不同的端口就可以避免冲突问题了，以`Java`项目源码构建为例，具体配置流程如下：

- 设置构建源的启动命令为`web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar`

  ![set-start-command](https://static.goodrain.com/docs/practice/port-conflict-between-services/set-start-command.jpg)

- 添加组件端口并构建组件。

  ![add-port](https://static.goodrain.com/docs/practice/port-conflict-between-services/add-port.jpg)

- 验证服务监听端口

  ![validation](https://static.goodrain.com/docs/practice/port-conflict-between-services/validation.jpg)



> 不同的开发语言和中间件设置监听端口的方式不同，开发者需要根据实际的设置方式进行开发配置。

#### 方式三：使用 Kubernetes 原生 Service 治理模式

在 Rainbond 即将到来的5.3版本中，将支持直接使用 Kubernetes 原生 Service 模式，并提供友好的配置方式，在这种网络治理模式下，每个对内端口都可以设置自定义访问域名，设置之后会生成对应的 Service 资源，这样组件间就可以直接通过内部域名+端口的方式进行访问，不再由 envoy 进行端口代理，从根本上避免出现端口冲突的问题。

#### 方式四：使用 Istio 网络治理模式

在 Rainbond 的后续版本中也将会支持 [Istio 网络治理模式](https://istio.io/latest/zh/docs/ops/deployment/architecture/)，在这种网络治理模式下，只会监听 Istio 配置的固定 Pod 端口，而不去监听需要访问的组件端口，需要访问的其他组件都会由 Pilot 设置流量规则和配置后交由 Envoy 通过 15001/15006 进行转发。