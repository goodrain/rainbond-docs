import clsx from 'clsx';
import React from 'react';
import styles from "./styles.module.css";
import Link from '@docusaurus/Link';
import QueueAnim from 'rc-queue-anim';

export function CardList(item): JSX.Element {
  const CardContentList = item.props.CardContentList;

  return (
    <div className={clsx('container',styles.container)}>
      <QueueAnim className="row" component="div" interval={150}>
        {CardContentList.map(({ img, title, description, link }, index) => (
          <div className={clsx("col col--4", styles.col)} key={index}>
            <Link to={link} className={styles.link}>
              <div className={clsx('card', styles.card)}>
                <div className={clsx('card__image', styles.card_img)}>
                  <img className={styles.img} src={img} />
                </div>
                <div className="card__body">
                  <h3>{title}</h3>
                  <small style={{ color: '#637792' }}>{description}</small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </QueueAnim>
    </div>
  );
}