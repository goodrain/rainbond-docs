---
title: Python 项目部署
description: 在 Rainbond 上通过源码部署 Python 项目
---

## 概述

平台默认会根据源码根目录是否有 `requirements.txt` 文件来识别为 Python 项目.

### requirements.txt 规范

若无 `requirements.txt` 可用如下命令生成

```bash
pip freeze > requirements.txt
```

### Django 静态文件支持

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

可以手工禁用上述特性，只需要在应用的环境变量里配置 `BUILD_DISABLE_COLLECTSTATIC` 的值为 1。

## 部署示例

进入到团队下，新建应用选择**基于源码示例**进行构建，选中 Python Demo 并默认全部下一步即可。
