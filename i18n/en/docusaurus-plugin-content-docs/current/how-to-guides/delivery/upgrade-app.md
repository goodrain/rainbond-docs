---
title: Application upgrade attribute change rules
description: Rules for attribute changes when upgrading applications in the application market
---

Applications in the application market can be upgraded, and each attribute will be changed according to certain rules during the upgrade. This article will introduce the change rules of each attribute when the application is upgraded.

## Overview of attribute change rules

| Attribute                        | Level       | Rule                |
| -------------------------------- | ----------- | ------------------- |
| Component                        | Application | Add, Update         |
| Plugin                           | Application | Add                 |
| Configuration group              | Application | Add                 |
| K8s resources                    | Application | Add                 |
| Image                            | Component   | Update              |
| Start command                    | Component   | Update              |
| Environment variable             | Component   | Add                 |
| Component connection information | Component   | Add                 |
| Port                             | Component   | Add, Update         |
| Storage                          | Component   | Add                 |
| Configuration file               | Component   | Add, Update         |
| Health check probe               | Component   | Add, Update, Delete |
| Monitoring chart                 | Component   | Add, Update         |
| Monitoring point                 | Component   | Add, Update         |
| HTTP access policy               | Component   | Add                 |
| Label                            | Component   | Add                 |
| Plugin                           | Component   | Add                 |
| Component dependencies           | Component   | Add, Delete         |
| Storage dependencies             | Component   | Add, Delete         |
| Kubernetes attributes            | Component   | Add, Update         |

The above table is an overview of the attribute changes for the entire application upgrade. For detailed descriptions of each attribute, please see below:

## Application-level attributes

### Component

The change rule for `Component` is: `Add, Update`.

If the source application adds a new component, a new component will also be created during the upgrade. If the source application modifies the component attributes, the corresponding attributes will be updated during the upgrade. However, if the source application `deletes` a component, the corresponding component will not be deleted during the upgrade.

### Plugin

The change rule for `Plugin` is: `Add`. When the source application adds a new plugin, and the current application's team does not have a corresponding type of plugin, the upgrade process will add the plugin to the team. Plugins will not be updated or deleted.

### Configuration group

`Configuration group` consists of `configuration group`, `configuration item` and `effective component`. Their rule is `Add`.

If the source application adds a new configuration group, the corresponding configuration group will also be `added` during the upgrade. However, if the source application `updates` or `deletes` a configuration group, the configuration group will not change during the upgrade, that is, existing configuration groups will not be updated or deleted.

### K8s resources

`K8s resources` are cluster resources created by the user through a Yaml file. Their rule is `Add`.

If the source application adds a new K8s resource, the corresponding K8s resource will also be `added` during the upgrade. However, if the source application `updates` or `deletes` a K8s resource, the K8s resource will not change during the upgrade, that is, existing K8s resources will not be updated or deleted.

## Component-level attributes

### Image

The change rule for `Image` is: `Update`. Each time you upgrade, if the source component image changes, the current component's image will be `updated` during the upgrade.

### Start command

The change rule for `Start command` is: `Update`. Each time you upgrade, if the source component start command changes, the current component's start command will be `updated` during the upgrade.

### Environment variable

The change rule for `environment variables` is: `add`. When the source component adds an environment variable, the corresponding environment variable will be added during the upgrade. However, if the source component `updates` or `deletes` the environment variable of the component, the corresponding environment variable will not be updated or deleted during the upgrade.

### Component connection information

The change rule for `component connection information` is: `add`. When the source component adds component connection information, the corresponding component connection information will be added during the upgrade. However, if the source component `updates` or `deletes` the component connection information, the corresponding component connection information will not be updated or deleted during the upgrade.

Specifically, if the component connection information is generated based on the component port, namely `XXX_HOST` and `XXX_PORT`, then the connection information will be regenerated based on the application's governance mode, port alias, and internal domain name.

If the port alias is `mysql`, the connection information generated will be `MYSQL_HOST` and `MYSQL_PORT`

If the governance mode is `built-in ServiceMesh mode`, then the value of `XXX_HOST` is `127.0.0.1`. If the governance mode is `Kubernetes native Service mode`, then the value of `XXX_HOST` is `internal domain name`.

### Port

The change rule for `port` is: `add, update`. When the source component adds a port, the corresponding port will be added to the component during the upgrade. When the source component updates a port, the corresponding port of the component will be updated during the upgrade; however, only the `protocol`, `port alias`, and `open port` of the port will be updated. That is, the `internal domain name` and `port number` of the port will not be updated, nor will the already opened port be closed. In addition, if the source component deletes a port, the corresponding port of the component will not be deleted during the upgrade.

### Storage

The change rule for `port` is: `add`. When the source component adds storage, the corresponding storage will be added to the component during the upgrade. Storage will not be updated or deleted.

If the storage driver required by the storage does not exist in the current cluster, then the default shared storage will be used to replace the source storage driver.

### Configuration file

