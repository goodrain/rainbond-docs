---
title: Golang project deployment
description: Deploy Golang project via source code on Rainbond
---

## Overview

When a `go.mod` file exists in the root directory of the source code, Rainbond will recognize the source code as a `Golang` project.

### Compile specified module

Add the `BUILD_GO_INSTALL_PACKAGE_SPEC` variable in the environment variables to define the entry path of the component compilation package, for example:

```bash
BUILD_GO_INSTALL_PACKAGE_SPEC=goodrain.com/app-store/cmd/manage-server
```

Where `goodrain.com/app-store` is the main name of the project, consistent with the `module` in go.mod.

`/cmd/manage-server ` is the package path where the main entry code of the current component is located, relative to the main directory of the code.

### Procfile specification

The startup command must be defined by uploading a `Procfile` file in the root directory of the code, or by declaring the environment variable `BUILD_PROCFILE`, in the following format:

```bash
web: hello
```

1. There is a space between `web:` and `hello`
2. The end of the file must not contain special characters
3. `hello` is the compiled binary

For projects that compile specified modules, the following definition should be made:

```bash
web: bin/manage-server
```

Where `manage-server` is the default service subdirectory path under the cmd directory.Binary files are uniformly stored in the bin directory.

## Deployment example

Enter the team, create a new application and select to build based on the source code example, select Golang Demo and default all the next steps.