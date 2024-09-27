---
title: Component base operation
description: Rainbond component basic life cycle operation description
---

## Component basic actions

| Base action                               | Note                                                                                                                                                                                                                               |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build                                     | The build operation will trigger the component to get the latest version of the code or mirror building component from the building source. By default, building will trigger a rolling upgrade.   |
| Update (Scroll Update) | Updates will scroll up instances of running components in clusters with the latest component properties configuration                                                                                                              |
| Boot                                      | A component with at least one available build version can be started                                                                                                                                                               |
| Stop                                      | Component stops releasing all cluster resources                                                                                                                                                                                    |
| Visits                                    | Running components are accessible if HTTP components will jump to URLs, non-HTTP                                                                                                                                                   |
| Web Terminal                              | Enter the current component web terminal control page, select a container to open the container control terminal                                                                                                                   |
| Restart                                   | Running components can be rebooted. Normally we recommend using the update to complete the component reboot. If any component properties remain unchanged, updates cannot be used. |
| Modify the app                            | Components are flexible to adjust their apps                                                                                                                                                                                       |
| Delete                                    | Removing components is a dangerous operation, please be carefulPersistent data will be reserved by default for 7 days after component deletion.                                                                    |

### Build Actions

For different types of components, when `build` is triggered, it has different meanings. The table below explains： for different types of components.

| Component Type                           | Note                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Components built from source code        | Pull up to date source code to build components based on pre-recognized language types and scroll upgrades                                                                                                                                                                                                                           |
| Component built from Docker Mirror       | Reload the mirror of the specified mirror, build a new version of the component and scroll up                                                                                                                                                                                                                                        |
| Components built from the Cloud City app | If a new version does not exist in the Cloud Marketplace, build will remind the user that no action is required, and if multiple updates already exist, the user will be prompted to select the version number that needs to be retrieved.Retrieve component media version from selected version and scroll upgrades |

- The Dockerfile source class component is a service created through the source code by placing Dockerfile and the required files in the repository (Git/Svn).
- After build, if everything goes well, the component will automatically switch to a new version and be online, build by default and update updates. You can also set the build process in other settings without upgrading.
- Scroll upgrades have no effect on multinodes components theory, and can also be upgraded without affecting single-node components if they are properly configured at [健康检测](/docs/use-manual/component-manage/other/).
- A component that is closed, after triggering the build, the platform will run the component if it is properly built.

### Update Actions

When the component dependence, storage, environmental variables, properties, health monitoring and other operational properties change, the component instance must be upgraded using a scroll upgrade strategy during this update process by triggering an update manually.

Two types of control policy： for scroll upgrades

- Unstate component: The unordered first startup strategy is used for the statelessness component, i.e. start a new version of the operation instance and close the old version when it is healthy.It is important to note that this process has multiple versions that work simultaneously. Please use the restart strategy if your business component cannot tolerate multiple versions simultaneously.

- State component: An orderly first stop strategy is used for a state component, i.e. first close an instance from the first instance and start a new version of an instance based on the running instance number.This control is essential for components like database types, so do not deploy database class components to statelessness.

### Start operation

Startup will start the last build version of the component. After startup will see the platform's action log in the `Action Log` on the component overview page. When the scheduler completes the schedule, the component enters the startup phase, and the component launch log can be viewed through the `Log` page.

Especially for components launched for the first time in Rainbond, attention needs to be paid to the following description：

**1. What happens when component starts or updates timeout?**

At present Rainbond has fixed timeout time for asynchronous tasks, please note that timeout is not a failure, needs to optimize component configuration based on actual circumstances. If timeout exists, please follow the following path to schedule：

- Query [组件日志](../service-log# component run log) determines the startup of the component. If your component log is not exported to stdout or stderr, enter the component container to query your log.For example, components of Java classes that have insufficient memory to assign will cause very slow starting, or find out from logs if the component is operating in a normal environment, such as relying on a database or having regular access to the database.
- If the source build component enters the normal business startup process long after starting, please optimize the code by ignoring the redundant source file to reduce the operating code time reference [slugignore file usage](/docs/use-manual/component/language-support/slugignore)
- Determines that the component listens to an address is not 127.0.0.1 or localhost
- If the component listening address is correct and is listening properly, please query [组件健康检测](/docs/use-manual/component-manage/other/) for the correct configuration. The default configuration error usually occurs when the component has multiple ports.
- If all of the above components have been excluded or are running out of time and are always on startup, please query clusters and components from the wires `grctl cluster` and `grctl service get <service_name> -t <tenant_name>`.

**2. What does the component run for an exception?**

Component run exception is the component process exited unexpectedly. There are generally several reasons for：

- Component code failed, unable to function properly
- Component uses unsupported mirrors, such as basic operating system mirrors, which cannot be used in front office.
- Component memory allocation is insufficient to cause OOOM
- Component health check configuration is incorrect, so the component cannot pass a health check.

If this is the case, please process your component configuration, if the component is unrunning, will automatically escort and reboot your component if it exits

**3. What does the component not have access to it?**

If the component is unable to access it, please see the following class of reasons：

- Component is not running, depending on running state and component log
- Component port configuration is incorrectly configured. Component port configuration must match the port that the component listens
- Component Accessible Port does not open external component switches
- The component does not have a properly accessible domain

### Turn off operations

After triggering a shutdown operation, the component will first be offline from the application gateway or ServiceMesh network and then turn off all running examples, releasing cluster resources.

### Restart operation

Once a restart is triggered, the platform will turn the existing component off all instances until it is closed.Restart after closing timeout will exit and control on component startup will be given to the user.

- Restart component does not update component code or mirror, needs to be distinguished from the `build` operation.
- Restart operation will break component

### Access Actions

For components of different protocols, the commands triggered by clicking the access button are not the same as：

| Component agreement | Action after clicking on the access button                                                                                                                                          |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTTP                | Browser opens a new window, opens the default domain name of the component. If multiple domains are bound, the domain list will be displayed for the user to choose |
| TCP                 | Popup Access Information Window                                                                                                                                                     |
