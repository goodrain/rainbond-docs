import { Button, Form, Input, Radio, Space, Icon, Alert, Tag } from 'antd'
import { PlusCircleOutlined, CopyOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import LayoutProviders from '@theme/LayoutProviders';
import React, { Component } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios'
import copy from 'copy-to-clipboard'
import DAinputs from '../DAinput/DAinput'
import BuildInput from '../DAinput/BuildInput'
import Etcd from '../DAinput/Etcd'
import Hint from '../DAinput/Hint'
import tippy from 'tippy.js';
import Item from 'antd/lib/list/Item'
import './index.scss'
import 'tippy.js/dist/tippy.css';

const { CheckableTag } = Tag;

const dataObj = {
    enableHA: true,
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
            config: {
                server: '',
                storageClassName: ''
            }
        },
        RWO: {
            enable: false,
            storageClassName: ''
        },
        NFS: {
            enable: false,
            server: '',
            path: ''
        }
    },
    type: 'aliyun',
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
        enable: true,
        nodes: []
    }
};
export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            copyColor: false,
            btnFlog: false,
            btnLoading: false,
            command: '',
            resCommand: [],
            copyCommand: '',
            btnLoading: false,
            disabled: false,
            btnFlag: true,
            btnFlags: false,
            etcd_enabled: '自定义配置',
            node_enabled: '自定义配置',
            isAdvanced: false,
        };
    }
    reminder = (e) => {
        const { btnFlag, btnFlags } = this.state
        if (e.gatewayIngressIPs || e.nodesForGateway) {
            Swal.fire({
                position: 'center-center',
                icon: 'success',
                title: 'HELM命令生成成功',
                showConfirmButton: false,
                timer: 1500,
                heightAuto: true
            })
            this.setState({ btnFlags: false })
        } else {
            Swal.fire({
                position: 'center-center',
                icon: 'error',
                title: '信息没有填写完整',
                showConfirmButton: false,
                timer: 2000
            })
            this.setState({
                command: '',
                copyCommand: '',
                btnFlog: false
            })
        }
    }
    handleAdvanced = () => {
        const { isAdvanced } = this.state
        this.setState({
            isAdvanced: !isAdvanced,
            etcd_enabled: '自定义配置',
            node_enabled: '自定义配置',
        })
    }
    //表单事件
    onFinish = (e) => {
        const {
            etcd_enabled,
            node_enabled
        } = this.state;
        this.setState({
            btnLoading: true,
            btnFlags: true
        }, () => {
            this.reminder(e)
        })
        if (e) {
            if (etcd_enabled === '自定义配置') {
                dataObj.etcd.enable = false;
            } else {
                dataObj.etcd.enable = true;
            }
            // 构建节点
            if (node_enabled === '自定义配置') {
                dataObj.nodesForChaos.enable = false;
            } else {
                dataObj.nodesForChaos.enable = true;
            }
            // 存储
            if(e.server){
                dataObj.estorage.enable = true;
                dataObj.estorage.RWX.enable = true;
                dataObj.estorage.RWO.enable = true;
            }else{
                dataObj.estorage.enable = false;
                dataObj.estorage.RWX.enable = false;
                dataObj.estorage.RWO.enable = false;
            }
            dataObj.estorage.RWX.config.server = e.server || ''
            // 数据库
            if(e.host1 || e.port1 || e.username1 || e.password1 || e.dbname1){
                dataObj.database.enable = true;
                dataObj.database.uiDatabase.enable = true;
            }else{
                dataObj.database.enable = false;
                dataObj.database.uiDatabase.enable = false;
            }
            if(e.host2 || e.port2 || e.username2 || e.password2 || e.dbname2){
                dataObj.database.enable = true;
                dataObj.database.regionDatabase.enable = true;
            }else{
                dataObj.database.enable = false;
                dataObj.database.regionDatabase.enable = false;
            }
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
            // 镜像仓库
            if(e.domain || e.namespace || e.username || e.password) {
                dataObj.imageHub.enable = true;
            }else{
                dataObj.imageHub.enable = false;
            }
            dataObj.imageHub.domain = e.domain || ''
            dataObj.imageHub.namespace = e.namespace || ''
            dataObj.imageHub.username = e.username || ''
            dataObj.imageHub.password = e.password || ''

            dataObj.gatewayIngressIPs = e.gatewayIngressIPs || ''
            dataObj.nodesForChaos.nodes = e.nodesForChaos || []

            dataObj.etcd.endpoints = e.endpoints || []
            dataObj.etcd.secretName = e.secretName || ''
            dataObj.nodesForGateway.nodes = e.nodesForGateway || []
            axios({
                method: 'post',
                url: 'https://cloud.goodrain.com/enterprise-server/api/v1/helm/chart',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    enableHA: dataObj.enableHA,
                    database: dataObj.database,
                    estorage: dataObj.estorage,
                    etcd: dataObj.etcd,
                    gatewayIngressIPs: dataObj.gatewayIngressIPs,
                    imageHub: dataObj.imageHub,
                    nodesForChaos: dataObj.nodesForChaos,
                    nodesForGateway: dataObj.nodesForGateway,
                    DockingType: dataObj.type,
                    appui: true,

                }
            }).then((res) => {
                if (res.status == 200) {
                    const resArr = res.data.command.split(' & ')
                    const resArrCopy = resArr.join('\n ')
                    this.setState({
                        command: res.data.command,
                        resCommand: resArr,
                        copyCommand: resArrCopy,
                        btnFlog: true,
                        btnLoading: false,
                        btnFlag: false,
                    })
                }
            })
        }
    }
    render() {
        const {
            copyColor,
            btnFlog,
            command,
            resCommand,
            copyCommand,
            btnLoading,
            disabled,
            etcd_enabled,
            node_enabled,
            isAdvanced
        } = this.state
        return (
            <LayoutProviders>
                <div className="rainbond_box">
                    {/* 头部标题 */}
                    <header>
                        <div className="rainbond_helmTop">
                            <div className="rainbond_heard">ACK 安装命令生成工具</div>
                        </div>
                    </header>
                    {/* 中间内容 */}
                    <div className="rainbond_content">
                        <Form onFinish={this.onFinish}>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">SLB 负载均衡:</h4>
                                <div className="rainbond_gateway">
                                    <div className="rainbond_rows">
                                        <Form.Item
                                            name="gatewayIngressIPs"
                                            extra={<div style={{width: '780px'}}>根据自身需求，提前在阿里云官网准备好云资源：SLB负载均衡,SLB负载流量到后端网关节点的 80、443、6060、6443、7070、8443 端口，所以需要配置SLB监听端口，<a target="_blank" href="https://help.aliyun.com/document_detail/29863.html?spm=5176.21213303.J_6704733920.9.6ff053c9SQg0bg&scm=20140722.S_help%40%40%E6%96%87%E6%A1%A3%40%4029863._.ID_help%40%40%E6%96%87%E6%A1%A3%40%4029863-RL_SLB-LOC_main-OR_ser-V_2-P0_1">详细配置见官方文档。</a></div>}
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
                                                placeholder="请输入 IP 地址  例：47.104.156.133"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="rainbond_lines">
                                <h4 className="rainbond_titles">网关安装节点:</h4>
                                <div className="rainbond_has">
                                    <Form.Item
                                        name="nodesForGateway"
                                        extra="rainbond网关安装到的节点，可以安装到多个节点，实现网关高可用，节点名称填写k8s集群中node名称。"
                                        rules={[
                                            { required: true, message: '内容不能为空' }
                                        ]}
                                    >
                                        <DAinputs />
                                    </Form.Item>
                                </div>
                            </div>
                            {/* 存储 */}
                            <div className="rainbond_storage">
                                <div className="rainbond_handelTitle">
                                    <div>
                                        <h4 className="rainbond_titles">NAS 存储:</h4>
                                    </div>
                                    <div className='descs'>
                                        (非必填) 根据自身需求，在阿里云官网准备好NAS文件系统，用于持久化数据，<a target="_blank" href="https://help.aliyun.com/document_detail/312360.html">详细配置见官方文档。</a>
                                    </div>
                                </div>
                                <div className="rainbond_ha">
                                    <div className="rainbond_rowsLefts">
                                        <div className="rainbond_rows_rwxs">
                                            <span className="rainbond_spanTitles">挂载点地址</span>
                                            <Form.Item
                                                name="server"
                                                rules={[
                                                    { required: false, message: '内容不能为空' }
                                                ]}
                                            >
                                                <Input className="rainbond_inputs" placeholder="请填写挂载点地址  例：192.168.0.12" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 数据库 */}
                            <div className="rainbond_storage">
                                <div className="rainbond_handelTitle">
                                    <div>
                                        <h4 className="rainbond_titles">RDS 数据库:</h4>
                                    </div>
                                    <div className='descs'>
                                        (非必填) 根据自身需求，在阿里云官网准备好”RDS数据库 MySQL版8.0“，并开放3306连接端口，登录RDS创建，授权用户，创建好相对应的数据库，
                                        <a target="_blank" href="https://help.aliyun.com/document_detail/309008.html">详细配置见官方文档。</a>
                                    </div>
                                </div>
                                <div className="rainbond_ha">
                                    <div className="rainbond_rowsLefts">
                                        <div className="rainbond_rowsTitle">
                                            <h5 className="rainbond_console">控制台数据库: </h5>
                                            <h5 className="rainbond_region">数据中心数据库: </h5>
                                        </div>
                                        <div className="rainbond_rows" style={{ marginTop: '10px' }}>
                                            <span className="rainbond_dataTitle">连接地址</span>
                                            <div className="rainbond_databaseBox">
                                                <Form.Item
                                                    name="host1"
                                                    rules={[
                                                        { required: false, message: '内容不能为空' }
                                                    ]}
                                                >
                                                    <Input className="rainbond_dataInput" placeholder="请输入数据库连接地址  例：127.0.0.1" />
                                                </Form.Item>
                                            </div>
                                            <div className="rainbond_databaseBox">
                                                <Form.Item
                                                    name="host2"
                                                    rules={[
                                                        { required: false, message: '内容不能为空' }
                                                    ]}
                                                >
                                                    <Input className="rainbond_dataInput" placeholder="请输入数据库连接地址  例：127.0.0.1" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="rainbond_rows">
                                            <span className="rainbond_dataTitle">连接端口</span>
                                            <div className="rainbond_databaseBox">
                                                <Form.Item
                                                    name="port1"
                                                    rules={[
                                                        { required: false, message: '内容不能为空' }
                                                    ]}
                                                >
                                                    <Input className="rainbond_dataInput" placeholder="请输入连接端口  例：3306" />
                                                </Form.Item>
                                            </div>
                                            <div className="rainbond_databaseBox">
                                                <Form.Item
                                                    name="port2"
                                                    rules={[
                                                        { required: false, message: '内容不能为空' }
                                                    ]}
                                                >
                                                    <Input className="rainbond_dataInput" placeholder="请输入连接端口  例：3306" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="rainbond_rows">
                                            <span className="rainbond_dataTitle">用户名</span>
                                            <div className="rainbond_databaseBox">
                                                <Form.Item
                                                    name="username1"
                                                    rules={[
                                                        { required: false, message: '内容不能为空' }
                                                    ]}
                                                >
                                                    <Input className="rainbond_dataInput" placeholder="请输入用户名  例：root" />
                                                </Form.Item>
                                            </div>
                                            <div className="rainbond_databaseBox">
                                                <Form.Item
                                                    name="username2"
                                                    rules={[
                                                        { required: false, message: '内容不能为空' }
                                                    ]}
                                                >
                                                    <Input className="rainbond_dataInput" placeholder="请输入用户名  例：root" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="rainbond_rows">
                                            <span className="rainbond_dataTitle">密码</span>
                                            <div className="rainbond_databaseBox">
                                                <Form.Item
                                                    name="password1"
                                                    rules={[
                                                        { required: false, message: '内容不能为空' }
                                                    ]}
                                                >
                                                    <Input className="rainbond_dataInput" placeholder="请输入密码" />
                                                </Form.Item>
                                            </div>
                                            <div className="rainbond_databaseBox">
                                                <Form.Item
                                                    name="password2"
                                                    rules={[
                                                        { required: false, message: '内容不能为空' }
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
                                                        { required: false, message: '内容不能为空' }
                                                    ]}
                                                >
                                                    <Input className="rainbond_dataInput" placeholder="请输入数据库库名称  例：console" />
                                                </Form.Item>
                                            </div>
                                            <div className="rainbond_databaseBox">
                                                <Form.Item
                                                    name="dbname2"
                                                    rules={[
                                                        { required: false, message: '内容不能为空' }
                                                    ]}
                                                >
                                                    <Input className="rainbond_dataInput" placeholder="请输入数据库库名称  例：region" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* 镜像仓库 */}
                            <div className="rainbond_storage">
                                <div className="rainbond_handelTitle">
                                    <div>
                                        <h4 className="rainbond_titles">容器镜像服务:</h4>
                                    </div>
                                    <div className='descs'>
                                    (非必填) 根据自身需求，在阿里云官网准备好”容器镜像服务称为ACR“，根据提示开通之后，会得到一个仓库域名，组织名称（或命名空间），登录镜像仓库的用户名，密码。
                                    </div>
                                </div>
                                <div className="rainbond_ha">
                                    <div className="rainbond_rowsLefts">
                                        <div className="rainbond_rows">
                                            <span className="rainbond_spanTitles">镜像仓库域名</span>
                                            <Form.Item
                                                name="domain"
                                                rules={[
                                                    { required: false, message: '内容不能为空' },
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
                                            <span className="rainbond_spanTitles">命名空间</span>
                                            <Form.Item
                                                name="namespace"
                                            >
                                                <Input className="rainbond_inputs" placeholder="请输入命名空间" />
                                            </Form.Item>
                                        </div>
                                        <div className="rainbond_rows">
                                            <span className="rainbond_spanTitles">用户名</span>
                                            <Form.Item
                                                name="username"
                                                rules={[
                                                    { required: false, message: '内容不能为空' }
                                                ]}
                                            >
                                                <Input className="rainbond_inputs" placeholder="请输入用户名" />
                                            </Form.Item>
                                        </div>
                                        <div className="rainbond_rows">
                                            <span className="rainbond_spanTitles">密码</span>
                                            <Form.Item
                                                name="password"
                                                rules={[
                                                    { required: false, message: '内容不能为空' }
                                                ]}
                                            >
                                                <Input className="rainbond_inputs" placeholder="请输入密码" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isAdvanced && (
                                <>
                                    {/* Etcd */}
                                    <div className="rainbond_lines">
                                        <h4 className="rainbond_titles">Etcd: </h4>
                                        <div className="rainbond_ha">
                                            <CheckableTag
                                                checked={etcd_enabled !== '关闭配置' || false}
                                                onChange={() => {
                                                    this.setState(state => {
                                                        return {
                                                            ...state,
                                                            etcd_enabled:
                                                                etcd_enabled === '自定义配置'
                                                                    ? '关闭配置'
                                                                    : '自定义配置'
                                                        };
                                                    });
                                                }}
                                                className='checkableTag'
                                            >
                                                <div className={etcd_enabled === '自定义配置' ? 'checkableTag_text' : 'checkableTag_texts'}>
                                                    {etcd_enabled}
                                                </div>

                                            </CheckableTag>
                                            {etcd_enabled !== '自定义配置' ? (
                                                <div className="rainbond_rowsLeft">
                                                    <div className="rainbond_rows">
                                                        <span className="rainbond_spanTitle">secret名称</span>
                                                        <Form.Item
                                                            rules={[
                                                                { required: true, message: '内容不能为空' }
                                                            ]}
                                                            name='secretName'
                                                        >
                                                            <Input className="rainbond_inputs" placeholder="请输入secret名称  例：rbd-etcd-secret" />
                                                        </Form.Item>
                                                    </div>
                                                    <Form.Item
                                                        name="endpoints"
                                                        rules={[
                                                            { required: true, message: '内容不能为空' }
                                                        ]}
                                                    >
                                                        <Etcd />
                                                    </Form.Item>

                                                </div>
                                            ) : (
                                                <div className='desc'>
                                                    (非必填) 设置外部独立的 ETCD 服务的访问地址。
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* 构建节点 */}
                                    <div className="rainbond_lines">
                                        <h4 className="rainbond_titles">构建节点</h4>
                                        <div className="rainbond_ha">
                                            <CheckableTag
                                                checked={node_enabled !== '关闭配置' || false}
                                                onChange={() => {
                                                    this.setState(state => {
                                                        return {
                                                            ...state,
                                                            node_enabled:
                                                                node_enabled === '自定义配置'
                                                                    ? '关闭配置'
                                                                    : '自定义配置'
                                                        };
                                                    });
                                                }}
                                                className='checkableTag'
                                            >
                                                <div className={node_enabled === '自定义配置' ? 'checkableTag_text' : 'checkableTag_texts'}>
                                                    {node_enabled}
                                                </div>
                                            </CheckableTag>
                                            {node_enabled !== '自定义配置' ? (
                                                <Form.Item
                                                    name="nodesForChaos"
                                                    rules={[
                                                        { required: true, message: '内容不能为空' }
                                                    ]}
                                                >
                                                    <BuildInput />
                                                </Form.Item>
                                            ) : (
                                                <div className='desc'>
                                                    (非必填) 设置源码构建的节点，节点名是 Kubernetes 的 Nodename。
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
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
                                            Swal.fire({
                                                position: 'center-center',
                                                icon: 'success',
                                                title: '复制成功',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
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
                                    <Button className="rainbond_btn" loading={btnLoading} type="primary" htmlType="submit" onClick={this.reminder} >一键生成安装命令</Button>
                                    <Button className="rainbond_btn" type="primary" style={{ marginLeft: '10px' }} onClick={this.handleAdvanced}> {isAdvanced ? '关闭高级配置' : '展开高级配置'}</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div >
                </div >
            </LayoutProviders >
        )
    }
}
