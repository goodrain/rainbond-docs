---
title: Continuous component build and version management
description: This article explains how to develop continuous components based on Rainbond
---

For application developers, in the past, our main development and debugging method was local. This mode has many problems in complex collaboration scenarios and complex application architecture scenarios, resulting in low efficiency.Rainbond-based application development mode allows each developer to have their own development environment, or to deploy different development environments according to different project requirements.Developers can continuously submit source code based on the online development environment, and continuously perform CI and CD to achieve the effect of agile development.

## Preconditions

1. The first deployment of the component has taken place
2. The source code corresponding to the component can be continuously modified or the image of the component can be continuously released.

## Operation method

Manual continuous build

Rainbond supports component-level construction and application-level construction. After each code submission, if only one component is involved, you only need to click the _build_ button at the top right of the component control page to trigger the component build task.By default, the deployment upgrade process begins as soon as the component is built, replacing the existing running version with the new version.If you do not want to automatically upgrade after the build is complete, you can disable the _function of automatic upgrade after component build_ in the other settings of the component. Every build process generates a new component version regardless of whether the code version changes.If the changed code involves multiple components in the application, such as the entire application created in Java Maven multi-module mode.At this time, you can click the _build_ button of the application in the application view to trigger the rebuild of all components of the entire application.The application layer build will control the orderly upgrade of components involved.

After the component is built and upgraded, developers can access the services provided by the component to view the running status of the component, and continue to develop.

**Automatic continuous build**

Developers who pursue high efficiency definitely hope that the above process can be separated from the platform and can be automatically completed directly when the code is submitted or other specified times.For this part, please refer to <a href="./auto_build">component automatic construction</a>



