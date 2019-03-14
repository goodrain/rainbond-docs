---
title: 开发文档
summary: rainbond 开放API文档
toc: true
---

<div id="toc"></div>


## 检查job状态

**请求URL:**

- `/v2/nodes/{ip}/install/status`

**简要描述**

- 检查job状态, check job status

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|ip |path |True |string |10.0.55.73 |


* * *

## 获取租户数量

**请求URL:**

- `/v2/resources/tenants/sum`

**简要描述**

- 获取租户数量, get tenant resources

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |


* * *

## 获取应用状态

**请求URL:**

- `/v2/tenants/{tenant_name}/services_status`

**简要描述**

- 获取应用状态, get service statuslist

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_ids |body |True |array |需要获取状态的服务ID列表,若不指定，返回租户所有应用的状态 |


* * *

## 从服务器获取节点基本信息

**请求URL:**

- `/v2/nodes//{node}/basic`

**简要描述**

- 从服务器获取节点基本信息, get node basic info from etcd

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|node |path |True |string |nodeuid |


* * *

## 完成基础初始化

**请求URL:**

- `/v2/nodes/{ip}/init`

**简要描述**

- 完成基础初始化, try to basicly init

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|ip |path |True |string |10.0.55.73 |


* * *

## 获取pods信息

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/pods`

**简要描述**

- 获取pods信息, get pods info

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |


* * *

## 获取所有job的group

**请求URL:**

- `/v2/job/group`

**简要描述**

- 获取所有job的group, get all groups

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |


* * *

## 云市分享

**请求URL:**

- `/v2/tenants/{tenant_name}/cloud-share`

**简要描述**

- 云市分享, share cloud

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|Image |body |False |Object |N/A |
|Slug |body |False |Object |N/A |
|kind |body |True |string |分享类型，app_slug／app_image |


* * *

## 获取所有的构建版本信息

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin/{plugin_id}/build-version`

**简要描述**

- 获取所有的构建版本信息, all plugin versions

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|plugin_id |path |True |string |- |


* * *

## 指定租户资源使用情况

**请求URL:**

- `/v2/tenants/{tenant_name}/resources`

**简要描述**

- 指定租户资源使用情况, get tenant resources

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |tenant name |


* * *

## 创建应用

**请求URL:**

- `/v2/tenants/{tenant_name}/services`

**简要描述**

- 创建应用, create service

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|node_label |body |False |string |节点标签,格式: v1,v2 |
|port_type |body |False |string |端口类型，one_outer;dif_protocol;multi_outer |
|service_version |body |False |string |服务版本 |
|update_time |body |False |Object |N/A |
|volume_mount_path |body |False |string |容器挂载目录 |
|envs_info |body |False |array |环境变量信息, 格式: []struct TenantServiceEnvVar |
|depend_ids |body |False |array |依赖id, 格式: []struct TenantServiceRelation |
|host_path |body |False |string |宿主机目录 |
|tenant_id |body |False |string |租户id |
|container_cpu |body |False |integer |容器CPU权重 |
|operator |body |False |string |操作人 |
|namespace |body |False |string |镜像来源 |
|ports_info |body |False |array |端口信息, 格式: []struct TenantServicesPort |
|service_id |body |False |string |应用id |
|volume_path |body |False |string |卷名字 |
|code_from |body |False |string |代码来源:gitlab,github |
|service_alias |body |True |string |服务别名 |
|container_cmd |body |False |string |容器启动命令 |
|event_id |body |False |string |最新操作ID |
|replicas |body |False |integer |节点数 |
|service_origin |body |False |string |服务创建类型cloud云市服务,assistant云帮服务 |
|service_type |body |False |string |服务类型 |
|volumes_info |body |False |array |持久化目录信息, 格式: []struct TenantServiceVolume |
|comment |body |False |string |服务描述 |
|container_env |body |False |string |容器环境变量 |
|deploy_version |body |False |string |部署版本 |
|image_name |body |False |string |镜像名称 |
|service_label |body |False |string |应用标签,value |
|volume_type |body |False |string |共享类型shared、exclusive |
|category |body |False |string |服务分类：application,cache,store |
|extend_method |body |False |string |扩容方式；0:无状态；1:有状态；2:分区 |
|service_key |body |False |string |服务key |
|container_memory |body |False |integer |容器最大内存 |


* * *

## 获取租户所有应用信息

