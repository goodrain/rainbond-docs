---
title: Java Maven multi-module source code build
description: Rainbond Java source multi-module build
---

### Maven multi-module project build identification strategy

The Maven multi-module project is divided according to the pom.xml file (hereinafter referred to as pom), and Rainbond's recognition of it is also based on the pom. It mainly identifies the build command and startup command of a specific module. Build The function of the command is to specify the module to be built, which is similar to the mvn command of "mvn install -pl 'module name' -am". The function of the startup command is to specify the Jar package to be executed after the build is completed, which is similar to " web: java $JAVA_OPTS -jar \*.jar" command.

Identification strategy:

1. According to the module label in modules in the root pom, find the pom under the corresponding module.
2. If the value of the packing tag in the pom is jar(war), the module name and jar(war) package name corresponding to the current pom will be parsed. If the value of the packing tag is empty, it will be considered as jar.
3. The module name consists of the value of the module tag in the named parent pom, separated by "/", like: rbd-worker/rbd-thirdparty.
4. jar(war) The default package name is $\{artifaceId}-\*.jar(war). If the finalName tag is set, the value of the finalName tag will be used; if the finalName tag uses variable$\{project.name}or$\{project.aritfactId}, the corresponding value of the variable will be used; if If other variables are used, replace them with _ directly, namely: _.jar(war).
5. If the value of the packing tag in the pom is pom, and the modules in the modules tag is more than 1, repeat 1 ~ 5.

> Because the wildcard character \* is used in many places, when more than one jar (war) is built, the recognized jar (war) package may not be able to determine the unique package; or the recognized jar (war) package is wrong, In this case, the user needs to manually modify it.

### Multi-module project source code specification

Because Rainbond's recognition of Maven multi-module projects is based on pom, so the pom.xml file you are writing should conform to the pom specification. For the pom specification, please refer to: [POM Reference](https://maven.apache.org/pom.html)

### case

Here is an example of the Java source code deployment part of the Pig project in the case of RAINBOND where theSPRING CLOUD microservice is deployed. The Pig project is deployed with multiple modules at one time (other dependencies such as Mysql are installed by default).

#### module building

Create a new application and name it`spring-cloud`

Get project clone/download address： [https://gitee.com/log4j/pig.git](https://gitee.com/log4j/pig.git)

- 1. Create from source code, select custom source code, and fill in the project address

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk01.jpg
" width="100%" />

- 2. If it is a multi-module project, it will be recognized, select to enter the multi-module build configuration item

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk02.jpg
" width="100%" />

- 3. According to the article**Spring Cloud Microservices Deployed in RAINBOND Case**, we can see that the following components need to be deployed and run, check them and build

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk03.jpg
" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk04.jpg
" width="100%" />

- 4. The rendering of the completed construction (only the Java part)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk05.jpg
" width="100%" />

- 5. View an application build source information

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk06.jpg
" width="100%" />

> In this way, the multi-module construction of the Pig project is completed. For other steps, please refer to[SPRING CLOUD Microservices Deployed in RAINBOND Case](/docs/micro-service/example/pig)
