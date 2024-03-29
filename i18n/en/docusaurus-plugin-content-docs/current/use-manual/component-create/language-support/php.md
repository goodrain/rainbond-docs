---
title: PHP
description: Introduction to the PHP language type Rainbond support specification
---

#### PHP language identification strategy

By default, the platform will identify a PHP project based on whether there are`index.php` files or `composer.json`files in the source root directory.

#### Platform compile and run mechanism

1. The pre-compilation process will detect whether the startup command configuration file [Procfile](./procfile/) is defined, if not, the default War package startup configuration file will be generated;
2. After the pre-compilation process is completed, the PHP buildpack will be selected according to the language type to compile the project. During the compilation process, the defined PHP version will be installed, and related dependency packages will be installed;
3. After the compilation is completed, it will check whether the Procfile parameter is set on the platform. If it is configured, the startup command configuration file Procfile will be rewritten.

```bash
# Install dependencies and resolve dependencies
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
```

#### shell hook support

Make shell hook pair calls by configuring `composer.json`

```json
{
  "scripts": {
    "pre-install-cmd": ["bash ./pre-install-cmd.sh"],
    "post-install-cmd": ["bash ./post-install-cmd .sh"]
  },
  "require": {
    "php": "7.1.21",
    "ext-memcached": "*"
  }
}
```

Among them, the definition content of `pre-install-cmd` will be executed before install,`the definition content of post-install-cmd` will be executed after install, and the definition script must be created in advance and given execution permission

#### PHP project source code specification

In this step, you need to provide a usable PHP source code program for deployment on the Rainbond platform. This application must at least meet the following conditions:

1. Locally working PHP program
2. The source code program must be hosted on a related git or svn service such as gitlab
3. The php file must exist in the root directory of the source code program
4. There must be `composer.json`in the root directory of the source code program, which is used to manage the dependencies of the PHP project and is also a necessary condition for Rainbond to recognize the PHP language. At the same time, the PHP version required by the project must be defined in the file. The definition method is described below.
5. `composer.lock` file must exist in the root directory of the source program project
6. The source program project root directory needs to define `Procfile` to define the program startup method

##### Procfile specification

If the project does not define a Procfile file, the platform will generate a default Procfile to run PHP by default.

```bash
# apache (default)
web: vendor/bin/heroku-php-apache2
# nginx
web: vendor/bin/heroku-php-nginx
```

The above is the default Procfile, if you need to extend, you can customize the Procfile.

##### Composer file

The default source root directory requires `composer.json` and `composer.lock` files to exist, even if the application has no Composer dependencies, it must contain at least one empty (`{}`).`composer.lock` which can be generated by the following command

```php
composer update --ignore-platform-reqs
```

PHP applications can use the dependencies installed by Composer. Usually, the dependencies are installed in the `vendor/` directory, but some projects will redefine this directory. Execute `composer config vendor-dir` to configure the correct path.In most cases to avoid the impact of local installation, it is usually necessary to add the Composer `vendor` directory to your `` When verndor-dir is defined in composer.json, pay attention, you need to define your own Procfile, otherwise the application will fail Normal operation, the Procfile format is similar to `web: /heroku/heroku-buildpack-php/bin/heroku-php-apache2`

```json
   "config" : {
        "vendor-dir": "lib/composer",
        "optimize-autoloader": true
},
```

#### Compile and run environment settings

The platform provides different PHP versions, you can use PHP, HHVM (PHP Code Compiler), or both to improve PHP performance through HHVM.

##### PHP version support

- PHP 5.5.38 (5.5.38)
- PHP 5.6.35 (5.6.35)
- PHP 7.0.29 (7.0.29)
- PHP 7.1.16 (7.1.16)


<!--
- PHP 7.3.3, 7.3.2, 7.3.1, 7.3.0,
- PHP 7.2.16, 7.2.15, 7.2.14, 7.2.13
- PHP 7.1.27, 7.1.26, 7.1.25, 7.1.21, 7.1.16
- PHP 7.0.33, 7.0.29
- PHP 5.6.40, 5.6.39, 5.6.35
- PHP 5.5.38
-->


