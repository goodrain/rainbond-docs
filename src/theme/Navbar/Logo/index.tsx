/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Logo from '@theme/Logo';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function NavbarLogo(): JSX.Element {
  return (
    <Logo
      className={clsx("navbar__brand", styles.brand)}
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}
