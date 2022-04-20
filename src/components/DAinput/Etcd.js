import { Input, notification, Form } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import React, { Component } from 'react';
import message from 'message-tiny'
import '../Helm/index.css'

export default class BuildInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [{ ip: '' }],
            count: false
        };
    }
    onRegexChange = (value, index) => {
        const { values } = this.state;
        values[index].ip = value;
        this.triggerChange(values);
        this.setValues(values);
    };
    setValues(arr) {
        const setArr = arr || [];
        if (!setArr.length) {
            setArr.push({ ip: '' });
        }
        this.setState({ values: setArr });
    }
    initFromProps(value) {
        const setValue = value
        if (setValue) {
            this.setValues(setValue);
        }
    }
    add = () => {
        const { values } = this.state;
        if (values.length > 100) {
            notification.warning({
                message: '最多添加100个'
            });
            return null;
        } else if (values.length % 2 !== 0) {
            const div = document.createElement('div')
            div.innerHTML = `<div style="display:flex; flex-flow:row; align-items:center;">
                            <span style="margin-top:6px;"><svg t="1650433855381" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3363" width="40" height="40"><path d="M800.5 512c0 159.3-129.1 288.5-288.5 288.5-99.6 0-187.4-50.4-239.2-127.2-31.1-46-49.3-101.5-49.3-161.3 0-159.3 129.1-288.5 288.5-288.5S800.5 352.7 800.5 512z" fill="#FC355D" p-id="3364"></path><path d="M556.9 512l60.9-60.9c12.4-12.4 12.4-32.5 0-44.9-12.4-12.4-32.5-12.4-44.9 0L512 467.1l-60.9-60.9c-12.4-12.4-32.5-12.4-44.9 0-12.4 12.4-12.4 32.5 0 44.9l60.9 60.9-60.9 60.9c-12.4 12.4-12.4 32.5 0 44.9 6.2 6.2 14.3 9.3 22.5 9.3s16.3-3.1 22.5-9.3l60.9-60.9 60.9 60.9c6.2 6.2 14.3 9.3 22.5 9.3 8.1 0 16.3-3.1 22.5-9.3 12.4-12.4 12.4-32.5 0-44.9L556.9 512z" fill="#FFFFFF" p-id="3365"></path></svg></span>
                            <span>Etcd节点个数必须为奇数</span>
                            </div>`
            message(div, 6000)
        }
        this.setState({
            values: values.concat({ ip: '' }),
            count: true
        });
    };

    remove = index => {
        const { values } = this.state;
        if (values.length % 2 !== 0) {
            const div = document.createElement('div')
            div.innerHTML = `<div style="display:flex; flex-flow:row; align-items:center;">
                            <span style="margin-top:6px;"><svg t="1650433855381" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3363" width="40" height="40"><path d="M800.5 512c0 159.3-129.1 288.5-288.5 288.5-99.6 0-187.4-50.4-239.2-127.2-31.1-46-49.3-101.5-49.3-161.3 0-159.3 129.1-288.5 288.5-288.5S800.5 352.7 800.5 512z" fill="#FC355D" p-id="3364"></path><path d="M556.9 512l60.9-60.9c12.4-12.4 12.4-32.5 0-44.9-12.4-12.4-32.5-12.4-44.9 0L512 467.1l-60.9-60.9c-12.4-12.4-32.5-12.4-44.9 0-12.4 12.4-12.4 32.5 0 44.9l60.9 60.9-60.9 60.9c-12.4 12.4-12.4 32.5 0 44.9 6.2 6.2 14.3 9.3 22.5 9.3s16.3-3.1 22.5-9.3l60.9-60.9 60.9 60.9c6.2 6.2 14.3 9.3 22.5 9.3 8.1 0 16.3-3.1 22.5-9.3 12.4-12.4 12.4-32.5 0-44.9L556.9 512z" fill="#FFFFFF" p-id="3365"></path></svg></span>
                            <span>Etcd节点个数必须为奇数</span>
                            </div>`
            message(div, 6000)
        }
        values.splice(index, 1);
        this.setValues(values);
        this.triggerChange(values);
    };
    triggerChange(values) {
        const res = [];
        for (let i = 0; i < values.length; i++) {
            res.push({
                ip: values[i].ip,
            });
        }
        const { onChange } = this.props;
        if (onChange) {
            onChange(res);
        }
    }

    render() {
        const regexPlaceholder = '请输入节点名称';
        const { values, count } = this.state;
        return (
            <div>
                {values.map((item, index) => {
                    const first = index === 0;
                    return (
                        <div key={index}>
                            <div className="rainbond_rows">
                                <span className="rainbond_spanTitle">节点名称</span>
                                <Form.Item
                                    rules={[
                                        { required: true, message: '内容不能为空' }
                                    ]}
                                >
                                    <Input
                                        name="ip"
                                        onChange={e => {
                                            this.onRegexChange(e.target.value, index);
                                        }}
                                        className="rainbond_inputs"
                                        value={item.ip}
                                        placeholder={regexPlaceholder}
                                    />
                                </Form.Item>
                                {
                                    first ? (
                                        <PlusCircleOutlined onClick={() => this.add()} className="rainbond_icons" />
                                    ) : (
                                        <MinusCircleOutlined onClick={() => this.remove(index)} className="rainbond_icons" />
                                    )
                                }
                            </div>
                        </div>
                    );
                })
                }
            </div >
        );
    }
}
