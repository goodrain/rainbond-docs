---
title: 使用Puma部署Rails应用
description: 使用Puma部署Rails应用
hidden: true
draft: true
prehidden: true
---

## 前言

###WEBrick

Ruby 标准库有一个名为 [WEBrick](http://ruby-doc.org/stdlib-2.1.1/libdoc/webrick/rdoc/WEBrick.html) 的默认 web server。它会随着Ruby的安装自动安装到系统中。大多数开发框架，如Rack和Rails默认使用 WEBrick 作为开发环境的web server。

虽然说 WEBrick 在开发过程极大的方便了开发者调试程序，但它并不能处理大规模的并发任务，因此在生产环境中需要用其它的web server来代替WEBrick。

### 生产环境为什么不能用 WEBrick

默认情况下 WEBrick 是单任务，单线程的。这意味着，如果在同一时刻来了2个请求，第二个请求必须等待第一个请求处理完成后才能被执行。

如果用户没有在 Procfile 文件中指定web server，那么平台会在生产环境中默认运行 WEBrick ，这样一来，如果您的服务有大批量用户访问的话，用户会感觉速度很慢，或者会超时，无法打开，即便是将应用水平扩容到10个节点也无法解决这种问题。

因此，如果您在云帮运行生产环境的应用，一定要更换默认的web server。

### 生产环境 web server

生产环境的 web server 应该具备处理大规模并发任务的能力。我们强烈建议使用 Puma web server。

用户需要将 puma 添加到 Gemfile 文件中，然后在 Procfile 文件中指定用puma来运行Ruby 应用，最后提交代码并在平台上部署，接下来就给大家介绍puma部署Rails应用。

## Puma部署Rails应用

Puma 是 Unicorn 的有力竞争者，他们都可以处理大规模的并发请求。

除了worker进程外，Puma 默认使用线程来处理请求，这样可以更加充分的利用CPU资源。但这要求用户的所有代码都必须是线程安全的，即便不是也没关系，用户仍然可以通过横向(水平)扩展worker进程的方式来达到处理高并发请求的目的。

本篇文档将一步步指导您利用 puma web server 将 Rails 应用部署到云帮。

{{% notice info %}}
将程序部署到生产环境之前，一定要确保再测试环境中可以正常运行。


### 添加 Puma 到程序中

#### Gemfile 文件

首先，添加 puma 到应用的`Gemfile`文件中:



```bash
echo "gem 'puma'" >> Gemfile
```

在本地安装puma



```bash
bundler  install
```

#### Procfile 文件

将 Puma 作为应用的 web 处理程序，用户可以在一行中设置多个参数：



```bash
web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}
```

通常情况下我们建议将puma的配置存成配置文件：



```bash
web: bundle exec puma -C config/puma.rb
```

请确保Procfile的内容正确，并添加到git代码仓库中。

#### 配置文件

可以将puma的配置文件存在`config/puma.rb`或者你喜欢的位置。下面是一个简单的Rails应用配置文件：



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
  # Worker specific setup for Rails 4.1+
  # See: http://docs.goodrain.com/ruby/rails-puma.html#On_worker_boot
  ActiveRecord::Base.establish_connection
end
```

用户需要确认配置了正确的数据库连接并可以正常的连接到数据库。下文会介绍如何设置数据库连接。

#### Workers



```bash
workers Integer(ENV['WEB_CONCURRENCY'] || 2)
```
{{% notice info %}}
WEB_CONCURRENCY
环境变量根据应用的单个实例的内存大小而设置，默认情
况下一个128内存的应用实例默认WEB_CONCURRENCY=2
目前云帮的一个实例的内存固定为128M，后续会支>持自定义调整。同时WEB_CONCURRENCY 变量会随着内存的调整而调整。


#### Threads



```bash
threads_count = Integer(ENV['MAX_THREADS'] || 5)
threads threads_count, threads_count
```

Puma 可以将请求交给一个内部的线程池去处理，这样可以处理更多的并发请求，减少响应时间，同时占用内存更小也可以最大化的使用CPU资源。

Puma 允许用户对线程数做最大和最小的限制，动态的调整操作由Puma主实例来完成。最小的线程数的意思就是当没有请求时线程数最小数目，最大就是说请求量上来后可以开线程的最大数。默认是 0:16 也就是 最小0，最大16，用户可以自由设置。我们建议将最大值和最小值设置为一样的，这样可以有效的处理请求，且不必因为动态调整线程数而浪费CPU资源。

#### Preload app

```bash
preload_app!
```

预加载应用减少了单个Puma worker处理进程的启动时间，可以利用独立的worker使用 on_worker_boot 方法来管理外部的连接。这样的配置可以保证每个worker进程可以使用优雅的方式进行数据库连接。

#### Rackup

```bash
rackup      DefaultRackup
```

使用rackup命令来告诉 Puma如何启动你的rack应用。这个配置默认情况下Rails会自动写入到config.ru文件中。因此后续的Puma可能不需要设置了

#### Port

```bash
port        ENV['PORT']     || 3000
```

云帮应用启动后回自动设置PORT变量，以便可以将应用添加到负载均衡中。本地默认设置为3000 这也是Rails默认值。

#### Environment

```bash
environment ENV['RACK_ENV'] || 'development'
```

设置Puma的环境变量，在上运行的Rails应用默认将ENV['RACK_ENV']设置为'production'

#### On worker boot

`on_worker_boot` 定义部分 是worker启动后未接受请求前执行的部分。主要是解决数据库连接并发问题，如果用户使用的是Rails 4.1+ 则可以直接在 database.yml 设置连接池大小来解决。

```bash
on_worker_boot do
  # Valid on Rails 4.1+ using the `config/database.yml` method of setting `pool` size
  ActiveRecord::Base.establish_connection
end
```

否则必须对这部分进行特定的设置：

```bash
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

默认情况下我们都需要设置数据库连接池大小

如果程序中使用了其他的数据存储，如redis，memcached，postgres等，也需要在pre-load区域设置活动记录的重连机制。如果使用Resque连接到Redis需要使用重连机制：

```bash
on_worker_boot do
  # ...
  if defined?(Resque)
     Resque.redis = ENV["<redis-uri>"] || "redis://127.0.0.1:6379"
  end
end
```

## 线程安全

线程安全的代码可以在多个线程无差错地运行。并非所有的Ruby代码都是线程安全的。如果你的代码和库正在多个线程中运行，很难检测到是否是线程安全的。

直到 Rails 4，出现了一种可以自动切换的线程安全兼容模式。虽然Rails是线程安全的，但并不能保证用户的代码也是。如果你的程序没有在多线程环境中运行过，我们建议部署的时候将最大线程和最小线程数同时设置为1，也就是禁用线程模式

```bash
threads_count = 1
threads threads_count, threads_count
```

即便禁用了线程模式，用户仍然可以调整worker的数量来增加并非处理能力。每个进程是使用独立内存的，即便代码是非线程安全的也可以跨多个进程处理。

## 数据库连接

当调整线程数或进程数后，程序对数据库的连接也会增加，当检测到数据库连接丢失或时断时续情况时，就需要调整数据库的连接池大小。当Rails应用遇到连接池占满的时候会有如下报错：

```bash
ActiveRecord::ConnectionTimeoutError - could not obtain a database connection within 5 seconds
```

这意味着Rails的连接池设置得不够合理

## 部署到云帮

- 添加`puma`到`Gemfile`：

```bash
echo "gem 'puma'" >> Gemfile

# 本地安装puma并重新生成Gemfile.lock文件
bundler  install
```

- `puma.ru`配置文件

```bash
$ cat ./config/puma.rb

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
  # Worker specific setup for Rails 4.1+
  # See: https://devcenter.heroku.com/articles/deploying-rails-applications-with-the-puma-web-server#on-worker-boot
  ActiveRecord::Base.establish_connection
end
```

- 填写Procfile



```bash
echo "web: bundle exec puma -C config/puma.rb" > ./Procfile
```

- 提交代码

```bash
git add .
git commit -m "add puma"
git push origin master
```
