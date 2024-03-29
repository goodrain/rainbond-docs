---
title: 'DockerCompose Support Specification'
description: 'This chapter will introduce you to Rainbond''s support specification for creating multiple components based on DockerCompose configuration'
---

### Support principle

DockerCompose is a sub-project in the Docker ecosystem. It proposes a specification for defining multiple container component daemon startup parameters or construction methods. It is mainly used in single-machine containerized environment scenarios, similar to systemd in a container environment.The multi-component components defined by DockerCompose are limited to single-machine deployment in terms of communication methods and dependencies, which is different from how Kubernetes handles components.How to make all the components defined by DockerCompose run in the Kubernetes cluster, this is the function provided by Rainbond to create components based on DockerCompose.

The user provides a DockerCompose definition file that can run normally. Rainbond will parse this file and read the key configurations of all internal components, including：component name, image name and warehouse address, environment variables, dependencies (startup sequence), persistence Storage, component ports.Create a Rainbond component abstraction based on these properties, and then deploy it to the underlying Kubernetes cluster through the management and operation mechanism of Rainbond's component abstraction model.So as to realize the conversion from DockerCompose to Kubernetes.

The key is the dependency relationship. The dependency relationship between components in DockerCompose uses Docker's principle of the same network space, combined with Docker's default DNS component to perform domain name resolution on dependent component aliases to achieve inter-component communication.This mode cannot be directly implemented in`scenarios, but based on`'s default ServiceMesh mechanism, it achieves the same effect. Access the local proxy of the component, and the local ServiceMesh Sidecar container completes the dynamic discovery and load balancing of the component. In terms of effect, it is consistent with DockerCompose running on a single machine, but in fact the entire application is already distributed in a cluster environment, and each component can run multiple instances.

### How to create and matters needing attention

In the team view, go through`to create -->to create a component based on an image -->to select DockerCompose`to enter the DockerCompose creation process.Since DockerCompose creates a complete application (including N components), a new application must be created and specified at the time of creation.

There are the following points to note

1. If the DockerCompose configuration has information that needs to be read from environment variables, make the changes manually first.Rainbond does not support dynamically rendering DockerCompose configurations based on environment variables.
2. Make sure that the DockerCompose configuration in yaml format is normal, otherwise the detection will fail.
3. During the detection process, Rainbond will parse the mirror warehouse address through the mirror information and issue a request to verify whether the mirror exists. It will only pass all verification tests.In versions earlier than 5.1.3, the verification method was to directly pull the image, so the detection process took a long time.
4. In 5.1.3 and later versions, Rainbond will only read properties from the DockerCompose configuration, and no longer resolve properties from images.Try to explicitly configure useful property information (environment variables, ports, storage).

#### Mirror warehouse account password settings

- Overall settings

In the DockerCompose form settings, you can add the account password of the mirror warehouse. This setting will take effect in all the mirrors in this DockerCompose. If individual mirrors do not require account passwords or account numbers are different, please use the separate setting method.

- set separately

Separate setting refers to adding special environment variables for each component in the DockerCompose configuration to define the mirror warehouse account password of the current component image.set mode is：

`HUB_USER` set account

`HUB_PASSWORD`set password

> Note：When two modes exist at the same time, the priority of the separate setting is higher than the overall setting.
