---
title: MaxKey (unified authentication)
description: This article introduces the open source application MaxKey
weight: 7002
---

### 1.Introduction to MaxKey

Industry-leading identity management and authentication products

MaxKey single sign-on authentication system homophonic is the key of Marx, which means the biggest key, the industry-leading enterprise-level IAM identity management and authentication product, the first domestic open source IAM brand

-  Unified authentication and single sign-on simplify the account login process, protect account and password security, and manage accounts in a unified manner.
-  Provides simple, standard, secure and open user identity management (IDM), identity authentication (AM), single sign-on (SSO), resource management and authority management (RBAC), etc.
-  Standard security policies include password policies, access policies; post-event security audits, full-life-cycle audits of users, retrospective audits of access behavior records, security compliance audits, and security risk warnings.

### 2. Quickly install MaxKey through the Rainbond app store

* Search for `MaxKey`in the open source app store and click to install

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/opensource-app/maxkey/maxkey-install.png)

* The topology diagram after deployment is complete.

* `maxkey-web-maxkey` is the authentication service,`maxkey-web-mgt` is the management service.

  > Account password is：admin maxkey

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/opensource-app/maxkey/tuoputu.png)

### 3. What can MaxKey do

* MaxKey is an authentication platform, which can connect the company's internal service platform to MaxKey for unified login.For example, you can use the company's internal `GitLab` `Zen Tao` `Jenkins` and other service platforms that support the single sign-on protocol.
* This article will realize unified login by connecting  `Zen Dao`.

**Quickly install ZenTao via the Rainbond app store**

* Search for `Zen Dao`in the open source app store, and click to install it.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/opensource-app/maxkey/zentao.png)

* After the installation is complete, visit [Zen Tao ](https://www.zentao.net/book)to initialize the settings.

  > The Mysql password is obtained in the dependencies of the component.

* After entering Zen Tao, click Background > Secondary development > Application > to add an application.
  * name：custom
  * Code：maxkey
  * Password-free login：open
  * IP：unlimited

**Configuring MaxKey for Unified Login**

* Enter the MaxKey management service, enter the application management page, edit `Zendao project management`, and enter the editing page.
* Need to modify：
  * Login address：Tao login address
  * Key：Fill in the key when adding the application in Zen Tao in the previous step


![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/opensource-app/maxkey/maxkey-config.png)

* Enter the MaxKey authentication service, click`Zen Tao Project Management`, you can jump to the Zen Tao page and log in automatically.

![](https://static.goodrain.com/images/maxkey-zentao.gif)


> If you need to apply for settlement, please contact Manager Zhang：18701654470