**请求URL:**

- `/v2/tenants/{tenant_name}/services`

**简要描述**

- 获取租户所有应用信息, get services info in tenant

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |


* * *

## 应用水平伸缩

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/horizontal`

**简要描述**

- 应用水平伸缩, service horizontal

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|event_id |body |False |string |the event id |
|node_num |body |False |integer |伸缩数量 |


* * *

## 删除插件依赖

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/plugin/{plugin_id}`

**简要描述**

- 删除插件依赖, delete plugin relation

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|plugin_id |path |True |string |插件id |


* * *

## 获取指定服务endpoints

**请求URL:**

- `/v2/apps/{app_name}/discover`

**简要描述**

- 获取指定服务endpoints, get endpoints of app_name

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |


* * *

## 更新node

**请求URL:**

- `/v2/nodes/{node}`

**简要描述**

- 更新node, update

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|node |path |True |string |nodeuid |


* * *

## 重新上线计算节点

**请求URL:**

- `/v2/nodes/{node}`

**简要描述**

- 重新上线计算节点, add node

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|node |path |True |string |nodeuid |


* * *

## 从etcd 删除计算节点

**请求URL:**

- `/v2/nodes/{node}`

**简要描述**

- 从etcd 删除计算节点, delete node from etcd

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|node |path |True |string |nodeuid |


* * *

## 下线计算节点

**请求URL:**

- `/v2/nodes/{node}/down`

**简要描述**

- 下线计算节点, offline node

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|node |path |True |string |nodeuid |


* * *

## 下载应用指定日志

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/log-file/{file_name}`

**简要描述**

- 下载应用指定日志, get log file

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|file_name |path |True |string |- |


* * *

## 添加应用标签

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/service-label`

**简要描述**

- 添加应用标签, add service label

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|label_values |body |True |string |标签值,格式为"v1" |


* * *

## 更新应用标签

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/service-label`

**简要描述**

- 更新应用标签, delete service label

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|label_values |body |True |string |标签值,格式为"v1" |


* * *

## 设置自定义资源

**请求URL:**

- `/v2/tenants/{tenant_name}/sources/{source_alias}/{env_name}`

**简要描述**

- 设置自定义资源, set defineSource

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|source_alias |path |True |string |- |
|env_name |path |True |string |- |


* * *

## 更新自定义资源

**请求URL:**

- `/v2/tenants/{tenant_name}/sources/{source_alias}/{env_name}`

**简要描述**

- 更新自定义资源, set defineSource

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|source_alias |path |True |string |- |
|env_name |path |True |string |- |
|source_spec |body |True |Object |N/A |


* * *

## 设置自定义资源

**请求URL:**

- `/v2/tenants/{tenant_name}/sources/{source_alias}/{env_name}`

**简要描述**

- 设置自定义资源, set defineSource

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|source_alias |path |True |string |- |
|env_name |path |True |string |- |
|source_spec |body |True |Object |N/A |


* * *

## 删除插件默认变量

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin/{plugin_id}/default-env/{env_name}`

**简要描述**

- 删除插件默认变量, delete default env

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|plugin_id |path |True |string |- |
|env_name |path |True |string |配置项名称 |


* * *

## 修改用户可配的环境变量

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/plugin/{plugin_id}/setenv/{env_name}`

**简要描述**

- 修改用户可配的环境变量, update version env

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|plugin_id |path |True |string |插件id |
|env_name |path |True |string |变量名 |
|env_value |body |True |string |变量值 |


* * *

## 获取应用状态

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/status`

**简要描述**

- 获取应用状态, get service status

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |


* * *

## 提交license

**请求URL:**

- `/license`

**简要描述**

- 提交license, post license & get token

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |


* * *

## 添加新节点到etcd

**请求URL:**

- `/v2/nodes`

**简要描述**

- 添加新节点到etcd, add new node info to etcd

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |


* * *

## 从etcd获取节点简单列表信息

**请求URL:**

- `/v2/nodes`

**简要描述**

- 从etcd获取节点简单列表信息, get node list info from etcd

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |


* * *

## 使节点可调度

**请求URL:**

- `/v2/nodes/{node}/reschedulable`

**简要描述**

- 使节点可调度, make node schedulable

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|node |path |True |string |nodeuid |


* * *

## 使节点不可调度

**请求URL:**

- `/v2/nodes/{node}/unschedulable`

