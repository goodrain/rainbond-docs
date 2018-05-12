---
title: 云帮支持PHP
summary: 云帮可以将PHP应用更快速的部署到平台。
toc: false
---
<div id="toc"></div>

&emsp;&emsp;云帮可以将PHP应用更快速的部署到平台。无论是倾向`Symfony`或`Laravel`等开发框架，还是使用非开发框架，或者可以通过环境配置文件可以自定义Web Server或`php.ini`的参数等，云帮在不改变开发习惯下，让PHP程序自由快速运行在平台。

## 代码识别

云帮识别您的代码为PHP语言，需要您在代码的根目录下确认有` index.php` 文件或者 `composer.json `文件。

{{site.data.alerts.callout_success}}

如果根目录存在` composer.lock`文件会优化读取`composer.lock`的配置，忽略掉 `composer.json`，需删除composer.phar

{{site.data.alerts.end}}

## 支持版本

平台提供了不同的PHP版本，您可以使用PHP，HHVM(PHP代码编译器)，或者同时使用二者，通过HHVM提高PHP性能。

### PHP版本

- PHP 5.5 (5.5.38)
- PHP 5.6 (5.6.11, 5.6.30, 5.6.35)(默认)
- PHP 7.0 (7.0.16, 7.0.29)
- PHP 7.1 (7.1.2, 7.1.16)

### HHVM版本

- HHVM 3.5.1

### 选择PHP版本

有两种方式指定PHP版本：

- 通过平台创建应用向导中选择。
- 通过配置`composer.json`文件来实现：

1. 在您代码的根目录创建`composer.json`文件，指定使用`PHP 5.6.35`版本，文件具体内容如下：


{% include copy-clipboard.html %}

```json
{
	"require": {"php": "5.6.35"}
}
```

2. 在您代码的根目录创建`composer.json`配置并使用`HHVM 3.5.1`版本：

{% include copy-clipboard.html %}

