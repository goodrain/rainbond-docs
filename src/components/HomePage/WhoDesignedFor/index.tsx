import React from 'react';
import styles from './styles.module.css';
import { BsCode } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';
import { FaCloud } from 'react-icons/fa';
import { IoFlash } from 'react-icons/io5';
import { IoSettingsSharp } from 'react-icons/io5';
import { TbWorld } from 'react-icons/tb';
import { MdStorage } from 'react-icons/md';
import { FaCloud as FaCloudAlt } from 'react-icons/fa';
import clsx from 'clsx';

export default function WhoDesignedFor() {
  return (
    <div className={clsx(styles.container, 'container')}>
      <h2 className={styles.title}>Who Is It Designed For?</h2>
      <p className={styles.subtitle}>
        Rainbond serves both developers and platform administrators with different needs
      </p>

      <div className={styles.grid}>
        <div className={styles.column}>
          <div className={styles.header}>
            <BsCode className={styles.icon} />
            <h3>Developer Users</h3>
          </div>
          <p className={styles.description}>Streamlined workflows for rapid development</p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <BiTime className={styles.featureIcon} />
              <div>
                <h4>Need URL access within 5 minutes from code</h4>
                <p>Rapid deployment with instant preview URLs</p>
              </div>
            </div>

            <div className={styles.feature}>
              <FaCloud className={styles.featureIcon} />
              <div>
                <h4>Want cloud-native capabilities without learning K8s</h4>
                <p>Simplified cloud operations with no Kubernetes expertise required</p>
              </div>
            </div>

            <div className={styles.feature}>
              <IoFlash className={styles.featureIcon} />
              <div>
                <h4>Zero configuration differences between dev and prod environments</h4>
                <p>Consistent environments across your entire development lifecycle</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.header}>
            <IoSettingsSharp className={styles.icon} />
            <h3>Platform Managers</h3>
          </div>
          <p className={styles.description}>Enterprise-grade cloud infrastructure management</p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <TbWorld className={styles.featureIcon} />
              <div>
                <h4>Traditional application cloud-native transformation</h4>
                <p>Modernize legacy applications with minimal disruption</p>
              </div>
            </div>

            <div className={styles.feature}>
              <MdStorage className={styles.featureIcon} />
              <div>
                <h4>Building internal PaaS platforms</h4>
                <p>Create custom platform solutions tailored to your organization</p>
              </div>
            </div>

            <div className={styles.feature}>
              <FaCloudAlt className={styles.featureIcon} />
              <div>
                <h4>Achieving unified hybrid cloud management</h4>
                <p>Seamlessly manage resources across multiple cloud environments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
