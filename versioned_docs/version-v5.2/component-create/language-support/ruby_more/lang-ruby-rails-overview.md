---
title: Rails应用概述
description: rails应用概述
hidden: true
draft: true
prehidden: true
---

## 代码识别

### Rails 2.x

当`Gemfile.lock`文件包含`rails gem`，并且版本大于等于 2.0.0 小于 3.0.0 的时候，应用 会被识别为 `Rails 2.x` 应用，在部署的时候可以看到

```
——-> Ruby/Rails app detected
```

### Rails 3.x

当`Gemfile.lock`文件包含`railties gem`，并且版本大于等于 3.0.0 小于 4.0.0 的时候，应用 会被识别为 `Rails 3.x`应用，在部署的时候可以看到:

```
——-> Ruby/Rails app detected
```

### Rails 4.x

当`Gemfile.lock`文件包含`railties gem`，并且版本大于等于 4.0.0.beta 小于 5.0.0 的时候，应用 会被识别为 `Rails 4.x` 应用，在部署的时候可以看到

```
——-> Ruby/Rails app detected
```

## 数据库配置

目前云帮支持MySQL数据库服务，用户可以通过创建Ruby 应用关联MySQL服务来使用。参阅 应用控制台-依赖。

### 利用phpmyadmin创建数据库 myapp

#### 修改数据库配置

以 Rails 4.x 为例，修改`config/database.yml`



```bash
production:
  adapter: mysql2
  encoding: utf8
  host: <%= ENV['MYSQL_HOST'] %>
  port: <%= ENV['MYSQL_PORT'] %>
  database: myapp
  username: <%= ENV['MYSQL_USER'] %>
  password: <%= ENV['MYSQL_PASSWORD'] %>
  pool: 5
```



database 配置的myapp数据库必须提前创建



## 运行

所有 Rails 应用在平台运行时都会被设置以下环境变量：



```bash
RAILS_ENV="production"
RACK_ENV="production"
```

### Rails 2.x 默认的启动命令



```bash
web: bundle exec ruby script/server -p $PORT
```

### Rails 3.x 默认的启动命令



```bash
web: bundle exec rails server -p $PORT
```

### Rails 4.x 默认的启动命令



```bash
web: bundle exec bin/rails server -p $PORT -e $RAILS_ENV
```
{{% notice info %}}
虽然针对 Rails 的每个版本都有默认的 web 服务器启动命令，但是我们强烈推荐在正式生产环境中使用Puma 作为 web 服务器。


### 执行 Rake 任务

可以通过制定Procfile文件的形式来执行Rake任务，例如下面的启动命令会执行`db:migrate`任务并启动 Rails：



```bash
web: bundle exec rake db:migrate && bundle exec rails s -b 127.0.0.1 -p $PORT
```

## 构建

### Rails 3.x

系统会在最后的阶段执行 `assets:precompile` 任务来编译静态文件到 `public/assets` 目录。

用户也可以选择在本地执行 `RAILS_ENV=production bundle exec rake assets:precompile` 来编译静态文件并把编译后的结构 push 到版本控制，但 **不推荐** 这样做。如果系统检测到了 `public/assets/manifest.yml`
文件，将会认为你已经在本地编译了静态文件，将不再执行编译。

为防止在编译静态文件时初始化应用和连接到数据库，推荐在 config/application.rb 文件里添加配置：



```bash
config.assets.initialize_on_precompile = false
```


提示：在 Rails 4.x 中，config.assets.initialize_on_precompile 选项已被移除，不需要配置。


#### **插件注入**

[rails_stdout_logging](https://github.com/ddollar/rails_log_stdout/blob/master/init.rb): 确保 Rails 的日志被发送到 STDOUT
[rails3_serve_static_assets](https://github.com/pedro/rails3_serve_static_assets)：让 Rails 3 支持托管静态文件
如果应用的 `Gemfile` 里包含了 `rails_12factor`，系统将不再进行插件注入。

###Rails 4.x

和 Rails 3.x 类似，系统也会为应用执行 `assets:precompile`任务，但条件为：应用定义了 `assets:precompile` 任务
并且不存在 `public/assets/manifest-*.json` 文件，如果此任务执行失败，部署也会失败。

同样，用户也可以在本地编译静态文件并推送到版本控制，系统如果检测到 `public/assets/manifest-*.json`文件，
将会认为用户已编译静态文件，不再执行编译（不推荐）。

####**插件注入**

Rails 4 不再支持插件机制，所以需要换种方式来达到和前面的插件注入类似的效果：使用

`rails_12factor gem`。
此操作需要用户执行，如果部署时系统没有检测到 `rails_12factor gem`，将会发出警告。

添加以下内容到 `Gemfile`，然后执行 `bundle install`：



```bash
gem 'rails_12factor', group: :production
```

默认情况下，Rails 不支持托管静态文件`，rails_12factor` 包含了 `rails_serve_static_assets`，
此 gem 可以使 Rails 具有此能力，只需添加配置：



```bash
config.serve_static_assets = true
```