---
title: 云帮支持Python
summary: Python概述
toc: false
---
<div id="toc"></div>

云帮支持部署和扩展Python应用程序。无论您喜欢`Django`或`Flask`等框架，云帮都可以使用。

## 代码识别

云帮通过检测到您代码的根目录下存在`requirements.txt`文件而识别您的应用为Python应用。您可以通过命令生成 `requirements.txt` 文件，命令如下：

{% include copy-clipboard.html %}

```bash
pip freeze > requirements.txt
```

演示应用程序(python-demo)已经有一个`requirements.txt`，它的内容如下：

```bash
Flask==0.12.1
Jinja2==2.9.6
Werkzeug==0.12.1
gunicorn==19.7.1
```

该`requirements.txt`文件列出应用程序依赖关系及其版本。部署应用程序时，云帮会读取此文件，并使用命令安装Python依赖关系。

{% include copy-clipboard.html %}

```bash
pip install -r requirements.txt
```

{{site.data.alerts.callout_success}}

若程序没有依赖关系，可使`requirements.txt`为空文件。

{{site.data.alerts.end}}

## 版本选择

云帮默认使用`Python2.7.13`版本，您也可以通过在根目录下增加一个 `runtime.txt`文件来指定版本：

```bash
$ cat runtime.txt
python-3.4.3
```

### 推荐的python版本

- Python-2.7.9~Python-2.7.13
- Python-3.4.3,Python-3.5.2,Python-3.6.0,Python-3.6.1

当然您也可以指定【2.4.4 - 3.6.1】之间的版本，但不支持如下几个特殊的版本`Python-3.4.5`、` Python-3.4.6 `、`Python-3.5.3`。

## 工具库

系统使用以下的库来管理和解决 Python 依赖，您不可以自定义它们：

- setuptools 35.0.2
- pip 9.0.1

## 构建(build)

系统会在您代码部署的环境运行以下命令来解决依赖：

```bash
$ pip install -r requirements.txt --allow-all-external
```

## 启动命令

需要您在代码根目录创建 Procfile 文件来指定启动应用的命令，并写入如下内容：

{% include copy-clipboard.html %}

```bash
web: gunicorn hello:app --log-file - --access-logfile - --error-logfile -
```

{{site.data.alerts.callout_info}}

**web** : 定义该应用的服务类型为web 平台会自动将该应用添加到全局负载均衡中。后续会添加其他类型的应用。

**gunicorn** : Python WSGI HTTP Server for UNIX。

{{site.data.alerts.end}}

## Django 静态文件支持

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

用户可以手工禁用上述特性，只需要在应用的环境变量里配置 DISABLE_COLLECTSTATIC 的值为 1。

## Whitenoise

默认情况下，Django 在生产模式下不支持托管静态文件，我们推荐在生产环境下使用 [Whitenoise](https://pypi.io/project/whitenoise/)
项目托管静态文件作为最佳实践，以下是具体的安装和配置方式：

> 参考文档： 具体细节请查看 Django 文档的 [Managing static files](https://docs.djangoproject.com/en/1.7/howto/static-files/) 和[Deploying static files](https://docs.djangoproject.com/en/1.7/howto/static-files/) 章节。

### 安装 Whitenoise

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
