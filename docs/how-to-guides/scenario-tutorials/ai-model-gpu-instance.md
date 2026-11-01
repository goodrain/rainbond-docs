---
title: AI 模型服务和 GPU 实例部署：资源、API 与监控
description: 在 Rainbond 中准备模型、创建 CPU/GPU 模型实例、配置 vLLM 参数、开放 OpenAI 兼容 API，并检查 GPU 和请求指标。
keywords: [AI模型服务部署, GPU实例部署, GPU资源与模型实例管理]
---

# AI 模型服务和 GPU 实例部署

**版本基线：** Rainbond 6.x AI 大模型功能；当前公开界面证据主要覆盖 NVIDIA GPU 资源。其他 GPU 类型需按插件、驱动、Kubernetes Device Plugin 和模型框架逐项验证。

## 前置检查

```bash
kubectl get nodes -o custom-columns=NAME:.metadata.name,GPU:.status.capacity.nvidia\\.com/gpu
kubectl describe node <gpu-node-name>
```

## 操作步骤

1. 从内置模型、ModelScope、HTTP、上传文件或本地路径准备模型；离线环境提前导入模型文件。
2. 创建模型实例，选择推理引擎、CPU/GPU 模式、GPU 型号与数量、节点和环境变量。
3. vLLM 模型按显存设置量化、显存利用率和最大上下文长度。
4. 启动实例，检查状态、事件和日志；先用平台在线调试完成最小请求。
5. 创建 API Key，记录 OpenAI 兼容 base URL 和模型名称，再接入 Dify 或业务系统。
6. 观察请求数、失败数、平均响应时间、GPU 总览和实例占用关系。

![Rainbond 创建 GPU 大模型实例](/img/video/rainbond-llm-install-use-step-4.png)

![Rainbond 模型服务与 GPU 监控](/img/video/rainbond-llm-install-use-step-7.png)

## 常见故障

- GPU 数量为 0：检查节点驱动、Device Plugin 和资源名称。
- 模型加载 OOM：降低上下文或显存利用率，使用量化模型，或增加 GPU 资源。
- API 401：确认密钥有效且请求使用正确模型名。
- 首次启动很慢：区分模型下载、镜像拉取和模型加载；离线环境必须预置全部物料。

“AI 网关”在当前公开证据中指模型地址、API Key 和 OpenAI 兼容接入，不应扩展为多厂商路由、配额和计费能力。详见 [AI 应用专题](/solutions/ai-private-deployment)。
