/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Footer/Layout';
import footSytles from './styles.module.css';
import Button from '../../Button';
import Translate from '@docusaurus/Translate';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): React.JSX.Element {
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid" style={{marginTop: '50px', marginBottom: '50px'}}>
        <div className='row'>
          <div className='col col--3'>
            <div className="footer__bottom">
              <img
                alt="Rainbond logo"
                className={footSytles.footer__logo}
                src="/img/rainbondlog.png"
              />
              {/* <b className={footSytles.rainbondtext}>Rainbond</b> */}
            </div>
            <div className={clsx("footer__bottom", footSytles.slogan)}>
              <p>
                <Translate id='Footer.intro.p1'>简单易用的云原生应用管理平台，让应用管理和应用交付更加简单</Translate>
              </p>
            </div>
            <div className={clsx("footer__bottom", footSytles.slogan)}>
              <Button
                className={footSytles.footer__github}
                href='https://github.com/goodrain/rainbond'
                icon={
                  <img
                    alt="GitHub logo"
                    height={22}
                    src="/img/mark-github.svg"
                    title="GitHub"
                    width={22}
                  />
                }
                size="xsmall"
                uppercase={false}
                variant="secondary"
              >
                Star us on GitHub
              </Button>
            </div>
          </div>
          <div className='col col--9'>
            {links}
            {(logo || copyright) && (
            <div className="footer__bottom text--center">
              {logo && <div className="margin-bottom--sm">{logo}</div>}
            </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer__bottom text--center">
          {copyright}
        </div>
    </footer>
  );
}
