import React from 'react';
import { useState } from 'react';
import styles from './style.module.css';

export interface CardProps {
  name: string;
  children: string;
  githubUrl: string;
  blogUrl?: string;
}

function Card({ name, children, githubUrl, blogUrl }: CardProps) {
  return (
    <div className="card">
      <div className={`${styles.cardHeader} card__header`}>
        <img className="avatar__photo" src={`${githubUrl}.png`} />
        <div className="avatar">
          <div className={`${styles.avatarIntro} avatar__intro`}>
            <div className="avatar__name">{name}</div>
            <small className={`${styles.avatarSubtitle} avatar__subtitle`}>
              {children}
            </small>
          </div>
        </div>
      </div>
      <div className="card__footer">
        <div className="button-group button-group--block">
          <a className="button button--secondary" href={githubUrl}>
            Github
          </a>
          {blogUrl ? (
            <a className="button button--secondary" href={blogUrl}>
              Blog
            </a>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
export function TocCardList(): React.JSX.Element {
  return (
    <div className="container">
      <div className="row">
        <div className={`${styles.col__6} col col--6`}>
          <Card
            name="Ke Yang"
            children="Software Engineer"
            githubUrl="https://github.com/yangkaa"
          />
        </div>
        <div className={`${styles.col__6} col col--6`}>
          <Card
            name="Xun Guo"
            children="Software Engineer"
            githubUrl="https://github.com/dazuimao1990"
          />
        </div>
        <div className={`${styles.col__6} col col--6`}>
          <Card
            name="Peng Ding"
            children="集中起来的意志可以击穿顽石。"
            githubUrl="https://github.com/pescox"
          />
        </div>
        <div className={`${styles.col__6} col col--6`}>
          <Card
            name="Qi Zhang"
            children="💻专注于云原生领域，💪不断学习"
            githubUrl="https://github.com/zzzhangqi"
            blogUrl="https://smallq.cn"
          />
        </div>
      </div>
    </div>
  );
}
export function ContributorCardList(): React.JSX.Element {
  const [contributors] = useState([
    'https://github.com/GLYASAI',
    'https://github.com/barnettZQG',
    'https://github.com/zhoujunhaowzh',
    'https://github.com/fanyangyang',
    'https://github.com/yangkaa',
    'https://github.com/Gemrails',
    'https://github.com/sycki',
    'https://github.com/ysicing',
    'https://github.com/pescox',
    'https://github.com/smarthadron',
    'https://github.com/Youngerzkc',
    'https://github.com/zhouyq',
    'https://github.com/Aomr-Moon',
    'https://github.com/ZhangSetSail',
    'https://github.com/quyuancheng',
    'https://github.com/shangshanzhishui',
    'https://github.com/cdtft',
    'https://github.com/hainesc',
    'https://github.com/zzzhangqi',
    'https://github.com/dazuimao1990',
    'https://github.com/zzhuf',
    'https://github.com/crowser',
    'https://github.com/21-STA',
    'https://github.com/panda-zxs',
    'https://github.com/RainBondsongyg',
    'https://github.com/zsl1549',
    'https://github.com/xuzhonglin12138',
    'https://github.com/Alubatm',
    'https://github.com/yyqhlw',
    'https://github.com/zhengxianlin',
    'https://github.com/BlueBeards',
    'https://github.com/Shanks0724',
    'https://github.com/ytweb',
    'https://github.com/token01',
    'https://github.com/Aaron-23',
    'https://github.com/1909490139',
    'https://github.com/wuwen009',
    'https://github.com/smarthadron',
    'https://github.com/Mrexamo',
    'https://github.com/yyyaiy',
    'https://github.com/panda-zxs',
    'https://github.com/golangav',
    'https://github.com/markhuyong',
    'https://github.com/ITboy6',
    'https://github.com/jiquan51',
    'https://github.com/ty1972873004',
    'https://github.com/shenxinbo',
    'https://github.com/gaffeyQiu',
    'https://github.com/cnwangzhanfei',
    'https://github.com/yyqhlw',
    'https://github.com/qdsang',
    'https://github.com/cn-ygf',
    'https://github.com/rick319',
  ]);

  return (
    <>
      <div className="container">
        <div className="row">
          {contributors &&
            contributors.map(item => (
              <div className="col col--2" style={{ marginTop: '1rem' }}>
                <a href={item}>
                  <img
                    className={`${styles.avatarPhoto} avatar__photo`}
                    src={`${item}.png`}
                  />
                </a>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
