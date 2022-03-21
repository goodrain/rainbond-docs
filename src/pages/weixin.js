import React from 'react';
import Layout from '@theme/Layout';

function Hello() {
  return (
    <Layout>
      <div class="row">
        <div class="col col--3">
          <div class="card">
            <div class="card__image">
              <img
                src="/wechat/wechat.png"
                />
            </div>
          <div class="card__body">
              <h3>加入 Rainbond 技术交流群</h3>
              <small>
                请添加 Rainbond 小助手微信号<br/>
                备注 【姓名-公司-城市】<br/>
                即可加入 Rainbond 技术交流群
              </small>
          </div>
        </div>
        </div>
        <div class="col col--3">
          <div class="card">
            <div class="card__image">
              <img
                src="/wechat/wechat-public.jpg"
                />
            </div>
            <div class="card__body">
              <h3>关注 Rainbond 公众号</h3>
              <small>
                了解 Rainbond 最新资讯，干货分享
              </small>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Hello;