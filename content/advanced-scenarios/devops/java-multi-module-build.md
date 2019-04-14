---
Title: "Java多模块源码构建"
Description: "Rainbond Java源码多模块构建"
Hidden: true
Weight: 22004
---

### 多模块项目构建识别策略

### 多模块项目源码规范

### 案例

这里以[SPRING CLOUD 微服务部署在 RAINBOND 的案例](/advanced-scenarios/micro/spring_cloud/spring-cloud-case/)一文中的Pig项目中Java源码部署部分为例，一次性多模块部署Pig项目(其他依赖如Mysql默认安装好)。

#### 模块构建

新建应用，并命名为`spring-cloud`  

获取项目克隆/下载地址： [https://gitee.com/log4j/pig.git](https://gitee.com/log4j/pig.git)

- 1. 从源码创建，选择自定义源码，填写项目地址

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk01.jpg
" width="100%" />

- 2. 如果是多模块项目会识别出来,选择进入多模块构建配置项

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk02.jpg
" width="100%" />

- 3. 根据<b>Spring Cloud 微服务部署在RAINBOND的案例</b>一文可知如下组件需要部署运行, 勾选后构建

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk03.jpg
" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk04.jpg
" width="100%" />

- 4. 构建完成效果图(仅Java部分)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk05.jpg
" width="100%" />

- 5. 查看某一应用构建源信息

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/java-multi-module-build/dmk06.jpg
" width="100%" />

> 这样Pig项目多模块构建就完成了，后续其他步骤参考[SPRING CLOUD 微服务部署在 RAINBOND 的案例](/advanced-scenarios/micro/spring_cloud/spring-cloud-case/)