import React from 'react';
import NavBar from '../../components/NavBar';
import styles from './index.module.scss';
import LayoutProviders from '@theme/LayoutProviders';
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
            <h1 style={{ textAlign: 'center' }}>选择适合您的 Rainbond 产品</h1>
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
                  <li>
                    专业技术支持团队
                    <span style={{ color: '#c9c9c9' }}>
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
                <h1>服务订阅</h1>
              </div>
              <div className={styles.type_sort_details}>
                <div
                  className={styles.type_sort_enterprise}
                  style={{ visibility: 'hidden' }}
                >
                  <a
                    href='http://www.rainbond.com'
                    target='_blank'
                    style={{ color: '#f1aa4c' }}
                  >
                    了解解决方案
                  </a>
                </div>
                <ul
                  className={styles.cloud}
                  style={{
                    listStyle: 'none',
                    paddingLeft: 0,
                    margin: '40px 0px'
                  }}
                >
                  <li>企业级功能按年提供服务</li>
                  <li>部署到客户指定运行环境</li>
                  <li>根据使用规模按需付费，高性价比</li>
                  <li>一对一专业工程师提供服务
                    <span style={{ color: '#c9c9c9' }}>
                    （效果达成/故障协查/bug修复/平台运维/软件升级）
                    </span>
                  </li>
                </ul>
              </div>
              {/* 按钮 */}
              <div>
                <a
                  className={`${styles.btns} ${styles.enterprise}`}
                  href='https://rainbond.feishu.cn/share/base/shrcnvP5VXbLaTb3n7B7YMZweRb'
                  target='_blank'
                >
                  商业咨询
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
                <span>企业版</span>
                <span>服务订阅</span>
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

                  <div>
                    <span>企业样式定制（Logo和名称可修改）</span>
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
                    <span>GPU资源限制和共享</span>
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
                    <span>操作审计</span>
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
                    <span>高级监控和报警</span>
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
                    <span>国产化支持</span>
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
                    <span>应用集成和展示门户</span>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <a href='http://store.goodrain.com' target='_blank'>
                      云原生应用商店
                    </a>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/right.svg' alt='' />
                    </span>
                    <span>
                      <img src='/img/error.svg' alt='' />
                    </span>
                  </div>
                  <div>
                    <span> 开源中间件（集群版）10款</span>
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
