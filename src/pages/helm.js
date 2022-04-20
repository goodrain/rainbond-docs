import React, { Component } from 'react'
import LayoutProviders from '@theme/LayoutProviders';
import NavBar from '../components/NavBar';
import Helms from '../components/Helm/Helm';
import styles from './index.module.scss';

export default function Helm() { 
    return (
        <LayoutProviders>
            <NavBar />
            <Helms />
            <div className={`${styles.copyright} footer footer--dark`}>
                Copyright © 2022 北京好雨科技有限公司, Inc. All Rights Reserved.
                京ICP备15028663号-4
            </div>
        </LayoutProviders>
    )
}
