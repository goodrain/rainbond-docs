---
title: Communication variable injection
description: This article explains variable transfer when services are directly dependent
---

> This article is for application developers and operators

Communication variables refer to the necessary configuration variables when using other components to provide services, such as the user name, password and communication address of the database, the authentication method and communication address of the API service, and so on.In a standardized design scenario, the type of service that the formed business code depends on cannot be changed, but the service that it actually depends on can be changed. This design relies on injecting configuration information in the form of environment variables. use case in

article is to rely on standard variable injection to achieve dynamic dependencies of services.

In the component development process, we recommend that developers use environment variables to define the configuration related to communication with other components. For example, spring boot uses the following methods to configure jdbc address：



```
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:127.0.0.1}:${MYSQL_PORT:3306}/${MYSQL_DATABASE:test}
spring.datasource.username=${MYSQL_USER}
spring.datasource.password=${MYSQL_PASSWORD}
```


After the above definition, we actually set a specification. This business component needs a Mysql component, and the relevant configuration is defined through the above variables.What component we use to provide this service is actually decoupling. We can define a Mysql component to provide it, or we can define a Tidb component to provide it. The most important thing is that these components can provide the variable information required above.Therefore communication variable injection is a very useful mechanism in component-dependent communication scenarios.



### Preconditions

1. Create two components A and B, where A depends on B and needs to obtain relevant configuration information
2. Understand the mechanism of communication between Rainbond components. Reference [Inter-component communication document](./regist_and_discover)



### Operating procedures

1. Define the connection address variable： Under the port management page of the management panel of component B (assuming it is a Mysql service), we can define an alias for each port, click the port setting _Use alias_ , in the pop-up window, you can Set the alias of the port, for example, set it to MYSQL. After setting, two variables MYSQL_HOST and MYSQL_PORT of the connection address will be automatically generated.

2. Define other connection variables： Under the dependency management page of the management panel of component B, there is the definition and management of connection information variables, and the definition and management methods are consistent with the environment variables.After entering the panel after step 1, we will find that there are already two variables, MYSQL_HOST and MYSQL_PORT.We can continue to define other variables such as MYSQL_USER, MYSQL_PASSWORD, etc.

3. The variables defined are part of the environment variables and take effect in the current component：Some connection variable variables are also useful for the component itself. For example, variables such as MYSQL_USER and MYSQL_PASSWORD defined by Mysql will be used as the definition variables of the initialization data when Mysql is initialized and started.Therefore, the connection information defined by the component in Rainbond will also take effect in the current component as an environment variable, and the component connection information and environment variables can be transferred to each other.

4. The variables defined by 0 are injected into the component environment that depends on the current component.At this time, we drag and drop A to depend on B in the topology diagram, and then update the A component. After completion, we can check and find that MYSQL related already exists in the environment of the A component environment variables.



### common problem

- The difference between connection information and environment variables

The component's connection information and environment variables have the same effect on the component itself, and will be used as environment variables in its own running environment and plug-in environment.The difference is that connection information is injected into other components that depend on the current component.Equivalent to it is Public.

- Does connection information have to be defined?

We recommend that connection information be defined according to what is actually common and reasonable.
