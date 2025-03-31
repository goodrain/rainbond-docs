---
title: Console Contribution Guide
description: This document describes how to contribute to the Rainbond console project.
---

## Localization Development

### Preconditions

- MYSQL Database
- Python 3.6.5

### Start Project

1. Install dependencies. It is recommended to use virtualenv to manage project dependencies. The commands are as follows

```bash
python3.6 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Environment variable configuration. The following environment variables need to be imported into the terminal before executing the command to start the project

| Variable Name            | illustrate                                                               | Example                                                     |
| ------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `DB_TYPE`                | Database type, default is sqlite, mysql needs to be explicitly specified | mysql                                                       |
| `DJANGO_SETTINGS_MODULE` | Django configuration file                                                | goodrain_web.settings  |
| `MYSQL_DB`               | data storage name                                                        | console                                                     |
| `MYSQL_HOST`             | database address                                                         | 192.168.1.1 |
| `MYSQL_PASS`             | database password                                                        | 123456                                                      |
| `MYSQL_PORT`             | database port                                                            | 3306                                                        |
| `MYSQL_USER`             | database username                                                        | root                                                        |

3. Start Project

For databases that have been initialized, the project can be started directly:

```bash
python3 manage.py runserver
```

For databases that have not been initialized, you need to perform database migration before starting:

```bash
python3 manage.py makemigrations www
python3 manage.py makemigrations console
python3 manage.py migrate

python3 manage.py runserver
```

## Business Layer Code Compilation

### Preconditions

- Docker environment is required

### Compile Front-end Code Image

(1) Clone Project

```bash
git clone https://github.com/goodrain/rainbond-ui.git
```

(2) Compile Project

`VERSION` specifies the tag of the built image. The front-end packaged image will serve as the base image for the back-end code.

```
VERSION=v5.5.0-release ./build.sh
```

### Source Code Compilation Back-end Code Image

(1) Clone Project

```bash
git clone https://github.com/goodrain/rainbond-console.git
```

(2) Compile Project

`VERSION` specifies the tag of the built image. Since the front-end code image is the base image, this should be consistent with the tag of the front-end project.Please use the following command to compile the front-end and back-end code together to form the final allinone image that can be run directly.

```
VERSION=v5.5.0-release ./release.sh allinone
```

### Run Business Layer Image

After compiling the allinone image, you can refer to the following command, replace the image name in the last line with the image name you packaged, and then run the image.

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
rainbond/rainbond:v5.5.0-release-allinone
```

After the image is running, access the machine's 7070 port to enter the Rainbond console.
