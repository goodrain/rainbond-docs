/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from "react";
import { animated, useTrail } from "react-spring";
import styles from  "./styles.module.css";


const CustomerCase = ({ cases }) => {
  const [activeTab, setActiveTab] = useState(0);

  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: 'translateY(3em)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  })

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div className={styles.container_case}>
      <div className={styles.tabs}>
        {cases.map((item, index) => (
          <button
            key={index}
            className={`${styles.tab_button} ${activeTab === index ? styles.active : ''}`} // 使用 styles 引用样式
            onClick={() => handleTabClick(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <animated.div key={activeTab} style={animatedTexts[0]} className={styles.tab_content}>
        <div className={styles.case_card}>
          <div className={styles.case_header}>
            <img src={cases[activeTab].logo} alt={`${cases[activeTab].title} logo`} className={styles.logo} />
            <h2>{cases[activeTab].title}</h2>
          </div>
          <div className={styles.case_slogan}>
            <p>{cases[activeTab].solgan}</p>
          </div>
          <div className={styles.case_content}>
            <p>{cases[activeTab].content}</p>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default CustomerCase;
