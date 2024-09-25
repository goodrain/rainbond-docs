import React, { Component } from 'react'
import LayoutProviders from '@theme/Layout/Provider';
import NavBar from '@theme/Navbar';
import Helms from '../../components/Helm/Helm';
import styles from '../index.module.scss';
import Footer from '@theme/Footer';
export default function Helm() { 
    return (
        <LayoutProviders>
            <NavBar />
            <Helms />
            <Footer/>
        </LayoutProviders>
    )
}
