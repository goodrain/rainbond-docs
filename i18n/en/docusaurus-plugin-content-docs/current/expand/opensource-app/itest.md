---
title: ITest Work (test tool)
description: This article introduces the open source application ITest Work
weight: 7001
---

### 1. Introduction to ITest Work

[ITest Work](http://www.itest.work/) (Love Test) One-stop workstation makes testing simple and agile. "Easy to use, good-looking, and agile" is the goal pursued by ITest Work.ITest Work includes minimal task management, test management, defect management, test environment management, interface testing, interface Mock 6-in-1, and rich statistical analysis.Test case execution can be allocated according to test packages, and test iterations (including tasks, test packages, bugs, and interfaces) can be built to organize testing work, test environment management, and common test metrics; for frequent releases, the requirements are often Change, ITest can also export use cases, modify and execute offline, and then import (synchronize) online after adding; and can set the test process according to the test strategy, and can adjust it in real time; in the test board, you can view the iteration report , test the execution of the package, test the progress of the task, you can also directly execute the use case with the package on the Kanban board, and also support the online web mind map to write the use case.

### 2. Quickly install ITest Work through the Rainbond app store

* Search for `itest`in the open source app store and click install

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/opensource-app/itest/itest-install.png)

* After the application is installed, there are two service access addresses, among which`itest`component is the main service,`jmeter`is a sub-service, you need to configure the`jmeter`service access address in the application configuration group.
* Enter the installation`ITest Work`application, click the configuration on the left to enter the application configuration group, find the configuration group named`dbconnection` , edit and modify the`JMETER_URL` value to the URL of the `jmeter` service, save and update.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/opensource-app/itest/itest-config.png)

* After the app is installed successfully, the default account password is：
  * Account：admin
  * password：admin


