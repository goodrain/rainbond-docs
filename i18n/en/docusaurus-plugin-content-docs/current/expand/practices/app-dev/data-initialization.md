---
title: Generic data initialization plugin
Description: Use the data initialization plug-in to perform convenient and simple data initialization for the application
weight: 22004
---

### Overview

Project address：https://github.com/goodrain/data-initer-plugin

This is a plugin for initializing data, suitable for all cloud platforms based on Kubernetes system including Rainbond.

The basic principle is realized by using the [init container](https://kubernetes.io/zh/docs/concepts/workloads/pods/init-containers/) of Kubernetes.The container where the plug-in is located will run until the completion of the service container. Through the defined download and decompression logic, the pre-prepared initialization data compression package (only supports three formats of zip, tgz, and tar.gz) will be decompressed to the target directory. Go, the download process supports breakpoint resume.Of course, we have to set the target directory to be persistent in advance.The container in which the plugin is located will run until the end of the business container. By defining downloading and extracting logic, unpack preprepared data compression (only in zip format, tgz, tar.gz and three formats) will be pressed into the destination directory. The download process supports breakpoint renewal.Of course, we want to set the target directory in advance.

The environment variables required by the plugin are configured as follows：

|                 ENV                |     VALUE     |                                                                    Tip                                                                   |
| :--------------------------------: | :-----------: | :--------------------------------------------------------------------------------------------------------------------------------------: |
|    FILE_URL   |      Url      |                                                   Initialization file download address                                                   |
|   FILE_PATH   |  path to dir  | When a single directory is initialized, specify the persistent directory address; when multiple directories are initialized, specify `/` |
|  EXTRACT_FILE |   true/false  |                                     The initialization file is automatically decompressed by default                                     |
| DOWNLOAD_ARGS |    -X, -xx    |                                                  Extra command line arguments for `wget`                                                 |
|   LOCK_PATH   |  path to dir  |                                      Lock file save path, specify any existing persistent directory                                      |
|                DEBUG               | anything true |                                                             Enable debug log                                                             |

### Building plugins in Rainbond

In Rainbond's plug-in mechanism, there is natural support for the init container - the initialization type plug-in.

#### 1. Create a new plugin

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/data-initialization/data-initialization-1.jpeg" width="100%" title="新建插件" /> 

#### 2. Fill in the build source information

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/data-initialization/data-initialization-2.jpeg" width="100%" title="构建源信息" />

Key information includes：

- Source address：https://github.com/goodrain/data-initer-plugin.git When selecting Dockerfile to install, the code address that needs to be provided
- Code version：main

Next, click Create Plugin and wait for the build to succeed.

#### 3. Declare the plugin configuration

In this step, we need to state what configuration this plugin can receive.In this step, we need to declare what kind of configuration this plugin can receive.From the overview section, we know that there are several environment variables that need to be defined for this plugin to work properly.

Enter the configuration group management, add a group of configuration：

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/data-initialization/data-initialization-3.png" width="100%" title="声明插件配置" />

After saving the configuration, the plugin is ready.

### How to use plugins

#### 1. Prerequisites

- The service components that need to be initialized data have already set up the persistence directory.
- The persistent data has been packaged (supported formats zip, tgz, tar.gz) and uploaded to object storage.

#### 2. Install and configure the plugin

- Install the pre-made generic data initialization plugin for the service component.
- View the configuration, enter the download address (FILE_URL) of the initialization data package, the target persistence directory (FILE_PATH), and the lock file storage directory (LOCK_PATH), and then update the configuration.

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/data-initialization/data-initialization-4.png" width="100%" title="配置插件" />

- Update memory, because initialization type plugins are automatically exited when running, you don't worry about overstretching resources.Memory values can be set to amplify as much as possible and better than the size of the persistent packet.This will speed up downloads and decompression.

#### 3. Build and start the service component

Observe the log, if the output is as follows, it means that the data initialization process has started：

```bash
7b554df4b7bb:Connecting to rainbond-pkg.oss-cn-shanghai.aliyuncs.com (106.14.228.173:443)

7b554df4b7bb:data.tgz 0% | | 367k 2:45:46 ETA
```

After waiting for the download and decompression to complete, the service component will enter the normal startup process.

#### 4. Remove the plug-in

The plug-in has the permission to read and write the persistent data directory of the service component. Although we have added the implementation logic to prevent repeated initialization, we still strongly require **to uninstall the plug** in after the data is initialized successfully.

### How to initialize multiple directories

The basic usage method above allows data initialization for a given directory.The above basic usage method can initialize data for a specified directory.However, in practice, it may be necessary to initialize data for multiple directories at the same time, and multiple directories do not belong to the same parent directory.For example, it is necessary to initialize data to `/app` ,`/data/a` , and`/root/.b` 3 directories at the same time.Update the memory, because the initialization type plug-in will automatically exit after running, so you don't have to worry about occupying too much resources.The setting of the memory value can be enlarged as much as possible, and it is appropriate to be slightly larger than the size of the persistent data packet.This will speed up the download and decompression.

In such cases, we can address the problem from the data-packaging perspective.In response to such a situation, we can solve this problem from the perspective of data packaging.Through the specified packaging method, all data is packaged into the same compressed package, and after downloading and decompressing, it is directly decompressed into each directory.

Packing is as follows：

```bash
tar cvzf data.tgz /app/data/a /root/.b
```

Store the packaged file and upload the object to get the download URL, such as https://goodrain-delivery.oss-cn-hangzhou.aliyuncs.com/somedir/data.tgz

When operating in the Rainbond platform, the process is roughly as follows：

- Persist all 3 target directory settings
- Install the generic data initialization plugin
- Fill in FILE_URL and use the URL just obtained
- FILE_PATH, value `/` is the most critical step
- Fill in LOCK_PATH, its value must be an existing persistent storage path
- Start the component to start the initialization process

### About lock files

After the first initialization is completed, a hidden file, the lock file, will be generated under LOCK_PATH.Subsequent restarts will recognize this lock file, and if it exists, skip the initialization process.The purpose of this is to avoid duplicating initialization data.Fill in, its value is This is the most critical stepThe aim is to avoid duplication of initialization data.

### About object storage

We recommend placing the initialization package in object storage and providing a download address that the Rainbond platform can access.

Common self-built object storage has the following two situations

- -Object storage software based on the S3 protocol, such as Minio, can be searched and installed after Rainbond is connected to the open source application store.
- Object storage services provided by public cloud service providers, such as Alibaba Cloud OSS.