The change rule for `configuration file` is: `add, update`. When the source component adds a configuration file, the corresponding configuration file will be added to the component during the upgrade. When the source component updates the content of a configuration file, the content of the corresponding configuration file of the component will be updated during the upgrade; however, the `name` and `path` of the configuration file will not be updated, only the content. The configuration file will also not be deleted.

### Health check probe

The change rule for `health check probe` is: `add, update, delete`. When the source component adds a health check probe, the corresponding probe will be added to the component during the upgrade. When the source component updates a health check probe, the corresponding probe of the component will be updated during the upgrade. When the source component deletes a health check probe, the corresponding probe of the component will be deleted during the upgrade.

### Monitoring chart

The change rule for `monitoring chart` is: `add, update`. When the source component adds a monitoring chart, the corresponding monitoring chart will be added to the component during the upgrade. When the source component updates a monitoring chart, the query statement of the corresponding monitoring chart of the component will be updated during the upgrade. The monitoring chart will not be deleted.

### Monitoring point

The change rule for `monitoring point` is: `add, update`. When the source component adds a monitoring point, the corresponding monitoring point will be added to the component during the upgrade. When the source component updates a monitoring point, the corresponding monitoring point of the component will be updated during the upgrade. The monitoring point will not be deleted.

### HTTP access policy

The change rule for `HTTP access policy` is: `add`. When the source component adds an HTTP access policy, the corresponding HTTP access policy will be added to the component during the upgrade. The HTTP access policy will not be updated or deleted.

### Label

The change rule for `label` is: `add`. When the source component adds a label, the corresponding label will be added to the component during the upgrade. The label will not be updated or deleted.

### Plugin

The change rule for `plugin` is: `add`. When the source component adds a plugin, the corresponding plugin will be added to the component during the upgrade. The plugin will not be updated or deleted.

### Component dependency

The change rule for `component dependency` is: `add, delete`. Component dependency only has add and delete, no update, so there is no need to consider the update problem during the upgrade. When the source component adds a dependency, the corresponding dependency will be added to the component during the upgrade. When the source component deletes a dependency, the corresponding dependency of the component will be deleted during the upgrade.

When adding a component dependency, the component dependency requires both `dependent component` and `depended component` to exist. Consider the following situations:

- Component A depends on component B, component B is a new component; when upgrading the application, if component B is not selected, it is equivalent to the depended component B does not exist, then the dependency from A to B will not be established.
- Component A depends on component B, component B is an existing component; when upgrading the application, whether component B is selected for upgrade or not, the dependency from A to B will be established, because the depended component B exists.
- In the source application, a dependency from A to B is added, but only component A is published, component B is not published; then their dependency will not be published, and during the upgrade, the dependency from A to B will not be established.

When deleting component dependencies, only the component dependencies between components from the same application market application will be deleted, and the component dependencies on non-same-source components will not be deleted. Also, the dependencies on unselected components will not be deleted. Consider the following situations:

- Components A and B are from the same application market application, A depends on B. Component C is created through an image, which is not the same source as A and B, A depends on C. The source application deletes the component dependency from A to B, during the upgrade, the dependency from A to B will be deleted, the dependency from A to C will not be deleted.
- The source application adds a component dependency from A to B, during the upgrade, only component A is selected for upgrade, component B is not selected, then the dependency from A to B will not be deleted.

### Storage dependency

The change rule for `storage dependency` is: `add, delete`.

When adding a storage dependency, the storage dependency requires both `dependent storage` and `depended storage` to exist. Consider the following situations:

- Storage A depends on storage B, the component where storage B is located is B, B is a new storage component; when upgrading the application, if component B is not selected, it is equivalent to the depended storage B does not exist, then the dependency from A to B will not be established.
- Storage A depends on storage B, the component where storage B is located is B, B is an existing component; when upgrading the application, whether component B is selected for upgrade or not, the dependency from A to B will be established, because the depended storage B exists.
- In the source application, a storage dependency from A to B is added, but only component A is published, component B is not published; then the dependency from A to B will not be published, and during the upgrade, the dependency from A to B will not be established.

When deleting storage dependencies, only the storage dependencies between components from the same application market application will be deleted, and the storage dependencies on non-same-source components will not be deleted. Also, the storage dependencies on unselected components will not be deleted. Consider the following situations:

- Storages A and B are from the same application market application, A depends on B. Storage C is the storage of component C created through an image, which is not the same source as A and B, A depends on C. The source application deletes the storage dependency from A to B, during the upgrade, the dependency from A to B will be deleted, the dependency from A to C will not be deleted.
- The source application adds a storage dependency from A to B, during the upgrade, only component A is selected for upgrade, component B is not selected, then the storage dependency from A to B will not be deleted.

### Kubernetes attributes

The change rule for `Kubernetes attributes` is: `add, update`. When the source component adds Kubernetes attributes, the corresponding Kubernetes attributes will be added to the component during the upgrade. When the source component updates Kubernetes attributes, the corresponding Kubernetes attributes of the component will be updated during the upgrade. Kubernetes attributes will not be deleted.
