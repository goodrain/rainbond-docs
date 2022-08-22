---
title: static HTML
description: Static Html language type Rainbond support specification introduction
---

#### Static HTML Recognition Strategy

By default, the platform will identify a static language project according to whether there are`index.html`files in the source code root directory.

#### Compilation principle

1. After the pre-compilation process is completed, the static buildpack will be selected according to the language type to compile the project. During the compilation process, the defined web service Nginx or Apache will be installed;
2. After the compilation is completed, it will check whether the Procfile parameter is set on the platform. If it is configured, the startup command configuration file Procfile will be rewritten.

#### Static language project source code specification

1. The source code program must be hosted on a related git or svn service such as gitlab
2. The source root directory needs to have`index.html`files

#### Procfile specification

If Procfile is not defined, the following default Procfile will be generated

```bash
web: sh boot.sh
```

#### Web service support

> The latest stable version of Nginx is used by default

##### Custom Nginx configuration

The nginx configuration file：web.conf needs to be defined in the source root directory. The default configuration file is

```
server {
    listen 80;

    location / {
        root /app/www;
        index index.html index.htm;
    }
}
```

#### sample code

- [Static Html sample code](https://github.com/goodrain/static-demo.git)
