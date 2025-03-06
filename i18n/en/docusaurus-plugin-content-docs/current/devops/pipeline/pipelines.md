---
title: Pipeline
description: Introduction to Pipeline App Pipeline Pipeline Pipeline App Pipeline
keywords:
  - Introduction to Pipeline App Pipeline Pipeline Pipeline App Pipeline
  - Intro GitLab Pipeline Plugin
---

Fluid is a tool to provide customized process organization that allows businesses to easily achieve ongoing delivery by linking development to delivery through constructing, deploying, testing, control and so on.

## Prerequisite

- Application service has been created.
- Available GitLab Runner.

## Action step

Go to the Rainbond Console and select the **streaming route** to the left menu bar.

### Create Pipeline

A multilingual template is provided, which can be used directly to create a plume.Contains common language templates such as：Node.js, Maven Single, Maven Module, Java War, Gradle, Go, Python, etc.

Language template by default provides two steps:

1. Pack Items, Output Build.
2. Build a container image and push it to a mirror repository.

#### Global Variables

The global variable is a variable in the flow line that can be used at any step in the route.Global variables can be configured in the water line settings.

The following global variable： is provided by default

- **REPOSITORY_URL：** Image repository address
- **ORG：** Mirror Repository Organization
- **REPOSITORY_USERNAME：** Mirror repository username
- **REPOOSITORY_PASSWORRD：** Mirror repository password

### Waterline step configuration

Route step configuration is the core of the line and can be achieved through the allocation of flow line steps.

The steps of the flow line correspond to GitLab CI, [GitLab C/CD](https://docs.gitlab.com/e/ci/yaml/) documents.

:::caution
Each option created via the UI corresponds to a configuration item in the `gitlab-ci.yml` file. You cannot modify the `gitlab-ci.yml` file on your own. The `gitlab-ci.yml` file is overwritten when changing the flow line configuration via UI.
:::

#### Phase Name

The stage name is the name of the stream step and can be customized.

#### Stage encoding

Stage encoding is the only encoding of the stream line step that corresponds to the `stage` configuration in the `gitlab-ci.yml` file.More information is available on the [GitLab CI/CD Stages](https://docs.gitlab.com/e/ci/yaml/#stages) file.

#### Mirror Environment

The mirror environment is the operating environment of the flow line step and corresponds to the `image` configuration in the `gitlab-ci.yml` file.More information is available on the [GitLab CI/CD Image](https://docs.gitlab.com/e/ci/yaml/#image).

#### Script command

The script command is the executive command of the waterline step step and corresponds to the `script` configuration in the `gitlab-ci.yml` file.More information is available on [GitLab CI/CD Script](https://docs.gitlab.com/e/ci/yaml/#script) documents.

#### Runner

Runner is the environment in which the flow line step is executed and corresponds to the `tags` configuration in the `gitlab-ci.yml` file.More information is available on the [GitLab CI/CD Tags](https://docs.gitlab.com/e/ci/yaml/#tags).

#### Execute conditions

The execution condition is the execution condition of the Waterline step step corresponding to the `only/except` config entry in the `gitlab-ci.yml` file.More information is available on [GitLab CI/CD Only/Except](https://docs.gitlab.com/e/ci/yaml/#only--except) documents.

Only **only/excluded** can be used to control when to add jobs to pipes.

- Only when：is used to define job running.
- Exclude：uses exception to define when the job is not running.

Currently configured execution condition is：

- **Branch：** only executes this step if branch matches the branch.
- **Variable：** only executes this step if the variable matches/excludes variables.

#### Product products

The product is the product of the drift of the waterline step corresponding to the `artifacts` configuration in the `gitlab-ci.yml` file.More information is available on the [GitLab CI/CD Artifacts](https://docs.gitlab.com/e/ci/yaml/#artifacts).

For example,：defines the product as `target/*.jar`, all `jar` files from the `target` directory will be used as a product when this step is done.

#### Save time

The saving time is the time of the product of the drainage step and corresponds to the `ArtifactsExpire_in` configuration in the `gitlab-ci.yml` file.More information is available on the [GitLab CI/CD ArtifactsExpire_in](https://docs.gitlab.com/e/ci/yaml/#artifactsexppire_in).

In seconds, specify how long the product of the product is saved.

#### Cache

Cache is the cache configuration of the waterline step to the `cache` configuration in the `gitlab-ci.yml` file.More information is available on the [GitLab CI/CD Cache](https://docs.gitlab.com/e/ci/yaml/#cache).

For example,：defines a cache as a `target`, all files in the `target` directory will be cached when the step is completed.