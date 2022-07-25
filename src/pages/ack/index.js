import React, { Component } from 'react'
import LayoutProviders from '@theme/LayoutProviders';
import NavBar from '@theme/Navbar';
import Acks from '../../components/Helm/Ack';
import styles from '../index.module.scss';
import Footer from '@theme/Footer';
export default function Ack() { 
    return (
        <LayoutProviders>
            <NavBar />
            <Acks />
            <Footer/>
        </LayoutProviders>
    )
}
