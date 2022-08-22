---
title: Oauth2.0 integration function description
description: Description of the functions that can be obtained after the Rainbond platform enterprise integrates Oauth2.0
---

In order to help users use the product more conveniently, we implement the following functions based on the OAuth2.0 protocol.

#### Third Party User Authentication

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Based on the OAuth protocol, users can achieve one-click login through third-party platforms (Github, Gitlab, Gitee) by configuring the OAuth service, increasing user experience

#### Code repository docking

- Common Scenario：

In the scenario of building components from source code, users need to configure the project path and account password to create, and users also need to set up webhook by themselves, which is cumbersome to use; and account passwords are easily leaked.

- ：after using Oauth

In version 5.1.9, based on the OAuth protocol, we have realized the docking of source code construction warehouses.Users only need to register the client in their own code warehouse and configure the OAuth service on this platform, then they can quickly select the project version in their own warehouse to build, and automatically set the webhook. The whole process does not require an account password, and manual operation is greatly Improve security, usability, convenience.
