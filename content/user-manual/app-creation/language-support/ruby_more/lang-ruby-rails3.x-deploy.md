---
title: 部署Rails3.x应用
description: 部署Rails3.x应用
hidden: true
draft: true
---

本篇文档帮助您将基于Rails3.x的应用快速部署到云帮。Sinatra 或其他类型的Ruby应用请参考[构建语言-Ruby](../lang-ruby-overview.html)

## 环境设置

### 基础环境

本文使用 Ubuntu 14.04.2 LTS 系统，root用户操作，Rails 使用3.2.3版本

- 本地安装git命令行或者git的GUI软件

```bash
$ apt-get update
$ apt-get install git
```

- 安装 `Ruby 2.0.0`

```bash
$ cd /tmp/  && mkdir soft && cd soft
$ wget http://cache.ruby-lang.org/pub/ruby/2.0/ruby-2.0.0-p645.tar.gz
$ tar xvzf ruby-2.0.0-p645.tar.gz
$ cd ruby-2.0.0-p645
$ ./configure --prefix=/usr/local/ruby
$ make && make install
$ export PATH=$PATH:/usr/local/ruby/bin/
$ echo 'export PATH=$PATH:/usr/local/ruby/bin/' >> ~/.bashrc
$ ruby -v
ruby 2.0.0p645 (2015-04-13 revision 50299) [x86_64-linux]

# 设置淘宝gem源
$ gem source list
*** CURRENT SOURCES ***

https://rubygems.org/

$ gem sources --remove https://rubygems.org/
https://rubygems.org/ removed from sources

$ gem sources -a https://ruby.taobao.org/
https://ruby.taobao.org/ added to sources

$ gem source -l
*** CURRENT SOURCES ***

https://ruby.taobao.org/
```

- 安装 `Rails 3.2.3`

```bash
$ gem install rails -v 3.2.3
$ rails -v
Rails 3.2.3

# 安装bundle
gem install bundle
```

### 创建应用

#### 创建新应用

```bash
$ mkdir -pv /app/ && cd /app/
$ rails new myapp --database=mysql

# 修改Gemfile，将源替换为taobao地址
$ sed -i s'#rubygems.org#ruby.taobao.org/#g' Gemfile

# 重新生成Gemfile.lock文件
$ bundle install
```

#### 使用已有应用

如果使用现有的应用，请确认使用mysql数据库。

```bash
$ grep mysql2 Gemfile
```

如果没有mysql2标示，请添加:

```bash
$ echo "gem 'mysql2'"  >> Gemfile

# 重新生成 Gemfile.lock文件
$ bundle install
```

#### 数据库配置

当应用部署到云帮时数据库的配置建议使用环境变量的形式，这样可以避免敏感信息泄露，同时又保证了配置的灵活性，下面是一个实例，编辑`config/database.yml`：



```bash
development:
  adapter: mysql2
  encoding: utf8
  reconnect: false
  database: myapp_development
  pool: 5
  username: root
  password:
  host: localhost

test:
  adapter: mysql2
  encoding: utf8
  reconnect: false
  database: myapp_test
  pool: 5
  username: root
  password:
  host: localhost

production:
  adapter: mysql2
  encoding: utf8
  reconnect: true
  pool: 5
  host: <%= ENV['MYSQL_HOST'] %>
  port: <%= ENV['MYSQL_PORT'] %>
  database: myapp
  username: <%= ENV['MYSQL_USER'] %>
  password: <%= ENV['MYSQL_PASSWORD'] %>
```

{{% notice info %}}

development、test 环境的数据库配置请根据本地实际情况填写
production 的MYSQL_开头的环境变量是在云帮关联mysql服务后自动生成的。
production 的数据库需要提前创建

{{% /notice %}}

### Rails 插件

为了Rails应用能够在云帮工作得更好，建议添加`rails_12factor gem`修改`Gemfile`文件添加如下内容：

```bash
$ echo "gem 'rails_12factor', group: :production" >> Gemfile
# 更新依赖文件
$ bundle install
```

#### 设置 Asset Pipeline

从Rails 3.1版本开始引入了Asset Pipeline 的概念，其提供了一个框架，用于连接、压缩 JavaScript 和 CSS 文件。还允许使用其他语言和预处理器编写 JavaScript 和 CSS，例如 CoffeeScript、Sass 和 ERB。

我们建议用户本地生成线上环境的静态资源，这样可以加快线上部署的时间，下面介绍本地操作方法



