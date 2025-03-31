---
title: UI Contribution Guide
description: This document describes how to contribute to the Rainbond front-end UI project.
---

## Preconditions

1. Clone the front-end project code

```bash
git clone https://github.com/goodrain/rainbond-ui.git
```

2. Use the required node version

```
Node.js version >= 14.15.0
```

## Install dependencies

Run npm install command

```
npm install
```

Or yarn install command

```
yarn install
```

## File configuration

#### Proxy address configuration

File path: root directory>config>config.js

Change the proxy configuration to proxy the address to the Rainbond console service, which can be either your cloud deployment or locally run.

## Project run

npm run

```
npm run start   
```

yarn run

```
yarn start
```

## Development process

### Page creation

**Note: The framework used in this project is UMI 2.x, and the UI component library is antd 3.x.**

1. Follow the previous process to install the corresponding dependencies and configure the corresponding files, and start the project.

2. Add the route address of the corresponding function you want to develop.

   The route address file is in **root directory>config>router.config.js**

   If you want to add a route for a function in the platform management console.
```json
            {
              path: '/enterprise/:eid',
              component: '../layouts/EnterpriseLayout',
              name: 'EnterprisePage',
              authority: ['admin', 'user'],
              Routes: ['./routes/AdminRoute.js'],
              routes: [
              	...
              	  {
                  path: '/enterprise/:eid/custom route address',
                  component: './custom pages folder name',
                  name: 'custom name',
                  authority: ['admin', 'user']
                }
              ]
```
   If you want to add a route for a function in the user console.
```json
            {
              path: '/team/:teamName/region/:regionName/',
              component: '../layouts/TeamLayout',
              name: 'TeamBasicLayout',
              authority: ['admin', 'user'],
              Routes: ['./routes/UserRoute.js'],
              routes: [
              ...
                 {
                  path: '/team/:teamName/region/:regionName/custom route address',
                  component: './custom pages folder name',
                  name: 'custom name',
                  authority: ['admin', 'user'],
                },
              ]
```
3. Create the corresponding **custom pages folder name** (consistent with the component's key value in the route parameters) under the pages folder.

   For example, an audit function for the platform management console has been developed now.Then the following content should be added in the router.config.js file:
```json
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
   At the same time, create a folder named **Audit** (consistent with the component's key value) under the **root directory>src>pages** directory.Create an index.js file inside.

4. Refresh the project, enter the corresponding route address, and you can see the corresponding page.

#### Sidebar navigation addition

Find root directory>src>common.(Here is an example of adding a management console sidebar navigation)

```node
    if (isEnterpriseAudit) {
      menuArr.push({
        name: formatMessage({ id: 'menu.enterprise.audit' }),
        icon: <i className="anticon actionImg"><img src={icon} alt="" /></i>,
        path: `/enterprise/${eid}/audit`,
        authority: ['admin', 'user']
      });
    }
```

| Variable | illustrate          |
| -------- | ------------------- |
| name     | Navigation bar text |
| icon     | Navigation bar icon |
| path     | Navigation path     |

### API request

1. Find root directory> src > services > team.js (can be added under other js files, here is just an example)

2. Create an interface request.
```node
      // Collect application
      export async function collectApp(data, handleError) {
          return request(`${apiconfig.baseUrl}/console/enterprise/${data.enterprise_id}/app_library_collect`, {
              method: 'post',
              data: data.data,
              handleError
          });
      }
```
3. Find root directory> src > models > teamControl.js

4. Introduce and store the corresponding request information.
```node
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
              collectApp({ payload, callback, handleError }, { call }) {
                  const data = yield call(collectApp, payload, handleError);
                  if (data && callback) {
                      callback(data);
                  }
              }
          },
      };
```

5. Send request.( Introduce connect, and @connect(), connect is used to link components and state managers.You can call the methods in the corresponding warehouse through dispatch, or you can find the warehouse data under this.props for operation. )

   type: Point to the collectApp function under the teamControl file.

   payload: Pass parameters

   callback: Callback function

   handleError: Error return
```node
      import React, { Component } from 'react'
      import { connect } from 'dva';
      @connect()
      
      export default class index extends Component {
        constructor(props) {
          super(props);
      		this.state={
      
      		}}
      		/\*\*
        \* Collect or cancel collection application
        \* Perform collection or cancel collection operation according to the boolean value, and update the application list.
        \* @param {boolean} bool - Whether to collect
        \* @param {\*} id - Application ID
        \*/
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
                  notification.success({ message: 'Collection successful' })
                }
              },
              handleError: (res) => {
                notification.error({ message: 'Collection failed' })
              }
            })
        }
      		render() {}
      
      }
```
### redux data acquisition

#### Get data

connect is used to link components and state managers.You can call the corresponding method in the repository through dispatch, or you can operate on the data of the repository found under this.props.
```node
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
This way, you can get the data stored in the corresponding redux through this.props.user.

### Common public methods

#### Public method file address root directory> src > utils > global.js

| Method name                              | Function                                       |
| ---------------------------------------- | ---------------------------------------------- |
| getCurrEnterpriseId() | Extract the current enterprise ID from the URL |
| getCurrTeamName()     | Extract the current team name from the URL     |
| getComponentID()      | Extract the current component ID from the URL  |
| getAppID(url)         | Extract the application ID from the URL        |
| getCurrRegionName()   | Extract the current cluster ID from the URL    |

## Project compilation
```bash
   npm run build
```