import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface Platform {
  id: string;
  name: string;
  features: string[];
  products: string[];
}

const platforms: Platform[] = [
  {
    id: 'paas',
    name: 'Developer-friendly PaaS',
    features: [
      'Self-hosted Support',
      'Full K8s Compatibility',
    ],
    products: ['Heroku', 'Vercel'],
  },
  {
    id: 'kubernetes',
    name: 'K8s Native Tools	',
    features: [
      'Application-level Abstraction',
      'Zero YAML Experience',
      'Complex Application Topology',
      'Offline Environment Support',
    ],
    products: ['Rancher', 'Devtron'],
  },
  {
    id: 'self-hosted',
    name: 'Self-hosted Solutions',
    features: [
      'Enterprise Multi-tenancy',
      'Hybrid Cloud Management',
    ],
    products: ['CapRover', 'Coolify'],
  },
];

export default function PlatformComparison() {
  const [activeTab, setActiveTab] = useState('paas');

  return (
    <div className={clsx('container', styles.container)}>
      <h1 className={styles.section_title}>Positioning Differences with Mainstream Platforms</h1>
      <div className={styles.platform_cards}>
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={clsx(styles.platform_card, {
              [styles.active]: activeTab === platform.id,
            })}
          >
            <div className={styles.card_header}>
              <h3>{platform.name}</h3>
            </div>
            
            <div className={styles.card_content}>
              <h4>Representative Products</h4>
              <div className={styles.product_tags}>
                {platform.products.map((product) => (
                  <span key={product} className={styles.product_tag}>
                    {product}
                  </span>
                ))}
              </div>

              <div className={styles.features}>
                <h4>Rainbond's Differentiation</h4>
                <ul className={styles.feature_list}>
                  {platform.features.map((feature) => (
                    <li key={feature} className={styles.feature_item}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 