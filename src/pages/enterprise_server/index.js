import React from 'react';
import NavBar from '../../components/NavBar';
import styles from './index.module.scss';
import LayoutProviders from '@theme/Layout/Provider';
import Footer from '@theme/Footer';

export default function Index() {
  return (
    <LayoutProviders>
      {/* 导航栏 */}
      <NavBar />
      <div id={styles.box_container}>
        <section className={`${styles.width} ${styles.outside_container}`}>
          {/* 标题 */}
          <div className={styles.title}>
            <h1 style={{ textAlign: 'center', marginTop: '50px' }}>选择适合您的 Rainbond 产品</h1>
          </div>
          {/* 分类 */}
          <div className={styles.type_sort}>
            {/* 社区版 */}
            <div>
              <div
                className={styles.type_sort_title}
                style={{
                  borderBottom: '1px solid #cccccc',
                  marginBottom: '12px'
                }}
              >
                <h1>社区版</h1>
              </div>
              <div className={styles.type_sort_details}>
                <div className={styles.type_sort_free}>
                  <span>免费</span>
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    paddingLeft: 0,
                    margin: '40px 0px'
                  }}
                >
                  <li>Rainbond社区版迭代快速，优先体验产品特性</li>
                  <li>开放&开源，对接上下游项目</li>
                  <li>社区支持 & 开发者支持</li>
                </ul>
              </div>
              {/* 按钮 */}
              <div>
                <a
                  className={`${styles.btns} ${styles.free}`}
                  href='/docs/quick-start/quick-install/'
                >
                  免费下载
                </a>
              </div>
            </div>
            {/* Rainbond  Cloud */}
            <div>
              <div
                className={styles.type_sort_title}
                style={{
                  borderBottom: '1px solid #cccccc',
                  marginBottom: '12px'
                }}
              >
                <h1>Rainbond Cloud</h1>
              </div>
              <div className={styles.type_sort_details}>
                <div className={styles.type_sort_cloud}>
                  按需计量计费，用多少付多少
                </div>
                <ul
                  className={styles.cloud}
                  style={{
                    listStyle: 'none',
                    paddingLeft: 0,
                    margin: '40px 0px'
                  }}
                >
                  <li>企业级护航 SLA 99.95% 可用性承诺</li>
                  <li>提供商业版产品技术服务</li>
                  <li>享企业级功能</li>
                  <li>根据业务实际使用量，分钟级按需付费</li>
                </ul>
              </div>
              {/* 按钮 */}
              <div>
                <a
                  className={`${styles.btns} ${styles.cloud}`}
                  href='https://run.rainbond.com'
                  target='_blank'
                >
                  开始使用
                </a>
                {/* <a
                  style={{marginLeft:'160px'}}
                  className={`${styles.btns} ${styles.cloud}`}
                  href='https://rainbond.feishu.cn/share/base/form/shrcngJKwbek0nbP1bBIcFA5g6d'
                  target='_blank'
                >
                  价格计算器
                </a> */}
              </div>
            </div>
                        {/* 企业版 */}
                        <div>
              <div
                className={styles.type_sort_title}
                style={{
                  borderBottom: '1px solid #cccccc',
                  marginBottom: '12px'
                }}
              >
                <h1>企业版</h1>
              </div>
              <div className={styles.type_sort_details}>
                <div className={styles.type_sort_enterprise}>
                  <a href='/usescene'>了解解决方案</a>
                </div>
                <ul
                  className={styles.enterprise}
                  style={{
                    listStyle: 'none',
                    paddingLeft: 0,
                    margin: '40px 0px'
                  }}
                >
                  <li>
                    Rainbond企业版是一个运营商级别版本，它具备超高的可靠性
                  </li>
                  <li>提供商业版产品技术服务</li>
                  <li>产品故障支持最高响应级别 7*24</li>
                  <li>企业级功能按年提供服务</li>
                  <li>部署到客户指定运行环境</li>
                  <li>根据使用规模按需付费，高性价比</li>
                  <li>
                    专业技术支持团队
                    <span style={{ color: '#737373' }}>
                      （规划/实施/故障协查/bug修复/运维/软件升级/重要时期保障)
                    </span>
                  </li>
                </ul>
              </div>
              {/* 按钮 */}
              <div>
                <a
                  className={`${styles.btns} ${styles.enterprise}`}
                  href='https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg'
                  target='_blank'
                >
                  商业咨询
                </a>
                <a
                  style={{marginLeft:'160px'}}
                  className={`${styles.btns} ${styles.cloud}`}
                  href='https://rainbond.feishu.cn/share/base/form/shrcngJKwbek0nbP1bBIcFA5g6d'
                  target='_blank'
                >
                  预约演示
                </a>
              </div>
            </div>
          </div>
          {/* 参数对比 */}
          <div className={styles.params_contrast}>
            <div className={styles.contrast_title}>详细功能差异</div>
            <div className={styles.contrast_desc}>
              {/* 标题 */}
              <div className={styles.contrast_desc_title}>
                <span></span>
                <span>社区版</span>
                <span>Rainbond Cloud</span>
                <span>企业版</span>
              </div>
              {/* 详细功能差异 */}
              <div className={styles.contrast_desc_detail}>
                {/* 目录一*/}
                <div>
                  <div>
                    <span>应用构建</span>
                  </div>
                  <div>
                    <span>常见开发语言自动识别/自动构建</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>Dockerfile构建和镜像构建</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>集成对接Gitlab/Github/Gitee/SVN</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>持续构建及版本回滚</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>一体化开发测试环境</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                </div>
                {/* 目录二 */}
                <div>
                  <div>
                    <span>微服务架构</span>
                  </div>
                  <div>
                    <span>多种Service Mesh框架按需切换</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>支持Spring Cloud和Dubbo等常见微服务架构</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>通过“拖拉拽”的方式进行服务编排</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>多级探索式服务拓扑</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>集成skywalking/pinpoint</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                </div>
                {/* 目录三 */}
                <div>
                  <div>
                    <span>应用市场</span>
                  </div>
                  <div>
                    <span>可以运行就可以一键发布到应用市场</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>通过应用市场实现软件资产管理</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>离线导入和导出</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>复杂应用一键安装和一键升级</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>对接多个外部Helm市场</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                </div>
                {/* 目录四*/}
                <div>
                  <div>
                    <span>应用运维和管理</span>
                  </div>
                  <div>
                    <span>应用和组件两种粒度的管理模式</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>手动伸缩和自动伸缩</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>实时日志展示和对接外部日志系统</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>应用级监控和性能分析</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>通过插件扩展多种运维和管理能力</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>web终端管理</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                </div>
                {/* 目录五 */}
                <div>
                  <div>
                    <span>应用网关</span>
                  </div>
                  <div>
                    <span>端口管理和多种负载均衡策略</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>统一的域名管理和HTTPS证书管理</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>灰度发布和A/B测试</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                </div>
                {/* 目录六 */}
                <div>
                  <div>
                    <span>集群管理</span>
                  </div>
                  <div>
                    <span>对接管理虚拟机/服务器/K8s/公有云</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>应用无差别的在多云上运行</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>应用跨云备份和迁移</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>多团队和多租户管理</span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                </div>
                {/* 目录七 */}
                <div>
                  <div>
                    <span>企业级功能扩展</span>
                  </div>
                  {/* 国产化信创 */}
                  <div>
                    <a href='/docs/enterprise/xinchuang' target='_blank'>
                      <span>
                        <p style={{marginBottom:'-4px'}}>国产化信创</p>
                        <span style={{fontSize:'10px'}}>支持国产CPU和操作系统</span>
                      </span>
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  {/* 可观测性中心 */}
                  <div>
                    <a href='/docs/enterprise/observability' target='_blank'>
                      <span>
                        <p style={{marginBottom:'-4px'}}>可观测性中心</p>
                        <span style={{fontSize:'10px'}}>全局日志、报警中心、高级监控、大屏</span>
                      </span>
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  {/* 集群巡检 */}
                  <div>
                    <a href='/docs/enterprise/scanner' target='_blank'>
                      <span>
                        <p style={{marginBottom:'-4px'}}>集群巡检</p>
                        <span style={{fontSize:'10px'}}>运行巡检、配置规范巡检、安全巡检</span>
                      </span>
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  {/* 安全增强 */}
                  <div>
                    <a href='/docs/enterprise/security/' target='_blank'>
                      <span>
                        <p style={{marginBottom:'-4px'}}>安全增强</p>
                        <span style={{fontSize:'10px'}}>操作审计、安全配置、源码安全</span>
                      </span>
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  {/* 网关增强 */}
                  <div>
                    <a href='/docs/enterprise/gateway' target='_blank'> 
                      <span>
                        <p style={{marginBottom:'-4px'}}>网关增强</p>
                        <span style={{fontSize:'10px'}}>WAF防火墙、API网关、网关监控、性能提升</span>
                      </span>
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  {/* Istio可视化管理 */}
                  <div>
                    <a href='/docs/enterprise/microservices/istio' target='_blank'> 
                      <span>
                        <p style={{marginBottom:'-4px'}}>Istio可视化管理</p>
                        <span style={{fontSize:'10px'}}>流量拓扑、流量监控、零信任网络、流量控制</span>
                      </span>
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  {/* Spring  Cloud可视化管理 */}
                  <div>
                    <a href='/docs/enterprise/microservices/springcloud' target='_blank'> 
                      <span>
                        <p style={{marginBottom:'-4px'}}>Spring  Cloud可视化管理</p>
                        <span style={{fontSize:'10px'}}>流量拓扑、流量监控、调用链分析、流量控制、网关配置</span>
                      </span>
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  {/* 全链路灰度 */}
                  <div>
                    <a href='/docs/enterprise/gray-release' target='_blank'> 
                      <span>
                        <p style={{marginBottom:'-4px'}}>全链路灰度</p>
                      </span>
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  {/* 云原生应用商店 */}
                  <div>
                    <a href='https://hub.grapps.cn/privatization' target='_blank'>
                      云原生应用商店
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  {/* 其他功能优化 */}
                  <div>
                    <a href='/docs/enterprise/other' target='_blank'>
                      <span>
                        <p style={{marginBottom:'-4px'}}>其他功能优化</p>
                        <span style={{fontSize:'10px'}}>团队资源配额、组件存储文件管理</span>
                      </span>
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  {/* 定制化样式 */}
                  <div>
                    <a href='/docs/enterprise/style' target='_blank'> 
                     <span>定制化和样式</span>
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <a href='/docs/enterprise/backup' target='_blank'> 
                      <span>
                        <p style={{marginBottom:'-4px'}}>企业级备份</p>
                      </span>
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <a href='/docs/enterprise/offline' target='_blank'> 
                      <span>
                        <p style={{marginBottom:'-4px'}}>离线环境支持</p>
                      </span>
                    </a>
                    <span style={{color:'#7d7979'}}>
                      命令行
                    </span>
                    <span style={{color:'#7d7979'}}>
                      图形化
                    </span>
                    <span style={{color:'#7d7979'}}>
                      图形化
                    </span>
                  </div>
                  <div>
                    <span>应用集成和展示门户</span>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  
                  <div>
                    <span> 开源中间件（集群版）</span>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span>三级等保支持</span>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    </LayoutProviders>
  );
}