**简要描述**

- 使节点不可调度, make node unschedulable

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|node |path |True |string |nodeuid |


* * *

## 更新应用端口信息

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/ports/{port}`

**简要描述**

- 更新应用端口信息, update port

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|Port |body |False |Object |N/A |


* * *

## 删除端口变量

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/ports/{port}`

**简要描述**

- 删除端口变量, delete port

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|port |path |True |integer |容器端口 |


* * *

## 设置自定义资源

**请求URL:**

- `/v2/tenants/{tenant_name}/sources/{source_alias}`

**简要描述**

- 设置自定义资源, set defineSource

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|source_alias |path |True |string |- |
|source_spec |body |True |Object |N/A |


* * *

## 增加应用依赖关系

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/dependency`

**简要描述**

- 增加应用依赖关系, add dependency

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|dep_order |body |False |string |不明，默认传 1, 可以不传 |
|dep_service_id |body |True |string |被依赖的应用id |
|dep_service_type |body |False |string |被依赖的应用类型,添加时需要传值, 删除时不需要传值 |


* * *

## 删除应用依赖关系

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/dependency`

**简要描述**

- 删除应用依赖关系, delete dependency

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|dep_order |body |False |string |不明，默认传 1, 可以不传 |
|dep_service_id |body |True |string |被依赖的应用id |
|dep_service_type |body |False |string |被依赖的应用类型,添加时需要传值, 删除时不需要传值 |


* * *

## 获取应用日志web-socket实例

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/log-instance`

**简要描述**

- 获取应用日志web-socket实例, get log socket

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |


* * *

## 增加应用持久化信息(V2.1支持多种类型存储)

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/volumes`

**简要描述**

- 增加应用持久化信息(V2.1支持多种类型存储), add volume

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|category |body |True |string |类型 "application;app_publish" |
|volume_name |body |True |string |存储名称(同一个应用唯一) |
|volume_path |body |True |string |容器挂载目录 |
|volume_type |body |True |string |存储类型（share,local,tmpfs） |


* * *

## 获取应用全部存储，包括依赖的存储(V2.1支持多种类型存储)

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/volumes`

**简要描述**

- 获取应用全部存储，包括依赖的存储(V2.1支持多种类型存储), get volumes

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |


* * *

## 获取可配置的env; 从service plugin对应中取, 若不存在则返回默认可修改的变量

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/plugin/{plugin_id}/envs`

**简要描述**

- 获取可配置的env; 从service plugin对应中取, 若不存在则返回默认可修改的变量, get version env

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|plugin_id |path |True |string |插件id |


* * *

## 增加应用端口,默认关闭对内和对外选项，需要开启使用相应接口

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/ports`

**简要描述**

- 增加应用端口,默认关闭对内和对外选项，需要开启使用相应接口, add port

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|Port |body |False |Object |N/A |


* * *

## 增加应用探针

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/probe`

**简要描述**

- 增加应用探针, add probe

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|path |body |False |string |path |
|period_second |body |False |integer |检测间隔时间, 默认为3 |
|probe_id |body |True |string |探针id |
|success_threshold |body |False |integer |标志为成功的检测次数 |
|failure_threshold |body |False |integer |标志为失败的检测次数 |
|http_header |body |False |string |http请求头,key=value,key2=value2 |
|initial_delay_second |body |False |integer |初始化等候时间, 默认为1 |
|is_used |body |False |integer |是否启用 |
|mode |body |False |string |mode |
|port |body |False |integer |端口, 默认为80 |
|scheme |body |False |string |mode |
|timeout_second |body |False |integer |检测超时时间, 默认为30 |
|cmd |body |False |string |运行命令 |


* * *

## 更新应用探针信息, *注意此处为全量更新

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/probe`

**简要描述**

- 更新应用探针信息, *注意此处为全量更新, update probe

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|mode |body |False |string |mode |
|period_second |body |False |integer |检测间隔时间, 默认为3 |
|probe_id |body |True |string |探针id |
|timeout_second |body |False |integer |检测超时时间, 默认为30 |
|http_header |body |False |string |http请求头,key=value,key2=value2 |
|is_used |body |False |integer |是否启用 |
|initial_delay_second |body |False |integer |初始化等候时间, 默认为1 |
|path |body |False |string |path |
|port |body |False |integer |端口, 默认为80 |
|scheme |body |False |string |mode |
|success_threshold |body |False |integer |标志为成功的检测次数 |
|cmd |body |False |string |运行命令 |
|failure_threshold |body |False |integer |标志为失败的检测次数 |


* * *

## 删除应用探针

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/probe`

