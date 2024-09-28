---
title: Continuous integration and continuous deployment using the Waterline plugin
description: The streaming plugin is based on the Rainbond plugin extension and extends to the existing building system of Rainbond, which will describe the deployment of RuoYi SpringBoot project using the plug plugin and achieve auto-build, auto-deploy after submitting code
slug: pipelinespringboot
image: https://static.goodrain.com/wechat/pipeline-springboot/ci-cd.png
---

[流水线插件](https://www.rainbond.com/docs/devops/pipeine/) is based on the Rainbond **plugin system** extension that enables the extension of the Rainbow build system by plugin.This plugin is developed and contributed by a community partner **outreach information** based on GitLab CI/CD implementation.

The difference between pipeline construction and Rainbond source construction is：

- Rainbond source builds：in simple, fixed build mode and user needs to provide source code only, but not very flexible.
- Waterline builds：custom build steps, using more flexibility.

This paper will describe the deployment of the RuoYi SpringBoot project using a plug plugin and implement automatic construction and deployment after submission of the code.

## Install GitLab and Runner

Waterline plugins are implemented on GitLab so they need to rely on GitLab and GitLab Runner and skip this step if available.

GitLab and Runner are deployed through Rainbond Open Source Store. Go to **Platform Manager -> Marketplace -> Open Source Store** to search for `GitLab` and `GitLab-runner`. Select versions to install them in the same application.

![](https://static.goodrain.com/wechat/pipeline-springboot/1.png)

Once deployed, access the default GitLab domain name for user registration.Then close GitLab default AutoDevOps：`Admin -> Settings -> CI/CD -> Continuous Integration and Deployment` uncheck \`\`Default to Auto DevOps pipeline for all projects.

![](https://static.goodrain.com/wechat/pipeline-springboot/2.png)

### Sign up for Runner

Once both GitLab and Runner are deployed, Runner needs to be registered in GitLab.

Inside group Runner **Component -> Web Terminal** execute the command below to register：

- `<URL>` is a GitLab access address
- `<TOKEN>`Get `Registration token` on `Admin -> Runners` on GitLab
- `<TAG>` customizes the Runner tag.

```bash
gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "<URL>" \
  --registration-token "<TOKEN>" \
  --description "docker-runner" \
  --tag-list "<TAG>" \
  --run-untagged="true" \
  --locked="false" \
  --docker-volumes /var/run/docker.sock:/var/run/docker.sock \
  --docker-volumes /root/.m2/repository \
  --docker-privileged="true" \
  --access-level="not_protected" \
  --docker-pull-policy="if-not-present"
```

Once registered, the following graph can be found on the `Admin -> Runners` page, where `Status` is \`\`online\`.

![](https://static.goodrain.com/wechat/pipeline-springboot/3.png)

## Install Waterline Plugin

Deploy the Pipeline application plugin through Rainbond Open Source Store. Go to **Platform Manager -> Marketplace -> Open Source Store** to search for `Pipeline` and select the corresponding version to be deployed.

![](https://static.goodrain.com/wechat/pipeline-springboot/4.png)

Once the installation has been completed, you will need to change the configuration of the Pipeline-Backend service to the **Pipeline app -> Pipeline-Backend**, modify the following environment variable：

- RAINBOND_URL：Rainbond Console Visited Address, e.g.：`http://192.168.33.33:70`.

* The Token for RAINBOND_TOKEN：Rainbond Console Console can be obtained in **Top Right Users -> Personal Center -> Access Token**.

Update or restart the Backend component to take effect after the modification has been completed.

![](https://static.goodrain.com/wechat/pipeline-springboot/5.png)

Go to the **Pipeline app -> k8s resource -> Edit rainbond-pipeline**, modify the `access_urls` configuration in the `pipeline` resource to the external address of the `Pipeline-UI` component as follows:

```yaml
apiVersion: rainbond.io/v1alpa1
kind: RBDPlugin
metadata:
  labels:
    plugin. ainbon.io/name: pipeline
  name: pipeline
spec:
  access_urls:
  - https://custom. om
  alias: Pipeline
  author: Talkweb
  description: This app is based on GitLab CI/CD implementation, Development Rainbond existing architectural systems.
  icon: https://static. odrain.com/icon/pipeline.png
  version: 1.0.0
```

Once the modification has been completed, the `waterline` button can be seen in each team view.

## Deployment of RuoYi project

Fork the [RuoYi](https://gitee.com/y_project/RuoYi.git) project in Gitee to private GitLab.

Modify the `mysql` connection address： in the project configuration file

```yaml
# ruoyi-admin/src/main/resources/application-druid.yml
......
spring:
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        driverClassName: com.mysql.cj.jdbc.Driver
        druid:
            # 主库数据源
            master:
                url: jdbc:mysql://${MYSQL_HOST}:3306/ry?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
                username: root
                password: root
```

### MySQL deployment

MySQL deployment via Rainbond Open Source Store.After deploying, open the MySQL external service port, connect to the database using local tools and create `ry` databases and initialize `quartz.sql` and `ry_20230223.sql` in the sql directory.

### Deploy RuoYi SpringBoot

Go to \*\*Team View -> Stream Line \*\*.

#### 1. Create Pipeline

Enter the line management, select Java Maven Single Module to create a template.

![](https://static.goodrain.com/wechat/pipeline-springboot/6.png)

If there is no SonarQube code scanning step you can delete, modify **Build Building** step：

- Product directory：ruoyi-admin/target/\*.jar

Modify **Build Mirror** step：

- Script command：

```bash
cp ruoyi-admin/target/*.jar app.jar
docker login -u ${REPOSITORY_USERNAME} -p ${REPOSITORY_PASSWORD} ${REPOSITORY_URL}
docker build -t  ${REPOSITORY_URL}/${ORG}/${MODULE}:${DEVOPS_VERSION} .
docker push ${REPOSITORY_URL}/${ORG}/${MODULE}:${DEVOPS_VERSION}
```

Specify the environment variable associated with the Docker to pack images and push image： within the variable of the waterline

- REPOSITORY_URL：Mirror repository address, e.g.：registry.cn-hangzhou.aliyuncs.com
- ORG：Mirror Repository Organization, eg:：goodrain
- REPOSITORY_USERNAME：Mirror repository username
- REPOSITORY_PASSWORD：

#### 2. Create App Service

- Service encoding：unique
- Service name：Custom
- Waterline：Select Waterline Template
- Repository configuration：Fill in repository address, e.g.：http://gitlab.test.com/root/ruoy.git
- Authentication Configuration：Optional User Password or Token

![](https://static.goodrain.com/wechat/pipeline-springboot/7.png)

After creating the app service, two more `Dockerfile` and `.gitlab-ci.yml` files can be seen in the GitLab repository, which are automatically generated by the streaming plugin service and submitted to the repository.

#### 3. Build Services

Go to **Code Manager** and apply services select `ruoy` and click on the `Build` button to start construction.Build status and steps can be seen on the Continuous Integration page. Click on steps to go to the GitLab details page.

![](https://static.goodrain.com/wechat/pipeline-springboot/8.png)

#### Deployment of backend services

Once the build has been completed, the build version can be seen in the mirror repository. It can then be deployed through it, and it can be selected which app will be deployed to the current team.

![](https://static.goodrain.com/wechat/pipeline-springboot/9.png)

Once deployed, you can see the deployment history on the deployment history page. Click the deployment details to jump to the Rainbond component.

![](https://static.goodrain.com/wechat/pipeline-springboot/10.png)

### Edit Dependencies

Then go into the app and switch to the layout mode where the `ruoyi` service is dependent on the MySQL service and update ruoyi components.

![](https://static.goodrain.com/wechat/pipeline-springboot/11.png)

Go to the ruoyi component -> port, add 80 ports and open the external service to access ruoyi UI via default domain name.

![](https://static.goodrain.com/wechat/pipeline-springboot/12.png)

### Configure Auto Build and Auto Deploy

Edit the app service that has been created, open the auto-build and auto-deploy buttons that will automatically trigger the entire process when the next submission is made.

![](https://static.goodrain.com/wechat/pipeline-springboot/13.png)

## Last

More flexible extension build processes such as adding code scanning, building messages after a successful build, etc.Waterline plugins will also continue to iterate over time. Welcome to your installation!
