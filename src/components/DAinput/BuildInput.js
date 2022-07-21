import { Form, Input, notification } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import React, { Component } from 'react';
import '../Helm/index.scss'

export default class BuildInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [{ name: '' }]
    };
  }
  onRegexChange = (value, index) => {
    const { values } = this.state;
    values[index].name = value;
    this.triggerChange(values);
    this.setValues(values);
  };
  setValues(arr) {
    const setArr = arr || [];
    if (!setArr.length) {
      setArr.push({ name: '' });
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
    }
    this.setState({
      values: values.concat({ name: ''})
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
        name: values[i].name,
      });
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange(res);
    }
  }

  render() {
    const namePlaceholder = '请输入节点名称  例：master1';
    const { values } = this.state;
    return (
      <div>
        {values.map((item, index) => {
          const first = index === 0;
          return (
            <div className="rainbond_rowsLeft" key={index}>
              <div className="rainbond_rows">
                <span className="rainbond_spanTitle">节点名称</span>
                <Form.Item
                  rules={[
                    { required: true, message: '内容不能为空' }
                  ]}
                >
                <Input
                  name="name"
                  onChange={e => {
                    this.onRegexChange(e.target.value, index);
                  }}
                  className="rainbond_inputs"
                  value={item.name}
                  placeholder={namePlaceholder}
                />
                </Form.Item>
                {
                  first ? (
                    <PlusCircleOutlined onClick={() => this.add()} className="rainbond_icons" />
                  ):(
                    <MinusCircleOutlined onClick={() => this.remove(index)} className="rainbond_icons"/>
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