**简要描述**

- 删除应用探针, delete probe

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|probe_id |body |True |string |探针id |


* * *

## 启动应用

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/start`

**简要描述**

- 启动应用, start service

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|event_id |body |False |string |the tenant id |


* * *

## 更改 job 状态

**请求URL:**

- `/v2/job/{id}/group/{group}`

**简要描述**

- 更改 job 状态, change job status

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|group |path |True |string |group name |
|id |path |True |string |job id |


* * *

## 获取 job

**请求URL:**

- `/v2/job/{id}/group/{group}`

**简要描述**

- 获取 job, get job by group and id

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|group |path |True |string |group name |
|id |path |True |string |job id |


* * *

## 删除 job

**请求URL:**

- `/v2/job/{id}/group/{group}`

**简要描述**

- 删除 job, delete job by group and id

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|group |path |True |string |group name |
|id |path |True |string |job id |


* * *

## 添加插件设定

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/plugin`

**简要描述**

- 添加插件设定, add plugin setting

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|plugin_id |body |True |string |插件id |
|switch |body |False |boolean |开关 |
|version_id |body |True |string |插件版本 |


* * *

## 获取插件设定

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/plugin`

**简要描述**

- 获取插件设定, get plugin setting

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |


* * *

## 更新插件设定

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/plugin`

**简要描述**

- 更新插件设定, update plugin setting

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|plugin_id |body |True |string |插件id |
|switch |body |False |boolean |开关 |
|version_id |body |True |string |插件版本 |


* * *

## 应用版本回滚

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/rollback`

**简要描述**

- 应用版本回滚, service rollback

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|deploy_version |body |True |string |回滚到的版本号 |
|event_id |body |False |string |event_id |
|operator |body |False |string |操作人 |


* * *

## 立即在 node上 执行一次指定group/id 的job

**请求URL:**

- `/v2/job/{id}/group/{group}/node/{name}`

**简要描述**

- 立即在 node上 执行一次指定group/id 的job, execute job

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|group |path |True |string |group name |
|id |path |True |string |job id |
|name |path |True |string |node name |


* * *

## 获取某个构建版本信息

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin/{plugin_id}/build-version/{version_id}`

**简要描述**

- 获取某个构建版本信息, plugin version

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|plugin_id |path |True |string |- |
|version_id |path |True |string |- |


* * *

## 删除某个构建版本信息

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin/{plugin_id}/build-version/{version_id}`

**简要描述**

- 删除某个构建版本信息, delete plugin version

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|plugin_id |path |True |string |- |
|version_id |path |True |string |- |


* * *

## 获取指定操作的操作日志

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/event-log`

**简要描述**

- 获取指定操作的操作日志, get log by level

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|event_id |body |True |string |eventID |
|level |body |True |string |日志级别info/debug/error |


* * *

## 获取应用日志列表

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/log-file`

**简要描述**

- 获取应用日志列表, get log list

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |


* * *

## 增加应用持久化依赖

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/volume-dependency`

**简要描述**

- 增加应用持久化依赖, add volume dependency

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|depend_service_id |body |True |string |依赖的服务id |
|mnt_dir |body |True |string |挂载目录 |
|mnt_name |body |True |string |挂载容器内目录名称 |


* * *

## 删除应用持久化依赖

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/volume-dependency`

**简要描述**

- 删除应用持久化依赖, delete volume dependency

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|depend_service_id |body |True |string |依赖的服务id |


* * *

## 增加应用持久化信息

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/volume`

**简要描述**

- 增加应用持久化信息, add volume

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|volume_path |body |True |string |容器挂载目录 |
|category |body |True |string |类型 "application;app_publish" |
|host_path |body |True |string |宿主机挂载目录 |


* * *

## 删除应用持久化信息

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/volume`

**简要描述**

- 删除应用持久化信息, delete volume

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|category |body |True |string |类型 "application;app_publish" |
|volume_path |body |True |string |容器挂载目录 |


* * *

## 应用构建

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/build`

**简要描述**

