---
title: Component Basic Operations
description: Rainbond component basic life cycle operation instructions document
---

### Component Basic Operation

First, a basic description of the operations that the component can perform：

| Basic operation               | illustrate                                                                                                                                                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Construct                     | The build action will trigger the component to fetch the latest code from the build source or mirror the new version of the build component, and by default a rolling upgrade will be triggered after a successful build.      |
| Update (rolling upgrade)      | The update operation will perform a rolling upgrade of the component instances running in the cluster with the latest component property configuration                                                                         |
| start up                      | Components with at least one available build can start                                                                                                                                                                         |
| stop                          | When the component stops, all cluster resources are released                                                                                                                                                                   |
| access                        | The running component can be accessed. If it is an HTTP component, it will jump to the access URL. If it is not HTTP                                                                                                           |
| web terminal                  | Enter the current component web terminal control page, select the container to be controlled to open the container control terminal                                                                                            |
| reboot                        | The running component can be restarted. Under normal circumstances, we recommend using the update operation to complete the component restart. If any properties of the component have not changed, the update cannot be used. |
| Modify the owning application | Components can be flexibly adjusted to the application they belong to                                                                                                                                                          |
| delete                        | Removing a component is a dangerous operation, please proceed with caution.Persistent data is retained for 7 days by default after a component is deleted.                                                                     |

### build operation

> Applies to any state of the Scenario：component

For different types of components, after triggering the `build` operation, they have different meanings. The following table explains the different types of components.：

| component type                                  | illustrate                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Components built from source                    | Pull the latest source code, build component versions based on pre-identified language types, and perform rolling upgrades                                                                                                                                                                                                                           |
| Components built from Docker images             | Re-pull the mirror of the specified mirror address, build a new version of the component and perform a rolling upgrade                                                                                                                                                                                                                               |
| Components built from cloud market applications | If there is no updated version of the cloud market application, the build operation will remind the user that no operation is required. If there are multiple updated versions, the user will be prompted to select the version number to be obtained.Get component media to generate builds based on selected versions and perform rolling upgrades |

- The Dockerfile source code component is a service created by placing the Dockerfile and the required files in the code repository (Git/Svn).
- After the build, if everything goes well, the component will automatically switch to the new version and go online. The build operation defaults to update and upgrade, or you can set the process of not upgrading after build in other settings.
- The rolling upgrade process has no effect on multi-node components in theory. For single-node components, if the business-level [health check](/docs/use-manual/component-manage/other/) is normally configured, the upgrade can be achieved without impact.
- For a component in a closed state, after triggering the build operation, if the build is normal, the platform will run the component.

#### Attributes Supported by Cloud Market Component Upgrade

When upgrading cloud market components, not all attributes support the upgrade; when upgrading, the processing methods of various attributes will be different. The details are shown in the following table:

| Attributes                 | Whether to support upgrade | Metadata (upgrade method)                                                                                                            | illustrate                                                                                                                                                                      |
| -------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instance options           | Yes                        | renew                                                                                                                                |                                                                                                                                                                                 |
| memory options             | Yes                        | renew                                                                                                                                |                                                                                                                                                                                 |
| dependencies               | Yes                        | Increase                                                                                                                             | If the dependent components are in the same application, add the dependency; otherwise, do not process                                                                          |
| port                       | Yes                        | update, increase                                                                                                                     | For port upgrade, existing port information can be updated, or new ports can be added; but existing ports cannot be deleted                                                     |
| storage                    | Yes                        | Increase                                                                                                                             | For storage upgrade, only new storage can be added; existing storage cannot be deleted or modified                                                                              |
| Health check               | Yes                        | renew                                                                                                                                | For the upgrade of health check, the existing health check information can be modified, but cannot be deleted or added (a component can only have one health check information) |
| mirror                     | Yes                        | renew                                                                                                                                | Change directly to the new mirror                                                                                                                                               |
| environment variable       | Yes                        | Increase                                                                                                                             | The upgrade of environment variables only supports adding new environment variables; cannot modify or delete existing environment variables                                     |
| startup parameters         | Yes                        | renew                                                                                                                                |                                                                                                                                                                                 |
| dependent storage          | Yes                        | If the component where the dependent storage is located is in the same application, add the dependency; otherwise, do not process it |                                                                                                                                                                                 |
| With or without state type | no                         |                                                                                                                                      |                                                                                                                                                                                 |
| Label                      | no                         |                                                                                                                                      |                                                                                                                                                                                 |

### update operation

> Using Scenario：Runtime Components

