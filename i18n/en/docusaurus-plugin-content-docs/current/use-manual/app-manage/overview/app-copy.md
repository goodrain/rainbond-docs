---
title: Apply Quick Copy
describe: This article introduces the rapid construction of multiple development environments through the application copy function to improve the efficiency of developers in building development environments
---

## Quickly build a development environment through application replication

During the application development process, the same business system developer may need to build the development environment several times.For example, the following cases：

- Multiple new functions are iterated simultaneously in different branches, so different branch codes need to be deployed independently;
- Multiple developers in the team develop, and each developer needs its own independent development environment;
- The development environment application development is completed, and it is hoped to quickly deploy to the test environment or pre-release environment;
- The production environment is released in grayscale, and it is hoped that the specified components can be quickly deployed using the specified source code version;

In the above situation, if the application has only one component, it may not be complicated to create it from scratch.And if the application includes 5 or more components, the creation process will be time-consuming and repetitive.At this time, direct replication based on the deployed application can effectively solve the efficiency problem.

## Preconditions

1. Prepare a deployed application, which can include multiple components created from source code and images.
2. Prepare at least two teams to verify replication across teams.
3. The source code corresponding to the component can be prepared with multiple branches or the mirror image can be prepared with multiple tags, and it is convenient to modify the build source version when verifying and copying.

## Operating procedures

1. Go to _Application View/Overview Topology_ page, and click the _Quick Copy_ button in the upper right corner;
2. The upper area of the pop-up window displays the copied target application. The default is the current application. You can select a different team or application according to your needs, or you can directly create a new application in the specified team.
3. The lower area of the pop-up window displays all the component information of the current application and its build source information. All components are selected for copying by default, and some components can be selected as needed.And you can change the build source version of the component as needed, such as the code branch or the tag of the mirror.
4. Click OK to start copying. After copying, build and start all copied components by yourself, and the page jumps to the target application.

## understand the principle

- The key manifestation of the application model

By default in Rainbond, various types of software are abstractly managed based on the application model. Therefore, replication is actually the replication of model attributes, which can ensure that the copied components are consistent with the attributes of the source components.This once again shows that the process of deploying components in Rainbond is actually the process of assembling the application model. Once the deployment is completed, the definition of the business model is completed.

- Handling of dependencies when components are copied

There are currently two properties associated between components, including component dependencies and storage dependencies.When copying a component, there are two cases, both the component and the dependent component are copied together and only the relying party is copied.If both sides are replicated at the same time, then the dependencies between them will be maintained, established between the new component sides, whether replicated across teams or not.If only the relying party is replicated, there are two processing modes.If the copied target application is under the current team, the copied new component still depends on the component that the source depends on. If the copied target application is not in the current team, the dependency will be removed during copying.

## Reference video

Application replication and flow control demo: https://www.bilibili.com/video/BV1da4y1i7tQ/

## common problem

- The difference between copying the application and publishing it to the component library and then installing it

> Application replication is the replication of the attributes of the current application model. Versioning is not emphasized, and application template packaging is not performed.It is more flexible to use and is suitable for development scenarios or testing and production delivery scenarios of the same development team.The process of publishing to the component library is the process of versioning the application model.The build source information of an application installed based on the component library template is the component library template, so continuous version upgrades can be performed based on the component library template.This mode is suitable for decoupling application developers and users, and applications are delivered in multi-party and multi-environment scenarios.

- Difference Between Application Replication and Application Backup Migration

> Application replication is the replication of application model properties, so it does not carry any persistent data and component historical version data.Application backup migration is a process for migrating applications in production running state with all the data generated by running.

## More usage scenarios

- Quick problem location and resolution for production environment components

  > There is a problem with a component in the production environment, but it cannot be directly upgraded for the time being. We may need to modify some code to quickly verify whether it is effective.In this case, you can directly copy the problem component in the application and use the modified code version.Then modify the gateway policy to switch some traffic (such as splitting some traffic by request path) to the new component to verify whether the problem is solved.In this way, the production components are not affected and the problem can be solved quickly.
