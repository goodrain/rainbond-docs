from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path


ROOT = Path("/Users/liufan/Code/market")
ARCHIVE_DIR = ROOT / "Archive"
BLOG_2025_DIR = ROOT / "rainbond-docs" / "blog" / "2025"


@dataclass(frozen=True)
class PostConfig:
    source: str
    slug: str
    tags: tuple[str, ...]
    title_override: str | None = None


POSTS: tuple[PostConfig, ...] = (
    PostConfig(
        source="# 是时候跟虚拟机说再见了？.md",
        slug="goodbye-to-vm",
        tags=("使用场景", "应用现代化", "虚拟机"),
    ),
    PostConfig(
        source="83k Star！n8n 让 AI 驱动的工作流自动化触手可及/83k Star！n8n 让 AI 驱动的工作流自动化触手可及.md",
        slug="n8n-ai-workflow-automation",
        tags=("入门教程", "AI 应用", "n8n"),
    ),
    PostConfig(
        source="Dify+DeepSeek实战教程！企业级 AI 文档库本地化部署，数据安全与智能检索我都要/Dify+DeepSeek实战教程！企业级 AI 文档库本地化部署，数据安全与智能检索我都要.md",
        slug="dify-deepseek-private-knowledge-base",
        tags=("入门教程", "AI 应用", "Dify", "DeepSeek"),
    ),
    PostConfig(
        source="troubleshooting/利用Rainbond云原生平台简化 Kubernetes 业务问题排查.md",
        slug="kubernetes-troubleshooting-with-rainbond",
        tags=("入门教程", "故障排查", "Kubernetes"),
        title_override="利用 Rainbond 云原生平台简化 Kubernetes 业务问题排查",
    ),
    PostConfig(
        source="v5 到 v6，Rainbond 变化全面解读/v5 到 v6，Rainbond 变化全面解读.md",
        slug="rainbond-v5-to-v6-overview",
        tags=("版本发布", "Rainbond", "升级"),
    ),
    PostConfig(
        source="不懂K8s也能上云原生？三大开源平台实战对比与选型经验.md",
        slug="cloud-native-platform-comparison-2025",
        tags=("对比选型", "Rainbond", "Rancher", "KubeSphere"),
    ),
    PostConfig(
        source="传统企业如何玩转平台工程？2 个运维靠它管 50 + 应用/传统企业如何玩转平台工程？2 个运维靠它管 50 + 应用.md",
        slug="platform-engineering-for-traditional-enterprises",
        tags=("使用场景", "平台工程", "企业实践"),
    ),
    PostConfig(
        source="信创迁移必看！X86 迁 Arm 竟能全自动适配？/信创迁移必看！X86 迁 Arm 竟能全自动适配？.md",
        slug="x86-to-arm-auto-adaptation",
        tags=("信创实践", "ARM", "迁移"),
    ),
    PostConfig(
        source="在 K8S 中私有化部署Deepseek R1/K8S 部署 Deepseek 要 3 天？别逗了！Ollama+GPU Operator 1 小时搞定.md",
        slug="deepseek-r1-on-k8s-with-ollama",
        tags=("入门教程", "AI 应用", "DeepSeek", "Kubernetes"),
    ),
    PostConfig(
        source="源码构建服务域名变更/关于 Rainbond 源码构建服务域名变更通知.md",
        slug="buildpack-domain-migration-notice",
        tags=("版本发布", "公告", "源码构建"),
    ),
    PostConfig(
        source="离线环境 0 基础 10 分钟部署高可用 K8s？这个工具太强了！.md",
        slug="offline-ha-k8s-in-10-minutes",
        tags=("入门教程", "Kubernetes", "离线部署"),
    ),
    PostConfig(
        source="虚拟机是应用现代化的“肠梗阻”？这个开源软件助您一通到底！/虚拟机是应用现代化的“肠梗阻”？这个开源软件助您一通到底！.md",
        slug="vm-bottleneck-for-app-modernization",
        tags=("使用场景", "应用现代化", "虚拟机"),
    ),
    PostConfig(
        source="还不会 Cert Manager？一文读懂/还不会 Cert Manager？一文读懂.md",
        slug="cert-manager-explained",
        tags=("入门教程", "Cert Manager", "Kubernetes"),
        title_override="还不会 Cert Manager？一文读懂",
    ),
    PostConfig(
        source="还在“死磕”虚拟机？应用为中心的IT管理新范式，可能被你忽略了！/还在“死磕”虚拟机？应用为中心的IT管理新范式，可能被你忽略了！.md",
        slug="app-centric-it-management-paradigm",
        tags=("使用场景", "应用现代化", "IT 管理"),
    ),
    PostConfig(
        source="鲲鹏Arm+麒麟V10，国产化信创 K8s 离线部署保姆级教程/鲲鹏Arm+麒麟V10，国产化信创 K8s 离线部署保姆级教程.md",
        slug="kunpeng-kylin-offline-k8s-guide",
        tags=("信创实践", "ARM", "麒麟 V10", "离线部署"),
    ),
)


def normalize_title(text: str, fallback: str) -> tuple[str, str]:
    lines = text.splitlines()
    title = None
    body_lines = lines[:]
    for index, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("# "):
            title = stripped[2:].strip()
            body_lines = lines[index + 1 :]
            break
    if not title:
        title = fallback
    body = "\n".join(body_lines).strip()
    return title, body


def make_description(body: str) -> str:
    parts = [part.strip() for part in re.split(r"\n\s*\n", body) if part.strip()]
    for part in parts:
        if part.startswith("![](") or part.startswith("!["):
            continue
        if part.startswith("## ") or part.startswith("### "):
            continue
        cleaned = re.sub(r"\[(.*?)\]\((.*?)\)", r"\1", part)
        cleaned = re.sub(r"[`*_>#-]", "", cleaned)
        cleaned = re.sub(r"\s+", " ", cleaned).strip()
        if cleaned:
            return cleaned[:140]
    return "Rainbond 官方博客文章。"


def dump_frontmatter(title: str, description: str, slug: str, date: str, tags: tuple[str, ...]) -> str:
    lines = [
        "---",
        f"title: {title}",
        f"description: {description}",
        f"slug: {slug}",
        f"date: {date}",
        "tags:",
    ]
    for tag in tags:
        lines.append(f"  - {tag}")
    lines.append("---")
    return "\n".join(lines)


def convert_post(config: PostConfig) -> Path:
    source_path = ARCHIVE_DIR / config.source
    raw_text = source_path.read_text()
    fallback_title = source_path.stem.lstrip("#").strip()
    title, body = normalize_title(raw_text, fallback_title)
    if config.title_override:
        title = config.title_override
    description = make_description(body)
    date = datetime.fromtimestamp(source_path.stat().st_mtime).strftime("%Y-%m-%d")
    target_path = BLOG_2025_DIR / f"{date}-{config.slug}.md"
    frontmatter = dump_frontmatter(title, description, config.slug, date, config.tags)
    content = f"{frontmatter}\n\n{body.strip()}\n"
    target_path.write_text(content)
    return target_path


def main() -> None:
    BLOG_2025_DIR.mkdir(parents=True, exist_ok=True)
    created = []
    for config in POSTS:
        created.append(convert_post(config))
    print("Imported posts:")
    for path in created:
        print(path)


if __name__ == "__main__":
    main()
