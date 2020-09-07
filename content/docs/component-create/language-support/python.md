---
title: Python
description: Python语言类型Rainbond支持规范介绍
weight: 3306
hidden: false
aliases:
- /docs/user-manual/component-create/language-support/python/
---

#### Python语言识别策略
平台默认会根据源码根目录是否有`requirements.txt`文件来识别为Python项目.

#### 平台编译运行机制
1. 预编译处理会探测是否定义了启动命令配置文件[Procfile](../etc/procfile/),如果未定义会生成默认Flask/Django启动配置文件;
2. 预编译处理完成后,会根据语言类型选择Python的buildpack去编译项目.在编译过程中会安装定义的Python版本以及相关Python依赖;
3. 编译完成后会检查是否在平台设置了Procfile参数,若配置了会重写启动命令配置文件Procfile.

#### Python项目源码规范

在此步骤中，你需要提供一个可用的Python源码程序用来部署在Rainbond平台上,此应用程序至少需要满足如下条件:

- 本地可以正常运行部署的Python程序  
- 项目可以托管到git仓库  
- 项目根目录下必须存在`requirements.txt`,用来管理Python项目的依赖,也是Rainbond识别为Python语言的必要条件  
- 项目根目录下需要定义`Procfile`,用来定义程序启动方式
- 项目根目录下存在`runtime.txt`,用来定义当前项目的Python使用版本  

##### requirements.txt 规范

若程序没有依赖关系，可使`requirements.txt`为空文件。
若无`requirements.txt`可用如下命令生成

```bash
pip freeze > requirements.txt
```

##### Procfile规范

如果项目未定义Procfile文件,平台默认会生成默认Procfile来运行War包。

```bash
web: gunicorn app:app --log-file - --access-logfile - --error-logfile -
```

上述是默认Procfile,如果需要扩展更多启动参数,可以自定义Procfile。

{{% notice info %}}
1. `web:`和`gunicorn`之间有一个空格
2. 文件结尾不能包含特殊字符


#### 编译运行环境设置

##### 配置Python版本

推荐使用runtime.txt来定义Python版本,若未定义,Rainbond将会默认使用`python-3.6.6`版本。

```bash
$ cat runtime.txt
python-3.6.6
```

推荐的python版本

- Python-2.7.15
- Python-3.6.6

默认支持python版本

```bash
# python 2.7.x
python-2.7.9 python-2.7.10 python-2.7.13 python-2.7.14 python-2.7.15 
# python 3.x
python-3.4.3
python-3.5.3 
python-3.6.0 python-3.6.1 python-3.6.2 python-3.6.3 python-3.6.4 python-3.6.5 python-3.6.6 
python-3.7.0
```


#### 高级构建选项

在构建高级设置或构建源处启用高级构建特性

| 环境变量     | 默认值        | 说明                     |
| :------- | :----------- | :----------------------- |
| BUILD_PIP_INDEX_URL|https://pypi.tuna.tsinghua.edu.cn/simple| Pypi源                    |

#### Django 静态文件支持

由于 [Django](https://www.djangoproject.com/) 的静态文件支持（CSS、图片等）不是很容易配置而且不方便调试，这里给出一个示例：

**settings.py**

```python
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = 'staticfiles'
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
```

默认情况下系统会在构建 Django 应用时自动执行以下命令尝试检测（--dry-run）静态文件配置是否正确：

```bash
$ python manage.py collectstatic --dry-run --noinput
```

如果此命令没有出错，将执行真正的命令拷贝静态文件到 STATIC_ROOT 目录：

```bash
$ python manage.py collectstatic --noinput
```

用户可以手工禁用上述特性，只需要在应用的环境变量里配置 `BUILD_DISABLE_COLLECTSTATIC` 的值为 1。

#### 示例demo程序

示例[https://github.com/goodrain/python-demo](https://github.com/goodrain/python-demo.git)

<!--
## 七、Whitenoise

默认情况下，Django 在生产模式下不支持托管静态文件，我们推荐在生产环境下使用 [Whitenoise](https://pypi.io/project/whitenoise/)
项目托管静态文件作为最佳实践，以下是具体的安装和配置方式：

> 参考文档： 具体细节请查看 Django 文档的 [Managing static files](https://docs.djangoproject.com/en/1.7/howto/static-files/) 和[Deploying static files](https://docs.djangoproject.com/en/1.7/howto/static-files/) 章节。

### 7.1 安装 Whitenoise

```bash
$ pip install whitenoise
...
$ pip freeze > requirements.txt
```

**settings.py**

```python
# Simplified static file serving.
# https://warehouse.python.org/project/whitenoise/
STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
```

**wsgi.py**

```python
from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise

application = get_wsgi_application()
application = DjangoWhiteNoise(application)
```
-->

