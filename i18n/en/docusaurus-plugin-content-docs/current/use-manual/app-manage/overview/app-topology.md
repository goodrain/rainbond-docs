---
title: Application topology
description: Show the network relationships, business relationships, and business logic of all components of the application
---

## Display Mode

The topography shows the real time state of all service components of the app in a graphical way. It will display the following dimensions of：

- Component Web Topics

It is clear in the graph that shows the direct network call relationships of the component and public network openness, and that combined traffic status allows communication to be found easily.

- Component Overall Business Dependencies

The connection between the components in the graph represents the component business dependence, allowing users to see the business relationships of the complex operations system at once.

- Component Traffic Tracking Status

Each line in the sketch will show the throughput and response time of each communication link when the performance analysis plugin is enabled. In the future, error rates and distributional tracking will be displayed in the link

- Component Status

Component shows component status in color, for the following：

| Colors     | Not constructed/not started |
| ---------- | --------------------------- |
| Black/Grey | Not constructed/not started |
| Green      | Running                     |
| LightGreen | Upgrading                   |
| Red        | Closed                      |

> If the sixth party of the component appears to be an overlay state, it indicates that the current component is running multiple instances.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-topology/Multiple%20instances.png)

## Edit mode

Edit topography currently support: service component connection is creating or undependent, opening or closing service component external port

- Delete Action

Press `delete` on the connection line to quickly remove component dependencies, close all external ports of the service component

- Add Action

Tap to drag the focus to the end to create dependencies between the two components or open extranet access.

## Aggregate Mode

In actual business use, components under an app tend to rely on components under other apps when the user sees large and more confused information that does not allow quick identification of apps belonging to other components.At this time, there is a lack of clarity as to the dependencies of multiple applications.In order to solve this problem, we have added a new pattern of topographic aggregation.In this case, a clearer display of dependency between multiple applications can be made.

In normal mode, it can be seen that the app relies on multiple components, but we are not clear about the relationship between these components.

![img](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/community/change/topology-normal.png)

We switch to the polymer mode and see that the relationship between components and other applications is clear.

![img](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/community/change-polymerization.png)

Tap Gitlab to map the app. We can know the state of the application and the component information on which it depends.

![img](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/community/change-polymerization.png)

## Popup component actions

A user can cluster a component by clicking on the component and by visiting components, entering the Web Terminal, updating the component, closing the component, and deleting the component.The user can quickly operate the component based on these buttons, while the container information is displayed below.

![img](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/community/change/topology-detail.png)
