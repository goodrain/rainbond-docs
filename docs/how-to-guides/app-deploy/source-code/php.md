---
title: PHP Project Deployment
description: Deploying PHP Projects via Source Code on Rainbond
---

## Overview

The platform defaults to recognizing PHP projects based on the presence of an `index.php` file or `composer.json` in the root directory of the source code.

### Shell Hook Support

Configure `composer.json` to call shell hooks

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

The content defined in `pre-install-cmd` will be executed before install, and the content defined in `post-install-cmd` will be executed after install. The defined scripts must be created in advance and given execute permissions

### Composer Files

By default, the `composer.json` and `composer.lock` files must exist in the root directory of the source code.`composer.lock` can be generated with the following command

```php
composer update --ignore-platform-reqs
```

### Extension Support

#### PHP 5.6

The following built-in extensions are automatically enabled on Rainbond (this list does not include extensions enabled by default in PHP, such as [DOM](http://php.net/manual/book.dom), [JSON](http://php.net/manual/book.json), [PCRE](http://php.net/manual/book.pcre), or [PDO](http://php.net/manual/book.pdo)):

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

The following built-in extensions have been built as "shared" and can be enabled via composer.json (the internal identifier name is given in parentheses):

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

The following third-party extensions can be enabled via composer.json (the internal identifier name is given in parentheses):

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

#### PHP 7.0

The following built-in extensions are automatically enabled on Rainbond (this list does not include extensions enabled by default in PHP, such as [DOM](http://php.net/manual/book.dom), [JSON](http://php.net/manual/book.json), [PCRE](http://php.net/manual/book.pcre), or [PDO](http://php.net/manual/book.pdo)):

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

The following built-in extensions have been built as "shared" and can be enabled via composer.json (internal identifier names given in parentheses):

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

The following third-party extensions can be enabled via composer.json (internal identifier names given in parentheses):

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

#### PHP 7.1

The following built-in extensions are automatically enabled on Rainbond (this list does not include extensions enabled by default in PHP, such as [DOM](http://php.net/manual/book.dom), [JSON](http://php.net/manual/book.json), [PCRE](http://php.net/manual/book.pcre) or [PDO](http://php.net/manual/book.pdo)):

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

The following built-in extensions have been built as "shared" and can be enabled via composer.json (internal identifier names given in parentheses):

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

The following third-party extensions can be enabled via composer.json (the internal identifier name is given in parentheses):

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

## Deployment example

Go to the team, create a new application and select the source code example for construction, select PHP Demo and default all the next steps.