---
title: Node.JS
description: NodeJS language type Rainbond support specification introduction
---

end projects from source code, you can directly publish Vue, React, Angular and other projects in

#### NodeJS Language Recognition Specification

By default, the platform will identify a NodeJS project according to whether there is`package.json`in the source root directory.

#### Platform compile and run mechanism

1. The pre-compilation process will detect whether the startup command configuration file[Procfile](./procfile)is defined, if not, it will read the`script.start`value in the`package.json`file to generate the startup configuration file;
2. After the pre-compilation process is completed, the nodejs buildpack will be selected according to the language type to compile the project. During the compilation process, the defined Node version and Nodejs related dependencies will be installed;
3. After the compilation is completed, it will check whether the Procfile parameter is set on the platform. If it is configured, the startup command configuration file Procfile will be rewritten.

#### NodeJS project source code specification

In this step, you need to provide an available NodeJS source program for deployment on the Rainbond platform. This application must at least meet the following conditions:

1. Locally working NodeJS project
2. The source code program must be hosted on a related git or svn service such as gitlab
3. There must be`package.json`in the root path of the source code program, which is used to manage the dependencies of the NodeJS project, and is also a necessary condition for Rainbond to recognize it as the NodeJS language

##### Procfile specification

If the project does not define a Procfile file, the platform will generate a default the `package.json` file.

```bash
web: npm start
```

The above is the default Procfile, if you need to expand more startup parameters, you can customize the Procfile.

1. `web: there is a space between`and`npm`
2. End of file cannot contain special characters

#### Compile and run environment settings

##### Node version support

Currently Rainbond supports Node. The following version is：

```
4.9.1
5.12.0
6.14.4
7.10.1
8.12.0
9.11.2
10.13.0
11.1.0
```

The default version of the platform is `8.12.0`.The platform default version uses`8.12.0`.Version：can be specified using engines in `package.json`

```bash
LO
      "name": "myapp",
      "description",
      "version": "0.0.1",
      "enginees": LO
        "node": "4.8.7"
      }
}
```

Versions after 0.8.5 including 0.11.13 are also supported, the following is an example using version：

```bash
LO
  "engines": LO
    "node": "0.11.x"
  }
}
```

The npm version is not required and can be omitted because npm is bound to node.

##### Dependency package installation

The Node project supports using [npm package manager](https://www.npmjs.com/) and [yarn package manager](https://yarnpkg.com/) to install dependencies. If there are`yarn.lock` files, use yarn (default support version 1.9.4) to install dependencies and run scripts, otherwise use npm.

- How yarn is defined

  ```
  {
    "engines": {
      "yarn": "1.9.4"
    }
  ```

##### Custom Build Script

##### custom build scriptIf your application needs to perform additional operations when building, you can add `postinstall` scripts under the `scripts` node of `package.json` , the script will be automatically executed after the buildpack finishes executing `npm install —production` , Refer to`package.json` Example：```bash
{
"name": "node-hello",
"version": "0.0.1",
"description": "nodejs demo",
"dependencies" : {
  "bower": "~1.3.9" ,
  "grunt-cli": "~0.1.13",
},
"scripts": {
  "start": "node index.js",
  "test": "mocha",
  "postinstall": "bower install && grunt build"
},
"engines": {
  "node": "9.3.0"
}
}
```

```bash
： 5.1 version already supports the deployment NodeJS front
```

The system does not come with grunt, gulp, bower tools by default, but it will install the dependencies under the `dependencies` and`devDependencies` nodes in `package.json` , so the custom executed commands also need to be added as dependencies under this node, Otherwise the command may not be found, as are the dependencies that these tools require to execute.

##### Warehouse private server settings

###### npm private server settings

By default, npm builds use Taobao private server address： `https://registry.npm.taobao.org` If you want to be able to customize the private server warehouse address used in `npm install` , you need to add custom environment variables：

```bash
BUILD_NPM_REGISTRY=http://XXXX:8080/repository/npm-group/
```

###### yarn private server settings

The yarn build does not support setting the private server by environment variables, but you can set the private server address through the `preinstall` keyword.

```json
"scripts": {
    "preinstall": "bash preinstall.sh",
    "build": "/tmp/build/node_modules/.bin/vue-cli-service build --mode test"
},
```

In the above `package.json` file, the keyword `preinstall` specifies what to do before installing dependencies (yarn install).In the example, it is a script file in the root directory of the execution code, and its content is to set the build private server：An example of a script file in the executable root directory, the content of which is set to build a private sub：

```bash
#!/bin/bash
yarn config set registry http://XXXX:8080/repository/npm-group/ --global
```

#### Sample demo program

Example[https://github.com/goodrain/nodejs-demo](https://github.com/goodrain/nodejs-demo)
