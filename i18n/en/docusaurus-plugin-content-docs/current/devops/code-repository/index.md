---
title: Git Repositories
description: Rainbond interconnects with Git code repositories
keywords:
  - Git Repositories
  - Rainbond Git Repositories
---

Import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=3" />

Rainbond supports Git Code Repository, creating components directly from source repository.

Currently Rainbond supports `GitHub Gitee` of three Oauth types that support Git repository pairs.Rainbond all supported OAuth types require normal configuration permission to work, such as `GitHub GitLab Gitee` requires permission to fetch the repository list.

## GitHub

### Create GitHub OAuth Apps

Go to **Settings -> Developer Settings -> OAuth Apps -> New OAuth App**

|                            | Note                                                                                                                                                                    |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Application name           | Custom App Name                                                                                                                                                         |
| Homepage URL               | Visit the url of Rainbond, such as `https://rainbond.com`                                                                                                               |
| Authorization callback URL | Go back to path to receive return vouchers, Homepage URLs + /console/oauth/redirect, e.g.：`https://rainbond.com/console/oauth/redirect` |

### Create Rainbond OAuth

Go to **Platform Manager -> Settings -> Basic Settings -> OAuth Third-Party Service Integration -> Add**

|                  | Note                                       |
| ---------------- | ------------------------------------------ |
| OAuth Type       | github                                     |
| Name             | Custom                                     |
| Client ID        | GitHub OAuth Apps Client ID                |
| Client Key       | GitHub OAuth Apps Client Secret            |
| Callback Address | Default is current Rainbond access address |

## GitLab

### Create GitLab Applications

Enter **User Settings -> Applications**

|              | Note                                                                                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name         | Custom                                                                                                                                                                  |
| Redirect URL | Go back to path to receive return vouchers, Homepage URLs + /console/oauth/redirect, e.g.：`https://rainbond.com/console/oauth/redirect` |
| Scopes       | Check the `read_user` to `read_repository`                                                                                                                              |

### Create Rainbond OAuth

Go to **Platform Manager -> Settings -> Basic Settings -> OAuth Third-Party Service Integration -> Add**

|                  | Note                                       |
| ---------------- | ------------------------------------------ |
| OAuth Type       | gitlab                                     |
| Name             | Custom                                     |
| Service address  | GitLab Access Address                      |
| Client ID        | GitLab Applications Client ID              |
| Client Key       | GitLab Applications Client Secret          |
| Callback Address | Default is current Rainbond access address |

## Gitee

### Create a Gitee 3rd party app

Go to **Settings -> Third-Party Apps -> Create App**

|                        | Note                                                                                                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App name               | Custom                                                                                                                                                                  |
| App Homepage           | Rainbond visited addresses, such as `https://rainbond.com`                                                                                                              |
| Apply callback address | Go back to path to receive return vouchers, Homepage URLs + /console/oauth/redirect, e.g.：`https://rainbond.com/console/oauth/redirect` |
| Permissions            | Check `user_info` for `projects` `hook`                                                                                                                                 |

### Create Rainbond OAuth

Go to **Platform Manager -> Settings -> Basic Settings -> OAuth Third-Party Service Integration -> Add**

|                  | Note                                       |
| ---------------- | ------------------------------------------ |
| OAuth Type       | gitee                                      |
| Name             | Custom                                     |
| Service address  | Gitee Access Address                       |
| Client ID        | Gitee Client ID                            |
| Client Key       | Gitee Client Secret                        |
| Callback Address | Default is current Rainbond access address |

## OAuth Service Authentication

The OAuth service can be authenticated to the OAuth service in user information from the top right corner of Rainbond after configuring the OAuth service, interacting with third-party platforms.

Rainbond Top Right **Personal Center -> OAuth Account Bind -> To Verify**.

## Create components via Git repository

When configured and authenticated with OAuth services, components can be created directly through items in the repository of code.

Enter **Team View -> Create a Source Based -> Select Repository -> Create Component Based on Project**.

:::tip

GitLab 10.6 is not allowed to send Webhook requests to local networks for security purposes later.

Resolve：to enter **Admin area -> settings -> OutBound Request** by clicking `Allow requests to the local network from hooks and services`

Supported api version：

- Github currently supported version of `api` is `v3`
- Gitlab currently supported version of `api` is `v4`
- Gitee's currently supported version of `api` is `v5`

:::
