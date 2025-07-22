import React from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import styles from './index.module.scss';
import LayoutProviders from '@theme/Layout/Provider';
import Footer from '@theme/Footer';
import Layout from '@theme/Layout';
import Background from '@src/components/Background';
export default function Index() {
  const handleOnClickLinkRainbondCloud = () => {
      axios({
        method: 'get',
        url: 'https://run.rainbond.com/console/user_source',
        params: {
          content: 'visit rainbond cloud',
          sms_type: 'rainbond',
        },
      })
      .then((response) => {
        console.log(response.data);
      }
      )
      .catch((error) => {
        console.error(error);
      }
      );
      window.open('https://run.rainbond.com/#/user/login?link=enterprise')
    }
  return (
    <Layout>
      <Background />
      <div id={styles.box_container}>
        <section className={`${styles.width} ${styles.outside_container}`}>
          {/* 标题 */}
          <div className={styles.title}>
            <h1 style={{ textAlign: 'center', marginTop: '50px' }}>选择适合您的 Rainbond 产品</h1>
          </div>
          {/* 分类 */}
          <div className={styles.type_sort}>
            {/* 社区版 */}
            <div className={styles.card}>
              <div className={styles.cardTag}>自托管</div>
              <div className={styles.cardTitle}>社区版</div>
              <div className={styles.cardDesc}>为开发者提供体验与协作基础能力</div>
              <div className={styles.cardPriceRow}>
                <span className={styles.cardPrice}>免费</span>
                {/* <span className={styles.cardPriceUnit}>/月</span> */}
              </div>
              <ul className={styles.cardFeatureList}>
                <li><span className={styles.cardCheck}>{/* svg */}</span>开放开源</li>
                <li><span className={styles.cardCheck}></span>社区支持</li>
                <li><span className={styles.cardCheck}></span>社区版迭代</li>
              </ul>
              <div className={styles.cardBtns}>
                <a className={styles.cardBtnOutline} href='/docs/quick-start/quick-install/'>免费下载</a>
              </div>
            </div>
            {/* Rainbond Cloud 主推卡片 */}
            <div className={styles.cardActive}>
              <div className={styles.cardTag}>免运维</div>
              <div className={styles.cardTitleActive}>Rainbond Cloud</div>
              <div className={styles.cardDesc}>灵活适配使用场景，按需计量计费</div>
              <div className={styles.cardPriceRow}>
                <span className={styles.cardPriceActive}>按量付费</span>
                <span className={styles.cardPriceUnitActive}>/时</span>
              </div>
              <ul className={styles.cardFeatureList}>
                <li><span className={styles.cardCheckActive}></span>SLA保障</li>
                <li><span className={styles.cardCheckActive}></span>企业级功能</li>
                <li><span className={styles.cardCheckActive}></span>在线技术支持</li>
              </ul>
              <div className={styles.cardActiveBtns}>
                <a className={styles.cardBtnActive} onClick={handleOnClickLinkRainbondCloud}>开始体验</a>
                <a className={styles.cardBtnOutline} href='/calculator' target='_blank'>价格计算器</a>
              </div>
            </div>
            {/* 企业版 */}
            <div className={styles.card}>
              <div className={styles.cardTag}>私有化</div>
              <div className={styles.cardTitle}>企业版</div>
              <div className={styles.cardDesc}>为企业提供专属支持与运营商级可靠性</div>
              <div className={styles.cardPriceRow}>
                <span className={styles.cardPrice}>联系我们</span>
                <span className={styles.cardPriceUnit}></span>
              </div>
              <ul className={styles.cardFeatureList}>
                <li><span className={styles.cardCheck}></span> 专业支持</li>
                <li><span className={styles.cardCheck}></span> 7*24响应</li>
                <li><span className={styles.cardCheck}></span> 定制服务</li>
              </ul>
              <div className={styles.cardBtns}>
                <a className={styles.cardBtnActive} href='https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg' target='_blank'>商业咨询</a>
                <a className={styles.cardBtnOutline} href='https://rainbond.feishu.cn/share/base/form/shrcngJKwbek0nbP1bBIcFA5g6d' target='_blank'>预约演示</a>
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
                    <span>通过"拖拉拽"的方式进行服务编排</span>
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
                      <img src='/img/error.svg' alt='' />
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
                      <img src='/img/error.svg' alt='' />
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
                      <img src='/img/error.svg' alt='' />
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
                {/* 目录七 - 服务支持 */}
                <div>
                  <div>
                    <span>服务支持</span>
                  </div>
                  <div>
                    <span>社区支持</span>
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
                    <span>SLA保障</span>
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
                    <span>技术支持</span>
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
                    <span>现场实施与培训</span>
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
                </div>
                {/* 目录八 */}
                <div>
                  <div>
                    <span>企业级功能扩展</span>
                  </div>
                  {/* 国产化信创 */}
                  <div>
                    <span>
                      <p style={{marginBottom:'-4px'}}>国产化信创</p>
                      <span style={{fontSize:'10px'}}>支持国产CPU和操作系统</span>
                    </span>
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
                    <span>
                      <p style={{marginBottom:'-4px'}}>可观测性中心</p>
                      <span style={{fontSize:'10px'}}>全局日志、报警中心、高级监控、大屏</span>
                    </span>
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
                    <span>
                      <p style={{marginBottom:'-4px'}}>集群巡检</p>
                      <span style={{fontSize:'10px'}}>运行巡检、配置规范巡检、安全巡检</span>
                    </span>
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
                    <span>
                      <p style={{marginBottom:'-4px'}}>安全增强</p>
                      <span style={{fontSize:'10px'}}>操作审计、安全配置、源码安全</span>
                    </span>
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
                    <span>
                      <p style={{marginBottom:'-4px'}}>网关增强</p>
                      <span style={{fontSize:'10px'}}>WAF防火墙、API网关、网关监控、性能提升</span>
                    </span>
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
                    <span>
                      <p style={{marginBottom:'-4px'}}>Istio可视化管理</p>
                      <span style={{fontSize:'10px'}}>流量拓扑、流量监控、零信任网络、流量控制</span>
                    </span>
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
                    <span>
                      <p style={{marginBottom:'-4px'}}>Spring  Cloud可视化管理</p>
                      <span style={{fontSize:'10px'}}>流量拓扑、流量监控、调用链分析、流量控制、网关配置</span>
                    </span>
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
                    <span>
                      <p style={{marginBottom:'-4px'}}>全链路灰度</p>
                    </span>
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
                    <span>云原生应用商店</span>
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
                    <span>
                      <p style={{marginBottom:'-4px'}}>其他功能优化</p>
                      <span style={{fontSize:'10px'}}>团队资源配额、组件存储文件管理</span>
                    </span>
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
                    <span>定制化和样式</span>
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
                    <span>
                      <p style={{marginBottom:'-4px'}}>企业级备份</p>
                    </span>
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
                    <span>
                      <p style={{marginBottom:'-4px'}}>离线环境支持</p>
                    </span>
                    <span style={{color:'#7d7979'}}>
                      命令行
                    </span>
                    <span style={{color:'#7d7979'}}>
                      不支持
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
                      <img src='/img/error.svg' alt='' />
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
                      <img src='/img/error.svg' alt='' />
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
      </div>
    </Layout>
  );
}
