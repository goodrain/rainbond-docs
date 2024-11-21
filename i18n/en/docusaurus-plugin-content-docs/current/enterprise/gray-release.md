---
title: Full link grayscale release
description: Introduction to Gray Release on the Platform
---

Grey release is a software dissemination strategy to reduce risk and gain a more controlled dissemination process by gradually introducing new versions of applications in the production environment.It allows experimentation with new features or updates on a small number of users or servers and then gradually expands publication based on feedback and performance indicators.Grayscale releases can help organizations to better manage and control the software distribution process and reduce potential impact and failure risks.

All-linked grey dissemination goes further than traditional grey distribution, taking into account not only grey dissemination at the application level, but also all components and services in the entire system chain.Full link grey release can span multiple environments and systems levels, including front, backend, databases, etc. to ensure that new versions of applications are progressively validated and deployed throughout the system links.This approach would allow for a more comprehensive assessment of the compatibility and stability of the new version with the existing system and the identification and resolution of potential problems at all levels.

This document details the core features of batch publishing, Header based matching rules, full-link grayscale, and all link grayscale publishing such as monitoring and rollbacks.You will know how to prepare the environment, create a release version, develop a grayscale publishing strategy, and monitor the results of the publication.We will also provide some best practices and suggestions to help you optimize the configuration and operation of all linked gray releases to achieve a more efficient and reliable release process.

## Main features

### Batch Publish

![gray-status](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/gray-release/gray-status1.png)

Full link grayscale release supports the bulk introduction of new versions of applications into the production environment, gradually cutting traffic into new versions of applications by running them and allowing you to assess the stability and performance of new versions within your control and to address issues that may arise in a timely manner.

- Define batch and traffic scale：for batch publishing, you can define the batch and the traffic ratio of each batch to be published, based on the availability of needs and resources.More batch size helps smooth upgrades and controls the risks involved in the release process, enabling you to better monitor new versions of performance and stability.

- Monitor and evaluate：in each batch of releases, you should closely monitor key indicators, such as response time, error rate and old new version traffic ratio.This will help you identify potential problems and take the necessary measures in a timely manner.It would also be useful to learn about user feedback in order to learn about the experience and satisfaction of the new version.These monitoring and evaluation data will provide an important basis for the release and decision-making of the subsequent batches.

- Problem processing and rollback：may cause some problems or anomalies when the batch is published.In this case, you should have a clear problem handling and rollback plan.If a significant problem was found in a batch, you need to stop the batch in time and roll back to previous versions quickly.This will help you minimize potential impacts and ensure the system's stability and availability.

### Header based matching rules

You can route a specific request to a new version or an old application based on the requested Header information, such as user identifier, device type, etc.This flexible matching rule enables you to control gray levels of fine particle levels for different users or conditions, ensuring that new versions are accessible only if specific users or requests that the conditions be met.Below is a detailed description of the Header matching rules：

- Defines the matching rule：requires a set of Header keys and corresponding values to match when using Header matching rules.These matching rules can be customized based on business needs, such as specific user groups, equipment type, geographic location, etc.Accurate matches and regular matches are currently supported.You can specify one or more Header keys and corresponding values to match in order to route the request to a new version of the application that meets the criteria.

- Flexibility and accuracy of：Header based on Header matching rules support multiple Header to meet both new versions of the route or one of them to a new version.You can actually need and define a specific HeaderMake the request accurately rout to different version applications to achieve gray release control of fine particles.

### Full link grayscale

The full link gray release covers all components and services in the entire system chain, ensuring that new versions of applications are progressively validated and deployed throughout the system.It can cut across front-end, backend, databases, etc. to ensure compatibility and stability of new versions with existing systems.Full link gray release ensures that new versions of applications operate seamlessly throughout the system links by gradually replacing and validating each component.Below is a map of the total gray scale：

<div align="center">
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/gray-release/gray-release.png" width="25%" height="25%" />
</div>

As shown in the graph above, there are `A->B->C->C->D->E` service components in an application where gray traffic enters from A, because only B and C have gray versions, the gray flow is routed in the grey versions of B and C, and for components D and E, because there are no gray versions, the gray flow is routed to the base version.This created two logically isolated traffic links.This would directly reduce the deployment of services and reduce the cost of deployment when there is a larger volume of microservices.And because of traffic isolation, new versions of risk and impact can be better controlled.

### Monitor and roll back

![gray-metrics](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/gray-release/gray-metrics.png)

