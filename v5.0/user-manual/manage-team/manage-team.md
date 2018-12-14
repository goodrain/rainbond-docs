---
title: 团队管理
summary: 团队管理，用户管理，权限管理
toc: true

---
<div id="toc"></div>


## 功能描述
团队管理模块包含了团队/团队成员管理、数据中心管理和角色管理。下面逐个介绍功能及使用方式

## **一.团队管理**
用户可以属于一个团队，也可以属于多个团队，用户也可以创建和离开团队。

### 创建团队
Rainbond注册的第一个用户是平台管理员，他可以新建其他团队，后续再注册的用户为普通用户。

新用户注册后默认创建一个 名为 `<注册名称>的团队` 的团队。

**平台管理员新建团队**
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/create-team.gif" width="100%" />

### 团队重命名
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/rename-team.gif" width="100%" />


## **二.用户管理**
为了让用户能够更好的管理团队及分配相关功能，我们设计了基于角色的权限系统。该系统基于 `角色` 来控制成员的行为，并支持用户`自定义` 团队中的角色，平台默认设置了三个角色，分别为：

- Admin：团队管理员
- Developer：开发者
- Viewer：观察者

权限系统拥有灵活定制性的同时也使权限控制的粒度更加细腻。

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/permissions-manage/privilege-management01.png" width="100%" />


### 添加角色

  如果您是团队的`owner(创建者)`或者`admin(管理员)`，您可以在`团队管理`中的`角色管理`一栏中点击`添加角色`来为本团队新添加一个角色，同时为这个角色绑定您需要的权限选项。

{{site.data.alerts.callout_danger}}
- 如果您想定义一个角色来参与团队或者应用的相关操作，那请您务必赋予这个角色一些基本的权限，比如`登入团队`，`查看应用信息`。
- 您添加的角色名称不可以与系统默认的角色名称相同
- 角色名称是三十个字符内的数字/字母/中文字符/下划线/中划线的任意组合
{{site.data.alerts.end}}

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/permissions-manage/add_role2.jpg" style="border:1px solid #eee;width:100%"/></center>
  

### 删除角色

