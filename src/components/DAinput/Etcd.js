import { Input, notification, Form } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import React, { Component } from 'react';
import Swal from 'sweetalert2'
import 'animate.css';
import '../Helm/index.scss'

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
        if (values.length > 99) {
            return null;
        }
        this.setState({
            values: values.concat({ ip: '' }),
        });
    };

    remove = index => {
        const { values } = this.state;
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
        const regexPlaceholder = '请输入endpoints地址  例：192.168.0.1:2379';
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
