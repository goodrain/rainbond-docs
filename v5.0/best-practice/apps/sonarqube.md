---
title: 代码质量管理系统SonarQube
summary: 对接代码质量管理系统SonarQube
toc: true
toc_not_nested: true
asciicast: true
---

## 云市安装SonarQube

从云市同步应用SonarQube安装即可快速[SonarQube](https://www.goodrain.com/app/detail/157)

## 配置

#### 安装插件
部署完成后点击SonarQube应用访问按钮。

默认用户名和密码 `admin/admin`

登录进入后，点击Administration选择Marketplace,安装插件。

推荐必安装插件

- Checkstyle
- Findbugs
- SonarCSS
- SonarJS
- SonarWeb
- SonarXML
- SonarJava

可选插件

- Chinese Pack

#### 更新Quality Profiles

修改Java默认Profile为`FindBugs + FB-Contrib`

## Maven项目对接

#### 源码构建
源码构建时，配置如下环境变量即可:     

key: `BUILD_MAVEN_CUSTOM_GOALS`  

value: `clean install -B -DskipTests=true -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true sonar:sonar -Dsonar.host.url=http://9000.gr7bdca9.kehz960q.d69c10.grapps.cn -Dsonar.login=9421048d6a8fd6045f2236ef3ed986f6fcccbfc1`

#### Dockerfile构建

参考[java-maven-docker-demo](https://github.com/goodrain-apps/java-maven-docker-demo/blob/sonar/Dockerfile)项目