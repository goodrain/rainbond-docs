import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import 'antd/dist/antd.css';
import React from 'react';
import styles from './index.module.css';
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <div>
        {/* 第一屏 */}
        <section id={styles.section_first}>
          <div className={styles.rainbond_desc}>
            <h1 className={styles.title} style={{ marginBottom: '24px' }}>
              <img src='/img/rainbondlog.png' alt='Rainbond' />
            </h1>
            <h2>云原生且易用的应用管理平台</h2>
            <p
              style={{ margin: '24px 0px', color: '#637792', fontSize: '16px' }}
            >
              云原生应用交付的最佳实践，简单易用。专注于以应用为中心的理念。赋能企业搭建云原生开发云、云原生交付云。是
              <a href='https://store.goodrain.com'>Rainstore</a>
              云原生应用商店的最佳交付支撑平台
            </p>
            <div>
              <a
                className={styles.btns}
                href='https://www.rainbond.com/docs/quick-start/quick-install/'
                target='_blank'
                style={{ marginRight: '16px' }}
              >
                安装使用
              </a>
              <a
                className={styles.btns}
                href='http://demo.c9f961.grapps.cn/#/user/login'
                target='_blank'
              >
                在线体验
              </a>
            </div>
          </div>
          <div className={styles.bili_video}>
            <img src='/img/WechatIMG146.jpeg' alt='' />
          </div>
        </section>
        {/* 第二屏 */}
        <section id={styles.section_second} className={styles.width}>
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '24px',
              color: '#1890ff'
            }}
          >
            Rainbond入门教程
          </h1>
          <div className={styles.course}>
            {/* <img src='/img/images.123.png' alt='' /> */}
            <video
              className={styles.tenMin}
              style={{ maxWidth: '100%', height: 'auto' }}
              src='https://grstatic.oss-cn-shanghai.aliyuncs.com/videos/demo-video-5.2.mp4'
              controls='controls'
            ></video>
          </div>
        </section>
        {/* 第三屏 */}
        <section id={styles.section_third} className={styles.width}>
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '24px',
              color: '#1890ff'
            }}
          >
            Rainbond是什么?
          </h1>
          <ul className={styles.docs}>
            <li>
              <div className={styles.docs_logo}>
                <img src='/img/test.png' alt='test' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='javascript:;' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.docs_logo}>
                <img src='/img/test.png' alt='test' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='javascript:;' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.docs_logo}>
                <img src='/img/test.png' alt='test' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='javascript:;' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.docs_logo}>
                <img src='/img/test.png' alt='test' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='javascript:;' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.docs_logo}>
                <img src='/img/test.png' alt='test' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='javascript:;' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.docs_logo}>
                <img src='/img/test.png' alt='test' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='javascript:;' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </section>
        {/* 第四屏 */}
        <section id={styles.section_fouth} className={styles.width}>
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '24px',
              color: '#1890ff'
            }}
          >
            视频教程
          </h1>
          <div className={styles.carousel_container}>视频轮播</div>
        </section>
      </div>
    </Layout>
  );
}
