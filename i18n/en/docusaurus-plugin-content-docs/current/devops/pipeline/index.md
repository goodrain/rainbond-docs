---
title: Pipeline Plug-in overview
description: Pipeline Plug-in overview
keywords:
  - Overview of GitLab Pipeline plugin
  - GitLab Pipeline Plugin
  - GitLab Pipeline Plugins
---

Pipeline app is based on [插件体系](#) extension, which enables extension of the Rainbond build system by plugin:

- Build , define build step
- Code check, based on SonarQube code check
- Generate mirror products, push built mirrors to mirror repositories
- Deploy apps, integrate with Rainbond OpenAPI to deploy the app
- Autobuild/deployed, built on Git Repository Webhook

## Concept

Pipeline Application Plugin is based on GitLab CI/CD implementation, all features are extended around GitLab and GitLab Runner and below is a description of some concepts：

### App services

Application services are a collection of programming codes that meet certain users' needs and can be a coupling microservice or a single application. The application service is the smallest entity in the system and the integration, deployment and other features in the plugin are based on the application service.

### Code management

Support for GitLab Repository branch view and persistent collection success.

- Code branch management, support manual branch building
- Continuous Integration, support to view the status of continuous integration and steps

### Mirror Repository

The mirror repository shows the mirror products generated after the application service is built, which can be deployed directly to the Rainbow platform.

Each mirror version supports direct deployment to Rainbond applications and follows up on sustainable deployment.

### Deployment History

Deployment history shows the history of deployment of the application service, including information on mirror names, deployment time, operator, deployment details, etc.

Deploying details can be accessed to the Rainbond component details page to see details of the deployed application services.

### Waterline management

Fluid is a tool to provide customized process organization that allows businesses to easily achieve continued delivery by linking development to delivery through constructing, deploying, testing, control and so on.

Based on GitLab CI implementation, multiple plug templates are available to quickly create streaming lines.

## Workflow Introduction

![](https://static.goodrain.com/docs/5.11/devops/pipeine/pipeline.png)

1. Create an app service, fill in code repository addresses and other information.

1.1 There is also a need to create a watercourse and to link the application service.

2. Once you have created the app service, you will create the `gitlab-ci.yml` file based on the flow line that the app is connected and push it to all branches of the repository

3. Submit code to the repository and trigger the flow line of GitLab CI.

4. The task in the pipeline is performed by Runner.

5. When the task is completed, push the mirror product to the mirror warehouse.

6. When the mirror product is pushed out, deploy the mirror to the Rainbond application.It can be deployed manually or automatically.