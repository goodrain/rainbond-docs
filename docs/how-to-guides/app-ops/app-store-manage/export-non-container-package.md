---
title: Export non-container package
description: Export the application built from source code into an installation package that can be used in a non-container environment
---

## Scenario

The application template export mechanism provided by Rainbond is mainly used to solve the application delivery problem for end users.However, the operation of previous application templates cannot eliminate the requirement for a container runtime environment.The application template extends the ability to export non-container packages, specifically designed to solve the application delivery problem in scenarios where there is no container runtime environment in the final delivery environment.

Applicable scenarios include:

- The delivery environment is completely offline, making it impossible to install container runtime environments such as Docker normally.
- The delivery environment has extremely high security requirements and does not allow the use of container technology.

## Prerequisites

- The Rainbond platform version is not lower than v5.8.1-release.
- The exported components are deployed based on [source code build](../../app-deploy/source-code/springboot.md).
- Refer to the documentation to complete the application release process and publish the application to the internal component library.

## Export non-container package

In the internal component library, find the published application template, and on the `Export Application Template` page, click to export `Export non-container package`.After the export is completed, you can download the exported non-container package.

The obtained non-container package is named in the format `{application name}-{application template version}-slug.tar.gz`.This package can be decompressed in any Linux operating system, and the directory structure after decompression is as follows:

```bash
non-docker-demo-0.1-slug
├── golang
│   ├── golang.env
│   ├── golang.sh
│   └── golang-slug.tgz
├── java-demo
│   ├── java-demo.env
│   ├── java-demo.sh
│   └── java-demo-slug.tgz
└── non-docker-demo.sh
```

- The service components included in the application are separated in the form of directories, and the directory naming format is the name of the component.
- Under the application directory, there is a global control script named after the application name.
- Under the service component directory, there is a script to control the component individually.
- Under the service component directory, there is an environment variable configuration file ending with `{service component name}.env`, which contains custom environment variables, configuration group environment variables, connection information environment variables, and the variable `PORT` that defines the listening port.

## Manage non-container package

Through the global control script, you can batch control the start, stop, and status query operations of all components under the application.

- Global start

```bash
[root@localhost non-docker-demo-0.1-slug]# ./non-docker-demo.sh start
Running app golang with process:  3984 go-demo ...  Done
The environment variable $MEMORY_SIZE was not identified,The Java process will not be optimized....
Running app java-demo with process:  11472 java ...  Done
```

- Component status query

```bash
[root@localhost non-docker-demo-0.1-slug]# ./non-docker-demo.sh status
AppName                        Status                         PID
golang                         Active(Running)                3984
java-demo                      Active(Running)                11472
```

- Global stop

```bash
[root@localhost non-docker-demo-0.1-slug]# ./non-docker-demo.sh stop
Stopping app golang which running with pid 3984 ...  Done
Stopping app java-demo which running with pid 11472 ...  Done
```

Through the control script in each service component folder, you can manage the start, stop, and status query operations of a single service component.

- Start service component

```bash
[root@localhost golang]# ./golang.sh start
Handling runtime environment ...  Done
Handling custom environment ...  Done
Running app golang, you can check the logs in file golang.log
We will start your app with ==> go-demo
Running app golang with process: 24033 go-demo ...  Done
```

- Query service component status

```bash
[root@localhost golang]# ./golang.sh status
AppName                        Status                         PID
golang                         Active(Running)                24033
```

- Stop service component

```bash
[root@localhost golang]# ./golang.sh stop
Stopping app golang which running with pid 24033 ...  Done
```

## Configuration management

The configuration of service components is still managed through environment variables.

Each service component directory contains an environment variable configuration file of the type `{service component name}.env`. The service component will load the variables in it to configure itself when starting.

The `{service component name}.env` file will contain environment variables from the following four sources:

- Custom environment variables of the service component when it was released
- Application-level global configuration environment variables defined in the configuration group when the service component was released
- Connection information environment variables between service components
- The environment variable $PORT specifically used to declare port information

Before starting the non-container package, users can customize the `{service component name}.env` configuration file to modify the configuration of the service component.A common scenario is: the service component depends on other middleware when running on Rainbond, and the referenced connection information environment variables will contain configuration information such as `MYSQL_HOST=127.0.0.1`. The non-container package does not include the Mysql service component, so users need to manually modify the value of the `MYSQL_HOST` environment variable to the real IP address of Mysql in the current delivery environment, and then start the service component.

## Log query

Once the service component is started, its logs will be output to the `{service component name}.log` log file under the service component directory.

## Usage notes

Compared to applications running on Rainbond, the use of non-container packages has some limitations, which are explained in this section.

### Component build source

The non-container package will only export all service components in the application that are deployed by the [source code build](../../app-deploy/source-code/springboot.md) function. Service components from other build sources, such as Docker image build, Helm creation, etc., cannot be exported to the non-container package.

The source code types currently supported by the non-container package include: Java-Maven, Java-Gradle, Java-Jar, Java-War, Golang, NodeJS, NodeJS front-end projects (VUE React), Html static language.

Due to the language characteristics of Python and PHP, users need to handle the operating system-level library files that the runtime depends on by themselves.

### Port conflict

Since the service components in the non-container package directly occupy the server's ports when starting, the listening ports of the service components must not conflict.It is recommended to define the port that the service component listens to at runtime with the environment variable `PORT`, which is convenient to modify the configuration in the `{service component name}.env` file.

### Split operation

Each service component directory in the non-container package directory can be separately split and run on other servers. If users decide to do so, please pay attention to configuring the access addresses between different services to avoid connection failures.

