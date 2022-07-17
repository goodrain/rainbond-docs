import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Button } from '@douyinfe/semi-ui';

function DiaLog(){
  const local_url = useLocation().pathname;
  
  const [Visible, setVisible] = useState(false);
  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);
  useEffect(() => {
    if (local_url !== "/"){
      if (sessionStorage.getItem("rainbondSeession") == null) {
        setTimeout(() => {
          setVisible(true);
        }, 180000); // 180000ms = 3分钟
        sessionStorage.setItem("rainbondSeession", local_url);
      }
    }
  }, []);
  return (
      <>
        <Modal
          title={
            <p style={{ fontSize: "22px" }}>支持 Rainbond</p>
          }
          visible={Visible}
          // onOk={handleOk}
          onCancel={handleCancel}
          centered
          bodyStyle={{overflow: 'auto'}}
          maskClosable={false}
          style={{width: "600px", fontSize: "17px"}}
          icon={
            <img src="/img/rainbond.png" alt="logo" />
          }
          footer={
            <div>
              <p style={{paddingRight: "20px"}}>
                👇  <b style={{ color: "#26B226"}}>点击</b>
              </p>
              <a href="https://github.com/goodrain/rainbond" target="_blank">
                <Button type="primary" theme="solid">
                  去往 Github
                </Button>
              </a>
            </div>
          }
        >
          <p style={{lineHeight: 1.5}}>
            如果您喜欢 Rainbond，请给 Rainbond 一个 Star。
          </p>
          <p style={{lineHeight: 1.5}}>
            有您的支持 Rainbond 项目以及开源社区会发展得更好，您的支持是 Rainbond 的动力。
          </p>
        </Modal>
      </>
  );
  
}

export default DiaLog;
