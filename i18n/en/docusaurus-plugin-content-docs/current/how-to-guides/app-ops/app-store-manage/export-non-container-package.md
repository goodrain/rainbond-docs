---
title: Export non-container package
description: Export the application built from the source code as a usable installation package in a non-container environment
---

## Scenario

Application stopApplication startRainbond provides an application template export mechanism to solve application delivery problems.However, the previous application templates cannot be exempted from the requirements of the container running environment.Application templates extend the ability to export non-container packages and are specifically designed to address application delivery in scenarios where the final delivery environment does not have a container running environment.

Applicable scenarios include:

- The delivery environment is completely offline, resulting in the failure to properly install Docker and other container runtime environments.
- The delivery environment has high security requirements and does not allow container technology.

## Requirements

- The version of Rainbond is at least v5.10.0-Release.
- 导出的组件基于 [源码构建](../../app-deploy/source-code/springboot.md) 部署。
- 参考文档，完成应用发布流程，将应用发布到内部组件库。

## Export non-container package

Locate the published application template in the internal component library. On the `Export` page, click Export `Export Non-container Packages`.After the export is complete, you can download the exported non-container package.When the export is completed, it will be possible to download the exported non-container.

得到的非容器包，命名格式为 `{应用名称}-{应用模板版本号}-slug.tar.gz` 。The resulting non-container package is named in the format of `{application name}-{aplication template version}-slug.tar.gz`.The package can be decompressed in any Linux operating system, and the directory structure is as follows:

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

- The service components contained in an application are divided into directories. The directory name format is the component name.
- A global control script named `application name.sh` exists in the application directory.
- In the service component directory, scripts that control components separately exist.
- In the service component directory, there is an environment variable configuration file ending with `{component name}.env`,This includes custom environment variables, configuration group environment variables, connection information environment variables, and the variable `PORT` that defines the listening port.

## Manage non-container packages

The global control script allows you to start, stop, and query the status of all components in an application.

- Global Launch

```bash
[root@localhost non-docker-demo-0.1-slug]# ./non-docker-demo.sh start
Running app golang with process:  3984 go-demo ...  Done
The environment variable $MEMORY_SIZE was not identified,The Java process will not be optimized....
Running app java-demo with process:  11472 java ...  Done
```

- Component status

```bash
[root@localhost non-docker-demo-0.1-slug]# ./non-docker-demo.sh status
AppName Status PID
golang Activity (Running) 3984
java-demo Activity (Running) 11472
```

- Global Off

```bash
[root@localhost non-docker-demo-0.1-slug]# ./non-docker-demo.sh stop
Stopping app golang which runs with pid 3984. Done
Stopping app java-demo which run with pid 11472 ...
```

The control scripts in each service component folder allow you to manage the startup, shutdown, and status query operations of a single service component.

- Component start

```bash
[root@localhost golang]# ./golang.sh start
Handling runtime environment ... Done
Handling custom environment ... Done
Running app golang, you can check the logs in file golang. og
We will start your app with ===go-demo
Running app golang with process: 24033go-demo ... Done
```

- Application status

```bash
[root@localhost golang]# ./golang.sh status
AppName Status PID
golang Active(Running) 24033
```

- Component stop

```bash
[root@localhost golang]# ./golang.sh stop
Stopping app golang which runs with pid 2403...
```

## Configuration

The configuration of service components is still managed through environment variables.

Each component directory contains an environment variable configuration file of type `{component name}.env`, which the service component loads when it starts to configure itself.

`{component name}.env` contains environment variables from the following four sources:

- When a service component is released, the component customizes the environment variable
- The environment variables for the application-level global configuration defined in the configuration group when the service component is released
- Connectivity information environment variables between service components
- An environment variable used specifically to declare port information $PORT

在非容器包启动之前，用户可以自定义 `{服务组件名}.env` 配置文件来修改服务组件的配置。Before the non-container package is started, users can customize the `{component name}.env` configuration file to modify the service component configuration.A common scenario is:Service components rely on other middleware when Rainbond is running. The referenced connection information environment variable contains configuration information such as `MYSQL_HOST=127.0.0.1`. The non-container package does not contain Mysql service components. You need to manually change the value of the `MYSQL_HOST` environment variable to the real IP address of Mysql in the current delivery environment and then start the service component.

## Log

Once a component is started, its logs are output to the `{component name}.log` file in the component directory.

## Use information

There are some restrictions on the use of non-container packages relative to applications running on Rainbond, which are explained in this section.

### Component build Source

非容器包，只会导出应用中所有由 [源码构建](../../app-deploy/source-code/springboot.md) 功能部署而来的服务组件，来自其他构建源，如 Docker 镜像构建、Helm 创建等方式的服务组件，将无法被导出到非容器包中去。

Non-container packages currently support the following source types:Java-Maven、Java-Gradle、Java-Jar、Java-War、Golang、NodeJS、NodeJS Static(VUE React)、Html static.

Python and PHP, due to their language characteristics, require users to process the operating system level library files on which the runtime depends.

### Port conflicts

Pay attentionComponents in non-container packages directly occupy server ports during startup. Therefore, the listening ports of service components must not conflict.It is recommended that the PORT that the component listens on at runtime be defined as the environment variable `PORT`, so that the configuration can be modified in the `{component name}.env` file.

### Split

Each component directory in the non-container package directory can be unpacked and run separately on other servers. If users decide to do so, be careful to configure access addresses between different services to avoid missing connections.