- 应用构建, service build

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|image_url |body |False |string |镜像地址 |
|action |body |False |string |后续动作, 根据该值进行一键部署，如果不传值，则默认只进行构建 |
|deploy_version |body |True |string |部署的版本号 |
|event_id |body |False |string |the event id |
|repo_url |body |False |string |git地址 |
|service_alias |body |False |Object |N/A |
|tenant_name |body |False |Object |N/A |
|envs |body |False |object |变量 |
|kind |body |True |string |应用构建类型 |
|operator |body |False |string |操作人员 |


* * *

## 增加应用持久化依赖(V2.1支持多种类型存储)

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/depvolumes`

**简要描述**

- 增加应用持久化依赖(V2.1支持多种类型存储), add volume dependency

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|volume_name |body |True |string |依赖存储名称 |
|volume_path |body |True |string |容器挂载目录 |
|depend_service_id |body |True |string |依赖的服务id |


* * *

## 获取应用依赖的存储(V2.1支持多种类型存储)

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/depvolumes`

**简要描述**

- 获取应用依赖的存储(V2.1支持多种类型存储), get depvolumes

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |


* * *

## 删除应用持久化依赖(V2.1支持多种类型存储)

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/depvolumes`

**简要描述**

- 删除应用持久化依赖(V2.1支持多种类型存储), delete volume dependency

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|depend_service_id |body |True |string |依赖的服务id |
|volume_name |body |True |string |依赖存储名称 |


* * *

## 增加环境变量

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/env`

**简要描述**

- 增加环境变量, add env var

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|env_value |body |False |string |变量值, 增加时需要传值, 删除时可以不传 |
|is_change |body |False |boolean |是否可以修改 |
|name |body |False |string |name |
|scope |body |False |string |应用范围: inner or outer or both |
|container_port |body |False |integer |端口 |
|env_name |body |True |string |变量名称 |


* * *

## 删除环境变量

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/env`

**简要描述**

- 删除环境变量, delete env var

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|name |body |False |string |name |
|scope |body |False |string |应用范围: inner or outer or both |
|container_port |body |False |integer |端口 |
|env_name |body |True |string |变量名称 |
|env_value |body |False |string |变量值, 增加时需要传值, 删除时可以不传 |
|is_change |body |False |boolean |是否可以修改 |


* * *

## 添加节点标签

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/node-label`

**简要描述**

- 添加节点标签, add node label

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|label_values |body |True |array |标签值,格式为"[v1, v2, v3]" |


* * *

## 删除节点标签

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/node-label`

**简要描述**

- 删除节点标签, delete node label

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|label_values |body |True |array |标签值,格式为"[v1, v2, v3]" |


* * *

## 设置用户可配的环境变量

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/plugin/{plugin_id}/setenv`

**简要描述**

- 设置用户可配的环境变量, set version env

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|plugin_id |path |True |string |插件id |
|envs |body |True |array |环境变量 |


* * *

## 升级应用

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/upgrade`

**简要描述**

- 升级应用, upgrade service

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|deploy_version |body |True |integer |版本号 |
|event_id |body |False |string |the event id |
|operator |body |False |integer |操作人员 |


* * *

## 应用垂直伸缩

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/vertical`

**简要描述**

- 应用垂直伸缩, service vertical

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|container_cpu |body |False |integer |cpu数量 |
|container_memory |body |False |integer |内存大小 |
|event_id |body |False |string |the event id |


* * *

## 尝试通过SSH链接远程服务器

**请求URL:**

- `/v2/nodes/login`

**简要描述**

- 尝试通过SSH链接远程服务器, try to connect to ssh

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|hostport |body |True |string |ip:端口 |
|hosttype |body |True |string |节点类型 |
|pwd |body |False |string |root密码 |
|type |body |True |boolean |登录类型 |


* * *

## 从服务器获取节点详细信息

**请求URL:**

- `/v2/nodes/{node}/details`

**简要描述**

- 从服务器获取节点详细信息, get node details info from k8s

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|node |path |True |string |nodeuid |


* * *

## 为node添加label

**请求URL:**

- `/v2/nodes/{node}/label`

**简要描述**

- 为node添加label, add label to node

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|node |path |True |string |- |
|labels |body |True |array |label值列表 |


* * *

## 监控数据查询

**请求URL:**

- `/v2/opentsdb/query`

**简要描述**

- 监控数据查询, query opentsdb

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|start |body |True |string | |
|queries |body |True |string | |


* * *

