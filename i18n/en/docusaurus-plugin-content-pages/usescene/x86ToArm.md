---
title: Localization and Xinchuang Support
description: The cloud native application management platform can be deployed in the Arm64 environment.Since January 2020, Rainbond has conducted adaptation tests with Huawei and Feiteng respectively.After verification, Rainbond can run stably on both the Kunpeng 920 chip and the FT2000+/64 two Arm64 chips, reaching the production-ready standard.
keywords:
- Rainbond
- Arm64
---

# Localization and Xinchuang Support

:::info
Once upon a time, whether in servers or personal computers, Intel has always been the leader in the field of CPU chips, and its X86_64 architecture is widely used.However, the kingship is not eternal. In recent years, the Arm64 architecture has sprung up. The server side is represented by the Huawei Kunpeng 920 high-performance chip, and the personal computer side is amazing with the Apple M1 chip.Arm64 architecture chips show off their market value with low power consumption and high performance, and the torrent of localized substitution is also constantly pushing Arm64 to suppliers of the military, government, and state-owned enterprises.Seizing the opportunity to quickly embrace and adapt to localized chips is a new topic of software delivery in this era.
:::

<!--truncate-->

### The difficulties of embracing Arm64

It is not easy to move from `X86_64` to `Arm64` The change of the instruction set has a great influence on the radius.

The most direct impact is that the business system that can run normally in the `X86_64` environment needs to be recompiled based on `Arm64` before it can run.Even if the language used during development has cross-architecture capabilities, recompilation itself is a very complicated task, requiring a lot of labor and time costs.

`The development language ecology of Arm64` is not so sound, which will inevitably increase the burden that developers should not care about.The runtime environment of many languages needs to be recompiled, not to mention the adaptation of many open source middleware.

The above are just the focus of the developer's attention.

In the field of software delivery, the delivery of software to the customer environment and running is just the beginning.The management, monitoring, iteration, and disaster recovery of business systems are all points that the delivery team needs to focus on continuously.Most delivery teams already have their own solutions under the `X86_64` architecture.So how can advanced tools and methods such as containers, Kubernetes, and DevOps be replicated under the `Arm64` architecture?

### solution

