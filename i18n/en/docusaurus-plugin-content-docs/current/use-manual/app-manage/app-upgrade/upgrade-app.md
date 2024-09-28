---
title: Apply Upgrade Attribute Change Rules
description: Rules for property changes while the app market is in progress
---

The application of the application market can be upgraded, and each attribute will be changed according to certain rules during the upgrade. This article will introduce the change rules of each attribute when the application is upgraded.

## Overview of property change rules

| Attributes                       | level       | rule                |
| -------------------------------- | ----------- | ------------------- |
| components                       | application | new, updated        |
| plugin                           | application | new                 |
| configuration group              | application | new                 |
| K8s resources                    | application | new                 |
| mirror                           | components  | renew               |
| start command                    | components  | renew               |
| environment variable             | components  | new                 |
| Component connection information | components  | new                 |
| port                             | components  | new, updated        |
| storage                          | components  | new                 |
| configuration file               | components  | new, updated        |
| Health Detection Probe           | components  | add, update, delete |
| monitoring chart                 | components  | new, updated        |
| Monitoring points                | components  | new, updated        |
| HTTP access policy               | components  | new                 |
| Label                            | components  | new                 |
| plugin                           | components  | new                 |
| component dependencies           | components  | add, delete         |
| store dependencies               | components  | add, delete         |
| Kubernetes properties            | components  | new, updated        |

The above table is an overview of the changes in the upgrade properties of the entire application. For a detailed description of each property, please see the following:

## Application-level properties

### components

`The change rule of component`is: `increase, update`.

A new component is added to the source application, and a new component is also created during the upgrade. The source application modifies the component properties, and the corresponding properties are updated when the source application is upgraded. However, the source application`deletes`component, and the corresponding component is not deleted during the upgrade.

### plugin

`The change rules for plugin`are: `Add`When a plugin is added to the source application, and the current application team does not have a corresponding type of plugin, the upgrade process will add the plugin to the team. It will not be updated or deleted. plugin.

### configuration group

`Configuration group`consists of`configuration groups`, `configuration items`and`effective components`Their rules are`new`.

The source application adds a new configuration group, and`will be added to`corresponding configuration group during the upgrade. However, if the source application`updates`or`and`the configuration group, then the configuration group will not change during the upgrade, that is, it will not be updated or Delete an existing configuration group.

### K8s resources

`K8s resource`is the cluster resource created by the user through the Yaml file. Their rules are`new`.

The source application adds K8s resources, and`new`corresponding K8s resources will be added during the upgrade. However, if the source application`updates`or`and deletes`K8s resources, then the K8s resources will not change during the upgrade, that is, it will not be updated or Delete existing K8s resources.

## Component-level properties

### mirror

`The change rule of mirror`is: `update`. During each upgrade, if the source component mirror changes,`update`the mirror of the current component during the upgrade.

### start command

`The change rule for startup command`is: `Update`During each upgrade, if the startup command of the source component changes, the startup command of the current component will be updated during the upgrade.

### environment variable

`The change rules for environment variable`are: `Add`The source component adds an environment variable, and the corresponding environment variable will be added during the upgrade. However, the source component`is updated`or`delete`The environment variable of the component, upgrade The corresponding environment variables will not be updated or deleted.

### Component connection information

`The change rule of component connection information`is: `Add`The source component adds component connection information, and the corresponding component connection information will be added during the upgrade. However, the source component`updates`or`deletes`The component connection information , the corresponding component connection information will not be updated or deleted during the upgrade.

In particular, if the component connection information is generated according to the component port, i.e. `XXX_HOST` and `XXX_PORT`, then the connection information will be regenerated according to the application's governance mode, port alias and internal domain name.

If the port alias is `mysql`, the connection information will be generated as `MYSQL_HOST` and `MYSQL_PORT`

If the governance mode is`built-in ServiceMesh mode`, then the value of `XXX_HOST` is `127.0.0.1`. If the governance mode is`Kubernetes native Service mode`, then the value of `XXX_HOST` is `Internal domain name`.

### port

`The change rule for port`is: `new, update`The source component adds a new port, and the corresponding port is also added for the component during the upgrade. The source component has updated the port, and the corresponding port of the component will also be updated during the upgrade; but , will only update port `protocol`, `port alias`, `open port`. That is to say, will not update port`internal domain name`, `port number`, and will not close open ports. In addition, If the source component deletes the port, the port corresponding to the component will not be deleted during the upgrade.

### storage

The change rules for `port`are: `add`The source component adds storage, and the corresponding storage is also added for the component during the upgrade. The storage will not be updated or deleted.

If the storage driver required for storage does not exist in the current cluster, the default shared storage will be used to replace the source storage driver.

### configuration file

`The change rules of configuration file`are: `new, update`The source component adds a new configuration file, and the corresponding configuration file is also added for the component during the upgrade. When the source component updates the content of a configuration file, the upgrade will be Update the content of the configuration file corresponding to the component; however, the`name`and`path`of the configuration file will not be updated, only the content will be updated. The configuration file will not be deleted.

