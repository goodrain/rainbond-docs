---
title: Component-dependent port conflict handling
weight: 4004
---

When we deploy a distributed business with multiple services, we must consider how to deal with the communication between services, so when we deploy the business to Rainbond, how do we deal with it?

Rainbond's out-of-the-box ServiceMesh architecture uses Sidecar proxy by default, which transparently solves the communication problem between components in distributed scenarios.

For example, if component A needs to access component B, you can make component A depend on component B, so that component A will start an envoy service as a plug-in at the same time when it starts, and the envoy service will map the inbound port of component B to component A in the Pod network space. The same port of the local loopback address`127.0.0.1`, that is to say, the B component has opened the internal port 8080, then after the dependency relationship between A and B is established, accessing`127.0.0.1:8080`in the A component will Relevant requests are forwarded by envoy to port 8080 of the B component.

But there is often a situation in our actual business, that is, a component needs to communicate with multiple other components, and the service ports used by these components may be the same, which will cause envoy to return to the local loopback address`127.0.0.1`port conflict occurred while listening.

We can solve this problem in two ways：

#### Mode：Port multiplexing through HTTP 7-layer network management

For this type of component, the domain name (Domain), request path, request header and other routing conditions of the downstream component are set through the[network management plug-in](/docs/use-manual/team-manage/plugin-manage/mesh-plugin/), and envoy forwards the request to access the corresponding domain name to the corresponding back-end component port through port 80. The corresponding port of the component network space where the plug-in is activated is no longer monitored. The specific configuration process is as follows：

- build dependencies

  ![build-dependency](https://static.goodrain.com/docs/practice/port-conflict-between-services/build-dependency.jpg)

- Activate the A component network management plug-in

  ![open-plug-in](https://static.goodrain.com/docs/practice/port-conflict-between-services/open-plug-in.jpg)

- Configure the downstream service access domain name

  ![configure-domain](https://static.goodrain.com/docs/practice/port-conflict-between-services/configure-domain-b.jpg)![configure-demo-c](https://static.goodrain.com/docs/practice/port-conflict-between-services/configure-domain-c.jpg)



- Update components and test the effect of domain name access

  ![domain-test](https://static.goodrain.com/docs/practice/port-conflict-between-services/domain-test.jpg)

- Precautions

  The network management plug-in will listen to`127.0.0.1:80`of the service network, so if the A component itself listens to port 80, there will be an abnormal operation of the component status due to the fact that port 80 is already occupied and the service cannot be started.

#### Method：Dynamically change the listening port of the component

The component running on Rainbond will automatically inject an environment variable`PORT`at startup, the value of which is the first port set by the component. You can set the component to refer to the`PORT`variable to set the listening port of the service when the component starts, and set the listening port of the service by Platform control, you can monitor port changes without modifying the code.In this way, different services depend on different ports to avoid conflicts. Taking the source code construction of`Java`project as an example, the specific configuration process is as follows：

- Set build source start command to`web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar`

  ![set-start-command](https://static.goodrain.com/docs/practice/port-conflict-between-services/set-start-command.jpg)

- Add component ports and build components.

  ![add-port](https://static.goodrain.com/docs/practice/port-conflict-between-services/add-port.jpg)

- Verify service listening port

  ![validation](https://static.goodrain.com/docs/practice/port-conflict-between-services/validation.jpg)



> Different development languages and middleware have different ways of setting the listening port. Developers need to make development and configuration according to the actual setting method.

#### Method 30：Use the Kubernetes native Service governance mode

In the upcoming 5.3 version of Rainbond, it will support the direct use of the Kubernetes native Service mode and provide a friendly configuration method. In this network governance mode, each internal port can set a custom access domain name, which will be generated after the setting. Corresponding Service resources, so that components can be accessed directly through the internal domain name + port, and envoy is no longer used for port proxying, which fundamentally avoids the problem of port conflicts.

#### Method 40 Using the：Network Governance Model

In subsequent versions of Rainbond, [Istio network governance mode](https://istio.io/latest/zh/docs/ops/deployment/architecture/)will also be supported. In this network governance mode, only the fixed Pod port configured by Istio will be monitored, not the component ports that need to be accessed, and other components that need to be accessed. Traffic rules and configurations will be set by Pilot and then forwarded by Envoy through 15001/15006.