您可以删除团队中自定义的角色，但您在本团队中的角色必须是`owner(创建者)`或者`admin(管理员)`才可以进行删除自定义角色的操作。您可以在`团队管理`中的角色管理`一栏中点击想要删除角色后方的`删除`按钮，再次点击确认后即可删除本角色。

{{site.data.alerts.callout_danger}}
- 如果您的团队中已经有成员拥有此角色，那您不能直接删除该角色
{{site.data.alerts.end}}

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/permissions-manage/rm_role.png" style="border:1px solid #eee;width:100%"/></center>

### 编辑角色

您可以修改自定义角色的名称以及这个角色对应的权限选项。但您在本团队中的角色必须是`owner(创建者)`或者`admin(管理员)`才可以进行修改自定义角色的操作。您可以在`团队管理`中的`角色管理`一栏中点击想要修改的角色后方的`修改`按钮，修改角色名称以及对应的权限选项，确认无误后点击确认即可完成对次角色的修改，

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/permissions-manage/edit_role.jpg" style="border:1px solid #eee;width:100%"/></center>
  
### 添加团队成员

如果您在本团队拥有的角色中包含`团队权限设置`这一权限，那么您可以在`团队管理`中的`团队成员`一栏中查看您当前团队下的所有成员，并点击`添加成员`可以为团队新添加一个成员，并给该成员授予一个您当前团队中存在的角色，这样该成员就拥有该角色所对应的所有权限操作了。

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/permissions-manage/add_user.jpg" style="border:1px solid #eee;width:60%"/></center>

### 删除团队成员

如果您在本团队拥有的角色中包含`团队权限设置`这一权限，那么您可以在`团队管理`中的`团队成员`一栏中点击您想要删除成员后方的`删除`按钮，再次确认后即可将此成员在本团队中移除。

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/permissions-manage/rem_user.jpg" style="border:1px solid #eee;width:100%"/></center>

### 修改成员角色

如果您在本团队拥有的角色中包含`团队权限设置`这一权限，那么您可以在`团队管理`中的`团队成员`一栏中点击您想要修改的成员后方的`修改角色`按钮，给该成员选择一些您团队中已经存在的角色，点击确认即可修改该成员在此团队中的角色。

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/permissions-manage/edit_user.jpg" style="border:1px solid #eee;width:100%"/></center>

 
## **三.应用权限管理**

应用权限是您在某一个应用中给该团队中的成员赋予的一些权限，这些权限只在该应用下有效，我们设计应用权限的初衷是当您团队中的一个成员，在该团队中的角色对应的权限比较有限，但您又想让该成员去管理某一个应用，就您就可以在一个应用中添加该成员并赋予他/她更丰富的权限操作。


{{site.data.alerts.callout_danger}}
- 如果您在团队管理中新建一个团队角色，并给这个角色绑定了一个应用相关的权限，那么这些应用相关的权限在所有的应用中都有效。
- 在某一应用中添加一个应用成员并赋予一些应用相关的权限，并不会覆盖掉该成员在团队的中角色所对应的那些应用相关的权限，而是取两者的权限并集。
- 如果您想让一个成员查看到应用组的信息总览，那么请您给该成员团队中的角色添加`查看应用信息`的权限。
{{site.data.alerts.end}}


### 添加应用成员

如果您拥有的权限中存在 `应用权限设置` 这一权限操作，那么您可以在此应用中添加一个 `应用成员` 。首先进入到您的应用页面，点击 `设置` 选项，在该页面最下方的 `成员应用权限` 一栏中点击 `设置成员应用权限` 按钮，选择您当前团队中的一些成员，并给这些成员绑定一些应用相关的权限操作，点击确认即可完成应用成员设置。



### 删除应用成员

  如果您拥有的权限中存在 `应用权限设置` 这一权限操作，那么您可以在此应用中删除一个 `应用成员` 。首先进入到您的应用页面，点击 `设置` 选项，在该页面最下方的 `成员应用权限` 一栏中点击您想要删除成员后方的 `移除应用权限` ，再次确认后即可将此成员在本应用中移除。

  

### 修改应用成员权限

如果您拥有的权限中存在 `应用权限设置` 这一权限操作，那么您可以在此应用中编辑一个 `应用成员` 在此应用下的权限。首先进入到您的应用页面，点击 `设置` 选项，在该页面最下方的 `成员应用权限` 一栏中点击您想要编辑成员后方的 `编辑权限` 按钮 ，给该成员选择一些新的权限后点击确认即可完成修改。

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/permissions-manage/team1.jpg" style="border:1px solid #eee;width:100%"/></center>

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/permissions-manage/service.jpg" style="border:1px solid #eee;width:100%"/></center>


## 权限功能说明

| 权限功能 | 说明                |
|---------|--------------------|
|登入团队|该权限控制一些团队信息的获取，如果您定义的角色是为了使用该团队，那么请您务必选择该权限|
|开通数据中心|控制该角色能否为团队开通数据中心|
|团队权限设置|为团队添加团队成员，删除团队成员，修改团队成员角色|
|自定义角色|能否在团队中添加自定义角色，删除自定义角色，修改自定义角色对应的权限。目前只有团队的owner与admin拥有此权限|
|应用导入导出|控制云市应用的导入和导出操作|
|查看插件信息|团队中我的插件板块的查看权限|
|插件管理|在团队中新建插件，删除插件，安装插件，管理插件等操作权限|
|应用组管理|新建应用(组)，删除应用(组)，应用(组)内应用的移动|
|应用组分享|应用(组)分享的权限|
|创建应用|创建服务的权限|
|删除应用|删除一个服务的权限|
|查看应用信息|应用(组)总览信息查看，应用的信息获取和查看|
|部署应用|服务的构建和部署权限|
|启动应用|启动一个服务的权限|
|关闭应用|关闭一个服务的权限|
|重启应用|重启一个服务的权限|
|回滚应用|回滚一个服务的权限|
|应用容器管理|获取容器节点与进入容器|
|应用伸缩管理|服务伸缩板块的操作权限|
|应用扩展管理|服务扩展板块的操作权限|
|应用配置管理|服务依赖，存储，端口，特性，环境变量，健康监测，自动部署等应用的配置操作权限|
|应用权限设置|在一个服务中添加应用成员，删除服务成员，修改应用成员在本服务中的权限|
|查看访问控制|查看访问控制的权限|
|访问证书管理|查看证书管理的权限|
|访问控制操作|对策略操作(增加、删除、编辑)的权限|
|证书管理操作|对证书操作(增加、删除、编辑)的权限|