<!--
##### HHVM版本

- HHVM 3.5.1
-->

The above supported PHP or HHVM versions can be specified through the composer.json file

```json
{
  "require": { "php": "5.6.35" }
}
```


<!--
2. 在您代码的根目录创建`composer.json`配置并使用`HHVM 3.5.1`版本：

{% include copy-clipboard.html %}

```json
{
    "require": {"hhvm": "3.5.1"}
}
```
-->

The version of PHP supports ~5.5.35, which is [Semantic Versioning](http://semver.org/) If the user specifies ~5.5.35, the system will select the highest version of the 5.5 branch from the platform, so the 5.5.35 version will be selected.

#### Extended support

##### PHP 5.6

The following built-in extensions are automatically enabled on Rainbond (this list does not include extensions that PHP enables by default, such as [DOM](http://php.net/manual/book.dom),[JSON](http://php.net/manual/book.json),[PCRE](http://php.net/manual/book.pcre) or [PDO](http://php.net/manual/book.pdo)):

- [Bzip2](http://php.net/manual/book.bzip2)
- [cURL](http://php.net/manual/book.curl)
- [FPM](http://php.net/manual/book.fpm)
- [mcrypt](http://php.net/manual/book.mcrypt)
- [MySQL (PDO)](http://php.net/manual/ref.pdo-mysql) (uses [mysqlnd](http://php.net/manual/book.mysqlnd))
- [MySQLi](http://php.net/manual/book.mysqli) (uses [mysqlnd](http://php.net/manual/book.mysqlnd))
- [OPcache](http://php.net/manual/book.opcache)
- [OpenSSL](http://php.net/manual/book.openssl)
- [PostgreSQL](http://php.net/manual/book.pgsql)
- [PostgreSQL (PDO)](http://php.net/manual/en/ref.pdo-pgsql.php)
- [Readline](http://php.net/manual/book.readline)
- [Sockets](http://php.net/manual/book.sockets)
- [Zip](http://php.net/manual/book.zip)
- [Zlib](http://php.net/manual/book.zlib)

The following built-in extensions have been built as "shared" and can be enabled via composer.json (internal identifier name given in parentheses)：

- [BCMath](http://php.net/manual/book.bc) (`BCMath`)
- [Calendar](http://php.net/manual/book.calendar) (`Calendar`)
- [Exif](http://php.net/manual/book.exif) (`Exif`)
- [FTP](http://php.net/manual/book.ftp) (`ftp`)
- [GD](http://php.net/manual/book.image) (`gd`; with PNG, JPEG and FreeType support)
- [GMP](http://php.net/manual/book.gmp) (`gmp`)
- [gettext](http://php.net/manual/book.gettext) (`gettext`)
- [IMAP](http://php.net/manual/book.imap) (`imap`; with SASL and Kerberos support)
- [intl](http://php.net/manual/book.intl) (`intl`)
- [LDAP](http://php.net/manual/book.ldap) (`ldap`; with SASL support)
- [mbstring](http://php.net/manual/book.mbstring) (`mbstring`)
- [MySQL](http://php.net/manual/en/book.mysql) (`mysql`; note that this extension is deprecated since PHP 5.5, please migrate to MySQLi or PDO)
- [pcntl](http://php.net/manual/book.pcntl) (`pcntl`)
- [Shmop](http://php.net/manual/book.shmop) (`Shmop`)
- [soap](http://php.net/manual/book.soap) (`soap`)
- [SQLite3](http://php.net/manual/book.sqlite3) (`sqlite3`)
- [SQLite (PDO)](http://php.net/manual/en/ref.pdo-sqlite) (`pdo_sqlite`)
- [XMLRPC](http://php.net/manual/book.xmlrpc) (`xmlrpc`)
- [XSL](http://php.net/manual/book.xsl) (`xsl`)

The following 3rd party extensions (internal identifier names given in parentheses) can be enabled via composer.json：

- [APCu](http://pecl.php.net/package/apcu) (`apcu`; provides an apc extension for compatibility with legacy software)
- [Blackfire](http://blackfire.io/) (`Blackfire`)
- [Cassandra](http://datastax.github.io/php-driver/) (`Cassandra`)
- [ev](http://php.net/manual/book.ev) (`ev`)
- [event](http://php.net/manual/book.event) (`event`)
- [ImageMagick](http://php.net/manual/book.imagick) (`ImageMagick`)
- [memcached](http://php.net/manual/book.memcached) (`memcached`; built against a version of libmemcached with SASL support)
- [Mongo](http://php.net/manual/book.mongo) (`Mongo`)
- [MongoDB](http://php.net/manual/book.mongodb) (`mongodb`)
- [New Relic](http://newrelic.com/php) (`newrelic`; will automatically be enabled when the New Relic Add-On is detected during a build)
- [OAuth](http://php.net/manual/book.oauth) (`OAuth`)
- [Phalcon](https://phalconphp.com/) (`Phalcon`)
- [pq](https://mdref.m6w6.name/pq) (`pq`)
- [rdkafka](https://pecl.php.net/package/rdkafka) (`rdkafka`)
- [PHPRedis](http://pecl.php.net/package/redis) (`redis`)

##### PHP 7.0

The following built-in extensions are automatically enabled on Rainbond (this list does not include extensions that PHP enables by default, such as [DOM](http://php.net/manual/book.dom),[JSON](http://php.net/manual/book.json),[PCRE](http://php.net/manual/book.pcre) or [PDO](http://php.net/manual/book.pdo)):

- [Bzip2](http://php.net/manual/book.bzip2)
- [cURL](http://php.net/manual/book.curl)
- [FPM](http://php.net/manual/book.fpm)
- [MySQL (PDO)](http://php.net/manual/ref.pdo-mysql) (uses [mysqlnd](http://php.net/manual/book.mysqlnd))
- [MySQLi](http://php.net/manual/book.mysqli) (uses [mysqlnd](http://php.net/manual/book.mysqlnd))
- [OPcache](http://php.net/manual/book.opcache)
- [OpenSSL](http://php.net/manual/book.openssl)
- [PostgreSQL](http://php.net/manual/book.pgsql)
- [PostgreSQL (PDO)](http://php.net/manual/en/ref.pdo-pgsql.php)
- [Readline](http://php.net/manual/book.readline)
- [Sockets](http://php.net/manual/book.sockets)
- [Zip](http://php.net/manual/book.zip)
- [Zlib](http://php.net/manual/book.zlib)

The following built-in extensions have been built as "shared" and can be enabled via composer.json (internal identifier name given in parentheses)：

- [BCMath](http://php.net/manual/book.bc) (`BCMath`)
- [Calendar](http://php.net/manual/book.calendar) (`Calendar`)
- [Exif](http://php.net/manual/book.exif) (`Exif`)
- [FTP](http://php.net/manual/book.ftp) (`ftp`)
- [GD](http://php.net/manual/book.image) (`gd`; with PNG, JPEG and FreeType support)
- [GMP](http://php.net/manual/book.gmp) (`gmp`)
- [gettext](http://php.net/manual/book.gettext) (`gettext`)
- [IMAP](http://php.net/manual/book.imap) (`imap`; with SASL and Kerberos support)
- [intl](http://php.net/manual/book.intl) (`intl`)
- [LDAP](http://php.net/manual/book.ldap) (`ldap`; with SASL support)
- [mbstring](http://php.net/manual/book.mbstring) (`mbstring`)
- [mcrypt](http://php.net/manual/book.mcrypt) (`mcrypt`)
- [pcntl](http://php.net/manual/book.pcntl) (`pcntl`)
- [Shmop](http://php.net/manual/book.shmop) (`Shmop`)
- [soap](http://php.net/manual/book.soap) (`soap`)
- [SQLite3](http://php.net/manual/book.sqlite3) (`sqlite3`)
- [SQLite (PDO)](http://php.net/manual/en/ref.pdo-sqlite) (`pdo_sqlite`)
- [XMLRPC](http://php.net/manual/book.xmlrpc) (`xmlrpc`)
- [XSL](http://php.net/manual/book.xsl) (`xsl`)

The following 3rd party extensions (internal identifier names given in parentheses) can be enabled via composer.json：

- [APCu](http://pecl.php.net/package/apcu) (`apcu`; provides an apc extension for compatibility with legacy software)
- [Blackfire](http://blackfire.io/) (`Blackfire`)
- [Cassandra](http://datastax.github.io/php-driver/) (`Cassandra`)
- [ev](http://php.net/manual/book.ev) (`ev`)
- [event](http://php.net/manual/book.event) (`event`)
- [ImageMagick](http://php.net/manual/book.imagick) (`ImageMagick`)
- [memcached](http://php.net/manual/book.memcached) (`memcached`; built against a version of libmemcached with SASL support)
- [MongoDB](http://php.net/manual/book.mongodb) (`mongodb`)
- [New Relic](http://newrelic.com/php) (`newrelic`; will automatically be enabled when the New Relic Add-On is detected during a build)
- [OAuth](http://php.net/manual/book.oauth) (`OAuth`)
- [Phalcon](https://phalconphp.com/) (`Phalcon`)
- [pq](https://mdref.m6w6.name/pq) (`pq`)
- [rdkafka](https://pecl.php.net/package/rdkafka) (`rdkafka`)
- [PHPRedis](http://pecl.php.net/package/redis) (`redis`)

##### PHP 7.1

The following built-in extensions are automatically enabled on Rainbond (this list does not include extensions that PHP enables by default, such as [DOM](http://php.net/manual/book.dom),[JSON](http://php.net/manual/book.json),[PCRE](http://php.net/manual/book.pcre) or [PDO](http://php.net/manual/book.pdo)):

- [Bzip2](http://php.net/manual/book.bzip2)
- [cURL](http://php.net/manual/book.curl)
- [FPM](http://php.net/manual/book.fpm)
- [MySQL (PDO)](http://php.net/manual/ref.pdo-mysql) (uses [mysqlnd](http://php.net/manual/book.mysqlnd))
- [MySQLi](http://php.net/manual/book.mysqli) (uses [mysqlnd](http://php.net/manual/book.mysqlnd))
- [OPcache](http://php.net/manual/book.opcache)
- [OpenSSL](http://php.net/manual/book.openssl)
- [PostgreSQL](http://php.net/manual/book.pgsql)
- [PostgreSQL (PDO)](http://php.net/manual/en/ref.pdo-pgsql.php)
- [Readline](http://php.net/manual/book.readline)
- [Sockets](http://php.net/manual/book.sockets)
- [Zip](http://php.net/manual/book.zip)
- [Zlib](http://php.net/manual/book.zlib)

The following built-in extensions have been built as "shared" and can be enabled via composer.json (internal identifier name given in parentheses)：

- [BCmath](http://php.net/manual/book.bc) (`bcmath`)
- [Calendar](http://php.net/manual/book.calendar) (`Calendar`)
- [Exif](http://php.net/manual/book.exif) (`Exif`)
- [FTP](http://php.net/manual/book.ftp) (`ftp`)
- [GD](http://php.net/manual/book.image) (`gd`; with PNG, JPEG and FreeType support)
- [GMP](http://php.net/manual/book.gmp) (`gmp`)
- [gettext](http://php.net/manual/book.gettext) (`gettext`)
- [IMAP](http://php.net/manual/book.imap) (`imap`; with SASL and Kerberos support)
- [intl](http://php.net/manual/book.intl) (`intl`)
- [LDAP](http://php.net/manual/book.ldap) (`ldap`; with SASL support)
- [mbstring](http://php.net/manual/book.mbstring) (`mbstring`)
- [mcrypt](http://php.net/manual/book.mcrypt) (`mcrypt`)
- [pcntl](http://php.net/manual/book.pcntl) (`pcntl`)
- [Shmop](http://php.net/manual/book.shmop) (`Shmop`)
- [soap](http://php.net/manual/book.soap) (`soap`)
- [SQLite3](http://php.net/manual/book.sqlite3) (`sqlite3`)
- [SQLite (PDO)](http://php.net/manual/en/ref.pdo-sqlite) (`pdo_sqlite`)
- [XMLRPC](http://php.net/manual/book.xmlrpc) (`xmlrpc`)
- [XSL](http://php.net/manual/book.xsl) (`xsl`)

The following 3rd party extensions (internal identifier names given in parentheses) can be enabled via composer.json：

- [APCu](http://pecl.php.net/package/apcu) (`apcu`; provides an apc extension for compatibility with legacy software)
- [Blackfire](http://blackfire.io/) (`Blackfire`)
- [Cassandra](http://datastax.github.io/php-driver/) (`Cassandra`)
- [ev](http://php.net/manual/book.ev) (`ev`)
- [event](http://php.net/manual/book.event) (`event`)
- [ImageMagick](http://php.net/manual/book.imagick) (`ImageMagick`)
- [memcached](http://php.net/manual/book.memcached) (`memcached`; built against a version of libmemcached with SASL support)
- [MongoDB](http://php.net/manual/book.mongodb) (`mongodb`)
- [New Relic](http://newrelic.com/php) (`newrelic`; will automatically be enabled when the New Relic Add-On is detected during a build)
- [OAuth](http://php.net/manual/book.oauth) (`OAuth`)
- [Phalcon](https://phalconphp.com/) (`Phalcon`)
- [pq](https://mdref.m6w6.name/pq) (`pq`)
- [rdkafka](https://pecl.php.net/package/rdkafka) (`rdkafka`)
- [PHPRedis](http://pecl.php.net/package/redis) (`redis`)


<!--
##### 默认扩展

以下为Rainbond创建PHP应用时默认开启的扩展：

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


#### 2.4.2 可选扩展

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



##### 自定义扩展

您可以在`composer.json`中添加自定义扩展，这里需要以  **ext-(前缀) **  **+**  **扩展包名** 这样的格式命名扩展包名称，使用  ***** 标识扩展包的版本号。以下是使用`bcmath`, `Memcached`, `MongoDB`和 XSL 的例子：

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


Composer是PHP的依赖管理器，composer.json则是Composer的配置文件，强烈建议使用 “*” 来标识扩展包的版本号。



##### 第三方扩展

以下第三方扩展可以通过 composer.json 开启（包名已在括号内给出）：

- [APCu(apcu)](http://pecl.php.net/package/apcu)(apcu)
- [ImageMagick(imagick)](http://docs.php.net/imagick)(imagick)
- [memcached](http://docs.php.net/memcached)(memcached)
- [MongoDB](http://docs.php.net/mongo)(mongo)
- [New Relic](http://newrelic.com/php)(newrelic)
- [PHPRedis](http://pecl.php.net/package/redis)(redis)
- [Yaf](http://pecl.php.net/package/yaf)(yaf)
- [Phalcon](http://phalconphp.com/)(phalcon)


##### 扩展特例

官方出品过2个mongodb的扩展，一个叫mongo，一个是mongodb。前者已经被官方废弃，不再提供稳定的更新，官方推荐使用后者，并且后者是支持php7的。所以在使用mongodb扩展时，需要在composer.json中指定扩展为mongodb。

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


更多细节扩展支持说明请参考：<a href="../php_more/extensions/" target="_blank">不同版本PHP扩展支持说明</a>


-->

#### Sample demo program

Example[https://github.com/goodrain/php-demo](https://github.com/goodrain/php-demo.git)

#### Recommended reading

Custom Web Server and PHP Environment [Procfile File Description](./procfile)


<!--
## 五、源码编译构建

在部署期间系统会运行以下命令来安装依赖包，解决依赖关系：

```bash
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
```


系统会在每次运行的时候使用`composer self-update` 将Composer自动更新到最新版本。



## 六、配置启动命令

云帮支持 [Apache](http://httpd.apache.org/)，如果您在Profile文件中没有设置加载其中任一服务器，或代码根目录没有 Procfile 文件，应用创建向导会提示用户选择Apache作为Web服务器。

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


### 5.2 Nginx

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

-->
