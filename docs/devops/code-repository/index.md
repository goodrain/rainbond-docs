---
title: Git 仓库对接
description: Rainbond 对接 Git 代码仓库
keywords:
- Git 仓库对接
- Rainbond Git 仓库对接
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=3" />

Rainbond 支持对接 Git 代码仓库，从源代码仓库直接创建组件。

目前 Rainbond 支持 `GitHub GitLab Gitee` 三种支持 Git 仓库对接的 Oauth 类型。Rainbond 所有支持的 OAuth 类型需要正常配置权限才能正常使用，比如 `Github GitLab Gitee` 需要授予获取代码仓库列表等权限。



## 对接 GitHub 

### 创建 GitHub OAuth Apps

进入 **Settings -> Developer settings -> OAuth Apps -> New OAuth App**

|                            | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| Application name           | 自定义应用名称                                               |
| Homepage URL               | 访问 Rainbond 的URL，如 `https://rainbond.com`               |
| Authorization callback URL | 回跳路径，用于接收返回的凭证，Homepage URL + /console/oauth/redirect，如：`https://rainbond.com/console/oauth/redirect` |

### 创建 Rainbond OAuth

进入 **平台管理 -> 设置 -> 基础设置 -> OAuth 第三方服务集成 -> 添加**

|            | 说明                            |
| ---------- | ------------------------------- |
| OAuth 类型 | github                          |
| 名称       | 自定义                          |
| 客户端 ID  | GitHub OAuth Apps Client ID     |
| 客户端密钥 | GitHub OAuth Apps Client Secret |
| 回调地址   | 默认为当前 Rainbond 访问地址    |



## 对接 GitLab

### 创建 GitLab Applications

进入 **User Settings -> Applications**

|              | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| Name         | 自定义                                                       |
| Redirect URL | 回跳路径，用于接收返回的凭证，Homepage URL + /console/oauth/redirect，如：`https://rainbond.com/console/oauth/redirect` |
| Scopes       | 勾选 `api` `read_user` `read_repository`                     |

### 创建 Rainbond OAuth

进入 **平台管理 -> 设置 -> 基础设置 -> OAuth 第三方服务集成 -> 添加**

|            | 说明                               |
| ---------- | ---------------------------------- |
| OAuth 类型 | gitlab                             |
| 名称       | 自定义                             |
| 服务地址   | GitLab 访问地址                    |
| 客户端 ID  | GitLab Applications Client ID      |
| 客户端密钥 | GitLab Applications  Client Secret |
| 回调地址   | 默认为当前 Rainbond 访问地址       |

## 对接 Gitee

### 创建 Gitee 第三方应用

进入 **设置 -> 第三方应用 -> 创建应用**

|              | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| 应用名称     | 自定义                                                       |
| 应用主页     | Rainbond 访问地址，如 `https://rainbond.com`                 |
| 应用回调地址 | 回跳路径，用于接收返回的凭证，Homepage URL + /console/oauth/redirect，如：`https://rainbond.com/console/oauth/redirect` |
| 权限         | 勾选 `user_info` `projects` `hook`                           |

### 创建 Rainbond OAuth

进入 **平台管理 -> 设置 -> 基础设置 -> OAuth 第三方服务集成 -> 添加**

|            | 说明                         |
| ---------- | ---------------------------- |
| OAuth 类型 | gitee                        |
| 名称       | 自定义                       |
| 服务地址   | Gitee 访问地址               |
| 客户端 ID  | Gitee Client ID              |
| 客户端密钥 | Gitee  Client Secret         |
| 回调地址   | 默认为当前 Rainbond 访问地址 |

##  OAuth 服务认证

在配置 OAuth 服务后在 Rainbond 右上角的用户信息内可以进行OAuth服务认证，与第三方平台互联。

Rainbond 右上角 **个人中心 -> OAuth 账号绑定 -> 去认证**。

## 通过 Git 仓库创建组件

配置并认证 OAuth 服务后，可以通过代码仓库的项目直接创建组件。

进入 **团队视图 -> 基于源码创建 -> 选择代码仓库 -> 基于项目创建组件**。



:::tip

GitLab 10.6 版本以后为了安全，不允许向本地网络发送 Webhook 请求。

解决：进入 **Admin area -> settings -> OutBound Request** 勾选 `Allow requests to the local network from hooks and services`

支持的 api 版本：

* Github 目前支持的 `api` 版本为`v3` 版本
* Gitlab 目前支持的 `api` 版本为 `v4` 版本
* Gitee 目前支持的 `api` 版本为 `v5` 版本

:::
