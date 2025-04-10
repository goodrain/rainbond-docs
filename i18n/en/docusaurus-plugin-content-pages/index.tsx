import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LayoutProviders from '@theme/Layout/Provider';
import NavBarEn from '@src/components/NavBarEn';

export default function EnHome() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <LayoutProviders>
            <Head>
                <title>{siteConfig.title}</title>
                <meta property='og:title' content={siteConfig.title}/>
                <link rel='icon' href={siteConfig.favicon} type='image/x-icon'/>
            </Head>

            {/* <AnnouncementBar /> */}
            <NavBarEn/>
            <iframe
                src="en-home.html"
                title="English Homepage"
                style={{
                    height: '100vh',
                    width: '100vw',
                    border: 'none',
                    overflow: 'hidden',
                    marginTop: '101.15px',
                }}
            />
            {/*<Footer/>*/}
        </LayoutProviders>
    );
}