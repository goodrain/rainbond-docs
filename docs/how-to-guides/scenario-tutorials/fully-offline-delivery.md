---
title: 软件交付到完全离线环境：物料、导入、验收和升级
description: 准备 Rainbond 安装包、应用模板、镜像与依赖清单，在完全离线网络完成安装、应用导入和升级验收。
keywords: [软件交付到完全离线环境, 离线软件交付, 内网交付]
---

# 软件交付到完全离线环境

**版本基线：** Rainbond 6.x。完全离线是指目标环境不能访问公网，必须在联网区准备全部安装与应用物料。

## 联网区物料清单

- 与目标 CPU 架构一致的 Rainbond 离线安装包和校验值。
- 应用模板离线包、全部业务镜像、数据库初始化/升级脚本。
- 域名、端口、存储类、资源规格和现场差异参数表。
- 回滚版本、数据备份方案、安装验收与故障联系信息。

```bash
sha256sum rainbond-offline-package.tgz
docker buildx imagetools inspect registry.example.com/app:v1.2.0
```

## 操作步骤

1. 在与目标环境相同架构的验证环境完成安装和业务验收。
2. 发布应用模板并导出离线包，生成物料清单与 SHA-256。
3. 通过合规介质进入离线区，先复核校验值，再安装平台。
4. 配置离线镜像仓库、存储和网关，导入应用模板。
5. 填写现场参数并安装，在验收环境执行接口、数据和重启测试。
6. 生产升级前备份数据；失败时先回滚组件，再按数据库方案恢复。

![Rainbond 离线应用模板导入流程](/img/video/offline-delivery-step-6-2.png)

## 常见故障

- 镜像缺失：根据事件中的完整镜像名补充离线仓库，不要改成 `latest` 规避版本。
- 架构不匹配：用 `imagetools inspect` 查看 manifest 是否包含目标平台。
- 安装后无法访问：检查 DNS、入口 IP、证书、网关端口和现场防火墙。
- 升级覆盖配置：先阅读 [应用升级属性规则](/docs/how-to-guides/delivery/upgrade-app)。

平台离线安装与客户交付详情见 [离线交付专题](/offline-and-xinchuang/offline-delivery)。
