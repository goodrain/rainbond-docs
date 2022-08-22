---
title: "Team overview"
description: Introducing the Team View Overview page
---

The team view clearly shows the application information owned by the current team. Through the team view, you can quickly enter the application management interface, and perform operations such as`build, delete, add`, etc. for in-app components.

## Overview view

![](https://static.goodrain.com/docs/5.6/use-manual/team-manage/overview/team-overview.png)

| Show items                                                            | explain                                                                                                                                                                    |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Number of applications                                                | Number of apps owned by the current team (running/not running)                                                                                                             |
| number of components                                                  | The number of in-app components under the current team, including third-party components (running/not running)                                                             |
| use resources                                                         | The size of the memory used by all application components under the current team to run / the size of the amount of persistent data using local storage and shared storage |
| amount of users                                                       | The number of users under the current team                                                                                                                                 |
| Application List                                                      | Display all the applications of the current team, display 12 applications on one page, and paginate if there are more                                                      |
| [App quick access](#应用快速访问)                                           | This button provides quick access to the application domain name                                                                                                           |
| [New application](/docs/use-manual/team-manage/app-manage/app-create) | Create a new application in the current team overview view                                                                                                                 |
## App quick access

When a component in the application has external access enabled, you can directly access the application on the team overview page.

<img src="https://static.goodrain.com/docs/5.6/use-manual/team-manage/overview/visit.png" width="60%" />

:::tip

When there are multiple components in the application that enable external access, the access is based on the first one in the gateway policy.

:::
