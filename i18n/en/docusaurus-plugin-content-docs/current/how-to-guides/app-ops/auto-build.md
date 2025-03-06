---
title: Auto Deploy
description: This topic describes the Rainbond automatic deployment component
keywords:
  - Auto Deploy
  - Rainbond Auto-Deploy
---

Automatically build and deploy modern code or mirror to automatically trigger the building and deployment, and Rainbond offers three ways of triggering the automatic deployment of components based on repository Webhooks, mirror repositories Webhooks, and custom API.Automatically build features that can help developers achieve agile development.

## Prerequisite

- The component is created by the source code and supports the repository Webhooks. The currently supported repository is `GitHub` `Gite`.
- Components are created by mirrors. They support webhooks. Currently they support the Docker official repository, Aliyun mirror repository.

## Mirror repository operation process

Mirror Repository Autobuild enables automatic build after push mirrors, easy to connect to third party automation.Trigger auto build when mirror updates arrive.

- The app was created by a mirror, the repository was `Docker Hub`, version 5.1.2 and later supported the Aliyun mirror repository.

- Whether the default updated mirror name and tag match the current component build source image name (no mirror repository domain name is included when judged), version 5.1.3 and later supports configuration of Tag triggering regular policy, dynamic matching and changing the component image Tag.

### Enable Rainbond Mirror Webhook

Enable automatic build of the mirror repository Webhook, **Component -> Build Source -> Enable AutoBuild**.

**Tag triggers auto modification**

The mirror name and Tag of the Webhook update event by default must match the mirror name and Tag configuration of the component build source to trigger building and deployment.Once the Tag trigger policy has been configured, according to the configured regular expression, this update is valid if the image tag of the received push event can match the regular expression correctly, based on updated Tag information to upgrade the build source of the current component and build automatically.

For example, setting up Tag policies for： `v5.*` when a tag is `v5.1` `v5.2` `v5.9` etc. will be allowed.

### Configure DockerHub Mirror Repository

Go to DockerHub repository -> Webhooks

| New Webhook  | Note                               |
| ------------ | ---------------------------------- |
| Webhook name | Custom                             |
| Webhook URL  | Copy Webhook address from Rainbond |

## API triggers auto-build

Use the API to automatically build back URL,POST method to call the API, use the secret keys to trigger the API auto-build. Key can be customized.

Go to **Component -> Building Source -> Enable Auto-Build -> Custom API**.

**API usage below：**

```bash
curl -d {"secret_key":"<Secret >"}' -H "Content-type: application/json" -X POST <API地址>
```

Automatically build based on the API trigger is one of the most flexible ways to integrate with the third party CI system.