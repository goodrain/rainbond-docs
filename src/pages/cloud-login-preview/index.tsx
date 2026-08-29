import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { Activity, ArrowRight, CloudCog, PackageOpen } from 'lucide-react';
import styles from './styles.module.css';

const CLOUD_JOURNEY = [
  {
    title: '部署应用',
    description: '源码、镜像、应用市场',
    icon: PackageOpen,
  },
  {
    title: '自动准备环境',
    description: '构建、网络、HTTPS',
    icon: CloudCog,
  },
  {
    title: '持续运维',
    description: '日志、监控、故障排查',
    icon: Activity,
  },
] as const;

export default function CloudLoginPreview() {
  return (
    <>
      <Head>
        <title>登录 Rainbond Cloud</title>
        <meta
          name="description"
          content="登录 Rainbond Cloud，部署 AI 生成的项目、开源软件和业务应用。"
        />
      </Head>

      <main className={styles.page}>
        <header className={styles.header}>
          <Link to="/" className={styles.brand} aria-label="Rainbond Cloud 首页">
            <img src="/img/rainbondlog.png" alt="Rainbond" width={200} height={32} />
            <span className={styles.cloudTag}>Cloud</span>
          </Link>
          <Link to="/" className={styles.backLink}>
            返回 Rainbond 官网
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </header>

        <div className={styles.content}>
          <section className={styles.loginPanel} aria-labelledby="cloud-login-title">
            <form className={styles.loginCard} onSubmit={(event) => event.preventDefault()}>
              <div className={styles.cardHeading}>
                <span className={styles.cardEyebrow}>RAINBOND CLOUD</span>
                <h2 id="cloud-login-title">登录 Rainbond Cloud</h2>
                <p>使用手机号验证码登录，无需设置密码</p>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="cloud-phone">手机号</label>
                <input
                  id="cloud-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="请输入手机号"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="cloud-code">验证码</label>
                <div className={styles.codeRow}>
                  <input
                    id="cloud-code"
                    name="code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="请输入验证码"
                  />
                  <button type="button" className={styles.codeButton}>获取验证码</button>
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>登录 / 注册</button>
              <p className={styles.accountHint}>首次登录将自动创建账户</p>
              <p className={styles.terms}>
                登录即表示同意我们的 <a href="#service-terms">服务条款</a> 和 <Link to="/privacy">隐私政策</Link>
              </p>
            </form>
          </section>

          <section className={styles.hero} aria-labelledby="cloud-hero-title">
            <span className={styles.eyebrow}>RAINBOND CLOUD</span>
            <h1 id="cloud-hero-title">
              AI 生成，
              <span>Rainbond Cloud 运行</span>
            </h1>
            <p className={styles.description}>
              无需准备服务器。登录后即可部署 AI 生成的项目、开源软件和业务应用，构建、网络、HTTPS 与日常运维自动完成。
            </p>

            <div className={styles.journey} aria-label="Rainbond Cloud 使用流程">
              {CLOUD_JOURNEY.map(({ title, description, icon: Icon }) => (
                <div key={title} className={styles.journeyItem}>
                  <span className={styles.journeyIcon}>
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </div>
              ))}
            </div>

            <p className={styles.selfHostPrompt}>
              想运行在自己的服务器？
              <Link to="/docs/quick-start/quick-install">
                安装 Rainbond
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