Full link grayscale release provides monitoring and rollback features to ensure the stability and performance of new versions of applications during grey releases.You can monitor every stage of release in real time, including key indicators such as traffic distribution, response time, error rate, etc.If there is a problem, you can roll back to old versions in time to minimize potential effects.

- Real-time indicator monitoring：link grayscale release provides real-time monitoring to monitor performance indicators and performance status of new versions of applications during grayscale periods.These include key performance indicators such as response time, error rate, throughput.

- Critical indicators for visualization dashboard：are displayed via visualization dashboard, so that you can visualize performance trends and indicator changes in new versions of applications.In this way, you can quickly identify any anomalies or declines in performance and take timely measures to solve them.

- QuickRock：you can quickly cut traffic back to the old version of the app when you find a problem or unexpected situation.This would minimize the impact on users and business disruptions and ensure the stability of the system.

## Manual

### Environment preparation and configuration

The key to full link grayscale is the need for gray traffic labels to be permeated between multiple components, so that the passing of the label is not sensitive to the app and that the grayscale traffic is routed by tag.Your application needs to meet the following conditions in：

- The entrance component uses the Gateway API：Gateway API to solve the problem of progress portability and is gradually becoming the next generation traffic standard.The traffic rules that are currently published on the full link grayscale are also based on this.

- Supporting distributed links tracking：in distributed link tracking technology, traceID identifiers a full call chain, and each request on the link carries the corresponding traceID.It is on this basis that labels pass through them.

- Application enables Istio Governance Mode：Istio mainly provides the ability to manage gray traffic by route and between services.

### Create and manage release versions

Usually, in order to secure a reliable delivery, we will use the application template of Rainbrond to manage the entire version of the application. The application template in Rainbond will normally contain the following expert：

- Application identifier and name：provide an easily identifiable and managed name for the app template.The accumulation of digital assets in enterprises can be achieved.

- Version Metadata：contains information about each release of version, date of publication, author, change summary, etc.These metadata help track and identify key properties and historical information for each version.

- Version：contains mirrors for all components in the release version. These images, which are immutable basics, guarantee consistency of versions and avoid confusion.

Available from[应用模版持续交付](/docs/delivery/continuous/ram) to post new application templates.When the app has a new version, you can see an upgradable version in the `to-update` section of the app view.The next version will be published as a new version of grayscale

### Develop and configure Grayscale Publishing Policy

When new versions are available, we need to set up a grayscale release strategy for the app.This step is mainly to set the target and range of grey releases, to configure the rules and conditions of grey release to control distribution and upgrade of release versions in the grey environment, and to ensure that release versions are visible and accessible only to specified gray targets.Action steps below：

1. In the app view, click on the `grey` button on the left sidebar, you can go to the Grayscale Policy Settings page.

2. In the Grayscale Policy Settings page, first select an entry component, which is the source of grayscale traffic.Once you confirm the entry component and its corresponding traffic rules, you can choose to set one or more Header matching rules. The matching rules here will ensure that the gray traffic is routed only to the gray version.

3. After matching rule setup, you continue to set the release batch below, with the default final traffic ratio of 100%. You can set multiple batches and different traffic ratios in the middle.Please note that：, if a Header rule is set, will be routed to a new version with 100% of Header traffic. Only traffic without Header rules can be routed to a new version proportionally.

### Make Grayscale Publication

1. After the Grayscale policy has been set, we need to find upgradable versions in the `Pending Update` column of the application view. Click `Update`, when changing components will be rebuilt and entered in the grayscale state.

2. Once you confirm the `upgrade`, you will jump back to the app view at this point in the upper left corner, you can see the current traffic ratio and batch information, and check for more detailed monitoring reports.

3. When released in grayscale, we can try to request services according to previous matching rules, when grayscale traffic should be passed only in the grey environment, and only when a service does not have a gray version will request a default version.

### Monitor and analyze results

Monitoring and analysing the results of the release is a key element in ensuring the success of the entire chain grey distribution, and only analysis and comparison of the data collected during the release can identify potential problems and determine whether or not to continue or roll back.

1. After the app is already in grayscale, you can go to the Grayscale Policy Settings page again by clicking on the `Grey` button on the left sidebar.Default display of application gray status at this time, which contains graphs such as current batch, old and new version traffic ratio, request error, throughput, total number of requests, etc.

2. With this chart information, you can observe the grayscale status on a continuous basis. If there is no problem, try to increase the traffic ratio. Click `next batch` in the top right.

3. If an unexpected indicator is found, such as too high a request error rate and too slow response time, it can quickly return to the previous state at the top right by clicking `Roll back`.