```bash
RAILS_ENV=production bundle exec rake assets:precompile
/usr/local/ruby/bin/ruby /usr/local/ruby/bin/rake assets:precompile:all RAILS_ENV=production RAILS_GROUPS=assets
Compiled application.js  (0ms)  (pid 1601)
Compiled application.css  (0ms)  (pid 1601)
Compiled application.js  (0ms)  (pid 1601)
Compiled application.css  (0ms)  (pid 1601)
```

{{% notice info %}}

如果执行bundle exec rake assets:precompile 有如下报错：

- ExecJS::RuntimeUnavailable: Could not find a JavaScript runtime. See https://github.com/rails/execjs for a list of available runtimes
- 只需要将Gemfile文件中 # gem 'therubyracer', :platform => :ruby 的注释去掉即可，然后执行 bundle install 安装gem并更新依赖文件
- RAILS_ENV=production bundle exec rake assets:precompile 这条命令设置了RAILS_ENV环境变量为production，是因为部署在云帮上的应用会自动设置RAILS_ENV= production

{{% /notice %}}

为了告知云帮不在构建过程中生成 Asset，需要在config/application.rb配置文件中添加如下配置：



```bash
config.assets.initialize_on_precompile = false
```

### 指定Ruby版本

为了保证线下和线上的ruby版本一直，可以将ruby的版本要求写在Gemfile文件中，这样当程序在云帮部署时就会按照我们的要求安装指定版本的ruby

```bash
$ echo "ruby '2.0.0'" >> Gemfile

# 重新生成依赖文件
$ bundle install
```

点击Ruby语言概述查看云帮支持的ruby版本

#### 配置运行方式

默认情况下，rails在平台使用webrick作为web服务器，但webrick只是为开发环境使用的，问题参见：rails默认web server。我们建议使用Puma作为web服务器，可以参考 使用Puma 部署 Rails 应用 文档，下面介绍使用puma的方法：

1. 安装puma

```bash
echo "gem 'puma'" >> Gemfile

#安装puma
bundle install
```

2. 配置puma

```bash
touch config/puma.rb

vi config/puma.rb
```

将下面部分粘贴到config/puma.rb 文件中



```bash
workers Integer(ENV['WEB_CONCURRENCY'] || 2)
threads_count = Integer(ENV['MAX_THREADS'] || 5)

# 若程序不是线程安全的需要将threads_count设置为1
# threads_count = 1

threads threads_count, threads_count

preload_app!

rackup      DefaultRackup
port        ENV['PORT']     || 3000
environment ENV['RACK_ENV'] || 'development'

on_worker_boot do
  # Valid on Rails up to 4.1 the initializer method of setting `pool` size
  ActiveSupport.on_load(:active_record) do
    config = ActiveRecord::Base.configurations[Rails.env] ||
                Rails.application.config.database_configuration[Rails.env]
    config['pool'] = ENV['MAX_THREADS'] || 5
    ActiveRecord::Base.establish_connection(config)
  end
end
```

### 编写Procfile文件



```bash
echo "web: bundle exec puma -C config/puma.rb" > ./Procfile
```

## 将应用部署到云帮

### 创建应用

操作方法参见：[新建应用-源码构建](/docs/stable/user-app-docs/addapp/addapp-code.html)

### 提交代码

创建应用的最后一步会给出应用的git代码仓库地址，提交用户名是云帮登陆邮箱，密码为平台登陆密码。

命令行下提交代码的命令：

```bash
$ cd /app/myapp
$ git init
$ git add .
# 设置git提交信息，这里根据用户实际情况填写
$ git config --global user.email "demo@goodrain.com"
$ git config --global user.name "demo"
$ git commit -m "init"
$ git remote add origin http://code.goodrain.com/app/团队名_应用名.git
# git push origin master
Username for 'http://code.goodrain.com': 平台登陆邮箱地址
Password for 'http://zyq916@gmail.com@code.goodrain.com': 平台登陆密码
Counting objects: 68, done.
Delta compression using up to 16 threads.
Compressing objects: 100% (52/52), done.
Writing objects: 100% (68/68), 82.08 KiB | 0 bytes/s, done.
Total 68 (delta 2), reused 0 (delta 0)
To http://code.goodrain.com/app/团队名_应用名.git
 * [new branch]      master -> master
```

### 一键部署

新建应用完成根据提示步骤完成点击创建即自动部署。

### 查看日志

部署过程中，部署完成后，应用操作时，可进入[应用控制台-日志](/docs/stable/user-app-docs/myapps/myapp-platform-logs.html)查看日志信息。

### 访问应用

部署并启动成功后可以直接通过应用概览页的 “访问” 按钮打开应用