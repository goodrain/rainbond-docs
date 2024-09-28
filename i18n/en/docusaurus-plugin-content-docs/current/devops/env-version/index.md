---
title: Environment and version management
describe: This paper introduces how to quickly build multiple development environments through application replication function to improve the efficiency of developers to build development environments
---

Import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=6" />

## Develop, test environmental management

The same business system developer may need to build up the development environment several times during the application development.Something like：

- Multiple new features iterate in different branches, so different branches need to be deployed independently;
- Development by multiple developers in the team, each of which needs its own set of separate development settings;
- Development of environmental applications has been completed in the hope of rapid deployment to test or pre-release settings;
- Production environment grey releases, it is hoped that the specific component will be rapidly deployed using the specified source code version;

In the above case, if the app has only one component, it may not be complex to create from scratch.If the app includes 5 or more components, the creation process will take a lot of time and is doing a repetition.Direct replication at this time based on already deployed applications would effectively address efficiency problems.

### Prerequisite

1. Prepare a deployed app that can include multiple components created using source code, mirror.
2. Ready for at least two teams to validate cross-team app copying.
3. Component source code can be used to prepare multiple branches or mirrors to prepare multiple Tags and easily modify build source versions when validating copying.

### Operating processes

1. Go to the **App View -> General Preview Topic** page, click on the **Quick Copy** button above the right;
2. Show copied target apps in the top of the popup, default is the current app, can select different teams or apps depending on need, or can create new apps directly within the given team.
3. The area below the popup shows all component information from the current app and the source of its build. By default, all components are selected to be copied. Parts can be selected as needed.And the build source version of the component can be changed as necessary, such as the branch of the code or the Tag.
4. Click OK to start copying, build yourself and start all copied components when copied, and jump to target app.

### Learn about Principles

**Application Model Key Demonstration**

By default in Rainbond management of various types of software based on application models, replication is a reproduction of model properties that ensures consistency between copied components and source component attributes.This illustrates once again that the process of deploying components in Rainbond is in fact the process of assembling the application models and completing the definition of the business model once the deployment is complete.

**Relative Handling when component copy**

There are currently two properties that are relevant between components, including component dependencies and storage dependencies.There are two situations in which the component will be copied. Both components and dependent components will be copied together and only the relying parties will be copied.If both are replicated simultaneously, their dependency will be maintained and established between the new components, regardless of cross-team replication.If only the relying party is copied, two treatment patterns will emerge.Duplicated target apps are under the current team and the copied new component still depends on the source dependent component. If the copied target app is not on the current team, the dependency will be dissolved when copied.

## Version Management Officer

Each build of the component builds the component version number based on the time of the task and, in the case of a component created by the source code, each version records the corresponding source code to submit Commit information to facilitate developer checking the code. Displays currently running version information on the component overview page. Click on the release of the version information to enter the component version list query page.Rainbond is reserved by default for 30 days and history versions are automatically cleaned up.

Component versions mainly include mirror versions, which are not currently supported by component properties.

### Component Version Rock

Enter the **Component General View -> Click to View More -> Enter Build History**.

- Edit：tag version
- Log：to view build version logs
- Rollback：to which version to roll back
- Deleting：deleting this version cannot be undone.

![](https://static.goodrain.com/docs/5.6/use-manual/component-management/overview/rollback.png)
