---
title: Python Project Deployment
description: Deploy Python projects on Rainbond through source code
---

## Overview

The platform defaults to identifying it as a Python project based on whether there is a `requirements.txt` file in the root directory of the source code.

### requirements.txt specification

If there is no `requirements.txt`, you can generate it with the following command

```bash
pip freeze > requirements.txt
```

### Django static file support

Since [Django](https://www.djangoproject.com/) static file support (CSS, images, etc.) is not easy to configure and inconvenient to debug, here is an example:

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

By default, the system will automatically execute the following command during the Django application build to try to detect (--dry-run) whether the static file configuration is correct:

```bash
$ python manage.py collectstatic --dry-run --noinput
```

If this command does not report an error, the real command will be executed to copy the static files to the STATIC_ROOT directory:

```bash
$ python manage.py collectstatic --noinput
```

You can manually disable the above feature by setting the value of `BUILD_DISABLE_COLLECTSTATIC` to 1 in the application's environment variables.

## Deployment example

Enter the team, create a new application, select **Based on source code example** to build, select Python Demo and default to all next steps.
