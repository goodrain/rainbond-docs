---
title: PHP
description: PHP语言类型Rainbond支持规范介绍
---

#### PHP 语言识别策略

平台默认会根据源码根目录是否有`index.php` 文件或者 `composer.json`来识别为 PHP 项目.

#### 平台编译运行机制

1. 预编译处理会探测是否定义了启动命令配置文件 [Procfile](./procfile/) ,如果未定义会生成默认 War 包启动配置文件;
2. 预编译处理完成后,会根据语言类型选择 PHP 的 buildpack 去编译项目.在编译过程中会安装定义的 PHP 版本,安装相关依赖包;
3. 编译完成后会检查是否在平台设置了 Procfile 参数,若配置了会重写启动命令配置文件 Procfile.

```bash
# 安装依赖包，解决依赖关系
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
```

#### shell hook 支持

通过配置 `composer.json` 进行 shell hook 对调用

```json
{
  "scripts": {
    "pre-install-cmd": ["bash ./pre-install-cmd.sh"],
    "post-install-cmd": ["bash ./post-install-cmd.sh"]
  },
  "require": {
    "php": "7.1.21",
    "ext-memcached": "*"
  }
}
```

其中 `pre-install-cmd` 定义内容会在 install 前执行，`post-install-cmd` 定义内容会在 install 后执行，定义脚本必须提前创建并赋予执行权限

#### PHP 项目源码规范

在此步骤中，你需要提供一个可用的 PHP 源码程序用来部署在 Rainbond 平台上,此应用程序至少需要满足如下条件:

1. 本地可以正常运行的 PHP 程序
2. 源码程序必须托管在 gitlab 等相关 git 或者 svn 服务上
3. 源码程序根目录下必须需要存在 php 文件
4. 源码程序根目录下必须存在 `composer.json`,用来管理 PHP 项目的依赖,也是 Rainbond 识别为 PHP 语言的必要条件,同时文件中必须定义项目需要的 php 版本，定义方式见下文。
5. 源码程序项目根目录下必须存在 `composer.lock` 文件
6. 源码程序项目根目录下需要定义 `Procfile` ,用来定义程序启动方式

##### Procfile 规范

如果项目未定义 Procfile 文件,平台默认会生成默认 Procfile 来运行 PHP。

```bash
# apache (默认)
web: vendor/bin/heroku-php-apache2
# nginx
web: vendor/bin/heroku-php-nginx
```

上述是默认 Procfile,如果需要扩展,可以自定义 Procfile。

##### Composer 文件

默认源码根目录需要存在 `composer.json` 和 `composer.lock` 文件, 即使应用程序没有 Composer 依赖项，它也必须至少包含一个空（`{}`）。`composer.lock` 其中可以通过如下命令生成

```php
composer update --ignore-platform-reqs
```

PHP 应用程序可以使用 Composer 安装的依赖项,通常会将依赖项安装到 `vendor/` 目录，但是部分项目会重新定义这个目录，执行 `composer config vendor-dir` 配置正确的路径。大多数情况下避免本地安装影响，通常需要将 Composer `vendor` 目录添加到你的 `.gitignore`
当在 composer.json 中定义了 verndor-dir 时需注意,需要自行定义 Procfile 否则会导致应用无法正常运行，Procfile 格式类似 `web: <vendor-dir>/heroku/heroku-buildpack-php/bin/heroku-php-apache2`

```json
   "config" : {
        "vendor-dir": "lib/composer",
        "optimize-autoloader": true
    },
```

#### 编译运行环境设置

平台提供了不同的 PHP 版本，您可以使用 PHP，HHVM(PHP 代码编译器)，或者同时使用二者，通过 HHVM 提高 PHP 性能。

##### PHP 版本支持

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

可以通过 composer.json 文件来指定上述支持的 PHP 或 HHVM 版本

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

