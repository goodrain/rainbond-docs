---
title: Dockerfile
description: 在 Rainbond 上通过 Dockerfile 部署应用
keywords:
- Rainbond Dockerfile 部署
- 多环境 Dockerfile
- Dockerfile 多级目录
- Docker 镜像构建
---

## 概述

代码主目录下有 `Dockerfile` 文件，Rainbond 会识别代码语言类型为 **Dockerfile**。

Rainbond 支持灵活的 Dockerfile 部署方式：
- 支持多个 Dockerfile 文件（如 Dockerfile.prd、Dockerfile.test）
- 支持多级目录下的 Dockerfile（最多二级目录）
- 支持指定不同环境的 Dockerfile 进行构建

### 编译原理

识别为 Dockerfile 类型的源码将使用类似于 `docker build -t xxx .` 的命令进行镜像构建。

**默认构建命令**：
```bash
docker build -t xxx .
```

**指定 Dockerfile 文件构建**：
```bash
docker build -t xxx -f Dockerfile.prd .
```

**多级目录 Dockerfile 构建**（在项目根目录执行）：
```bash
docker build -t xxx -f test/test/Dockerfile.test .
```

构建过程支持：
- Docker multi-stage（多阶段构建）
- ARG 参数指定
- 自定义 Dockerfile 路径（最多支持二级目录）

### Dockerfile 规范

**Dockerfile** 是由一系列命令和参数构成的脚本，这些命令应用于基础镜像并最终创建一个新的镜像。

Rainbond 在源码检测阶段会读取 [Dockerfile](https://docs.docker.com/engine/reference/builder/) 定义的如下参数：

| 参数类型 | 名称       | 说明                           |
| -------- | ---------- | ------------------------------ |
| ENV      | 环境变量   | 识别为服务可设置的环境变量配置 |
| ARG      | 构建参数   | 识别为构建可设置的参数配置     |
| EXPOSE   | 暴露端口   | 识别为服务的端口配置           |
| VOLUME   | 持久化存储 | 识别为服务的共享持久化存储配置 |

### 支持的 Dockerfile 命名方式

Rainbond 支持以下 Dockerfile 命名格式：

1. **标准命名**：`Dockerfile`
2. **环境后缀命名**：
   - `Dockerfile.prd`（生产环境）
   - `Dockerfile.test`（测试环境）
   - `Dockerfile.dev`（开发环境）
   - 或其他自定义后缀

### 支持的 Dockerfile 路径

Dockerfile 可以放置在以下位置（**最多支持二级目录**）：

**根目录**：
```
project/
└── Dockerfile
```

**一级目录**：
```
project/
└── docker/
    └── Dockerfile.prd
```

**二级目录**：
```
project/
└── build/
    └── docker/
        └── Dockerfile.test
```

:::tip
如果 Dockerfile 中使用私有镜像，需要配置镜像仓库授权，请参考[源码构建使用私有镜像](/docs/ops-guides/management/buildkit-args#场景二源码构建使用私有镜像)
:::

## 部署示例

1. 基于源码创建组件，填写以下信息：

|              | 内容                                 |
| ------------ | ------------------------------------ |
| 组件名称     | 自定义                               |
| 组件英文名称 | 自定义                               |
| 仓库地址     | `https://gitee.com/rainbond/dockerfile-demo.git` |
| 代码版本     | master                    |

2. 识别为多 Dockerfile 项目，选择您要构建的 Dockerfile 文件，点击构建启动。


## 高级功能

### 环境变量注入

在 Dockerfile 中定义的 ENV 会自动识别为组件的环境变量：

```dockerfile
FROM node:16-alpine
ENV PORT=3000
ENV NODE_ENV=production
ENV LOG_LEVEL=info

WORKDIR /app
COPY . .
EXPOSE ${PORT}
CMD ["node", "server.js"]
```

部署后可以在 **组件 → 环境配置** 中修改这些环境变量。

### 端口自动识别

Dockerfile 中的 EXPOSE 指令会自动识别为组件端口：

```dockerfile
EXPOSE 8080
EXPOSE 9090
```

部署后会在 **组件 → 端口** 中自动创建这些端口配置。

### 存储卷自动识别

Dockerfile 中的 VOLUME 指令会自动识别为持久化存储：

```dockerfile
VOLUME ["/data", "/logs"]
```

部署后会在 **组件 → 存储** 中自动创建存储卷配置。

## 常见问题

### 如何切换不同的 Dockerfile？

1. 进入组件 → 构建源 → 重新检测，选择不同的 Dockerfile 文件并保存
2. 点击 **构建** 应用更改

### Dockerfile 在子目录中，COPY 命令找不到文件

构建上下文始终是项目根目录，而不是 Dockerfile 所在目录。

在 Dockerfile 中使用相对于项目根目录的路径：

```dockerfile
# 错误：假设 Dockerfile 在 docker/ 目录
COPY ./src /app/src  # 会在 docker/src 找文件

# 正确：相对于项目根目录
COPY ./src /app/src  # 在项目根目录的 src/ 找文件
```

### 构建时提示找不到 Dockerfile

**可能原因**：
1. Dockerfile 文件名大小写错误（区分大小写）
2. Dockerfile 在超过三级的子目录中
3. Dockerfile 文件没有提交到代码仓库

**解决方案**：
1. 确保文件名正确：`Dockerfile` 或 `Dockerfile.xxx`
2. 将 Dockerfile 移动到三级或以内的目录
3. 确保 Dockerfile 已提交到 Git 仓库

### 使用私有镜像构建失败

没有配置私有镜像仓库授权。请参考[源码构建使用私有镜像](/docs/ops-guides/management/buildkit-args#场景二源码构建使用私有镜像)
