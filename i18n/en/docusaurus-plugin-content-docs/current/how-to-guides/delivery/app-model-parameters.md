---
title: Application template parameter description
---

### 1. Application template and release version settings

- Parameter description when creating an application template:

| Option name    | Description                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name           | Define the application name (required)                                                                                                               |
| Release scope  | The visibility scope of the application template, **current team** is visible to the current team, **enterprise** is visible to all teams (required) |
| Category label | Application labels, which can be categorized by architecture, industry, and deployment method                                                                           |
| Introduction   | Application description, helping users understand this application                                                                                                      |
| Logo           | The Logo image of the application                                                                                                                                       |

- Define the application release version after creating the application template:

| Option name         | Description                                                                                                                                                                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version number      | When the same application is released multiple times, if the version number is the same, the released version will be overwritten; if different, it will be released as a new version. During application upgrade or rollback, the platform judges based on the version (required) |
| Version alias       | Application alias, such as Premium Edition, Basic Edition                                                                                                                                                                                                                                                             |
| Version description | Description of the current release version, which can distinguish functional differences and other information between different versions                                                                                                                                                                             |
| As a plugin         | When there are plugins under the application template, selecting this option allows you to directly install the corresponding plugin without installing the application at `Team Page - Plugins - Install from Local Component Library`                                                                               |

### 2. Release component model configuration:

| Option name            | Description                                                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connection information | When password-like information appears in the connection information, you can choose to automatically generate a random value each time you deploy                              |
| Environment variable   | Edit the default environment variables of this component                                                                                                                        |
| Scaling rules          | Define the maximum and minimum number of nodes that can be scaled for this component, the step size of node scaling, and the minimum installation memory limit. |

### 3. Release plugin model information:

When the components of the application to be released carry plugins, they will be displayed and follow the components during the release process.

### 4. K8s resources:

When there are defined K8s resources in the application to be released, they will also be displayed and follow the application during the release process.

After all information is configured, click the **Submit** button to release. The dependencies between components, environment configuration, persistent storage, plugins, runtime environment, and all the above-defined information defined during business development will be packaged and released.
