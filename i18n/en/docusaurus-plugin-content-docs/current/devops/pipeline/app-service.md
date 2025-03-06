---
title: Application service
description: Introduction to Pipeline App Service
keywords:
  - Introduction to Pipeline App Service
  - Intro GitLab Pipeline Plugins in Apps Service
---

Application services are a collection of code that meets some user's needs. They can be a coupling microservice or a single app. All features are built around the application service.

## Prerequisite

- Install Pipeline App Plugin
- Available GitLab repository
- Available Pipeline

## Action step

### Create App Service

Go to the Rainbond console and select **Application Services** in the left menu bar. Click **Create App Service**.

- **Service code:** Unique code for the service for the English name of the component of Rainbond
- **Service Name:** Service name
- **Multi-Template:** Used to define Maven Multimodule Builds
  - **Subservice Encoding:** The unique code for the sub service is used for the English name of the Rainbond component.
- **Fluid routes:** Select the pipeline associated with the application service.
- **Repository configuration:** Fill in code repository address and only supports GitLab repository.e.g.：`https://gitlab.rainbond.com/rainbond/rainbond.git`
- **Authentication Configuration:** Select the authentication configuration for the GitLab repository.Optional: User password authentication, SSH key authentication.

### Auto build and deploy

Edit the app service. Click on **Auto-build and AutoDeployment**.

#### Auto-build

Turn on if you want to automatically trigger CI every time you submit the code

#### Auto Deploy

When enabled, mean that each time a mirror is generated, automatically triggers a CD.For the first time, a manual deployment is required to enable automatic deployment.