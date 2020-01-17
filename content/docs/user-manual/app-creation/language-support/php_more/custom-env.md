---
title: 自定义Web Server与PHP环境
description: 运行时环境设置与调试
hidden: true
prehidden: true
---

PHP 有内置的Web Server，但它只适用于debug，生产环境中我们推荐大家通过Procfile文件来描述PHP 使用的Web Server，当然如果你的代码中没有包含Procfile，我们在创建应用向导中会提示你选择一个Web Server。

本篇文档介绍了通过Procfile自定义Web Server，以及如何指定自定义的Web Server配置和PHP的配置。

## 一、自定义Web Server

云帮使用兼容的 [heroku/heroku-buildpack-php](https://packagist.org/packages/heroku/heroku-buildpack-php) 来构建PHP的运行环境，其中包含了利用脚本来启动PHP或HHVM程序，并自动关联 Apache或Nginx 。

可用的启动脚本命令和含义：

| 启动脚本名称              | 说明             |
| ------------------- | -------------- |
| heroku-php-apache2  | PHP & Apache2  |
| heroku-php-nginx    | PHP & Nginx    |

<!--
| heroku-hhvm-apache2 | HHVM & Apache2 |
| heroku-hhvm-nginx   | HHVM & Nginx   |
-->

这些脚本会在构建PHP环境时安装在代码根目录的 vendor/bin 目录中，因此在选择使用不同的启动脚本时需要指定完整执行目录，如：`vendor/bin/heroku-php-apache2`

下面介绍如何在Procfile文件中自定义Web Server：

### 1.1 Nginx＋PHP

```bash
web: vendor/bin/heroku-php-nginx
```

### 1.2 Apache+PHP

```bash
web: vendor/bin/heroku-php-apache2
```

### 1.3 Apache+HHVM

```bash
web: vendor/bin/heroku-hhvm-apache2
```

### 1.4 设置Document Root

很多用户的应用并不是将代码跟目录作为Web Server的主目录，例如利用流行的PHP 框架 Laravel 写的程序，它要求Document root 是 public 目录。

下面的示例使用Apache和PHP，并且将Document root 设置到 跟目录中下的`/public`二级目录中，那么你的Procfile文件应该这样写：

```bash
web: vendor/bin/heroku-php-apache2 public/
```

如果在启动脚本中指定了其它的附加选项 (如下示例中指定了rewrite规则)，你需要保证document root 参数放在所有参数命令的最后面。如果您的代码根目录就是 Document root 那就简单了，直接省略 Document root 的设置即可，如下：

```bash
web: vendor/bin/heroku-php-apache2
```

### 1.5 Apache 默认配置

Apache 使用一个虚拟主机来匹配所有的主机名。类似的选项如下：

```bash
<Directory "${DOCUMENT_ROOT}">
    Options FollowSymLinks

    # allow .htaccess to do everything
    AllowOverride All

    # no limits
    Require all granted
</Directory>
```

所有的以`.php`结尾的文件都将会路由到 `PHP-FPM` 通过 fcgi://heroku-fcgi 的方式来处理。DirectoryIndex 属性设置的是 `index.php`, `index.html`, `index.html`。

### 1.6 Nginx 默认配置

Nginx 使用一个虚拟主机来匹配所有的主机名。document root 没有任何的访问限制。所有的以`.php`结尾的文件都将会路由到 PHP-FPM 通过 fcgi://heroku-fcgi 的方式来处理。DirectoryIndex 属性设置的是 `index.php`, `index.html`, `index.html`。类似的Nginx配置如下：



```bash
upstream php-fpm {
    server unix:/tmp/php-fpm.sock max_fails=3 fail_timeout=3s;
    keepalive 16;
}

server {
    location @php-fcgi {
        fastcgi_pass php-fcgi;
    }

    # 处理所有 .php 文件
    location ~ \.php {
        try_files @php-fcgi @php-fcgi;
    }
```

### 1.7 Web server 设置

用户可以根据自己站点的需要自定义Apache或Nginx的配置。

#### 1.7.1 Apache配置

用户可以定义普通的 `.htaccess` 文件来自定义 Apache HTTP server 的行为。上文已经提到，document root目录的 AllowOverride 选项默认是全开的，因此用户配置 `.htaccess` 文件Apache Web 服务器会自动加载配置。

我们推荐这种方式来自定义Web Server，当然出来这种方式之外，我们还支持传统的apache配置文件的方式来自定义配置，只需要在代码根目录创建一个 配置文件（ 如: `apache_app.conf` ）即可，如下：



```bash
RewriteEngine On

RewriteCond %{REQUEST_URI}::$1 ^(/.+)/(.*)::\2$
RewriteRule ^(.*) - [E=BASE:%1]

RewriteCond %{ENV:REDIRECT_STATUS} ^$
RewriteRule ^app\.php(/(.*)|$) %{ENV:BASE}/$2 [R=301,L]

RewriteCond %{REQUEST_FILENAME} -f
RewriteRule .? - [L]

RewriteRule .? %{ENV:BASE}/app.php [L]
```

这里我配置了一些rewrite规则，当我添加了新的apache配置文件后，只需要在启动描述文件Procfile中添加 -C 参数配置一下就可以加载配置文件了：



```bash
web: vendor/bin/heroku-php-apache2 -C apache_app.conf
```

### 1.7.2 Nginx配置

Nginx可以通过Include的方式将自定义的配置加载到主配置文件中。例如通过在代码根目录下创建`nginx_app.conf`文件的方式来为你的 Symfony2 应用程序配置rewrite规则：



```bash
location / {
    # try to serve file directly, fallback to rewrite
    try_files $uri @rewriteapp;
}

location @rewriteapp {
    # rewrite all to app.php
    rewrite ^(.*)$ /app.php/$1 last;
}

location ~ ^/(app|app_dev|config)\.php(/|$) {
    try_files @heroku-fcgi @heroku-fcgi;
    internal;
}
```
{{% notice note %}}
internal 选项是为了确认到达 `/app.php` 的请求都是通过rewrite过来的。
{{% /notice %}}
与自定义Apache的配置类似，最终需要在Procfile文件中通过-C 参数指定一下新添加的配置文件：

```bash
web: vendor/bin/heroku-php-nginx -C nginx_app.conf
```

### 1.8 默认行为

PHP应用运行会启动一个 FastCGI 进程管理器 (PHP-FPM) 或 HHVM 应用程序Server。 该Server接受来自Apache 或 Nginx 的请求最终执行 PHP 文件。

### 1.9 监听端口

Web server 默认监听5000 端口，这也是平台所有HTTP协议的默认端口，用户不能修改该端口，程序启动后平台会自动将5000端口映射到负载均衡，再由用户类型确定最终对外开放的端口


## 二、自定义 PHP 配置

### 2.1 ini文件配置

云帮提供了多种方式自定义 `php.in`i 中的配置。

- 通过在PHP程序中通过[ini_set](http://docs.php.net/ini_set)的方式；
- 在源码跟目录中添加一个PHP-FPM格式的配置文件，通过Procfile在启动应用时加载；
- 在源码根目录中添加一个 `.user.ini` 文件，PHP-FPM 会在启动时自动加载；

#### 2.1.1 `.user.ini` 文件 (推荐)

PHP 程序执行之前会在其目录下读取 `.user.ini` 文件中的内容来设置相应的参数。因此一般情况下我们只需要将自定义配置的`.user.ini` 文件放在代码根目录就可以了，如果你的 document root 是其它的目录，请根据实际情况操作。

云帮推荐使用 `.user.ini` 文件的方式自定义 PHP 设置。请参考 [PHP 文档](http://docs.php.net/en/configuration.file.per-user.php)来正确设置 `.user.ini`。

> **说明：**
>
> 不必担心这种方式会影响您的程序性能，默认情况下 `user_ini.cache_ttl` 的时间是300秒。当然你还可以将这个时间设置得更长
>
> 例如我们将允许的最大上传文件更改为 5 MB，你可以把一个`.user.ini` 文件放到 document root 目录，内容如下：
>
> ```bash
> upload_max_filesize = 5M
> ```

### 2.2 PHP-FPM 加载配置方式

有一小部分的 PHP.ini 配置不能通过.user.ini的方式来设置，如 always_populate_raw_post_data 这种情况下只能通过设置 PHP 的 FastCGI 进程管理器的方式来实现了。详细使用方式参见 [PHP 手册](http://php.net/manual/zh/)。

例如，将 always_poplate_raw_post_data 设置为 -1 需要在代码的根目录下添加 fpm_custom.conf 文件，内容如下：

```bash
php_value[always_populate_raw_post_data]=-1
```

当然我们还是需要通过Procfile文件来指定这个配置文件：

```bash
web: vendor/bin/heroku-php-nginx -F fpm_custom.conf public/
```

{{% notice info %}}
通过PHP-FPM设置`PHP.ini`有一定的风险，如果参数配置错误会造成PHP-FPM进程无法运行，最终导致应用启动失败，因此在设置之前最好本地设置测试一下，或者可以从应用的日志信息中找到启动失败的原因。
{{% /notice %}}

### 2.3 php环境并发调优

在云帮运行的 PHP 应用，是通过[FastCGI](http://docs.php.net/fpm) 进程管理器 或 HHVM 引擎来管理的。通过FastCGI 协议与Aapache或Nginx进行通讯

FPM 创建及管理子进程来执行相应的PHP程序代码，当然HHVM使用线程达到相同的目的。同一时刻，每一个进程或者线程处理一个来自web server过来的请求（用户请求），也就是说更多的处理进程或者线程可以提升应用的并发处理能力。

PHP 配置中的[内存限制](http://docs.php.net/manual/zh/ini.core.php#ini.memory-limit)是应用到每个处理进程中，当进程内存达到上线时会终止该进程。

## 三、默认配置及行为

### 3.1 PHP-FPM

PHP-FPM 默认是以静态进程管理模式来运行，也就是说它在启动的时候一次性启动一定数量的处理进程。处理进程的数量在云帮是可以动态调整的，通过在高级页面“内存调整”选项可以在增大单个实例的同时提高处理进程的个数，具体内存与处理进程的对应关系参见下面的列表。

| 实例内存 | 单进程最大内存限制 | 进程数  |
| ---- | --------- | ---- |
| 128M | 32M       | 4    |
| 256M | 64M       | 4    |
| 512M | 64M       | 8    |
| 1G   | 64M       | 16   |
| 2G   | 128M      | 16   |
| 4G   | 128M      | 32   |
| 8G   | 128M      | 64   |
| 16G  | 128M      | 128  |
| 32G  | 128M      | 256  |

单线程最大内存限制是可以通过配置文件的形式来调整。当实例内存不变的情况下调整单进程内存限制可以提高并发数量，但大型程序建议采用水平扩容的形式来提高实例个数，这样不但可以提高并发，还可以将请求分散到各个主机更可以提高服务的可用性。

### 3.2 设置单进程内存限制

#### 3.2.1 通过.user.ini 文件来设置

通过在代码根目录下创建一个 `.user.ini` 文件的形式来配置`PHP.INI`中的设置，下面的实例将memory_limit 设置为8M ：

```bash
# linux | mac
echo "memory_limit = 8M" > .user.ini
# windows
echo memory_limit = 8M > .user.ini
```

{{% notice info %}}
内存大小单位是M，请使用大写
{{% /notice %}}
如果用户代码不再根目录，需要在Procfile中指定根目录位置，然后再将.user.ini放在代码根目录中。
修改完文件后提交代码，部署应用时会看到如下日志信息：

```bash
Application ready for connections on port 5000.
Starting httpd...
Starting php-fpm...
16 processes at 8MB memory limit.
Optimizing php-fpm worker for 128M Memory....
```

通过附加的fpm配置文件来设置
除了使用 .user.ini 文件来自定义配置外，还可以用PHP-FPM Include的方式来追加配置，使用 `php_value` 或 `php_admin_value`指令来设置`memory_limit`的值。例如，将单进程最大内存设置为64M，你可以创建一个名为 `fpm_custom.conf` 文件，内容如下：

```bash
php_value[memory_limit] = 64M
```

想要这个配置生效，还需要代码根目录中创建 Procfile文件，通过 -F 参数指定一下，这样php-fpm启动的时候就可以加载这个自定义的配置文件了，下面是Procfile文件的内容示例：

```bash
web: vendor/bin/heroku-php-apache2 -F fpm_custom.conf
```

通过`WEB_CONCURRENCY` 变量定义进程数
可以直接在应用的高级页面定义`WEB_CONCURRENCY` 变量，该变量是数值类型，直接对php-fpm的进程数起作用。

{{% notice info %}}

初级用户 不建议使用`WEB_CONCURRENCY`变量来定义php-fpm进程数，服务的并发处理能力不单单由进程数决定的，如果单示例的内存过小，开过多的进程反而降低处理能力。

{{% /notice %}}

### 3.3 自定义配置的优先级

`WEB_CONCURRENCY` —> `fpm配置文件` —-> `.user.info`

从左到右优先级从高到底

{{% notice info %}}

- 单独的调整php-fpm进程数并不一定能提高并发数，需要与单个实例的内存大小动态调整
- 水平扩容的效果要好于单独实例的优化效果。建议多开实例数
- 请选择一种进程调节的方法，不要多个方法同时存在。

{{% /notice %}}