PHP 的版本支持 ~5.5.35 这种 [Semantic Versioning](http://semver.org/) 的形式，如果用户指定~5.5.35 系统会从平台中选择 5.5 分支版本最高的版本，因此会选择 5.5.35 版本。

#### 扩展支持

##### PHP 5.6

在 Rainbond 上自动启用以下内置扩展(此列表不包括默认情况下 PHP 启用的扩展，例如 [DOM](http://php.net/manual/book.dom)，[JSON](http://php.net/manual/book.json)，[PCRE](http://php.net/manual/book.pcre) 或 [PDO](http://php.net/manual/book.pdo)):

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

以下内置扩展已经构建为“共享”，可以通过 composer.json（括号中给出的内部标识符名称）启用：

- [BCMath](http://php.net/manual/book.bc) (`bcmath`)
- [Calendar](http://php.net/manual/book.calendar) (`calendar`)
- [Exif](http://php.net/manual/book.exif) (`exif`)
- [FTP](http://php.net/manual/book.ftp) (`ftp`)
- [GD](http://php.net/manual/book.image) (`gd`; with PNG, JPEG and FreeType support)
- [GMP](http://php.net/manual/book.gmp) (`gmp`)
- [gettext](http://php.net/manual/book.gettext) (`gettext`)
- [IMAP](http://php.net/manual/book.imap) (`imap`; with SASL and Kerberos support)
- [intl](http://php.net/manual/book.intl) (`intl`)
- [LDAP](http://php.net/manual/book.ldap) (`ldap`; with SASL support)
- [mbstring](http://php.net/manual/book.mbstring) (`mbstring`)
- [MySQL](http://php.net/manual/en/book.mysql) (`mysql`; note that this extension is deprecated since PHP 5.5, please migrate to MySQLi or PDO)
- [PCNTL](http://php.net/manual/book.pcntl) (`pcntl`)
- [Shmop](http://php.net/manual/book.shmop) (`shmop`)
- [SOAP](http://php.net/manual/book.soap) (`soap`)
- [SQLite3](http://php.net/manual/book.sqlite3) (`sqlite3`)
- [SQLite (PDO)](http://php.net/manual/en/ref.pdo-sqlite) (`pdo_sqlite`)
- [XMLRPC](http://php.net/manual/book.xmlrpc) (`xmlrpc`)
- [XSL](http://php.net/manual/book.xsl) (`xsl`)

可以通过 composer.json 启用以下第三方扩展（括号中给出的内部标识符名称）：

- [APCu](http://pecl.php.net/package/apcu) (`apcu`; provides an apc extension for compatibility with legacy software)
- [Blackfire](http://blackfire.io/) (`blackfire`)
- [Cassandra](http://datastax.github.io/php-driver/) (`cassandra`)
- [ev](http://php.net/manual/book.ev) (`ev`)
- [event](http://php.net/manual/book.event) (`event`)
- [ImageMagick](http://php.net/manual/book.imagick) (`imagick`)
- [memcached](http://php.net/manual/book.memcached) (`memcached`; built against a version of libmemcached with SASL support)
- [Mongo](http://php.net/manual/book.mongo) (`mongo`)
- [MongoDB](http://php.net/manual/book.mongodb) (`mongodb`)
- [New Relic](http://newrelic.com/php) (`newrelic`; will automatically be enabled when the New Relic Add-On is detected during a build)
- [OAuth](http://php.net/manual/book.oauth) (`oauth`)
- [Phalcon](https://phalconphp.com/) (`phalcon`)
- [pq](https://mdref.m6w6.name/pq) (`pq`)
- [rdkafka](https://pecl.php.net/package/rdkafka) (`rdkafka`)
- [PHPRedis](http://pecl.php.net/package/redis) (`redis`)

##### PHP 7.0

在 Rainbond 上自动启用以下内置扩展(此列表不包括默认情况下 PHP 启用的扩展，例如 [DOM](http://php.net/manual/book.dom)，[JSON](http://php.net/manual/book.json)，[PCRE](http://php.net/manual/book.pcre) 或 [PDO](http://php.net/manual/book.pdo)):

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

以下内置扩展已经构建为“共享”，可以通过 composer.json（括号中给出的内部标识符名称）启用：

- [BCMath](http://php.net/manual/book.bc) (`bcmath`)
- [Calendar](http://php.net/manual/book.calendar) (`calendar`)
- [Exif](http://php.net/manual/book.exif) (`exif`)
- [FTP](http://php.net/manual/book.ftp) (`ftp`)
- [GD](http://php.net/manual/book.image) (`gd`; with PNG, JPEG and FreeType support)
- [GMP](http://php.net/manual/book.gmp) (`gmp`)
- [gettext](http://php.net/manual/book.gettext) (`gettext`)
- [IMAP](http://php.net/manual/book.imap) (`imap`; with SASL and Kerberos support)
- [intl](http://php.net/manual/book.intl) (`intl`)
- [LDAP](http://php.net/manual/book.ldap) (`ldap`; with SASL support)
- [mbstring](http://php.net/manual/book.mbstring) (`mbstring`)
- [mcrypt](http://php.net/manual/book.mcrypt) (`mcrypt`)
- [PCNTL](http://php.net/manual/book.pcntl) (`pcntl`)
- [Shmop](http://php.net/manual/book.shmop) (`shmop`)
- [SOAP](http://php.net/manual/book.soap) (`soap`)
- [SQLite3](http://php.net/manual/book.sqlite3) (`sqlite3`)
- [SQLite (PDO)](http://php.net/manual/en/ref.pdo-sqlite) (`pdo_sqlite`)
- [XMLRPC](http://php.net/manual/book.xmlrpc) (`xmlrpc`)
- [XSL](http://php.net/manual/book.xsl) (`xsl`)

可以通过 composer.json 启用以下第三方扩展（括号中给出的内部标识符名称）：

- [APCu](http://pecl.php.net/package/apcu) (`apcu`; provides an apc extension for compatibility with legacy software)
- [Blackfire](http://blackfire.io/) (`blackfire`)
- [Cassandra](http://datastax.github.io/php-driver/) (`cassandra`)
- [ev](http://php.net/manual/book.ev) (`ev`)
- [event](http://php.net/manual/book.event) (`event`)
- [ImageMagick](http://php.net/manual/book.imagick) (`imagick`)
- [memcached](http://php.net/manual/book.memcached) (`memcached`; built against a version of libmemcached with SASL support)
- [MongoDB](http://php.net/manual/book.mongodb) (`mongodb`)
- [New Relic](http://newrelic.com/php) (`newrelic`; will automatically be enabled when the New Relic Add-On is detected during a build)
- [OAuth](http://php.net/manual/book.oauth) (`oauth`)
- [Phalcon](https://phalconphp.com/) (`phalcon`)
- [pq](https://mdref.m6w6.name/pq) (`pq`)
- [rdkafka](https://pecl.php.net/package/rdkafka) (`rdkafka`)
- [PHPRedis](http://pecl.php.net/package/redis) (`redis`)

##### PHP 7.1

在 Rainbond 上自动启用以下内置扩展(此列表不包括默认情况下 PHP 启用的扩展，例如 [DOM](http://php.net/manual/book.dom)，[JSON](http://php.net/manual/book.json)，[PCRE](http://php.net/manual/book.pcre) 或 [PDO](http://php.net/manual/book.pdo)):

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

以下内置扩展已经构建为“共享”，可以通过 composer.json（括号中给出的内部标识符名称）启用：

- [BCMath](http://php.net/manual/book.bc) (`bcmath`)
- [Calendar](http://php.net/manual/book.calendar) (`calendar`)
- [Exif](http://php.net/manual/book.exif) (`exif`)
- [FTP](http://php.net/manual/book.ftp) (`ftp`)
- [GD](http://php.net/manual/book.image) (`gd`; with PNG, JPEG and FreeType support)
- [GMP](http://php.net/manual/book.gmp) (`gmp`)
- [gettext](http://php.net/manual/book.gettext) (`gettext`)
- [IMAP](http://php.net/manual/book.imap) (`imap`; with SASL and Kerberos support)
- [intl](http://php.net/manual/book.intl) (`intl`)
- [LDAP](http://php.net/manual/book.ldap) (`ldap`; with SASL support)
- [mbstring](http://php.net/manual/book.mbstring) (`mbstring`)
- [mcrypt](http://php.net/manual/book.mcrypt) (`mcrypt`)
- [PCNTL](http://php.net/manual/book.pcntl) (`pcntl`)
- [Shmop](http://php.net/manual/book.shmop) (`shmop`)
- [SOAP](http://php.net/manual/book.soap) (`soap`)
- [SQLite3](http://php.net/manual/book.sqlite3) (`sqlite3`)
- [SQLite (PDO)](http://php.net/manual/en/ref.pdo-sqlite) (`pdo_sqlite`)
- [XMLRPC](http://php.net/manual/book.xmlrpc) (`xmlrpc`)
- [XSL](http://php.net/manual/book.xsl) (`xsl`)

可以通过 composer.json 启用以下第三方扩展（括号中给出的内部标识符名称）：

- [APCu](http://pecl.php.net/package/apcu) (`apcu`; provides an apc extension for compatibility with legacy software)
- [Blackfire](http://blackfire.io/) (`blackfire`)
- [Cassandra](http://datastax.github.io/php-driver/) (`cassandra`)
- [ev](http://php.net/manual/book.ev) (`ev`)
- [event](http://php.net/manual/book.event) (`event`)
- [ImageMagick](http://php.net/manual/book.imagick) (`imagick`)
- [memcached](http://php.net/manual/book.memcached) (`memcached`; built against a version of libmemcached with SASL support)
- [MongoDB](http://php.net/manual/book.mongodb) (`mongodb`)
- [New Relic](http://newrelic.com/php) (`newrelic`; will automatically be enabled when the New Relic Add-On is detected during a build)
- [OAuth](http://php.net/manual/book.oauth) (`oauth`)
- [Phalcon](https://phalconphp.com/) (`phalcon`)
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

#### 示例 demo 程序

示例[https://github.com/goodrain/php-demo](https://github.com/goodrain/php-demo.git)

#### 推荐阅读

自定义 Web Server 与 PHP 环境
[Procfile 文件说明](./procfile)

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
