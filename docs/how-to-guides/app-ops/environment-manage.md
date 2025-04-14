---
title: Environment and Version Management
describe: This article introduces how to quickly set up multiple development environments through the application replication function, improving the efficiency of developers in setting up development environments
---

## Development and Testing Environment Management

During the application development process, developers of the same business system may need to repeatedly set up the development environment multiple times.For example, the following situations:

- Multiple new features are being iterated on different branches simultaneously, then different branch codes need to be deployed independently;
- Multiple developers in the team are developing, each developer needs their own independent set of development environment;
- After the development environment application development is completed, it is hoped to quickly deploy to the testing environment or pre-release environment;
- Gray release in the production environment, hoping to quickly deploy specified components using specified source code versions;

Faced with the above situations, if the application has only one component, perhaps starting from scratch is not complicated.But what if the application includes 5 or even more components? The creation process will consume a lot of time and is doing repetitive things.At this time, directly copying based on the already deployed application can effectively solve the efficiency problem.

### Preconditions

1. Prepare a deployed application, which can include multiple components created using source code and images.
2. Prepare at least two teams to verify cross-team application replication.
3. Prepare multiple branches for the source code corresponding to the components or multiple Tags for the images to conveniently modify the build source version during replication.

### Operation Process

1. Enter **Application View -> Overview Topology** page, click the **Quick Copy** button in the upper right corner;
2. The upper area of the pop-up window shows the target application for copying, which is the current application by default. You can choose different teams or applications according to your needs, or directly create a new application in the specified team.
3. The lower area of the pop-up window shows all component information and their build source information of the current application. All components are selected for copying by default, and you can choose part of the components as needed.And you can change the build source version of the components as needed, such as the code branch or the Tag of the image.
4. Click OK to start copying. After copying is completed, all copied components will be built and started by themselves, and the page will jump to the target application.

### Understanding the Principle

**Key Manifestation of Application Model**

In Rainbond, the default is based on the application model to abstractly manage various types of software. Therefore, copying is actually the copying of model attributes, which can ensure that the copied components are consistent with the source component attributes.This once again illustrates that in Rainbond, the process of deploying components is actually the process of assembling the application model. Once the deployment is completed, the definition of the business model is completed.

**Handling of Dependency Relationships During Component Copying**

Currently, there are two attributes between components that are related, including component dependencies and storage dependencies.When copying components, there will be two situations: both the component and the dependent component are copied together and only the dependent party is copied.If both are copied at the same time, then their dependency relationship will be maintained, established between the new component parties, regardless of whether it is cross-team copying.If only the dependent party is copied, there will be two processing modes.If the target application for copying is under the current team, then the newly copied component will still depend on the source dependent component. If the target application for copying is not in the current team, then the dependency relationship will be released during copying.

## Version Management

Each build of the component will generate a component version number based on the time when the task is performed. If the component is created by source code, each version record corresponds to the source code submission Commit information, which is convenient for developers to check the code. The current running version information is displayed on the component overview page. Click the entry below the version information to enter the component version list query page.Rainbond retains version records within 30 days by default, and historical versions are automatically cleaned up.

Component versions mainly include running image versions. Currently, component attributes do not support version control.

### Component Version Rollback

Enter **Component Overview Page -> Click to View More Versions -> Enter Build Version History**.

- Edit: Tag the version
- Log: View the logs of the built versions
- Rollback: Choose which version to roll back to
- Delete: Delete this version record, it cannot be recovered after deletion.

![](https://static.goodrain.com/docs/5.6/use-manual/component-manage/overview/rollback.png)
