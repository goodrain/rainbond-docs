---
title: 应用升级
description: 从应用市场安装的应用升级到新版本
hidden: true
---

### 应用升级

应用升级功能是`应用市场`在易用性方面的一次全面提升, 通过简单的操作即可把从`应用市场`安装的应用, 从`旧版本`升级到`新版本`.

**升级的对象是什么**

在应用管理菜单下, 有多个我们创建的应用, 我们把它这些应用叫做`应用组`, 每组应用有多个组件.

我们在往应用组中添加组件时, 可以直接从`应用市场`安装一个打包好的`云市应用`, 每个`应用组`可以安装多个`云市应用`, 所以`应用组`下的这些组件是来自不同的云市应用.

我们查找了这些组件的安装来源, 找出了这个组安装好的所有`云市应用`, 针对每个`云市应用`做升级操作.

**什么时候可以升级**

当`云市应用`中的组件有变化 (例如：端口、环境变量、存储等) 或 新版本增加了新的服务组件时, 我们会在`云市应用升级`按钮的左侧, 给您用绿点提示.



### 应用升级流程

**选择要升级的应用，点击`云市场应用升级`。**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/upgrade-app/1-%E8%BF%9B%E5%85%A5%E5%BA%94%E7%94%A8.png" width='80%' />



**查看来自应用市场的应用**

> 选择有新版本的应用进行升级

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/upgrade-app/2-%E6%9F%A5%E7%9C%8B%E5%8F%AF%E5%8D%87%E7%BA%A7%E5%BA%94%E7%94%A8.png" width='80%' />



**查看升级信息**

> 如果有多个可升级版本, 可按需选择期望升级到的版本.
>
> 当然也可根据意愿, 按需选择期望升级的服务.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/upgrade-app/3-%E6%9F%A5%E7%9C%8B%E5%8D%87%E7%BA%A7%E4%BF%A1%E6%81%AF.png" width='80%' />



升级信息主要包括, 每个服务的变更信息, 以及新增服务的信息.

在上图中 🔼 标志代表服务是可升级的, ➕标志代表服务是新增的. 没有标志代表该服务没有变化, 无需升级.



**点击升级**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/upgrade-app/4-%E5%8D%87%E7%BA%A7.png" width='80%' />



升级时, 我们对升级之前的服务状态做一个备份, 升级完成之后提供回滚功能



**升级完成**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/upgrade-app/5-%E5%8D%87%E7%BA%A7%E5%AE%8C%E6%88%90.png" width='80%' />

> 现在升级已经完成了, 让我们看看升级前后的对比

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/upgrade-app/%E5%8D%87%E7%BA%A7%E5%89%8D%E5%90%8E%E5%AF%B9%E6%AF%94.png" width='80%' />



**回滚**

> 当然有升级就有回滚
>
> 不过有点小小的限制:
>
> * 为了保证回滚的可靠性, 现在只允许对最后一次的升级操作进行回滚
> * 新增的服务是不能通过回滚删除的

`查看升级记录`

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/upgrade-app/7-%E6%9F%A5%E7%9C%8B%E5%8D%87%E7%BA%A7%E8%AE%B0%E5%BD%95.png" width='80%' />

`查看升级记录详情`

> 这里记录了之前升级

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/upgrade-app/8-%E6%9F%A5%E7%9C%8B%E5%8D%87%E7%BA%A7%E8%AE%B0%E5%BD%95%E8%AF%A6%E6%83%85.png" width='80%' />



> 我们可以从这里回滚升级(只能是最后一次升级哦)
>
> 当然, 回滚哪些服务也是可以按照意愿去选择.

~~时光倒流

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/upgrade-app/9-%E5%9B%9E%E6%BB%9A.png" width='80%' />

