---
title: 使用Beego等框架
summary: 使用Beego等框架
toc: true
---

## 前提说明

- 应用监听的网络默认为`0.0.0.0`，而不是`localhost`(`127.0.0.1`)。
- 平台默认支持5000端口，建议在go应用程序中指定端口为5000，Beego框架需在conf/app.conf添加`httpport=5000`
- 代码中需含有.go文件，用于平台识别为Go语言项目

## Web框架支持

这里以Beego为例说明，其他框架类似。且默认本地已经安装Go.

### 初始化GOPATH

{% include copy-clipboard.html %}

```bash
#个人推荐:在.zshrc里添加如下
function goinit() {
    mkdir -p src bin pkg
    export GOPATH=$PWD
}
```
保存后执行以下命令生效：

{% include copy-clipboard.html %}

```bash
source ~/.zshrc
```

若您需`export了GOPATH`，只要在go目录下输入`goinit`就可以自动`export GOPATH`。

### 安装Godep

执行以下命令安装 Godep：

{% include copy-clipboard.html %}

```bash
go get github.com/tools/godep
```

### 使用Godep

Godep 要求项目存放的目录结构为标准的 [Go workspace](https://golang.org/doc/code.html#Workspaces)，请务必保证您的代码结构满足此条件。

#### 初始状态项目结构

```bash
├── bin
├── pkg
└── src
    └── beego #项目目录
        └── main.go
```

在beego目录下执行`godep save ./...`
如果提示`godep: Package (github.com/astaxie/beego) not found`
只需执行`go get github.com/astaxie/beego`，再执行`godep save ./...`即可
{{site.data.alerts.callout_info}}
执行`godep save ./...`命令后会把所有项目源码里 import 过的外部依赖代码和版本信息保存到 Godeps 目录的Godeps.json。{{site.data.alerts.end}}

#### 本地Beego项目结构

```bash
.
├── bin
├── pkg
└── src
    ├── beego #上传到Git仓库
    │   ├── Godeps
    |   ├── hello.go
    │   ├── conf
    │   └── vendor
    │       └── github.com
    │           └── astaxie
    │               └── beego
    └── github.com
```

#### Godep配置文件实例节选

```json
{
	"ImportPath": "beego",
	"GoVersion": "go1.8",
	"GodepVersion": "v79",
	"Packages": [
		"./..."
	],
	"Deps": [
		{
			"ImportPath": "github.com/astaxie/beego",
			"Comment": "v1.8.0",
			"Rev": "323a1c4214101331a4b71922c23d19b7409ac71f"
		},
		{
			"ImportPath": "github.com/astaxie/beego/config",
			"Comment": "v1.8.0",
			"Rev": "323a1c4214101331a4b71922c23d19b7409ac71f"
		}]
```

#### Demo结构

云帮提供的 [go-hello](http://code.goodrain.com/demo/go-hello/tree/master) 项目在本地的目录结构：

```bash
$GOPATH
└── src
    └── rhino_go/
            ├── Godeps
            │   ├── Godeps.json
            │   ├── Readme
            │   └── _workspace
            ├── hello
            │   └── main.go
            ├── Procfile
            ├── README.md
            └── static
                └── index.html
```
{{site.data.alerts.callout_info}}
不同版本的go和godep命令会有所不同，比如上面的命令中godep save -r ./...在go1.6版本中就没有了 -r选项。另外，新版本的godep不会在Godeps目录中生成`/workspace`目录，而是会在与Godeps同级的目录中生成`vendor`文件夹，其作用根`/workspace`类似。详情可以参考[godep官网](https://github.com/tools/godep){{site.data.alerts.end}}

#### Godep配置说明

Godeps/Godeps.json 是 Godep 的配置文件，以 JSON 的形式保存了整个项目的依赖信息，下面简单介绍下此 JSON 的几个节点：

| 字段         | 值类型  | 值内容                         |
| ---------- | ---- | --------------------------- |
| ImportPath | 字符串  | 项目相对 GOPATH 的路径             |
| GoVersion  | 字符串  | 执行 godep save               |
| Packages   | 数组   | 执行 godep save 时指定的参数        |
| Deps       | 数组   | 项目源码里 import 过的外部依赖地址以及版本信息 |

注意事项：

- 编辑 GoVersion 的值可以指定部署时使用的 Go 版本。
- 在本地执行 `go get` 更新了已有的依赖后，需要重新执行 `godep save` 命令来让 Godep 更新已保存的依赖。

配置文件格式:

{% include copy-clipboard.html %}

```bash
type Godeps struct {
    ImportPath string
    GoVersion  string   // Abridged output of 'go version'.
    Packages   []string // Arguments to godep save, if any.
    Deps       []struct {
        ImportPath string
        Comment    string // Description of commit, if present.
        Rev        string // VCS-specific commit ID.
    }
}
```

#### 平台部署操作

只需将项目上传到git仓库仓库即可.

```bash
➜  beego ls
Godeps  main.go vendor
#将beego目录上传到git仓库
```

### 非web的go程序

对于非web的go程序，平台打包运行时会生成bin文件夹，并将编译的golang程序的二进制包放入bin目录中。

> 如：一个名为hello-demo的golang程序，平台运行后会生成hello-demo的二进制文件。该文件存放在bin 目录下

此时如果要运行该二进制文件，可以使用如下的Procfile

{% include copy-clipboard.html %}

```bash
web: bin/hello-demo
```