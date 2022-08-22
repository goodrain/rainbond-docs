---
title: Configure components to automatically build and deploy
description: This article explains how Rainbond components are connected to external platforms to achieve automatic construction and deployment
---

Through the automatic build function, components can be automatically triggered to build and deploy after the code or image is submitted. Rainbond provides three ways to trigger the automatic deployment of components based on code repository Webhooks, image repository Webhooks and custom APIs.The automatic build function can assist developers to easily implement agile development.

### Preconditions

- Components are created from source code (except official demo), and can support code repository Webhooks. Currently supported code repositories are`GitHub`,`GitLab`,`Gitee` and `Gogs`.
- Components are created from images and can support image repository Webhooks. Currently, it supports Docker official repository and Alibaba Cloud image repository.
- Create Component A from the source code and put it in a functioning state.

### Based on the source code operation process

1.Turn on the component Git-Webhook In the _-component management panel/build source management_ , please turn on the Git-Webhook automatic build function, and copy the generated hook address.

![Enable Git-Webhook function](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/auto-deploy/webhook.png)

After Rainbond is automatically built, the deployment action will be performed by default, so in general, developers do not want the deployment action to be performed every time the code is submitted, so the Rainbond hook automatically triggers and sets the premise, and the action is triggered when the Commit information contains`@keyword`.This keyword can be set by the developer.

> Please note that the domain name generated here is generated according to the domain name of the current access platform. If it is incorrect, you can directly use the correct access domain name of the platform.

**Configuration code repository**

If your project is stored in<code>Github</code>, please refer to the following screenshot：

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/github.jpg" alt="Github configuration method" />

If your project is stored in Gitlab, please refer to the screenshot below:

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/gitlab.jpg" alt="Gitlab configuration method" />

The configuration of other code repositories is similar. It should be noted that the current Rainbond hook trigger does not support security request verification.

Based on the operation process of the mirror warehouse

The automatic construction of the mirror warehouse can realize the automatic construction of the application after the image is pushed, and it is convenient to connect with the third-party automation process.When the image update event arrives, the following conditions are judged, and the automatic build is triggered when all are satisfied.

- The application is created from an image, and the image repository is<code>Docker Hub</code>, version 5.1.2 and later supports Alibaba Cloud image repository.
 
- Whether the image name and tag updated by default are consistent with the name of the current component build source image (the domain name of the image warehouse is not included in the judgment), version 5.1.3 and later supports configuring Tag to trigger regular policies, dynamically matching and changing the image Tag of the component.

- component has enabled the mirror warehouse function.
- Application state is not closed state.
- Open the mirror warehouse Webhook to automatically build
  
The auto-build feature needs to be enabled in the application, and the webhooks url of the application needs to be configured into the webhooks of the target registry.

Tag triggers automatic modification strategy

By default, the image name and tag of the Webhook update event must be the same as the image name and tag configuration of the component's current build source to trigger build and deployment.After configuring the tag trigger policy, according to the configured regular expression, if the received image tag of the push event can correctly match the regular expression, the update event is considered valid, and the build source of the current component is upgraded according to the updated tag information. information and build automatically.

For example, setting the Tag policy to： v5.* will be allowed when the Tag is v5.1 v5.2 v5.9.

**Configure the mirror warehouse**

- Configure Docker Hub
- Please refer to the following screenshot for the configuration method:
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548411288653.jpg" alt="" />


### API triggers automatic builds

By enabling the API to automatically build the returned url, call the API with the POST method, and carry the secret key to trigger the automatic API construction. The secret key can be customized

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/auto-deploy/api.png" alt="Enable custom API to trigger automatic build" />

API usage is as：

```
curl -d '{"secret_key":"&lt;secret key&gt;"}' -H "Content-type: application/json" -X POST API地址
```

Triggering automated builds based on APIs is one of the most flexible ways to integrate with third-party CI systems.