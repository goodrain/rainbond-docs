---
title: How Vue and React projects call back-end interfaces
weight: 4004
---

### foreword

For deploying Vue and React projects, please refer to Rainbond to deploy Vue and React projects

In the past, after deploying the front-end project, we called the back-end interface in the following scenarios：

1. The back-end interfaces are not unified and are scattered, such as：`/system/user`,`/tool/gen`.

   Usually we will write the backend ip directly in the project's global configuration file`.env.production`, for example：

   ```shell
   ENV = 'production'
   VUE_APP_BASE_API = '192.168.6.66:8080'
   ```

   Although this write can be accessed normally, it will cause**cross**domain problems1.

2. The backend interface is unified, such as：`/api/system/user`, `/api/tool/gen`.

   Most of the small partners will also directly write**IP** + **suffix**to the project global configuration file, such as：

   ```shell
   ENV = 'production'
   VUE_APP_BASE_API = '192.168.6.66:8080/api'
   ```

   Of course, there will be a problem of**and**across domains.

So how do we solve the problem of**cross-domain**that the interface is not unified or the interface is unified.

​ Answer：Use**Nginx reverse proxy**.

​ Most of the small partners use nginx to throw the`dist`package packaged by the project into nginx, configure a location proxy_pass reverse proxy backend, and then fill in the`Nginx`address in the global configuration of the project.Jiang Zi will still cross over 😋.Then how to deal with it, please see below👇Car is still going to cross: face_savoring_food:.So what should be done, please see: backhand_index_pointing_down:

### There are several ways to solve cross-domain for different scenarios：

#### The interface is not unified

1. If the number of interfaces is small, for example, there are only a few interfaces`system` `tool` `moitor` `login` `getmenu`and so on.

   First of all, you need to modify the request api of the global configuration file\`\` to\*\*/\*\*When the front end of Jiangzi writes a request, it will be forwarded directly to nginx.

   ```shell
   ENV = 'production'
   VUE_APP_BASE_API = '/'
   ```

   Next, modify the**Nginx**configuration file and add multiple**location**, which will match the nginx location rule when the browser requests, such as：

   ​ The browser requests menu：`http://192.168.6.66/getmenu`, which will match the **location /getmenu**rule reverse proxy to the backend.

   ```shell
   server {
         listen 5000;
            #static page
         location / {
             root /app/www;
             try_files $uri $uri/ /index.html;
             index index.html index.htm;
         }

         location /getmenu{
             proxy_pass http ://127.0.0.1:8080/;
         }
   ```

   While this is possible, it is difficult to configure dozens of interfaces.

2. The number of interfaces is high.

   This method is certainly possible, but it is very troublesome to configure dozens or hundreds of interfaces one by one.2) There are many interfaces.Also, you need to modify the global configuration file`.env.production`, and modify the request interface to api, which is customized.Some friends have doubts, I don't have this interface, please read on.```shell
   ENV = 'production'
   VUE_APP_BASE_API = '/api'Some small partners have questioned, I do not have this interface, please go back to you.
   ```

   ```shell
   ENV = 'production'
   VUE_APP_BASE_API = '/api'
   ```

   Then modify**Nginx**configuration file, add**location /api**to nginx configuration file, and add **rewrite**,**proxy_pass**, this **rewrite**is URL rewriting.

   For example,：requests `http://192.168.6.66/api/system/menu`, and the Jiangzi request is normally sent to the backend, and the backend will report an error because there is no such interface.

   We rewrite the URL through**rewrite** , then the URL will become`http://192.168.6.66/system/menu`and reverse proxy to the backend through`proxy_pass`, and then send interface request`/system/ menu`, the backend returns normally.

   ```shell
   server {
       listen 5000;

       location / {
           root /app/www;
           try_files $uri $uri/ /index.html;
           index index.html index.htm;
       }

       location /api {
           rewrite ^/api/( .*)$ /$1 break;
           proxy_pass http://192.168.2.182:8080;
       }
   }
   ```

   `rewrite ^/api/(.*)$ /$1 break`For details, please refer to[Nginx official document rewrite_module module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html), here is a brief introduction of：

   ​ rewrite ^/api/(.\*)$ /$1 break

   ​ Keyword regular alternative content flag tag

#### Unified interface

It's better to handle this.

Also, the first thing is to modify the project's global configuration file`.env.production`, and modify the request interface to **/prod-api**.This unified interface is provided by the backend.This unified interface is a hat provided by the backend.

```shell
ENV = 'production'
VUE_APP_BASE_API = '/prod-api'
```

Modify the**Nginx**configuration file, add a**location**, reverse proxy to the backend address.

