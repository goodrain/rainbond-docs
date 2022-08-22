---
title: OAuth2.0 code warehouse docking
description: Provide third-party platform authentication login (Github, Gitlab, Gitee)
---

The platform has built-in three commonly used code repositories: github, gitlab, and gitee

#### 1. Github

The API version currently supported by Github is v3

#### 2. Gitlab

The API version currently supported by Gitlab is v4

#### 3. Gitee (code cloud)

The API version currently supported by Gitee is v5

#### The interface implemented by the code repository

- Get user information
- Get a list of user's items
- query item
- Get the branches and tags of the project
- Create webhook

**Note：** After gitlab version 10.6, for security, it is not allowed to send webhook requests to the local network

Solution：Enter the Admin area, in the Admin area, under the settings tab, find OutBound Request, check Allow requests to the local network from hooks and services, and save the changes to solve the problem

#### 4. Git extensions

For details, please refer to https://github.com/goodrain/rainbond-console/tree/master/console/utils/git_api/README.md
