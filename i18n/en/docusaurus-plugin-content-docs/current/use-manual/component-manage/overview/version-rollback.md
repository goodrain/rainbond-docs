---
title: Component version rollback
description: Component version rollback
---

## Version management​

Each build of a component will generate a component version number according to the time when the task is performed. If it is a component created from source code, each version records the corresponding source code submission Commit information, which is convenient for developers to check the code accordingly. The currently running version information is displayed on the component overview page, and you can enter the component version list query page by clicking the entry of version information delivery.Rainbond keeps version records within 30 days by default, and historical versions are automatically cleaned up.

The component version mainly includes the running image version. Currently, the component properties do not support version control.

## version rollback

Go to the component overview page -> click to see more versions -> go to the build version history.

* Edit：to tag the version

* log：to view the build version log

* Rollback：Choose which version to roll back to
* Delete：to delete this version record, which cannot be recovered after deletion.

![](https://static.goodrain.com/docs/5.6/use-manual/component-manage/overview/rollback.png)
