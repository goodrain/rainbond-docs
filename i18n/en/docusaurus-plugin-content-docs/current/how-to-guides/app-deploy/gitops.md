---
title: Achieving Continuous Deployment of Applications with GitOps
description: Through Rainbond's GitOps feature, achieve continuous deployment of applications, including code repository integration, automatic build configuration, and deployment process
keywords:
  - GitOps
  - Continuous Deployment
  - Automated Deployment
  - Webhook
  - CI/CD
---

GitOps is a continuous delivery method that uses Git repositories as the single source of truth for application configuration and deployment.This article details how to implement the GitOps continuous deployment process on the Rainbond platform, including code repository integration, automatic build configuration, and the complete deployment process.

Rainbond supports two GitOps continuous deployment methods:

1. Integrate Git repository via OAuth, create components based on source code by turning on the automatic build button, Rainbond will automatically configure WebHook in the corresponding repository.
2. Manually configure WebHook, set the WebHook address in the code repository, and configure trigger conditions.

## Preconditions

- Rainbond platform installed and configured
- Have administrator permissions for code repositories such as GitHub, GitLab, or Gitee
- Have team administrator or platform administrator permissions for the Rainbond platform
- Ensure network connectivity, code repositories and Rainbond platform can access each other

## 1. Integrate code repository and configure automatic build

Rainbond supports integration with various Git code repositories, achieving authorization and authentication through the OAuth protocol, currently supporting GitHub, GitLab, and Gitee code repositories.

<details>
<summary>Integrate GitHub</summary>
  <div>

**Create GitHub OAuth Apps**

1. Log in to GitHub account, go to **Settings -> Developer settings -> OAuth Apps -> New OAuth App**
2. Fill in the following information:
  - **Application name**: Custom application name, such as "Rainbond GitOps"
  - **Homepage URL**: Rainbond access address, such as `https://rainbond.com`
  - **Authorization callback URL**: Callback address, format as `{Rainbond address}/console/oauth/redirect`, such as `https://rainbond.com/console/oauth/redirect`
3. Click **Register application** to complete creation
4. After creation, record the generated **Client ID** and **Client Secret**

**Configure OAuth in Rainbond**

1. Log in to Rainbond platform,
  - Global configuration: go to **Platform Management -> Settings -> Basic Settings -> OAuth Third-party Service Integration -> Add**
  - Personal configuration: go to **Personal Center -> Git Private Repository -> Add**
2. Fill in the following information:
  - **OAuth Type**: Select github
  - **Name**: Custom name, such as "GitHub"
  - **Client ID**: Fill in the Client ID from GitHub OAuth Apps
  - **Client Secret**: Fill in the Client Secret from GitHub OAuth Apps
  - **Callback Address**: Default is the current Rainbond access address
3. Click **Confirm** to complete configuration

  </div>
</details>

<details>
<summary>Integrate GitLab</summary>
  <div>

**Create GitLab Applications**

1. Log in to GitLab account, go to **User Settings -> Applications**
2. Fill in the following information:
  - **Name**: Custom name, such as "Rainbond GitOps"
  - **Redirect URL**: Callback address, format as `{Rainbond address}/console/oauth/redirect`, such as `https://rainbond.com/console/oauth/redirect`
  - **Scopes**: Check `api` `read_user` `read_repository`
3. Click **Save application** to complete creation
4. Record the generated **Application ID** and **Secret**

> **Note**: If using GitLab 10.6 or above, you need to allow sending Webhook requests to the local network.Go to **Admin area -> settings -> OutBound Request**, check `Allow requests to the local network from hooks and services`.

**Configure OAuth in Rainbond**

1. Log in to Rainbond platform,
  - Global configuration: go to **Platform Management -> Settings -> Basic Settings -> OAuth Third-party Service Integration -> Add**
  - Personal configuration: go to **Personal Center -> Git Private Repository -> Add**
2. Fill in the following information:
  - **OAuth Type**: Select gitlab
  - **Name**: Custom name, such as "GitLab"
  - **Service Address**: GitLab access address, such as `https://gitlab.example.com`
  - **Client ID**: Fill in the Application ID from GitLab Applications
  - **Client Secret**: Fill in the Secret from GitLab Applications
  - **Callback Address**: Default is the current Rainbond access address
3. Click **Confirm** to complete configuration

  </div>
</details>

<details>
<summary>Integrate Gitee</summary>
  <div>

**Create Gitee Third-party Application**

