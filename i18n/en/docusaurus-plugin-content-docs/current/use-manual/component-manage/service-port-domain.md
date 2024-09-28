---
title: component port
description: Rainbond Component Port and Registration Policy Management Documentation
---

The description of the part about ports in "12 elements" of cloud native applications "provides services through port binding, and Internet applications provide services through port binding".The same concept in Rainbond, the component definition port actually defines the external service provided by the current component.Port control includes operations such as port number, port protocol, port access control, and internal component port：variable setting.A component can have multiple ports, which may have different open policies.For example, a port provides HTTP services to the outside world.A port provides data query services to internal components.端口控制包括端口号，端口协议，端口访问控制、对内组件端口别名变量设置等操作，下图是不同团队、不同端口的组件开启了不同访问控制后的示意图：

![](https://static.goodrain.com/images/docs/3.6/user-manual/manage/port-manage.png)

## port number setting

The port of the component should be set to 8080 when the port of the component is fully correlated with the internal application of the container, that is, when the port to listen after the program starts is 8080.Additional ports can be added to the component by adding a port feature. You need to ensure that the added port matches the port that the app listens and select the corresponding port protocol. The port of the component corresponds to the port monitored by the program inside the container. That is to say, when the port monitored by the program is 8080 after the program is started, the port of the component should be set to 8080.You can add other ports to the component through the [Add Port] function. You need to ensure that the added port is the same as the port the program is listening on, and select the corresponding port protocol. Rainbond does not recommend that developers set the component's listening port to 80, which may conflict with the Rainbond mesh layer communication governance.It is recommended that component code supports identifying the value of environment variable `PORT` to establish listening.In this way, the listening port of the component code can be dynamically adjusted on the platform.It is recommended that the component code supports identifying the value of the environment variable `PORT` to create listening.This will make it possible to dynamically adjust the listening port of the component code on the platform.

A component can have multiple ports, which may have different open strategies.For example, a port is an external HTTP service.A port provides data search services for internal components.

> For components built from source code, if the listening port configuration is not defined in the source code, the system adds the port number to 5000 by default.

## port protocol

Different protocol types can be specified for the port. Currently, Rainbond supports `HTTP`,`TCP`,`UDP`and `MySQL` protocols. Please make sure that the selected protocol is consistent with the protocol your program is monitoring.

The choice of protocol affects the subsequent operation of the component：

- Performance analysis function

  > After the components of different protocols start the `performance analysis plug-in` , the performance analysis methods will be different. For example, the HTTP protocol will analyze HTTP-related data, and the MySQL protocol will analyze MySQL statement-related data.

- Access after opening external components

  > When the port is opened for external components, the HTTP protocol will assign the default domain name to , and the non-HTTP protocol will assign the access method of IP + port to.

- Governance of the Mesh layer

  > Providing several layers of governance for a component is directly related to the protocol of the component port.

### port access control

Port access control is divided into two categories：

- In-service

  > Internal service
  > The in here means that within the team, the access permission of the component to the team is enabled. At this time, the current component port will be registered in the team's internal component available pool, and the components within the team can be accessed through [Add Dependent Components]. to this component. Reference <a href="/docs/micro-service/service-mesh/regist_and_discover">Communication between components</a>> Reference to [组件之间的通信](/docs/microservice/service-mesh/regist_and_discover)

- Foreign Service

  > After opening the external component, the platform will register the component port in the team's external component available pool. At this time, the application gateway can access the component according to the access policy configured by the user. At this time,is outside the platform and is the component of other teams inside the platform. The component can be accessed through the domain name or IP assigned by the application gateway. Reference <a href="/docs/use-manual/team-manage/gateway/rules/domain">External Network Access Component</a>> Reference to [外网访问组件](/docs/use-manual/team-manage/gateway/rules/domain)

* After the port is opened for inbound services, if other components want to connect to this component, they need to [Add Dependent Components] to establish an association, and then connect through the connection address or the environment variable.
* Port access control can be turned on and off as needed, individually, or all of them. If the component is a worker program, you only need to connect to other components. There is no need to enable port access without port monitoring.

## Component Access Policy Management

Rainbond automatically generates a default domain name for each HTTP component. Generally, this domain name is long and inconvenient to remember.You can quickly bind a custom domain name in the component port management panel. For several management and advanced settings of component access policies, please refer to <a href="/docs/use-manual/team-manage/gateway/rules/domain">External Network Access Components</a>You can quickly bind a custom domain in the component port admin panel.
For several management and advanced settings of component access strategy, refer to [外网访问组件](/docs/use-manual/team-manage/gateway/rules/domain)
