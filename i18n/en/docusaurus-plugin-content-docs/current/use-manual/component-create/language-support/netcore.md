---
title: NetCoe
description: .NetCore language type Rainbond support specification introduction
---

#### .NetCore language type recognition strategy

When the code main directory contains files ending with``</code>and does not contain`<code>`files, the platform recognizes that the project language type is``

Currently, only single-project code maintenance is supported. If you maintain multiple projects in a code repository, such as a microservice architecture, it is recommended that you separate each project into different warehouses or different secondary directories of the same warehouse.

#### Compilation principle

Support for the .NetCore language will build an image rather than a slug package like a Dockerfile, so .NetCore cannot be defined using a Procfile.

By default, the NetCore language build process uses`microsoft/dotnet:2.2-sdk-alpine` to compile the image and`microsoft/dotnet:2.2-aspnetcore-runtime`to run the environment image, and the same is true if other versions are set.If you do not download the image in advance, it is easy to fail to pull the image during the build process.It is strongly recommended to manually obtain the above images on the Rainbond management node in advance.If you do not download the mirror ahead of time, you are prone to pull the image failure in the build process.It is strongly recommended that the first Rainbond management node obtain the above-mentioned mirrors manually.

If your source code is dependent on the system environment, you need to install the system class library separately. Currently, you cannot use the default compilation environment provided by Rainbond to compile directly. You can directly define [Dockerfile](./dockefile) to support it.

##### Build environment selection

The current version of the platform uses the `microsoft/dotnet:2.2-sdk-alpine` mirror environment for source code compilation by default.You can set the build environment version according to your needs. The optional version currently includes：You can set the build environment version as needed. The optional version currently includes：

- 3.0-sdk
- 2.1-sdk

Set the service environment variable `BUILD_DOTNET_SDK_VERSION=3.0-sdk` to select the build environment version.

##### Compile mode settings

The default compilation method is as follows：

```
dotnet restore
dotnet publish -c Release
```

If the command that needs to be executed before`dotnet restore`can be specified by the `BUILD_DOTNET_RESTORE_PRE`environment variable.

If you need to change the default `dotnet restore`command can be specified through the`BUILD_DOTNET_RESTORE` environment variable.For example, set the following environment variable：e.g. set the following environment variable：

```
BUILD_DOTNET_RESTORE_PRE=dotnet restore --igne-failed-sources
```

For the setting of environment variables, please refer to [Service Environment Variables](/docs/use-manual/component-manage/env/)

#### Project run

##### Operating environment selection

Usually the running environment is the same as the compilation environment version. The default running environment provided by the current version is`microsoft/dotnet:2.2-aspnetcore-runtime`, and the optional running environment version is：

- 3.0-aspnetcore-runtime

- 2.1-aspnetcoe-runtime

Set the version you need by setting the environment variable`BUILD_DOTNET_RUNTIME_VERSION`

The compiled result file is stored in the `/app` folder on your running environment.The compiled result file is stored in the`/app`directory of the runtime environment.Since the platform cannot perceive the entry running file of the project well, we need to define [rainbondfile in the main source directory of the source code,](/docs/use-manual/component-create/language-support/rainbondfile) define the running and startup method of the project, for example：

```
ports:
   - port: 5000
     procot: HTML
cmd: dotnet aspnetapp.dll
```

`ports`defines the ports the project listens on (must listen on the pan address `*`or`0.0.0.0`)

`cmd`Define the project startup method, which is based on the entry running file generated after the project is published.

##### How to adapt the port set in the rainbondfile

Usually, program developers do not add a custom program listener logic to the port.Usually, program developers do not add logic to customize program listening ports.In this case, when the program starts, it will listen to the default address `http://[::]:80` So how can I make my program customize the listening port and make it dynamically match the port set in the rainbondfile? The following is a specific plan：
Below is a specific scheme：

Modify the `Program.cs`of the project

```cs

using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions .Configuration;
using Microsoft.Extensions.Logging;

namespace aspnetapp {
    public class Program {
        public static void Main (string[] args) {
            // Startup port
            defined by environment variable ${PORT} string port = "5000";
            if (Environment.GetEnvironmentVariable("PORT") != null) {
                port = Environment.GetEnvironmentVariable("PORT");
            }
            Console.WriteLine("Listing :{0}", port);
            CreateWebHostBuilder (port, args ).Build ().Run();
        }
        public static IWebHostBuilder CreateWebHostBuilder (string port, string[] args) =>
            WebHost.CreateDefaultBuilder (args)
            // Define access path
            .UseUrls ($"http:/ /0.0.0.0:{port}")
            .UseStartup<Startup> ();
    }
}
```

#### sample code

[https://github.com/goodrain/dotnet-demo](https://github.com/goodrain/dotnet-demo)