1. Log in to Gitee account, go to **Settings -> Third-party Applications -> Create Application**
2. Fill in the following information:
  - **Application Name**: Custom name, such as "Rainbond GitOps"
  - **Application Homepage**: Rainbond access address, such as `https://rainbond.com`
  - **Application Callback Address**: Callback address, format as `{Rainbond address}/console/oauth/redirect`, such as `https://rainbond.com/console/oauth/redirect`
  - **Permissions**: Check `user_info` `projects` `hook`
3. Click **Create Application** to complete the creation
4. Record the generated **Client ID** and **Client Secret**

**Configure OAuth in Rainbond**

1. Log in to the Rainbond platform,
  - Global configuration: Go to **Platform Management -> Settings -> Basic Settings -> OAuth Third-party Service Integration -> Add**
  - Personal configuration: Go to **Personal Center -> Git Private Repository -> Add**
2. Fill in the following information:
  - **OAuth Type**: Select gitee
  - **Name**: Custom name, such as "Gitee"
  - **Service Address**: Fill in `https://gitee.com`
  - **Client ID**: Fill in the Client ID from the Gitee third-party application
  - **Client Secret**: Fill in the Client Secret from the Gitee third-party application
  - **Callback Address**: Default is the current Rainbond access address
3. Click **Confirm** to complete the configuration

  </div>
</details>

### OAuth account authentication

After completing the OAuth configuration, account authentication is required to connect with the third-party platform:

1. Click the user avatar in the upper right corner of the Rainbond page
2. Select **Personal Center -> OAuth Account Binding**
3. On the corresponding code repository platform (GitHub/GitLab/Gitee), click **Go to Authentication**
4. Follow the page instructions to complete the authorization authentication process

### Create an application based on the source code repository and configure automatic deployment

- After completing the code repository connection, you can create an application based on the source code and configure automatic deployment.

1. Enter the Rainbond team view, click **Add -> Create Component Based on Source Code**
2. Select the connected code repository (GitHub/GitLab/Gitee)
3. Browse and select the code project to be deployed
4. Fill in basic information such as component name, application name
5. Turn on the **Auto Build** switch.
6. Click **Create Component** to start building

- After the component is created, you can configure automatic builds to achieve automatic deployment after code submission:

1. Enter the component details page, click **Build Source**
2. Set a trigger keyword, such as `@deploy` (can be customized)

> **Note**: The trigger keyword is a specific string included in the Git commit information. Only when the submission information contains this keyword will the automatic build be triggered.

## Manually configure Webhook to achieve automatic build

### Enable Rainbond Git Webhook

Enable component Git Webhook In **Component -> Build Source**, turn on the Git-Webhook auto-build function, and copy the generated hook address.

### Configure Git repository Webhooks

<details>
<summary>GitHub Configuration</summary>

Enter the GitHub project, **Settings -> Webhooks -> Add webhooks**

- Payload URL: Copy the Webhook address in Rainbond
- Content type: `application/json`
- Just the push event: Select `push` trigger event
- Active: Check `Active`

</details>

<details>
<summary>GitLab Configuration</summary>

Enter the GitLab project, **Settings -> Integrations -> Add webhooks**

- URL: Copy the Webhook address in Rainbond
- Trigger: Check **Push events**

</details>

The configuration methods for other code repositories are similar. It should be noted that Rainbond hook triggering currently does not support secure request verification.

## GitOps Continuous Deployment Practice

### 3.1 Complete GitOps Workflow

A complete GitOps workflow includes the following steps:

1. Developers modify code in the local development environment
2. Submit code to the Git repository, including the trigger keyword (such as `@deploy`) in the commit information
3. The Git repository notifies the Rainbond platform via Webhook
4. Rainbond detects that the submission information contains the trigger keyword and automatically pulls the latest code
5. Rainbond automatically builds and deploys the application
6. Application update completed, developers can immediately see the latest changes

### 3.2 Best Practices

It is recommended to configure different branches and automatic build strategies for different environments:

- **Development Environment**: Configure automatic builds for the `develop` branch, which can use more relaxed trigger conditions
- **Test Environment**: Configure automatic builds for the `test` or `staging` branch, using explicit trigger keywords
- **Production Environment**: Configure automatic builds for the `master` or `main` branch, it is recommended to add manual review steps

## common problem

### Webhook did not trigger automatic build

**Possible reasons**:

- The commit information does not contain the trigger keyword
- Webhook configuration is incorrect or the URL is wrong
- Network connection issues caused the Webhook request not to reach Rainbond
- GitLab version is higher and does not allow local network Webhook requests

**Solution**:

1. Check if the commit information contains the correct trigger keyword
2. Check the delivery status of the Webhook on the Webhook configuration page of the code repository
3. For privately deployed GitLab, check if the option "Allow sending Webhook requests to the local network" is enabled

