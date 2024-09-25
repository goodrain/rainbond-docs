import React, { Component } from 'react'
import LayoutProviders from '@theme/Layout/Provider';
import NavBar from '@theme/Navbar';
import Tkes from '../../components/Helm/Tke';
import styles from '../index.module.scss';
import Footer from '@theme/Footer';
export default function Tke() { 
    return (
        <LayoutProviders>
            <NavBar />
            <Tkes />
            <Footer/>
        </LayoutProviders>
    )
}
