---
title: PHP 项目部署
description: 在 Rainbond 上通过源代码部署 PHP Web 项目。支持基于 Composer 的通用 PHP 应用，并可配置 PHP 版本、Composer 构建参数、Web 根目录和启动方式。
keywords:
- Rainbond 部署 PHP 项目
- Rainbond 部署 Laravel Symfony ThinkPHP Yii
- Rainbond CNB 构建 PHP
---

本篇文档介绍如何在 Rainbond 平台上通过源代码部署 PHP 项目。

Rainbond 使用 [Cloud Native Buildpacks (CNB)](https://buildpacks.io/) 构建 PHP 项目，自动识别源码、解析 `composer.json` 中的 PHP 版本约束、安装依赖并生成容器镜像。

## 项目识别

Rainbond 通过以下规则识别 PHP 项目：

- **`composer.json`**：源码根目录存在此文件，识别为 PHP 项目

## 支持的项目类型

Rainbond 当前不会对 PHP 框架做单独分流，而是统一按通用 PHP Web 项目处理。

| 类型 | 常见项目 | 说明 |
|------|---------|------|
| 通用 Composer Web 项目 | Laravel、Symfony、ThinkPHP、Yii | 通常需要将 Web 根目录设置为 `public` |
| CMS / 原生 PHP 项目 | WordPress、Discuz!、自研 PHP 站点 | 可直接使用项目根目录或自定义 Web 根目录 |
| 简单入口项目 | 仅包含 `index.php` 的 PHP 应用 | 没有 `composer.json` 也会按 PHP 项目处理 |

## 构建参数

在组件的 **构建源** 页面或构建环境变量中，可以配置以下常用参数：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| PHP 版本 | PHP 运行时版本，优先读取 `composer.json` 中的 `require.php` | `8.3` |
| Web Server | 当前源码部署页面默认使用 Nginx | `nginx` |
| Composer 安装参数 | 追加到 `composer install` 的参数，例如 `--no-dev --optimize-autoloader` | 空 |
| Web 根目录 | 指定 PHP Web 根目录，例如 `public` | 空 |
| 启动方式 | 默认或自定义 | 默认 |

## 支持的 PHP 版本

Rainbond 当前代码中为 PHP CNB 构建预置了以下版本：

- `8.1` `8.2` `8.3`

其中平台默认版本为 `8.3`。

## 启动命令

- [APCu](http://pecl.php.net/package/apcu) (`apcu`; provides an apc extension for compatibility with legacy software)
- [Blackfire](http://blackfire.io) (`blackfire`)
- [Cassandra](http://datastax.github.io/php-driver) (`cassandra`)
- [ev](http://php.net/manual/book.ev) (`ev`)
- [event](http://php.net/manual/book.event) (`event`)
- [ImageMagick](http://php.net/manual/book.imagick) (`imagick`)
- [memcached](http://php.net/manual/book.memcached) (`memcached`; built against a version of libmemcached with SASL support)
- [Mongo](http://php.net/manual/book.mongo) (`mongo`)
- [MongoDB](http://php.net/manual/book.mongodb) (`mongodb`)
- [New Relic](http://newrelic.com/php) (`newrelic`; will automatically be enabled when the New Relic Add-On is detected during a build)
- [OAuth](http://php.net/manual/book.oauth) (`oauth`)
- [Phalcon](https://phalconphp.com) (`phalcon`)
- [pq](https://mdref.m6w6.name/pq) (`pq`)
- [rdkafka](https://pecl.php.net/package/rdkafka) (`rdkafka`)
- [PHPRedis](http://pecl.php.net/package/redis) (`redis`)

#### PHP 7.0

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
- [Blackfire](http://blackfire.io) (`blackfire`)
- [Cassandra](http://datastax.github.io/php-driver) (`cassandra`)
- [ev](http://php.net/manual/book.ev) (`ev`)
- [event](http://php.net/manual/book.event) (`event`)
- [ImageMagick](http://php.net/manual/book.imagick) (`imagick`)
- [memcached](http://php.net/manual/book.memcached) (`memcached`; built against a version of libmemcached with SASL support)
- [MongoDB](http://php.net/manual/book.mongodb) (`mongodb`)
- [New Relic](http://newrelic.com/php) (`newrelic`; will automatically be enabled when the New Relic Add-On is detected during a build)
- [OAuth](http://php.net/manual/book.oauth) (`oauth`)
- [Phalcon](https://phalconphp.com) (`phalcon`)
- [pq](https://mdref.m6w6.name/pq) (`pq`)
- [rdkafka](https://pecl.php.net/package/rdkafka) (`rdkafka`)
- [PHPRedis](http://pecl.php.net/package/redis) (`redis`)

#### PHP 7.1

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
- [Blackfire](http://blackfire.io) (`blackfire`)
- [Cassandra](http://datastax.github.io/php-driver) (`cassandra`)
- [ev](http://php.net/manual/book.ev) (`ev`)
- [event](http://php.net/manual/book.event) (`event`)
- [ImageMagick](http://php.net/manual/book.imagick) (`imagick`)
- [memcached](http://php.net/manual/book.memcached) (`memcached`; built against a version of libmemcached with SASL support)
- [MongoDB](http://php.net/manual/book.mongodb) (`mongodb`)
- [New Relic](http://newrelic.com/php) (`newrelic`; will automatically be enabled when the New Relic Add-On is detected during a build)
- [OAuth](http://php.net/manual/book.oauth) (`oauth`)
- [Phalcon](https://phalconphp.com) (`phalcon`)
- [pq](https://mdref.m6w6.name/pq) (`pq`)
- [rdkafka](https://pecl.php.net/package/rdkafka) (`rdkafka`)
- [PHPRedis](http://pecl.php.net/package/redis) (`redis`)

## 部署示例

1. 进入目标团队，选择 **新建应用** → **从源码构建** → **更多示例选择 PHP Demo**
2. Rainbond 自动识别为 PHP 项目
3. 构建并部署

## 常见问题

### 项目为什么没有被识别为 PHP 项目？

请优先检查源码根目录是否满足以下任一条件：

- 存在 `composer.json`
- 根目录或两层子目录内存在 `index.php`

如果两者都不满足，平台不会按 PHP 项目识别。

### Laravel / Symfony / ThinkPHP 部署后页面 404 或静态资源异常怎么办？

这类项目通常需要把 `Web 根目录` 设置为 `public`。如果保持默认根目录，Nginx 可能不会从正确的入口文件提供服务。

### 需要私有 Composer 仓库认证怎么办？

可以通过组件构建环境变量注入 `COMPOSER_AUTH`。认证信息建议在平台环境变量中维护，不要直接写入源码仓库。

### 需要额外的系统库或 PHP 扩展怎么办？

如果项目依赖额外的系统级库、PHP 扩展，或者需要完全自定义镜像层，建议改用 [使用 Dockerfile 构建组件](./dockefile.md)。

### 需要自定义启动命令怎么办？

你可以通过以下任一方式覆盖默认启动方式：

- 在源码根目录添加 `Procfile`
- 在构建源页面选择自定义启动方式并填写启动命令
