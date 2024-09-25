---
title: component environment variables
---

## Component environment variable management

The component supports custom environment variables. Users can add the environment variables in the form of Key | Value, and the environment variables will be injected into the component.

### add environment variable

Components -> Environment Variables -> Add Variables.

- variable name：key
- variable value：value
- Description：variable description, will not be injected into the component

### delete environment variable

components -> environment variables -> delete variables

:::danger
note：variable is not recoverable after deletion
:::

### Modify environment variables

Components -> Environment Variables -> Modification

Environment variables only support modifying `variable value`

### transfer environment variables

Convert the environment variable to a dependent environment variable. When the component is dependent, this environment variable will be injected into the dependent component.

> After the transfer, the environment variables will still take effect in the current component.

:::danger

The operations of the above environment variables need to be updated/restarted to take effect.

:::

## Component Profile Management

Configuration file mounting means that we fill in the file content into Rainbond, and Rainbond is mounted to the component in the form of a file.

### Add configuration file

Go to Components -> Environment Configuration -> Configuration File Settings -> Add Configuration File

<img src="https://static.goodrain.com/docs/5.6/use-manual/component-manage/env/configmap.png" width="30%" />

Profile info：

- config file name：custom (not file name)
- The configuration file mount path：needs to fill in the absolute path including the file name, such as：/data/test.conf
- Permissions for files with permissions：, e.g.：777
- Configuration file content：custom

### Edit configuration file

Go to Components -> Environment Configuration -> Configuration File Settings -> Edit Configuration File

`Configuration file mounting path`,`Permissions`,`Configuration file content` can be modified, but the configuration file name cannot be modified.

Rainbond will check whether the content of the configuration file has been modified. If it is not modified, it will not be saved.

### delete profile

Go to Components -> Environment Configuration -> Configuration File Settings -> Delete Configuration File

Note that：will not be recovered after deletion

:::danger

The operations of the above configuration files need to be updated/restarted to take effect.

:::

## shared configuration file

The shared configuration file is to mount the configuration files of other components to the current component, which is suitable for scenarios where the configuration files of multiple components are consistent.

### Mount shared configuration file

Go to Components -> Environment Configuration -> Shared Configuration File Settings -> Mount Shared Configuration File

Fill in the local mount path：

- Check the components that need to mount the configuration file
- Fill in the local mount configuration file path：, you need to write the absolute path including the file name

![](https://static.goodrain.com/docs/5.6/use-manual/component-manage/env/share-configmap.png)

### Unmount shared configuration file

Go to Components -> Environment Configuration -> Shared Configuration File Settings -> Unmount

:::danger

The above operations of sharing configuration files need to be updated/restarted to take effect.

:::

### 搜索配置文件

用户可以根据应用、组件以及配置文件名称等多种维度进行分组，轻松地过滤和查找目标配置文件，实现了更加细粒度的管理。无论是按照应用整体进行配置管理，还是精准到单个组件的配置文件操作，都变得更加直观和便捷。这项升级改进了配置文件的维护流程，为用户提供了更高效的配置管理体验

### Component advanced environment variable configuration

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
