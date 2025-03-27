---
title: Java SpringBoot Project Deployment
description: Deploying SpringBoot Projects in Rainbond
keywords:
  - Rainbond Deployment of SpringBoot Projects
  - SpringBoot Project Deployment
  - Java Gradle Project Deployment
  - Java Maven Project Deployment
---

## Overview

Rainbond supports building and automatically recognizing single-module and multi-module SpringBoot projects.It also supports projects built with Gradle.

### Java Gradle

The platform defaults to recognizing a project as a Java Gradle project if there is a gradlew file or build.gradle in the root directory of the source code.

### Java Maven Single Module

When a `pom.xml` file exists in the root directory of the source code, Rainbond will recognize the source code as a Java Maven single-module project.

### Java Maven Multi-module

Rainbond's recognition of Maven projects is based on the content of the `pom.xml` file, mainly divided into two parts: build command and startup command.

1. **Build Command**: Tells the system which modules need to be built.Similar to running `mvn install -pl 'module name' -am`, where `-pl` specifies the module to be built, and `-am` means that if the module has dependencies, they will also be built.
2. **Startup Command**: After the build is completed, specify which Jar package to execute to start the service.Similar to `web: java $JAVA_OPTS -jar *.jar`, where `*.jar` will be replaced with the actual Jar package name.

**Recognition Rules**:

- **Module Location**: First, find the submodule's POM file according to the `modules` tag in the root POM file.
- **Packaging Type**: If the `packaging` tag in `pom.xml` is `jar` or `war`, the module name and the generated Jar package name will be extracted.If the `packaging` type is not specified, it is considered `jar` by default.
- **Module Name**: The module name is composed of the value of the `module` tag in the parent POM file, separated by slashes `/`, such as `rbd-worker/rbd-thirdparty`.
- **Jar Package Name**: By default, the generated Jar package name is `${artifactId}-*.jar` (where `*` represents the version number).If `finalName` is set in the POM file, the value in `finalName` will be used.If variables (such as `${project.name}` or `${project.artifactId}`) are used in `finalName`, the actual values of the variables will be used to replace them.
- **POM Module**: If the `packaging` in POM is `pom`, and there are multiple `module` in this POM file, then each submodule will be recursively parsed according to the above rules.

## Deploying Java SpringBoot Multi-module Projects

1. Based on source code deployment components, fill in the following information:

|                        | Content                                      |
| ---------------------- | -------------------------------------------- |
| Component Name         | Custom                                       |
| Component English Name | Custom                                       |
| Repository Address     | `https://gitee.com/zhangbigqi/RuoYi-Vue.git` |
| Code Version           | Master                                       |

2. Enter multi-module build, check the **ruoyi-admin** module, this module is runnable, other modules are dependencies.
3. Go to **Component -> Port** to delete the default 5000 port, add **8080 http** port.
4. Wait for the build to complete.

## Deploying Java SpringBoot Single Module Projects

Go to the team, create a new application, select **Based on source code example** for building, select Java Maven Demo and default all the next steps.

## Deploying Java Gradle Projects

1. Based on source code deployment components, fill in the following information:

|                        | Content                                           |
| ---------------------- | ------------------------------------------------- |
| Component Name         | Custom                                            |
| Component English Name | Custom                                            |
| Repository Address     | `https://gitee.com/rainbond/java-gradle-demo.git` |
| Code Version           | Master                                            |

2. Next all defaults, wait for the build to complete.