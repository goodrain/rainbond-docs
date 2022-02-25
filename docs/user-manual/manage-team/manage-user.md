---
title: 成员和角色管理
description: 团队成员管理方式和角色管理方式
---

### 成员管理
为了让用户能够更好的管理团队及分配相关功能，我们设计了基于角色的权限系统。该系统基于角色来控制成员的行为，并支持用户自定义团队中的角色，平台默认设置了三个角色，分别为：

- Admin：团队管理员
- Developer：开发者
- Viewer：观察者

权限系统拥有灵活定制性的同时也使权限控制的粒度更加细腻。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/register/privilege-management02.png" width="100%" />

#### 添加团队成员

如果您在本团队拥有的角色中包含`团队权限设置`这一权限，那么您可以在`团队管理`中的`团队成员`一栏中查看您当前团队下的所有成员，并点击`添加成员`可以为团队新添加一个成员，并给该成员授予一个您当前团队中存在的角色，这样该成员就拥有该角色所对应的所有权限操作了。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/manage-team/manage-user/Team%20management.png" width="100%" />


#### 删除团队成员

如果您在本团队拥有的角色中包含`团队权限设置`这一权限，那么您可以在`团队管理`中的`团队成员`一栏中点击您想要删除成员后方的`删除`按钮，再次确认后即可将此成员在本团队中移除。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/manage-team/manage-user/delete%20user.png" width="100%" />

#### 修改成员角色

如果您在本团队拥有的角色中包含`团队权限设置`这一权限，那么您可以在`团队管理`中的`团队成员`一栏中点击您想要修改的成员后方的`修改角色`按钮，给该成员选择一些您团队中已经存在的角色，点击确认即可修改该成员在此团队中的角色。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/manage-team/manage-user/Modifying%20roles.png" width="100%" />

 
### 角色管理

#### 添加角色

  如果您是团队的`owner(创建者)`或者`admin(管理员)`，您可以在`团队管理`中的`角色管理`一栏中点击`添加角色`来为本团队新添加一个角色，同时为这个角色绑定您需要的权限选项。


- 如果您想定义一个角色来参与团队或者应用的相关操作，那请您务必赋予这个角色一些基本的权限，比如`登入团队`，`查看应用信息`。
- 您添加的角色名称不可以与系统默认的角色名称相同
- 角色名称是三十个字符内的数字/字母/中文字符/下划线/中划线的任意组合

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/manage-team/manage-user/Add%20roles.png" width="100%" />


#### 删除角色

您可以删除团队中自定义的角色，但您在本团队中的角色必须是`owner(创建者)`或者`admin(管理员)`才可以进行删除自定义角色的操作。您可以在`团队管理`中的角色管理`一栏中点击想要删除角色后方的`删除`按钮，再次点击确认后即可删除本角色。

- 如果您的团队中已经有成员拥有此角色，那您不能直接删除该角色

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/manage-team/manage-user/Delete%20roles.png" width="100%" />

#### 编辑角色

您可以修改自定义角色的名称以及这个角色对应的权限选项。但您在本团队中的角色必须是`owner(创建者)`或者`admin(管理员)`才可以进行修改自定义角色的操作。您可以在`团队管理`中的`角色管理`一栏中点击想要修改的角色后方的`修改`按钮，修改角色名称以及对应的权限选项，确认无误后点击确认即可完成对次角色的修改，


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/manage-team/manage-user/Modifying%20roles2.png" width="100%" />
  
参考：
[团队权限管理](../manage-permision/)