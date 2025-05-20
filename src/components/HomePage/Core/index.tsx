import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { Button, Card } from '@douyinfe/semi-ui';
import { IconCloud, IconLayers, IconApps, IconBox, IconPuzzle, IconChevronRight, IconTriangleUp, IconApartment } from '@douyinfe/semi-icons';

const capabilities = [
  {
    id: 1,
    title: '云原生兼容性与开源特性',
    icon: <IconCloud style={{ fontSize: 24 }} />,
    colorClass: styles.bgBlue,
    description: '100% 兼容 Kubernetes API，无缝对接现有 K8s 生态',
    features: [
      '100% 兼容 Kubernetes API，无缝对接现有 K8s 生态，支持多集群统一纳管与跨云应用迁移',
      '100% 开源且代码完全开放，提供开放架构，支持企业自主定制、二次开发及生态共建',
    ],
  },
  {
    id: 2,
    title: '极简操作体验',
    icon: <IconLayers style={{ fontSize: 24 }} />, 
    colorClass: styles.bgTeal,
    description: 'Serverless 级使用体验，屏蔽底层复杂度',
    features: [
      '零技术门槛：Serverless 级使用体验，屏蔽 Kubernetes、容器、微服务等底层复杂度，开发者仅需关注业务代码',
      '全图形化交互：通过可视化界面完成应用构建、部署、运维全流程，无需编写 Dockerfile/Yaml，鼠标点击即可操作',
      '智能识别与构建：自动解析 Java/Python/Go 等多语言源码，智能生成运行环境，支持自定义构建参数，快速实现容器化部署',
    ],
  },
  {
    id: 3,
    title: '一体化应用管理',
    icon: <IconApps style={{ fontSize: 24 }} />, 
    colorClass: styles.bgPurple,
    description: '传统应用无需改造，直接获取微服务治理能力',
    features: [
      '无侵入式云原生升级：传统应用无需改造，直接获取微服务治理、自动化运维、弹性扩缩等能力，降低技术转型成本',
      '业务组件化复用：基于自研 RAM 应用模型，将业务抽象为可复用组件单元，支持 "拖拉拽" 式模块化拼装与可视化编排，加速应用迭代',
      '全生命周期管理：覆盖应用设计、开发、测试、部署、监控、升级、回滚全流程，提供统一控制台集中管理多租户、多环境资源',
    ],
  },
  {
    id: 4,
    title: '应用交付能力',
    icon: <IconBox style={{ fontSize: 24 }} />, 
    colorClass: styles.bgAmber,
    description: '一次构建，多场景复用，支持多种交付模式',
    features: [
      '标准化交付体系：通过 RAM 应用模型定义统一交付格式，支持应用模板导出、版本控制与跨环境迁移，实现 "一次构建，多场景复用"',
      '多模式交付支持：涵盖源码持续交付（自动识别多语言源码、集成 CI/CD 实现代码提交即自动化构建部署）、模板化交付（业务组件 / 应用模板封装共享至应用市场）及离线交付（为私有云、军工等离线环境提供离线包与自动化工具支持本地化运维），满足全场景应用交付需求。',
    ],
  },
  {
    id: 5,
    title: '国产化信创适配',
    icon: <IconApartment style={{ fontSize: 24 }} />, 
    colorClass: styles.bgRed,
    description: '深度兼容国产CPU、操作系统，满足合规要求',
    features: [
      '全栈自主可控：深度兼容龙芯、鲲鹏、飞腾等国产 CPU，适配统信 UOS、麒麟等操作系统，满足党政、国企等关键领域合规要求',
      '三步快速迁移：提供 "环境检测→应用识别→自动化部署" 全流程工具链，无需代码改造即可完成信创环境迁移与全生命周期管理',
      '架构无缝转换：支持 x86 与 Arm 架构自动适配，保障传统应用在国产化环境中稳定运行，降低技术迁移成本',
    ],
  },
  {
    id: 6,
    title: '丰富生态与扩展能力',
    icon: <IconPuzzle style={{ fontSize: 24 }} />, 
    colorClass: styles.bgGreen,
    description: '内置80+插件与工具，无缝集成主流开源生态',
    features: [
      '开源生态整合：内置 500 + 插件与工具（如服务网格、日志采集、CI/CD）即点即用，通过应用市场持续扩展运维、监控、服务治理等能力',
      '第三方兼容性：无缝集成 Istio、Prometheus、Jenkins 等主流工具，支持自定义插件开发，灵活适配企业现有技术栈',
      '多集群与多云管理：统一纳管混合云、私有云及多个 Kubernetes 集群，实现应用跨云透明部署与资源调度，降低多云管理复杂度',
    ],
  },
];

export default function Core() {
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fade, setFade] = useState<'in' | 'out'>('in');
  const active = capabilities.find(c => c.id === activeId);
  if (!active) return null;

  // 首次加载动画
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 50);
  }, []);

  // 切换动画
  const handleTabClick = (id: number) => {
    if (id === activeId) return;
    setFade('out');
    setTimeout(() => {
      setActiveId(id);
      setFade('in');
    }, 250); // 动画时长与CSS一致
  };

  return (
    <div className={clsx('container', styles.core_section)}>
      {/* 顶部标题区 */}
      <div className={styles.core_header}>
        <h2 className={styles.core_title}>核心能力</h2>
        <p className={styles.core_desc}>100% 开源兼容 K8S，让云原生应用管理更简单、更自主、更灵活</p>
        <div className={styles.divider}></div>
      </div>
      {/* 能力导航 */}
      <div className={styles.core_nav}>
        {capabilities.map(cap => (
          <Button
            key={cap.id}
            theme={activeId === cap.id ? 'solid' : 'borderless'}
            type={activeId === cap.id ? 'primary' : 'tertiary'}
            className={clsx(styles.core_nav_btn, activeId === cap.id && styles.core_nav_btn_active)}
            onClick={() => handleTabClick(cap.id)}
          >
            {cap.title}
          </Button>
        ))}
      </div>
      {/* 内容区 */}
      <div className={clsx(
        styles.core_content_row,
        !isLoaded && styles.core_content_init,
        fade === 'in' && isLoaded && styles.core_content_fadein,
        fade === 'out' && isLoaded && styles.core_content_fadeout
      )}>
        {/* 左侧彩色卡片 */}
        <div className={clsx(styles.core_card, active.colorClass)}>
          <div className={styles.core_card_icon}>{active.icon}</div>
          <div className={styles.core_card_title}>{active.title}</div>
          <div className={styles.core_card_desc}>{active.description}</div>
        </div>
        {/* 右侧特性列表 */}
        <div className={styles.core_features_box}>
          <div className={styles.core_features_title}>
            核心特性
          </div>
          <div className={styles.core_features_list}>
            {active.features.map((feature, idx) => {
              if (Array.isArray(feature)) {
                return (
                  <ul key={idx} className={styles.core_features_sublist}>
                    {feature.map((sub, subIdx) => (
                      <li key={subIdx} className={styles.core_features_subitem}>
                        <span className={styles.core_features_dot}></span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <div key={idx} className={styles.core_features_item}>
                  <span className={styles.core_features_check}><IconTriangleUp /></span>
                  <span>{feature}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}