---
title: Dockerfile
description: Deploy applications on Rainbond via Dockerfile
---

## Overview

If there is a `Dockerfile` file in the main directory of the code, Rainbond will identify the code language type as **Dockerfile**.

### Compilation Principle

Source code identified as Dockerfile type will use a command similar to `docker build -t xxx .` for image construction, supporting docker multi-stage construction and ARG parameter specification during the construction process.

### Dockerfile Specification

**Dockerfile** is a script composed of a series of commands and parameters, which are applied to the base image and ultimately create a new image.

Rainbond will read the following parameters defined in [Dockerfile](https://docs.docker.com/engine/reference/builder/) during the source code detection phase:

| Parameter Type | Name                 | Illustrate                                                               |
| -------------- | -------------------- | ------------------------------------------------------------------------ |
| ENV            | Environment Variable | Identified as configurable environment variable settings for the service |
| ARG            | Build Parameter      | Identified as configurable parameter settings for construction           |
| EXPOSE         | Expose Port          | Identified as port configuration for the service                         |
| VOLUME         | Persistent Storage   | Identified as shared persistent storage configuration for the service    |

### Private Repository

If a private image is used in the Dockerfile, fill in the domain name, username, and password of the private image repository in `Team Management -> Image Repository Authorization Information`, save it and build again to succeed.

## Deployment Example

1. Create a component based on the source code and fill in the following information:

|                        | Content                                          |
| ---------------------- | ------------------------------------------------ |
| Component Name         | Custom                                           |
| Component English Name | Custom                                           |
| Repository Address     | `https://gitee.com/rainbond/dockerfile-demo.git` |
| Code Version           | master                                           |

2. Identified as a Dockerfile project, click to build and start.