### Health Detection Probe

`The change rules of health detection probe`are: `Add, update, delete`When the source component adds a health detection probe, the corresponding probe will be added for the component when it is upgraded. When the source component updates the health detection probe, when the upgrade The corresponding probe will be updated for the component. The source component will delete the health detection probe, and the corresponding probe will be deleted for the component during upgrade.

### monitoring chart

`The change rules of monitoring chart`are: `New, update`When the source component adds a monitoring chart, the corresponding monitoring chart will be added for the component during the upgrade. The source component will update the monitoring chart, and the component will update the corresponding monitoring chart during the upgrade. Query statement. Will not delete monitoring charts.

### Monitoring points

`The change rules of monitoring point`are: `new, update`When the source component adds a new monitoring point, the corresponding monitoring point will be added for the component during the upgrade. The source component will update the monitoring point, and the corresponding monitoring point will be updated for the component during the upgrade. Monitoring points will not be deleted.

### HTTP access policy

`The change rules of HTTP access policy`are:\`source component adds an HTTP access policy, and the corresponding HTTP access policy will be added for the component during upgrade. The HTTP access policy will not be updated or deleted.

### Label

The change rules for label are: `Add`. The source component adds a new label, and the corresponding label will be added to the component during upgrade. The label will not be updated or deleted.

### plugin

`The change rules for plug-in`are: `Add`Add a plug-in to the source component, and the corresponding plug-in will be added to the component during the upgrade. The plug-in will not be updated or deleted.

### component dependencies

`The change rules for component dependency`are: `Add, delete`Component dependencies are only added and deleted, not updated, so there is no need to consider the update problem during upgrade. When adding dependencies to source components, the upgrade will be The corresponding dependencies are added to the components. The source components delete the dependencies, and the corresponding dependencies are deleted for the components during the upgrade.

When adding a component dependency, the component dependency needs to exist at the same time as the`-dependent component`and the`-dependent component`Consider the following situations:

- The A component depends on the B component, and the B component is a new component; when upgrading the application, if the B component is not selected, it is equivalent to the dependent component B does not exist, then the dependency relationship between A and B will not be established.
- The A component depends on the B component, and the B component is an existing component; when upgrading the application, whether or not you choose to upgrade the B component, a dependency relationship between A and B will be established, because the dependent component B exists.
- In the source application, the dependencies of A to B are added, but only the A component is released, and the B component is not released; then their dependencies will not be released, and the A to B will not be established during the upgrade. dependencies.

When deleting component dependencies, only the component dependencies between components originating from the same application market application will be deleted, and the component dependencies of components on non-homologous components will not be deleted. Dependencies on unselected components will not be deleted. Consider a few scenarios:

- Components A and B come from the same application market application, A depends on B. C is a component created by mirroring, and is not homologous with A and B, A depends on C. The source application deletes the component dependencies from A to B, When upgrading, A to B dependencies are removed, A to C dependencies are not removed.
- The source application has added component dependencies from A to B. When upgrading, only choose to upgrade A, and do not choose B component, then the dependencies from A to B will not be deleted.

### store dependencies

`The change rules for storage dependency`are: `add, delete`.

When adding a storage dependency, the storage dependency needs to exist at the same time as`-dependent storage`and`-dependent storage`Consider the following situations:

- A\` storage depends on B\` storage, B\` storage component is B, and B is a new storage component; when upgrading the application, if you do not select B component, it is equivalent to the dependent storage B\` does not exist, then it will not Build A\` to B\` dependencies.
- A\` storage depends on B\` storage, B\` storage component is B, and B is an existing component; when upgrading the application, no matter whether you choose to upgrade the B component, the dependency from A\` to B\` will be established, because The dependent store B\` exists.
- In the source application, the dependencies from A\` to B\` are added, but only the A component is released, and the B component is not released; then their dependencies from A\` to B\` will not be released. , the A\` to B\` dependencies will not be built when upgrading.

When deleting storage dependencies, only the storage dependencies between components originating from the same app market application will be deleted, and the storage dependencies of components on non-homologous components will not be deleted. Nor will the storage dependencies on unselected components be deleted. Relationships. Consider a few scenarios:

- A\`, B\` storage comes from the same application market application, A\` depends on B\`. C\` is the storage of component C created by mirroring, which is not homologous with A\`, B\`, A\` depends on C\`. The source application removes the storage dependencies from A\` to B\`, and when upgrading, the dependencies from A\` to B\` will be removed, but not A\` to C\ \` 's storage dependencies.
- The source application has added a storage dependency from A\` to B\`. When upgrading, only choose to upgrade the A component, but not the B component, then the storage dependency from A\` to B\` will not be deleted.

### Kubernetes properties

`The rules for changing Kubernetes attribute`are: `New, update`The source component adds the Kubernetes attribute, and the corresponding Kubernetes attribute is added for the component during the upgrade. The source component updates the Kubernetes attribute, and the component updates the corresponding Kubernetes attribute during the upgrade. Kubernetes properties are not removed.
