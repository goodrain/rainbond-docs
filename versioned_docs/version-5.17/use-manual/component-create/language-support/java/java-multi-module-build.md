---
title: 'Java Maven 多模块源码构建'
description: 'Rainbond Java源码多模块构建'
---

### Maven 多模块项目构建识别策略

Maven 多模块项目是根据 pom.xml 文件(下面简称 pom)来划分的, Rainbond 对它的识别也是建立在 pom 的基础上的. 主要是识别出具体模块(module)的构建命令和启动命令. 构建命令的作用是指定需要构建的模块, 是类似于 "mvn install -pl 'module name' -am" 的 mvn 命令. 启动命令的作用是在构建完成后, 指定需要执行的 Jar 包, 是类似于 "web: java $JAVA_OPTS -jar \*.jar" 的命令.

识别策略:

1. 根据根 pom 中的 modules 中的 module 标签, 找到相应模块下的 pom.
2. 如果 pom 中的 packing 标签的值是 jar(war), 则解析出当前 pom 对应的模块名和 jar(war)包名. packing 标签的值为空, 会认为是 jar.
3. 模块名由名级父 pom 中的 module 标签的值组成, 用 "/" 分割, 类似于: rbd-worker/rbd-thirdparty.
4. jar(war) 包名默认是 $\{artifaceId}-*.jar(war). 如果设置了 finalName 标签, 则会使用 finalName 标签的值; 如果finalName 标签使用了变量$\{project.name}或$\{project.aritfactId}, 则会使用变量对应的值; 如果使用了其他的变量, 则直接用 _ 代替, 即: _.jar(war).
5. 如果 pom 中的 packing 标签的值是 pom, 且 modules 标签中的 module 多于 1, 则重复 1 ~ 5.

> 因为很多地方都使用了通配符 \* , 在构建出来的 jar(war) 不只一个时, 识别出来的 jar(war) 包可能不能确定唯一的包; 又或者识别出来的 jar(war) 包有误, 这时候就需要用户手动进行修改.

### 多模块项目源码规范

因为 Rainbond 对 Maven 多模块项目的识别是建立在 pom 的基础上的, 所以大家在书写的 pom.xml 文件, 符合 pom 的规范就好. pom 的规范请参考: [POM Reference](https://maven.apache.org/pom.html)

### 案例

这里以[SPRING CLOUD 微服务部署在 RAINBOND 的案例](../../../../micro-service/example/pig.md)一文中的 Pig 项目中 Java 源码部署部分为例，一次性多模块部署 Pig 项目(其他依赖如 Mysql 默认安装好)。

#### 模块构建

新建应用，并命名为`spring-cloud`

获取项目克隆/下载地址： [https://gitee.com/log4j/pig.git](https://gitee.com/log4j/pig.git)

- 1. 从源码创建，选择自定义源码，填写项目地址

<img src="https://static.goodrain.com/images/5.1/java-multi-module-build/dmk01.jpg
" width="100%" />

- 2. 如果是多模块项目会识别出来,选择进入多模块构建配置项

<img src="https://static.goodrain.com/images/5.1/java-multi-module-build/dmk02.jpg
" width="100%" />

- 3. 根据**Spring Cloud 微服务部署在 RAINBOND 的案例**一文可知如下组件需要部署运行, 勾选后构建

<img src="https://static.goodrain.com/images/5.1/java-multi-module-build/dmk03.jpg
" width="100%" />

<img src="https://static.goodrain.com/images/5.1/java-multi-module-build/dmk04.jpg
" width="100%" />

- 4. 构建完成效果图(仅 Java 部分)

<img src="https://static.goodrain.com/images/5.1/java-multi-module-build/dmk05.jpg
" width="100%" />

- 5. 查看某一应用构建源信息

<img src="https://static.goodrain.com/images/5.1/java-multi-module-build/dmk06.jpg
" width="100%" />

> 这样 Pig 项目多模块构建就完成了，后续其他步骤参考[SPRING CLOUD 微服务部署在 RAINBOND 的案例](../../../../micro-service/example/pig.md)
