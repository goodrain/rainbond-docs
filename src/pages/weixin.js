import Layout from '@theme/Layout';
import React from 'react';

function Hello() {
  return (
    <Layout>
      <div className='row' style={{ paddingTop: '48px' }}>
        <div
          className='col col--6'
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <div className='card'>
            <div classNamelass='card__image'>
              <img src='/wechat/wechat.png' />
            </div>
            <div className='card__body'>
              <h3>加入 Rainbond 技术交流群</h3>
              <small>
                请添加 Rainbond 小助手微信号
                <br />
                备注 【姓名-公司-城市】
                <br />
                即可加入 Rainbond 技术交流群
              </small>
            </div>
          </div>
        </div>
        <div
          className='col col--6'
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <div className='card'>
            <div className='card__image' style={{ marginTop: '-20px' }}>
              <img src='/wechat/wechat-public.jpg' />
            </div>
            <div className='card__body'>
              <h3>关注 Rainbond 公众号</h3>
              <small>了解 Rainbond 最新资讯，干货分享</small>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Hello;
