---
title: Python
description: Python language type Rainbond support specification introduction
---

#### Python language recognition strategy

By default, the platform will identify a Python project based on whether there are `requirements.txt` files in the source code root directory.

#### Platform compile and run mechanism

1. The pre-compilation process will detect whether the startup command configuration file [Procfile](./procfile)is defined, if not, the default Flask/Django startup configuration file will be generated;
2. After the pre-compilation process is completed, the Python buildpack will be selected according to the language type to compile the project. During the compilation process, the defined Python version and related Python dependencies will be installed;
3. After the compilation is completed, it will check whether the Procfile parameter is set on the platform. If it is configured, the startup command configuration file Procfile will be rewritten.

#### Python project source code specification

In this step, you need to provide a usable Python source code program for deployment on the Rainbond platform. This application must at least meet the following conditions:

- The deployed Python program can be run normally locally
- Projects can be hosted in git repositories
- `requirements.txt` must exist in the project root directory, which is used to manage the dependencies of the Python project and is also a necessary condition for Rainbond to recognize the Python language
- `Procfile` needs to be defined in the project root directory to define the program startup method
- There is `runtime.txt` in the project root directory, which is used to define the Python version of the current project

##### requirements.txt specification

If the program has no dependencies, you can make `requirements.txt` an empty file. If there is no `requirements.txt` , you can use the following command to generate
The required `requirements.txt` can be generated as follows.

```bash
pip free > requirements.txt
```

##### Procfile specification

If the project does not define a Procfile, the platform will generate a default Procfile by default to run the War package.

```bash
web: gunicorn app:app -log-file -- --access-logfile -- --error-logfile --
```

The above is the default Procfile, if you need to expand more startup parameters, you can customize the Procfile.

1. `web: there is a space between` and `gunicorn`
2. End of file cannot contain special characters

#### Compile and run environment settings

##### Configure Python version

It is recommended to define the `Python` version through the `runtime.txt` file in the code root directory. If not defined, Rainbond will use the `python-3.6.6` version by default.

```bash
$ cat runtime.txt
python-3.6.6
```

Recommended python version

- python-2.7.17
- python-3.6.6

Default support python version

```bash
# python 2.7.x
python-2.7.9 python-2.7.17
# python 3.x
python-3.4.9
python-3.5.7
python-3.6.6 python-3.6.10
```

#### Advanced Build Options

Enable advanced build features at build advanced settings or build source

| environment variable                                                               | Defaults                                                                                                                 | illustrate  |
| :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :---------- |
| BUILD_PIP_INDEX_URL | https://pypi.tuna.tsinghua.edu.cn/simple | Pypi source |

#### Django static file support

Since [Django](https://www.djangoproject.com/) 's static file support (CSS, images, etc.) is not very easy to configure and inconvenient to debug, here is an example：

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

By default, the system will automatically execute the following command when building a Django application to try to detect (--dry-run) whether the static file configuration is correct：

```bash
$ python manage.py collectatic --dry-run --noinput
```

If there is no error in this command, the real command will be executed to copy the static files to the STATIC_ROOT directory：

```bash
$ python manage.py collectatic --no-input
```

Users can manually disable the above features, just configure the value of `BUILD_DISABLE_COLLECTSTATIC` to 1 in the application environment variable.

#### Sample demo program

Example [https://github.com/goodrain/python-demo](https://github.com/goodrain/python-demo.git)