At this time, the URL requested in the browser is：`http://192.168.6.66/prod-api/system/menu`.

```shell
server {
    listen 5000;

    location / {
        root /app/www;
        try_files $uri $uri/ /index.html;
        index index.html index.htm;
    }

    location /prod-api {
        proxy_pass http:/ /192.168.2.182:8080;
    }
}
```

The cross-domain problem is solved, then let's start practicing once 😁.

The front-end configuration this time is the way that the**interface is unified with the**mentioned above.

Next, deploy a SpringBoot backend project to use with the frontend.

### Source deployment backend

- Source address of this project`https://gitee.com/zhangbigqi/RuoYi-Vue.git` Fork open source project [Ruoyi](https://gitee.com/y_project/RuoYi-Vue.git)

- Backend is**SpringBoot + Mysql + Redis** architecture.

#### Dockerfile source code build and deploy Mysql

Refer to the blog post Rainbond to easily build and run applications with Dockerfile

1. Build and deploy Mysql through the Dockerfile source code.Reference document[Dockerfile source code construction](/docs/use-manual/component-create/language-support/dockefile)Reference document[Dockerfile源码构建](/docs/use-manual/component-create/language-support/dockefile)

   ​ Dockerfile source code construction requires placing`Dockerfile file`in the Sql directory required by the project to automatically initialize the database.

   ​ Dockerfile file can refer to`https://gitee.com/zhangbigqi/RuoYi-Vue.git` `sql` directory under this project

2. Fill in the source code warehouse address, fill in the Mysql subdirectory `sql`, and build Mysql.

3. Confirm the creation of the component, the platform will automatically recognize the language as **dockerfile**.

4. Create and wait for the build component to complete.

5. After the construction is completed, open the internal service in the component > port and modify the `alias`, click to modify, and change it to`MYSQL_HOST`for use in back-end connections.

#### Docker image deploys Redis

1. Deploy redis through docker image, refer to official document[docker image construction](/docs/use-manual/component-create/image-support/image)for details

2. Use the official redis image, redis:latest

3. Confirm the creation, the platform will detect some image information, you can create it directly.

4. After the build is complete, open the inbound service in the component > port.for backend connectionsfor backend connections

#### Java source code build and deploy SpringBoot

1. Here, the configuration file `ruoyi-admin/src/main/resources/application-druid.yml`in the back-end project was modified in advance to connect to the database, and changed to the environment variable connection. The port alias modified above is used here.And modified the connection Redis configuration in the`ruoyi-admin/src/main/resources/application.yml`file}

   ```shell
   # Main database data source
     master:
         url: jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/ry-vue?
     redis:
         # Address
         host: 127.0.0.1
         # Port, the default is 6379
         port: 6379
   ```

2. Build the project through Java source code, refer to the official document[JAVA source code construction](/docs/use-manual/component-create/language-support/java/java-maven)

3. Fill in the source code repository address and build the SpringBoot project.

4. The platform will detect what project is based on the `pom.xml` file in the project root directory, and the multi-module project is detected here.

5. Enter the multi-module build, check the`ruoyi-admin`module, this module is runnable, and other modules are dependent.For specific module functions, please refer to[if according to the official document](https://doc.ruoyi.vip/)Specific module features refer to[若依官方文档](https://doc.ruoyi.vip/)

6. The Maven build parameters can be modified, and no modification is required unless there are special requirements.

7. Confirm the creation and wait for the build to complete.

   ​ It should be noted here that the platform uses**openjdk** by default, and this project needs to use**oraclejdk**to generate the front-end verification code.

   ​ You need to modify `JDK type`in`component > build source`to be a custom JDK, and fill in the custom JDK download path.

   > Custom JDK download address：https://buildpack.oss-cn-shanghai.aliyuncs.com/jdk/jdk1.8.0.tgz

- You need to open **Disable Cache button** to prevent packs from experiencing strange problems as well.Need to open **to disable the cache button**to prevent strange problems with different packages.After the build is successful, disable the cache and turn off the cache, and the correct package will be cached next time.

- Modified **Save Changes**.After modification **save modification**.Build the component, wait for the build to complete, and modify the port to `8080`.

- Enter the topology map interface, switch to edit mode, and establish component dependencies.
  - **ruoyi-ui **connect**ruoyi-admin**.
  - **ruoyi-admin **Connect** Mysql**,**Redis**.

- Update component`ruoyi-ui` `ruoyi-admin`, so far.

- Final effect, topology map：

![tuoputu](https://static.goodrain.com/docs/practice/Vue-SpringBoot-Mysql/tuoputu.png)

- page effect：

![ym](https://static.goodrain.com/docs/practice/Vue-SpringBoot-Mysql/ym.png)