## 获取下游网络规则

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/net-rule/downstream/{dest_service_alias}/{port}`

**简要描述**

- 获取下游网络规则, set NetDownStreamRuleStruct

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|dest_service_alias |path |True |string |- |
|port |path |True |integer |- |


* * *

## 更新下游网络规则

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/net-rule/downstream/{dest_service_alias}/{port}`

**简要描述**

- 更新下游网络规则, update NetDownStreamRuleStruct

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|dest_service_alias |path |True |string |- |
|port |path |True |integer |- |
|dest_service |body |True |string | |
|protocol |body |True |string |协议 |
|rules |body |True |Object |N/A |


* * *

## 重启应用

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/restart`

**简要描述**

- 重启应用, restart service

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|event_id |body |False |string |the tenant id |


* * *

## 删除应用持久化信息(V2.1支持多种类型存储)

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/volumes/{volume_name}`

**简要描述**

- 删除应用持久化信息(V2.1支持多种类型存储), delete volume

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|volume_name |path |True |string |存储名称 |


* * *

## 租户资源使用情况

**请求URL:**

- `/v2/resources/tenants`

**简要描述**

- 租户资源使用情况, get tenant resources

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |body |True |array | |


* * *

## 获取应用信息

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}`

**简要描述**

- 获取应用信息, get service info

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |


* * *

## 应用更新

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}`

**简要描述**

- 应用更新, update service

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|container_memory |body |False |integer |容器最大内存 |
|image_name |body |False |string |镜像名称 |
|container_cmd |body |False |string |容器启动命令 |


* * *

## 删除应用

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}`

**简要描述**

- 删除应用, delete service

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |


* * *

## 关闭应用

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/stop`

**简要描述**

- 关闭应用, stop service

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|event_id |body |False |string |the tenant id |


* * *

## 获取最新指定数量条日志

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/log`

**简要描述**

- 获取最新指定数量条日志, get last x lines logs

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|lines |body |True |integer |行数 |


* * *

## 获取job列表

**请求URL:**

- `/v2/job`

**简要描述**

- 获取job列表, get job list

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |


* * *

## 添加或者更新job

**请求URL:**

- `/v2/job`

**简要描述**

- 添加或者更新job, add or update job

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |


* * *

## 开始执行内置任务

**请求URL:**

- `/v2/nodes/{ip}/install`

**简要描述**

- 开始执行内置任务, start build-in jobs

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|ip |path |True |string |10.0.55.73 |


* * *

## 开始安装

**请求URL:**

- `/v2/nodes/{ip}/install`

**简要描述**

- 开始安装, check job status

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|ip |path |True |string |10.0.55.73 |


* * *

## 获取指定event_ids详细信息

**请求URL:**

- `/v2/tenants/{tenant_name}/event`

**简要描述**

- 获取指定event_ids详细信息, get events

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |


* * *

## 创建插件

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin`

**简要描述**

- 创建插件, create plugin

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|git_url |body |False |string |git地址 |
|image_url |body |False |string |插件docker地址 |
|plugin_id |body |True |string | |
|plugin_name |body |True |string | |
|tenant_id |body |False |string | |
|plugin_model |body |False |string |插件模式 |
|repo |body |False |string |带分支信息的git地址 |
|build_model |body |False |string |构建模式 |
|env_info |body |False |array | |
|image_local |body |False |string |插件goodrain地址 |
|plugin_cmd |body |False |string |插件启动命令 |
|plugin_info |body |False |string |插件用途描述 |


* * *

## 获取当前租户下所有的可用插件

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin`

**简要描述**

- 获取当前租户下所有的可用插件, get plugins

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |


* * *

## 插件更新 全量更新，但pluginID和所在租户不提供修改

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin/{plugin_id}`

**简要描述**

- 插件更新 全量更新，但pluginID和所在租户不提供修改, update plugin

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|plugin_id |path |True |string |- |
|plugin_model |body |False |string |插件模式 |
|build_model |body |False |string |构建模式 |
|plugin_cmd |body |False |string |插件启动命令 |
|plugin_info |body |False |string |插件用途描述 |
|plugin_name |body |False |string |插件名称 |
|repo |body |False |string |带分支信息的git地址 |
|git_url |body |False |string |git地址 |
|image_local |body |False |string |插件goodrain地址 |
|image_url |body |False |string |插件docker地址 |


* * *