```json
{
	"require": {"hhvm": "3.5.1"}
}
```
{{site.data.alerts.callout_success}}
PHP 的版本支持 ~5.5.35 这种 [Semantic Versioning](http://semver.org/) 的形式，如果用户指定~5.5.35系统会从平台中选择5.5分支版本最高的版本，因此会选择5.5.35版本。
{{site.data.alerts.end}}

### 扩展

云帮创建PHP应用时支持添加扩展。您可以在创建应用时通过向导提供的扩展进行选择添加；或者自定义扩展，云帮会在构建过程中将您自定义的扩展添加：

#### 通过云帮构建向导

##### 默认扩展

以下为云帮创建PHP应用时默认开启的扩展：

- [Bzip2](http://docs.php.net/bzip2)
- [cURL](http://docs.php.net/curl)
- [FPM](http://docs.php.net/fpm)
- [mcrypt](http://docs.php.net/mcrypt)
- [MySQL(PDO)](http://docs.php.net/pdo_mysql) (使用 [mysqlnd](http://docs.php.net/mysqlnd))
- [MySQLi](http://docs.php.net/mysqli) (使用 [mysqlnd](http://docs.php.net/mysqlnd))
- [OPcache](http://docs.php.net/opcache)
- [OpenSSL](http://docs.php.net/openssl)
- [PostgreSQL](http://docs.php.net/pgsql)
- [PostgreSQL(PDO)](http://docs.php.net/pdo_pgsql)
- [Readline](http://docs.php.net/readline)
- [Sockets](http://docs.php.net/sockets)
- [Zip](http://docs.php.net/zip)
- [Zlib](http://docs.php.net/zlib)

##### 可选扩展

您可以在应用创建的向导中选择添加除默认扩展外的其他扩展(扩展名对应包名在下列括号中给出)：

- [BCMath](http://docs.php.net/bcmath)(bcmath)
- [Calendar](http://docs.php.net/calendar)(calendar)
- [Exif](http://docs.php.net/exif)(exif)
- [FTP](http://docs.php.net/ftp)(ftp)
- [GD](http://docs.php.net/manual/en/book.image.php)(gd)
- [gettext](http://docs.php.net/gettext)(gettext)
- [intl](http://docs.php.net/intl)(intl)
- [mbstring](http://docs.php.net/mbstring)(mbstring)
- [MySQL](http://docs.php.net/book.mysql)(mysql，注意，该扩展已经在php 5.5中废弃,推荐使用 MySQLi 或 PDO)
- [PCNTL](http://docs.php.net/pcntl)(pcntl)
- [Shmop](http://docs.php.net/shmop)(shmop)
- [SOAP](http://docs.php.net/soap)(soap)
- [SQLite3](http://docs.php.net/sqlite3)(sqlite3)
- [SQLite](http://docs.php.net/pdo_sqlite)(PDO)(pdo_sqlite)
- [XMLRPC](http://docs.php.net/xmlrpc)(xmlrpc)
- [XSL](http://docs.php.net/xsl)(xsl)

#### 自定义扩展

您可以在`composer.json`中添加自定义扩展，这里需要以  **ext-(前缀) **  **+**  **扩展包名** 这样的格式命名扩展包名称，使用  ***** 标识扩展包的版本号。以下是使用`bcmath`, `Memcached`, `MongoDB`和 XSL 的例子：

{% include copy-clipboard.html %}

```json
{
    "require": {
        "ext-bcmath": "*",
        "ext-memcached": "*",
        "ext-mongo": "*",
        "ext-xsl": "*"
    }
}
```

{{site.data.alerts.callout_success}}

composer是PHP的依赖管理器，composer.json则是composer的配置文件，强烈建议使用 “*” 来标识扩展包的版本号。

{{site.data.alerts.end}}

#### 第三方扩展

以下第三方扩展可以通过 composer.json 开启（包名已在括号内给出）：

- [APCu(apcu)](http://pecl.php.net/package/apcu)(apcu)
- [ImageMagick(imagick)](http://docs.php.net/imagick)(imagick)
- [memcached](http://docs.php.net/memcached)(memcached)
- [MongoDB](http://docs.php.net/mongo)(mongo)
- [New Relic](http://newrelic.com/php)(newrelic)
- [PHPRedis](http://pecl.php.net/package/redis)(redis)
- [Yaf](http://pecl.php.net/package/yaf)(yaf)
- [Phalcon](http://phalconphp.com/)(phalcon)

{{site.data.alerts.callout_success}}

HHVM 暂时不支持自定义扩展

{{site.data.alerts.end}}


#### 扩展特例

官方出品过2个mongodb的扩展，一个叫mongo，一个是mongodb。前者已经被官方废弃，不再提供稳定的更新，官方推荐使用后者，并且后者是支持php7的。所以在使用mongodb扩展时，需要在composer.json中指定扩展为mongodb。

{% include copy-clipboard.html %}

```json
{
    "require": {
                "php": "~7.1.16",
                "ext-memcached": "*",
                "ext-mongodb": "*",
                "ext-mbstring": "*"
    }
}
```

## 构建

在部署期间系统会运行以下命令来安装依赖包，解决依赖关系：

```bash
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
```

{{site.data.alerts.callout_success}}

系统会在每次运行的时候使用`composer self-update` 将composer自动更新到最新版本。

{{site.data.alerts.end}}

## Web 服务器

云帮支持 [Apache](http://httpd.apache.org/) 和 [Nginx](http://nginx.org/) 两种 Web 服务器，如果您在Profile文件中没有设置加载其中任一服务器，或代码根目录没有 Procfile 文件，应用创建向导会提示用户选择Apache或Nginx作为Web服务器。

### Apache服务器

Apache接口与PHP-FPM或HHVM通过FastCGI使用 `mod_proxy_fcgi`。

> 名词释义：
>
> **FastCGI**：快速网关接口，是一种让交互程序与Web服务器通信的协议，早期通用网关接口(CGI)的增强版本
>
> **PHP-FPM**：是一个FastCGI管理器，旨在将FastCGI进程管理整合进**PHP**包中
>
> **HHVM**：PHP代码编译器

在您代码的根目录下创建 Procfile 文件，填写以下内容来开启 PHP-FPM：

```bash
web: vendor/bin/heroku-php-apache2
```

如果要运行 HHVM 的话，Procfile 内容如下：

```bash
web: vendor/bin/heroku-hhvm-apache2
```

您可以通过 .htaccess 文件来自定义 Apache 的行为，也可以使用自定义 Apache 配置文件的方式。例如；

将以下内容保存在根目录下命名为 apache_app.conf：

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

然后修改 Procfile 文件加载此配置：

```bash
web: vendor/bin/heroku-php-apache2 -C apache_app.conf
```

### Nginx

Nginx 使用 FastCGI 连接 PHP-FPM，使用下面的 Procfile 开启 Nginx：

```bash
web: vendor/bin/heroku-php-nginx
```

如果要运行 HHVM 的话，Procfile 内容如下：

```bash
web: vendor/bin/heroku-hhvm-nginx
```

Nginx 服务器同样支持自定义配置，以下是一个 URL 重写的例子：

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
    fastcgi_pass heroku-fcgi;
    fastcgi_split_path_info ^(.+\.php)(/.*)$;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_param HTTPS off;
}

```

将其保存在根目录下命名为为 nginx_app.conf ，修改 Procfile 文件为以下内容即可：

```bash
web: vendor/bin/heroku-php-nginx -C nginx_app.conf
```