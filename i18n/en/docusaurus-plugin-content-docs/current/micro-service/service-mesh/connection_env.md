---
title: Injection of inter-service traffic variable
description: This article explains variable passing when a service is directly dependent
keywords:
  - Injection of inter-service traffic variable
  - Service Mesh Variable Injection
---

Communications variables refer to the necessary configuration variables when using other components to provide services, such as the username and communication address of the database, the authentication method of API services and the communication address.In a standardized design scenario, the type of service on which the formed business code relies cannot be changed, but the service actually relied can be changed, and the design relies on infusion of configuration information in an environmental variable.

During component development, we recommend that developers use the environment variable to define the configuration of communication with other components, e.g. spring boot using the following method to configure jdbc address：

```
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:127.0.0.1}:${MYSQL_PORT:3306}/${MYSQL_DATABASE:test}
spring.datasource.username=${MYSQL_USER}
spring.datasource.password=${MYSQL_PASSWORD}
```

After the above definition, we have defined a specification that requires a Mysql component and defines the configuration with the variables above.Which components we use to provide this service is really coupled. We can define a Mysql component or a Tidb component to provide it, most crucially these components can provide the variable information described above.The infusion of communication variables is therefore a very useful mechanism in the communication landscape where the component depends.

### Prerequisite

1. Create two components A, B, where A Dependency B and need relevant configuration information

### Operating processes

1. <b>Defines the connection address variable</b>： In the port management page of component B (assuming it is a Mysql service), we can define aliases for each port, click on the port settings _using alias_ section, and can set an alias for the port in the popup window, such as MYSQL, where two variables MYSQL_HOST and MYSQL_PORTs will be created automatically.

2. <b>defines other connection variables</b>： in the management panel of component B, which are defined and managed in a way that is consistent with environmental variables.We enter the panel after step 1 and find two variables, MYSQL_HOST and MYSQL_PORT.We can continue to define other variables, such as MYSQL_USER, MYSQL_PASSWORD, etc.

3. The <b>variable defines a part of the environment variable as a part of the current component which takes effect on</b>：some of the connecting variables are also useful for the component itself, such as Mysql defining MYSQL_USER, MYSQL_PASSWORD and others as defined variables for initializing data at Mysql initialization.The connection information defined by the Rainbond component will therefore also take effect as an environmental variable in the current component and the component connection information and environment variables can be transferred from one another.

4. <b>The variables defined by</b>：are injected into the context of the component dependent on the current component when we drag and drop a dependency B in the top, then update component A and then we can view the environmental variables that have found MYSQL relevant in the context of component A.

### FAQ

- Distinction between connection information and environment variables

Component connection information and environment variables are consistent for the component itself and are effective as environmental variables in its own operating environment and plugin environment.The difference is that connection information is injected into other components that rely on the current component.Equals it is public.

- Connection information must be defined?

We recommend connecting information based on what is actually a reasonable definition.
