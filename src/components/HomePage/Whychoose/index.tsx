import React, { useState } from 'react';
import { IconBriefcase, IconCode, IconShield, IconCloud, IconLayers, IconBox, IconBookmark, IconAlertTriangle, IconTickCircle, IconChevronRight } from '@douyinfe/semi-icons';
import { Tooltip } from '@douyinfe/semi-ui';
import clsx from 'clsx';
import styles from './styles.module.css';

const WhyChoose: React.FC = () => {
  const [activeTab, setActiveTab] = useState('enterprise');
  const [supplierOpen, setSupplierOpen] = useState(false);

  // 供应商管理每个li的展开状态
  const supplierList = [
    {
      title: '供应商协作与交付环境优化',
      detail: '为供应商提供独立隔离的测试空间，灵活分配计算资源避免干扰，同时通过一体化环境支持定制开发、软件包等多模式交付，兼容主流格式，助力供应商快速完成部署与测试，提升协作效率。'
    },
    {
      title: '标准化交付与无缝升级体验',
      detail: '测试通过的软件可一键生成 "应用模板"，实现生产环境秒级上线；版本迭代时，仅需更新模板即可一键完成生产环境升级，全程业务不中断，大幅降低运维风险与操作成本。'
    },
    {
      title: '全流程可追溯与管理保障',
      detail: '从交付、测试到上线、升级的每一步操作均自动留痕，企业可实时追溯全链条数据，结合细粒度权限控制，确保交付质量可控、责任清晰，全面满足安全合规与管理需求。'
    },
  ];
  const [supplierOpenArr, setSupplierOpenArr] = useState(Array(supplierList.length).fill(false));

  const resourcesList = [
    {
      title: '多类基础设施统一接入与灵活管理',
      detail: '兼容物理机 / 虚拟机 / K8s 集群，一站式对接现有 IT 资源，避免重复投资，实现跨架构统一纳管。'
    },
    {
      title: '多集群集中管控与资源优化',
      detail: '通过可视化面板集中管理多地区集群，支持资源独享 / 共享模式灵活分配，利用率提升 30%+，告别 "抢资源" 难题。'
    },
    {
      title: '细粒度权限控制与安全合规',
      detail: '自定义团队权限边界，操作权责清晰可见，全流程符合信创安全标准，保障企业资源管理合规无忧。'
    },
  ];
  const [resourcesOpenArr, setResourcesOpenArr] = useState(Array(resourcesList.length).fill(false));

  const opsList = [
    {
      title: '低门槛应用全生命周期管理',
      detail: '无需掌握 K8s 底层技术，通过可视化界面即可一站式完成应用部署、升级、扩容、监控等全流程操作，让普通人员也能轻松管理应用。'
    },
    {
      title: '高效部署与智能运维能力',
      detail: '支持一键部署和向导式操作，主流应用分钟级上线；基于 K8s 底层自动实现高可用、负载均衡与弹性伸缩，同时集中管理百套应用，状态实时可视化，问题早发现早处理。'
    },
    {
      title: '少人化运维与成本优化',
      detail: '通过自动化能力大幅减少人工操作，少量 IT 人员即可管理大量应用系统，人力成本降低 50%+，同时避免手动操作失误，提升运维稳定性与效率。'
    },
  ];
  const [opsOpenArr, setOpsOpenArr] = useState(Array(opsList.length).fill(false));

  const softwareList = [
    {
      title: 'Git 集成与交付资产留存',
      detail: '自动连接 Git 仓库，一键完成代码拉取编译且可追溯，交付成果以模板形式留存，供应商离场后企业仍可自主编译测试，实现技术资产自主可控。'
    },
    {
      title: '全版本管理与流程合规',
      detail: '应用模板全版本留档，支持一键回滚或升级，保障迭代效率与安全；交付、编译、部署全流程记录可追溯，责任清晰透明，满足合规管理要求。'
    },
    {
      title: '模板复用与能力沉淀',
      detail: '应用模板支持企业内部复用共享，将历史交付成果转化为 "能力库"，新项目可直接调用，减少重复开发成本，最大化软件资产价值。'
    },
  ];
  const [softwareOpenArr, setSoftwareOpenArr] = useState(Array(softwareList.length).fill(false));

  // 可复用的可展开列表组件
  interface ExpandableListItem {
    title: string;
    detail: string;
  }
  interface ExpandableListProps {
    list: ExpandableListItem[];
    openArr: boolean[];
    setOpenArr: React.Dispatch<React.SetStateAction<boolean[]>>;
  }
  const ExpandableList: React.FC<ExpandableListProps> = ({ list, openArr, setOpenArr }) => (
  <ul className={styles.noDotList} style={{paddingLeft: 0}}>
    {list.map((item, idx) => (
      <li
        key={idx}
        className={styles.painPointListItem}
        onClick={() => {
          setOpenArr((arr: boolean[]) => arr.map((v, i) => i === idx ? !v : v));
        }}
        style={{cursor: 'pointer'}}
      >
        <span className={styles.painPointListIcon}>
          <IconChevronRight style={{transition: 'transform 0.2s', transform: openArr[idx] ? 'rotate(90deg)' : 'rotate(0deg)'}} />
        </span>
        <div className={styles.painPointListContent}>
          {item.title}
          {openArr[idx] && (
            <div className={styles.painPointListDetail}>{item.detail}</div>
          )}
        </div>
      </li>
    ))}
  </ul>
);

  return (
    <div className="container">
      <div className="text--center margin-bottom--xl">
        <h2 className={styles.sectionTitle}>为什么选择 Rainbond？</h2>
        <p className={styles.sectionSubtitle}>
          为不同场景量身定制云原生解决方案
        </p>
        <div className={styles.divider}></div>
      </div>

      <div className={styles.contentWrapper}>
        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabsWrapper}>
            <button
              onClick={() => setActiveTab('enterprise')}
              className={clsx(styles.tabButton, {
                [styles.activeTab]: activeTab === 'enterprise'
              })}
            >
              <IconBriefcase size="large" />
              <div>
                <div className={styles.tabTitle}>企业技术团队</div>
                <div className={styles.tabSubtitle}>传统, 国企</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('devops')}
              className={clsx(styles.tabButton, {
                [styles.activeTab]: activeTab === 'devops'
              })}
            >
              <IconCode size="large" />
              <div>
                <div className={styles.tabTitle}>开发与中小型</div>
                <div className={styles.tabSubtitle}>开发者, 中小团队</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('domestic')}
              className={clsx(styles.tabButton, {
                [styles.activeTab]: activeTab === 'domestic'
              })}
            >
              <IconShield size="large" />
              <div>
                <div className={styles.tabTitle}>信创与国产化</div>
                <div className={styles.tabSubtitle}>政府</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('offline')}
              className={clsx(styles.tabButton, {
                [styles.activeTab]: activeTab === 'offline'
              })}
            >
              <IconCloud size="large" />
              <div>
                <div className={styles.tabTitle}>离线与特殊环境</div>
                <div className={styles.tabSubtitle}>军工, 航空</div>
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={styles.contentContainer}>
          {/* Enterprise Content */}
          {activeTab === 'enterprise' && (
            <div className={styles.tabContent}>
              <div className={styles.contentHeader}>
                <div className={styles.iconWrapper}>
                  <IconBriefcase size="extra-large" />
                </div>
                <div>
                  <h3 className={styles.contentTitle}>企业技术团队</h3>
                  <p className={styles.contentSubtitle}>满足企业数字化云原生转型需求</p>
                </div>
              </div>

              <div className={styles.solutionCards}>
                {/* Traditional Enterprise Card */}
                <div className={clsx(styles.solutionCard, styles.traditionalCard)}>
                  <div className={styles.cardHeader}>
                    <IconBriefcase size="large" />
                    <h4>供应商与资源管理</h4>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.solutions}>
                      <h5 style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                        <IconTickCircle size="small" />
                        <span style={{marginLeft: 4, marginRight: 4}}>供应商管理</span>
                      </h5>
                      <ExpandableList list={supplierList} openArr={supplierOpenArr} setOpenArr={setSupplierOpenArr} />
                    </div>
                    <div className={styles.solutions}>
                      <h5 style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                        <IconTickCircle size="small" />
                        <span style={{marginLeft: 4, marginRight: 4}}>资源统一管理</span>
                      </h5>
                      <ExpandableList list={resourcesList} openArr={resourcesOpenArr} setOpenArr={setResourcesOpenArr} />
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.metricValue}>80%</div>
                      <div className={styles.metricLabel}>应用转型周期缩短</div>
                    </div>
                  </div>
                </div>

                {/* SME Card */}
                <div className={clsx(styles.solutionCard, styles.smeCard)}>
                  <div className={styles.cardHeader}>
                    <IconLayers size="large" />
                    <h4>应用运维与资产化管理</h4>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.solutions}>
                      <h5 style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                        <IconTickCircle size="small" />
                        <span style={{marginLeft: 4, marginRight: 4}}>应用自动化运维</span>
                      </h5>
                      <ExpandableList list={opsList} openArr={opsOpenArr} setOpenArr={setOpsOpenArr} />
                    </div>
                    <div className={styles.solutions}>
                      <h5 style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                        <IconTickCircle size="small" />
                        <span style={{marginLeft: 4, marginRight: 4}}>软件资产化管理</span>
                      </h5>
                      <ExpandableList list={softwareList} openArr={softwareOpenArr} setOpenArr={setSoftwareOpenArr} />
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.metricValue}>60%</div>
                      <div className={styles.metricLabel}>IT 资源投入降低</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DevOps Content */}
          {activeTab === 'devops' && (
            <div className={styles.tabContent}>
              <div className={styles.contentHeader}>
                <div className={styles.iconWrapper}>
                  <IconCode size="extra-large" />
                </div>
                <div>
                  <h3 className={styles.contentTitle}>开发与中小型</h3>
                  <p className={styles.contentSubtitle}>提升个人与初创、中小团队开发效率</p>
                </div>
              </div>

              <div className={styles.solutionCards_devops}>
                {/* Developer Card */}
                <div className={clsx(styles.solutionCard, styles.traditionalCard)}>
                  <div className={styles.cardHeader}>
                    <IconCode size="large" />
                    <h4>个人开发者</h4>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.painPoints}>
                      <h5>
                        <IconAlertTriangle size="small" />
                        痛点挑战
                      </h5>
                      <ul>
                        <li>需掌握 Kubernetes、Docker 等底层技术</li>
                        <li>开发精力被基础设施配置分散</li>
                        <li>手动编写 Dockerfile/Yaml 易出错</li>
                      </ul>
                    </div>
                    <div className={styles.solutions}>
                      <h5>
                        <IconTickCircle size="small" />
                        解决方案
                      </h5>
                      <ul>
                        <li>屏蔽底层架构复杂性</li>
                        <li>自动识别多语言源码并生成运行环境</li>
                        <li>通过图形化工具一键完成构建部署</li>
                      </ul>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.metricValue}>70%</div>
                      <div className={styles.metricLabel}>开发效率提升</div>
                    </div>
                  </div>
                </div>

                {/* Ops Card */}
                <div className={clsx(styles.solutionCard, styles.smeCard)}>
                  <div className={styles.cardHeader}>
                    <IconShield size="large" />
                    <h4>初创与中小团队</h4>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.painPoints}>
                      <h5>
                        <IconAlertTriangle size="small" />
                        痛点挑战
                      </h5>
                      <ul>
                        <li>技术团队规模小，缺乏专业云原生人才</li>
                        <li>手动部署 K8s 难度大、易出错</li>
                        <li>企业预算有限，需控制技术投入成本</li>
                      </ul>
                    </div>
                    <div className={styles.solutions}>
                      <h5>
                        <IconTickCircle size="small" />
                        解决方案
                      </h5>
                      <ul>
                        <li>全图形化操作替代复杂代码配置</li>
                        <li>自动识别多语言源码并生成运行环境</li>
                        <li>内置 500+ 开源应用一键安装</li>
                      </ul>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.metricValue}>60%</div>
                      <div className={styles.metricLabel}>IT 资源投入降低</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Domestic Content */}
          {activeTab === 'domestic' && (
            <div className={styles.tabContent}>
              <div className={styles.contentHeader}>
                <div className={styles.iconWrapper}>
                  <IconShield size="extra-large" />
                </div>
                <div>
                  <h3 className={styles.contentTitle}>信创与国产化需求机构</h3>
                  <p className={styles.contentSubtitle}>政府、国企、关键行业</p>
                </div>
              </div>

              <div className={styles.painCard}>
                <div className={styles.painCardTitle}>痛点</div>
                <div className={styles.painCardContent}>
                  需适配龙芯、鲲鹏等国产 CPU 及统信、麒麟等操作系统，传统方案兼容性差、迁移成本高；技术栈依赖国外组件，难以满足自主可控与安全合规要求。
                </div>
              </div>

              <div className={styles.solutionCardBlock}>
                <div className={styles.solutionCardTitle}>解决方案</div>
                <div className={styles.solutionCardContent}>
                  深度兼容主流国产化环境，提供 "环境检测→应用识别→自动化部署" 三步迁移工具链，无需代码改造即可完成信创适配，100% 开源架构支持自主审计，满足安全合规需求。
                </div>
              </div>

              <div className={styles.metricsGrid}>
                <div className={styles.metricBox}>
                  <div className={styles.metricValue}>100%</div>
                  <div className={styles.metricLabel}>兼容国产CPU架构</div>
                </div>
                <div className={styles.metricBox}>
                  <div className={styles.metricValue}>3步</div>
                  <div className={styles.metricLabel}>完成信创环境迁移</div>
                </div>
                <div className={styles.metricBox}>
                  <div className={styles.metricValue}>0改造</div>
                  <div className={styles.metricLabel}>无需修改现有代码</div>
                </div>
              </div>
            </div>
          )}

          {/* Offline Content */}
          {activeTab === 'offline' && (
            <div className={styles.tabContent}>
              <div className={styles.contentHeader}>
                <div className={styles.iconWrapper}>
                  <IconCloud size="extra-large" />
                </div>
                <div>
                  <h3 className={styles.contentTitle}>离线与特殊环境用户</h3>
                  <p className={styles.contentSubtitle}>军工、航空、偏远地区</p>
                </div>
              </div>

              <div className={styles.painCard}>
                <div className={styles.painCardTitle}>痛点</div>
                <div className={styles.painCardContent}>
                  离线环境无法联网部署，传统方案依赖手动拷贝文件，易出错且难以更新；设备资源有限，需轻量化、稳定的自动化运维工具。
                </div>
              </div>

              <div className={styles.solutionCardBlock}>
                <div className={styles.solutionCardTitle}>解决方案</div>
                <div className={styles.solutionCardContent}>
                  提供离线安装包、应用镜像包与本地化部署工具，支持断网环境下的应用自动化交付与全生命周期管理，适配低配置设备，保障离线场景稳定运行。
                </div>
              </div>

              <div className={styles.featureGrid}>
                <div className={styles.featureBox}>
                  <h6>离线部署包</h6>
                  <p>完整的离线安装包，无需网络连接即可部署完整平台</p>
                </div>
                <div className={styles.featureBox}>
                  <h6>断网运维</h6>
                  <p>支持完全离线环境下的应用升级、扩容、监控</p>
                </div>
                <div className={styles.featureBox}>
                  <h6>低资源消耗</h6>
                  <p>针对资源受限环境优化，最低2核4G即可运行</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;