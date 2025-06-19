---
title: UI 贡献指南
description: 该文档介绍如何为 Rainbond 前端 UI 项目做出贡献。
---

## 前置条件
1. 克隆前端项目代码
```bash
git clone https://github.com/goodrain/rainbond-ui.git
```
2. 使用符合要求的 node 版本
```
Node.js 版本  >=  14.15.0  <17
```

## 安装依赖

运行yarn安装命令

```
yarn install
```

## 文件配置

#### 代理地址配置

文件地址：根目录>config>config.js

更改 proxy 配置，将地址代理到 Rainbond 的控制台服务，控制台服务可以是你云端部署的，也可以是本地运行的。

## 项目运行

npm运行

```
npm run start   
```

yarn运行

```
yarn start
```

## 开发流程

### 页面创建

**注意：该项目使用的框架为UMI 2.x ，UI组件库为 antd 3.x。**

1. 按照前面的流程安装好对应依赖以及配置好相应文件，启动项目。

2. 添加想要开发的对应功能的路由地址。

   路由地址文件在 **根目录>config>router.config.js**

   如果想在平台管理端添加功能的路由。

   ```
         {
           path: '/enterprise/:eid',
           component: '../layouts/EnterpriseLayout',
           name: 'EnterprisePage',
           authority: ['admin', 'user'],
           Routes: ['./routes/AdminRoute.js'],
           routes: [
           	...
           	  {
               path: '/enterprise/:eid/自定义路由地址',
               component: './自定义pages文件夹名称',
               name: '自定义名称',
               authority: ['admin', 'user']
             }
           ]
   ```

   如果想在用户端添加功能的路由。

   ```
         {
           path: '/team/:teamName/region/:regionName/',
           component: '../layouts/TeamLayout',
           name: 'TeamBasicLayout',
           authority: ['admin', 'user'],
           Routes: ['./routes/UserRoute.js'],
           routes: [
           ...
              {
               path: '/team/:teamName/region/:regionName/自定义路由地址',
               component: './自定义pages文件夹名称',
               name: '自定义名称',
               authority: ['admin', 'user'],
             },
           ]
   ```

3. 在pages文件夹下创建对应的 **自定义pages文件夹名称**（同路由参数component的名称一致）。

   例如现在开发了一个针对于平台管理端的审计功能。那么应该在router.config.js 文件下添加以下内容：

   ```
         {
           path: '/enterprise/:eid',
           component: '../layouts/EnterpriseLayout',
           name: 'EnterprisePage',
           authority: ['admin', 'user'],
           Routes: ['./routes/AdminRoute.js'],
           routes: [
           	...
           	  {
               path: '/enterprise/:eid/audit',
               component: './Audit',
               name: 'EnterpriseAudit',
               authority: ['admin', 'user']
             }
           ]
   ```

   同时，在 **根目录>src>pages**  目录下新建一个名为  **Audit**（同component的key值一致）的文件夹。在里面创建一个index.js的文件。

4. 刷新项目，输入对应路由地址，即可看到相应页面。

#### 侧边栏导航添加

找到根目录>src>common。（这里以添加一个管理端侧边导航为例）

```
    if (isEnterpriseAudit) {
      menuArr.push({
        name: formatMessage({ id: 'menu.enterprise.audit' }),
        icon: <i className="anticon actionImg"><img src={icon} alt="" /></i>,
        path: `/enterprise/${eid}/audit`,
        authority: ['admin', 'user']
      });
    }
```

| 变量              | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| name              | 导航栏文字                                                   |
| icon              | 导航栏图标                                                   |
| path              | 导航路径                                                     |


### API请求

1. 找到根目录> src > services > team.js (可以在其他js文件下添加，这里只是举例)

2. 创建接口请求。

   ```
   // 收藏应用
   export async function collectApp(data, handleError) {
       return request(`${apiconfig.baseUrl}/console/enterprise/${data.enterprise_id}/app_library_collect`, {
           method: 'post',
           data: data.data,
           handleError
       });
   }
   ```
   
3. 找到根目录> src > models > teamControl.js

4. 引入，并存储对应的请求信息。

   ```
   import {
       collectApp,
   }
       from '../services/team';
       import { push } from 'umi/router';
   export default {
       namespace: 'teamControl',
       state: {
       },
       effects: {
           *collectApp({ payload, callback, handleError }, { call }) {
               const data = yield call(collectApp, payload, handleError);
               if (data && callback) {
                   callback(data);
               }
           }
       },
   };
   
   ```

5. 发送请求。( 引入connect，并@connect() ，connect用来链接组件和状态管理器。你可以通过dispath调用对应仓库中的方法，也可以通过在this.props下找到仓库的数据进行操作。 )

   type：指向 teamControl 文件下的collectApp函数。

   payload：传参

   callback： 回调函数

   handleError：错误返回

   ```
   import React, { Component } from 'react'
   import { connect } from 'dva';
   @connect()
   
   export default class index extends Component {
     constructor(props) {
       super(props);
   		this.state={
   		
   		}}
   		/**
     * 收藏或取消收藏应用
     * 根据布尔值执行收藏或取消收藏操作，并更新应用列表。
     * @param {boolean} bool - 是否收藏
     * @param {*} id - 应用ID
     */
     collect = (bool, id) => {
       const { dispatch, eid } = this.props;
       dispatch({
           type: 'teamControl/collectApp',
           payload: {
             data: {
               app_library_id: id,
             },
             enterprise_id: eid
           },
           callback: (res) => {
             if (res && res.code == 200) {
               notification.success({ message: '收藏成功' })
             }
           },
           handleError: (res) => {
             notification.error({ message: '收藏失败' })
           }
         })
     }
   		render() {}
   
   }
   ```

### redux数据获取

#### 获取数据

connect用来链接组件和状态管理器。你可以通过dispath调用对应仓库中的方法，也可以通过在this.props下找到仓库的数据进行操作。

   ```
   import React, { Component } from 'react'
   import { connect } from 'dva';
   @connect(({ user }) => ({
     user: user.currentUser,
   }))
   
   export default class index extends Component {
     constructor(props) {
       super(props);
   		this.state={
   		}}
   	componentDidMount() {
   		const { }
     }
   		render() {}
   
   }
   ```

这样就可以通过 this.props.user 获取到对应redux里存储的数据了。

### 常用公共方法

#### 公共方法文件地址 根目录> src > utils > global.js

| 方法名称              | 作用                        |
   | --------------------- | --------------------------- |
| getCurrEnterpriseId() | 从 URL 中提取当前的企业 ID  |
| getCurrTeamName()     | 从 URL 中提取当前的团队名称 |
| getComponentID()      | 从URL 中提取当前组件的 ID   |
| getAppID(url)         | 从URL 中提取应用程序的 ID   |
| getCurrRegionName()   | 从 URL 中提取当前集群ID     |

## 项目编译

   ```
   npm run build
   ```

   
