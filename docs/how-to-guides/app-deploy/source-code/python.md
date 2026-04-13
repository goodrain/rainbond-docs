---
title: Python 项目部署
description: 在 Rainbond 上通过源代码部署 Python Web 项目，支持 Django、Flask、FastAPI 等常见框架。
keywords:
- Rainbond 部署 Python 项目
- Rainbond 部署 Django Flask FastAPI
- Rainbond Python CNB 构建
---

本篇文档介绍如何在 Rainbond 平台上通过源代码部署 Python 项目。

## 项目识别

Rainbond 会根据源码根目录中的以下文件识别 Python 项目：

- `requirements.txt`
- `setup.py`
- `Pipfile`
- `pyproject.toml`

### 包管理器自动检测

在识别为 Python 项目后，Rainbond 会继续自动检测依赖管理方式：

| 文件特征 | 包管理器 |
|---------|---------|
| `requirements.txt` / `setup.py` / 普通 `pyproject.toml` | pip |
| `Pipfile` | pipenv |
| `pyproject.toml` 中包含 `[tool.poetry]` | poetry |
| `environment.yml` / `environment.yaml` / `conda.yml` / `conda.yaml` | conda |

:::warning
`environment.yml` 仅用于识别 conda 包管理器，不会单独作为 Python 项目的语言识别入口。建议项目根目录仍保留 `requirements.txt`、`setup.py`、`Pipfile` 或 `pyproject.toml` 之一。
:::

### requirements.txt 规范

若无 `requirements.txt`，可用如下命令生成：

```bash
pip freeze > requirements.txt
```

## 支持的应用类型

Rainbond 会优先读取项目根目录中的 `Procfile`。如果没有 `Procfile`，则根据项目依赖和入口文件自动识别启动命令。

| 类型 | 自动识别方式 | 默认启动方式 |
|------|-------------|-------------|
| Django | 存在 `manage.py` | `web: python manage.py runserver 0.0.0.0:$_PORT` |
| Flask | 识别到 `flask` 依赖和应用模块 | `web: flask --app <module> run --host 0.0.0.0 --port $PORT` |
| Uvicorn / ASGI | 识别到 `uvicorn` 依赖和 `app` / `application` 对象 | `web: uvicorn <module>:<symbol> --host 0.0.0.0 --port $PORT` |
| Gunicorn / WSGI | 识别到 `gunicorn` 依赖和 `wsgi.py` / `app.py` 等入口 | `web: gunicorn <module>:<symbol> --bind 0.0.0.0:$PORT` |
| Quart | 识别到 `quart` 依赖和应用对象 | `web: hypercorn --bind 0.0.0.0:$PORT <module>:<symbol>` |
| Sanic | 识别到 `sanic` 依赖和应用对象或工厂函数 | `web: sanic <module>:<symbol> --host=0.0.0.0 --port=$PORT` |
| Aiohttp | 识别到 `aiohttp` 依赖和 `web.run_app()` 或工厂函数 | `web: python <script>` 或 `web: python -m aiohttp.web ...` |
| Pyramid | 识别到 `pyramid` 依赖和 `*.ini` 配置文件 | `web: pserve <config.ini> http_port=$PORT` |
| Poetry scripts | `pyproject.toml` 中定义 `[tool.poetry.scripts]` | `web: poetry run <script>` |

如果自动识别不符合预期，建议在项目根目录添加 `Procfile` 明确指定启动命令或者在页面上进行配置，例如：

```procfile
web: gunicorn demo.wsgi:application --bind 0.0.0.0:$PORT
```

## 构建参数

Rainbond 当前支持以下 Python 相关构建参数：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| Python 版本 | `3.10、3.11、3.12、3.13、3.14` | `3.14` |
| 镜像源 | 配置 pip 镜像源地址 | `https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple` |
| 可信主机 | 配置 pip 信任主机 | 空 |
| 启动命令 | 默认会根据项目类型自动识别启动命令，支持在页面上自定义覆盖 | 根据项目类型自动识别 |

## 部署示例

1. 进入目标团队，选择 **新建应用** → **基于源码示例**
2. 选择 `python-demo`
3. Rainbond 自动识别为 Python 项目，并自动检测包管理器与启动方式
4. 点击构建并部署

## 常见问题

### Django 项目中的静态文件需要额外处理吗？

需要按项目情况自行处理。当前 Python 源码部署配置页没有单独的“构建命令”字段，只有 `启动命令` 可配置，因此不能直接在页面上把 `python manage.py collectstatic --noinput` 配置为构建阶段命令。

如果你需要在构建阶段执行 `collectstatic`，建议使用 Dockerfile 部署或自定义镜像构建流程。

如果你可以接受组件每次启动时都先执行一次静态文件收集，也可以在源码根目录的 `Procfile` 或页面中的 `启动命令` 里显式覆盖，例如：

```bash
web: python manage.py collectstatic --noinput && gunicorn demo.wsgi:application --bind 0.0.0.0:$PORT
```

当前 Rainbond 使用的 Procfile 方式默认会通过 shell 执行，因此 `&&` 这样的串联命令可以正常工作。

### 为什么只有 `environment.yml` 还不能识别成 Python 项目？

因为 `environment.yml`、`environment.yaml`、`conda.yml`、`conda.yaml` 只用于识别 `conda` 包管理器，不是 Python 项目的语言识别入口。要让平台识别为 Python 项目，源码根目录仍需要至少包含以下文件之一：

- `requirements.txt`
- `setup.py`
- `Pipfile`
- `pyproject.toml`

### Django 项目为什么默认启动命令是 `runserver`，不是 `gunicorn`？

因为当前平台在检测到项目根目录存在 `manage.py` 时，会优先自动识别为 Django 项目，并生成默认启动命令：

```bash
web: python manage.py runserver 0.0.0.0:$_PORT
```

如果你希望使用 `gunicorn` 作为生产启动方式，可以在源码根目录添加 `Procfile`，或者在页面的 `启动命令` 中手工覆盖，例如：

```bash
web: gunicorn demo.wsgi:application --bind 0.0.0.0:$PORT
```
