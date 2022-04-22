---
title: 用户管理
description: 本章节将带你初步了解Rainbond用户管理机制和使用方式
---

:::tip
企业用户查询、添加和修改相关功能，用户需要操作应用或组件相关资源时需要将其分配到相应的团队
:::
## 前提条件

需拥有企业管理员权限
## 新增用户

在 企业视图 -> 用户管理 -> 点击新增用户，相关信息如下：

|          | 用户信息                                      |
| -------- | --------------------------------------------- |
| 用户名   | 自定义，可使用用 `用户名` 进行登陆 （必填项） |
| 姓名     | 自定义（必填项）                              |
| 密码     | 自定义，至少8位（必填项）                     |
| 邮箱     | 自定义，可使用 `邮箱` 进行登陆 （必填项）     |
| 电话     | 自定义                                        |
| 所属团队 | 选择现有团队分配给当前用户                    |
| 角色权限 | 基于团队内的角色权限进行选择并分配给当前用户  |

![](https://static.goodrain.com/docs/5.6/use-manual/enterprise-manager/user-manage/add-user.png)



## 编辑用户

在 企业视图 -> 用户管理 -> 编辑用户，可修改用户 `姓名` `电话` `密码`。

![](https://static.goodrain.com/docs/5.6/use-manual/enterprise-manager/user-manage/edit-user.png)



## 搜索用户

在 企业视图 -> 用户管理 -> 搜索，输入用户信息进行搜索，可使用 `用户名` `姓名` 进行搜索。



## 重置管理员密码


```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```