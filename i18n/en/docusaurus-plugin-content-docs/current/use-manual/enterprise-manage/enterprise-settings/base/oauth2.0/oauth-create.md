---
title: Building components through the OAuth2.0 protocol
description: Code warehouse secret-free build components, automatically set webhook
---

### Connect with the code repository through the OAuth2.0 protocol

> After successfully authenticating the code repository (Github, Gitlab, Gitee) OAuth service, we can pull the project list through the OAuth protocol

Enter the console -->create an application -->create a source code -->select an authenticated code repository

#### build components

1.  On the list page, we can search by project name and quickly locate the project that needs to be built
2.  You can click the name of the project to connect to the project in the warehouse to view the project details
3.  Before creating a project, we can click Detect Language to check whether the language of the project to be built is supported
4.  After clicking build, we can select the branch or tag to build in the project version to build.
5.  Check the automatic build, the webhook will be created automatically

#### Component replacement

For components created by oauth, we can replace the specified version of the specified project of the specified repository at the build source to build

> For details on building components, see [Application and Component Creation](/docs/use-manual/component-create/creation-process)
