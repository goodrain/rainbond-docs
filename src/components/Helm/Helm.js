import { Button, Form, Input, Radio, Space, Icon, Alert } from 'antd'
import { PlusCircleOutlined, CopyOutlined } from '@ant-design/icons'
import LayoutProviders from '@theme/LayoutProviders';
import React, { Component } from 'react';
import message from 'message-tiny'
import axios from 'axios'
import copy from 'copy-to-clipboard'
import DAinputs from '../DAinput/DAinput'
import BuildInput from '../DAinput/BuildInput'
import Etcd from '../DAinput/Etcd'
import './index.css'
import Item from 'antd/lib/list/Item'

var dataObj = {
    enableHA: false,
    gatewayIngressIPs: '',
    imageHub: {
        enable: false,
        domain: '',
        namespace: '',
        username: '',
        password: ''
    },
    etcd: {
        enable: false,
        endpoints: [],
        secretName: ''
    },
    estorage: {
        enable: false,
        RWX: {
            enable: false,
            storageClassName: ''
        },
        RWO: {
            enable: false,
            storageClassName: ''
        }
    },
    database: {
        enable: false,
        uiDatabase: {
            host: '',
            port: '',
            username: '',
            password: '',
            dbname: '',
            enable: false
        },
        regionDatabase: {
            host: '',
            port: '',
            username: '',
            password: '',
            dbname: '',
            enable: false
        }
    },
    nodesForChaos: {
        enable: false,
        nodes: []
    },
    nodesForGateway: {
        enable: false,
        nodes: []
    }
}
export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            enableHA: false,
            repositories: false,
            etcd: false,
            storage: false,
            database: false,
            build: false,
            gateway: false,
            ipValue: null,
            mirroringDomain: null,
            mirroringName: null,
            nameSpace: null,
            mirroringPass: null,
            copyColor: false,
            btnFlog: false,
            command: '',
            resCommand: [],
            copyCommand: '',
            btnLoading:false
        };
    }

    //高可用
    onChangeha = e => {

        this.setState({
            enableHA: e.target.value
        });
        dataObj.enableHA = e.target.value
    };
    //镜像仓库
    onRepositories = e => {
        this.setState({
            repositories: e.target.value,
        });
        dataObj.imageHub.enable = e.target.value
    }
    //etcd
    onEtcd = e => {
        this.setState({
            etcd: e.target.value,
        });
        dataObj.etcd.enable = e.target.value
    }
    //存储
    onStorage = e => {
        this.setState({
            storage: e.target.value,
        });
        dataObj.estorage.enable = e.target.value
        dataObj.estorage.RWX.enable = e.target.value
        dataObj.estorage.RWO.enable = e.target.value
    }
    //数据库
    onDatabase = e => {
        this.setState({
            database: e.target.value,
        });

        dataObj.database.enable = e.target.value
        dataObj.database.uiDatabase.enable = e.target.value
        dataObj.database.regionDatabase.enable = e.target.value
    }
    //构建节点
    onBuild = e => {
        this.setState({
            build: e.target.value,
        });
        dataObj.nodesForChaos.enable = e.target.value
    }
    //网关节点
    onGateway = e => {
        this.setState({
            gateway: e.target.value,
        });
        dataObj.nodesForGateway.enable = e.target.value
    }
    onFinish = (e) => {
        this.setState({btnLoading:true})
        if (e) {
            dataObj.gatewayIngressIPs = e.gatewayIngressIPs || ''
            dataObj.imageHub.domain = e.domain || ''
            dataObj.imageHub.namespace = e.namespace || ''
            dataObj.imageHub.username = e.username || ''
            dataObj.imageHub.password = e.password || ''
            dataObj.etcd.endpoints = e.endpoints || []
            dataObj.etcd.secretName = e.secretName || ''
            dataObj.estorage.RWX.storageClassName = e.storageClassName1 || ''
            dataObj.estorage.RWO.storageClassName = e.storageClassName2 || ''
            dataObj.database.uiDatabase.host = e.host1 || ''
            dataObj.database.uiDatabase.port = e.port1 || ''
            dataObj.database.uiDatabase.username = e.username1 || ''
            dataObj.database.uiDatabase.password = e.password1 || ''
            dataObj.database.uiDatabase.dbname = e.dbname1 || ''
            dataObj.database.regionDatabase.host = e.host2 || ''
            dataObj.database.regionDatabase.port = e.port2 || ''
            dataObj.database.regionDatabase.username = e.username2 || ''
            dataObj.database.regionDatabase.password = e.password2 || ''
            dataObj.database.regionDatabase.dbname = e.dbname2 || ''
            dataObj.nodesForChaos.nodes = e.nodesForChaos || []
            dataObj.nodesForGateway.nodes = e.nodesForGateway || []
            axios({
                method: 'post',
                url: 'https://cloud.goodrain.com/enterprise-server/api/v1/helm/chart',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dataObj
            }).then((res) => {
                if (res.status == 200) {
                    const resArr = res.data.command.split(' & ')
                    const resArrCopy = resArr.join('\n ')
                    this.setState({
                        command: res.data.command,
                        resCommand: resArr,
                        copyCommand: resArrCopy,
                        btnFlog: true,
                        btnLoading:false
                    })
                }
            })
        }
    }
    render() {
        const {
            enableHA,
            repositories,
            etcd,
            storage,
            database,
            build,
            gateway,
            ipValue,
            copyColor,
            mirroringDomain,
            mirroringName,
            nameSpace,
            mirroringPass,
            btnFlog,
            command,
            resCommand,
            copyCommand,
            btnLoading
        } = this.state
        return (
            <LayoutProviders>
                <div className="rainbond_box">
                    {/* 头部标题 */}
                    <header>
                        <div className="rainbond_helmTop">
                            <h2 className="rainbond_heard">Helm安装命令生成工具</h2>
                        </div>
                    </header>
                    {/* 中间内容 */}
                    <div className="rainbond_content">
                        <Form onFinish={this.onFinish}>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">高可用安装</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onChangeha} value={enableHA}>
                                        <Space direction="vertical">
                                            <Radio value={false}>否</Radio>
                                            <Radio value={true}>是</Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">网关地址</h4>
                                <div className="rainbond_gateway">
                                    <div className="rainbond_rows">
                                        <span className="rainbond_spanTitle">IP地址</span>
                                        <Form.Item
                                            name="gatewayIngressIPs"
                                            rules={[
                                                { required: true, message: '内容不能为空' },
                                                {
                                                    pattern: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
                                                    message: "请输入正确的IP地址"
                                                }
                                            ]}
                                        >
                                            <Input
                                                className="rainbond_inputs"
                                                placeholder="请输入IP地址"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">镜像仓库</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onRepositories} value={repositories}>
                                        <Space direction="vertical">
                                            <Radio value={false}>内置镜像仓库</Radio>
                                            <Radio value={true}>
                                                外部镜像仓库
                                                {repositories ?
                                                    <div className="rainbond_rowsLeft">
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">镜像仓库域名</span>
                                                            <Form.Item
                                                                name="domain"
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' },
                                                                    {
                                                                        pattern: /^(?=^.{3,255}$)[a-zA-Z0-9*][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
                                                                        message: '请输入正确的域名格式'
                                                                    }
                                                                ]}
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入镜像仓库域名" />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">命名空间</span>
                                                            <Form.Item
                                                                name="namespace"
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' }
                                                                ]}
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入命名空间" />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">用户名</span>
                                                            <Form.Item
                                                                name="username"
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' }
                                                                ]}
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入用户名" />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">密码</span>
                                                            <Form.Item
                                                                name="password"
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' }
                                                                ]}
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入密码" />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                    : null}
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">Etcd</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onEtcd} value={etcd}>
                                        <Space direction="vertical">
                                            <Radio value={false}>内置Etcd</Radio>
                                            <Radio value={true}>
                                                外部Etcd
                                                {etcd ?
                                                    <div className="rainbond_rowsLeft">
                                                        <Form.Item
                                                            name="endpoints"
                                                            rules={[
                                                                { required: true, message: '内容不能为空' }
                                                            ]}
                                                        >
                                                            <Etcd />
                                                        </Form.Item>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">secret名称</span>
                                                            <Form.Item
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' }
                                                                ]}
                                                                name='secretName'
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入secret名称" />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                    : null}
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">存储</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onStorage} value={storage}>
                                        <Space direction="vertical">
                                            <Radio value={false}>内置存储</Radio>
                                            <Radio value={true}>
                                                外部存储
                                                {storage ?
                                                    <div className="rainbond_rowsLeft">
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">RWX 所用存储 storageClass 名称</span>
                                                            <Form.Item
                                                                name="storageClassName1"
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' }
                                                                ]}
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入存储名称" />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">RWO 所用存储 storageClass 名称</span>
                                                            <Form.Item
                                                                name="storageClassName2"
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' }
                                                                ]}
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入存储名称" />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                    : null}
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">数据库</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onDatabase} value={database}>
                                        <Space direction="vertical">
                                            <Radio value={false}>内置数据库</Radio>
                                            <Radio value={true}>
                                                外部数据库
                                                {database ?
                                                    <div className="rainbond_rowsLeft">
                                                        <div className="rainbond_rowsTitle">
                                                            <h5 className="rainbond_console">控制台数据库:</h5>
                                                            <h5 className="rainbond_region">数据中心数据库:</h5>
                                                        </div>
                                                        <div className="rainbond_rows" style={{ marginTop: '10px' }}>
                                                            <span className="rainbond_dataTitle">连接地址</span>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="host1"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入镜像连接地址" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="host2"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入镜像连接地址" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_dataTitle">连接端口</span>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="port1"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入连接端口" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="port2"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入连接端口" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_dataTitle">用户名</span>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="username1"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入用户名" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="username2"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入用户名" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_dataTitle">密码</span>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="password1"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入密码" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="password2"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入密码" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_dataTitle">数据库名称</span>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="dbname1"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="控制台数据库库名默认值为 console" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="dbname2"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="控制台数据库库名默认值为 region" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null}
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">构建节点</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onBuild} value={build}>
                                        <Space direction="vertical">
                                            <Radio value={false}>默认配置</Radio>
                                            <Radio value={true}>
                                                自定义配置
                                                {build ?
                                                    <Form.Item
                                                        name="nodesForChaos"
                                                        rules={[
                                                            { required: true, message: '内容不能为空' }
                                                        ]}
                                                    >
                                                        <BuildInput />
                                                    </Form.Item>
                                                    : null}
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">网关节点</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onGateway} value={gateway}>
                                        <Space direction="vertical">
                                            <Radio value={false}>默认配置</Radio>
                                            <Radio value={true}>
                                                自定义配置
                                                {gateway ?
                                                    <Form.Item
                                                        name="nodesForGateway"
                                                        rules={[
                                                            { required: true, message: '内容不能为空' }
                                                        ]}
                                                    >
                                                        <DAinputs />
                                                    </Form.Item>

                                                    : null}
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            {/* 生成命令框 */}
                            {btnFlog && (
                                <div className="rainbond_copyContent">
                                    <CopyOutlined
                                        className={`${copyColor ? 'rainbond_iconCopys' : 'rainbond_iconCopy'}`}
                                        onClick={() => {
                                            this.setState({
                                                copyColor: true
                                            })
                                            copy(copyCommand)
                                            const div = document.createElement('div')
                                                div.innerHTML = `<div style="display:flex; flex-flow:row; align-items:center;">
                                                <span style="margin-top:6px; margin-right:4px;"><svg t="1650435078118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4285" width="20" height="20"><path d="M512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z m-71.318588-361.411765a29.334588 29.334588 0 0 0 20.48-8.252235L774.625882 349.364706a27.708235 27.708235 0 0 0 0-39.936 29.575529 29.575529 0 0 0-41.08047 0l-292.74353 284.912941L290.454588 448.150588a29.575529 29.575529 0 0 0-41.08047 0 27.708235 27.708235 0 0 0 0 39.996236l170.706823 166.128941a29.274353 29.274353 0 0 0 20.540235 8.252235z" fill="#33A954" p-id="4286"></path></svg></span>
                                                <span>复制成功</span>
                                                </div>`
                                                message(div, 6000)
                                        }}
                                    />
                                    {resCommand.length > 0 && resCommand.map((item, index) => {
                                        return (
                                            <span key={index} className="rainbond_spanCommand">
                                                {item}
                                            </span>
                                        )
                                    })}
                                </div>
                            )}

                            <div className="rainbond_btnBox">
                                <Form.Item wrapperCol={{ offset: 0, span: 20 }}>
                                    <Button className="rainbond_btn" loading={btnLoading} type="primary" htmlType="submit" >一键生成安装命令</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </LayoutProviders>
        )
    }
}
