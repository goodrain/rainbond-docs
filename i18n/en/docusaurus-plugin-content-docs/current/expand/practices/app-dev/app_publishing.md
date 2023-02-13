---
title: Rolling release, grayscale release and blue-green release
Description: "The release of three microservices based on Rainbond"
weight: 30
---

Before the software goes online, it is inevitable to test the availability and reliability of the software, and it cannot be shut down for maintenance, which affects the user experience, and can be rolled back in time when a problem occurs in the new version; therefore, a complete deployment plan is required. Here, the relevant principles, ideas and implementation methods are explained for the**rolling release, grayscale release and blue-green release**based on Rainbond.

## 1. Rolling release

### Overview

A rolling release is when an instance or multiple instances are taken out of service, updated, and put back into service; and so on, until all instances are updated to the new version.

The difference between the stateless component rolling update and the stateful component rolling update on the Rainbond platform：

 - When the stateless component：is updated in a rolling manner, a new instance will be generated first. After the new instance is started, it will run in the background. The platform will use the health monitoring mechanism to monitor the port to determine whether the application in the new instance is running normally. New applications will be launched and old applications will be destroyed to complete the rolling release process.

 - If the stateful component：is a non-clustered application, the old instance will stop running before a new instance is generated. After the new instance is updated, the old instance will be abolished. If it is a clustered application, there is no need to worry about service interruption. , which can be updated in batches.to ensure the operation of the service.


### Preconditions

1. A functioning Rainbond,
2. For the running test component, refer to [source code build](/docs/use-manual/component-create/language-support/html) directly build [the project](https://github.com/Aaron-23/teststatic).

### Steps

Here is an example of a stateless component

1. Switch the component build source branch to the devel branch, <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/app-publishing/brach.jpg" width="100%" />
2. Click Build to perform the build operation,
3. After the build is complete, a rolling upgrade will occur automatically.


### Show results

During the rolling upgrade process, the instance creation status can be dynamically viewed on the component scaling interface. The new instance is created and runs normally, the old instance will be deleted, and the new version is online. Affected.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/app-publishing/Rolling%20update.jpg" width="100%" />


## 2. Grayscale release

### Overview

Grayscale publishing refers to a publishing method that can smoothly transition between black and white. Grayscale publishing can ensure the stability of the overall system. Problems can be found and adjusted at the initial grayscale to ensure their influence.


### Preconditions

1. A functioning Rainbond,
2. To test components of the old and new versions in operation, refer to [source code build](/docs/use-manual/component-create/language-support/html) directly build [the project](https://github.com/Aaron-23/teststatic)(here, the master branch is the old version, and the devel branch is the new version),
3. Have a test domain name.

### Steps

Control from the dimension of traffic. First, 10% of the traffic is switched to the new version, and then the weight is gradually increased. Under normal circumstances, the weight of the old version is reduced to 0; that is, the grayscale release is completed.

1. Bind the test domain name to the two test components, and manage the access policy through **gateway->** Add the following two HTTP access policies to set the corresponding weights：

| web service                    | domain name          | Weights |
| ------------------------------ | -------------------- | ------- |
| Grayscale releases old version | www.rainbondtest.com | 90      |
| Grayscale releases new version | www.rainbondtest.com | 10      |

Example

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/app-publishing/binddomain.jpg" width="700%" />

2. Gradually reduce the weight of the old version and increase the weight of the new version as needed, until the weight of the old version is reduced to 0 to complete the grayscale release.

### Show results

In the process of switching weights, when you visit the test domain name and refresh the page, the content you see is different, and it is constantly changing with the adjustment of weights, which reflects the process of grayscale publishing.


## 3. Blue-green release

### Overview

The blue-green deployment is to keep the old version, deploy the new version and then test, confirm OK, switch the traffic to the new version, and then upgrade the old version to the new version at the same time.

### Preconditions

1. A functioning Rainbond,
2. To test components of the old and new versions in operation, refer to [source code build](/docs/use-manual/component-create/language-support/html) directly build [the project](https://github.com/Aaron-23/teststatic)(here, the master branch is the old version, and the devel branch is the new version),
3. Have a test domain name.

### Steps

1. web service binding domain name

| web service | domain name          | Weights |
| ----------- | -------------------- | ------- |
| Web V1      | www.rainbondtest.com | 100     |
| Web V2      | www.rainbondtest.com | 0       |

2. Through **gateway -> access policy management** , the weight is lowered and raised respectively; the weight of Web V1 is adjusted to 0, and the weight of Web V2 is adjusted to 100, that is, switching between versions is realized.

### Show results

Visit the test domain name to see that the traffic has been transferred to Web V2, and the blue-green release has been completed.

**You may also want to read：**

[Component A/B testing practice based on Rainbond](./ab_testing/)
