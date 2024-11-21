---
title: Python
description: Python语言类型Rainbond支持规范介绍
---

#### Python 语言识别策略

平台默认会根据源码根目录是否有 `requirements.txt` 文件来识别为 Python 项目.

#### 平台编译运行机制

1. 预编译处理会探测是否定义了启动命令配置文件 [Procfile](./procfile),如果未定义会生成默认 Flask/Django 启动配置文件;
2. 预编译处理完成后,会根据语言类型选择 Python 的 buildpack 去编译项目.在编译过程中会安装定义的 Python 版本以及相关 Python 依赖;
3. 编译完成后会检查是否在平台设置了 Procfile 参数,若配置了会重写启动命令配置文件 Procfile.

#### Python 项目源码规范

在此步骤中，你需要提供一个可用的 Python 源码程序用来部署在 Rainbond 平台上,此应用程序至少需要满足如下条件:

- 本地可以正常运行部署的 Python 程序
- 项目可以托管到 git 仓库
- 项目根目录下必须存在 `requirements.txt` ,用来管理 Python 项目的依赖,也是 Rainbond 识别为 Python 语言的必要条件
- 项目根目录下需要定义 `Procfile` ,用来定义程序启动方式
- 项目根目录下存在 `runtime.txt` ,用来定义当前项目的 Python 使用版本

##### requirements.txt 规范

若程序没有依赖关系，可使 `requirements.txt` 为空文件。
若无 `requirements.txt` 可用如下命令生成

```bash
pip freeze > requirements.txt
```

##### Procfile 规范

如果项目未定义 Procfile 文件,平台默认会生成默认 Procfile 来运行 War 包。

```bash
web: gunicorn app:app --log-file - --access-logfile - --error-logfile -
```

上述是默认 Procfile,如果需要扩展更多启动参数,可以自定义 Procfile。

1. `web:` 和 `gunicorn`之 间有一个空格
2. 文件结尾不能包含特殊字符

#### 编译运行环境设置

##### 配置 Python 版本

推荐通过代码根目录下的 `runtime.txt` 文件来定义 `Python` 版本,若未定义,Rainbond 将会默认使用 `python-3.6.6` 版本。

```bash
$ cat runtime.txt
python-3.6.6
```

推荐的 python 版本

- python-2.7.17
- python-3.6.6

默认支持 python 版本

```bash
# python 2.7.x
python-2.7.9 python-2.7.17
# python 3.x
python-3.4.9
python-3.5.7
python-3.6.6 python-3.6.10
```

#### 高级构建选项

在构建高级设置或构建源处启用高级构建特性

| 环境变量            | 默认值                                   | 说明    |
| :------------------ | :--------------------------------------- | :------ |
| BUILD_PIP_INDEX_URL | https://pypi.tuna.tsinghua.edu.cn/simple | Pypi 源 |

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

#### 示例 demo 程序

示例 [https://github.com/goodrain/python-demo](https://github.com/goodrain/python-demo.git)
