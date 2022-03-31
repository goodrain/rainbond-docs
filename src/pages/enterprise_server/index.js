import React from 'react';
import NavBar from '../../components/NavBar';
import styles from './index.module.scss';
export default function Index() {
  return (
    <>
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
                  <a href='http://www.rainbond.com' target='_blank'>
                    了解解决方案
                  </a>
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
                    Rainbond企业版是一个运营商级别版本，它具备超高的可靠性。
                  </li>
                  <li>提供商业版产品技术服务</li>
                  <li>产品故障支持最高响应级别 7*24</li>
                  <li>
                    专业技术支持团队（规划/实施/故障协查/bug修复/运维/软件升级/重要时期保障
                  </li>
                </ul>
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
              </div>
              {/* 详细功能差异 */}
              <div className={styles.contrast_desc_detail}>
                <div>
                  <span>基础功能</span>
                  <span>
                    <img src='/img/right.svg' alt='' />
                  </span>
                  <span>
                    <img src='/img/right.svg' alt='' />
                  </span>
                </div>
                <div>
                  <span>应用商店</span>
                  <span>
                    <img src='/img/error.svg' alt='' />
                  </span>
                  <span>
                    <img src='/img/right.svg' alt='' />
                  </span>
                </div>
                <div>
                  <span>应用门户</span>
                  <span>
                    <img src='/img/error.svg' alt='' />
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
                </div>
                <div>
                  <span>高级监控</span>
                  <span>
                    <img src='/img/error.svg' alt='' />
                  </span>
                  <span>
                    <img src='/img/right.svg' alt='' />
                  </span>
                </div>
                <div>
                  <span>开源中间件（集群版）10款</span>
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
        </section>
      </div>
    </>
  );
}
