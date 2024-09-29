/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Svg, {type SvgIconProps} from '@site/src/components/Svg';

export default function AppsIcon(
  props: Omit<SvgIconProps, 'children'>,
): React.JSX.Element {
  return (
    <Svg {...props}>
      <path d="M951.901 244.015l-413.3-238.57a33.606 33.606 0 0 0-33.909 0L91.3 244.016c-10.426 6.12-16.99 17.221-16.99 29.346v477.184c0 12.149 6.447 23.343 16.99 29.37l413.3 238.662c5.213 2.933 11.101 4.515 16.99 4.515 5.794 0 11.775-1.582 16.988-4.515l413.3-238.661c10.427-6.121 16.99-17.222 16.99-29.37V273.36a33.908 33.908 0 0 0-16.966-29.346zM892.23 726.016l-370.618 213.97-370.642-213.97v-427.87L521.588 84.178l370.642 213.97v427.869z m8.797 5.073" />
    </Svg>
  );
}