When the dependencies, storage, environment variables, features, health monitoring and other running properties of components are changed, you must manually trigger the update operation to configure the latest properties in the running environment of the applied components. In this update process, rolling upgrade is adopted by default. The strategy for upgrading component instances.

There are two types of control strategies for rolling：

- stateless components

For stateless components, an out-of-order start-and-stop strategy is adopted, that is, the running instance of the new version is started first, and the running instance of the old version is shut down when it is in a healthy running state.It should be noted that in this process, multiple versions will work at the same time. If your business component cannot tolerate multiple versions working at the same time, please use the restart strategy.

- stateful components

For stateful components, an orderly shutdown and then stop strategy is adopted, that is, according to the running instance number, the first instance is closed first and then the new version instance is started.

This control is critical for components like database, so do not deploy database-like components as stateless components.

### start action

> A component that is successfully built using scenario：and is in a closed state

The startup operation will start the last successfully built component version. After startup, you can see the detailed operation log of the platform scheduling and processing components in the `operation log` of the component overview page. When the scheduling is completed, the component will enter the startup phase. View the startup log of the component through the `log` page.

Especially for the components that are started in Rainbond for the first time, the following points should be paid attention to：

1. <b>What if the component startup or update times out?</b>

> At present, Rainbond has determined a fixed timeout for asynchronous tasks, so please note that the timeout is not a failure. You need to optimize the configuration of the components according to the actual situation. If there is a timeout, please check according to the following path：
> 
> - Query [component log](../service-log#组件运行日志) to determine the startup status of the component. If your component log is not output to stdout or stderr, please enter the component container to query your log.For example, for some Java components, if the allocated memory is insufficient, the startup will be very slow, or it may be found from the log whether the component running environment is normal, such as depending on the database, and whether the database can be accessed normally.
> - If the component built from source code does not enter the normal business startup process for a long time after startup, please optimize the code and ignore the redundant source code files to reduce the time of running code decompression. Refer to [slugignore file usage method](/docs/use-manual/component-create/language-support/slugignore)
> - Make sure that the address the component is listening on is not 127.0.0.1 or localhost
> - If the component listening address is correct and has been monitored normally, please check whether the [component health check](/docs/use-manual/component-manage/other/) configuration is correct. Generally, if the component has multiple ports, the default configuration error is likely to occur.
> - If the possible faults of the above components have been eliminated or the startup has timed out and has been in the startup state, use the operation and maintenance tools `grctl cluster` and `grctl service get <service_name> -t <tenant_name>` to query the actual running status of the cluster and components.

1. <b>What should I do if the component runs abnormally?</b>

> The abnormal operation of the component refers to the abnormal exit of the component process. Generally, there are several reasons.：
> 
> - Component code failure, not functioning properly
> - The component uses an unsupported image, such as the base OS image, which cannot be daemonized in the foreground.
> - Insufficient memory allocation of components causes OOM
> - The component health check configuration is incorrect, causing the component to fail the health check.
> 
> In the above case, please handle your component configuration. If Rainbond exits abnormally during the running of the component, it will automatically guard and restart your component.

1. <b>What if the component cannot be accessed?</b>

> When the component cannot be accessed, please check the following reasons：
> 
> - The component is not running normally, confirm it according to the running status and the component log
> - The component port configuration is incorrect, the component port configuration must be consistent with the actual listening port of the component
> - The component accessible port is not open to the external component switch
> - The component is not configured with a properly accessible domain name

### close operation

> Use scenario：components that are running or running abnormally

After the shutdown operation is triggered, the component will first go offline from the application gateway or ServiceMesh network, and then shut down all running instances to release cluster resources.

### restart operation

> Use scenario：components that are running or running abnormally

After the restart operation is triggered, the platform will shut down all the existing component running instances, and start it after the shutdown is complete.If a shutdown timeout occurs, the restart operation will exit and control of the component startup will be passed to the user.

- Restarting the component does not update the component code or image, which needs to be distinguished from the`build`operation.
- Restart operation breaks components

### access operation

> Use component && running in scenario：(outbound component | inbound component port open)

For components of different protocols, the commands triggered after clicking the access button are also different：

| Component Agreement | Action after clicking the access button                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTTP                | Open a new window of the browser and open the default domain name of the component. If multiple domain names are bound, a list of domain names will be displayed for the user to choose. |
| TCP                 | Pop-up access information window                                                                                                                                                         |

- HTTP protocol components

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/basic-operation/External%20visit.png" width="85%" />

- TCP protocol components

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/basic-operation/tcp%20external%20visit.png" width="85%" />

Copy the recommended access address to the browser to access
