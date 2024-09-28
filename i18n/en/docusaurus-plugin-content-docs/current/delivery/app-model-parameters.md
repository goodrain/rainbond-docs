---
title: Application template parameters
---

### 1. Apply template and release settings

- Arguments description for： when creating an app template

| Option Name    | Note                                                                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Name           | Define app name (required)                                                                                                   |
| Release Range  | Application template visibility, **Current team** is visible to the current team, **Business** all teams visible (necessary) |
| Category Label | Apply tags, sorting by architecture, industry, deployment mode                                                                                  |
| Introduction   | App description to help users understand this app                                                                                               |
| Logo           | Applied logo image                                                                                                                              |

- Define app release version： after creating app template

| Option Name         | Note                                                                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version number      | When published multiple times as an app, if the version is the same, it will overwrite the published version. If not, it will be published as a new version, it will be judged on the version (required) |
| Version Alias       | Apply alias,eg: Premium                                                                                                                                                                                                     |
| Version Description | Description of the current release version, you can differentiate between different versions of functionality, etc.                                                                                                         |
| as plugin           | Check this option if you have plugins in the app template, you can install them on the \`Team Page-Plugins - install them from the local component library, install them directly without installing the app                                |

### 2. Publish component model configuration：

| Option Name            | Note                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Connection information | When password class information appears in connection messages, choose to automatically generate random values for each deployment |
| Environment Variables  | Edit the default environment variable for this component                                                                           |
| Scaling Rules          | Define the minimum number of nodes that the component can scalable and the minimum installation memory limit.      |

### 3. Publish plugin model information：

When a component of an app to be published carries a plugin, it will be displayed and will be posted with the component during publication.

### 4. K8s Resource：

The display will also be displayed and follow the app release when there is a defined K8s resource in the app to publish.

When all information is configured, click the **Subred** button to post it, all information about dependencies, environment configurations, persistent storage, plugins, operating environment and the above definition will be packed.
