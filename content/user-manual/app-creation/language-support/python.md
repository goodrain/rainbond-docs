---
title: Python
description: 将Python源码部署到Rainbond
weight: 3306
hidden: true
---

云帮支持部署和伸缩Python应用程序。无论您喜欢`Django`或`Flask`等框架，Rainbond都可以使用。本文将在几分钟教你学会在Rainbond部署一个Python程序。

## 一、准备工作

在此步骤中，您将准备一个可以部署的简单应用程序，至少需要满足前4个条件: 

- 本地可以正常运行部署的Python程序  
- 项目可以托管到git仓库  
- 项目根目录下必须存在`requirements.txt`,用来管理Python项目的依赖,也是Rainbond识别为Python语言的必要条件  
- 项目根目录下需要定义`Procfile`,用来定义程序启动方式
- 项目根目录下存在`runtime.txt`,用来定义当前项目的Python使用版本  

示例: [python-demo](https://github.com/goodrain/python-demo)

## 二、识别Python语言

通过检测到代码的根目录下是否存在`requirements.txt`文件来识别应用为Python应用。



```bash
pip freeze > requirements.txt
```

演示应用程序(python-demo)已经有一个`requirements.txt`，它的内容如下：

```bash
Flask==1.0.2
gunicorn==19.9.0
```

该`requirements.txt`文件列出应用程序依赖关系及其版本。部署应用程序时，云帮会读取此文件，并使用命令安装Python依赖关系。



```bash
# 项目的根目录执行如下命令
pip install -r requirements.txt
```

{{% notice note %}}

若程序没有依赖关系，可使`requirements.txt`为空文件。

{{% /notice %}}

## 三、定义程序启动命令

需要您在代码根目录创建 [Procfile](etc/procfile.html) 文件来指定启动应用的命令，并写入如下内容：



```bash
web: gunicorn app:app --log-file - --access-logfile - --error-logfile -
```

{{% notice note %}}

**web** : 定义该应用的服务类型为web 平台会自动将该应用添加到全局负载均衡中。    
**gunicorn** : Python WSGI HTTP Server for UNIX 

{{% /notice %}}

## 四、Python版本选择

如果未定义runtime.txt, Rainbond将会默认使用`Python2.7.15`版本, 也可以通过在根目录下增加一个 `runtime.txt`文件来自定义版本：

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
python-3.7.0 python-3.7.1
```

## 五、构建特性

在源码识别通过后,选择高级设置,配置环境变量来自定义PIP源, 默认为中科大镜像源,也可以自定义其他镜像源，如公司的内部pypi源等，示例如下：

```
变量名:变量值
BUILD_PIP_INDEX_URL:https://pypi.tuna.tsinghua.edu.cn/simple
```

如果已经构建过后的应用, 可以应用的其他设置的配置`BUILD_PIP_INDEX_URL`环境变量,下次构建会使用配置的pypi源

## 六、Django 静态文件支持

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