## 插件删除

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin/{plugin_id}`

**简要描述**

- 插件删除, delete plugin

**请求方式:**

- DELETE

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|plugin_id |path |True |string |- |


* * *

## 构建plugin

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin/{plugin_id}/build`

**简要描述**

- 构建plugin, build plugin

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|plugin_id |path |True |string |- |
|info |body |True |string |版本信息, 协助选择插件版本 |
|plugin_cpu |body |False |integer |插件CPU权重, 默认125 |
|repo_url |body |False |string |git地址 分支信息 |
|tenant_id |body |False |string |租户id |
|deploy_version |body |True |string |部署的版本号 |
|operator |body |False |string |操作人 |
|plugin_cmd |body |False |string |插件cmd, 默认50 |
|plugin_memory |body |False |integer |插件最大内存, 默认50 |
|event_id |body |True |string |the event id |


* * *

## 添加插件默认变量

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin/{plugin_id}/default-env`

**简要描述**

- 添加插件默认变量, add default env

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|plugin_id |path |True |string |- |
|EVNInfo |body |True |array | |


* * *

## 获取插件默认设定的env

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin/{plugin_id}/default-env`

**简要描述**

- 获取插件默认设定的env, get plugin env

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|plugin_id |path |True |string |- |


* * *

## 更新插件默认变量，支持批量

**请求URL:**

- `/v2/tenants/{tenant_name}/plugin/{plugin_id}/default-env`

**简要描述**

- 更新插件默认变量，支持批量, update default env

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|plugin_id |path |True |string |- |
|EVNInfo |body |True |array | |


* * *

## 开关对内服务，应用无需重启，自动生效

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/ports/{port}/inner`

**简要描述**

- 开关对内服务，应用无需重启，自动生效, add port

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|port |path |True |integer |- |
|operation |body |True |string |操作值 `close` or `open` |


* * *

## 获取job的可执行节点

**请求URL:**

- `/v2/job/{id}/groups/{group}/nodes`

**简要描述**

- 获取job的可执行节点, get job runnable nodes

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|group |path |True |string |group name |
|id |path |True |string |job id |


* * *

## 应用代码检测

**请求URL:**

- `/v2/tenants/{tenant_name}/code-check`

**简要描述**

- 应用代码检测, check  code

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|tenant_id |body |False |string |租户id |
|check_type |body |True |string |检测类型, "first_check" |
|code_from |body |True |string |git源, "gitlab_manual" |
|code_version |body |True |string |代码分支 |
|git_project_id |body |True |integer |git project id, 0 |
|git_url |body |True |string |git分支详情 |
|action |body |False |Object |N/A |
|service_id |body |True |string |应用id |
|url_repos |body |True |string |git地址 |


* * *

## 设置下游网络规则

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/net-rule/downstream`

**简要描述**

- 设置下游网络规则, set NetDownStreamRuleStruct

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|dest_service_alias |body |True |string |下游服务别名 |
|port |body |True |integer |端口 |
|protocol |body |True |string |协议 |
|rules |body |True |Object |N/A |
|dest_service |body |True |string | |


* * *

## 开关端口对外服务，应用无需重启自动生效

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/ports/{port}/outer`

**简要描述**

- 开关端口对外服务，应用无需重启自动生效, add port

**请求方式:**

- PUT

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|port |path |True |integer |- |
|operation |body |True |string |操作值 `close` or `open` |


* * *

## 显示当前的api version 信息

**请求URL:**

- `/v2/show`

**简要描述**

- 显示当前的api version 信息, show api version

**请求方式:**

- GET

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |


* * *

## 添加租户信息

**请求URL:**

- `/v2/tenants`

**简要描述**

- 添加租户信息, add tenant

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|eid |body |False |string | |
|tenant_id |body |False |string |the tenant id |
|tenant_name |body |False |string |the tenant name |
|token |body |False |Object |N/A |


* * *

## 设置应用语言

**请求URL:**

- `/v2/tenants/{tenant_name}/services/{service_alias}/language`

**简要描述**

- 设置应用语言, set language

**请求方式:**

- POST

**参数:**

|参数名|参数位置|必选|类型|说明|
|:----  |:------|:---|:----- |-----   |
|tenant_name |path |True |string |- |
|service_alias |path |True |string |- |
|event_id |body |True |string |the tenant id |
|language |body |True |string |the language |


* * *
