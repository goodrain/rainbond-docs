---
title: Deploy Vue, React front-end projects
weight: 4003
---

**foreword**

In the past, we had several ways to deploy **Vue**,**React** front-end projects：

* After the project is packaged, the dist directory is generated, placed in nginx, and the corresponding access configuration is performed.
* Package the project into tomcat.
* Put the static and index.html files in the packaged dist directory of the project into the resources directory of the springboot project
* Run a front-end server directly, similar to local development.



Deploying**Vue** **React** projects in Rainbond also uses the first method, automatically`build`according to the source code, and automatically puts static files into nginx after packaging.

* Deploying **Vue** **React** project in Rainbond has the following three specifications：

  1. Rainbond will identify`Vue` `React`front-end projects according to whether there are **nodestatic.json** and **package.json ** files in the source code root directory.

2. One of the following two files must exist in the source code root directory (**cannot exist at the same time**)：

   - `package-lock.json` When this file exists, Rainbond builds with the npm package manager by default.

   - `yarn.lock` When this file exists, Rainbond is built using the yarn package manager.
  3. The file `web.conf` needs to exist in the root directory of the source code, which is the configuration file of`nginx`.Without this file, Rainbond uses the default configuration.



**Before Rainbond deploys its own Vue and React projects, you need to check whether the project is available：**

- Clean up all dependencies of local`node_modules`, can you use`npm run build`or other commands **to package successfully**.



Next, use this Vue project`https://gitee.com/zhangbigqi/RuoYi-Vue.git` to demonstrate, Fork open source project [Ruoyi](https://gitee.com/y_project/RuoYi-Vue.git)




### 1.1 Add nodestatic.json file

Create a file `nodestatic.json` in the source code root directory and fill in the following content.

This file specifies the output directory of static files after compilation. Generally, Vue projects are packaged and output to the project root directory`dist`by default.

```bash
{
    "path": "dist"
}
```

If your project is packaged and the directory output is not the project root directory, but a folder in the root directory, such as：`project/dist`, you need to modify the`nodestatic.json`file

```shell
{
    "path": "project/dist"
}
```

### 1.2 Add web.conf file

After the project is compiled, Rainbond will use Nginx (1.14.2) by default to run the front-end project.Users can add `web.conf` file in the source code root directory to specify the configuration of Nginx. The function of this file is to define runtime parameters.Without this file, Rainbond uses the default configuration.The reference configuration use case is as follows：

By default, all files in the packaged `dist`directory will be placed in the container's`/app/www`

```bash
server {
    listen 5000;

    location / {
        root /app/www;
        try_files $uri $uri/ /index.html;
        index index.html index.htm;
    }
}
```

**With the above files, you can build Vue and React projects in Rainbond**

### 1.3 Source code deployment Vue project

**This time I use the Vue project for demonstration, and the same is true for the React project.**

Source address of this project`https://gitee.com/zhangbigqi/RuoYi-Vue.git` Fork open source project [Ruoyi](https://gitee.com/y_project/RuoYi-Vue.git)

#### 1.3.1 Create components based on source code

* Refer to build[official documentation based on source code](/docs/use-manual/component-create/language-support/nodejs-static/)

- Fill in the source code warehouse address, fill in the front sub directory `ruoyi-ui`, and build the Vue project

![vue-1](https://static.goodrain.com/docs/practice/Vue-SpringBoot-Mysql/Vue-1.png)

- Confirm the creation of the component, the platform will automatically recognize the language as **Nodestatic**.

  ![vue-2](https://static.goodrain.com/docs/practice/Vue-SpringBoot-Mysql/Vue-2.png)

- Create and wait for the build component to complete.

  > By default, the domestic npm Taobao source is used, which can be viewed in the component build source

- This open source project is special. The default packaging command is not`npm run build`, but`npm run build:prod`. You need to modify the build command in `component > build source`to this command.

  > The default packaging commands in Rainbond are npm run build, yarn run build

* After modification, rebuild it until it is complete, just visit the page.✌️



### common problem

* After the deployment is complete, visit page**403**for the following reasons：

1. The packaging was unsuccessful, resulting in an incomplete product.

   > Check the build log carefully to confirm the cause of the error.Or delete all dependent packages locally and re-verify that the project can be built normally.

   2. The packaging path is incorrectly defined, so that the Rainbond build process cannot obtain the built static files.

      > Refer to Section 1.1 above to correctly configure the project packaging path.