---
title: NodeJS 前后端项目部署
description: 在 Rainbond 上通过源代码部署 NodeJS 前端项目和后端项目。支持 Vue、React、Next.js、Nuxt 等前端框架和 Express、Koa、NestJS 等后端框架。
keywords:
- Rainbond 部署 Vue React 前端项目
- Rainbond 部署 Next.js Nuxt 项目
- Rainbond 部署 Express NestJS 项目
- Rainbond CNB 构建 NodeJS
---

本篇文档介绍如何在 Rainbond 平台上通过源代码部署 NodeJS 前端项目和后端项目。

Rainbond 使用 [Cloud Native Buildpacks (CNB)](https://buildpacks.io/) 构建 NodeJS 项目，基于 [Paketo Buildpacks](https://paketo.io/) 自动检测项目类型、安装依赖、执行构建并生成容器镜像。

## 项目识别

Rainbond 通过以下规则识别 NodeJS 项目：

- **package.json**：源码根目录存在此文件，识别为 NodeJS 项目
- **[纯静态项目](./html.md)**：源码根目录存在 `index.html`，但不存在 `package.json`，识别为纯静态项目

### 包管理器自动检测

根据项目中的 lock 文件自动选择包管理器：

| Lock 文件 | 包管理器 |
|-----------|---------|
| `package-lock.json` | npm |
| `yarn.lock` | yarn |
| `pnpm-lock.yaml` | pnpm |

:::warning
请确保项目中只有一个 lock 文件，且 lock 文件不为空。
:::

## 支持的框架

### 前端框架（静态站点）

构建后生成静态文件，使用 Nginx 提供服务。

| 框架 | 默认输出目录 |
|------|------------|
| Vue CLI | `dist` |
| Create React App | `build` |
| Angular | `dist` |
| Vite | `dist` |
| Next.js（静态导出） | `out` |
| Nuxt（静态生成） | `dist` |
| Docusaurus | `build` |
| 其他前端框架 | 自定义 |

### 后端框架（Node.js 服务）

构建后作为 Node.js 服务运行，自动读取 `package.json` 中的 `start` 脚本启动。

| 框架 |
|------|
| Express |
| Koa |
| NestJS |
| Next.js（SSR） |
| Nuxt（SSR） |
| 其他后端框架 |

## 构建参数

在组件的 **构建源** 页面可以配置以下参数：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 项目框架 | 选择项目使用的框架，决定构建方式 | 自动检测 |
| Node 版本 | Node.js 运行时版本 | `20.20.0` |
| NODE_ENV | 构建阶段的环境变量，production 模式下构建产物更小 | `production` |
| 构建命令 | `package.json` 中的 scripts 名称 | `build` |
| 输出目录 | 前端项目构建产物目录 | 因框架而异 |
| 启动命令 | 后端项目自定义启动命令，留空自动检测 | 空（自动） |
| Mirror 配置 | npm/yarn/pnpm 镜像源配置 | 使用国内镜像 |
| 禁用缓存 | 构建时不使用缓存 | 关闭 |

### 支持的 Node.js 版本

`18.20.7`、`18.20.8`、`20.19.6`、`20.20.0`、`22.21.1`、`22.22.0`、`24.12.0`、`24.13.0`

### Mirror 镜像配置

Rainbond 默认为 Node.js 项目配置国内镜像加速：

- **npm/pnpm 镜像**：`https://registry.npmmirror.com`（通过 `.npmrc` 注入）
- **yarn 镜像**：`https://registry.npmmirror.com`（通过 `.yarnrc` 注入）

#### 镜像配置方式

- **使用项目配置**：使用项目中已有的 `.npmrc` / `.yarnrc` 文件
- **使用自定义配置**：在构建参数页面编辑镜像配置内容，构建时自动注入

> 如果项目中已有 `.npmrc` 或 `.yarnrc` 文件，Rainbond 不会覆盖。

## 前端项目部署

### 部署步骤

1. 基于源码创建组件 → 点击更多示例 → 选择 `nodejs-demo` 并确认
2. Rainbond 自动检测为 NodeJS 项目，并自动选择对应的前端框架
3. 确认构建参数（Node 版本、构建命令、输出目录）
4. 构建并部署

### 前端项目构建流程

```
源码 → 安装依赖 → 执行构建命令 → 将输出目录部署到 Nginx
```

构建完成后，Rainbond 自动配置 Nginx 作为 Web 服务器，支持 SPA 路由（`try_files`）。

#### 自定义 Nginx.conf

如需要自定义 Nginx 配置，可以在项目根目录添加 `nginx.conf` 文件，构建时会覆盖默认配置。或者在平台上挂载配置文件到 `/workspace/nginx.conf`。以下是默认的 `nginx.conf` 内容：

<details>
<summary>默认 nginx.conf</summary>

```conf
# Number of worker processes running in container
worker_processes 1;

# Run NGINX in foreground (necessary for containerized NGINX)
daemon off;

# Set the location of the server's error log
error_log stderr;

events {
  # Set number of simultaneous connections each worker process can serve
  worker_connections 1024;
}

http {
  client_body_temp_path /tmp/client_body_temp;
  proxy_temp_path /tmp/proxy_temp;
  fastcgi_temp_path /tmp/fastcgi_temp;

  charset utf-8;

  # Map media types to file extensions
  types {
    text/html html htm shtml;
    text/css css;
    text/xml xml;
    image/gif gif;
    image/jpeg jpeg jpg;
    application/javascript js;
    application/atom+xml atom;
    application/rss+xml rss;
    font/ttf ttf;
    font/woff woff;
    font/woff2 woff2;
    text/mathml mml;
    text/plain txt;
    text/vnd.sun.j2me.app-descriptor jad;
    text/vnd.wap.wml wml;
    text/x-component htc;
    text/cache-manifest manifest;
    image/png png;
    image/tiff tif tiff;
    image/vnd.wap.wbmp wbmp;
    image/x-icon ico;
    image/x-jng jng;
    image/x-ms-bmp bmp;
    image/svg+xml svg svgz;
    image/webp webp;
    application/java-archive jar war ear;
    application/mac-binhex40 hqx;
    application/msword doc;
    application/pdf pdf;
    application/postscript ps eps ai;
    application/rtf rtf;
    application/vnd.ms-excel xls;
    application/vnd.ms-powerpoint ppt;
    application/vnd.wap.wmlc wmlc;
    application/vnd.google-earth.kml+xml  kml;
    application/vnd.google-earth.kmz kmz;
    application/x-7z-compressed 7z;
    application/x-cocoa cco;
    application/x-java-archive-diff jardiff;
    application/x-java-jnlp-file jnlp;
    application/x-makeself run;
    application/x-perl pl pm;
    application/x-pilot prc pdb;
    application/x-rar-compressed rar;
    application/x-redhat-package-manager  rpm;
    application/x-sea sea;
    application/x-shockwave-flash swf;
    application/x-stuffit sit;
    application/x-tcl tcl tk;
    application/x-x509-ca-cert der pem crt;
    application/x-xpinstall xpi;
    application/xhtml+xml xhtml;
    application/zip zip;
    application/octet-stream bin exe dll;
    application/octet-stream deb;
    application/octet-stream dmg;
    application/octet-stream eot;
    application/octet-stream iso img;
    application/octet-stream msi msp msm;
    application/json json;
    audio/midi mid midi kar;
    audio/mpeg mp3;
    audio/ogg ogg;
    audio/x-m4a m4a;
    audio/x-realaudio ra;
    video/3gpp 3gpp 3gp;
    video/mp4 mp4;
    video/mpeg mpeg mpg;
    video/quicktime mov;
    video/webm webm;
    video/x-flv flv;
    video/x-m4v m4v;
    video/x-mng mng;
    video/x-ms-asf asx asf;
    video/x-ms-wmv wmv;
    video/x-msvideo avi;
  }

  access_log /dev/stdout;

  # Set the default MIME type of responses; 'application/octet-stream'
  # represents an arbitrary byte stream
  default_type application/octet-stream;

  # (Performance) When sending files, skip copying into buffer before sending.
  sendfile on;
  # (Only active with sendfile on) wait for packets to reach max size before
  # sending.
  tcp_nopush on;

  # (Performance) Enable compressing responses
  gzip on;
  # For all clients
  gzip_static always;
  # Including responses to proxied requests
  gzip_proxied any;
  # For responses above a certain length
  gzip_min_length 1100;
  # That are one of the following MIME types
  gzip_types
    text/plain
    text/css
    text/js
    text/xml
    text/javascript
    application/javascript
    application/x-javascript
    application/json
    application/xml
    application/xml+rss
    font/eot
    font/otf
    font/ttf
    image/svg+xml;
  # Compress responses to a medium degree
  gzip_comp_level 6;
  # Using 16 buffers of 8k bytes each
  gzip_buffers 16 8k;

  # Add "Vary: Accept-Encoding” response header to compressed responses
  gzip_vary on;

  # Decompress responses if client doesn't support compressed
  gunzip on;

  # Don't compress responses if client is Internet Explorer 6
  gzip_disable "msie6";

  # Set a timeout during which a keep-alive client connection will stay open on
  # the server side
  keepalive_timeout 30;

  # Ensure that redirects don't include the internal container PORT - <%=
  # ENV["PORT"] %>
  port_in_redirect off;

  # (Security) Disable emitting nginx version on error pages and in the
  # “Server” response header field
  server_tokens off;

  server {
    listen 8080 default_server;
    server_name _;

    # Directory where static files are located
    root /workspace/dist;

    location / {
      # Send the content at / in response to *any* requested endpoint
      if (!-e $request_filename) {
        rewrite ^(.*)$ / break;
      }

      # Specify files sent to client if specific file not requested (e.g.
      # GET www.example.com/). NGINX sends first existing file in the list.
      index index.html index.htm Default.htm;
    }

    # (Security) Don't serve dotfiles, except .well-known/, which is needed by
    # LetsEncrypt
    location ~ /\.(?!well-known) {
      deny all;
      return 404;
    }
  }
}
```

</details>

## 后端项目部署

### 部署步骤

1. 基于源码创建组件 → 填写仓库地址
    - Git地址：`https://gitee.com/rainbond/nodejs-example`
    - 子目录路径： `nextjs-backend`
    - 分支：`main`
2. Rainbond 自动检测为 NodeJS 项目，并自动选择为 `Next.js(SSR)` 后端框架
3. 确认构建参数（Node 版本、构建命令）
4. 启动命令留空，自动使用 `package.json` 中的 `start` 脚本
5. 构建并部署

### 自定义启动命令

默认情况下，Rainbond 会自动读取 `package.json` 中的 `start` 脚本作为启动命令。如需自定义，请在 `package.json` 中添加对应的 script，并在构建参数中填写脚本名称：

```json
{
  "scripts": {
    "build": "next build",
    "start": "node server.js"
  }
}
```

## 常见问题

### Next.js 项目不能使用 `next.config.ts`

Next.js 16+ 默认使用 TypeScript 配置文件 `next.config.ts`，但这会导致运行时报错：

```
⚠ Installing TypeScript as it was not found while loading "next.config.ts"
ERR_PNPM_UNEXPECTED_STORE  Unexpected store location
```

**原因**：这是 [Next.js 的已知问题](https://github.com/vercel/next.js/issues/81798)。`typescript` 是 devDependency，在构建完成后会被移除（`prune`），但 `next.config.ts` 在运行时需要 TypeScript 来解析。

**解决方案**：将 `next.config.ts` 改名为 `next.config.mjs` 或 `next.config.js`。

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

### Next.js 项目不能使用 Turbopack

如果 `package.json` 中的构建命令使用了 `--turbopack` 参数（如 `next dev --turbopack`），在 CNB 构建环境中会报错：

```
Error: ENOENT: no such file or directory
```

**原因**：CNB 构建环境中 `node_modules` 通过符号链接指向 buildpack 的 layer 目录，Turbopack 无法处理这种符号链接结构。

**解决方案**：构建命令中使用 `--webpack` 替代 `--turbopack`，或直接使用 `next build`（默认使用 webpack）。

```json
{
  "scripts": {
    "build": "next build"
  }
}
```

### 构建命令只支持 scripts 名称

构建命令参数（`CNB_BUILD_SCRIPT`）只接受 `package.json` 中 `scripts` 的名称，不支持带参数的命令。

```
✅ 正确：build
✅ 正确：build:prod
❌ 错误：build --no-turbopack
```

如需传递参数，请在 `package.json` 中定义对应的 script：

```json
{
  "scripts": {
    "build": "next build --no-turbopack"
  }
}
```

### Vite 构建内存溢出

如遇到 Vite 等前端项目构建时内存溢出，可以在组件的 **环境配置** 中添加环境变量 `NODE_OPTIONS`，值为 `--max-old-space-size=4096`，然后重新构建组件。

### Lock 文件为空

如果 lock 文件（`package-lock.json`、`yarn.lock`、`pnpm-lock.yaml`）为空，构建会失败。请在本地执行对应的安装命令生成有效的 lock 文件后再提交：

```bash
npm install    # 生成 package-lock.json
yarn install   # 生成 yarn.lock
pnpm install   # 生成 pnpm-lock.yaml
```

### Nuxt 3 SSR 项目启动失败

Nuxt 3 SSR 项目构建后的启动方式是 `node .output/server/index.mjs`，但默认的 `package.json` 中没有 `start` 脚本，导致部署后无法启动。

**解决方案**：在 `package.json` 中添加 `start` 脚本：

```json
{
  "scripts": {
    "build": "nuxt build",
    "start": "node .output/server/index.mjs"
  }
}
```

然后在构建参数中将 **启动命令** 设置为 `start`。

### Nuxt 4 静态生成预渲染失败

Nuxt 4 配置了 `nitro: { static: true }` 进行静态生成时，构建报错：

```
Package import specifier "#internal/nuxt/paths" is not defined
ERROR Exiting due to prerender errors.
```

**原因**：Nuxt 4 默认将 `buildDir` 改为 `node_modules/.cache/nuxt/.nuxt`。在 CNB 构建环境中，`node_modules` 通过符号链接指向 buildpack 的 layer 目录（`/layers/paketo-buildpacks_npm-install/...`），导致预渲染时 Node.js 无法正确解析 `#internal/nuxt/paths` 子路径导入。

**解决方案**：在 `nuxt.config` 中将 `buildDir` 改回项目根目录：

```javascript
export default defineNuxtConfig({
  buildDir: '.nuxt',
  nitro: {
    static: true,
  },
})
```

### 构建时需要 Git 历史记录

部分框架（如 Docusaurus）在构建时会调用 `git log` 获取文档的最后更新时间。默认情况下，CNB 构建环境不包含 `.git` 目录，会导致构建失败：

```
fatal: not a git repository (or any parent up to mount point /)
```

**解决方案**：在组件的 **环境配置** 中添加环境变量 `BUILD_KEEP_GIT`，值为 `true`，然后重新构建组件。该变量会保留 `.git` 目录到构建环境中。
