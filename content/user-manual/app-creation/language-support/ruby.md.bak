---
title: Ruby
description: Ruby语言类型Rainbond支持规范介绍
weight: 3322
hidden: true
---

## 一、代码识别

您代码的根目录下需要有 `Gemfile` 文件，即使没有任何 gem 依赖，也就是一个空的 `Gemfile`也可以。云帮会通过此条件识别语言类别。针对不同的ruby web开发框架有如下识别方式：

- 源码根目录存在 [config.ru](http://config.ru/) 文件，会被识别为 Rack 应用。
- 源码跟目录存在 config/environment.rb 文件，会被识别为Rails 2 应用。
- 源码根目录存在 config/application.rb文件且文件中包含Rails::Application 字符串，会被识别为Rails 3应用。

{{% notice note %}}

云帮使用`Bundler 1.7.12`来进行项目的依赖管理，用户无法指定版本。

{{% /notice %}}

## 二、环境变量

云帮会在ruby应用运行时，自动设置以下环境变量：

```bash
GEM_PATH => vendor/bundle/#{RUBY_ENGINE}/#{RUBY_ABI_VERSION}
LANG => en-us
PATH => bin:vendor/bundle/#{RUBY_ENGINE}/#{RUBY_ABI_VERSION}/bin:/usr/local/bin:/usr/bin:/bin
```

{{% notice note %}}

`GEM_PATH` 设置`/vendor`目录主要用来帮助`bundler`管理`gem`

{{% /notice %}}

## 三、构建(build)

当应用部署时，会触发构建行为，这时 `RAILS_ENV` 或 `RACK_ENV` 变量被设置为 `production` 。Rails 4.1+ 版本 可以通过`DATABASE_URL`环境变量设置`database.yml`文件中的 `url` 来配置数据库。目前云帮还未支持该特性，后续会支持。

## 四、支持的运行时环境

系统默认会使用 `Ruby 2.0.0`。当然，你也可以自己指定一个要使用的版本，云帮支持大部分的 ruby 版本。

### 4.1 MRI

- 1.8.7 : patchlevel 376, Rubygems : 1.8.24
- 1.9.2 : patchlevel 327, Rubygems : 1.3.7.1
- 1.9.3 : patchlevel 547, Rubygems : 1.8.23.2
- 2.0.0 : patchlevel 576, Rubygems : 2.0.14
- 2.1.6 : patchlevel 336, Rubygems : 2.2.2
- 2.2.2 : patchlevel 95, Rubygems: ; 2.4.5

{{% notice info %}}
  注意：Ruby 1.8.7 和 Ruby 1.9.2 官方已经停止支持，不再提供更新，不推荐使用。

{{% /notice %}}

### 4.2 JRuby

- 1.7.20, Ruby 版本: [1.9.3], Java 版本:1.7.0_45-b31

## 五、可用的运行时环境

其它版本的 JRuby 也在支持范围内。

### 5.1 JRuby

- 1.7.1, Ruby 版本: [1.8.7, 1.9.3], Java 版本: 1.7.0_25-b30
- 1.7.2, Ruby 版本: [1.8.7, 1.9.3], Java 版本: 1.7.0_25>b30
- 1.7.3, Ruby 版本: [1.8.7, 1.9.3], Java 版本: 1.7.0_25-b30
- 1.7.4, Ruby 版本: [1.8.7, 1.9.3], Java 版本: 1.7.0_45-b31
- 1.7.5, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 1.7.0_45-b31
- 1.7.6, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 1.7.0_45-b31
- 1.7.8, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 1.7.0_45-b31
- 1.7.9, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 1.7.0_45-b31
- 1.7.10, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 1.7.0_45-b31
- 1.7.11, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 1.7.0_45-b31
- 1.7.12, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 1.7.0_45-b31
- 1.7.13, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 1.7.0_45-b31
- 1.7.14, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 1.7.0_45-b31
- 1.7.15, Ruby 版本: [1.8.7, 2.0.0 (experimental)], Java 版本: 1.7.0_45-b31
- 1.7.16, Ruby 版本: [1.8.7, 2.0.0 (experimental)], Java 版本: 1.7.0_45-b31
- 1.7.17, Ruby 版本: [1.8.7, 1.9.3], Java 版本: 7u45 (cedar), 8u40
- 1.7.18, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 7u45 (cedar), 8u40
- 1.7.19, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 7u79, 8u40
- 1.7.20, Ruby 版本: [1.8.7, 1.9.3, 2.0.0 (experimental)], Java 版本: 7u79, 8u40
- 9.0.0.0.pre1, Ruby 版本: [2.2.0], Java 版本: 8u40 (cedar-14)
- 9.0.0.0.pre2, Ruby 版本: [2.2.2], Java 版本: 8u40 (cedar-14)

### 5.2 选择Ruby版本

在`Gemfile`里指定 Ruby 版本



```bash
source "https://ruby.taobao.org" 
ruby "1.9.3"
```

{{% notice note %}}

由于国外的gem源速度比较慢，推荐使用淘宝的gem源

{{% /notice %}}

如需指定非 MRI 的 ruby 引擎，需要使用 `:engine` 和 `:engine_version` 。您可以通过以下内容指定 JRuby ：



```bash
ruby "1.9.3", :engine ="jruby", :engine_version ="1.7.8"
```

也可以通过在程序中执行以下 Ruby 代码指定版本

```bash
ruby ENV['CUSTOM_RUBY_VERSION'] || '2.0.0'
```

## 六、示例代码

- [Ruby-Sinatra示例代码](https://github.com/goodrain/ruby-sinatra-demo.git)
- [Ruby-Rails示例代码](https://github.com/goodrain/ruby-rails-demo.git)
