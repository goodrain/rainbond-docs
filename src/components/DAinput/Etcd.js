import { Input, notification, Form , message} from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import React, { Component } from 'react';
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
        }else if( values.length%2 !== 0 ){
            notification.error({
                message: 'etcd节点添加个数必须为奇数'
            });
        }
        this.setState({
            values: values.concat({ ip: '' }),
            count: true
        });
    };

    remove = index => {
        const { values } = this.state;
        if( values.length%2 !== 0 ){
            notification.error({
                message: 'etcd节点添加个数必须为奇数'
            });
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
                            <div className="rows">
                                <span className="spanTitle">节点名称</span>
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
                                    className="inputs"
                                    value={item.ip}
                                    placeholder={regexPlaceholder}
                                />
                                </Form.Item>
                            {
                                first?(
                                <PlusCircleOutlined onClick={() => this.add()} className="icons" />
                                ): (
                                    <MinusCircleOutlined onClick={() => this.remove(index)} className="icons" />
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
