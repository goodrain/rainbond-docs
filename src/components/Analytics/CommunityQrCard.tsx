import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import {trackUmamiEvent} from '@src/utils/umami';
import styles from './styles.module.css';

type CommunityQrCardProps = {
  buttonText?: string;
  imageSrc: string;
  imageAlt: string;
  module: string;
  title?: string;
  description?: string;
  sourcePage?: string;
  className?: string;
  compact?: boolean;
  alwaysVisible?: boolean;
};

export default function CommunityQrCard({
  buttonText,
  imageSrc,
  imageAlt,
  module,
  title,
  description,
  sourcePage,
  className,
  compact = false,
  alwaysVisible = false,
}: CommunityQrCardProps): JSX.Element {
  const location = useLocation();
  const [opened, setOpened] = useState(alwaysVisible);
  const currentPath = sourcePage || location.pathname || '/';
  const trackedRef = useRef(false);

  const trackOpen = () => {
    if (trackedRef.current) {
      return;
    }

    trackedRef.current = true;
    trackUmamiEvent('community_qr_opened', {
      source_page: currentPath,
      module,
    }, currentPath);
  };

  useEffect(() => {
    if (alwaysVisible) {
      trackOpen();
    }
  }, [alwaysVisible]);

  const handleClick = () => {
    const next = !opened;
    setOpened(next);

    if (next) {
      trackOpen();
    }
  };

  return (
    <div className={`${compact ? styles.qrCompact : styles.qrCard} ${className || ''}`.trim()}>
      {title ? <p className={styles.qrTitle}>{title}</p> : null}
      {description ? <p className={styles.qrDescription}>{description}</p> : null}
      {!alwaysVisible && buttonText ? (
        <button className="button button--secondary" onClick={handleClick} type="button">
          {opened ? '收起二维码' : buttonText}
        </button>
      ) : null}
      {opened ? <img className={styles.qrImage} src={imageSrc} alt={imageAlt} /> : null}
    </div>
  );
}