[Rainbond](https://www.rainbond.com/?channel=aliyun) can use its own capabilities to smooth out the differences in chip architecture. Whether developers or delivery personnel, can find a solution to embrace `Arm64` based on Rainbond.Rainbond addresses migration from `X86_64` to `Arm64` with different levels of capabilities.

- Existing capabilities：Rainbond itself is a cloud-native application management platform suitable for software delivery or application operation and maintenance management.Whether it is rapid delivery and deployment, or application management, monitoring, iteration, and disaster recovery, the existing functions can already meet the daily needs of delivery operation and maintenance personnel.

- Containerization technology：Rainbond is implemented based on containerization technology. The lightweight virtualization technology of containers has already shined in the field of `Arm64`.Since containers support multiple architectures, most open source middleware has provided basic images based on different architectures, and`Arm64` is naturally the standard among them.Choosing containerization technology is equivalent to choosing `Arm64` ecological support.
- It is compatible with `Arm64` ：Rainbond has started to adapt its localized architecture very early, and it has adapted to various architectures including `Arm64`.
- Minimalist development environment deployment： Rainbond already supports Docker Desktop environment running on various personal platforms. Developers only need to use a MacBook with M1 chip to build their own Rainbond Arm64 development environment in ten minutes. Extremely.
- The source code build is compatible with `Arm64` ：This is the last link to get through the migration to the `Arm64` architecture.In Rainbond, developers can directly use the source code to build their own business components without changing a line of code, and then deploy and run them in the `Arm64` environment.At present, Rainbond source code construction has supported many mainstream languages on the market, and various extension dependencies around the language itself have tended to be complete.

### Rainbond is Arm64 compatible

[Rainbond](https://www.rainbond.com/?channel=aliyun) Cloud-native application management platform can be deployed in `Arm64` environments.Since January 2020, Rainbond has conducted adaptation tests with Huawei and Feiteng respectively.After verification, Rainbond can run stably on the Kunpeng 920 chip and the FT2000+/64 two `Arm64` chips, reaching the production-ready standard.

![](https://static.goodrain.com/wechat/arm-compile/rainbondauth.png)

In the field of personal development, Rainbond is also making continuous efforts.Currently, Rainbond supports running with Docker Desktop on various personal PC platforms.We integrate all the components of Rainbond into a container, which allows individual developers to run their own development and testing environment in ten minutes in the most simplified way.For individual developers using a MacBook with an M1 chip, it is already equivalent to developing based on the `Arm64` architecture.

- [Run Rainbond on Mac, 10-minute quick install](https://mp.weixin.qq.com/s/tNKNfi4RhDpyTB_GuLka7w)

- [Running Rainbond on Windows, 10-minute quick install](https://mp.weixin.qq.com/s/OPINQRRSRcBLc4zQ-S3raw)

### Source compilation in Arm64

[Rainbond](https://www.rainbond.com/?channel=aliyun) has the ability to compile source code for a long time.This feature was born out of the Heroku/buildpack project and has been heavily optimized by the Rainbond team for its own needs.With its capabilities, users can skip the process of writing Dockerfile based on source codes in multiple languages, and complete the containerization of the business.Source code compilation is the easiest way to deploy an enterprise's self-developed business. It only needs to provide the warehouse address of the source code.

Currently `Arm64` source code compilation supported languages and versions are as follows：

|           language support            | Version support                                                                    |                          Extended support                           |
|:-------------------------------------:|:---------------------------------------------------------------------------------- |:-------------------------------------------------------------------:|
|      Java： Maven/Jar/War/Gradle       | openjdk 8/9/10/11/12/13                                                            |                     pinpoint agent jmx-exporter                     |
|                Node.js                | Node 4.9.1 / 5.12.0 / 6.14.4 / 7.10.1 / 8.9.3 / 8.12.0 / 9.11.2 / 10.13.0 / 11.1.0 |                             Yarn 1.9.4                              |
| Node.js front-end project (VUE React) | Node 4.9.1 / 5.12.0 / 6.14.4 / 7.10.1 / 8.9.3 / 8.12.0 / 9.11.2 / 10.13.0 / 11.1.0 |                       Yarn 1.9.4 Nginx 1.18.0                       |
|                Golang                 | Go 1.8 / 1.9 / 1.10 / 1.11 / 1.12 / 1.13 / 1.14 / 1.15 / 1.16                      |                                                                     |
|                Python                 | Python 2.7.9 / 2.7.17 / 3.4.9 / 3.5.7 / 3.6.6 / 3.6.10                             |                                                                     |
|                  PHP                  | PHP 5.5.38 / 5.6.32 ~ 37 / 7.0.29 / 7.1.27 / 7.2.16 / 7.3.3                        | apcu/ev/event/imgick memcached/mongodb oauth/phalcon pq/raphf/redis |
|                 Html                  | Nginx 1.18.0 / Apache Httpd 2.2.19                                                 |                                                                     |

After the source code building function is adapted to `Arm64` , users do not need to containerize the business themselves, but only need to provide the source code.This experience can be called migrating the business to the `Arm64` container at zero cost.It greatly reduces the technical burden of developers and reduces the cost of migration and adaptation.In this process, the processing of the code running environment and the processing of extension dependencies have been completed by the Rainbond Arm64 source code construction capability.

The principle of source code construction is：complicated

- Based on [Builder](https://github.com/goodrain/builder) , a unified build environment is provided, and the buildpack script of the corresponding language is selected according to the characteristics of the business source code.
- Depending on the buildpack script and the version specified by the user in the Rainbond console, the corresponding language runtime environment precompiled package (such as Openjdk) will be downloaded from the third-party object storage (Rainbond AliyunOSS) to prepare the basic compilation environment.
- Execute the pre-compilation process, and configure the compilation environment according to the compilation characteristics (such as dependency warehouse address, etc.) defined by the user in the Rainbond console.
- According to the compilation command specified by the user in the Rainbond console, or the default value of each language, the compilation work starts.During this period, specific operations will be performed according to language characteristics, such as executing hook functions, downloading specified extensions (PHP extensions), etc.
- The finished product is packaged uniformly, and the packaged format is a Heroku-style Slug package.
- Based on [Runner](https://github.com/goodrain/runner) as the basic image, the Slug package is packaged into a business container image, and the Slug package is automatically decompressed at runtime, and the final operation is completed according to the startup command specified by the user.

The entire build process has real-time push logs. For developers, it is not much different from compiling in their own development environment.During the compilation process, `Arm64` support including：language runtime environment precompiled packages, extensions, Nginx/Httpd and other intermediate prices have been adapted by the official, which saves the hard work of developers and saves a lot of money. hair.

The newly installed Rainbond platform will pull the builder and runner images when building the source code for the first time. This process will take a few minutes.Users who have installed Rainbond in the `Arm64` environment can execute the following command to pull the latest image to obtain the `Arm64` source code compilation capability.

Take Rainbond installed on a MacBook M1 computer as an example, enter the rainbond-allinone container to operate：

```bash
docker exec -ti rainbond-allinone bash
```

Obtain the login password of the built-in mirror warehouse and log in to mirror warehouse：

```bash
hubpassword=$(kubectl get rainbondcluster -o yaml -n rbd-system | grep password | awk '{print $2}')
docker login --username=admin --password=${hubpassword} goodrain.me
```

process image：

```bash
images=(builder runner)
for image in ${images[@]}
  do
    docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/${image}:v5.5.0-release
    docker tag registry.cn-hangzhou. aliyuncs.com/goodrain/${image}:v5.5.0-release goodrain.me/${image}
    docker push goodrain.me/${image}
  done
```

Rainbond provides sample code for building and testing from source.

![](https://static.goodrain.com/wechat/arm-compile/bilde-demo.png)

After the build starts, the real-time push build log will automatically pop up for developers to understand the build progress.

![](https://static.goodrain.com/wechat/arm-compile/build-1.png)

The following information is provided in the current log in sequence：

- Code repository address
- Code latest commit information
- The first source code build pulls the builder image (this process is only pulled in the first build)
- Identify the CPU architecture of the build environment, currently linux-arm64
- Identify the language and build method, currently Java-maven
- The language runtime environment version, the openjdk1.8 available for the Arm64 environment will currently be downloaded
- Install Java language capability extensions, including Pinpoint APM agent and jmx-exporter
- Install Maven build environment, current version 3.3.9
- Execute the build command.

The next output, which is the same as the standard Java-maven build output, is the process of downloading the pom and its dependencies.After the build is complete, output log：

![](https://static.goodrain.com/wechat/arm-compile/build-2.png)

The code compilation process is now complete. Next, the runner will continue to build the image using the compiled and packaged slug file, and complete the push to the built-in image：.

![](https://static.goodrain.com/wechat/arm-compile/build-3.png)

For the first build, the runner image will be pulled, and this behavior will only be done once.

![](https://static.goodrain.com/wechat/arm-compile/build-4.png)

At this point, the source code has become a runnable container image that can run in the `Arm64` environment.

### continuous delivery

When developers successfully deploy their business systems in the Rainbond Arm64 environment, Rainbond's existing delivery process can minimize the difficulty of delivering to the `Arm64` environment.By publishing the business system as a whole as an application template, a standard deliverable that can be delivered to the final production environment is obtained.Whether it is exported as an offline package or delivered based on the online RainStore, it can be easily implemented.For the follow-up process, you can refer to previous articles or refer to official documents.

[Offline Environment Software Delivery with Rainbond](https://mp.weixin.qq.com/s/7_i-UbVBxcAEoGaxuuET3w)
