import React, { Component } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default class Hint extends Component {
    constructor(props){
        super(props)

    }
    out = ()=>{
        const { idName, titleName, placement } = this.props
        tippy(`#${idName}`, {
                content: titleName,
                placement:placement,
            });
    }
    render() {
        const { titleName, idName } = this.props
        return (
            <div>
                <QuestionCircleOutlined id={idName} onMouseOver={this.out} style={{ marginLeft: '4px', fontSize: '14px' }} />
            </div>
        )
    }
}