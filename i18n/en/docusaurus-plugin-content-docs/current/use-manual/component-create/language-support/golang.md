---
title: Golang
description: Golang language type Rainbond support specification introduction
---

### Golang language recognition method

When there are `go.mod` files in the source code root directory, and `Dockerfile` files do not exist, Rainbond will recognize the source code as `Golang` projects.

### Compilation principle

1. After the pre-compilation process is completed, `buildpack` of `Golang` will be selected according to the language type to compile the project. During the compilation process, the defined `Golang` versions will be installed;
2. After the compilation is completed, it will check whether the `Procfile` parameter is set on the platform. If it is configured, the startup command configuration file Procfile will be rewritten.

### Golang project source code specification

In this step, you need to provide an available Go source code program for deployment on the Rainbond platform. This application must meet at least the following conditions:

1. `go build`,`go run` which works fine locally.

2. Source code programs must be hosted on git or svn services such as gitlab.<!-- 3. 在根目录的`/Godeps`目录下有`Godeps.json`文件，标识应用由\[godep\](https://devcenter.heroku.com/articles/go-dependencies-via-godep)管理;在根目录的`/vendor`目录下有`Govendor.json`文件，标识应用由\[govendor\](https://devcenter.heroku.com/articles/go-dependencies-via-govendor)管理;在根目录的`/src`目录下包含`<文件名>.go`文件，标识应用由\[gb\](https://devcenter.heroku.com/articles/go-dependencies-via-gb)管理。

<!-- 3. 在根目录的`/Godeps`目录下有`Godeps.json`文件，标识应用由[godep](https://devcenter.heroku.com/articles/go-dependencies-via-godep)管理;在根目录的`/vendor`目录下有`Govendor.json`文件，标识应用由[govendor](https://devcenter.heroku.com/articles/go-dependencies-via-govendor)管理;在根目录的`/src`目录下包含`<文件名>.go`文件，标识应用由[gb](https://devcenter.heroku.com/articles/go-dependencies-via-gb)管理。 -->

### -->### Compile the specified module

If there are multiple services in the current project, it can be compiled into multiple binaries, or the main file is not in the main code directory.In golang, one package and one service are usually used under the cmd path.At this time, the above method cannot be compiled and run correctly.The cmd path next package is usually used in golang.The compilation and operation could not be properly done at this time.

Add `BUILD_GO_INSTALL_PACKAGE_SPEC` variable to the environment variable to define the entry path of the component compilation package, for example：

```bash
BUILD_GO_INSTAL_PACKAGE_SPEC=goodrain.com/app-store/cmd/manage-server
```

Where `goodrain.com/app-store` is the main name of the project, which is consistent with `module` in go.mod.

`/cmd/manage-server` is the package path where the main entry code of the current component is located relative to the code main directory.

#### Procfile specification

The startup command must be defined by uploading the `Procfile` file in the code root directory, or by declaring the environment variable `BUILD_PROCFILE` The format is as follows：

```bash
web: hello
```

1. `web: there is a space between` and `hello`
2. End of file cannot contain special characters
3. `hello` is the compiled binary

For a project that is compiled with a specified module, the following definitions should be made:：

```bash
web: bin/manage-server
```

`manage-server` is the default cmd directory path to service subdirectory.Binary files are stored uniformly in the bin directory.

### Compile and run environment settings

#### Configure Golang version

Mainstream supports version `go1.16`,`go1.10.5`,`go1.11`, and the default version of Cloud Help is `go1.11`.

```
#support version
go1.16 go1.15 go1.14 go1.13 go1.12 go1.10 go1.9 go1.8
```

#### Go Tools version

- Dep supports version v0.4.1 by default
- Glide supports version v0.12.3 by default
- Govendor supports version v1.0.8 by default
- GB supports version 0.4.4 by default
- PkgErrors supports version 0.8.0 by default
- HG supports version 3.9 by default
- TQ supports version v0.5 by default
- MattesMigrate supports version v3.0.0 by default

### Sample demo program

Example[https://github.com/goodrain/go-demo](https://github.com/goodrain/go-demo.git)
