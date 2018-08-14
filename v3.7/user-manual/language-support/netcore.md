Rainbond可以识别.NetCore语言的项目并一键编译部署到平台。

## 一、代码识别

代码主目录中包含以`.sln`或者`.csproj`结尾的文件并且不包含`Dockerfile`文件时，平台识别项目语言类型为`.NetCore`

## 二、源码编译 

当前版本Rainbond默认使用`dotnet:2.1-sdk`进行源码编译，编译方式如下：

```
dotnet restore
dotnet publish -c Release
```



## 三、项目运行

运行环境采用`dotnet:2.1-aspnetcore-runtime`runtime版本，自动将上诉编译的结果文件存放于运行环境的`/app`目录下。由于平台咱无法很好的感知项目的入口运行文件，需要在源码主目录中定义`rainbondfile`定义项目的运行方式，例如：

```
ports:
   - port: 5000
     procotol: http
cmd: dotnet aspnetapp.dll 
```

`ports`定义项目监听的端口（必须监听泛地址 `*`或者`0.0.0.0`）

`cmd`定义项目启动方式，根据项目publish后生成的入口运行文件为准。



## 四、示例代码

[dotnet-demo](https://github.com/goodrain-apps/dotnet-demo)

{{site.data.alerts.callout_success}}

- 目前仅支持单项目代码维护形式，如果你一个代码仓库维护了多个Project,例如一个微服务架构，那么首先建议你将每个Project分离到不同仓库或同个仓库不同二级目录下。

{{site.data.alerts.end}}

