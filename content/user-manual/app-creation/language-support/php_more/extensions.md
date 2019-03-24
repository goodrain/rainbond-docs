---
title: PHP Extensions说明
description: PHP具体扩展支持说明
hidden: true
draft: false
prehidden: true
---

#### PHP 5.6

在Rainbond上自动启用以下内置扩展(此列表不包括默认情况下PHP启用的扩展，例如[DOM](http://php.net/manual/book.dom)，[JSON](http://php.net/manual/book.json)，[PCRE](http://php.net/manual/book.pcre)或[PDO](http://php.net/manual/book.pdo)):

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

以下内置扩展已经构建为“共享”，可以通过composer.json（括号中给出的内部标识符名称）启用：

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

可以通过composer.json启用以下第三方扩展（括号中给出的内部标识符名称）：

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

#### 7.0

在Rainbond上自动启用以下内置扩展(此列表不包括默认情况下PHP启用的扩展，例如[DOM](http://php.net/manual/book.dom)，[JSON](http://php.net/manual/book.json)，[PCRE](http://php.net/manual/book.pcre)或[PDO](http://php.net/manual/book.pdo)):

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

以下内置扩展已经构建为“共享”，可以通过composer.json（括号中给出的内部标识符名称）启用：

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

可以通过composer.json启用以下第三方扩展（括号中给出的内部标识符名称）：

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


#### 7.1

在Rainbond上自动启用以下内置扩展(此列表不包括默认情况下PHP启用的扩展，例如[DOM](http://php.net/manual/book.dom)，[JSON](http://php.net/manual/book.json)，[PCRE](http://php.net/manual/book.pcre)或[PDO](http://php.net/manual/book.pdo)):

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

以下内置扩展已经构建为“共享”，可以通过composer.json（括号中给出的内部标识符名称）启用：

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

可以通过composer.json启用以下第三方扩展（括号中给出的内部标识符名称）：

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