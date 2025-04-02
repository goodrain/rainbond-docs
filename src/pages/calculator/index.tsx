import Layout from '@theme/Layout';
import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

type TimeUnit = '年' | '月' | '天' | '时';

interface Resources {
  memory: number;
  cpu: number;
  storage: number;
  network: number;
  duration: number;
  timeUnit: TimeUnit;
}

interface Prices {
  memory: number;
  cpu: number;
  storage: number;
  network: number;
  total: number;
}

export default function Calculator() {
  const [resources, setResources] = useState<Resources>({
    memory: 1,
    cpu: 0.2,
    storage: 0,
    network: 0,
    duration: 1,
    timeUnit: '时'
  });

  const [prices, setPrices] = useState<Prices>({
    memory: 0,
    cpu: 0,
    storage: 0,
    network: 0,
    total: 0
  });

  // Price rates per hour
  const RATES = {
    memory: 0.020329,    // per GB per hour
    cpu: 0.038658,       // per Core per hour
    storage: 0.000209,   // per GB per hour
    network: 0.000782    // per MB per hour
  };

  // Time unit conversion to hours
  const TIME_UNIT_TO_HOURS: Record<TimeUnit, number> = {
    '年': 24 * 30 * 12,    // 365 * 24
    '月': 24 * 30,     // (365 * 24) / 12
    '天': 24,
    '时': 1
  };

  useEffect(() => {
    const hoursMultiplier = TIME_UNIT_TO_HOURS[resources.timeUnit];
    const totalHours = resources.duration * hoursMultiplier;

    const newPrices = {
      memory: resources.memory * RATES.memory * totalHours,
      cpu: resources.cpu * RATES.cpu * totalHours,
      storage: resources.storage * RATES.storage * totalHours,
      network: resources.network * RATES.network * totalHours,
      total: 0
    };
    
    newPrices.total = Object.values(newPrices).reduce((a, b) => a + b, 0);
    setPrices(newPrices);
  }, [resources]);

  const handleInputChange = (field: keyof Resources, value: string) => {
    const numValue = parseFloat(value) || 0;
    setResources(prev => ({ ...prev, [field]: numValue }));
  };

  const handleTimeUnitChange = (unit: TimeUnit) => {
    setResources(prev => ({ ...prev, timeUnit: unit }));
  };

  // Format number with thousand separators and fixed decimals
  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const Header = {
    title: "Rainbond Cloud 价格计算器",
    description: "简单、透明的定价，助您轻松预算，开启云原生之旅"
  };

  const advantages = [
    {
      title: "开箱即用",
      description: "数据安全可控，一键部署应用"
    },
    {
      title: "按需计费",
      description: "分钟级计费，随用随开，灵活调整"
    },
    {
      title: "简单运维",
      description: "无需专门的运维，降低人力成本"
    },
    {
      title: "超值优惠",
      description: "比公有云包月费用低 40%，性价比更高"
    }
  ];

  return (
    <Layout title={Header.title} description={Header.description}>
      <div className={styles.container}>
        <h1 className={styles.titleh1}>{Header.title}</h1>
        <p className={styles.description}>{Header.description}</p>

        <div className={styles.mainContent}>
          <div className={styles.calculatorSection}>
            <div className={styles.priceDisplay}>
              <div className={styles.priceItem}>
                <span>内存</span>
                <span>¥{RATES.memory.toFixed(6)}</span>
                <div className={styles.priceUnit}>每GB/小时价格</div>
              </div>
              <div className={styles.priceItem}>
                <span>CPU</span>
                <span>¥{RATES.cpu.toFixed(6)}</span>
                <div className={styles.priceUnit}>每Core/小时价格</div>
              </div>
              <div className={styles.priceItem}>
                <span>存储</span>
                <span>¥{RATES.storage.toFixed(6)}</span>
                <div className={styles.priceUnit}>每GB/小时价格</div>
              </div>
              <div className={styles.priceItem}>
                <span>流量</span>
                <span>¥{RATES.network.toFixed(6)}</span>
                <div className={styles.priceUnit}>每MB价格</div>
              </div>
            </div>

            <div className={styles.calculator}>
              <h2 className={styles.titleh2}>资源配置</h2>
              <div className={styles.inputGroup}>
                <div className={styles.inputItem}>
                  <label>内存 (GB)</label>
                  <input
                    step="any"
                    value={resources.memory}
                    onChange={(e) => handleInputChange('memory', e.target.value)}
                  />
                </div>
                <div className={styles.inputItem}>
                  <label>CPU (Core)</label>
                  <input
                    step="any"
                    value={resources.cpu}
                    onChange={(e) => handleInputChange('cpu', e.target.value)}
                  />
                </div>
                <div className={styles.inputItem}>
                  <label>存储 (GB)</label>
                  <input
                    step="any"
                    value={resources.storage}
                    onChange={(e) => handleInputChange('storage', e.target.value)}
                  />
                </div>
                <div className={styles.inputItem}>
                  <label>流量 (MB)</label>
                  <input
                    step="any"
                    value={resources.network}
                    onChange={(e) => handleInputChange('network', e.target.value)}
                  />
                </div>
                <div className={styles.inputItem}>
                  <label>使用时长</label>
                  <div className={styles.durationSelect}>
                    <input
                      step="any"
                      value={resources.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      min="1"
                    />
                    <select
                      value={resources.timeUnit}
                      onChange={(e) => handleTimeUnitChange(e.target.value as TimeUnit)}
                    >
                      <option value="年">年</option>
                      <option value="月">月</option>
                      <option value="天">天</option>
                      <option value="时">时</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.total}>
              <span>总费用:</span>
              <span className={styles.totalPrice}>¥{formatNumber(prices.total)}</span>
            </div>
          </div>

          <div className={styles.advantagesSection}>
            <h2 className={styles.titleh2}>为什么选择 Rainbond Cloud</h2>
            <div className={styles.advantages}>
              {advantages.map((advantage, index) => (
                <div key={index} className={styles.advantageItem}>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}