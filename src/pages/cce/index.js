import React, { Component } from 'react'
import LayoutProviders from '@theme/LayoutProviders';
import NavBar from '@theme/Navbar';
import Cces from '../../components/Helm/Cce';
import styles from '../index.module.scss';
import Footer from '@theme/Footer';
export default function Cce() { 
    return (
        <LayoutProviders>
            <NavBar />
            <Cces />
            <Footer/>
        </LayoutProviders>
    )
}
